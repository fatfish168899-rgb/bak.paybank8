/**
 * Cloudflare Pages Function：将同域 /api/* 转发至源站 PHP，避免 *.pages.dev 跨域 fetch 出现 NetworkError。
 * 在 Pages 项目「设置 → 环境变量」可配置 CHECKOUT_API_ORIGIN（勿尾斜杠），默认 https://bak.paybank8.com
 */
export async function onRequest(context) {
    const { request, env, params } = context;
    
    // [V32.0] 优先处理 OPTIONS 预检请求，防止浏览器挂起
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Accept',
                'Access-Control-Max-Age': '86400',
            }
        });
    }

    const raw = params.path;
    const path = Array.isArray(raw) ? raw.join('/') : (raw || '');
    const upstream = String(env.CHECKOUT_API_ORIGIN || 'https://bak.paybank8.com').replace(/\/$/, '');
    const url = new URL(request.url);
    const target = `${upstream}/api/${path}${url.search}`;

    const init = {
        method: request.method,
        redirect: 'follow',
        headers: {
            'Accept': request.headers.get('Accept') || 'application/json',
            'User-Agent': request.headers.get('User-Agent') || 'PayBankCheckout-Proxy/32',
        },
    };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
        init.body = await request.arrayBuffer();
        const ct = request.headers.get('Content-Type');
        if (ct) init.headers['Content-Type'] = ct;
    }

    let res;
    try {
        res = await fetch(target, init);
    } catch (e) {
        return new Response(
            JSON.stringify({ code: 502, msg: 'Upstream Unreachable', detail: String(e) }),
            {
                status: 502,
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            }
        );
    }

    // [V32.0 重要修复] 使用 arrayBuffer 转存结果而非直接流式转发，防止 pending 挂起
    const body = await res.arrayBuffer();
    const outHeaders = new Headers(res.headers);
    outHeaders.set('Access-Control-Allow-Origin', '*');
    outHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    outHeaders.set('Cross-Origin-Resource-Policy', 'cross-origin');
    
    return new Response(body, {
        status: res.status,
        headers: outHeaders
    });
}
