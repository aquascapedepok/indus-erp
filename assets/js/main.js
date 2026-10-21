document.addEventListener('DOMContentLoaded', () => {
  const sidebarToggle = document.getElementById('sidebarToggle');
  const erpSidebar = document.getElementById('erpSidebar');
  if (sidebarToggle && erpSidebar) {
    sidebarToggle.addEventListener('click', () => {
      erpSidebar.classList.toggle('show');
    });
  }

  const clockEl = document.getElementById('plantClock');
  if (clockEl) {
    setInterval(() => {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString('id-ID', { hour12: false }) + ' WIB';
    }, 1000);
  }

  const oeeGaugeContainer = document.querySelector("#oeeMasterGauge");
  if (oeeGaugeContainer && typeof ApexCharts !== 'undefined') {
    const oeeGauge = new ApexCharts(oeeGaugeContainer, {
      series: [80.3],
      chart: { height: 240, type: 'radialBar', offsetY: -10 },
      plotOptions: {
        radialBar: {
          startAngle: -135, endAngle: 135,
          hollow: { size: '70%', background: 'transparent' },
          track: { background: 'rgba(255, 255, 255, 0.1)', strokeWidth: '100%' },
          dataLabels: {
            name: { show: true, fontSize: '12px', color: '#94a3b8', offsetY: 20 },
            value: { offsetY: -15, fontSize: '28px', color: '#ffffff', fontWeight: 800, formatter: val => val + '%' }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: { shade: 'dark', type: 'horizontal', shadeIntensity: 0.5, gradientToColors: ['#10b981'], inverseColors: true, opacityFrom: 1, opacityTo: 1, stops: [0, 100] }
      },
      stroke: { dashArray: 4 },
      labels: ['SKOR OEE AKTUAL']
    });
    oeeGauge.render();
  }

  const hourlyContainer = document.querySelector("#hourlyTrendChart");
  if (hourlyContainer && typeof ApexCharts !== 'undefined') {
    const hourlyChart = new ApexCharts(hourlyContainer, {
      series: [
        { name: 'Target Standar (Pcs)', data: [1800, 1800, 1800, 1800, 1800, 1800, 1800, 1800] },
        { name: 'Output Aktual Metal (Pcs)', data: [1650, 1720, 1790, 1680, 1820, 1850, 1760, 1810] },
        { name: 'Output Aktual Vislon (Pcs)', data: [1450, 1520, 1610, 1590, 1640, 1710, 1680, 1720] }
      ],
      chart: { height: 280, type: 'line', toolbar: { show: false }, fontFamily: 'Plus Jakarta Sans, sans-serif' },
      colors: ['#94a3b8', '#1e3e62', '#ff6500'],
      stroke: { width: [2, 3, 3], curve: 'smooth', dashArray: [5, 0, 0] },
      xaxis: { categories: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00'] },
      legend: { position: 'top', horizontalAlign: 'right' }
    });
    hourlyChart.render();
  }
});
