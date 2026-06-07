/* =================================================================
   NAVEGACIÓN COMPARTIDA
   Genera el menú desplegable de calculadoras en todas las páginas.
   👉 PARA AÑADIR UNA CALCULADORA NUEVA: añade una línea a esta lista
      y aparecerá automáticamente en el menú de todas las páginas.
   ================================================================= */
(function () {
  const calculators = [
    { href: 'interes-compuesto.html',        label: 'Interés compuesto' },
    { href: 'rentabilidad-inmobiliaria.html', label: 'Rentabilidad inmobiliaria' },
    { href: 'hipoteca.html',                  label: 'Hipoteca' },
    { href: 'ahorro.html',                    label: 'Ahorro y jubilación' },
    { href: 'comprar-vs-alquilar.html',       label: 'Comprar o alquilar' },
    { href: 'sueldo-neto.html',               label: 'Sueldo neto' },
    { href: 'cuando-comprar-piso.html',       label: '¿Cuándo un piso?' },
    { href: 'comparador-hipotecas.html',      label: 'Comparador de hipotecas' }
  ];

  const container = document.getElementById('site-nav');
  if (!container) return;

  // Página actual (nombre del archivo)
  const current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const onCalc = calculators.some(c => c.href === current);

  // Enlaces del desplegable
  let menu = '';
  calculators.forEach(c => {
    menu += '<a href="' + c.href + '"' + (c.href === current ? ' class="active"' : '') + '>' + c.label + '</a>';
  });

  // Construcción del menú: enlace de Inicio + desplegable de calculadoras
  container.innerHTML =
    '<a href="index.html"' + (current === 'index.html' ? ' class="active"' : '') + '>Inicio</a>' +
    '<div class="dropdown' + (onCalc ? ' active' : '') + '">' +
      '<button type="button" class="dropbtn">Calculadoras <span class="caret">▾</span></button>' +
      '<div class="dropmenu">' + menu + '</div>' +
    '</div>';

  // Abrir / cerrar el desplegable
  const dd = container.querySelector('.dropdown');
  const btn = container.querySelector('.dropbtn');
  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    dd.classList.toggle('open');
  });
  document.addEventListener('click', function () { dd.classList.remove('open'); });
})();
