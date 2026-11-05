const switcher = document.querySelector('#language');
let language = 'en';
try { if (sessionStorage.getItem('portfolio-language') === 'vi') language = 'vi'; } catch (_) {}
function renderLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-vi]').forEach(node => { node.textContent = node.dataset[language]; });
  if (switcher) {
    switcher.textContent = language === 'en' ? 'EN / VI' : 'VI / EN';
    switcher.setAttribute('aria-label', language === 'en' ? 'Chuyển sang tiếng Việt' : 'Switch to English');
  }
  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
}
renderLanguage();
if (switcher) switcher.addEventListener('click', () => {
  language = language === 'en' ? 'vi' : 'en';
  try { sessionStorage.setItem('portfolio-language', language); } catch (_) {}
  renderLanguage();
});
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.fromTo('.case-image', { y: 22 }, { y: -22, ease: 'none', scrollTrigger: { trigger: '.case-image', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
  });
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
