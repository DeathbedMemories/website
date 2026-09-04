// ============================================================
// SHOP.JS
// Reads data/products.json and builds the apparel grid on shop.html.
// To add/remove/edit products, edit data/products.json — you do
// NOT need to touch this file or shop.html.
//
// IMPORTANT: this only DISPLAYS products. GitHub Pages is a free
// static file host and cannot process payments by itself. Each
// product's "buyUrl" should point to a listing on a store platform
// that handles checkout for you — see README.md "Setting up the
// shop" for free options (Payhip, Ko-fi, Gumroad, Printful+Etsy).
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('shop-grid');
  if (!grid) return;

  fetch('data/products.json')
    .then(res => res.json())
    .then(products => {
      if (products.length === 0) {
        grid.innerHTML = '<p>No products listed yet.</p>';
        return;
      }
      products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img class="product-image" src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.description || ''}</p>
          <p class="price">${p.price}</p>
          <a class="btn btn-primary" href="${p.buyUrl}" target="_blank" rel="noopener">Shop this design</a>
        `;
        grid.appendChild(card);
      });
    })
    .catch(() => {
      grid.innerHTML = '<p>Couldn\'t load products right now.</p>';
    });
});
