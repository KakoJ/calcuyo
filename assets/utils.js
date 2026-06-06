/* =================================================================
   UTILIDADES COMPARTIDAS
   ================================================================= */

// Formato de moneda en euros (sin decimales)
const euro = (n) => isFinite(n)
  ? n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
  : '—';

// Formato de moneda con 2 decimales
const euro2 = (n) => isFinite(n)
  ? n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 })
  : '—';

// Formato de porcentaje
const pct = (n) => isFinite(n)
  ? n.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' %'
  : '—';

// Lee el valor numérico de un input por id
const num = (id) => parseFloat(document.getElementById(id).value) || 0;

// Tema común para Chart.js (se aplica si Chart está cargado)
if (window.Chart) {
  Chart.defaults.color = '#64748b';        // texto/leyendas en gris medio
  Chart.defaults.borderColor = '#e5eaf1';  // líneas de rejilla suaves (tema claro)
  Chart.defaults.font.family = "-apple-system, 'Segoe UI', Roboto, sans-serif";
}

// Configuraciones reutilizables para los gráficos
const tooltipEuro = {
  callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${euro(ctx.parsed.y)}` }
};
const axisEuro = {
  ticks: { callback: (v) => '€' + (v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v) }
};
