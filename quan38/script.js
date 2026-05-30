/**
 * QUÁN 38 – Ram, Bánh Mướt, Giò Lắt
 * script.js – All interactivity
 */

/* ══════════════════════════════════════
   HELPERS
══════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];


/* ══════════════════════════════════════
   0. THEME TOGGLE (Light/Dark)
══════════════════════════════════════ */
(function initThemeToggle() {
  const root = document.documentElement;
  const toggles = [$('#themeToggle'), $('#themeToggleMobile')].filter(Boolean);
  if (!toggles.length) return;

  const storageKey = 'quan38-theme';
  const defaultTheme = 'light';
  const stored = localStorage.getItem(storageKey);
  const initial = stored === 'dark' || stored === 'light' ? stored : defaultTheme;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    toggles.forEach(btn => {
      btn.setAttribute('aria-pressed', theme === 'dark');
      btn.setAttribute('data-theme', theme);
      const text = btn.querySelector('.theme-text');
      if (text) text.textContent = theme === 'dark' ? 'Tối' : 'Sáng';
    });
  }

  applyTheme(initial);

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || defaultTheme;
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  });
})();


/* ══════════════════════════════════════
   1. NAVBAR – scroll state & active link
══════════════════════════════════════ */
(function initNavbar() {
  const navbar = $('#navbar');
  const navLinks = $$('.nav-link');
  const sections = $$('section[id]');

  // Scroll state
  function onScroll() {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveLink();
    toggleBackToTop();
  }

  // Highlight nav link for current section
  function highlightActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ══════════════════════════════════════
   2. HAMBURGER MENU (Mobile)
══════════════════════════════════════ */
(function initMobileMenu() {
  const hamburger = $('#hamburger');
  const mobileNav = $('#mobileNav');
  const mobileLinks = $$('.mobile-link');

  function toggleMenu() {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', false);
  }

  hamburger.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on overlay click
  mobileNav.addEventListener('click', e => {
    if (e.target === mobileNav) closeMenu();
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
})();


/* ══════════════════════════════════════
   3. SMOOTH SCROLL
══════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  });
});


/* ══════════════════════════════════════
   4. PARALLAX HERO
══════════════════════════════════════ */
(function initParallax() {
  const heroBg = $('#heroBg');
  if (!heroBg) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight * 1.2) {
          heroBg.style.transform = `translateY(${scrolled * 0.35}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();


/* ══════════════════════════════════════
   5. SCROLL REVEAL ANIMATION
══════════════════════════════════════ */
(function initScrollReveal() {
  const revealEls = $$('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const delay = parseFloat(el.dataset.delay || 0) * 10;
      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();


/* ══════════════════════════════════════
   6. ANIMATED COUNTER
══════════════════════════════════════ */
(function initCounters() {
  const counters = $$('.stat-num');
  let animated = false;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const decimals = parseInt(el.dataset.decimal || 0);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      const current = target * eased;
      el.textContent = current.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const statsSection = $('#stats');
  if (!statsSection) return;

  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      counters.forEach(counter => animateCounter(counter));
    }
  }, { threshold: 0.3 });

  statsObserver.observe(statsSection);
})();


/* ══════════════════════════════════════
   7. GALLERY LIGHTBOX
══════════════════════════════════════ */
(function initLightbox() {
  const galleryItems = $$('.gallery-item');
  const lightbox = $('#lightbox');
  const lightboxImg = $('#lightboxImg');
  const lightboxCaption = $('#lightboxCaption');
  const lightboxClose = $('#lightboxClose');
  const lightboxPrev = $('#lightboxPrev');
  const lightboxNext = $('#lightboxNext');

  if (!lightbox) return;

  let currentIndex = 0;
  const images = galleryItems.map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt,
    caption: item.querySelector('.gallery-item-overlay span')?.textContent || ''
  }));

  function openLightbox(index) {
    currentIndex = index;
    showImage(currentIndex);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showImage(index) {
    const img = images[index];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.caption;
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  }

  // Click on gallery items
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', prevImage);
  lightboxNext.addEventListener('click', nextImage);

  // Close on background click
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard nav
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextImage() : prevImage();
  }, { passive: true });
})();


/* ══════════════════════════════════════
   8. REVIEWS SLIDER
══════════════════════════════════════ */
(function initReviewsSlider() {
  const track = $('#reviewsTrack');
  const dotsContainer = $('#reviewsDots');
  const prevBtn = $('#reviewPrev');
  const nextBtn = $('#reviewNext');
  if (!track) return;

  const cards = $$('.review-card', track);
  let current = 0;
  let autoTimer;

  // Calculate how many cards are visible
  function visibleCards() {
    const w = window.innerWidth;
    if (w < 768) return 1;
    if (w < 960) return 2;
    return 3;
  }

  function totalSlides() {
    return Math.max(0, cards.length - visibleCards());
  }

  // Create dots
  function buildDots() {
    dotsContainer.innerHTML = '';
    const count = totalSlides() + 1;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement('button');
      dot.className = 'reviews-dot';
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }

  function updateDots() {
    $$('.reviews-dot', dotsContainer).forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, totalSlides()));
    const cardW = cards[0].offsetWidth + 24; // 24 = gap
    track.style.transform = `translateX(-${current * cardW}px)`;
    updateDots();
  }

  function next() { goTo(current >= totalSlides() ? 0 : current + 1); }
  function prev() { goTo(current <= 0 ? totalSlides() : current - 1); }

  // Auto-advance
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 4500);
  }
  function stopAuto() { clearInterval(autoTimer); }

  prevBtn?.addEventListener('click', () => { prev(); stopAuto(); startAuto(); });
  nextBtn?.addEventListener('click', () => { next(); stopAuto(); startAuto(); });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    startAuto();
  }, { passive: true });

  // Pause on hover
  track.closest('.reviews-slider-wrap')?.addEventListener('mouseenter', stopAuto);
  track.closest('.reviews-slider-wrap')?.addEventListener('mouseleave', startAuto);

  // Init
  buildDots();
  startAuto();
  window.addEventListener('resize', () => { buildDots(); goTo(0); }, { passive: true });
})();


/* ══════════════════════════════════════
   9. BOOKING FORM VALIDATION
══════════════════════════════════════ */
(function initBookingForm() {
  const form = $('#bookingForm');
  const successDiv = $('#bookingSuccess');
  const bookAgainBtn = $('#bookAgain');
  if (!form) return;

  // Set minimum date to today
  const dateInput = $('#date');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
  }

  function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`error${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);
    if (input) input.classList.add('error');
    if (error) error.textContent = message;
  }

  function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`error${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);
    if (input) input.classList.remove('error');
    if (error) error.textContent = '';
  }

  function clearAllErrors() {
    ['fullName', 'phone', 'date', 'time', 'guests'].forEach(clearError);
  }

  function validate() {
    let valid = true;
    clearAllErrors();

    const fullName = $('#fullName').value.trim();
    const phone = $('#phone').value.trim();
    const date = $('#date').value;
    const time = $('#time').value;
    const guests = $('#guests').value;

    if (!fullName || fullName.length < 2) {
      showError('fullName', 'Vui lòng nhập họ tên (tối thiểu 2 ký tự).');
      valid = false;
    }

    const phonePattern = /^(0|\+84)[0-9]{8,10}$/;
    if (!phone) {
      showError('phone', 'Vui lòng nhập số điện thoại.');
      valid = false;
    } else if (!phonePattern.test(phone.replace(/\s/g, ''))) {
      showError('phone', 'Số điện thoại không hợp lệ.');
      valid = false;
    }

    if (!date) {
      showError('date', 'Vui lòng chọn ngày đặt bàn.');
      valid = false;
    } else {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        showError('date', 'Ngày không được là ngày trong quá khứ.');
        valid = false;
      }
    }

    if (!time) {
      showError('time', 'Vui lòng chọn giờ đặt bàn.');
      valid = false;
    } else {
      const [h, m] = time.split(':').map(Number);
      if (h < 6 || h >= 22 || (h === 21 && m > 30)) {
        showError('time', 'Giờ phục vụ: 06:00 – 21:30.');
        valid = false;
      }
    }

    if (!guests) {
      showError('guests', 'Vui lòng chọn số lượng khách.');
      valid = false;
    }

    return valid;
  }

  // Live validation on blur
  ['fullName', 'phone', 'date', 'time', 'guests'].forEach(id => {
    document.getElementById(id)?.addEventListener('blur', () => {
      // Re-run full validation but only update this field's error
      const input = document.getElementById(id);
      if (input) input.classList.remove('error');
      const error = document.getElementById(`error${id.charAt(0).toUpperCase() + id.slice(1)}`);
      if (error) error.textContent = '';
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validate()) {
      // Simulate submission
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.textContent = 'Đang gửi...';
      submitBtn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        successDiv.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Đặt Bàn Ngay';
      }, 1200);
    }
  });

  bookAgainBtn?.addEventListener('click', () => {
    form.reset();
    form.style.display = 'flex';
    successDiv.style.display = 'none';
    clearAllErrors();
  });
})();


/* ══════════════════════════════════════
   10. BACK TO TOP BUTTON
══════════════════════════════════════ */
function toggleBackToTop() {
  const btn = $('#backToTop');
  if (!btn) return;
  if (window.scrollY > 500) {
    btn.classList.add('visible');
  } else {
    btn.classList.remove('visible');
  }
}

$('#backToTop')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ══════════════════════════════════════
   11. SET MIN DATE (on load)
══════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  // Ensure date input shows correct minimum
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date();
    dateInput.min = today.toISOString().split('T')[0];
  }
});


/* ══════════════════════════════════════
   12. KEYBOARD ACCESSIBILITY
══════════════════════════════════════ */
// Focus visible styles are handled via CSS :focus-visible
// Skip navigation for accessibility
document.addEventListener('DOMContentLoaded', () => {
  // Trap focus in lightbox when open
  const lightbox = document.getElementById('lightbox');
  const focusableInLightbox = lightbox?.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');

  if (lightbox && focusableInLightbox) {
    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key !== 'Tab') return;
      const first = focusableInLightbox[0];
      const last = focusableInLightbox[focusableInLightbox.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }
});

console.log('%c QUÁN 38 🍽️', 'font-size:2rem; color:#F4C542; background:#111; padding:0.5rem 1rem; border-radius:4px;');
console.log('%c Ram • Bánh Mướt • Giò Lắt – Chuẩn Vị Truyền Thống', 'color:#B22222; font-size:1rem;');
