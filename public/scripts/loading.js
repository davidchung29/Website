// Loading Screen Animation
(function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingBar = document.getElementById('loadingBar');

  if (!loadingScreen || !loadingBar) return;

  // Repeat visit in this session: the head script already hid the screen via
  // .skip-loading, so just release the scroll lock and skip the animation.
  if (document.documentElement.classList.contains('skip-loading')) {
    document.body.classList.remove('loading');
    return;
  }

  // First load of the session — remember it so later navigations skip this.
  try {
    sessionStorage.setItem('hasLoaded', '1');
  } catch (e) {
    // sessionStorage unavailable — the screen simply shows every time.
  }

  // Minimum time the loading screen stays up, even if the page is already ready.
  const DURATION = 2500;
  // Bar reaches 100% slightly early so the filled state is visible before hiding.
  const FILL_DURATION = DURATION - 300;

  const start = performance.now();
  let pageReady = false;
  let done = false;

  // Drive the bar on a fixed timeline rather than on load progress.
  const loadingInterval = setInterval(() => {
    const elapsed = performance.now() - start;
    const progress = Math.min(elapsed / FILL_DURATION, 1);
    loadingBar.style.width = (progress * 100) + '%';

    if (progress >= 1) clearInterval(loadingInterval);
  }, 16);

  function hide() {
    if (done) return;
    done = true;

    clearInterval(loadingInterval);
    loadingBar.style.width = '100%';
    loadingScreen.classList.add('hidden');
    document.body.classList.remove('loading');
  }

  // Hide only once the full duration has elapsed AND the page is ready.
  function maybeHide() {
    if (!pageReady) return;
    const remaining = DURATION - (performance.now() - start);
    if (remaining > 0) {
      setTimeout(hide, remaining);
    } else {
      hide();
    }
  }

  function onReady() {
    pageReady = true;
    maybeHide();
  }

  if (document.readyState === 'complete') {
    onReady();
  } else {
    window.addEventListener('load', onReady);
  }
})();
