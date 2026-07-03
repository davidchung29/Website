// Expandable experience items (Apple-style)
document.addEventListener('DOMContentLoaded', function() {
  const expandableItems = document.querySelectorAll('.expandable-item');

  expandableItems.forEach(item => {
    const content = item.querySelector('.expandable-content');

    if (!content) return;

    item.addEventListener('click', function(e) {
      // Don't toggle if clicking on a link
      if (e.target.closest('.expandable-link')) {
        return;
      }

      // Prevent default behavior
      e.preventDefault();
      e.stopPropagation();

      const isExpanded = item.classList.contains('expanded');

      if (isExpanded) {
        // Collapse
        const contentHeight = content.scrollHeight;
        content.style.maxHeight = contentHeight + 'px';

        // Force reflow
        content.offsetHeight;

        content.style.maxHeight = '0px';
        item.classList.remove('expanded');
      } else {
        // Expand
        item.classList.add('expanded');
        const contentHeight = content.scrollHeight;
        content.style.maxHeight = contentHeight + 'px';

        // Reset max-height after transition
        setTimeout(() => {
          if (item.classList.contains('expanded')) {
            content.style.maxHeight = 'none';
          }
        }, 300);
      }
    });

    // Prevent link clicks from bubbling to item
    const links = content.querySelectorAll('.expandable-link');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
  });
});
