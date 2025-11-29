// Project Preview Panel
// Handles split-screen project demo preview with draggable divider

class ProjectPreviewPanel {
  constructor() {
    this.isOpen = false;
    this.currentProject = null;
    this.isDragging = false;
    this.splitPosition = 50; // percentage
    this.minPanelWidth = 400; // pixels
    this.panel = null;
    this.divider = null;
    this.content = null;
    this.iframe = null;
    
    this.init();
  }

  init() {
    // Create panel DOM structure
    this.createPanel();
    
    // Attach event listeners
    this.attachEventListeners();
    
    // Make project cards clickable
    this.attachProjectCardListeners();
  }

  createPanel() {
    // Create main panel container
    this.panel = document.createElement('div');
    this.panel.className = 'preview-panel';
    
    // Create divider
    this.divider = document.createElement('div');
    this.divider.className = 'panel-divider';
    
    // Create content container
    this.content = document.createElement('div');
    this.content.className = 'preview-content';
    
    // Create header
    const header = document.createElement('div');
    header.className = 'preview-header';
    
    const title = document.createElement('h2');
    title.className = 'preview-title';
    
    const actions = document.createElement('div');
    actions.className = 'preview-actions';
    
    const githubLink = document.createElement('a');
    githubLink.className = 'github-link';
    githubLink.target = '_blank';
    githubLink.rel = 'noopener noreferrer';
    githubLink.setAttribute('aria-label', 'View on GitHub');
    githubLink.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    `;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '×';
    closeButton.setAttribute('aria-label', 'Close preview');
    
    actions.appendChild(githubLink);
    actions.appendChild(closeButton);
    
    header.appendChild(title);
    header.appendChild(actions);
    
    // Create iframe container
    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'preview-iframe-container';
    
    const loading = document.createElement('div');
    loading.className = 'preview-loading';
    loading.textContent = 'Loading...';
    
    this.iframe = document.createElement('iframe');
    this.iframe.className = 'preview-iframe';
    this.iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation');
    this.iframe.setAttribute('loading', 'lazy');
    
    iframeContainer.appendChild(loading);
    iframeContainer.appendChild(this.iframe);
    
    // Assemble content
    this.content.appendChild(header);
    this.content.appendChild(iframeContainer);
    
    // Assemble panel
    this.panel.appendChild(this.divider);
    this.panel.appendChild(this.content);
    
    // Add to document
    document.body.appendChild(this.panel);
    
    // Store references to elements we'll need
    this.titleElement = title;
    this.githubLinkElement = githubLink;
    this.closeButtonElement = closeButton;
    this.loadingElement = loading;
    this.iframeContainer = iframeContainer;
  }

  attachEventListeners() {
    // Close button
    this.closeButtonElement.addEventListener('click', () => this.close());
    
    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Click outside (on main page) - with delay to prevent immediate close
    document.addEventListener('click', (e) => {
      if (!this.isOpen) return;
      
      // Ignore clicks during opening animation
      if (this.panel.classList.contains('opening')) return;
      
      if (!this.content.contains(e.target) && !this.divider.contains(e.target)) {
        // Check if click is on main page content
        const page = document.querySelector('.page');
        if (page && page.contains(e.target)) {
          // Additional check: make sure we're not clicking on a project card
          const clickedProjectCard = e.target.closest('.project-list .experience-item');
          if (!clickedProjectCard) {
            this.close();
          }
        }
      }
    });
    
    // Divider drag - bind to instance methods
    this.boundDrag = (e) => this.drag(e);
    this.boundEndDrag = (e) => this.endDrag(e);
    
    this.divider.addEventListener('mousedown', (e) => this.startDrag(e));
    
    // Touch support for divider
    this.divider.addEventListener('touchstart', (e) => this.startDrag(e));
    
    // Iframe load event
    this.iframe.addEventListener('load', () => {
      this.loadingElement.style.display = 'none';
      this.iframe.classList.add('loaded');
    });
  }

  attachProjectCardListeners() {
    // Get project data from chat.js
    if (typeof window.davidData === 'undefined') {
      console.error('davidData not found. Make sure chat.js is loaded before project-preview.js');
      // Retry after a short delay in case chat.js hasn't loaded yet
      setTimeout(() => {
        if (typeof window.davidData !== 'undefined') {
          this.attachProjectCardListeners();
        }
      }, 100);
      return;
    }
    
    // Find all project cards
    const projectCards = document.querySelectorAll('.project-list .experience-item');
    
    console.log('Found project cards:', projectCards.length);
    console.log('Found projects in davidData:', window.davidData.projects.length);
    
    projectCards.forEach((card, index) => {
      const project = window.davidData.projects[index];
      
      if (project && project.demoUrl) {
        console.log(`Attaching click listener to ${project.name}`);
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
          // Don't open if clicking on a link
          if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
          }
          
          console.log(`Opening preview for ${project.name}`);
          this.open(project, card);
        });
      } else {
        console.log(`Skipping card ${index}: no demoUrl`);
      }
    });
  }

  open(project, clickedElement) {
    if (this.isOpen) {
      this.close();
      return;
    }
    
    this.isOpen = true;
    this.currentProject = project;
    
    console.log('Opening panel for:', project.name);
    
    // Update panel content
    this.titleElement.textContent = project.name;
    this.githubLinkElement.href = project.githubLink;
    this.iframe.src = project.demoUrl;
    
    // Reset iframe state
    this.iframe.classList.remove('loaded');
    this.loadingElement.style.display = 'block';
    
    // Add active class to page and body
    const page = document.querySelector('.page');
    if (page) {
      page.classList.add('preview-active');
    }
    document.body.classList.add('preview-active');
    
    // Show panel with animation
    this.panel.classList.add('active', 'opening');
    
    // Set initial split position
    this.updateSplitPosition(this.splitPosition);
    
    // Remove opening class after animation (this prevents click-outside from closing immediately)
    setTimeout(() => {
      this.panel.classList.remove('opening');
      console.log('Panel fully opened');
    }, 450); // Slightly longer than animation duration
  }

  close() {
    if (!this.isOpen) return;
    
    this.panel.classList.add('closing');
    
    setTimeout(() => {
      this.panel.classList.remove('active', 'closing');
      this.isOpen = false;
      this.currentProject = null;
      
      // Remove active class from page and body
      const page = document.querySelector('.page');
      if (page) {
        page.classList.remove('preview-active');
      }
      document.body.classList.remove('preview-active');
      
      // Clear iframe
      this.iframe.src = '';
    }, 400);
  }

  startDrag(e) {
    // Only on desktop
    if (window.innerWidth <= 768) return;
    
    this.isDragging = true;
    this.divider.classList.add('dragging');
    document.body.classList.add('dragging-divider');
    
    // Add event listeners when drag starts
    document.addEventListener('mousemove', this.boundDrag);
    document.addEventListener('mouseup', this.boundEndDrag);
    document.addEventListener('touchmove', this.boundDrag);
    document.addEventListener('touchend', this.boundEndDrag);
    
    e.preventDefault();
    e.stopPropagation();
  }

  drag(e) {
    if (!this.isDragging) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const windowWidth = window.innerWidth;
    
    // Clamp clientX to window bounds to prevent over-dragging
    const clampedX = Math.max(0, Math.min(clientX, windowWidth));
    
    // Calculate percentage
    let percentage = (clampedX / windowWidth) * 100;
    
    // Apply constraints (minimum 400px for each side)
    const minPercentage = (this.minPanelWidth / windowWidth) * 100;
    const maxPercentage = 100 - minPercentage;
    
    // Clamp percentage between min and max
    percentage = Math.max(minPercentage, Math.min(maxPercentage, percentage));
    
    this.updateSplitPosition(percentage);
  }

  endDrag(e) {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.divider.classList.remove('dragging');
    document.body.classList.remove('dragging-divider');
    
    // Remove event listeners when drag ends
    document.removeEventListener('mousemove', this.boundDrag);
    document.removeEventListener('mouseup', this.boundEndDrag);
    document.removeEventListener('touchmove', this.boundDrag);
    document.removeEventListener('touchend', this.boundEndDrag);
    
    if (e) {
      e.preventDefault();
    }
  }

  updateSplitPosition(percentage) {
    this.splitPosition = percentage;
    
    // Update divider position
    this.divider.style.left = `${percentage}%`;
    
    // Update preview content position
    this.content.style.left = `${percentage}%`;
    
    // Update main page width
    const page = document.querySelector('.page');
    if (page && page.classList.contains('preview-active')) {
      page.style.width = `${percentage}%`;
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.projectPreviewPanel = new ProjectPreviewPanel();
});

