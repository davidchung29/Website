// Simplified tile flip loading animation
const loadingContent = document.getElementById('loading-content');
let animationComplete = false;

function updateDimensions() {
  const tileSize = 30; // Size of each tile in pixels
  const cols = Math.ceil(window.innerWidth / tileSize);
  const rows = Math.ceil(window.innerHeight / tileSize);
  return { cols, rows, tileSize };
}

function createTileGrid() {
  const { cols, rows, tileSize } = updateDimensions();
  
  console.log(`Creating tile grid: ${cols} cols x ${rows} rows, tile size: ${tileSize}px`);
  
  // Clear previous content
  loadingContent.innerHTML = '';
  loadingContent.style.position = 'relative';
  loadingContent.style.width = '100%';
  loadingContent.style.height = '100%';
  
  // Create tiles
  const tiles = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const tile = document.createElement('div');
      tile.className = 'loading-tile';
      tile.style.position = 'absolute';
      tile.style.left = `${col * tileSize}px`;
      tile.style.top = `${row * tileSize}px`;
      tile.style.width = `${tileSize}px`;
      tile.style.height = `${tileSize}px`;
      tile.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
      tile.style.border = '1px solid rgba(0, 0, 0, 0.1)';
      tile.style.transition = 'all 0.3s ease';
      tile.style.transform = 'rotateY(180deg)';
      tile.style.boxSizing = 'border-box';
      
      loadingContent.appendChild(tile);
      tiles.push({ element: tile, row, col, flipped: false });
    }
  }
  
  console.log(`Created ${tiles.length} tiles`);
  
  return tiles;
}

function animateTiles() {
  if (animationComplete) return;
  
  const tiles = createTileGrid();
  const { cols, rows } = updateDimensions();
  
  let currentWave = 0;
  const maxWaves = cols + rows - 1;
  
  function flipNextWave() {
    if (currentWave >= maxWaves || animationComplete) {
      // Animation complete - show portfolio
      setTimeout(() => {
        if (!animationComplete) {
          animationComplete = true;
          initPortfolio();
        }
      }, 500);
      return;
    }
    
    // Find tiles in current diagonal wave
    const tilesToFlip = tiles.filter(tile => 
      tile.col + tile.row === currentWave && !tile.flipped
    );
    
    // Flip tiles in current wave
    tilesToFlip.forEach((tile, index) => {
      setTimeout(() => {
        tile.element.style.transform = 'rotateY(0deg)';
        tile.element.style.backgroundColor = 'rgba(0, 0, 0, 0.15)';
        tile.element.style.borderColor = 'rgba(0, 0, 0, 0.3)';
        tile.flipped = true;
      }, index * 50); // Increased stagger within the wave for smoother animation
    });
    
    currentWave++;
    setTimeout(flipNextWave, 100); // Increased delay between waves for smoother animation
  }
  
  // Start the animation
  setTimeout(flipNextWave, 300);
}

function initPortfolio() {
  document.getElementById('loading-screen').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    const container = document.getElementById('shell-container');
    if (container) {
      container.style.display = 'block';
      container.classList.add('fade-in');
    }
    
    // Initialize terminal
    if (typeof showWelcomeMessage === 'function') showWelcomeMessage();
    if (typeof setupShellInput === 'function') setupShellInput();
    
    // Initialize pager
    if (typeof initScreenPager === 'function') initScreenPager();
    
    // Initialize theme system after portfolio is loaded
    if (typeof initThemeSystem === 'function') {
      initThemeSystem();
    }
    
    // Ensure toggle is clickable
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      console.log('Toggle element found:', toggle);
      toggle.style.pointerEvents = 'auto';
      toggle.style.cursor = 'pointer';
    } else {
      console.error('Toggle element not found!');
    }
  }, 300);
}

// Initialize the loading animation
animateTiles();

// Handle window resize
window.addEventListener('resize', function() {
  if (!animationComplete) {
    // Restart animation with new dimensions
    animateTiles();
  }
});
