document.addEventListener('DOMContentLoaded', function () {
    // 商户管理页面交互
    const toggleButtons = document.querySelectorAll('form[action-type="toggle-merchant"] button');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const isFreeze = btn.innerText.includes('冻结');
            if (isFreeze && !confirm('确定要冻结该商户吗？冻结后其 API 将无法使用。')) {
                e.preventDefault();
            }
        });
    });
});
