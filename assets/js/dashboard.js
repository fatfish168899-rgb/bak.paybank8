document.addEventListener('DOMContentLoaded', function() {
    const chartEl = document.getElementById('revenueChart');
    if (!chartEl) return;

    const ctx = chartEl.getContext('2d');
    const labels = JSON.parse(chartEl.getAttribute('data-labels') || '[]');
    const data = JSON.parse(chartEl.getAttribute('data-values') || '[]');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '流水金额',
                data: data,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#3b82f6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { borderDash: [2, 2] } },
                x: { grid: { display: false } }
            }
        }
    });
});
