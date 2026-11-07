const langButton = document.querySelector('#lang');
const status = document.querySelector('.copy-status');
let language = 'en';
try { if (sessionStorage.getItem('portfolio-language') === 'vi') language = 'vi'; } catch (_) {}
function renderLanguage() {
 document.documentElement.lang = language;
 document.querySelectorAll('[data-en][data-vi]').forEach(el => { el.textContent = el.dataset[language]; });
 langButton.textContent = language === 'en' ? 'EN / VI' : 'VI / EN';
 langButton.setAttribute('aria-label', language === 'en' ? 'Chuyển sang tiếng Việt' : 'Switch to English');
 status.textContent = '';
 if (window.ScrollTrigger) ScrollTrigger.refresh();
}
renderLanguage();
langButton.addEventListener('click', () => { language = language === 'en' ? 'vi' : 'en'; try { sessionStorage.setItem('portfolio-language', language); } catch (_) {} renderLanguage(); });
document.querySelector('.copy').addEventListener('click', async () => { try { await navigator.clipboard.writeText('thienphuc203302@gmail.com'); status.textContent = language === 'en' ? 'Email copied.' : 'Đã sao chép email.'; } catch (_) { status.textContent = language === 'en' ? 'Please select the email to copy it.' : 'Hãy chọn địa chỉ email để sao chép.'; } });
if (window.gsap && window.ScrollTrigger) {
 gsap.registerPlugin(ScrollTrigger);
 gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('.opening-title > *', { y: 35, duration: 1, stagger: .1, ease: 'power3.out' });
  gsap.to('.marquee-track', { xPercent: -30, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  gsap.utils.toArray('.project').forEach(project => {
   gsap.fromTo(project.querySelector('.project-media'), { y: 70 }, { y: -45, ease: 'none', scrollTrigger: { trigger: project, start: 'top bottom', end: 'bottom top', scrub: .8 } });
   gsap.to(project.querySelector('.project-orbit'), { rotation: 120, scale: 1.12, ease: 'none', scrollTrigger: { trigger: project, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });
 });
 window.addEventListener('load', () => ScrollTrigger.refresh());
}
