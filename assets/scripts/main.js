  /* ── Nav scroll state + back to top ── */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    navbar.classList.toggle('scrolled', scrolled);
    if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ── Hamburger / Mobile menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function toggleMenu(force) {
    const open = force !== undefined ? force : !mobileMenu.classList.contains('open');
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  hamburger.addEventListener('click', () => toggleMenu());

  mobileMenu.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  /* ── Scroll reveal ── */
  const revealSelectors = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
  const reveals = document.querySelectorAll(revealSelectors.join(','));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => observer.observe(el));

  /* ── Contact Form ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('.form-submit');
      submitBtn.classList.add('loading');

      const formData = new FormData(this);
      const data = {};
      formData.forEach((value, key) => { data[key] = value; });

      try {
        const response = await fetch('https://formspree.io/f/xpzvkjap', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
          this.classList.add('success');
          this.querySelector('.form-success').classList.remove('hidden');
        } else {
          alert('Ocorreu um erro. Tenta novamente mais tarde.');
        }
      } catch {
        this.classList.add('success');
        this.querySelector('.form-success').classList.remove('hidden');
      } finally {
        submitBtn.classList.remove('loading');
      }
    });
  }
