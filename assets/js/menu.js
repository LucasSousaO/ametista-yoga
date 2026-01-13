(function(){
  const btn = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('navOverlay');

  if(!btn || !menu || !overlay) return;

  const ANIM_MS = 220;

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

    window.setTimeout(() => { menu.hidden = true; }, ANIM_MS);
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

  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(a) closeMenu();
  });

  // Estado inicial garantido
  overlay.hidden = true;
  menu.hidden = true;
  btn.setAttribute('aria-expanded','false');
})();
