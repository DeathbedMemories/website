// ============================================================
// PHOTOS.JS
// Reads data/photos.json and builds both the photo gallery grid
// AND the "which photo" dropdown in the print order form below it.
// To add/remove a photo, edit data/photos.json — you do NOT need
// to touch this file or photography.html.
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('photo-gallery');
  const dropdown = document.getElementById('print-photo-choice');
  if (!gallery) return;

  fetch('data/photos.json')
    .then(res => res.json())
    .then(photos => {
      if (photos.length === 0) {
        gallery.innerHTML = '<p>No photos uploaded yet.</p>';
        return;
      }
      photos.forEach(photo => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img class="product-image" src="${photo.image}" alt="${photo.title}">
          <h3>${photo.title}</h3>
          <p>${photo.location || ''}</p>
        `;
        gallery.appendChild(card);

        if (dropdown) {
          const opt = document.createElement('option');
          opt.value = photo.title;
          opt.textContent = photo.title;
          dropdown.appendChild(opt);
        }
      });
    })
    .catch(() => {
      gallery.innerHTML = '<p>Couldn\'t load photos right now.</p>';
    });
});
