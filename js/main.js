function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initApp() {
  const navToggle = document.querySelector('.nav-toggle');
  const navRight = document.querySelector('.nav-right');
  const navLinks = document.querySelectorAll('.nav-link, .float-nav-link');

  if (navToggle && navRight) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navRight.classList.toggle('active');
      navToggle.setAttribute(
        'aria-expanded',
        navRight.classList.contains('active')
      );
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navRight.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  initHeaderScroll();
  initHeroEntrance();
  initScrollReveal();
  initParallax();
  initTiltCards();
  initCounters();
  initProjectSlider();
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initHeroEntrance() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  if (prefersReducedMotion()) {
    hero.classList.add('hero--ready');
    return;
  }

  requestAnimationFrame(() => {
    setTimeout(() => hero.classList.add('hero--ready'), 60);
  });
}

function initScrollReveal() {
  const reduced = prefersReducedMotion();
  const selectors = [
    '.profile-card',
    '.profile-bio',
    '.profile-tags',
    '.profile-exp__item',
    '.process-header',
    '.process-card',
    '.services-header',
    '.services-card',
    '.achievements-header',
    '.achievements-block',
    '.achievement-card',
    '.projects-header',
    '.projects-card',
    '.projects-trust',
    '.partnership-icon',
    '.partnership-title',
    '.partnership-subtitle',
    '.partnership-actions',
  ];

  const seen = new Set();
  const elements = [];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      elements.push(el);
    });
  });

  elements.forEach((el) => {
    el.classList.add('reveal');
    if (el.matches('.projects-card, .services-card')) {
      el.classList.add('reveal--scale');
    }
  });

  document.querySelectorAll('.profile-exp__item').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', `${i * 0.08}s`);
  });

  document.querySelectorAll('.process-card, .achievement-card').forEach((el, i) => {
    el.style.setProperty('--reveal-delay', `${(i % 4) * 0.07}s`);
  });

  if (reduced) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

function initParallax() {
  if (prefersReducedMotion()) return;

  const heroContent = document.querySelector('.hero-content');
  const heroBeam = document.querySelector('.hero-light__beam');
  if (!heroContent && !heroBeam) return;

  let ticking = false;

  const update = () => {
    const y = Math.min(window.scrollY, window.innerHeight);
    const progress = y / window.innerHeight;

    if (heroContent) {
      heroContent.style.transform = `translateY(${y * 0.04}px)`;
      heroContent.style.opacity = String(1 - progress * 0.15);
    }

    if (heroBeam) {
      heroBeam.style.transform = `rotate(33deg) translateY(${y * 0.08}px)`;
    }

    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
}

function initTiltCards() {
  if (prefersReducedMotion()) return;

  const cards = document.querySelectorAll('.profile-card, .projects-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      card.classList.add('is-tilting');
      card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) translateY(-6px)`;
      card.style.boxShadow = '0 24px 48px rgba(42, 51, 71, 0.14)';
    });

    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-tilting');
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

function initCounters() {
  const counters = document.querySelectorAll('.projects-trust strong');
  if (!counters.length) return;

  const reduced = prefersReducedMotion();

  const animate = (el) => {
    const raw = el.textContent.trim();
    const match = raw.match(/(\d+)/);
    if (!match) return;

    const target = Number.parseInt(match[1], 10);
    const suffix = raw.replace(match[1], '');
    const duration = reduced ? 0 : 1400;
    const start = performance.now();

    const step = (now) => {
      const progress = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const value = Math.round(target * eased);
      el.textContent = `${value}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  if (reduced) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animate(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

function initProjectSlider() {
  const belt = document.getElementById('projectSliderBelt');
  if (!belt) return;

  const track = belt.querySelector('.project-slider__track');
  if (!track || belt.dataset.marqueeReady === 'true') return;

  const clone = track.cloneNode(true);
  clone.setAttribute('aria-hidden', 'true');
  belt.appendChild(clone);
  belt.dataset.marqueeReady = 'true';

  const setMarqueeSpeed = () => {
    const width = track.offsetWidth;
    const speed = 48;
    belt.style.setProperty('--marquee-duration', `${width / speed}s`);
  };

  setMarqueeSpeed();
  window.addEventListener('resize', setMarqueeSpeed);
}

document.addEventListener('sectionsLoaded', initApp);
