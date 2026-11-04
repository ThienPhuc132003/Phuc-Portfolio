const languageButton = document.getElementById('language');
let language = 'en';
try { if (sessionStorage.getItem('portfolio-language') === 'vi') language = 'vi'; } catch (_) {}
function renderLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-vi]').forEach(node => { node.textContent = node.dataset[language]; });
  languageButton.innerHTML = language === 'en' ? 'EN <span>/ VI</span>' : 'VI <span>/ EN</span>';
  languageButton.setAttribute('aria-label', language === 'en' ? 'Chuyển sang tiếng Việt' : 'Switch to English');
  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
}
renderLanguage();
languageButton.addEventListener('click', () => {
  language = language === 'en' ? 'vi' : 'en';
  try { sessionStorage.setItem('portfolio-language', language); } catch (_) {}
  renderLanguage();
});

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    if (document.querySelector('.transition-track')) gsap.fromTo('.transition-track', {x: 90}, {
      x: -90, ease: 'none', scrollTrigger: {trigger: '.project-transition', start: 'top bottom', end: 'bottom top', scrub: 0.6}
    });
    if (document.querySelector('.hero-art')) gsap.to('.hero-art', {
      y: -55, rotation: -2, ease: 'none', scrollTrigger: {trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.7}
    });
    gsap.utils.toArray('.world-divider').forEach((divider, index) => {
      gsap.fromTo(divider.children[1], {rotation: index ? -180 : 180}, {
        rotation: 0, ease: 'none', scrollTrigger: {trigger: divider, start: 'top bottom', end: 'bottom top', scrub: 0.6}
      });
    });
    gsap.utils.toArray('.project-story').forEach(section => {
      gsap.fromTo(section.querySelector('.story-media'), {y: 48}, {
        y: -36, ease: 'none', scrollTrigger: {trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.7}
      });
    });
    if (document.querySelector('.case-image')) gsap.fromTo('.case-image', {y: 20}, {
      y: -20, ease: 'none', scrollTrigger: {trigger: '.case-hero', start: 'top bottom', end: 'bottom top', scrub: 0.7}
    });
  });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const subject = language === 'vi' ? 'Liên hệ dự án website' : 'Website project inquiry';
  const body = `${language === 'vi' ? 'Tên' : 'Name'}: ${fields.get('name')}\n${language === 'vi' ? 'Liên hệ' : 'Contact'}: ${fields.get('contact')}\n\n${fields.get('message')}`;
  window.location.href = `mailto:thienphuc203302@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
