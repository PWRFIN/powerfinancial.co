(function () {
  const accessGate = document.getElementById('accessGate');
  const accessForm = document.getElementById('accessForm');
  const accessPassword = document.getElementById('accessPassword');
  const accessError = document.getElementById('accessError');
  const passwordHash = 'a35e5db5bb0d51839f570891fcb4f3ef7e75f9f4319c1bcd96a91ec9de33050b';

  function unlockGuide() {
    document.body.classList.remove('locked');
    accessGate.hidden = true;
    sessionStorage.setItem('pwrAgentAccess', 'granted');
  }

  async function hashPassword(value) {
    const bytes = new TextEncoder().encode(value);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('');
  }

  if (sessionStorage.getItem('pwrAgentAccess') === 'granted') unlockGuide();

  accessForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    accessError.textContent = '';
    const submittedHash = await hashPassword(accessPassword.value);
    if (submittedHash === passwordHash) {
      unlockGuide();
      return;
    }
    accessError.textContent = accessForm.dataset.error;
    accessPassword.select();
  });
}());
