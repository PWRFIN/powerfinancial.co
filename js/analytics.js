(function () {
  'use strict';

  var measurementId = 'G-D14VL6WJR6';

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    anonymize_ip: true
  });

  var googleTag = document.createElement('script');
  googleTag.async = true;
  googleTag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
  document.head.appendChild(googleTag);

  function track(eventName, parameters) {
    window.gtag('event', eventName, parameters || {});
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest('a');
    if (!link) return;

    var href = link.getAttribute('href') || '';
    var label = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 100);

    if (href.indexOf('leadconnectorhq.com/widget/bookings/power-financial-strategy-session') !== -1) {
      track('booking_link_click', {
        link_text: label,
        page_path: window.location.pathname,
        destination: 'power_financial_strategy_session'
      });
    } else if (href.indexOf('tel:') === 0) {
      track('phone_click', { page_path: window.location.pathname });
    } else if (href.indexOf('mailto:') === 0) {
      track('email_click', { page_path: window.location.pathname });
    } else if (href.indexOf('/iulguide') !== -1) {
      track('guide_click', { guide: 'iul', page_path: window.location.pathname });
    }
  });

  window.addEventListener('load', function () {
    var bookingFrames = document.querySelectorAll('iframe[src*="leadconnectorhq.com/widget/bookings/power-financial-strategy-session"]');
    bookingFrames.forEach(function (frame) {
      frame.addEventListener('load', function () {
        track('booking_calendar_view', { page_path: window.location.pathname });
      }, { once: true });
    });
  });
}());
