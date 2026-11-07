const switcher = document.querySelector('#language');
let language = 'en';
try { if (sessionStorage.getItem('portfolio-language') === 'vi') language = 'vi'; } catch (_) {}
function renderLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-en][data-vi]').forEach(node => { node.textContent = node.dataset[language]; });
  switcher.innerHTML = language === 'en' ? 'EN <span>/ VI</span>' : 'VI <span>/ EN</span>';
  switcher.setAttribute('aria-label', language === 'en' ? 'Chuyển sang tiếng Việt' : 'Switch to English');
  document.querySelector('.copy-status').textContent = '';
  if (window.ScrollTrigger) ScrollTrigger.refresh();
}
renderLanguage();
switcher.addEventListener('click', () => { language = language === 'en' ? 'vi' : 'en'; try { sessionStorage.setItem('portfolio-language', language); } catch (_) {} renderLanguage(); });
document.querySelector('.copy').addEventListener('click', async () => { const status = document.querySelector('.copy-status'); try { await navigator.clipboard.writeText('thienphuc203302@gmail.com'); status.textContent = language === 'en' ? 'Email copied.' : 'Đã sao chép email.'; } catch (_) { status.textContent = language === 'en' ? 'Please select the email to copy it.' : 'Hãy chọn địa chỉ email để sao chép.'; } });
if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
    gsap.from('.hero-copy > *', { y: 22, duration: .8, stagger: .07, ease: 'power3.out' });
    gsap.to('.orbit', { rotation: 35, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.to('.hello-stamp', { y: -45, rotation: 28, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.utils.toArray('.project-visual').forEach((visual) => { gsap.fromTo(visual, { y: 35 }, { y: -20, ease: 'none', scrollTrigger: { trigger: visual.closest('.project'), start: 'top bottom', end: 'bottom top', scrub: .8 } }); });
    gsap.to('.star', { rotation: 130, ease: 'none', scrollTrigger: { trigger: '.work-intro', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
