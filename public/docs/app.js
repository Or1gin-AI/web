/* ============================================
   OriginAI Docs — Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- sidebar navigation ---- */
  const navItems = document.querySelectorAll('.nav-item[data-section]');
  const sections = document.querySelectorAll('.doc-section');
  const sidebar  = document.querySelector('.sidebar');
  const overlay  = document.querySelector('.sidebar-overlay');
  const hamburger = document.querySelector('.hamburger');

  // click nav → scroll
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const id = item.dataset.section;
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        closeSidebar();
      }
    });
  });

  // scroll spy
  const observerOpts = { rootMargin: '-20% 0px -60% 0px' };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(n => n.classList.toggle('active', n.dataset.section === id));
      }
    });
  }, observerOpts);
  sections.forEach(s => observer.observe(s));

  // mobile sidebar toggle
  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    overlay.style.display = 'block';
    hamburger.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      overlay.classList.remove('visible');
      overlay.style.display = 'none';
    }, 300);
  }

  hamburger?.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay?.addEventListener('click', closeSidebar);

  /* ---- lightbox ---- */
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');

  document.querySelectorAll('.screenshot').forEach(img => {
    img.addEventListener('click', () => {
      if (lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox?.classList.remove('open');
    document.body.style.overflow = '';
  }
  lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });
  lightboxClose?.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeSidebar();
    }
  });

  /* ---- progress bar ---- */
  const progressFill = document.querySelector('.progress-bar-fill');
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + '%';
  }

  /* ---- back-to-top ---- */
  const btt = document.querySelector('.back-to-top');
  function updateBTT() {
    btt?.classList.toggle('visible', window.scrollY > 400);
  }
  btt?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- scroll handler (throttled) ---- */
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        updateBTT();
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ---- fade-in on scroll ---- */
  const fadeEls = document.querySelectorAll(
    '.step-card, .feature-item, .pricing-card, .screenshot-wrap, .summary-card, .mode-card, .faq-item, .checklist-card'
  );
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    fadeObserver.observe(el);
  });

  // init
  updateProgress();
  updateBTT();
});
