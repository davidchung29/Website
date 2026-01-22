// Project view toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('projectViewToggle');
  const projectList = document.querySelector('.project-list');
  const projectItems = document.querySelectorAll('.project-list .experience-item');

  // Store original list view HTML for each project
  const originalHTML = new Map();
  projectItems.forEach(item => {
    originalHTML.set(item, item.innerHTML);
  });

  toggle.addEventListener('change', function() {
    if (this.checked) {
      // Switch to card view
      projectList.classList.add('card-view');

      // Transform each project item to card view
      projectItems.forEach(item => {
        const thumbnail = item.dataset.thumbnail;
        const name = item.querySelector('.experience-org')?.textContent || '';
        const awards = item.dataset.awards || '';
        const oneliner = item.dataset.oneliner || '';

        // Create card HTML
        const cardHTML = `
          <img src="${thumbnail}" alt="${name}" class="project-card-thumbnail" onerror="this.style.display='none'; this.parentElement.style.background='#f0f0f0';">
          <div class="project-card-overlay">
            <div class="project-card-name">${name}</div>
            <div class="project-card-awards">${awards}</div>
            <div class="project-card-oneliner">${oneliner}</div>
          </div>
        `;

        item.innerHTML = cardHTML;
      });
    } else {
      // Switch back to list view
      projectList.classList.remove('card-view');

      // Restore original HTML
      projectItems.forEach(item => {
        item.innerHTML = originalHTML.get(item);
      });
    }
  });
});
