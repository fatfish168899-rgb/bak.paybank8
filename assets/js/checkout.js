/**
 * PayBank Checkout Logic
 * Version: 1.2.1
 */

const I18N = {
    km: {
        timer_hint: "សូមបង់ប្រាក់ក្នុងកំឡុងពេលនេះ ប្រព័ន្ធនឹងទូទាត់ដោយស្វ័យប្រវត្ត",
        placeholder_title: "សូមជ្រើសរើសធនាគារបង់ប្រាក់របស់អ្នក",
        placeholder_desc: "សូមជ្រើសរើសធនាគារដើម្បីបង្ហាញកូដបង់ប្រាក់",
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
        no_bank_card: "ធនាគារនេះមិនមានគណនីទេ សូមជ្រើសរើសធនាគារផ្សេងទៀត",
        net_err: "កំហុសបណ្តាញ សូមព្យាយាមម្តងទៀត",
        order_no_label: "លេខបញ្ជាទិញ",
        bank_label_row: "ធនាគារទទួល",
        order_expired: "ការបញ្ជាទិញបានហួសពេល!",
        expired_desc: "ពេលវេលាបង់ប្រាក់បានផុតកំណត់ហើយ ដើម្បីសុវត្ថិភាពមូលនិធិ សូមចាប់ផ្តើមការបង់ប្រាក់ឡើងវិញ។ កូដ QR បច្ចុប្បន្នបានហួសសុពលភាពហើយ។",
        refresh_btn: "ព្យាយាមម្តងទៀត",
        contact_us: "ទាក់ទងមកយើង",
        help_guide: "ការណែនាំ",
        help: "របៀបបង់ប្រាក់",
        click_close: "ចុចលើរូបភាពដើម្បីបិទ",
        help_img: "/assets/img/topup_hint_km.jpg"
    },
    en: {
        timer_hint: "Please pay within this time, system will auto-credit",
        placeholder_title: "Select your payment bank",
        placeholder_desc: "Select a bank to show payment QR",
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
        no_bank_card: "No account for this bank, please choose another",
        net_err: "Network error, please try again",
        order_no_label: "Order No",
        bank_label_row: "Receiving Bank",
        order_expired: "Order Expired!",
        expired_desc: "Payment time has expired. For fund security, please restart the payment. The current QR code is invalid.",
        refresh_btn: "Retry",
        contact_us: "Contact Us",
        help_guide: "Help Guide",
        help: "Help",
        click_close: "Click to close",
        help_img: "/assets/img/topup_hint_en.jpg"
    },
    zh: {
        timer_hint: "请在规定时间内完成支付",
        placeholder_title: "请选择支付银行",
        placeholder_desc: "选择银行以显示付款二维码",
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
        no_bank_card: "该银行暂时无可用账号，请选择其他银行",
        net_err: "网络异常，请刷新后重试",
        order_no_label: "订单号",
        bank_label_row: "收款银行",
        order_expired: "订单已超时!",
        expired_desc: "付款时效已过期，为保障资金安全，请重新发起支付。当前二维码已失效。",
        refresh_btn: "刷新重试",
        contact_us: "联系我们",
        help_guide: "帮助指引",
        help: "充值帮助",
        click_close: "点击图片可收回",
        help_img: "/assets/img/topup_hint_zh.jpg"
    }
};

const BANK_COLORS = {
    'ABA': '#015B7D',
    'WING': '#A9CB37',
    'ACLEDA': '#143C6D',
    'AC': '#143C6D',
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

const urlParams = new URLSearchParams(window.location.search);
const currentToken = urlParams.get('token') || '';

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
    const cleanName = bankName.toUpperCase();
    const key = (cleanName.includes("AC") || cleanName.includes("ACLEDA")) ? 'must_use' : 'recom_use';
    let text = I18N[currentLang][key].replace('{{bank}}', cleanName);
    const icon = key === 'must_use' ? 'fa-triangle-exclamation' : 'fa-mobile-screen-button';
    hintEl.innerHTML = `<i class="fa-solid ${icon} me-1"></i> ${text}`;
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

// 辅助函数：跨平台兼容打开新窗口 (V27.5)
window.safeOpen = function (url) {
    if (!url) return;
    const win = window.open(url, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.href = url;
    }
}

window.togglePanel = function (panelId) {
    const panels = ['contact-panel', 'help-panel'];
    const overlay = document.getElementById('panel-overlay');
    let anyOpen = false;

    panels.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        
        if (id === panelId) {
            if (el.classList.contains('active')) {
                el.classList.remove('active');
                if (id === 'help-panel') document.getElementById('help-panel-tab')?.classList.remove('active');
            } else {
                el.classList.add('active');
                if (id === 'help-panel') document.getElementById('help-panel-tab')?.classList.add('active');
                anyOpen = true;
            }
        } else {
            el.classList.remove('active');
            if (id === 'help-panel') document.getElementById('help-panel-tab')?.classList.remove('active');
        }
    });

    if (overlay) {
        if (anyOpen) {
            overlay.classList.add('show');
            document.body.classList.add('panel-open');
        } else {
            overlay.classList.remove('show');
            document.body.classList.remove('panel-open');
        }
    }
}

window.closeAllPanels = function () {
    ['contact-panel', 'help-panel'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('active');
    });
    document.getElementById('help-panel-tab')?.classList.remove('active');
    
    const overlay = document.getElementById('panel-overlay');
    if (overlay) {
        overlay.classList.remove('show');
    }
    document.body.classList.remove('panel-open');
}

window.copyText = function (id, btn) {
    const el = document.getElementById(id);
    if (!el) return;
    const text = el.innerText.replace('$', '').trim();
    navigator.clipboard.writeText(text).then(() => {
        showToast(I18N[currentLang].copied || 'Copied!');
        if (btn && btn.tagName === 'BUTTON') {
            const originalText = btn.innerText;
            const originalBg = btn.style.backgroundColor;
            btn.innerText = I18N[currentLang].copied;
            btn.style.color = '#ffffff';
            btn.style.backgroundColor = '#28a745';
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.color = '';
                btn.style.backgroundColor = originalBg;
            }, 1000);
        }
    }).catch(err => console.error("Copy failed", err));
};

function updateTimerVisuals(remainingSeconds) {
    const dashArray = 100;
    const strokeEl = document.getElementById('timer-stroke');
    const textEl = document.getElementById('timer-text');

    if (strokeEl) {
        const config = document.getElementById('checkout-config').dataset;
        // 尝试获取初始总时长，默认为 600
        const total = parseInt(config.initialTotalSeconds || 600);
        const offset = (remainingSeconds / total) * dashArray;
        strokeEl.setAttribute('stroke-dasharray', `${offset}, 100`);
    }

    if (textEl) {
        const m = Math.floor(remainingSeconds / 60);
        const s = remainingSeconds % 60;
        textEl.textContent = `${m}:${s < 10 ? '0' + s : s}`;
    }
}

window.selectBankAndStart = function (bankName) {
    window.switchBank(bankName);
}

// 渐进式渲染引擎 2.0 (V6.0)：先显示基础码，后装饰增强
window.renderQrCode = function (qrData, bankName) {
    const qrContainer = document.getElementById("qrcode");
    if (!qrContainer) return;

    const cleanBankName = bankName.toUpperCase();
    const bgColor = BANK_COLORS[cleanBankName] || '#015B7D';

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
        let logoPath = "";
        if (cleanBankName.includes("ABA")) logoPath = "assets/img/bank_logo/aba_logo.png";
        else if (cleanBankName.includes("WING")) logoPath = "assets/img/bank_logo/wing_logo.png";
        else if (cleanBankName.includes("ACLEDA") || cleanBankName === "AC") logoPath = "assets/img/bank_logo/acleda_logo.png";
        else if (cleanBankName.includes("BAKONG")) logoPath = "assets/img/bank_logo/bakong_logo.png";

        if (logoPath) {
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
        } else { deliverToPage(); }
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
    const cleanBankName = bankName.toUpperCase();
    const bgColor = BANK_COLORS[cleanBankName] || '#015B7D';

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
            ctx.fillText(cleanBankName + " KHQR", width / 2, height - 12);

            resolve(canvas.toDataURL("image/png"));
        };

        const logo = new Image();
        let logoPath = "";
        if (cleanBankName.includes("ABA")) logoPath = "assets/img/bank_logo/aba_logo.png";
        else if (cleanBankName.includes("WING")) logoPath = "assets/img/bank_logo/wing_logo.png";
        else if (cleanBankName.includes("ACLEDA") || cleanBankName === "AC") logoPath = "assets/img/bank_logo/acleda_logo.png";
        else if (cleanBankName.includes("BAKONG")) logoPath = "assets/img/bank_logo/bakong_logo.png";

        if (logoPath) {
            logo.src = logoPath;
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
        } else { finalize(); }
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
        const apiBase = (window.API_BASE || '').endsWith('/') ? window.API_BASE : (window.API_BASE ? window.API_BASE + '/' : '');
        const url = (isPick || config.checkoutMode === 'pick') ? apiBase + 'api/assign_card.php' : apiBase + 'api/switch_bank.php';
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_no: config.orderNo, bank_name: bankName, token: currentToken })
        });
        const res = await response.json();
        if (res.code === 200) {
            const data = res.data;
            document.getElementById('copy-amount').innerText = `$${parseFloat(data.real_amount).toFixed(2)}`;
            document.getElementById('display-account-name').textContent = data.account_name || '--';
            document.getElementById('display-card-no').textContent = data.account_no || data.card_no;

            // 填充新字段 (V19.0)
            const bankFullName = (bankName.toUpperCase() === 'AC' || bankName.toUpperCase() === 'ACLEDA') ? 'ACLEDA Bank' : bankName.toUpperCase() + ' Bank';
            if (document.getElementById('display-bank-name')) document.getElementById('display-bank-name').textContent = bankFullName;
            if (document.getElementById('display-order-no')) {
                const config = document.getElementById('checkout-config').dataset;
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
            // 如果后端提示找不到订单（通常是由于已超时变状态），直接刷新页面触发 initPage 的超时判定
            if (res.msg && res.msg.toLowerCase().includes('order not found')) {
                window.location.reload();
                return;
            }
            placeholder.innerHTML = `<div class="p-4 text-center text-danger"><i class="fa-solid fa-triangle-exclamation fa-2x mb-2"></i><div>${msg}</div></div>`;
        }
    } catch (error) {
        console.error("Switch Failure", error);
        placeholder.innerHTML = `<div class="p-4 text-center text-danger">${I18N[currentLang].net_err}</div>`;
    }
};

window.showExpiredState = function () {
    const glLoading = document.getElementById('page-loading');
    if (glLoading) glLoading.style.display = 'none';

    const mask = document.getElementById('expired-mask');
    const container = document.querySelector('.checkout-container');
    if (mask) mask.style.display = 'flex';
    if (container) container.style.display = 'none';
    if (typeof updateInterface === 'function') updateInterface();
};

document.addEventListener('DOMContentLoaded', function () {
    updateInterface();
    const configEl = document.getElementById('checkout-config');
    let timerInterval = null;

    window.startCountdown = function (remainingSeconds) {
        if (timerInterval) clearInterval(timerInterval);

        let sec = parseInt(remainingSeconds);
        // [FIX] 如果时间已经是负数，或者 NaN，立即触发静默超时蒙版
        if (isNaN(sec) || sec <= 0) {
            window.showExpiredState();
            return;
        }

        const expireTime = Date.now() + (sec * 1000);
        const updateTimer = () => {
            const diff = expireTime - Date.now();
            if (diff <= 0) {
                clearInterval(timerInterval);
                window.showExpiredState();
                return;
            }
            const totalSeconds = Math.floor(diff / 1000);
            updateTimerVisuals(totalSeconds);
        };

        timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
    };

    if (configEl && configEl.dataset.orderNo && configEl.dataset.remainingSeconds && configEl.dataset.remainingSeconds !== '600') {
        window.startCountdown(configEl.dataset.remainingSeconds);
    }
    // 状态轮询
    const statusPoller = setInterval(async () => {
        const configEl = document.getElementById('checkout-config');
        if (!configEl) return;
        try {
            const apiBase = (window.API_BASE || '').endsWith('/') ? window.API_BASE : (window.API_BASE ? window.API_BASE + '/' : '');
            const res = await fetch(`${apiBase}api/check_order.php?order_no=${configEl.dataset.orderNo}&token=${currentToken}`);
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
