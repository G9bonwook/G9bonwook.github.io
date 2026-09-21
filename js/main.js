// Add verified public URLs here. Empty values keep contact links hidden.
const contactLinks = {
  github: '',
  email: '', // e.g. mailto:your-address@example.com
  blog: ''
};

Object.entries(contactLinks).forEach(([name, url]) => {
  if (!url) return;
  document.querySelectorAll(`[data-contact="${name}"]`).forEach(link => {
    link.href = url;
    link.hidden = false;
  });
});
if (Object.values(contactLinks).some(Boolean)) {
  document.querySelector('.contact-pending').hidden = true;
}

document.documentElement.classList.add('js');
const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  navigation.classList.toggle('is-open', isOpen);
});
navigation.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (!link) return;
  closeMenu();
  const target = document.querySelector(link.getAttribute('href'));
  if (target) {
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!header.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 601px)').addEventListener('change', closeMenu);
function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

if ('IntersectionObserver' in window) {
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!motionPreference.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('is-pending');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal').forEach(element => {
      element.classList.add('is-pending');
      revealObserver.observe(element);
    });
    motionPreference.addEventListener('change', event => {
      if (event.matches) {
        revealObserver.disconnect();
        document.querySelectorAll('.is-pending').forEach(element => element.classList.remove('is-pending'));
      }
    });
  }
  const links = [...navigation.querySelectorAll('a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      links.forEach(link => {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));
}
