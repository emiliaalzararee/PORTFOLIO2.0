
const images = document.querySelectorAll('.carousel img');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let current = 0;

function updateCarousel() {
  images.forEach((img) => img.classList.remove('prev', 'active', 'next'));
  const total = images.length;
  const prevIndex = (current - 1 + total) % total;
  const nextIndex = (current + 1) % total;

  images[prevIndex].classList.add('prev');
  images[current].classList.add('active');
  images[nextIndex].classList.add('next');
}

prevBtn.addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  current = (current + 1) % images.length;
  updateCarousel();
});

updateCarousel();

setInterval(() => {
  current = (current + 1) % images.length;
  updateCarousel();
}, 4000);


const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxClose = document.querySelector('.lightbox-close');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxImg.src = item.src;
    captionText.innerText = item.alt;
  });
});

lightboxClose.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) lightbox.style.display = 'none';
});
