/**
 * Cloudflare Pages Function：将同域 /api/* 转发至源站 PHP，避免 *.pages.dev 跨域 fetch 出现 NetworkError。
 * 在 Pages 项目「设置 → 环境变量」可配置 CHECKOUT_API_ORIGIN（勿尾斜杠），默认 https://bak.paybank8.com
 */
export async function onRequest(context) {
    const { request, env, params } = context;
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
            'User-Agent': request.headers.get('User-Agent') || 'PayBankCheckout-Proxy/1',
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
        // [V31.9 DEBUG] 增加更详细的错误返回，帮助定位源站连接问题
        return new Response(
            JSON.stringify({ 
                code: 502, 
                msg: 'Target Unreachable', 
                target: target,
                env_origin: env.CHECKOUT_API_ORIGIN || 'DEFAULT',
                error: String(e && e.message ? e.message : e) 
            }),
            {
                status: 502,
                headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Access-Control-Allow-Origin': '*'
                },
            }
        );
    }

    const out = new Headers();
    const ct = res.headers.get('Content-Type');
    if (ct) out.set('Content-Type', ct);
    
    // 强制允许跨域，确保 Pages 域名能收到响应
    out.set('Access-Control-Allow-Origin', '*');
    out.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    out.set('Cross-Origin-Resource-Policy', 'cross-origin');
    
    return new Response(res.body, { status: res.status, headers: out });
}
