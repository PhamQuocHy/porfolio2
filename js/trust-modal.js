const TRUST_SLIDES = [
  {
    title: 'Giang Anh Nội thất đẹp',
    subtitle:
      'Triển khai chiến lược thương hiệu và nội dung số, tăng nhận diện tại thị trường nội thất Cần Thơ.',
    sidebar: 'Đối tác tin cậy',
    images: [
      { src: 'images/F8rOBHbbIkzGRluKefWlxCX9WI.avif', alt: 'Key visual thương hiệu', layout: '1' },
      { src: 'images/project-1.png', alt: 'Landing page', layout: '2' },
      { src: 'images/project-3.png', alt: 'Social campaign', layout: '3' },
      { src: 'images/avt2.jpg', alt: 'Lifestyle content', layout: '4' },
      { src: 'images/z7174474744548_a5729aee8355d13fdfdeab45a65c38ee.jpg', alt: 'Bao bì & POSM', layout: '5' },
      { src: 'images/project-4.png', alt: 'Brand story', layout: '6' },
      { src: 'images/project-2.png', alt: 'Performance ads', layout: '7' },
      { src: 'images/lg8tfpW7D7GQUO4F5VtdVe8OjjM.avif', alt: 'Báo cáo chiến dịch', layout: '8' },
    ],
  },
  {
    title: 'AME Digital',
    subtitle:
      'Xây dựng hệ thống nội dung và funnel digital giúp tăng trưởng lead B2B ổn định qua nhiều quý.',
    sidebar: 'Digital partner',
    images: [
      { src: 'images/lg8tfpW7D7GQUO4F5VtdVe8OjjM.avif', alt: 'Dashboard KPI', layout: '1' },
      { src: 'images/project-2.png', alt: 'Analytics UI', layout: '2' },
      { src: 'images/project-1.png', alt: 'Funnel design', layout: '3' },
      { src: 'images/avt3.jpg', alt: 'Team workshop', layout: '4' },
      { src: 'images/XJP6N21SKyA8OD0sTiV9H2m0.avif', alt: 'Email marketing', layout: '5' },
      { src: 'images/project-3.png', alt: 'Brand assets', layout: '6' },
      { src: 'images/F8rOBHbbIkzGRluKefWlxCX9WI.avif', alt: 'Paid social', layout: '7' },
      { src: 'images/project-4.png', alt: 'Case study', layout: '8' },
    ],
  },
  {
    title: 'Alpha Group',
    subtitle:
      'Đồng hành định vị thương hiệu đầu tư, thống nhất trải nghiệm truyền thông trên các kênh số.',
    sidebar: 'Brand growth',
    images: [
      { src: 'images/XJP6N21SKyA8OD0sTiV9H2m0.avif', alt: 'Corporate identity', layout: '1' },
      { src: 'images/project-3.png', alt: 'Investor deck', layout: '2' },
      { src: 'images/project-2.png', alt: 'LinkedIn content', layout: '3' },
      { src: 'images/avt4.jpg', alt: 'Event coverage', layout: '4' },
      { src: 'images/project-1.png', alt: 'Website refresh', layout: '5' },
      { src: 'images/F8rOBHbbIkzGRluKefWlxCX9WI.avif', alt: 'PR kit', layout: '6' },
      { src: 'images/lg8tfpW7D7GQUO4F5VtdVe8OjjM.avif', alt: 'Media plan', layout: '7' },
      { src: 'images/project-4.png', alt: 'Growth report', layout: '8' },
    ],
  },
  {
    title: 'Đối tác Freelance',
    subtitle:
      'Hợp tác sản xuất content và chiến dịch social cho nhiều ngành: F&B, lifestyle và edtech.',
    sidebar: 'Collaboration',
    images: [
      { src: 'images/profile-photo.png', alt: 'Content creator', layout: '1' },
      { src: 'images/project-4.png', alt: 'Social series', layout: '2' },
      { src: 'images/project-3.png', alt: 'Reels concept', layout: '3' },
      { src: 'images/avt2.jpg', alt: 'Shooting on set', layout: '4' },
      { src: 'images/project-2.png', alt: 'Campaign visual', layout: '5' },
      { src: 'images/F8rOBHbbIkzGRluKefWlxCX9WI.avif', alt: 'UGC hub', layout: '6' },
      { src: 'images/lg8tfpW7D7GQUO4F5VtdVe8OjjM.avif', alt: 'Community', layout: '7' },
      { src: 'images/XJP6N21SKyA8OD0sTiV9H2m0.avif', alt: 'Monthly report', layout: '8' },
    ],
  },
];

let trustIndex = 0;
let trustLastFocus = null;

function getTrustModalElements() {
  return {
    modal: document.getElementById('trustModal'),
    title: document.getElementById('trustModalTitle'),
    subtitle: document.getElementById('trustModalSubtitle'),
    sidebar: document.getElementById('trustModalSidebar'),
    gallery: document.getElementById('trustModalGallery'),
    counter: document.getElementById('trustModalCounter'),
    prevBtn: document.getElementById('trustModalPrev'),
    nextBtn: document.getElementById('trustModalNext'),
    closeBtn: document.querySelector('#trustModal .project-modal__close'),
  };
}

function renderTrustGallery(images) {
  return images
    .map(
      ({ src, alt, layout }) => `
        <figure class="project-modal__gallery-item project-modal__gallery-item--${layout}">
          <img src="${src}" alt="${alt}" loading="lazy">
        </figure>
      `
    )
    .join('');
}

function renderTrustSlide(index, animate = false) {
  const slide = TRUST_SLIDES[index];
  const { title, subtitle, sidebar, gallery, counter } = getTrustModalElements();
  if (!slide || !gallery) return;

  const update = () => {
    title.textContent = slide.title;
    subtitle.textContent = slide.subtitle;
    sidebar.textContent = slide.sidebar;
    gallery.innerHTML = renderTrustGallery(slide.images);
    counter.textContent = `${index + 1} / ${TRUST_SLIDES.length}`;
    gallery.classList.remove('is-changing');
  };

  if (!animate) {
    update();
    return;
  }

  gallery.classList.add('is-changing');
  window.setTimeout(update, 120);
}

function openTrustModal(startIndex = 0) {
  const { modal, closeBtn } = getTrustModalElements();
  if (!modal || !TRUST_SLIDES.length) return;

  const projectModal = document.getElementById('projectModal');
  if (projectModal?.classList.contains('is-open')) {
    projectModal.classList.remove('is-open');
    projectModal.setAttribute('aria-hidden', 'true');
  }

  trustIndex = ((startIndex % TRUST_SLIDES.length) + TRUST_SLIDES.length) % TRUST_SLIDES.length;
  renderTrustSlide(trustIndex);

  trustLastFocus = document.activeElement;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  closeBtn?.focus();
}

function closeTrustModal() {
  const { modal } = getTrustModalElements();
  if (!modal) return;

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  if (trustLastFocus && typeof trustLastFocus.focus === 'function') {
    trustLastFocus.focus();
  }
}

function goTrustSlide(direction) {
  trustIndex =
    (trustIndex + direction + TRUST_SLIDES.length) % TRUST_SLIDES.length;
  renderTrustSlide(trustIndex, true);
}

function initTrustModal() {
  const { modal, prevBtn, nextBtn } = getTrustModalElements();
  if (!modal) return;

  document.querySelectorAll('[data-trust-index]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      const index = Number.parseInt(trigger.getAttribute('data-trust-index'), 10);
      openTrustModal(Number.isNaN(index) ? 0 : index);
    });
  });

  prevBtn?.addEventListener('click', () => goTrustSlide(-1));
  nextBtn?.addEventListener('click', () => goTrustSlide(1));

  modal.querySelectorAll('[data-close-trust-modal]').forEach((el) => {
    el.addEventListener('click', closeTrustModal);
  });

  document.addEventListener('keydown', (event) => {
    if (!modal.classList.contains('is-open')) return;

    if (event.key === 'Escape') {
      closeTrustModal();
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTrustSlide(-1);
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTrustSlide(1);
    }
  });
}

document.addEventListener('sectionsLoaded', initTrustModal);
