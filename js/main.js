/* ══════════════════════════════════
   Power Financial — Main JS
   Mobile nav, FAQ accordion, Schedule accordion
══════════════════════════════════ */

(function () {
  'use strict';

  /* ─── MOBILE NAV TOGGLE ─── */
  const navToggle = document.querySelector('.nav-toggle');
  const navMobile = document.querySelector('.nav-mobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      const isOpen = navMobile.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile nav when a link is clicked
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ─── STICKY NAV SCROLL ─── */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ─── MANIFESTO REFRAME ─── */
  const manifesto = document.querySelector('.manifesto');
  if (manifesto) {
    if ('IntersectionObserver' in window) {
      const manifestoObserver = new IntersectionObserver(function (entries, observer) {
        if (entries[0].isIntersecting) {
          manifesto.classList.add('is-visible');
          observer.disconnect();
        }
      }, { threshold: 0.35 });
      manifestoObserver.observe(manifesto);
    } else {
      manifesto.classList.add('is-visible');
    }
  }

  /* ─── FAQ ACCORDION ─── */
  document.querySelectorAll('.faq-q').forEach(function (question) {
    question.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const toggle = this.querySelector('.faq-toggle');
      const isOpen = item.classList.contains('open');

      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(function (el) {
        el.classList.remove('open');
        var t = el.querySelector('.faq-toggle');
        if (t) t.textContent = '+';
      });

      // Open clicked item (if it wasn't already open)
      if (!isOpen) {
        item.classList.add('open');
        if (toggle) toggle.textContent = '−';
      }
    });
  });

  /* ─── SCHEDULE DAY ACCORDION (The Cookout) ─── */
  document.querySelectorAll('.schedule-day-header').forEach(function (header) {
    header.addEventListener('click', function () {
      const day = this.closest('.schedule-day');
      const toggle = this.querySelector('.schedule-toggle');
      const isOpen = day.classList.contains('open');

      // Close all schedule days
      document.querySelectorAll('.schedule-day').forEach(function (el) {
        el.classList.remove('open');
        var t = el.querySelector('.schedule-toggle');
        if (t) t.textContent = '+';
      });

      // Open clicked day (if it wasn't already open)
      if (!isOpen) {
        day.classList.add('open');
        if (toggle) toggle.textContent = '−';
      }
    });
  });

  /* ─── SMOOTH SCROLL FOR ANCHOR LINKS ─── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ─── CONSUMER LEAD FORMS ─── */
  document.querySelectorAll('form[data-consumer-lead]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var button = form.querySelector('button[type="submit"]');
      var originalText = button ? button.textContent : '';
      var params = new URLSearchParams(window.location.search);
      var formData = new FormData(form);

      formData.set('page_path', window.location.pathname);
      formData.set('landing_page', window.location.href.slice(0, 500));
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
        formData.set(key, params.get(key) || sessionStorage.getItem('pf_' + key) || '');
      });

      if (button) {
        button.disabled = true;
        button.textContent = 'Sending...';
      }

      fetch('/api/consumer-lead', { method: 'POST', body: formData })
        .then(function (response) {
          if (!response.ok) throw new Error('Submission failed');
          var destination = response.url && new URL(response.url).pathname;
          window.location.assign(destination || (formData.get('form_type') === 'guide-download' ? '/guide-thank-you' : '/contact-thank-you'));
        })
        .catch(function () {
          alert('We could not send your request. Please try again or call 216-483-1992.');
          if (button) {
            button.disabled = false;
            button.textContent = originalText;
          }
        });
    });
  });

  var currentParams = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
    var value = currentParams.get(key);
    if (value) sessionStorage.setItem('pf_' + key, value.slice(0, 200));
  });

})();
