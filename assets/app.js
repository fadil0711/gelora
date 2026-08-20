// Interaksi kecil di sisi browser. Tidak ada logika data di sini.

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // konfirmasi hapus lewat atribut data-confirm
  const dangerLinks = document.querySelectorAll('[data-confirm]');
  dangerLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const message = link.getAttribute('data-confirm');
      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  });

  // reveal saat scroll, dimatikan kalau user minta sedikit animasi
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.reveal');

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('in'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((target) => observer.observe(target));
});
