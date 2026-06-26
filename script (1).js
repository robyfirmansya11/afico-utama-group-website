/* ==========================================================================
   PT. AFICO UTAMA GROUP — Company Profile
   script.js — interaktivitas: nav, scroll-reveal, client tabs, form
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------------------------------------------------------------
     1. Header: efek scroll (shadow + background lebih solid)
     --------------------------------------------------------------------- */
  const header = document.getElementById('siteHeader');

  function handleHeaderScroll() {
    if (window.scrollY > 12) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  handleHeaderScroll();
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });

  /* ---------------------------------------------------------------------
     2. Mobile nav toggle
     --------------------------------------------------------------------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Tutup menu mobile saat link diklik
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Tutup menu mobile saat klik di luar area menu
    document.addEventListener('click', function (e) {
      if (!mobileNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mobileNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------------------------------------------------------------
     3. Scroll-reveal animation menggunakan IntersectionObserver
     --------------------------------------------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: langsung tampilkan jika browser tidak mendukung
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------------------------------------------------------------------
     4. Filter tab daftar klien
     --------------------------------------------------------------------- */
  const clientTabs = document.querySelectorAll('.client-tab');
  const clientRows = document.querySelectorAll('.client-row');

  clientTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const targetId = tab.getAttribute('data-target');

      clientTabs.forEach(function (t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      clientRows.forEach(function (row) {
        row.classList.toggle('active', row.id === targetId);
      });
    });
  });

  /* ---------------------------------------------------------------------
     5. Form kontak — validasi sederhana & simulasi pengiriman
     --------------------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Mengirim...';
      submitBtn.disabled = true;

      // Simulasi pengiriman form (silakan hubungkan ke backend/Formspree/WhatsApp API)
      setTimeout(function () {
        formSuccess.classList.add('show');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(function () {
          formSuccess.classList.remove('show');
        }, 6000);
      }, 700);
    });
  }

  /* ---------------------------------------------------------------------
     6. Tahun berjalan otomatis di footer
     --------------------------------------------------------------------- */
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------------
     7. Smooth scroll offset correction untuk anchor link (selain :target CSS)
     --------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerOffset = 84;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
      }
    });
  });

});
