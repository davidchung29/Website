//main shell functions

function showWelcomeMessage() {
  const output = document.getElementById('shell-output');
  
  // Add the welcome content directly as HTML
  output.innerHTML = `<div class="command-output">
welcome to my interactive portfolio.
i'm a sophomore at carnegie mellon university 
who likes about building scalable systems with thoughtful design.
type 'help' to explore available commands.
</div>`;
  
  output.scrollTop = output.scrollHeight;
}

function setupShellInput() {
    const input = document.getElementById('shell-input');
        const output = document.getElementById('shell-output');

  input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        const command = input.value.trim();
      if (command) {
        appendCommand(`→ ${command}`);
        handleCommand(command);
      }
      input.value = '';
      input.placeholder = '';
    }
  });


}

function appendCommand(text) {
  const output = document.getElementById('shell-output');
  const commandText = text.substring(2);
  output.innerHTML += `<div class="command-line"><span class="command-prompt">→</span><span class="command-text clickable" onclick="enterCommand('${commandText}')">${commandText}</span></div>`;
  output.scrollTop = output.scrollHeight;
}

function appendOutput(content) {
    const output = document.getElementById('shell-output');
  output.innerHTML += `<div class="command-output">${content}</div>`;
  output.scrollTop = output.scrollHeight;
  }
  
  function handleCommand(cmd) {
  switch (cmd.toLowerCase()) {
      case 'help':
      appendOutput(`
<strong>available commands:</strong>

→ <span class="clickable" onclick="enterCommand('about')">about</span>     learn about me 
→ <span class="clickable" onclick="enterCommand('projects')">projects</span>  view my portfolio 
→ <span class="clickable" onclick="enterCommand('skills')">skills</span>    my tech skills
→ <span class="clickable" onclick="enterCommand('contact')">contact</span>   contact me
→ <span class="clickable" onclick="enterCommand('clear')">clear</span>     clear terminal

<div class="command-help">fyi: click on any command above or type it manually</div>
      `);
        break;

      case 'about':
      appendOutput(`
<strong>who i am</strong>

i am a student + full stack engineer who enjoys building creative, scalable systems.
in my free time, i play bass in a few bands, lift, and spend time with friends and family.

i believe in creating software that is not only functional but also 
intuitive,maintainable, and resilient.
`);
        break;

      case 'projects':
      appendOutput(`
<strong>featured projects</strong>

<div class="project-grid">
  <div class="project-item clickable-project" onclick="showProjectWindow('mockly')">
    <div class="project-name">mockly</div>
    <div class="project-desc">web app using cv and fine-tuned llm to evaluate behavioral interviews (neetcode for behavioral interviews)</div>
  </div>
  <div class="project-item clickable-project" onclick="showProjectWindow('matrix')">
    <div class="project-name">matrix</div>
    <div class="project-desc">low-latency scalable data warehouse indexing a lot of terabytes (built in amazon)</div>
  </div>
  <div class="project-item clickable-project" onclick="showProjectWindow('myeyes')">
    <div class="project-name">myeyes</div>
    <div class="project-desc">ios app that uses cv and lidar to provide real-time scene understanding for the blind</div>
  </div>
  <div class="project-item clickable-project" onclick="showProjectWindow('gomokuai')">
    <div class="project-name">gomokuai</div>
    <div class="project-desc">fun gomoku ai bot i built in high school</div>
  </div>
</div>
<div class="command-help">fyi: click on any project above for detailed information</div>
      `);
      break;

    case 'skills':
      appendOutput(`
<strong>my technical stuff</strong>

<strong>languages & frameworks</strong>
• python, c, swift, typescript,kotlin
• node.js, fastapi, react, guice
• pytorch, opencv

<strong>other stuff</strong>  
• aws, nginx, postgresql, redis, mongodb

`);
      break;

    case 'contact':
      appendOutput(`
<strong>contact me/strong>

i'm interested in discussing innovative project opportunities.

→ email: dichung [at] andrew [dot] cmu [dot] edu
→ linkedin: https://www.linkedin.com/in/david-chung-00b04a199/
→ GitHub: https://github.com/davidchung29

`);
        break;

      case 'clear':
      document.getElementById('shell-output').innerHTML = '';
        break;

      case '':
        break;

      default:
      appendOutput(`Command not found: ${cmd}
type 'help' to see available commands.`);
  }
}

// Project Window System
function showProjectWindow(projectId) {
  const projects = {
    myeyes: {
      title: 'myEyes — ios cv + lidar app',
      content: `
        <div class="project-window-content">
          <h3>overview</h3>
          <p>myEyes is an ios app using live video footage and lidar data to help the blind navigate the world.</p>
          
          <h3>key features</h3>
          <p>
          • real-time object detection + collision prediciton<br>
          • integrated real-time alarms + speech feedback<br>
          • multi-threaded cv + lidar processing<br>
          
          <h3>implementation</h3>
          <p>utilizes opencv for image processing, yolov8 for object deteciton, and arkit for lidar integration.</p>
          
          <div class="tech-stack">
            <span class="tech-tag">python</span>
            <span class="tech-tag">yolov8</span>
            <span class="tech-tag">opencv</span>
            <span class="tech-tag">swift</span>
            <span class="tech-tag">arkit</span>
            <span class="tech-tag">avfoundation</span>
          </div>
          
          <div class="project-links">
            <a href="https://github.com/davidchung29/my-eyes" class="project-link">github</a>
          </div>
        </div>
      `
    },
    matrix: {
      title: 'Matrix — internal datawarehousing solution',
      content: `
        <div class="project-window-content">
          <h3>overview</h3>
          <p>Matrix is a low-latency scalable OpenSearch data warehouse indexing 20 million+ documents across 3 global regions with nlp queries</p>
          
          <h3>key features</h3>
          <p>
          • zero-ETL ingestion pipeline enabling real-time data flow<br>
          • industry-grade infrastructure with role-based authentication<br>
          • opensearch dashboard with support for nlp queries<br>
          
          <h3>implementation</h3>
          <p>utilizes opensearch for data management, aws cognito + federate oidc + aws alb for authentication, aws lambda for index management, aws s3 for exports, and nginx proxy to connect to opensearch.</p>
          
          <div class="tech-stack">
            <span class="tech-tag">typescript</span>
            <span class="tech-tag">kotlin</span>
            <span class="tech-tag">aws</span>
            <span class="tech-tag">nginx</span>
            <span class="tech-tag">opensearch</span>
          </div>
          
          <div class="project-links">
            <p>this is an internal service, and is not available to the public</p>
          </div>
        </div>
      `
    },
    mockly: {
      title: 'Mockly - leetcode for behavioral interviews',
      content: `
        <div class="project-window-content">
          <h3>overview</h3>
          <p>Mockly is a web app using cv and fine-tuned llm to evaluate behavioral interviews</p>
          
          <h3>key features</h3>
          <p>• inbrowser eye tracking, hand tracking, pitch analysis + fine-tuned llm to evaluate behavioral interviews<br>
          • secure user login with google oauth<br>
          • user progress and statistics storage<br>

          
          <h3>implementation</h3>
          <p>utilizes react for frontend, fastapi for backend, opencv + tensorflow for cv, fine-tuned mistral 7b llm for evaluation, jwt authentication, and sqlite for database.</p>
          
          <div class="tech-stack">
            <span class="tech-tag">react</span>
            <span class="tech-tag">fastapi</span>
            <span class="tech-tag">opencv</span>
            <span class="tech-tag">tensorflow</span>
            <span class="tech-tag">huggingface</span>
            <span class="tech-tag">jwt</span>
            <span class="tech-tag">sqlite</span>
          </div>
          
          <div class="project-links">
            <a href="https://github.com/davidchung29/Mockly-Frontend" class="project-link">github</a>
            <a href="https://mockly.pro/" class="project-link">website (pre-launch)</a>
          </div>
        </div>
      `
    },
    gomokuai: {
      title: 'gomokuAI - gomoku ai bot',
      content: `
       <div class="project-window-content">
          <h3>overview</h3>
          <p>gomokuAI is a gomoku ai bot i built in high school while taking CMU CS 15-112 over the summer</p>
          
          <h3>key features</h3>
          <p>
          • supports ai vs. player, player vs. player
          • flip mode where the column of a placed piece is reversed each turn

          
          <h3>implementation</h3>
          <p>built in python, ai uses custom board scoring mechanicsm + memoization + graph search w pruning, utilizes cmu_112_graphics for graphics</p>
          
          <div class="tech-stack">
            <span class="tech-tag">python</span>
          </div>
          
          <div class="project-links">
            <a href="https://github.com/davidchung29/gomokuAI" class="project-link">github</a>
          </div>
        </div>
      `
    }
  };

  const project = projects[projectId];
  if (project) {
    // Update project window content
    document.getElementById('project-title').textContent = project.title;
    document.getElementById('project-content').innerHTML = project.content;
    
    // Activate project window
    const projectWindow = document.getElementById('project-window');
    const mainContainer = document.getElementById('main-container');
    
    projectWindow.classList.add('active');
    mainContainer.classList.add('project-active');
    
    // Smooth scroll to project window on mobile
    if (window.innerWidth <= 1200) {
      projectWindow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}

function closeProjectWindow() {
  const projectWindow = document.getElementById('project-window');
  const mainContainer = document.getElementById('main-container');
  
  projectWindow.classList.remove('active');
  mainContainer.classList.remove('project-active');
  
  // Reset content after animation
  setTimeout(() => {
    document.getElementById('project-title').textContent = 'Project';
    document.getElementById('project-content').innerHTML = '<div class="project-placeholder"><p>Click on a project to view details</p></div>';
  }, 300);
}

// Modal System (keeping for other modals)
function showProjectModal(projectId) {
  const projects = {
    myeyes: {
      title: 'myEyes — ios cv + lidar app',
      content: `
        <div class="project-modal-content">
          <h3>overview</h3>
          <p>myEyes is an ios app using live video footage and lidar data to help the blind navigate the world.</p>
          
          <h3>key features</h3>
          <p>
          • real-time object detection + collision prediciton<br>
          • integrated real-time alarms + speech feedback<br>
          • multi-threaded cv + lidar processing<br>
          
          <h3>implementation</h3>
          <p>utilizes opencv for image processing, yolov8 for object deteciton, and arkit for lidar integration.</p>
          
          <div class="tech-stack">
            <span class="tech-tag">python</span>
            <span class="tech-tag">yolov8</span>
            <span class="tech-tag">opencv</span>
            <span class="tech-tag">swift</span>
            <span class="tech-tag">arkit</span>
            <span class="tech-tag">avfoundation</span>
          </div>
          
          <div class="project-links">
            <a href="https://github.com/davidchung29/my-eyes" class="project-link">github</a>
          </div>
        </div>
      `
    },
    matrix: {
      title: 'Matrix — internal datawarehousing solution',
      content: `
        <div class="project-modal-content">
          <h3>overview</h3>
          <p>Matrix is a low-latency scalable OpenSearch data warehouse indexing 20 million+ documents across 3 global regions with nlp queries</p>
          
          <h3>key features</h3>
          <p>
          • zero-ETL ingestion pipeline enabling real-time data flow<br>
          • industry-grade infrastructure with role-based authentication<br>
          • opensearch dashboard with support for nlp queries<br>
          
          <h3>implementation</h3>
          <p>utilizes opensearch for data management, aws cognito + federate oidc + aws alb for authentication, aws lambda for index management, aws s3 for exports, and nginx proxy to connect to opensearch.</p>
          
          <div class="tech-stack">
            <span class="tech-tag">typescript</span>
            <span class="tech-tag">kotlin</span>
            <span class="tech-tag">aws</span>
            <span class="tech-tag">nginx</span>
            <span class="tech-tag">opensearch</span>
          </div>
          
          <div class="project-links">
            <p>this is an internal service, and is not available to the public</p>
          </div>
        </div>
      `
    },
    mockly: {
      title: 'Mockly - leetcode for behavioral interviews',
      content: `
        <div class="project-modal-content">
          <h3>overview</h3>
          <p>Mockly is a web app using cv and fine-tuned llm to evaluate behavioral interviews</p>
          
          <h3>key features</h3>
          <p>• inbrowser eye tracking, hand tracking, pitch analysis + fine-tuned llm to evaluate behavioral interviews<br>
          • secure user login with google oauth<br>
          • user progress and statistics storage<br>

          
          <h3>implementation</h3>
          <p>utilizes react for frontend, fastapi for backend, opencv + tensorflow for cv, fine-tuned mistral 7b llm for evaluation, jwt authentication, and sqlite for database.</p>
          
          <div class="tech-stack">
            <span class="tech-tag">react</span>
            <span class="tech-tag">fastapi</span>
            <span class="tech-tag">opencv</span>
            <span class="tech-tag">tensorflow</span>
            <span class="tech-tag">huggingface</span>
            <span class="tech-tag">jwt</span>
            <span class="tech-tag">sqlite</span>
          </div>
          
          <div class="project-links">
            <a href="https://github.com/davidchung29/Mockly-Frontend" class="project-link">github</a>
            <a href="https://mockly.pro/" class="project-link">website (pre-launch)</a>
          </div>
        </div>
      `
    },
    gomokuai: {
      title: 'gomokuAI - gomoku ai bot',
      content: `
       <div class="project-modal-content">
          <h3>overview</h3>
          <p>gomokuAI is a gomoku ai bot i built in high school while taking CMU CS 15-112 over the summer</p>
          
          <h3>key features</h3>
          <p>
          • supports ai vs. player, player vs. player
          • flip mode where the column of a placed piece is reversed each turn

          
          <h3>implementation</h3>
          <p>built in python, ai uses custom board scoring mechanicsm + memoization + graph search w pruning, utilizes cmu_112_graphics for graphics</p>
          
          <div class="tech-stack">
            <span class="tech-tag">python</span>
          </div>
          
          <div class="project-links">
            <a href="https://github.com/davidchung29/gomokuAI" class="project-link">github</a>
          </div>
        </div>
      `
    }
  };

  const project = projects[projectId];
  if (project) {
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-content').innerHTML = project.content;
    document.getElementById('modal-overlay').classList.add('active');
  }
}

function showInfoModal(type) {
  const infoContent = {
    'about-terminal': {
      title: 'about this terminal',
      content: `
        <div class="project-modal-content">
          <h3>interactive design</h3>
          <p>i built this terminal interface to blend technical simplicity with functionality to showcase both engineering capabilities and design sensibility.</p>
          
          <h3>design philosophy</h3>
          <p>• simple, intuitive, and functional<br>
          
          <h3>implementation</h3>
          <p>just html, css, javascript with no external dependencies.</p>
          
          <div class="tech-stack">
            <span class="tech-tag">html5</span>
            <span class="tech-tag">css3</span>
            <span class="tech-tag">javascript</span>
            <span class="tech-tag">Responsive Design</span>
          </div>
        </div>
      `
    }
  };

  const info = infoContent[type];
  if (info) {
    document.getElementById('modal-title').textContent = info.title;
    document.getElementById('modal-content').innerHTML = info.content;
    document.getElementById('modal-overlay').classList.add('active');
  }
}

function closeModal(event) {
  if (event && event.target !== document.getElementById('modal-overlay')) return;
  document.getElementById('modal-overlay').classList.remove('active');
}

function minimizeTerminal() {
  const container = document.getElementById('shell-container');
  const mainContainer = document.getElementById('main-container');
  
  // Add minimized state class
  container.classList.add('minimized');
  mainContainer.classList.add('terminal-minimized');
  
  // Store original dimensions and position for restoration
  if (!container.dataset.originalHeight) {
    container.dataset.originalHeight = container.style.height || '700px';
    container.dataset.originalWidth = container.style.width || '800px';
    container.dataset.originalTransform = container.style.transform || '';
  }
  
  // Animate to minimized state
  container.style.height = '60px'; // Just header height
  container.style.width = '300px';
  container.style.transition = 'all 0.3s ease';
  
  // Hide content
  const content = container.querySelector('.window-content');
  content.style.opacity = '0';
  content.style.pointerEvents = 'none';
  
  // Make the header clickable to restore
  const header = container.querySelector('.window-header');
  header.style.cursor = 'pointer';
  header.onclick = function(e) {
    // Don't trigger if clicking on control buttons
    if (e.target.closest('.window-controls')) return;
    maximizeTerminal();
  };
}

function maximizeTerminal() {
  const container = document.getElementById('shell-container');
  const mainContainer = document.getElementById('main-container');
  
  // Remove minimized state
  container.classList.remove('minimized');
  mainContainer.classList.remove('terminal-minimized');
  
  // Restore original dimensions and position
  container.style.height = container.dataset.originalHeight || '700px';
  container.style.width = container.dataset.originalWidth || '800px';
  container.style.transform = container.dataset.originalTransform || '';
  container.style.transition = 'all 0.3s ease';
  
  // Show content
  const content = container.querySelector('.window-content');
  content.style.opacity = '1';
  content.style.pointerEvents = 'auto';
  
  // Remove header click handler
  const header = container.querySelector('.window-header');
  header.style.cursor = 'default';
  header.onclick = null;
}

function closeTerminal() {
  const container = document.getElementById('shell-container');
  
  // Animate closing
  container.style.transform = 'scale(0.8) translateY(100px)';
  container.style.opacity = '0';
  container.style.transition = 'all 0.3s ease';
  
  // After animation, hide the terminal
  setTimeout(() => {
    container.style.display = 'none';
    // Show a message or redirect
    document.body.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: var(--ui-font); color: var(--text-secondary);">Terminal closed. Refresh to restart.</div>';
  }, 300);
}

function enterCommand(command) {
  // Show the command as if it was typed and entered
  appendCommand(`→ ${command}`);
  
  // Execute the command immediately
  handleCommand(command);
}

// Make functions globally accessible for click interactions
window.handleCommand = handleCommand;
window.enterCommand = enterCommand;
window.showProjectWindow = showProjectWindow;
window.closeProjectWindow = closeProjectWindow;
window.showProjectModal = showProjectModal;
window.showInfoModal = showInfoModal;
window.closeModal = closeModal;
window.minimizeTerminal = minimizeTerminal;
window.maximizeTerminal = maximizeTerminal;
window.closeTerminal = closeTerminal;
  