// ============================================================
// HAT-SWATCHES.JS
// Powers the color swatches on the shop page: clicking one swaps
// the main product photo and updates the "Color" dropdown in the
// request form to match, so the order comes through with the
// right color already selected.
//
// To add a 4th color later: add another
//   <button class="hat-swatch" data-color="..." data-image="images/shop/your-file.jpg" style="background:#hexcode;"></button>
// inside .hat-swatches in shop.html, upload the matching photo to
// images/shop/, AND add a matching <option>YourColor</option> to
// the Color <select> in the request form. You don't need to edit
// this file.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const swatches = document.querySelectorAll('.hat-swatch');
  const img = document.getElementById('hat-image');
  const colorSelect = document.getElementById('shop-color');
  if (!swatches.length || !img) return;

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      img.src = swatch.dataset.image;
      img.alt = `${swatch.dataset.color} "No Gracias" cap`;
      if (colorSelect) colorSelect.value = swatch.dataset.color;
    });
  });
});
