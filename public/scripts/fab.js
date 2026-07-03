// Floating Action Button with Liquid Overlay

document.addEventListener('DOMContentLoaded', function() {
  const fab = document.getElementById('fab');
  const overlay = document.getElementById('liquidOverlay');
  let isActive = false;

  fab.addEventListener('click', function() {
    if (!isActive) {
      // Activate overlay
      overlay.classList.add('active');
      fab.classList.add('active');
      isActive = true;
    } else {
      // Deactivate overlay
      overlay.classList.remove('active');
      fab.classList.remove('active');
      isActive = false;
    }
  });

  // Close overlay when clicking on it (but not on chat terminal)
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) {
      overlay.classList.remove('active');
      fab.classList.remove('active');
      isActive = false;
    }
  });
});

