
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const nav = document.getElementById('topnav');

  function closeMenu() {
    navMenu.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', () => {
    const open = !navMenu.classList.contains('show');
    navMenu.classList.toggle('show', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Cierra al tocar un link o fuera del menú
  navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
