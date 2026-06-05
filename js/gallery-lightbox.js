let lightboxImages = [];
let lightboxIndex = 0;
let lightboxLastFocus = null;

function getLightboxElements() {
  return {
    lightbox: document.getElementById('galleryLightbox'),
    image: document.getElementById('lightboxImage'),
    caption: document.getElementById('lightboxCaption'),
    counter: document.getElementById('lightboxCounter'),
    prevBtn: document.getElementById('lightboxPrev'),
    nextBtn: document.getElementById('lightboxNext'),
  };
}

function isLightboxOpen() {
  return document.getElementById('galleryLightbox')?.classList.contains('is-open');
}

function renderLightboxSlide() {
  const { image, caption, counter, prevBtn, nextBtn } = getLightboxElements();
  const slide = lightboxImages[lightboxIndex];
  if (!slide || !image) return;

  image.src = slide.src;
  image.alt = slide.alt;

  if (caption) {
    caption.textContent = slide.alt;
    caption.hidden = !slide.alt;
  }

  if (counter) {
    counter.textContent = `${lightboxIndex + 1} / ${lightboxImages.length}`;
  }

  if (prevBtn) prevBtn.disabled = lightboxImages.length <= 1;
  if (nextBtn) nextBtn.disabled = lightboxImages.length <= 1;
}

function openGalleryLightbox(images, startIndex = 0) {
  const { lightbox } = getLightboxElements();
  if (!lightbox || !images?.length) return;

  lightboxImages = images;
  lightboxIndex = Math.max(0, Math.min(startIndex, images.length - 1));
  renderLightboxSlide();

  lightboxLastFocus = document.activeElement;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.classList.add('lightbox-open');

  getLightboxElements().prevBtn?.focus();
}

function closeGalleryLightbox() {
  const { lightbox, image } = getLightboxElements();
  if (!lightbox?.classList.contains('is-open')) return;

  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');

  if (image) {
    image.removeAttribute('src');
  }

  lightboxImages = [];

  if (lightboxLastFocus && typeof lightboxLastFocus.focus === 'function') {
    lightboxLastFocus.focus();
  }
}

function goLightboxSlide(direction) {
  if (lightboxImages.length <= 1) return;

  lightboxIndex =
    (lightboxIndex + direction + lightboxImages.length) % lightboxImages.length;
  renderLightboxSlide();
}

function collectGalleryImages(galleryEl) {
  return [...galleryEl.querySelectorAll('.project-modal__gallery-item')].map((item) => {
    const img = item.querySelector('img');
    return {
      src: item.dataset.lightboxSrc || img?.currentSrc || img?.src || '',
      alt: img?.alt || '',
    };
  });
}

function initGalleryLightbox() {
  const { lightbox, prevBtn, nextBtn } = getLightboxElements();
  if (!lightbox) return;

  document.addEventListener('click', (event) => {
    const item = event.target.closest('.project-modal__gallery-item');
    if (!item) return;

    const gallery = item.closest('.project-modal__gallery');
    if (!gallery) return;

    event.preventDefault();
    event.stopPropagation();

    const images = collectGalleryImages(gallery);
    const index = [...gallery.querySelectorAll('.project-modal__gallery-item')].indexOf(item);
    openGalleryLightbox(images, index);
  });

  lightbox.querySelectorAll('[data-close-lightbox]').forEach((el) => {
    el.addEventListener('click', closeGalleryLightbox);
  });

  prevBtn?.addEventListener('click', () => goLightboxSlide(-1));
  nextBtn?.addEventListener('click', () => goLightboxSlide(1));

  document.addEventListener('keydown', (event) => {
    if (!isLightboxOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      closeGalleryLightbox();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goLightboxSlide(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goLightboxSlide(1);
    }
  }, true);
}

document.addEventListener('DOMContentLoaded', initGalleryLightbox);
