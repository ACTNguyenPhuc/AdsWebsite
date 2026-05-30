/**
 * QN Private Fitness - Main Application
 * Renders all content from mockData.js and handles interactions
 */

// =====================================================
// THEME MANAGER
// =====================================================
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('qnpf-theme') || 'dark';
    if (saved === 'light') document.body.classList.add('light-mode');
    this.updateToggleIcon();
  },

  toggle() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('qnpf-theme', isLight ? 'light' : 'dark');
    this.updateToggleIcon();
  },

  updateToggleIcon() {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    const isLight = document.body.classList.contains('light-mode');
    btn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    btn.title = isLight ? 'Chuyển Dark Mode' : 'Chuyển Light Mode';
  }
};

// =====================================================
// RENDERER UTILITIES
// =====================================================
function qs(selector) { return document.querySelector(selector); }
function qsa(selector) { return document.querySelectorAll(selector); }
function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

// =====================================================
// RENDER: HEADER
// =====================================================
function renderHeader() {
  const header = qs('#header');
  if (!header) return;

  header.innerHTML = `
    <div class="header-inner">
      <a href="#hero" class="logo">
        <img src="assets/images/logo.jpg" alt="${siteData.brandName}" loading="lazy">
        <div class="logo-text">
          QN <span>PRIVATE FITNESS</span>
        </div>
      </a>

      <nav class="main-nav" id="main-nav">
        ${siteData.nav.map(item => `
          <a href="${item.href}" class="nav-link" data-href="${item.href}">${item.label}</a>
        `).join('')}
      </nav>

      <div class="header-actions">
        <button class="theme-toggle" onclick="ThemeManager.toggle()" title="Toggle Theme">
          <i class="fas fa-sun"></i>
        </button>
        <a href="#contact" class="btn btn-gold">
          <i class="fas fa-calendar-check"></i> Đăng ký tư vấn
        </a>
        <div class="menu-toggle" id="menu-toggle">
          <span></span><span></span><span></span>
        </div>
      </div>
    </div>
  `;

  // Mobile menu
  const toggle = qs('#menu-toggle');
  const nav = qs('#main-nav');
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('open');
  });

  // Close nav on link click
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('open');
    });
  });

  // Sticky + scroll spy
  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link
    const sections = qsa('section[id]');
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = '#' + section.id;
      }
    });
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.href === current);
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// =====================================================
// RENDER: HERO
// =====================================================
function renderHero() {
  const section = qs('#hero');
  if (!section) return;

  section.innerHTML = `
    <div class="hero-bg">
      <img src="assets/images/banner-hero.jpg" alt="QN Private Fitness" id="hero-img">
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
      <div class="hero-eyebrow">
        <i class="fas fa-dumbbell"></i>
        QN Private Fitness — Đà Nẵng
      </div>
      <h1 class="hero-title">
        Phòng tập <span class="gold">CHẤT</span>
        Giá siêu <span class="gold">NGẤT</span>
      </h1>
      <p class="hero-tagline">${siteData.tagline}</p>
      <div class="hero-cta">
        <a href="#contact" class="btn btn-gold">
          <i class="fas fa-play"></i> Tập thử miễn phí
        </a>
        <a href="#services" class="btn btn-outline">
          Khám phá dịch vụ <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
    <div class="hero-scroll">
      <i class="fas fa-chevron-down"></i>
      <span>Cuộn xuống</span>
    </div>
  `;

  // Parallax effect
  window.addEventListener('scroll', () => {
    const heroImg = qs('#hero-img');
    if (heroImg && window.scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
    }
  }, { passive: true });
}

// =====================================================
// RENDER: STATISTICS
// =====================================================
function renderStatistics() {
  const section = qs('#statistics');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="stats-grid">
        ${siteData.statistics.map(stat => `
          <div class="stat-item reveal">
            <i class="stat-icon ${stat.icon}"></i>
            <div class="stat-number">
              <span class="counter" data-target="${stat.value}">0</span>
              <span class="stat-suffix">${stat.suffix}</span>
            </div>
            <p class="stat-label">${stat.label}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// =====================================================
// RENDER: ABOUT
// =====================================================
function renderAbout() {
  const section = qs('#about');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="about-grid">
        <div class="about-visual reveal-left">
          <img src="assets/images/trainer-main.jpg" alt="QN Private Fitness" class="about-img-main" loading="lazy">
          <img src="assets/images/trainer-training.jpg" alt="Training" class="about-img-accent" loading="lazy">
          <div class="about-badge">
            <span class="num">5+</span>
            <span class="text">NĂM KINH NGHIỆM</span>
          </div>
        </div>

        <div class="about-content reveal-right">
          <span class="section-label">${siteData.about.title}</span>
          <h2 class="section-title">${siteData.about.subtitle}</h2>
          <p class="about-text">${siteData.about.mission}</p>
          <p class="about-text">${siteData.about.vision}</p>

          <div class="values-grid">
            ${siteData.about.values.map((val, i) => `
              <div class="value-card reveal delay-${i + 1}">
                <div class="value-icon"><i class="${val.icon}"></i></div>
                <h4 class="value-title">${val.title}</h4>
                <p class="value-desc">${val.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// =====================================================
// RENDER: SERVICES
// =====================================================
function renderServices() {
  const section = qs('#services');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Dịch Vụ</span>
        <h2 class="section-title">Chương trình <em>đào tạo</em></h2>
        <p class="section-subtitle">Mỗi chương trình được thiết kế riêng biệt, cá nhân hóa 100% theo mục tiêu và thể trạng của bạn.</p>
      </div>

      <div class="services-grid">
        ${siteData.services.map((svc, i) => `
          <div class="service-card reveal delay-${(i % 2) + 1}">
            <div class="service-img">
              <img src="${svc.image}" alt="${svc.title}" loading="lazy">
              <div class="service-img-overlay"></div>
              ${svc.badge ? `<div class="service-badge">${svc.badge}</div>` : ''}
            </div>
            <div class="service-body">
              <p class="service-subtitle">${svc.subtitle}</p>
              <h3 class="service-title">${svc.title}</h3>
              <p class="service-desc">${svc.description}</p>
              <ul class="service-benefits">
                ${svc.benefits.map(b => `
                  <li class="service-benefit">
                    <i class="fas fa-check"></i>
                    <span>${b}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="text-align:center;margin-top:48px;" class="reveal">
        <a href="#contact" class="btn btn-gold">
          <i class="fas fa-calendar-check"></i> Tư vấn miễn phí ngay
        </a>
      </div>
    </div>
  `;
}

// =====================================================
// RENDER: TRAINERS
// =====================================================
function renderTrainers() {
  const section = qs('#trainers');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Đội Ngũ</span>
        <h2 class="section-title">Huấn luyện viên <em>chuyên nghiệp</em></h2>
        <p class="section-subtitle">Đội ngũ HLV được đào tạo bài bản, sở hữu chứng chỉ quốc tế và nhiều năm kinh nghiệm thực chiến.</p>
      </div>

      <div class="trainers-grid">
        ${siteData.trainers.map((trainer, i) => `
          <div class="trainer-card reveal delay-${i + 1}">
            <div class="trainer-img">
              <img src="${trainer.image}" alt="${trainer.name}" loading="lazy">
              <div class="trainer-overlay">
                <div class="trainer-social">
                  <a href="${trainer.social.facebook}" title="Facebook"><i class="fab fa-facebook-f"></i></a>
                  <a href="${trainer.social.instagram}" title="Instagram"><i class="fab fa-instagram"></i></a>
                </div>
              </div>
            </div>
            <div class="trainer-info">
              <p class="trainer-role">${trainer.role}</p>
              <h3 class="trainer-name">${trainer.name}</h3>
              <p class="trainer-specialty"><i class="fas fa-bolt" style="color:var(--gold);margin-right:6px;"></i>${trainer.specialty} · ${trainer.experience}</p>
              <p style="font-size:13px;color:var(--text-muted);line-height:1.7;margin-top:10px;">${trainer.bio}</p>
              <div class="trainer-certs">
                ${trainer.certifications.map(cert => `<span class="cert-tag">${cert}</span>`).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// =====================================================
// RENDER: TRANSFORMATIONS
// =====================================================
function renderTransformations() {
  const section = qs('#transformations');
  if (!section) return;

  let currentSlide = 0;

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Kết Quả</span>
        <h2 class="section-title">Học viên <em>thay đổi</em></h2>
        <p class="section-subtitle">Những câu chuyện chuyển đổi thực sự từ học viên của QN Private Fitness.</p>
      </div>

      <div class="slider-wrapper reveal">
        <div class="slider-track" id="transform-track">
          ${siteData.transformations.map((t, i) => `
            <div class="transform-slide">
              <div class="transform-visual">
                <img src="${t.image}" alt="${t.name}" loading="lazy">
                <div class="transform-stats">
                  <div class="transform-stat">
                    <p class="transform-stat-label">Cân nặng trước</p>
                    <p class="transform-stat-val">${t.before.weight}</p>
                  </div>
                  <div class="transform-stat">
                    <p class="transform-stat-label">Cân nặng sau</p>
                    <p class="transform-stat-val">${t.after.weight}</p>
                  </div>
                  <div class="transform-stat">
                    <p class="transform-stat-label">Mỡ trước</p>
                    <p class="transform-stat-val">${t.before.fat}</p>
                  </div>
                  <div class="transform-stat">
                    <p class="transform-stat-label">Mỡ sau</p>
                    <p class="transform-stat-val">${t.after.fat}</p>
                  </div>
                </div>
              </div>
              <div class="transform-content">
                <p class="transform-duration"><i class="fas fa-clock"></i> ${t.duration}</p>
                <h3 class="transform-name">${t.name}</h3>
                <blockquote class="transform-quote">"${t.quote}"</blockquote>
                <div class="transform-stars">
                  ${'<i class="fas fa-star"></i>'.repeat(t.rating)}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="slider-controls">
          <button class="slider-btn" id="transform-prev"><i class="fas fa-arrow-left"></i></button>
          <div class="slider-dots">
            ${siteData.transformations.map((_, i) => `
              <div class="slider-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
            `).join('')}
          </div>
          <button class="slider-btn" id="transform-next"><i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
  `;

  // Slider logic
  const track = qs('#transform-track');
  const dots = qsa('#transformations .slider-dot');

  function goTo(index) {
    currentSlide = (index + siteData.transformations.length) % siteData.transformations.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  }

  qs('#transform-prev').addEventListener('click', () => goTo(currentSlide - 1));
  qs('#transform-next').addEventListener('click', () => goTo(currentSlide + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(+dot.dataset.index)));
}

// =====================================================
// RENDER: FACILITY
// =====================================================
function renderFacility() {
  const section = qs('#facility');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Cơ Sở Vật Chất</span>
        <h2 class="section-title">Không gian <em>đẳng cấp</em></h2>
        <p class="section-subtitle">Thiết bị hiện đại nhập khẩu, không gian riêng tư sang trọng — chuẩn phòng tập 5 sao.</p>
      </div>

      <div class="facility-grid reveal">
        ${siteData.facility.map((item, i) => `
          <div class="facility-item" data-img="${item.image}" data-index="${i}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="facility-caption">
              <h4 class="facility-title">${item.title}</h4>
              <p class="facility-desc">${item.desc}</p>
            </div>
            <div class="facility-expand"><i class="fas fa-expand"></i></div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Lightbox -->
    <div class="lightbox" id="lightbox">
      <div class="lightbox-content">
        <button class="lightbox-close" id="lightbox-close"><i class="fas fa-times"></i></button>
        <img src="" alt="" id="lightbox-img">
      </div>
    </div>
  `;

  // Lightbox logic
  const lightbox = qs('#lightbox');
  const lightboxImg = qs('#lightbox-img');

  qsa('.facility-item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.img;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  qs('#lightbox-close').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

// =====================================================
// RENDER: TESTIMONIALS
// =====================================================
function renderTestimonials() {
  const section = qs('#testimonials');
  if (!section) return;

  let currentPos = 0;

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Cảm Nhận</span>
        <h2 class="section-title">Khách hàng <em>nói gì</em></h2>
        <p class="section-subtitle">Hơn 500 học viên đã tin tưởng và đồng hành cùng QN Private Fitness.</p>
      </div>

      <div class="testimonials-carousel reveal">
        <div class="testimonials-track" id="testimonials-track">
          ${siteData.testimonials.map(t => `
            <div class="testimonial-card">
              <div class="quote-icon">"</div>
              <p class="testimonial-text">${t.text}</p>
              <div class="testimonial-result">
                <i class="fas fa-trophy"></i> ${t.result}
              </div>
              <div class="testimonial-author">
                <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar" loading="lazy">
                <div>
                  <p class="testimonial-name">${t.name}</p>
                  <p class="testimonial-role">${t.role}</p>
                </div>
                <div class="testimonial-stars">
                  ${'<i class="fas fa-star"></i>'.repeat(t.rating)}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Auto carousel
  const track = qs('#testimonials-track');
  const cards = track.querySelectorAll('.testimonial-card');
  const maxPos = Math.max(0, cards.length - 2);

  function slide() {
    currentPos = currentPos < maxPos ? currentPos + 1 : 0;
    const cardWidth = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentPos * cardWidth}px)`;
  }

  let autoSlide = setInterval(slide, 4000);
  track.addEventListener('mouseenter', () => clearInterval(autoSlide));
  track.addEventListener('mouseleave', () => { autoSlide = setInterval(slide, 4000); });
}

// =====================================================
// RENDER: PROCESS
// =====================================================
function renderProcess() {
  const section = qs('#process');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Quy Trình</span>
        <h2 class="section-title">4 bước để <em>thay đổi</em></h2>
        <p class="section-subtitle">Quy trình đơn giản, khoa học, được thiết kế để đưa bạn đến mục tiêu nhanh nhất.</p>
      </div>

      <div class="process-grid">
        ${siteData.process.map((step, i) => `
          <div class="process-step reveal delay-${i + 1}">
            <div class="step-number">${step.step}</div>
            <div class="step-icon-wrap">
              <i class="${step.icon} step-icon"></i>
            </div>
            <h3 class="step-title">${step.title}</h3>
            <p class="step-desc">${step.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// =====================================================
// RENDER: FAQ
// =====================================================
function renderFaq() {
  const section = qs('#faq');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">FAQ</span>
        <h2 class="section-title">Câu hỏi <em>thường gặp</em></h2>
      </div>

      <div class="faq-grid">
        <div class="faq-list">
          ${siteData.faq.map((item, i) => `
            <div class="faq-item reveal delay-${(i % 3) + 1}">
              <div class="faq-question">
                <span>${item.question}</span>
                <div class="faq-icon"><i class="fas fa-plus"></i></div>
              </div>
              <div class="faq-answer">
                <div class="faq-answer-inner">${item.answer}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="faq-cta-box reveal-right">
          <h3 class="faq-cta-title">Vẫn còn thắc mắc?</h3>
          <p class="faq-cta-text">Đội ngũ tư vấn của chúng tôi luôn sẵn sàng giải đáp mọi câu hỏi của bạn. Liên hệ ngay để được tư vấn miễn phí!</p>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <a href="tel:0335983908" class="btn-dark">
              <i class="fas fa-phone"></i> Gọi ngay: 033 598 3908
            </a>
            <a href="#contact" class="btn-dark" style="background:#333;">
              <i class="fas fa-envelope"></i> Gửi tin nhắn
            </a>
          </div>
        </div>
      </div>
    </div>
  `;

  // Accordion logic
  qsa('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      qsa('.faq-item').forEach(fi => {
        fi.classList.remove('open');
        fi.querySelector('.faq-answer').style.maxHeight = '0';
      });

      // Open clicked
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

// =====================================================
// RENDER: CONTACT
// =====================================================
function renderContact() {
  const section = qs('#contact');
  if (!section) return;

  const goals = [
    'Giảm cân & giảm mỡ',
    'Tăng cơ & định hình',
    'Phục hồi chức năng',
    'Tăng sức bền & thể lực',
    'Cải thiện sức khỏe tổng thể',
    'Mục tiêu khác'
  ];

  section.innerHTML = `
    <div class="container">
      <div class="section-header reveal">
        <span class="section-label">Liên Hệ</span>
        <h2 class="section-title">Bắt đầu <em>hành trình</em></h2>
      </div>

      <div class="contact-grid">
        <div class="contact-info reveal-left">
          <p class="contact-tagline">${siteData.description}</p>

          <div class="contact-items">
            <div class="contact-item">
              <div class="contact-item-icon"><i class="fas fa-map-marker-alt"></i></div>
              <div>
                <p class="contact-item-label">Địa chỉ</p>
               ${siteData.contact.address
                .map(addr => `<p class="contact-item-val">${addr}</p>`)
                .join("")}
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-item-icon"><i class="fas fa-phone"></i></div>
              <div>
                <p class="contact-item-label">Hotline</p>
                <p class="contact-item-val"><a href="tel:${siteData.contact.phone.replace(/\s/g,'')}">${siteData.contact.phone}</a></p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-item-icon"><i class="fas fa-envelope"></i></div>
              <div>
                <p class="contact-item-label">Email</p>
                <p class="contact-item-val">${siteData.contact.email}</p>
              </div>
            </div>
            <div class="contact-item">
              <div class="contact-item-icon"><i class="fas fa-clock"></i></div>
              <div>
                <p class="contact-item-label">Giờ mở cửa</p>
                <p class="contact-item-val">${siteData.contact.hours}</p>
              </div>
            </div>
          </div>

          <div class="contact-social">
            <a href="${siteData.contact.facebook}" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="${siteData.contact.instagram}" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://zalo.me/${siteData.contact.zalo}" class="social-link" title="Zalo">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor"><path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm-1.9 8.5h3.8v1.7h-1v5.3h1v1.7h-3.8v-1.7h1V12.2h-1V10.5zm-4.4.3c.8 0 1.4.6 1.4 1.4s-.6 1.4-1.4 1.4-1.4-.6-1.4-1.4.6-1.4 1.4-1.4zm-.7 3.7h1.4v6.4H9v-6.4zm13.3 2.8c0 2-1.6 3.6-3.6 3.6s-3.6-1.6-3.6-3.6 1.6-3.6 3.6-3.6 3.6 1.6 3.6 3.6zm-3.6-2.2c-1.2 0-2.2 1-2.2 2.2s1 2.2 2.2 2.2 2.2-1 2.2-2.2-1-2.2-2.2-2.2z"/></svg>
            </a>
          </div>
        </div>

        <div class="contact-form reveal-right" id="contact-form-wrap">
          <h3 class="form-title">Đăng ký tư vấn miễn phí</h3>
          <div class="form-grid" id="contact-form">
            <div class="form-group">
              <label class="form-label">Họ và tên <span>*</span></label>
              <input type="text" class="form-input" id="form-name" placeholder="Nguyễn Văn A">
              <span class="error-msg">Vui lòng nhập họ tên</span>
            </div>
            <div class="form-group">
              <label class="form-label">Số điện thoại <span>*</span></label>
              <input type="tel" class="form-input" id="form-phone" placeholder="0xx xxx xxxx">
              <span class="error-msg">Số điện thoại không hợp lệ</span>
            </div>
            <div class="form-group full-width">
              <label class="form-label">Email</label>
              <input type="email" class="form-input" id="form-email" placeholder="email@example.com">
              <span class="error-msg">Email không hợp lệ</span>
            </div>
            <div class="form-group full-width">
              <label class="form-label">Mục tiêu tập luyện <span>*</span></label>
              <select class="form-select" id="form-goal">
                <option value="">-- Chọn mục tiêu --</option>
                ${goals.map(g => `<option value="${g}">${g}</option>`).join('')}
              </select>
              <span class="error-msg">Vui lòng chọn mục tiêu</span>
            </div>
            <div class="form-group full-width">
              <label class="form-label">Ghi chú thêm</label>
              <textarea class="form-textarea" id="form-note" placeholder="Mô tả ngắn về thể trạng, lịch tập mong muốn, v.v..." rows="3"></textarea>
            </div>
            <div class="form-submit">
              <p class="form-note">Chúng tôi sẽ liên hệ trong vòng 2 giờ</p>
              <button class="btn btn-gold" id="form-submit-btn">
                <i class="fas fa-paper-plane"></i> Gửi đăng ký
              </button>
            </div>
            <div class="form-success full-width" id="form-success">
              <i class="fas fa-check-circle"></i> Đăng ký thành công! Chúng tôi sẽ liên hệ sớm.
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Form validation
  qs('#form-submit-btn').addEventListener('click', validateForm);

  function validateForm() {
    let valid = true;

    const validate = (id, test, selector) => {
      const input = qs(id);
      const group = input.closest('.form-group');
      const passes = test(input.value.trim());
      group.classList.toggle('error', !passes);
      if (!passes) valid = false;
    };

    validate('#form-name', v => v.length >= 2);
    validate('#form-phone', v => /^[0-9]{9,11}$/.test(v.replace(/\s/g, '')));
    validate('#form-goal', v => v !== '');

    const email = qs('#form-email').value.trim();
    if (email) {
      const emailGroup = qs('#form-email').closest('.form-group');
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      emailGroup.classList.toggle('error', !validEmail);
      if (!validEmail) valid = false;
    }

    if (valid) {
      const btn = qs('#form-submit-btn');
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
      btn.disabled = true;

      setTimeout(() => {
        const formGrid = qs('#contact-form');
        const successMsg = qs('#form-success');
        formGrid.querySelectorAll('input, select, textarea').forEach(i => i.value = '');
        successMsg.style.display = 'flex';
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Gửi đăng ký';
        btn.disabled = false;
        setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
      }, 1500);
    }
  }
}

// =====================================================
// RENDER: FOOTER
// =====================================================
function renderFooter() {
  const footer = qs('#footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo">
            <img src="assets/images/logo.jpg" alt="${siteData.brandName}" style="height:52px;width:52px;object-fit:contain;">
            <div class="logo-text">QN <span>PRIVATE FITNESS</span></div>
          </div>
          <p class="footer-about">${siteData.description}</p>
          <div class="contact-social">
            <a href="${siteData.contact.facebook}" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="${siteData.contact.instagram}" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://zalo.me/${siteData.contact.zalo}" class="social-link" title="Zalo"><i class="fas fa-comment"></i></a>
          </div>
        </div>

        <div>
          <h4 class="footer-col-title">Điều hướng</h4>
          <ul class="footer-links">
            ${siteData.nav.map(item => `
              <li><a href="${item.href}" class="footer-link"><i class="fas fa-chevron-right" style="font-size:10px;"></i>${item.label}</a></li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Dịch vụ</h4>
          <ul class="footer-links">
            ${siteData.services.map(svc => `
              <li><a href="#services" class="footer-link"><i class="fas fa-chevron-right" style="font-size:10px;"></i>${svc.title}</a></li>
            `).join('')}
          </ul>
        </div>

        <div>
          <h4 class="footer-col-title">Liên hệ</h4>
          <div class="footer-contact-item">
            <i class="fas fa-map-marker-alt"></i>
            <span>${siteData.contact.address}</span>
          </div>
          <div class="footer-contact-item">
            <i class="fas fa-phone"></i>
            <a href="tel:${siteData.contact.phone.replace(/\s/g,'')}">${siteData.contact.phone}</a>
          </div>
          <div class="footer-contact-item">
            <i class="fas fa-envelope"></i>
            <span>${siteData.contact.email}</span>
          </div>
          <div class="footer-contact-item">
            <i class="fas fa-clock"></i>
            <span>${siteData.contact.hours}</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">© ${new Date().getFullYear()} QN Private Fitness. All rights reserved.</p>
        <div class="footer-bottom-social">
          <a href="${siteData.contact.facebook}" class="social-link" title="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="${siteData.contact.instagram}" class="social-link" title="Instagram"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
  `;
}

// =====================================================
// COUNTER ANIMATION
// =====================================================
function initCounters() {
  const counters = qsa('.counter');
  const options = { threshold: 0.5 };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.dataset.target;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current = Math.min(current + step, target);
          counter.textContent = Math.floor(current).toLocaleString('vi-VN');
          if (current < target) requestAnimationFrame(update);
        };

        update();
        observer.unobserve(counter);
      }
    });
  }, options);

  counters.forEach(c => observer.observe(c));
}

// =====================================================
// SCROLL REVEAL
// =====================================================
function initScrollReveal() {
  const reveals = qsa('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

// =====================================================
// SMOOTH SCROLL
// =====================================================
function initSmoothScroll() {
  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      const target = qs(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        window.scrollTo({
          top: target.offsetTop - offset,
          behavior: 'smooth'
        });
      }
    });
  });
}

// =====================================================
// BACK TO TOP
// =====================================================
function initBackToTop() {
  const btn = qs('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =====================================================
// LAZY LOADING
// =====================================================
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    });

    qsa('img[data-src]').forEach(img => observer.observe(img));
  }
}

// =====================================================
// MAIN INIT
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
  // Theme first (before render to prevent flash)
  ThemeManager.init();

  // Render all sections
  renderHeader();
  renderHero();
  renderStatistics();
  renderAbout();
  renderServices();
  renderTrainers();
  renderTransformations();
  renderFacility();
  renderTestimonials();
  renderProcess();
  renderFaq();
  renderContact();
  renderFooter();

  // Init interactions (after render)
  setTimeout(() => {
    initScrollReveal();
    initCounters();
    initSmoothScroll();
    initBackToTop();
    initLazyLoading();
  }, 100);
});
