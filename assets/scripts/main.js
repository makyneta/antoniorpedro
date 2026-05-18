  /* ── Custom cursor (desktop only) ── */
  const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)');
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
 
  if (hasMouse.matches) {
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate(${mx - 5}px, ${my - 5}px)`;
    });
    (function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(animRing);
    })();
    document.querySelectorAll('a, button, .service-card, .value-item').forEach(el => {
      el.addEventListener('mouseenter', () => { ring.style.width = '60px'; ring.style.height = '60px'; ring.style.opacity = '0.2'; });
      el.addEventListener('mouseleave', () => { ring.style.width = '36px'; ring.style.height = '36px'; ring.style.opacity = '0.5'; });
    });
  }
 
  /* ── Nav scroll state ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
 
  /* ── Hamburger / Mobile menu ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose  = document.getElementById('menuClose');
 
  function toggleMenu(force) {
    const open = force !== undefined ? force : !mobileMenu.classList.contains('open');
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
 
  hamburger.addEventListener('click', () => toggleMenu(true));
  menuClose.addEventListener('click', () => toggleMenu(false));
 
  mobileMenu.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
 
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
 
  /* ── Scroll reveal ── */
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
