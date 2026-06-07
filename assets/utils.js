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

/* =================================================================
   COMPARTIR RESULTADOS
   Cualquier botón con id "shareBtn" se activa automáticamente. El
   mensaje a compartir se lee de su atributo data-share, que cada
   página actualiza en tiempo real desde su función de cálculo.
   Usa la Web Share API nativa (móvil) cuando existe y, si no,
   muestra un popover con X, WhatsApp y copiar al portapapeles.
   ================================================================= */
function initShareButton() {
  const btn = document.getElementById('shareBtn');
  if (!btn) return;
  const url = location.href.split('?')[0].split('#')[0];

  // Popover de fallback (escritorio / navegadores sin Web Share API)
  const pop = document.createElement('div');
  pop.className = 'share-popover';
  pop.innerHTML =
    '<button data-target="x">𝕏  Compartir en X</button>' +
    '<button data-target="wa">💬  WhatsApp</button>' +
    '<button data-target="copy">🔗  Copiar enlace</button>';
  btn.parentNode.appendChild(pop);

  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const text = btn.getAttribute('data-share') || 'Mira esta calculadora financiera';
    // Móvil moderno: abre el menú nativo de compartir del sistema
    if (navigator.share) {
      try { await navigator.share({ text, url }); } catch (_) { /* el usuario canceló */ }
    } else {
      pop.classList.toggle('open');
    }
  });

  pop.addEventListener('click', async (e) => {
    const item = e.target.closest('button');
    if (!item) return;
    const text = btn.getAttribute('data-share') || '';
    const target = item.dataset.target;
    if (target === 'x') {
      window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(text + ' ' + url), '_blank');
    } else if (target === 'wa') {
      window.open('https://wa.me/?text=' + encodeURIComponent(text + ' ' + url), '_blank');
    } else if (target === 'copy') {
      try {
        await navigator.clipboard.writeText(text + ' ' + url);
        item.textContent = '✓  Copiado';
        setTimeout(() => { item.innerHTML = '🔗  Copiar enlace'; }, 1500);
        return;
      } catch (_) { /* fallback silencioso */ }
    }
    pop.classList.remove('open');
  });

  // Cierra el popover al hacer clic fuera
  document.addEventListener('click', () => pop.classList.remove('open'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initShareButton);
} else {
  initShareButton();
}
