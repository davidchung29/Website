// Loading Screen Animation
(function() {
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingBar = document.getElementById('loadingBar');

  if (!loadingScreen || !loadingBar) return;

  let progress = 0;
  const increment = 2;
  const interval = 20;

  // Animate loading bar
  const loadingInterval = setInterval(() => {
    progress += increment;

    if (progress >= 90) {
      // Slow down near the end, wait for actual page load
      clearInterval(loadingInterval);
      loadingBar.style.width = '90%';
    } else {
      loadingBar.style.width = progress + '%';
    }
  }, interval);

  // Complete loading when page is ready
  function completeLoading() {
    clearInterval(loadingInterval);
    loadingBar.style.width = '100%';

    // Wait a bit before hiding to show completion
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 300);
  }

  // Listen for page load
  if (document.readyState === 'complete') {
    completeLoading();
  } else {
    window.addEventListener('load', completeLoading);
  }
})();
