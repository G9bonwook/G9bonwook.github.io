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
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link) return;
  if (link.getAttribute('aria-disabled') === 'true') { event.preventDefault(); return; }
  closeMenu();
  const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
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
}

// Use ordered section positions so long projects, reverse scrolling, and direct
// hash links all keep the same current item. Updates run once per animation frame.
const readingGuide = document.querySelector('.reading-guide');
const tocLinks = [...document.querySelectorAll('.toc-list a[data-section]')];
const readingSections = tocLinks.map(link => document.querySelector(link.hash));
const sectionSelect = document.querySelector('#section-select');
const previousLink = document.querySelector('.reading-previous');
const nextLink = document.querySelector('.reading-next');
let activeIndex = -1;
let readingFrame = 0;
function updateReadingGuide() {
  readingFrame = 0;
  const guideBottom = window.innerWidth < 1280 ? readingGuide.getBoundingClientRect().bottom : 0;
  const readingLine = Math.max(header.getBoundingClientRect().bottom, guideBottom) + 32;
  let index = 0;
  readingSections.forEach((section, sectionIndex) => {
    if (section.getBoundingClientRect().top <= readingLine) index = sectionIndex;
  });
  if (Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight - 2) index = tocLinks.length - 1;
  if (index === activeIndex) return;
  activeIndex = index;
  tocLinks.forEach((link, linkIndex) => {
    if (linkIndex === index) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const current = tocLinks[index];
  const label = current.dataset.label;
  document.querySelector('.reading-title').textContent = label;
  document.querySelector('.reading-count').textContent = `${String(index + 1).padStart(2, '0')} / ${String(tocLinks.length).padStart(2, '0')}`;
  sectionSelect.value = current.hash;
  if (window.innerWidth >= 1280) {
    const bounds = readingGuide.getBoundingClientRect();
    const status = document.querySelector('.reading-status').getBoundingClientRect();
    const item = current.getBoundingClientRect();
    if (item.bottom > bounds.bottom - 12) readingGuide.scrollTop += item.bottom - bounds.bottom + 12;
    else if (item.top < status.bottom + 12) readingGuide.scrollTop -= status.bottom - item.top + 12;
  }
  navigation.querySelectorAll('a[href^="#"]').forEach(link => {
    if (link.hash === `#${current.dataset.nav}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  [[previousLink, index - 1, '이전'], [nextLink, index + 1, '다음']].forEach(([link, targetIndex, direction]) => {
    const available = targetIndex >= 0 && targetIndex < tocLinks.length;
    link.setAttribute('aria-disabled', String(!available));
    link.tabIndex = available ? 0 : -1;
    link.href = available ? tocLinks[targetIndex].hash : current.hash;
    link.setAttribute('aria-label', available ? `${direction}: ${tocLinks[targetIndex].dataset.label}` : `${direction} 항목 없음`);
  });
}
function scheduleReadingUpdate() {
  if (!readingFrame) readingFrame = requestAnimationFrame(updateReadingGuide);
}
sectionSelect.addEventListener('change', () => {
  const destination = sectionSelect.value;
  if (!destination.startsWith('#')) { window.location.assign(destination); return; }
  const target = document.getElementById(destination.slice(1));
  if (!target) return;
  window.location.hash = target.id;
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
});
window.addEventListener('scroll', scheduleReadingUpdate, { passive: true });
function refreshReadingGuide() {
  activeIndex = -1;
  scheduleReadingUpdate();
}
window.addEventListener('resize', refreshReadingGuide);
window.addEventListener('hashchange', scheduleReadingUpdate);
// A restored page can retain the destination selected before leaving it.
window.addEventListener('pageshow', refreshReadingGuide);
window.addEventListener('load', scheduleReadingUpdate);
if ('ResizeObserver' in window) new ResizeObserver(scheduleReadingUpdate).observe(document.querySelector('main'));
updateReadingGuide();
