/**
 * PayBank Checkout Logic (Cloudflare Pages Version)
 * Optimized for: bak.paybank8.com
 * Version: 24.1 (Clean Build)
 */

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
        help_img: "/assets/img/topup_hint_km.jpg?v=1.0",
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
        help_img: "/assets/img/topup_hint_en.jpg?v=1.0",
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
        help_img: "/assets/img/topup_hint_zh.jpg?v=1.0",
        merchant_ref: "商户单号",
        supported_banks_hint: "请使用 Bakong 或支持 KHQR 的银行 App 扫码支付"
    }
};

const BANK_COLORS = { 'BAKONG': '#ED1C24' };

function getDetectLanguage() {
    const saved = localStorage.getItem('paybank_lang');
    if (saved) return saved;
    const browserLang = (navigator.language || navigator.userLanguage || 'km').toLowerCase();
    if (browserLang.startsWith('zh')) return 'zh';
    if (browserLang.startsWith('en')) return 'en';
    return 'km';
}

let currentLang = getDetectLanguage();

window.setLanguage = function (lang) {
    currentLang = lang;
    localStorage.setItem('paybank_lang', lang);
    document.cookie = "paybank_lang=" + lang + "; path=/; max-age=" + (30 * 24 * 60 * 60);
    updateInterface();
}

window.safeOpen = function (url) {
    if (!url) return;
    const win = window.open(url, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = url;
    }
}

function updateInterface() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (I18N[currentLang] && I18N[currentLang][key]) {
            el.innerText = I18N[currentLang][key];
        }
    });

    const helpImgEl = document.querySelector('.help-img');
    if (helpImgEl && I18N[currentLang].help_img) {
        helpImgEl.src = I18N[currentLang].help_img;
    }

    const btns = { 'km': 'lang-km', 'en': 'lang-en', 'zh': 'lang-zh' };
    Object.keys(btns).forEach(l => {
        const el = document.getElementById(btns[l]);
        if (el) el.classList.toggle('active', currentLang === l);
    });
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
        if (btn && btn.tagName === 'BUTTON') {
            const originalText = btn.innerText;
            btn.innerText = I18N[currentLang].copied;
            btn.style.color = '#28a745';
            setTimeout(() => { btn.innerText = originalText; btn.style.color = ''; }, 2000);
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

window.renderQrCode = function (qrData, bankName) {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer) return;
    const cleanBankName = (bankName || 'Bakong').toUpperCase();
    const bgColor = BANK_COLORS['BAKONG'] || '#ED1C24';

    const saveBtn = document.getElementById('save-qr-btn');
    const hintContainer = document.getElementById('scan-hint-container');

    if (saveBtn) {
        saveBtn.style.backgroundColor = bgColor;
        saveBtn.style.color = '#ffffff';
    }

    if (hintContainer) {
        const hintEl = document.getElementById('scan-hint-text');
        if (hintEl) {
            hintEl.innerHTML = `<i class="fa-solid fa-mobile-screen-button me-1"></i> ${I18N[currentLang]['recom_use'].replace('{{bank}}', 'Bakong / KHQR')}`;
        }
    }

    const tempDiv = document.createElement('div');
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);

    new QRCode(tempDiv, {
        text: qrData, width: 180, height: 180,
        colorDark: "#000000", colorLight: "#ffffff",
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
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, w, h);
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
            if (tempDiv.parentNode) document.body.removeChild(tempDiv);
        };

        const logo = new Image();
        logo.src = "assets/img/bank_logo/bakong_logo.png";
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

    const t = setInterval(() => {
        const qI = tempDiv.querySelector('img');
        const qC = tempDiv.querySelector('canvas');
        if ((qI && qI.complete) || qC) { clearInterval(t); finalizeOnce(); }
    }, 50);
};

window.saveQrCode = async function () {
    const qrContainer = document.getElementById("qrcode");
    const source = qrContainer.querySelector('canvas') || qrContainer.querySelector('img');
    if (!source) return;

    const config = document.getElementById('checkout-config').dataset;
    const bankName = config.bankName || 'BANK';
    const orderNo = config.orderNo || 'ORDER';

    showToast(I18N[currentLang].assigning || "Processing...");

    const canvas = document.createElement('canvas');
    const width = 240, height = 300;
    canvas.width = width * 2; canvas.height = height * 2;
    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    ctx.fillStyle = "#FFFFFF"; ctx.fillRect(0, 0, width, height);

    ctx.drawImage(source, (width - 200) / 2, 20, 200, 200);
    
    // 异步加载 Logo 并在完成后保存
    const logo = new Image();
    logo.src = "assets/img/bank_logo/bakong_logo.png";
    logo.onload = () => {
        const lSize = 40, p = 4;
        const lx = (width - lSize) / 2, ly = 20 + (200 - lSize) / 2;
        ctx.fillStyle = "#FFFFFF"; ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(lx-p, ly-p, lSize+p*2, lSize+p*2, 8);
        else ctx.rect(lx-p, ly-p, lSize+p*2, lSize+p*2);
        ctx.fill(); ctx.drawImage(logo, lx, ly, lSize, lSize);
        finalizeSave();
    };
    logo.onerror = () => finalizeSave();

    function finalizeSave() {
        const anchor = document.createElement('a');
        anchor.href = canvas.toDataURL("image/png");
        anchor.download = `Bakong_${orderNo}.png`;
        anchor.click();
        showToast(currentLang === 'zh' ? "保存成功" : "Save Success");
    }
};

window.switchBank = async function (bankName) {
    const configEl = document.getElementById('checkout-config');
    const apiBase = window.API_BASE || '';
    const up = new URLSearchParams(window.location.search);
    const tkn = up.get('token') || '';

    try {
        const response = await fetch(`${apiBase}api/switch_bank.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_no: configEl.dataset.orderNo, bank_name: bankName, token: tkn })
        });
        const res = await response.json();
        if (res.code === 200) {
            window.location.reload();
        }
    } catch (error) { console.error(error); }
};

document.addEventListener('DOMContentLoaded', function () {
    updateInterface();
    const configEl = document.getElementById('checkout-config');
    if (!configEl) return;

    // 倒计时
    let sec = parseInt(configEl.dataset.remainingSeconds);
    if (!isNaN(sec) && sec > 0) {
        const expireTime = Date.now() + (sec * 1000);
        const timer = setInterval(() => {
            const diff = Math.floor((expireTime - Date.now()) / 1000);
            if (diff <= 0) { clearInterval(timer); window.location.reload(); return; }
            updateTimerVisuals(diff);
        }, 1000);
    }

    // 轮询状态
    const up = new URLSearchParams(window.location.search);
    const tkn = up.get('token') || '';
    const statusPoller = setInterval(async () => {
        try {
            const apiBase = window.API_BASE || '';
            const res = await fetch(`${apiBase}api/check_order.php?order_no=${configEl.dataset.orderNo}&token=${tkn}`);
            const json = await res.json();
            if (json.status === 'paid') {
                clearInterval(statusPoller);
                window.location.reload();
            }
        } catch (e) { }
    }, 4000);
});
