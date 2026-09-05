// ============================================================
// MAIN.JS — shared behavior for every page (mobile menu toggle)
// You shouldn't need to edit this file.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }
});
