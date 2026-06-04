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

  initProjectSlider();
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
