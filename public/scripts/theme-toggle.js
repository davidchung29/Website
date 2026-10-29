// Theme toggle functionality
(function() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  const sunIcon = themeToggle.querySelector('.sun-icon');
  const moonIcon = themeToggle.querySelector('.moon-icon');

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';

  // Apply the theme on page load
  if (currentTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', function() {
    const currentTheme = html.getAttribute('data-theme');

    if (currentTheme === 'dark') {
      // Switch to light mode
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    } else {
      // Switch to dark mode
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    }
  });
})();
