/**
 * PayBank Checkout Logic (Consolidated Industrial Version 31.9)
 * One JS to rule them all - Built for Cloudflare & Cross-domain deployments.
 */

// 全局变量提取自 index.html 整合逻辑 (V31.9)
let urlParams = new URLSearchParams(window.location.search);
let currentToken = urlParams.get('token') || '';

const getUrlOrderNo = () => {
    return urlParams.get('order_no') || urlParams.get('trade_no') || urlParams.get('out_order_no');
};

const getUrlToken = () => {
    return urlParams.get('token') || currentToken;
};

/** 归一化 API 根地址（Pages 与源站跨域共用） */
function getCheckoutApiBase() {
    const raw = typeof window.API_BASE !== 'undefined' ? window.API_BASE : '';
    const t = String(raw == null ? '' : raw).trim();
    if (!t) return '';
    return t.endsWith('/') ? t : t + '/';
}

/** 构建 GET API 完整 URL，查询参数自动编码 */
function checkoutApiGetUrl(path, query) {
    const base = getCheckoutApiBase();
    if (!base) return '';
    const u = new URL(String(path).replace(/^\//, ''), base);
    if (query && typeof query === 'object') {
        Object.keys(query).forEach((k) => {
            const v = query[k];
            if (v != null && v !== '') u.searchParams.set(k, String(v));
        });
    }
    return u.href;
}

function checkoutApiPostUrl(path) {
    const base = getCheckoutApiBase();
    if (!base) return '';
    return new URL(String(path).replace(/^\//, ''), base).href;
}

const checkoutFetchDefaults = {
    mode: 'cors',
    credentials: 'omit',
    cache: 'no-store',
    referrerPolicy: 'no-referrer'
};

/** 接口返回的 icon 相对路径始终拼源站，避免 API_BASE 为 Pages 同域时指错主机 */
function getUpstreamAssetBase() {
    const o = typeof window.CHECKOUT_UPSTREAM_ORIGIN !== 'undefined' ? window.CHECKOUT_UPSTREAM_ORIGIN : '';
    const t = String(o || '').trim().replace(/\/$/, '');
    if (t) return t + '/';
    return getCheckoutApiBase();
}

const I18N = {
    km: {
        timer_hint: "សូមបង់ប្រាក់ក្នុងកំឡុងពេលនេះ ប្រព័ន្ធនឹងទូទាត់ដោយស្វ័យប្រវត្ត",
        placeholder_title: "ទូទាត់តាម Bakong",
        placeholder_desc: "ជ្រើស Bakong ដើម្បីបង្ហាញកូដ KHQR",
        instruction: "អ្នកអាចស្កេនកូដបង់ប្រាក់ ឬចម្លងគណនីផ្ទេរប្រាក់ដោយដៃ",
        amount_label: "ចំនួនទឹកប្រាក់ត្រូវបង់",
        amount_warning: "សូមប្រាកដថាចំនួនទឹកប្រាក់ផ្ទេរដូចគ្នានឹងចំនួនត្រូវបង់ ប្រព័ន្ធនឹងទូទាត់ដោយស្វ័យប្រវត្ត",
        receiver_label: "អ្នកទទួល",
        card_label: "គណនីទទួល",
        copy: "ចម្លង",
        waiting_pay: "កំពុងរង់ចាំការបង់ប្រាក់...",
        copied: "បានចម្លង!",
        must_use: "ត្រូវតែប្រើ App {{bank}} ដើម្បីស្កេន",
        recom_use: "ណែនាំឱ្យប្រើ App {{bank}} ដើម្បីស្កេន",
        pay_success: "ការបង់ប្រាក់បានជោគជ័យ!",
        close_page: "បិទទំព័រនេះ",
        switch_fail: "ការផ្លាស់ប្តូរបានបរាជ័យ",
        auto_close: "ទំព័រនឹងបិទដោយស្វ័យប្រវត្តក្នុងរយៈពេល {{sec}} វិនាទី...",
        save_qr: "រក្សាទុកកូដ QR ទៅកាន់អាល់ប៊ុម",
        save_hint: "* បន្ទាប់ពីរក្សាទុក សូមបើក App ធនាគារ ហើយជ្រើសរើសរូបភាព",
        assigning: "កំពុងបែងចែកគណនី...",
        no_bank_card: "មិនមានគណនី Bakong ដែលអាចប្រើបាន សូមព្យាយាមម្តងទៀត",
        net_err: "កំហុសបណ្តាញ សូមព្យាយាមម្តងទៀត",
        order_no_label: "លេខបញ្ជាទិញ",
        bank_label_row: "ធនាគារទទួល",
        support: "ជំនួយអតិថិជន",
        help: "របៀបបង់ប្រាក់",
        close: "យល់ព្រម",
        contact_us: "ទាក់ទងមកយើង",
        help_guide: "ការណែនាំ",
        click_close: "ចុចលើរូបភាពដើម្បីបិទ",
        help_img: "assets/img/topup_hint_km.jpg?v=1.0",
        merchant_ref: "លេខយោងអាជីវករ",
        supported_banks_hint: "សូមប្រើ Bakong ឬ App ធនាគារដែលគាំទ្រ KHQR"
    },
    en: {
        timer_hint: "Please pay within this time, system will auto-credit",
        placeholder_title: "Pay with Bakong",
        placeholder_desc: "Select Bakong to show KHQR",
        instruction: "Scan QR code or copy account for manual transfer",
        amount_label: "Total Amount Due",
        amount_warning: "Ensure transfer amount matches due amount for auto-credit",
        receiver_label: "Receiver",
        card_label: "Account No",
        copy: "Copy",
        waiting_pay: "Waiting for payment...",
        copied: "Copied!",
        must_use: "Must use {{bank}} App to scan",
        recom_use: "Recommend {{bank}} App to scan",
        pay_success: "Payment Success!",
        close_page: "Close Page",
        switch_fail: "Switch Failed",
        auto_close: "Page will close automatically in {{sec}} seconds...",
        save_qr: "Save QR to Album",
        save_hint: "* After saving, open banking app and select this photo",
        assigning: "Assigning account...",
        no_bank_card: "No available Bakong account, please try again",
        net_err: "Network error, please try again",
        order_no_label: "Order No",
        bank_label_row: "Receiving Bank",
        support: "Support",
        help: "Help",
        close: "Got it",
        contact_us: "Contact Us",
        help_guide: "Help Guide",
        click_close: "Click to close",
        help_img: "assets/img/topup_hint_en.jpg?v=1.0",
        merchant_ref: "Merchant Ref",
        supported_banks_hint: "Use Bakong or a bank app that supports KHQR"
    },
    zh: {
        timer_hint: "请在规定时间内完成支付",
        placeholder_title: "Bakong 支付",
        placeholder_desc: "选择 Bakong 以显示 KHQR 付款码",
        instruction: "您可扫码支付，或复制账号手动转账",
        amount_label: "应付总额",
        amount_warning: "请确保金额一致，否则无法自动到账",
        receiver_label: "收款人",
        card_label: "收款账号",
        copy: "复制",
        waiting_pay: "正在等待支付...",
        copied: "已复制!",
        must_use: "必须使用 {{bank}} App 扫码",
        recom_use: "推荐使用 {{bank}} App 扫码",
        pay_success: "支付成功!",
        close_page: "关闭页面",
        switch_fail: "切换失败",
        auto_close: "页面将在 {{sec}} 秒内自动关闭...",
        save_qr: "保存二维码到相册",
        save_hint: "* 保存后打开银行 App，选择该相册图片支付",
        assigning: "正在为您分配收款账号...",
        no_bank_card: "暂无可用 Bakong 收款账号，请稍后重试",
        net_err: "网络异常，请刷新后重试",
        order_no_label: "订单号",
        bank_label_row: "收款银行",
        support: "客服支持",
        help: "充值帮助",
        close: "我知道了",
        contact_us: "联系我们",
        help_guide: "帮助指引",
        click_close: "点击图片可收回",
        help_img: "assets/img/topup_hint_zh.jpg?v=1.0",
        merchant_ref: "商户单号",
        supported_banks_hint: "请使用 Bakong 或支持 KHQR 的银行 App 扫码支付"
    }
};

const BANK_COLORS = {
    'BAKONG': '#ED1C24'
};

function getDetectLanguage() {
    // 1. 优先使用用户手动选择过的语言
    const saved = localStorage.getItem('paybank_lang');
    if (saved) return saved;

    // 2. 自动检测浏览器/手机系统语言
    const browserLang = (navigator.language || navigator.userLanguage || 'km').toLowerCase();

    if (browserLang.startsWith('zh')) return 'zh'; // 中文 (zh-CN, zh-TW等)
    if (browserLang.startsWith('en')) return 'en'; // 英文
    if (browserLang.includes('km') || browserLang.includes('kh')) return 'km'; // 高棉语

    // 3. 如果识别不到以上语言，默认回退到英语 (V19.9)
    return 'en';
}

let currentLang = getDetectLanguage();

// 暴露给全局
window.setLanguage = function (lang) {
    currentLang = lang;
    localStorage.setItem('paybank_lang', lang);
    // 同步写入 cookie 供直接输出超时的 php 页面读取，有效期 30 天
    document.cookie = "paybank_lang=" + lang + "; path=/; max-age=" + (30 * 24 * 60 * 60);
    updateInterface();
}

// 辅助函数：跨平台兼容打开新窗口 (V27.5)
window.safeOpen = function (url) {
    if (!url) return;
    const win = window.open(url, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
        // 如果被弹出窗口拦截器拦截，则在本窗口打开
        window.location.href = url;
    }
}


function updateInterface() {
    document.documentElement.lang = currentLang; // 设置语言标识以优化字体 (V20.1)
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (I18N[currentLang] && I18N[currentLang][key]) {
            el.innerText = I18N[currentLang][key];
        }
    });

    // 动态切换帮助图片 (V27.4)
    const helpImgEl = document.querySelector('.help-img');
    // 使用与收银台页面同源的相对路径（Cloudflare Pages 静态包内已含 help 图）
    if (helpImgEl && I18N[currentLang].help_img) {
        helpImgEl.src = I18N[currentLang].help_img;
    }

    const kmBtn = document.getElementById('lang-km');
    const enBtn = document.getElementById('lang-en');
    const zhBtn = document.getElementById('lang-zh');
    if (kmBtn) kmBtn.classList.toggle('active', currentLang === 'km');
    if (enBtn) enBtn.classList.toggle('active', currentLang === 'en');
    if (zhBtn) zhBtn.classList.toggle('active', currentLang === 'zh');

    const bankPill = document.querySelector('.bank-pill.active');
    if (bankPill) {
        updateHintText(bankPill.dataset.bank);
    }
}

function updateHintText(bankName) {
    const hintEl = document.getElementById('scan-hint-text');
    if (!hintEl) return;
    // [V26.25.75] 跨行兼容性恢复：文案引导优化，明确支持所有 KHQR 银行
    const text = I18N[currentLang]['recom_use'].replace('{{bank}}', 'Bakong / KHQR');
    hintEl.innerHTML = `<i class="fa-solid fa-mobile-screen-button me-1"></i> ${text}`;
}

function showToast(text) {
    let toast = document.querySelector('.copy-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'copy-toast';
        document.body.appendChild(toast);
    }
    toast.innerText = text;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1500);
}

window.copyText = function (id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.innerText.replace('$', '').trim();
    navigator.clipboard.writeText(text).then(() => {
        showToast(I18N[currentLang].copied || 'Copied!');
        const targetBtn = btn || (event ? event.target : null);
        if (targetBtn && targetBtn.tagName === 'BUTTON') {
            const originalText = targetBtn.innerText;
            targetBtn.innerText = I18N[currentLang].copied;
            targetBtn.style.color = '#28a745';
            setTimeout(() => {
                targetBtn.innerText = originalText;
                targetBtn.style.color = '';
            }, 2000);
        }
    }).catch(err => console.error("Copy failed", err));
};

function updateTimerVisuals(remainingSeconds) {
    const dashArray = 100;
    const strokeEl = document.getElementById('timer-stroke');
    const textEl = document.getElementById('timer-text');

    if (strokeEl) {
        const offset = (remainingSeconds / (10 * 60)) * dashArray;
        strokeEl.setAttribute('stroke-dasharray', `${offset}, 100`);
    }

    if (textEl) {
        const m = Math.floor(remainingSeconds / 60);
        const s = remainingSeconds % 60;
        textEl.textContent = `${m}:${s < 10 ? '0' + s : s}`;
    }
}

// window.selectBankAndStart moved down to maintain order


// 渐进式渲染引擎 2.0 (V6.0)：先显示基础码，后装饰增强
window.renderQrCode = function (qrData, bankName) {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer) return;

    const cleanBankName = (bankName || 'Bakong').toUpperCase();
    const bgColor = BANK_COLORS['BAKONG'] || '#ED1C24';

    // A. 同步 UI 辅助信息 (V19.7：背景色换至保存按钮，使其更明显)
    const saveBtn = document.getElementById('save-qr-btn');
    const hintContainer = document.getElementById('scan-hint-container');

    if (saveBtn) {
        saveBtn.style.backgroundColor = bgColor;
        saveBtn.style.color = '#ffffff';
        // 如果有图标，也确保它是白色的
        const icon = saveBtn.querySelector('i');
        if (icon) icon.style.color = '#ffffff';
    }

    if (hintContainer) {
        hintContainer.style.backgroundColor = 'rgba(0,0,0,0.05)'; // 浅灰色背景
        hintContainer.style.color = '#64748b'; // 辅助文字颜色
        updateHintText(bankName);
    }

    // B. 一次性加载逻辑 (离屏生成)
    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);

    new QRCode(tempDiv, {
        text: qrData,
        width: 180,
        height: 180,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.M
    });

    const finalizeOnce = () => {
        const source = tempDiv.querySelector('canvas') || tempDiv.querySelector('img');
        if (!source) return;

        const canvas = document.createElement('canvas');
        const w = 200, h = 210;
        canvas.width = w * 2; canvas.height = h * 2;
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);

        // 绘制背景
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, w, h);

        // 移除顶部小条 (V18.6)

        // 绘制主码
        ctx.drawImage(source, 10, 20, 180, 180);

        const deliverToPage = () => {
            const finalImg = new Image();
            finalImg.style.width = '200px';
            finalImg.style.display = 'block';
            finalImg.style.margin = '0 auto';
            finalImg.style.borderRadius = '8px';
            finalImg.src = canvas.toDataURL("image/png");
            qrContainer.innerHTML = "";
            qrContainer.appendChild(finalImg);
            document.body.removeChild(tempDiv);
        };

        const logo = new Image();
        const logoPath = 'assets/img/bank_logo/bakong_logo.png';

        logo.src = logoPath;
        logo.onload = () => {
            const lSize = 36, p = 3;
            const lx = (w - lSize) / 2, ly = 20 + (180 - lSize) / 2;
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(lx - p, ly - p, lSize + p * 2, lSize + p * 2, 6);
            else ctx.rect(lx - p, ly - p, lSize + p * 2, lSize + p * 2);
            ctx.fill();
            ctx.drawImage(logo, lx, ly, lSize, lSize);
            deliverToPage();
        };
        logo.onerror = deliverToPage;
    };

    // 等待基础码完成
    const t = setInterval(() => {
        const qI = tempDiv.querySelector('img');
        const qC = tempDiv.querySelector('canvas');
        if ((qI && qI.complete) || qC) {
            clearInterval(t);
            finalizeOnce();
        }
    }, 20);
};

async function generateFancyCanvas(qrSource, bankName, orderNo) {
    const cleanBankName = (bankName || 'Bakong').toUpperCase();
    const bgColor = BANK_COLORS['BAKONG'] || '#ED1C24';

    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const width = 240, height = 300;
        canvas.width = width * 2; canvas.height = height * 2;
        const ctx = canvas.getContext('2d');
        ctx.scale(2, 2);

        // 1. 基础背景
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);

        // 2. 顶部装饰条 (V18.7：保存时恢复)
        ctx.fillStyle = bgColor;
        if (ctx.roundRect) {
            ctx.beginPath(); ctx.roundRect(0, 0, width, 12, [12, 12, 0, 0]); ctx.fill();
        } else { ctx.fillRect(0, 0, width, 12); }

        // 3. 绘制二维码
        ctx.drawImage(qrSource, (width - 200) / 2, 20, 200, 200);

        // 4. 加载 Logo 并绘制
        const finalize = () => {
            const name = (document.getElementById('display-account-name').textContent || "").trim();
            const card = (document.getElementById('display-card-no').textContent || "").trim();

            ctx.fillStyle = "#1a2b4b";
            ctx.font = "bold 18px 'Inter', sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(name, width / 2, 245);

            ctx.fillStyle = "#6b7c93";
            ctx.font = "500 14px 'Monospace', sans-serif";
            ctx.fillText(card, width / 2, 265);

            ctx.fillStyle = bgColor;
            ctx.font = "bold 11px sans-serif";
            ctx.fillText("Bakong KHQR", width / 2, height - 12);

            resolve(canvas.toDataURL("image/png"));
        };

        const logo = new Image();
        logo.src = 'assets/img/bank_logo/bakong_logo.png';
        logo.onload = () => {
            const lSize = 40, p = 4;
            const lx = (width - lSize) / 2, ly = 20 + (200 - lSize) / 2;
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(lx - p, ly - p, lSize + p * 2, lSize + p * 2, 8);
            else ctx.rect(lx - p, ly - p, lSize + p * 2, lSize + p * 2);
            ctx.fill();
            ctx.drawImage(logo, lx, ly, lSize, lSize);
            finalize();
        };
        logo.onerror = finalize;
    });
}

window.saveQrCode = async function () {
    const qrContainer = document.getElementById("qrcode");
    const source = qrContainer.querySelector('canvas') || qrContainer.querySelector('img');
    if (!source) return;

    const config = document.getElementById('checkout-config').dataset;
    const bankName = config.bankName || 'BANK';
    const orderNo = config.orderNo || 'ORDER';

    showToast(I18N[currentLang].assigning || "Processing...");

    const dataUrl = await generateFancyCanvas(source, bankName, orderNo);

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${bankName.toUpperCase()}_${orderNo}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast(currentLang === 'zh' ? "保存成功" : "Save Success");
};

window.selectBankAndStart = function (bankName) {
    window.switchBank(bankName);
}

// 模式分发器
window.pickBankAndAssign = function (bankName) {
    window.switchBank(bankName, true);
};

window.switchBank = async function (bankName, isPick = false) {
    const configEl = document.getElementById('checkout-config');
    if (!configEl) return;
    const config = configEl.dataset;
    const placeholder = document.getElementById('selection-placeholder');
    const qrArea = document.getElementById('qr-display-area');
    const infoArea = document.getElementById('payment-info-area');

    // 显示中间层 Loading
    if (placeholder) {
        placeholder.innerHTML = `
            <div class="p-4 text-center">
                <div class="spinner-border text-primary"></div>
                <div class="mt-2 small text-muted">${I18N[currentLang].assigning}</div>
            </div>
        `;
        placeholder.classList.remove('d-none');
    }
    if (qrArea) qrArea.classList.add('d-none');
    if (infoArea) infoArea.classList.add('d-none');

    try {
        const path = (isPick || config.checkoutMode === 'pick') ? 'api/assign_card.php' : 'api/switch_bank.php';
        const url = checkoutApiPostUrl(path);
        if (!url) throw new Error('API_BASE missing');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(url, {
            ...checkoutFetchDefaults,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_no: config.orderNo, bank_name: bankName, token: currentToken }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        const res = await response.json();
        if (res.code === 200) {
            const data = res.data;
            document.getElementById('copy-amount').innerText = `$${parseFloat(data.real_amount).toFixed(2)}`;
            document.getElementById('display-account-name').textContent = data.account_name || '--';
            document.getElementById('display-card-no').textContent = data.account_no || data.card_no;

            // 填充新字段 (V19.0)
            const bankFullName = bankName.toUpperCase() === 'BAKONG' ? 'Bakong' : (bankName + ' Bank');
            if (document.getElementById('display-bank-name')) document.getElementById('display-bank-name').textContent = bankFullName;
            if (document.getElementById('display-order-no')) {
                document.getElementById('display-order-no').textContent = config.orderNo;
            }

            // 状态同步 (核心修复：确保 saveQrCode 获取当前银行)
            configEl.dataset.bankName = bankName;

            // 渐进式渲染过程
            window.renderQrCode(data.khqr_string || data.qr_data, bankName);

            // 立即切换 UI 状态 (不等待渲染)
            if (placeholder) placeholder.classList.add('d-none');
            if (qrArea) qrArea.classList.remove('d-none');
            if (infoArea) infoArea.classList.remove('d-none');

            document.querySelectorAll('.bank-pill').forEach(p => {
                p.classList.remove('active');
                if (p.getAttribute('data-bank') === bankName) p.classList.add('active');
            });
            updateInterface();
        } else {
            const msg = res.msg || I18N[currentLang].no_bank_card;
            placeholder.innerHTML = `<div class="p-4 text-center text-danger"><i class="fa-solid fa-triangle-exclamation fa-2x mb-2"></i><div>${msg}</div></div>`;
        }
    } catch (error) {
        console.error("Switch Failure", error);
        placeholder.innerHTML = `<div class="p-4 text-center text-danger">${I18N[currentLang].net_err}</div>`;
    }
};

window.showExpiredState = function () {
    // 根据用户覆盖回来的 PHP 代码，超时应直接触发刷新请求，交由 PHP 拦截展示全局纯英提示页
    window.location.reload();
};

document.addEventListener('DOMContentLoaded', function () {
    updateInterface();
    const configEl = document.getElementById('checkout-config');
    if (configEl && configEl.dataset.remainingSeconds) {
        let sec = parseInt(configEl.dataset.remainingSeconds);

        if (isNaN(sec) || sec <= 0) {
            window.showExpiredState();
        } else {
            const timerEl = document.getElementById('timer');
            const expireTime = Date.now() + (sec * 1000);
            const updateTimer = () => {
                const diff = expireTime - Date.now();
                if (diff <= 0) { window.showExpiredState(); return; }
                const totalSeconds = Math.floor(diff / 1000);

                // 同步圆环视觉 (V17)
                updateTimerVisuals(totalSeconds);
            };
            setInterval(updateTimer, 1000);
            updateTimer();
        }
    }
    // 状态轮询
    const statusPoller = setInterval(async () => {
        const configEl = document.getElementById('checkout-config');
        if (!configEl) return;
        try {
            const onoPoll = configEl.dataset.orderNo;
            if (!onoPoll) return;
            const pollUrl = checkoutApiGetUrl('api/check_order.php', {
                order_no: onoPoll,
                token: currentToken || getUrlToken()
            });
            if (!pollUrl) return;
            const res = await fetch(pollUrl, checkoutFetchDefaults);
            const json = await res.json();
            if (json.status === 'paid') {
                clearInterval(statusPoller);
                let secondsLeft = 3;
                let retUrl = json.return_url || '';

                window.closeSmartPage = function () {
                    if (typeof WeixinJSBridge !== 'undefined') { WeixinJSBridge.call('closeWindow'); }
                    else if (typeof AlipayJSBridge !== 'undefined') { AlipayJSBridge.call('closeWebview'); }
                    else { window.close(); setTimeout(() => { window.location.href = 'about:blank'; }, 300); }
                };

                const updateSuccessHTML = () => {
                    const secHtml = `<span id="close-timer-sec" class="fw-bold text-dark">${secondsLeft}</span>`;
                    const hintText = I18N[currentLang].auto_close.replace('{{sec}}', secHtml);

                    document.querySelector('.checkout-container').innerHTML = `
                        <div class="payment-card shadow-lg text-center p-5 d-flex flex-column justify-content-center align-items-center" style="min-height: 480px; border-radius: 20px;">
                            <i class="fa-solid fa-circle-check text-success display-1 mb-4" style="font-size: 90px; color: #198754; animation: scaleIn 0.4s ease-out;"></i>
                            <h2 class="fw-bold mb-3" style="color: #212529;">${I18N[currentLang].pay_success}</h2>
                            <p class="text-muted small mb-4" style="font-size: 15px;">${hintText}</p>
                            ${!retUrl ? `<button class="btn btn-primary px-4 py-3 rounded-pill shadow-sm mt-3" style="width: 100%; max-width: 280px; font-size: 16px; transition: all 0.3s;" onclick="window.closeSmartPage()">${I18N[currentLang].close_page}</button>` : ''}
                        </div>
                        <style>@keyframes scaleIn { 0% { transform: scale(0.6); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }</style>
                    `;
                };

                updateSuccessHTML();

                const closeCountdown = setInterval(() => {
                    secondsLeft--;
                    const el = document.getElementById('close-timer-sec');
                    if (el) el.innerText = secondsLeft;
                    if (secondsLeft <= 0) {
                        clearInterval(closeCountdown);
                        if (retUrl) window.location.replace(retUrl);
                        else window.closeSmartPage();
                    }
                }, 1000);
            }
        } catch (e) { }
    }, 4000);
});

// [V31.9 CONSOLIDATED INIT LOGIC]
async function initPage() {
    const ono = getUrlOrderNo();
    const tkn = getUrlToken();

    if (!ono) {
        console.error("Missing order_no");
        const ph = document.getElementById('selection-placeholder');
        if (ph) ph.innerHTML = '<div class="error-overlay py-5"><h5>缺少订单号</h5><p>请通过正确的支付链接访问</p></div>';
        return;
    }

    if (!getCheckoutApiBase()) {
        console.error('API_BASE 未配置');
        const glLoading = document.getElementById('page-loading');
        if (glLoading) glLoading.style.display = 'none';
        const container = document.querySelector('.checkout-container');
        if (container) container.style.opacity = '1';
        const ph = document.getElementById('selection-placeholder');
        if (ph) {
            ph.innerHTML = '<div class="error-overlay py-5"><h5>配置错误</h5><p class="text-muted small">未设置 API_BASE</p></div>';
        }
        return;
    }

    try {
        const detailsUrl = checkoutApiGetUrl('api/get_order_details.php', { order_no: ono, token: tkn });
        console.log("[V34 Debug] Attempting Fetch:", detailsUrl);
        
        let res;
        try {
            res = await fetch(detailsUrl, { cache: 'no-cache' });
        } catch (fetchErr) {
            console.warn("[V34 Debug] First attempt failed, retrying...", fetchErr);
            // 自动重试一次
            res = await fetch(detailsUrl, { cache: 'no-store' });
        }

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const json = await res.json();
        console.log("[V34 Debug] Success JSON:", json);

        const glLoading = document.getElementById('page-loading');
        if (glLoading) glLoading.style.display = 'none';
        const container = document.querySelector('.checkout-container');
        if (container) container.style.opacity = '1';

        if (json.code !== 200) {
            const ph = document.getElementById('selection-placeholder');
            if (ph) ph.innerHTML = `<div class="error-overlay py-5"><h5>订单错误</h5><p>${json.msg}</p></div>`;
            return;
        }

        const data = json.data;
        const configEl = document.getElementById('checkout-config');
        const config = configEl.dataset;

        if (data.status === 'expired') {
            const mask = document.getElementById('expired-mask');
            if (mask) {
                mask.style.display = 'flex';
                document.querySelector('.checkout-container').style.display = 'none';
            }
            return;
        }

        config.orderNo = data.order_no;
        config.checkoutMode = data.checkout_mode;
        config.merchantOrderNo = data.out_order_no;

        const expStr = (data.expire_at || '').replace(/-/g, '/');
        const srvStr = (data.server_time || '').replace(/-/g, '/');
        const expireAt = new Date(expStr).getTime();
        const now = new Date(srvStr).getTime();
        const createdAt = new Date((data.created_at || '').replace(/-/g, '/')).getTime();

        let remaining = Math.max(0, Math.floor((expireAt - now) / 1000));
        const total = Math.max(remaining, (expireAt - createdAt) / 1000);

        config.remainingSeconds = remaining;
        config.initialTotalSeconds = total;

        const amountEl = document.getElementById('copy-amount');
        if (amountEl) amountEl.innerText = `$${parseFloat(data.real_amount).toFixed(2)}`;
        const orderNoEl = document.getElementById('display-order-no');
        if (orderNoEl) orderNoEl.textContent = data.order_no;
        const merchantRefEl = document.getElementById('merchant-ref-display');
        if (merchantRefEl) merchantRefEl.textContent = data.out_order_no || 'N/A';

        // 处理侧边面板 (V28.6)
        if (data.support_link) {
            const cp = document.getElementById('contact-panel');
            if (cp) {
                cp.classList.remove('d-none');
                const btn = document.getElementById('support-link-btn');
                if (btn) btn.onclick = () => window.safeOpen(data.support_link);
            }
        }
        if (parseInt(data.topup_hint) === 1) {
            const hpTab = document.getElementById('help-panel-tab');
            if (hpTab) hpTab.classList.remove('d-none');
        }

        renderBankPillsInternal(data.available_banks, data.bank_name);

        if (data.bank_name && (data.khqr_string || data.qr_data)) {
            config.bankName = data.bank_name;
            applyLocalPaymentDataInternal(data);
        } else if (!data.bank_name || data.bank_name.toLowerCase() !== 'bakong') {
            // [V31.9] 纯 Bakong 模式：自动分配
            window.switchBank('Bakong');
        }

        // 调用倒计时逻辑
        if (typeof window.startCountdown === 'function') {
            window.startCountdown(remaining);
        } else {
             // 如果没有外部倒计时逻辑，内部驱动
             let sec = remaining;
             const timerInt = setInterval(() => {
                 sec--;
                 if (sec <= 0) {
                     clearInterval(timerInt);
                     window.showExpiredState();
                 }
                 updateTimerVisuals(sec);
             }, 1000);
             updateTimerVisuals(sec);
        }

    } catch (err) {
        console.error("Init Error:", err);
        const glLoading = document.getElementById('page-loading');
        if (glLoading) glLoading.style.display = 'none';
        const container = document.querySelector('.checkout-container');
        if (container) container.style.opacity = '1';

        const ph = document.getElementById('selection-placeholder');
        if (ph) {
            ph.innerHTML = `
                <div class="error-overlay py-5">
                    <i class="fa-solid fa-triangle-exclamation fa-3x mb-3 text-warning"></i>
                    <h5 class="fw-bold">检测到连接异常</h5>
                    <p class="text-muted small">无法加载订单数据。Pages 部署需包含 <code class="small">functions/api/[[path]].js</code> 转发；或检查源站与 <code class="small">CHECKOUT_UPSTREAM_ORIGIN</code>。</p>
                    <button class="btn btn-sm btn-outline-primary px-4 rounded-pill mt-2" onclick="window.location.reload()"><i class="fa-solid fa-rotate me-2"></i>点击重试</button>
                </div>`;
        }
    }
}

function renderBankPillsInternal(banks, activeName) {
    const container = document.getElementById('bank-pills-list');
    if (!container) return;
    container.innerHTML = '';
    if (!banks || banks.length === 0) return;

    banks.forEach(b => {
        const pill = document.createElement('div');
        pill.className = `bank-pill ${b.name === activeName ? 'active' : ''}`;
        pill.dataset.bank = b.name;
        pill.onclick = () => window.switchBank(b.name);

        const iconName = (b.name.toLowerCase() === 'ac' || b.name.toLowerCase() === 'acleda') ? 'acleda' : b.name.toLowerCase();
        const iconPath = (b.icon || '').replace(/^\//, '');
        const fallbackSrc = iconPath ? (getUpstreamAssetBase() + iconPath) : '';
        const img = document.createElement('img');
        img.className = 'bank-icon';
        img.src = 'assets/img/bank/' + iconName + '.jpg';
        img.alt = b.name || '';
        if (fallbackSrc) {
            img.addEventListener('error', function onIconFail() {
                img.removeEventListener('error', onIconFail);
                img.src = fallbackSrc;
            });
        }
        pill.appendChild(img);
        container.appendChild(pill);
    });
}

function applyLocalPaymentDataInternal(data) {
    const accEl = document.getElementById('display-account-name');
    if (accEl) accEl.textContent = data.account_name || '--';
    const cardEl = document.getElementById('display-card-no');
    if (cardEl) cardEl.textContent = data.account_no || data.card_no;
    
    const bName = (data.bank_name.toUpperCase() === 'AC' || data.bank_name.toUpperCase() === 'ACLEDA') ? 'ACLEDA Bank' : data.bank_name.toUpperCase() + ' Bank';
    const bNameEl = document.getElementById('display-bank-name');
    if (bNameEl) bNameEl.textContent = bName;

    const infoArea = document.getElementById('payment-info-area');
    if (infoArea) infoArea.classList.remove('d-none');
    const qrArea = document.getElementById('qr-display-area');
    if (qrArea) qrArea.classList.remove('d-none');
    const phArea = document.getElementById('selection-placeholder');
    if (phArea) phArea.classList.add('d-none');

    if (typeof window.renderQrCode === 'function') {
        window.renderQrCode(data.khqr_string || data.qr_data, data.bank_name);
    }
}

document.addEventListener('DOMContentLoaded', initPage);



