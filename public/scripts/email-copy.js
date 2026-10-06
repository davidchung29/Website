// Copy the email address to the clipboard and confirm it inline
(function() {
  const button = document.getElementById('emailCopy');
  if (!button) return;

  const email = button.dataset.email;
  let resetTimer;

  // execCommand fallback: the async Clipboard API needs a secure context,
  // so it is unavailable when the site is served over plain http.
  function legacyCopy(text) {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.position = 'fixed';
    field.style.opacity = '0';
    document.body.appendChild(field);
    field.select();

    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (err) {
      ok = false;
    }

    document.body.removeChild(field);
    return ok;
  }

  function confirmCopy() {
    button.classList.add('copied');
    clearTimeout(resetTimer);
    resetTimer = setTimeout(function() {
      button.classList.remove('copied');
    }, 1800);
  }

  button.addEventListener('click', function() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(email).then(confirmCopy, function() {
        if (legacyCopy(email)) confirmCopy();
      });
    } else if (legacyCopy(email)) {
      confirmCopy();
    }
  });
})();
