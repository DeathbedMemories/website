// ============================================================
// REVEAL.JS
// Fades sections in as you scroll to them, and highlights the
// matching stop in the homepage trail nav. You shouldn't need to
// edit this file.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  // Highlight the active trail-nav stop based on scroll position
  const stops = document.querySelectorAll('.trail-stop[data-section]');
  const sections = Array.from(stops)
    .map(stop => document.getElementById(stop.dataset.section))
    .filter(Boolean);

  if (stops.length && sections.length && 'IntersectionObserver' in window) {
    const sectionIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stops.forEach(stop => stop.classList.remove('is-active'));
          const match = document.querySelector(`.trail-stop[data-section="${entry.target.id}"]`);
          if (match) match.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(sec => sectionIo.observe(sec));
  }
});
