(function(){
  const btn = document.querySelector('.nav-toggle');
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('navOverlay');

  if(!btn || !menu || !overlay) return;

  function openMenu(){
    btn.classList.add('is-open');
    menu.classList.add('is-open');
    btn.setAttribute('aria-expanded','true');
    overlay.hidden = false;
    menu.hidden = false;
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMenu(){
    btn.classList.remove('is-open');
    menu.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
    overlay.hidden = true;

    // espera a animação terminar antes de esconder de vez
    window.setTimeout(() => { menu.hidden = true; }, 220);
    document.documentElement.style.overflow = '';
  }

  function isOpen(){
    return btn.classList.contains('is-open');
  }

  btn.addEventListener('click', () => {
    isOpen() ? closeMenu() : openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && isOpen()) closeMenu();
  });

  // fecha ao clicar em qualquer link do menu
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(a) closeMenu();
  });

  // estado inicial (garante fechado)
  overlay.hidden = true;
  menu.hidden = true;
  btn.setAttribute('aria-expanded','false');
})();
