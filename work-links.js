// Work experience click to open company links
document.addEventListener('DOMContentLoaded', function() {
  const workItems = document.querySelectorAll('.clickable-work');

  workItems.forEach(item => {
    item.addEventListener('click', function(e) {
      const companyUrl = this.dataset.companyUrl;
      if (companyUrl) {
        window.open(companyUrl, '_blank', 'noopener,noreferrer');
      }
    });
  });
});
