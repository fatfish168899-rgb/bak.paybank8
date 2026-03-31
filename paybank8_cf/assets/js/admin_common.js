document.addEventListener('DOMContentLoaded', function () {
    // 全局 Alert 自动关闭 (可选)
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
            if (bsAlert) bsAlert.close();
        }, 5000); // 5秒后自动关闭
    });
});
