(function(){
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.getElementById('mobileMenu');
  const overlay = document.querySelector('.nav-overlay');
  const closeBtns = document.querySelectorAll('[data-menu-close]');

  if(!toggle || !menu || !overlay) return;

  function openMenu(){
    menu.hidden = false;
    overlay.hidden = false;
    toggle.setAttribute('aria-expanded','true');
    document.documentElement.style.overflow = 'hidden';
  }

  function closeMenu(){
    menu.hidden = true;
    overlay.hidden = true;
    toggle.setAttribute('aria-expanded','false');
    document.documentElement.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });

  closeBtns.forEach(el => el.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeMenu();
  });

  // Fecha ao clicar em links do menu
  menu.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if(a) closeMenu();
  });
})();

