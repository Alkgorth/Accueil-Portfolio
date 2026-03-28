// ─── Navigation : active state au scroll ───────────────────────────────────
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks  = document.querySelectorAll('.nav__links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -55% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(s => observer.observe(s));

// ─── CV : fallback si le PDF ne charge pas ─────────────────────────────────
const iframe = document.querySelector('.cv__iframe');
if (iframe) {
  iframe.addEventListener('error', () => {
    iframe.classList.add('hidden');
  });
}

// ─── Apparition progressive des cartes projet au scroll ───────────────────
const cards = document.querySelectorAll('.project-card');

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${i * 0.1}s`;
      entry.target.classList.add('visible');
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

cards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  cardObserver.observe(card);
});

// ajoute la classe visible avec les bonnes propriétés
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .project-card.visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    .nav__links a.active {
      color: var(--text);
    }
    .nav__links a.active::after {
      width: 100%;
    }
  </style>
`);
