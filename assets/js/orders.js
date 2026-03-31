document.addEventListener('DOMContentLoaded', function () {
    // 1. 搜索表单自动提交 (可选优化)
    const searchInput = document.querySelector('input[name="search"]');
    if (searchInput) {
        // 可以添加防抖搜索，但目前保持点击提交
    }

    // 2. 确认手动确认 (Bootstrap Modal 驱动)
    const manualConfirmButtons = document.querySelectorAll('.btn-manual-confirm');
    const modalElement = document.getElementById('confirmSupplementModal');

    if (manualConfirmButtons.length > 0 && modalElement) {
        const bsModal = new bootstrap.Modal(modalElement);
        const orderIdInput = document.getElementById('confirmOrderId');
        const orderNoText = document.getElementById('confirmOrderNoText');
        const amountText = document.getElementById('confirmOrderAmountText');

        manualConfirmButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const id = this.dataset.id;
                const orderNo = this.dataset.orderNo || '';
                const outOrderNo = this.dataset.outOrderNo || '—';
                const amount = this.dataset.amount;
                const merchantName = this.dataset.merchantName || '未知商户';
                const bankName = this.dataset.bankName || '未知银行';
                const cardNo = this.dataset.cardNo || '等待分配';

                // 填充数据
                orderIdInput.value = id;
                const sysOrderEl = document.getElementById('confirmSysOrderNoText');
                if(sysOrderEl) sysOrderEl.innerText = orderNo;
                
                const outOrderEl = document.getElementById('confirmOutOrderNoText');
                if(outOrderEl) outOrderEl.innerText = outOrderNo;
                
                amountText.innerText = amount + ' USD';
                
                const merchantEl = document.getElementById('confirmMerchantText');
                if(merchantEl) merchantEl.innerText = merchantName;
                
                const bankCardEl = document.getElementById('confirmBankCardText');
                if(bankCardEl) bankCardEl.innerHTML = bankName + ' <small class="text-muted">(' + cardNo + ')</small>';

                // 显示弹窗
                bsModal.show();
            });
        });
    }

    // 3. 订单剩余时间倒计时逻辑
    const updateOrderTimers = () => {
        const now = Math.floor(Date.now() / 1000);
        document.querySelectorAll('.order-timer').forEach(timer => {
            const expireAt = parseInt(timer.dataset.expireAt);
            const diff = expireAt - now;

            if (diff <= 0) {
                timer.innerText = '已过期';
                timer.classList.remove('text-danger');
                timer.classList.add('text-secondary');
            } else {
                const m = Math.floor(diff / 60);
                const s = diff % 60;
                timer.innerText = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
            }
        });
    };
    if (document.querySelector('.order-timer')) {
        setInterval(updateOrderTimers, 1000);
        updateOrderTimers(); // 立即执行一次
    }
});

/**
 * 分页数量切换跳转
 */
function changePageLimit(select) {
    const limit = select.value;
    const url = new URL(window.location.href);
    url.searchParams.set('limit', limit);
    url.searchParams.set('page', 1);
    window.location.href = url.toString();
}
