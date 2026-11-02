/* Click-to-call. Julian supplies the number; until PHONE is set every
   [data-phone] element stays hidden. Example: { tel: '+15555550123', display: '(555) 555-0123' } */
(function () {
  var PHONE = { tel: '', display: '' };
  if (!PHONE.tel) return;
  document.querySelectorAll('[data-phone]').forEach(function (el) {
    el.href = 'tel:' + PHONE.tel;
    var t = el.querySelector('[data-phone-text]');
    if (t) t.textContent = PHONE.display;
    el.hidden = false;
  });
  document.documentElement.classList.add('has-phone');
})();
