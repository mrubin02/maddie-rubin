const menuButton = document.querySelector('.menu-button');
const siteNav = document.querySelector('.site-nav');
const backdrop = document.querySelector('.menu-backdrop');

function setMenuOpen(open) {
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  siteNav.setAttribute('aria-hidden', String(!open));
  siteNav.style.transform = open ? 'translateX(0)' : 'translateX(-100%)';
}

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});
backdrop.addEventListener('click', () => setMenuOpen(false));
siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenuOpen(false));
});
