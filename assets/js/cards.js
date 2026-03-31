document.addEventListener('DOMContentLoaded', function () {
    // 1. 处理删除确认
    const deleteForms = document.querySelectorAll('form[action-type="delete"]');
    deleteForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            if (!confirm('确定删除该银行卡吗？此操作不可撤销。')) {
                e.preventDefault();
            }
        });
    });

    // 2. 状态切换反馈 (可选)
    const toggleButtons = document.querySelectorAll('.btn-toggle-status');
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            // 这里可以添加 loading 状态等
        });
    });
});
