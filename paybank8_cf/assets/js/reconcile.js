document.addEventListener('DOMContentLoaded', function () {
    const matchBtns = document.querySelectorAll('.btn-match');
    const orderRows = document.querySelectorAll('.order-select-row');
    const txRows = document.querySelectorAll('.tx-select-row');
    const smartToggle = document.getElementById('smartFilterToggle');
    const MATCH_THRESHOLD = 2.0; // 模糊探测阈值 ($2.00)

    const modalElement = document.getElementById('confirmMatchModal');
    if (!modalElement) return;
    const modal = new bootstrap.Modal(modalElement);

    /**
     * 【核心对账算法】校验商户、金额、时序及【银行卡指纹】 (用于推荐与过滤)
     */
    function calculateMatchInfo(txAmount, txMerchantIds, txTime, txCard, orderAmount, orderMerchantId, orderTime, orderCard) {
        // 1. 归属校验 (商户/权限)
        const allowedMerchants = String(txMerchantIds).split(',');
        const merchantMatch = allowedMerchants.includes(String(orderMerchantId));
        if (!merchantMatch) return { isMatch: false };

        // 2. 银行卡指纹校验 (V26.9): 严禁跨卡对账
        // 如果双方都有明确的卡号信息，且卡号不一致，则判定为绝对不匹配
        if (txCard && orderCard && txCard.trim() !== '' && orderCard.trim() !== '') {
            const cleanTxCard = String(txCard).trim();
            const cleanOrderCard = String(orderCard).trim();
            if (cleanTxCard !== cleanOrderCard) return { isMatch: false };
        }

        // 3. 时序校验 (V26.8): 钱必须在单子生成后、30分钟内到账
        const tTime = parseInt(txTime);
        const oTime = parseInt(orderTime);
        if (tTime < oTime - 10 || tTime > oTime + 1800) return { isMatch: false, timeMismatch: true };

        // 4. 金额接近度校验
        const tAmt = parseFloat(txAmount);
        const oAmt = parseFloat(orderAmount);
        const diff = tAmt - oAmt;
        const absDiff = Math.abs(diff);

        return {
            isMatch: absDiff <= MATCH_THRESHOLD,
            diff: diff,
            absDiff: absDiff
        };
    }

    /**
     * 【智能过滤与差异计算】核心更新函数
     */
    function applySmartDisplay(selectedTxRow = null) {
        const isSmartOn = smartToggle && smartToggle.checked;
        
        // 1. 重置所有订单的差异标签
        document.querySelectorAll('.amount-diff-tag').forEach(tag => tag.innerHTML = '');

        // 如果流水列表为空且智能模式开启 -> 隐藏所有订单
        if (txRows.length === 0 && isSmartOn) {
            orderRows.forEach(row => row.classList.add('smart-filtered'));
            return;
        }

        if (!isSmartOn) {
            orderRows.forEach(row => {
                row.classList.remove('smart-filtered', 'potential-match', 'match-highlight');
            });
            txRows.forEach(row => row.classList.remove('match-highlight'));
            return;
        }

        if (selectedTxRow) {
            // A. 精准模式：选中了某笔流水
            const txAmt = selectedTxRow.getAttribute('data-amount');
            const txMids = selectedTxRow.getAttribute('data-merchant-id');
            const txTime = selectedTxRow.getAttribute('data-time');
            const txCard = selectedTxRow.getAttribute('data-card');

            orderRows.forEach(row => {
                const orderAmt = row.getAttribute('data-amount');
                const orderMid = row.getAttribute('data-merchant-id');
                const orderTime = row.getAttribute('data-time');
                const orderCard = row.getAttribute('data-card');
                const info = calculateMatchInfo(txAmt, txMids, txTime, txCard, orderAmt, orderMid, orderTime, orderCard);
                
                if (info.isMatch) {
                    row.classList.remove('smart-filtered');
                    row.classList.add('potential-match');
                    
                    // 显示金额差异气泡
                    const diffTag = row.querySelector('.amount-diff-tag');
                    if (diffTag) {
                        if (info.absDiff < 0.001) {
                            row.classList.add('match-highlight');
                            diffTag.innerHTML = '<span class="badge bg-success small">金额完全正确</span>';
                        } else if (info.diff > 0) {
                            diffTag.innerHTML = `<span class="badge bg-warning text-dark small">用户多付 ${info.diff.toFixed(2)}</span>`;
                        } else {
                            diffTag.innerHTML = `<span class="badge bg-danger small">用户少付 ${Math.abs(info.diff).toFixed(2)}</span>`;
                        }
                    }
                } else {
                    row.classList.add('smart-filtered');
                    row.classList.remove('potential-match', 'match-highlight');
                }
            });
        } else {
            // B. 预览模式：全局扫描哪些订单可能跟现有的流水有关系
            orderRows.forEach(row => {
                const orderAmt = row.getAttribute('data-amount');
                const orderMid = row.getAttribute('data-merchant-id');
                const orderTime = row.getAttribute('data-time');
                const orderCard = row.getAttribute('data-card');
                
                let hasCandidate = false;
                txRows.forEach(tx => {
                    const info = calculateMatchInfo(
                        tx.getAttribute('data-amount'), 
                        tx.getAttribute('data-merchant-id'), 
                        tx.getAttribute('data-time'),
                        tx.getAttribute('data-card'),
                        orderAmt, 
                        orderMid,
                        orderTime,
                        orderCard
                    );
                    if (info.isMatch) hasCandidate = true;
                });

                if (hasCandidate) {
                    row.classList.remove('smart-filtered');
                    row.classList.add('potential-match');
                } else {
                    row.classList.add('smart-filtered');
                }
                row.classList.remove('match-highlight');
            });
        }
    }

    /**
     * 【预热】计算每笔流水匹配数
     */
    function refreshCandidateBadges() {
        txRows.forEach(txRow => {
            const txAmt = txRow.getAttribute('data-amount');
            const txMids = txRow.getAttribute('data-merchant-id');
            const txTime = txRow.getAttribute('data-time');
            const txCard = txRow.getAttribute('data-card');
            let count = 0;

            orderRows.forEach(orderRow => {
                const info = calculateMatchInfo(
                    txAmt, 
                    txMids, 
                    txTime, 
                    txCard,
                    orderRow.getAttribute('data-amount'), 
                    orderRow.getAttribute('data-merchant-id'),
                    orderRow.getAttribute('data-time'),
                    orderRow.getAttribute('data-card')
                );
                if (info.isMatch) count++;
            });

            const badge = txRow.querySelector('.candidate-count');
            if (badge) {
                if (count > 0) {
                    badge.textContent = count;
                    badge.classList.remove('d-none');
                } else {
                    badge.classList.add('d-none');
                }
            }
        });
    }

    // 监听切换
    if (smartToggle) {
        smartToggle.addEventListener('change', () => applySmartDisplay());
    }

    // 1. 点击流水行
    txRows.forEach(row => {
        row.addEventListener('click', function(e) {
            const isAlreadySelected = this.classList.contains('bg-primary-subtle');
            
            txRows.forEach(r => {
                r.classList.remove('bg-primary-subtle', 'border-primary', 'shadow-sm');
                r.style.backgroundColor = '';
            });

            if (isAlreadySelected) {
                applySmartDisplay(null);
            } else {
                this.classList.add('bg-primary-subtle', 'border-primary', 'shadow-sm');
                applySmartDisplay(this);
            }
        });
    });

    // 2. 点击订单行 (选择 Radio)
    orderRows.forEach(row => {
        row.addEventListener('click', function () {
            const radio = this.querySelector('.order-radio');
            if (radio) radio.checked = true;
            
            // 反向查找流水高亮
            const orderAmt = this.getAttribute('data-amount');
            const orderMid = this.getAttribute('data-merchant-id');
            const orderTime = this.getAttribute('data-time');
            const orderCard = this.getAttribute('data-card');
            txRows.forEach(tx => {
                const info = calculateMatchInfo(
                    tx.getAttribute('data-amount'), 
                    tx.getAttribute('data-merchant-id'), 
                    tx.getAttribute('data-time'),
                    tx.getAttribute('data-card'),
                    orderAmt, 
                    orderMid,
                    orderTime,
                    orderCard
                );
                if (info.isMatch) tx.classList.add('match-highlight');
                else tx.classList.remove('match-highlight');
            });
        });
    });

    /**
     * 【时效提示】倒计时逻辑
     */
    function startCountdowns() {
        const timers = document.querySelectorAll('.order-timer');
        const update = () => {
            const now = Math.floor(Date.now() / 1000);
            timers.forEach(timer => {
                const expireAt = parseInt(timer.dataset.expireAt);
                if (!expireAt || isNaN(expireAt) || expireAt <= 0) {
                    timer.textContent = '已过期';
                    timer.classList.replace('text-danger', 'text-secondary');
                    return;
                }
                const diff = expireAt - now;
                if (diff <= 0) {
                    timer.textContent = '已过期';
                    timer.classList.replace('text-danger', 'text-secondary');
                } else {
                    const m = Math.floor(diff / 60);
                    const s = diff % 60;
                    timer.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
                }
            });
        };
        update();
        setInterval(update, 1000);
    }
    startCountdowns();

    // 运行初始逻辑
    refreshCandidateBadges();
    applySmartDisplay();

    // 3. 处理手动匹配按钮点击
    matchBtns.forEach(btn => {
        btn.onclick = function (e) {
            e.stopPropagation();
            const txId = this.getAttribute('data-tx-id');
            const txAmount = this.getAttribute('data-tx-amount');
            const txCurrency = this.getAttribute('data-tx-currency') || 'USD';
            const txSymbol = (txCurrency === 'KHR') ? '៛' : '$';
            const txMemo = this.getAttribute('data-tx-memo') || '无备注';
            const txSender = this.getAttribute('data-tx-sender') || '未知付款人';
            const txRef = this.getAttribute('data-tx-ref') || '无流水号';
            const txMids = this.closest('tr').getAttribute('data-merchant-id'); 
            const txTime = this.closest('tr').getAttribute('data-time');

            const selectedOrder = document.querySelector('input[name="selected_order"]:checked');
            if (!selectedOrder) {
                alert('请先在右侧选择一个待支付订单！');
                return;
            }

            const orderRow = selectedOrder.closest('tr');
            const orderAmount = orderRow.getAttribute('data-amount');
            const orderMid = orderRow.getAttribute('data-merchant-id');
            const orderMemo = selectedOrder.getAttribute('data-order-memo') || '无备注';
            const orderTime = orderRow.getAttribute('data-time');

            document.getElementById('modal_tx_id').value = txId;
            document.getElementById('modal_order_id').value = selectedOrder.value;

            document.getElementById('modal_tx_info').innerHTML = `
                <div class="h5 mb-1 text-success fw-bold">$${txAmount}</div>
                <div class="small text-muted mb-1"><i class="fa-solid fa-user me-1"></i>${txSender}</div>
                <div class="small text-muted" style="font-size: 0.7rem;">${txRef}</div>
            `;

            document.getElementById('modal_order_info').innerHTML = `
                <div class="h5 mb-0">$${orderAmount}</div>
                <div class="small text-muted">${orderMemo}</div>
            `;

            // 【增强校验】(V26.11)
            const allowedMerchants = String(txMids).split(',');
            const isAuthorized = allowedMerchants.includes(String(orderMid));
            const tT = parseInt(txTime);
            const oT = parseInt(orderTime);
            const isTimeValid = (tT >= oT - 10 && tT <= oT + 1800);
            
            const infoBox = modalElement.querySelector('.bg-light') || modalElement.querySelector('.bg-warning-subtle') || modalElement.querySelector('.bg-danger-subtle');
            const submitBtn = modalElement.querySelector('button[type="submit"]');

            if (!isAuthorized) {
                // 严重错误：归属不匹配
                infoBox.className = 'd-flex justify-content-center align-items-center gap-3 bg-danger-subtle p-3 rounded-4 border border-danger';
                infoBox.innerHTML = `
                    <div class="text-danger fw-bold text-center w-100">
                        <i class="fa-solid fa-triangle-exclamation me-2"></i>归属不匹配！禁止跨商户/跨卡对账
                        <div class="small opacity-75 fw-normal mt-1">流水来源非该订单所属商户。</div>
                    </div>
                `;
                if (submitBtn) submitBtn.disabled = true;
            } else if (!isTimeValid) {
                // 时序不匹配警告
                infoBox.className = 'd-flex justify-content-center align-items-center gap-3 bg-warning-subtle p-3 rounded-4 border border-warning';
                infoBox.innerHTML = `
                    <div class="text-warning fw-bold text-center w-100">
                        <i class="fa-solid fa-clock-rotate-left me-2"></i>时序不匹配提醒
                        <div class="small opacity-75 fw-normal mt-1">该款项不在订单创建后的 30 分钟窗口内，请核对姓名。</div>
                        <div class="mt-2 text-dark font-monospace" style="font-size: 0.75rem;">
                            付款人: ${txSender} | 金额: ${txSymbol}${txAmount}
                        </div>
                    </div>
                `;
                if (submitBtn) submitBtn.disabled = false; // 允许客服核对后继续
            } else {
                // 归属正常且时序正常，检查金额差异
                if (submitBtn) submitBtn.disabled = false;
                const absDiff = Math.abs(parseFloat(txAmount) - parseFloat(orderAmount));
                
                infoBox.className = absDiff > 0.001 
                    ? 'd-flex justify-content-center align-items-center gap-3 bg-warning-subtle p-3 rounded-4 border border-warning'
                    : 'd-flex justify-content-center align-items-center gap-3 bg-light p-3 rounded-4';
                
                infoBox.innerHTML = `
                    <div class="text-start">
                        <small class="text-muted d-block">银行流水金额</small>
                        <span class="fw-bold text-success">${txSymbol}${txAmount}</span>
                        <div class="small text-muted" style="font-size:0.7rem">${txSender}</div>
                    </div>
                    <i class="fa-solid fa-right-left text-muted"></i>
                    <div class="text-start">
                        <small class="text-muted d-block">匹配订单应收</small>
                        <span class="fw-bold">$${orderAmount}</span>
                        <div class="small text-muted" style="font-size:0.7rem">${orderMemo}</div>
                    </div>
                `;
            }

            modal.show();
        };
    });

    // 4. 处理流水删除
    window.deleteTx = function (txId, txNo) {
        if (confirm(`确定要彻底删除流水 [${txNo}] 吗？\n此操作不可撤销，并将影响财务对账。`)) {
            const form = document.createElement('form');
            form.method = 'POST';
            const token = document.querySelector('input[name="csrf_token"]')?.value || '';
            form.innerHTML = `
                <input type="hidden" name="csrf_token" value="${token}">
                <input type="hidden" name="action" value="delete_tx">
                <input type="hidden" name="tx_id" value="${txId}">
            `;
            document.body.appendChild(form);
            form.submit();
        }
    };
});
