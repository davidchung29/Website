//main shell functions

function showWelcomeMessage() {
  const output = document.getElementById('shell-output');
  
  // Add the welcome content directly as HTML
  output.innerHTML = `<div class="command-output">
hey, its david!
welcome to my interactive portfolio.
i'm a sophomore at carnegie mellon university 
who likes building scalable systems with thoughtful design.
type 'help' to explore available commands.
</div>`;
  
  output.scrollTop = output.scrollHeight;
  updateCommandButtons(); // Show command buttons after welcome message
}

// Helper: detect mobile/tablet/desktop layouts by width
function isMobile(maxWidth = 1200) {
  return window.matchMedia && window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
}

function recenterShellHeaderTop() {
  if (!isMobile(768)) return;
  const header = document.querySelector('#shell-container .window-header');
  if (!header) return;
  const y = header.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - 8;
  window.scrollTo({ top: Math.max(0, y), left: 0, behavior: 'smooth' });
}

function hideSoftKeyboard(inputEl) {
  if (!inputEl) return;
  try {
    inputEl.blur();
    // iOS workaround: shift focus to a temporary hidden input then blur
    const temp = document.createElement('input');
    temp.style.position = 'fixed';
    temp.style.opacity = '0';
    temp.style.pointerEvents = 'none';
    temp.style.height = '0';
    temp.style.bottom = '-100px';
    document.body.appendChild(temp);
    temp.focus();
    setTimeout(() => {
      temp.blur();
      document.body.removeChild(temp);
      // Recenter: place the shell header at the top of the screen
      recenterShellHeaderTop();
    }, 0);
  } catch (_) {}
}

function updateCommandButtons() {
  const windowContent = document.querySelector('#shell-container .window-content');
  const existingButtons = windowContent.querySelector('.command-buttons');
  
  // Remove existing buttons if they exist
  if (existingButtons) {
    existingButtons.remove();
  }
  
  // Create command buttons container
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'command-buttons';
  
  // Define available commands
  const commands = [
    { name: 'help', description: 'Show all commands' },
    { name: 'about', description: 'Learn about me' },
    { name: 'projects', description: 'View portfolio' },
    { name: 'skills', description: 'My tech skills' },
    { name: 'contact', description: 'Contact info' },
    { name: 'clear', description: 'Clear terminal' }
  ];
  
  // Create buttons for each command
  commands.forEach(cmd => {
    const button = document.createElement('button');
    button.className = 'command-button';
    button.textContent = cmd.name;
    button.title = cmd.description;
    button.onclick = () => {
      const input = document.getElementById('shell-input');
      input.value = cmd.name;
      // On desktop, focus to allow quick typing again; on mobile, blur to keep keyboard hidden
      if (isMobile(768)) {
        appendCommand(`→ ${cmd.name}`);
        handleCommand(cmd.name);
        input.value = '';
        hideSoftKeyboard(input);
      } else {
        input.focus();
        appendCommand(`→ ${cmd.name}`);
        handleCommand(cmd.name);
        input.value = '';
      }
    };
    buttonsContainer.appendChild(button);
  });
  
  // Insert buttons between output and input
  const output = document.getElementById('shell-output');
  output.insertAdjacentElement('afterend', buttonsContainer);
}

function setupShellInput() {
    const input = document.getElementById('shell-input');
        const output = document.getElementById('shell-output');

  input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        const command = input.value.trim();
      if (command) {
        appendCommand(`→ ${command}`);
        handleCommand(command);
      }
      input.value = '';
      input.placeholder = '';
      // Hide mobile keyboard after submitting (phone-sized screens)
      if (isMobile(768)) {
        setTimeout(() => hideSoftKeyboard(input), 0);
      }
    }
  });

  // Initialize command buttons
  updateCommandButtons();
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
<div class="about-section">
  <img class="about-avatar" src="assets/profile.jpg" alt="photo of David Chung" onerror="this.style.display='none'" />
  <div class="about-text">
    <strong>who i am</strong>

    i am a student + full stack engineer who enjoys building creative, scalable systems.
    in my free time, i play bass in a few bands, lift, and spend time with friends and family.

    i believe in creating software that is not only functional but also 
    intuitive, maintainable, and resilient.
  </div>
</div>
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
<strong>contact me</strong>

i'm interested in discussing innovative project opportunities.

<div class="contact-links">
  <div class="contact-item email-contact">
    <span class="contact-link" onclick="copyToClipboard('dichung [at] andrew [dot] cmu [dot] edu')">
      → email: dichung [at] andrew [dot] cmu [dot] edu (click to copy)
    </span>
  </div>
  <div class="contact-item linkedin-contact">
    <span class="contact-link" onclick="window.open('https://www.linkedin.com/in/david-chung-00b04a199/', '_blank', 'noopener')">
      → linkedin: open in new tab
    </span>
  </div>
  <div class="contact-item github-contact">
    <span class="contact-link" onclick="window.open('https://github.com/davidchung29', '_blank', 'noopener')">
      → github: open in new tab
    </span>
  </div>
</div>
      `);
      break;

      case 'clear':
      document.getElementById('shell-output').innerHTML = '';
      updateCommandButtons(); // Refresh command buttons after clearing
        break;

      case 'theme':
      case 'dark':
      case 'light':
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        
        if (cmd === 'theme') {
          toggleThemeSimple();
          const newTheme = document.documentElement.getAttribute('data-theme');
          appendOutput(`Theme switched to ${newTheme} mode.`);
        } else if (cmd === 'dark') {
          if (currentTheme !== 'dark') {
            toggleThemeSimple();
          }
          appendOutput(`Dark mode activated.`);
        } else if (cmd === 'light') {
          if (currentTheme !== 'light') {
            toggleThemeSimple();
          }
          appendOutput(`Light mode activated.`);
        }
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
          
          <div class="system-diagram">
            <h4>System Architecture</h4>
            <div class="diagram-container" id="diagram-myeyes"></div>
            <div class="diagram-controls" id="diagram-controls-myeyes">
              <button class="diagram-btn active" data-type="architecture" onclick="switchDiagram('myeyes', 'architecture')">Architecture</button>
              <button class="diagram-btn" data-type="processing" onclick="switchDiagram('myeyes', 'processing')">Processing Flow</button>
            </div>
          </div>
          
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
          <div class="mockly-preview" onclick="window.open('https://mockly.pro/', '_blank')">
            <div class="mockly-preview-header">
              <div class="mockly-preview-title">david browser</div>
              <div class="mockly-preview-url">mockly.pro</div>
            </div>
            <div class="mockly-preview-content" id="mockly-preview-content-desktop">
              <iframe 
                class="mockly-preview-iframe" 
                src="https://mockly.pro/" 
                title="Mockly Live Preview"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                onload="handleMocklyIframeLoad('desktop')"
                onerror="handleMocklyIframeError('desktop')">
              </iframe>
              <div class="mockly-preview-overlay">
                <div class="mockly-preview-overlay-content">
                  <div class="mockly-preview-overlay-title">Click to Visit Full Site</div>
                  <div class="mockly-preview-overlay-subtitle">mockly.pro</div>
                </div>
              </div>
            </div>
          </div>
          
          <h3>overview</h3>
          <p>Mockly is a web app using cv and fine-tuned llm to evaluate behavioral interviews</p>
          
          <div class="system-diagram">
            <h4>System Architecture</h4>
            <div class="diagram-container" id="diagram-mockly"></div>
            <div class="diagram-controls" id="diagram-controls-mockly">
              <button class="diagram-btn active" data-type="architecture" onclick="switchDiagram('mockly', 'architecture')">Architecture</button>
              <button class="diagram-btn" data-type="dataflow" onclick="switchDiagram('mockly', 'dataflow')">Session Flow</button>
              <button class="diagram-btn" data-type="deployment" onclick="switchDiagram('mockly', 'deployment')">Deployment</button>
            </div>
          </div>
          
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
          
          <div class="system-diagram">
            <h4>System Architecture</h4>
            <div class="diagram-container" id="diagram-gomokuai"></div>
            <div class="diagram-controls" id="diagram-controls-gomokuai">
              <button class="diagram-btn active" data-type="architecture" onclick="switchDiagram('gomokuai', 'architecture')">Architecture</button>
              <button class="diagram-btn" data-type="algorithm" onclick="switchDiagram('gomokuai', 'algorithm')">AI Algorithm</button>
            </div>
          </div>
          
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
    const mobileLayout = isMobile();
    if (mobileLayout) {
      showProjectModal(projectId);
      // Render initial diagram for mobile modal
      setTimeout(() => {
        console.log(`Attempting to render diagram for project (mobile): ${projectId}`);
        const diagrams = getProjectDiagrams(projectId);
        console.log(`Available diagrams for ${projectId}:`, Object.keys(diagrams));
        const firstDiagramType = Object.keys(diagrams)[0];
        if (firstDiagramType) {
          console.log(`Rendering first diagram: ${firstDiagramType}`);
          renderDiagram(`diagram-${projectId}`, diagrams[firstDiagramType].definition, `${projectId}-${firstDiagramType}-init`);
        } else {
          console.log(`No diagrams found for project: ${projectId}`);
        }
        
        // Check iframe loading for Mockly project
        if (projectId === 'mockly') {
          checkMocklyIframeLoad();
        }
        
        // Add click handlers to diagrams
        addDiagramClickHandlers();
      }, 500);
    } else {
      document.getElementById('project-title').textContent = project.title;
      document.getElementById('project-content').innerHTML = project.content;
      const projectWindow = document.getElementById('project-window');
      const mainContainer = document.getElementById('main-container');
      projectWindow.classList.add('active');
      mainContainer.classList.add('project-active');
      
      // Render initial diagram for desktop window
      setTimeout(() => {
        console.log(`Attempting to render diagram for project: ${projectId}`);
        const diagrams = getProjectDiagrams(projectId);
        console.log(`Available diagrams for ${projectId}:`, Object.keys(diagrams));
        const firstDiagramType = Object.keys(diagrams)[0];
        if (firstDiagramType) {
          console.log(`Rendering first diagram: ${firstDiagramType}`);
          renderDiagram(`diagram-${projectId}`, diagrams[firstDiagramType].definition, `${projectId}-${firstDiagramType}-init`);
        } else {
          console.log(`No diagrams found for project: ${projectId}`);
        }
        
        // Check iframe loading for Mockly project
        if (projectId === 'mockly') {
          checkMocklyIframeLoad();
        }
        
        // Add click handlers to diagrams
        addDiagramClickHandlers();
      }, 500); // Increased delay to ensure DOM is ready
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
          
          <div class="system-diagram">
            <h4>System Architecture</h4>
            <div class="diagram-container" id="diagram-myeyes"></div>
            <div class="diagram-controls" id="diagram-controls-myeyes">
              <button class="diagram-btn active" data-type="architecture" onclick="switchDiagram('myeyes', 'architecture')">Architecture</button>
              <button class="diagram-btn" data-type="processing" onclick="switchDiagram('myeyes', 'processing')">Processing Flow</button>
            </div>
          </div>
          
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
          
          <div class="system-diagram">
            <h4>System Architecture</h4>
            <div class="diagram-container" id="diagram-matrix"></div>
            <div class="diagram-controls" id="diagram-controls-matrix">
              <button class="diagram-btn active" data-type="architecture" onclick="switchDiagram('matrix', 'architecture')">Architecture</button>
              <button class="diagram-btn" data-type="deployment" onclick="switchDiagram('matrix', 'deployment')">Deployment</button>
            </div>
          </div>
          
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
          <div class="mockly-preview" onclick="window.open('https://mockly.pro/', '_blank')">
            <div class="mockly-preview-header">
              <div class="mockly-preview-title">Live Preview</div>
              <div class="mockly-preview-url">mockly.pro</div>
            </div>
            <div class="mockly-preview-content" id="mockly-preview-content-modal">
              <iframe 
                class="mockly-preview-iframe" 
                src="https://mockly.pro/" 
                title="Mockly Live Preview"
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                onload="handleMocklyIframeLoad('modal')"
                onerror="handleMocklyIframeError('modal')">
              </iframe>
              <div class="mockly-preview-overlay">
                <div class="mockly-preview-overlay-content">
                  <div class="mockly-preview-overlay-title">Click to Visit Full Site</div>
                  <div class="mockly-preview-overlay-subtitle">mockly.pro</div>
                </div>
              </div>
            </div>
          </div>
          
          <h3>overview</h3>
          <p>Mockly is a web app using cv and fine-tuned llm to evaluate behavioral interviews</p>
          
          <div class="system-diagram">
            <h4>System Architecture</h4>
            <div class="diagram-container" id="diagram-mockly"></div>
            <div class="diagram-controls" id="diagram-controls-mockly">
              <button class="diagram-btn active" data-type="architecture" onclick="switchDiagram('mockly', 'architecture')">Architecture</button>
              <button class="diagram-btn" data-type="dataflow" onclick="switchDiagram('mockly', 'dataflow')">Session Flow</button>
              <button class="diagram-btn" data-type="deployment" onclick="switchDiagram('mockly', 'deployment')">Deployment</button>
            </div>
          </div>
          
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
          
          <div class="system-diagram">
            <h4>System Architecture</h4>
            <div class="diagram-container" id="diagram-gomokuai"></div>
            <div class="diagram-controls" id="diagram-controls-gomokuai">
              <button class="diagram-btn active" data-type="architecture" onclick="switchDiagram('gomokuai', 'architecture')">Architecture</button>
              <button class="diagram-btn" data-type="algorithm" onclick="switchDiagram('gomokuai', 'algorithm')">AI Algorithm</button>
            </div>
          </div>
          
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
window.showProfilePreview = showProfilePreview;
window.hideProfilePreview = hideProfilePreview;
window.handleTouchStart = handleTouchStart;
window.handleTouchEnd = handleTouchEnd;
window.copyToClipboard = copyToClipboard;
window.showContactWindow = showContactWindow;
window.showContactModal = showContactModal;

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
  // If we're on desktop and a project modal is open, close it
  if (!isMobile()) {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay.classList.contains('active')) {
      // Check if it's a project/contact modal (not info modal)
      const modalTitle = document.getElementById('modal-title').textContent;
      if (modalTitle.includes('myEyes') || modalTitle.includes('Matrix') || 
          modalTitle.includes('Mockly') || modalTitle.includes('gomokuAI') ||
          modalTitle.includes('LinkedIn') || modalTitle.includes('GitHub')) {
        closeModal();
      }
    }
  }
});

// Profile Preview Functions
function showProfilePreview(event) {
  const platform = event.target.dataset.platform;
  
  if (platform === 'linkedin') {
    // Create or get existing preview
    let preview = document.getElementById('profile-preview');
    if (!preview) {
      preview = createProfilePreview();
      document.body.appendChild(preview);
    }
    
    // Position the preview relative to the hovered element
    const rect = event.target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    preview.style.left = `${rect.left + scrollLeft}px`;
    preview.style.top = `${rect.bottom + scrollTop + 8}px`;
    
    // Show the preview
    preview.classList.add('active');
    
    // Add click handlers for preview buttons
    const viewBtn = preview.querySelector('.preview-btn.primary');
    const connectBtn = preview.querySelector('.preview-btn.secondary');
    
    viewBtn.onclick = () => {
      window.open('https://www.linkedin.com/in/david-chung-00b04a199/', '_blank');
      hideProfilePreview();
    };
    
    connectBtn.onclick = () => {
      window.open('https://www.linkedin.com/in/david-chung-00b04a199/', '_blank');
      hideProfilePreview();
    };
  }
}

function hideProfilePreview() {
  const preview = document.getElementById('profile-preview');
  if (preview) {
    preview.classList.remove('active');
  }
}

function createProfilePreview() {
  const preview = document.createElement('div');
  preview.id = 'profile-preview';
  preview.className = 'profile-preview';
  preview.innerHTML = `
    <div class="preview-header">
      <div class="preview-avatar">DC</div>
      <div class="preview-info">
        <div class="preview-name">David Chung</div>
        <div class="preview-title">Software Engineer</div>
        <div class="preview-company">Carnegie Mellon University</div>
      </div>
    </div>
    <div class="preview-body">
      <div class="preview-location">📍 Pittsburgh, PA</div>
      <div class="preview-connections">🔗 500+ connections</div>
      <div class="preview-summary">Full-stack engineer passionate about scalable systems and thoughtful design.</div>
    </div>
    <div class="preview-actions">
      <button class="preview-btn primary">View Profile</button>
      <button class="preview-btn secondary">Connect</button>
    </div>
  `;
  return preview;
}

// Handle mobile (touch devices)
function handleTouchStart(event) {
  const platform = event.target.dataset.platform;
  if (platform === 'linkedin') {
    showProfilePreview(event);
  }
}

function handleTouchEnd() {
  setTimeout(hideProfilePreview, 2000); // Hide after 2 seconds on mobile
}

// Clipboard functionality
function copyToClipboard(text) {
  // Create a temporary input element
  const tempInput = document.createElement('input');
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // For mobile devices
  
  try {
    document.execCommand('copy');
    showCopyFeedback();
  } catch (err) {
    console.error('Failed to copy: ', err);
  }
  
  document.body.removeChild(tempInput);
}

function showCopyFeedback() {
  // Create feedback element
  const feedback = document.createElement('div');
  feedback.className = 'copy-feedback';
  feedback.textContent = 'Copied to clipboard!';
  feedback.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--accent-color);
    color: var(--secondary-bg);
    padding: 12px 16px;
    border-radius: 6px;
    font-size: 14px;
    z-index: 10000;
    opacity: 0;
    transform: translateY(-10px);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(feedback);
  
  // Animate in
  setTimeout(() => {
    feedback.style.opacity = '1';
    feedback.style.transform = 'translateY(0)';
  }, 10);
  
  // Animate out and remove
  setTimeout(() => {
    feedback.style.opacity = '0';
    feedback.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      document.body.removeChild(feedback);
    }, 300);
  }, 2000);
}

// Contact Webview Window
function showContactWindow(contactId) {
  const contacts = {
    linkedin: {
      title: 'LinkedIn — davidchung',
      url: 'https://www.linkedin.com/in/david-chung-00b04a199/',
      type: 'badge' // render official LinkedIn badge
    },
    github: {
      title: 'GitHub — davidchung29',
      url: 'https://github.com/davidchung29',
      type: 'fallback' // cannot embed profile page
    }
  };

  const contact = contacts[contactId];
  if (!contact) return;

  const isOnMobileLayout = isMobile();

  // simple external-link icon svg
  const externalIcon = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M14 3h7v7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10 14L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M21 14v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  let content;
  if (contact.type === 'badge') {
    content = `
      <div class="project-window-content">
        <div class="webview-toolbar">
          <button class="webview-btn icon" aria-label="Open in new tab" title="Open in new tab" onclick="window.open('${contact.url}', '_blank')">${externalIcon}</button>
        </div>
        <div class="badge-container">
          <div id="linkedin-badge-mount"></div>
        </div>
      </div>
    `;
  } else if (contact.type === 'iframe') {
    content = `
      <div class="project-window-content">
        <div class="webview-toolbar">
          <button class="webview-btn icon" aria-label="Open in new tab" title="Open in new tab" onclick="window.open('${contact.url}', '_blank')">${externalIcon}</button>
        </div>
        <div class="webview-container">
          <iframe class="webview-frame" src="${contact.url}" title="${contact.title}" loading="lazy"></iframe>
        </div>
        <div class="webview-note">Some sites block embedding in windows. If this view doesn't load, use the button above.</div>
      </div>
    `;
  } else {
    content = `
      <div class="project-window-content">
        <div class="webview-toolbar">
          <button class="webview-btn icon" aria-label="Open in new tab" title="Open in new tab" onclick="window.open('${contact.url}', '_blank')">${externalIcon}</button>
        </div>
        <div class="webview-fallback">
          <div class="webview-fallback-icon">🌐</div>
          <div class="webview-fallback-title">${contact.title}</div>
          <div class="webview-fallback-desc">This site can't be displayed inside the window due to security policies. Use the button above to open it in a new tab.</div>
        </div>
      </div>
    `;
  }

  if (isOnMobileLayout) {
    showContactModal(contact.title, content);
    if (contact.type === 'badge') {
      setTimeout(() => renderLinkedInBadge('linkedin-badge-mount'), 0);
    }
  } else {
    const projectWindow = document.getElementById('project-window');
    const mainContainer = document.getElementById('main-container');
    document.getElementById('project-title').textContent = contact.title;
    document.getElementById('project-content').innerHTML = content;
    projectWindow.classList.add('active');
    mainContainer.classList.add('project-active');
    if (contact.type === 'badge') {
      setTimeout(() => renderLinkedInBadge('linkedin-badge-mount'), 0);
    }
  }
}

function loadLinkedInBadgeScript(onLoaded) {
  const existing = document.getElementById('linkedin-badge-script');
  if (existing) {
    if (typeof window.LIRenderAll === 'function') {
      onLoaded && onLoaded();
    } else {
      existing.addEventListener('load', () => onLoaded && onLoaded(), { once: true });
    }
    return;
  }
  const script = document.createElement('script');
  script.id = 'linkedin-badge-script';
  script.src = 'https://platform.linkedin.com/badges/js/profile.js';
  script.async = true;
  script.defer = true;
  script.type = 'text/javascript';
  script.addEventListener('load', () => onLoaded && onLoaded(), { once: true });
  document.head.appendChild(script);
}

function renderLinkedInBadge(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  // Clear previous content
  mount.innerHTML = '';

  const vanity = 'david-chung-00b04a199';
  const badge = document.createElement('div');
  badge.className = 'badge-base LI-profile-badge';
  badge.setAttribute('data-locale', 'en_US');
  badge.setAttribute('data-size', 'medium');
  badge.setAttribute('data-theme', 'light');
  badge.setAttribute('data-type', 'VERTICAL');
  badge.setAttribute('data-vanity', vanity);
  badge.setAttribute('data-version', 'v1');
  badge.innerHTML = `<a class="badge-base__link LI-simple-link" href="https://www.linkedin.com/in/${vanity}?trk=profile-badge">LinkedIn</a>`;
  mount.appendChild(badge);

  loadLinkedInBadgeScript(() => {
    if (typeof window.LIRenderAll === 'function') {
      try { window.LIRenderAll(); } catch (_) {}
    }
  });
}

// Theme Management System
class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.toggle = null;
    this.init();
  }

  init() {
    // Get saved theme or default to light
    this.currentTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    // Apply initial theme
    this.applyTheme(this.currentTheme);
    
    // Setup toggle
    this.setupToggle();
  }

  setupToggle() {
    this.toggle = document.getElementById('theme-toggle');
    if (!this.toggle) {
      console.warn('Theme toggle element not found');
      return;
    }

    console.log('Setting up theme toggle element:', this.toggle);

    this.toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Toggle clicked');
      this.toggleTheme();
    });

    // Add keyboard support
    this.toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.toggleTheme();
      }
    });

    // Make it focusable
    this.toggle.setAttribute('tabindex', '0');
    this.toggle.setAttribute('role', 'switch');
    this.toggle.setAttribute('aria-checked', this.currentTheme === 'dark');
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme(this.currentTheme);
    this.saveTheme();
    
    // Update accessibility
    if (this.toggle) {
      this.toggle.setAttribute('aria-checked', this.currentTheme === 'dark');
    }
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update toggle title
    if (this.toggle) {
      this.toggle.title = theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
    }
  }

  saveTheme() {
    localStorage.setItem('portfolio-theme', this.currentTheme);
  }

  getTheme() {
    return this.currentTheme;
  }
}

// Initialize theme manager
let themeManager;

// Initialize theme system
function initThemeSystem() {
  if (!themeManager) {
    themeManager = new ThemeManager();
    window.themeManager = themeManager;
    console.log('Theme system initialized:', themeManager);
  }
}

// Simple theme toggle function that works immediately
function toggleThemeSimple() {
  console.log('Simple toggle clicked!');
  
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  console.log('Switching from', currentTheme, 'to', newTheme);
  
  // Apply theme
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // Update toggle title
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.title = newTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  }
  
  // Save to localStorage
  localStorage.setItem('portfolio-theme', newTheme);
  
  console.log('Theme switched to:', newTheme);
}

// Initialize saved theme on page load
function initSavedTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  console.log('Loading saved theme:', savedTheme);
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    toggle.title = savedTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  }
}

// Make toggle function globally accessible
window.toggleThemeSimple = toggleThemeSimple;

// Initialize saved theme immediately
initSavedTheme();

// Initialize Mermaid when it's available
function initializeMermaid() {
  if (typeof mermaid !== 'undefined') {
    console.log('Initializing Mermaid...');
    mermaid.initialize({
      startOnLoad: false, // We'll render manually
      theme: 'default',
      flowchart: {
        useMaxWidth: false, // Allow diagrams to be their natural size
        htmlLabels: true
      },
      sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        actorMargin: 50,
        width: 150,
        height: 65,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        mirrorActors: true,
        bottomMarginAdj: 1,
        useMaxWidth: false // Allow full size in modal
      }
    });
    console.log('Mermaid initialized successfully');
    return true;
  } else {
    console.log('Mermaid not yet available, retrying...');
    return false;
  }
}

// Try to initialize Mermaid multiple times
let mermaidInitAttempts = 0;
function tryInitializeMermaid() {
  if (initializeMermaid()) {
    return;
  }
  
  mermaidInitAttempts++;
  if (mermaidInitAttempts < 10) {
    setTimeout(tryInitializeMermaid, 500);
  } else {
    console.error('Failed to initialize Mermaid after multiple attempts');
  }
}

// Start trying to initialize Mermaid
tryInitializeMermaid();

// Try to initialize theme system multiple ways to ensure it works
document.addEventListener('DOMContentLoaded', initThemeSystem);
window.addEventListener('load', initThemeSystem);

// Also initialize immediately if possible
if (document.readyState !== 'loading') {
  initThemeSystem();
}

// Diagram rendering functions
function renderDiagram(containerId, diagramDefinition, diagramId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container ${containerId} not found`);
    return;
  }
  
  if (typeof mermaid === 'undefined') {
    console.error('Mermaid is not available');
    container.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">Loading diagram...</div>';
    // Try again after a delay
    setTimeout(() => renderDiagram(containerId, diagramDefinition, diagramId), 1000);
    return;
  }
  
  try {
    console.log(`Rendering diagram ${diagramId} in container ${containerId}`);
    
    // Clear container first
    container.innerHTML = '';
    
    // Create a div for the diagram
    const diagramDiv = document.createElement('div');
    diagramDiv.className = 'mermaid';
    diagramDiv.textContent = diagramDefinition.trim();
    container.appendChild(diagramDiv);
    
    // Render the diagram
    mermaid.init(undefined, diagramDiv);
    
    console.log(`Successfully rendered diagram ${diagramId}`);
  } catch (error) {
    console.error('Error rendering diagram:', error);
    container.innerHTML = `
      <div style="padding: 20px; text-align: center; color: var(--text-secondary);">
        <p>Diagram could not be rendered</p>
        <small>Check console for details</small>
      </div>
    `;
  }
}

function switchDiagram(projectId, diagramType) {
  const diagrams = getProjectDiagrams(projectId);
  const diagram = diagrams[diagramType];
  if (!diagram) return;
  
  const containerId = `diagram-${projectId}`;
  const diagramId = `${projectId}-${diagramType}-${Date.now()}`;
  
  // Update active button
  const buttons = document.querySelectorAll(`#diagram-controls-${projectId} .diagram-btn`);
  buttons.forEach(btn => btn.classList.remove('active'));
  document.querySelector(`#diagram-controls-${projectId} .diagram-btn[data-type="${diagramType}"]`)?.classList.add('active');
  
  // Render diagram
  renderDiagram(containerId, diagram.definition, diagramId);
}

function getProjectDiagrams(projectId) {
  const diagrams = {
    mockly: {
      architecture: {
        name: 'System Architecture',
        definition: `
          graph TB
            subgraph "Frontend (Railway)"
              UI[React 18.2.0 UI]
              CV[Computer Vision<br/>TensorFlow.js + MediaPipe]
              Audio[Web Speech API<br/>Pitch Analysis]
              Stream[WebRTC Media<br/>Processing]
            end
            
            subgraph "Backend (Railway)"
              API[FastAPI Server]
              Auth[OAuth2 + JWT<br/>Google/LinkedIn]
              Scoring[STAR Method<br/>Analysis Engine]
            end
            
            subgraph "External Services"
              LLM[OpenRouter API<br/>Mistral AI Models]
              Analytics[PostHog<br/>User Analytics]
            end
            
            subgraph "Database"
              DB[(PostgreSQL<br/>User Data & Progress)]
            end
            
            UI --> API
            CV --> Scoring
            Audio --> Scoring
            Stream --> CV
            Stream --> Audio
            API --> Auth
            API --> DB
            Scoring --> LLM
            Scoring --> DB
            UI --> Analytics
            
            style UI fill:#e1f5fe
            style API fill:#f3e5f5
            style LLM fill:#fff3e0
            style DB fill:#e8f5e8
            style Analytics fill:#f1f8e9
        `
      },
      dataflow: {
        name: 'Interview Session Flow',
        definition: `
          sequenceDiagram
            participant User
            participant Frontend as React Frontend
            participant CV as Computer Vision
            participant Backend as FastAPI Backend
            participant AI as OpenRouter/Mistral
            participant DB as PostgreSQL
            participant Analytics as PostHog
            
            User->>Frontend: Start Interview Session
            Frontend->>CV: Initialize Media Streams
            CV->>Frontend: Camera/Mic Permissions
            Frontend->>Analytics: Track Session Start
            
            loop During Interview
                CV->>CV: Eye Tracking (TensorFlow.js)
                CV->>CV: Hand Gestures (MediaPipe)
                CV->>CV: Voice Analysis (Web Speech)
                CV->>Frontend: Real-time Metrics
            end
            
            User->>Frontend: Complete Response
            Frontend->>Backend: Submit Session Data
            Backend->>AI: STAR Method Analysis
            AI->>Backend: Evaluation Results
            Backend->>DB: Save Progress & Scores
            Backend->>Frontend: Comprehensive Report
            Frontend->>Analytics: Track Session Complete
            Frontend->>User: Display Feedback
        `
      },
      deployment: {
        name: 'Deployment Architecture',
        definition: `
          graph TB
            subgraph "Railway Platform"
              subgraph "Frontend Service"
                React[React App<br/>Static Build]
                CDN[Railway CDN<br/>Global Distribution]
              end
              
              subgraph "Backend Service"
                FastAPI[FastAPI Server<br/>Python 3.11+]
                Workers[Uvicorn Workers<br/>Async Processing]
              end
            end
            
            subgraph "External Services"
              PG[(PostgreSQL<br/>Managed Database)]
              OpenRouter[OpenRouter API<br/>Mistral AI Access]
              PostHog[PostHog Analytics<br/>Event Tracking]
              OAuth[OAuth Providers<br/>Google + LinkedIn]
            end
            
            subgraph "Client"
              Browser[Web Browser<br/>Chrome/Safari/Firefox]
              Mobile[Mobile Browser<br/>iOS/Android]
            end
            
            Browser --> CDN
            Mobile --> CDN
            CDN --> React
            React --> FastAPI
            FastAPI --> Workers
            Workers --> PG
            Workers --> OpenRouter
            React --> PostHog
            React --> OAuth
            
            style React fill:#61dafb
            style FastAPI fill:#009688
            style PG fill:#336791
            style OpenRouter fill:#ff6b35
            style PostHog fill:#1d4ed8
        `
      }
    },
    matrix: {
      architecture: {
        name: 'System Architecture',
        definition: `
          graph TB
            subgraph "Data Sources"
              S1[Source System 1]
              S2[Source System 2]
              S3[Source System N]
            end
            
            subgraph "Ingestion Layer"
              Pipeline[Zero-ETL Pipeline<br/>AWS Lambda]
              Transform[Data Transform<br/>Real-time Processing]
            end
            
            subgraph "Storage & Search"
              OS[OpenSearch Cluster<br/>Multi-Region]
              Index[Index Management<br/>20M+ Documents]
            end
            
            subgraph "Security Layer"
              Cognito[AWS Cognito<br/>User Pool]
              ALB[Application Load Balancer<br/>OIDC Federation]
              Nginx[Nginx Proxy<br/>SSL/TLS]
            end
            
            subgraph "Application Layer"
              Dashboard[OpenSearch Dashboard<br/>NLP Queries]
              API[REST API<br/>Data Access]
              Export[S3 Export<br/>Data Downloads]
            end
            
            S1 --> Pipeline
            S2 --> Pipeline
            S3 --> Pipeline
            Pipeline --> Transform
            Transform --> OS
            OS --> Index
            
            Cognito --> ALB
            ALB --> Nginx
            Nginx --> Dashboard
            Nginx --> API
            
            Dashboard --> OS
            API --> OS
            API --> Export
            
            style Pipeline fill:#fff3e0
            style OS fill:#e8f5e8
            style Cognito fill:#f3e5f5
            style Dashboard fill:#e1f5fe
        `
      },
      deployment: {
        name: 'Deployment Architecture',
        definition: `
          graph TB
            subgraph "Region 1 - US East"
              OSE1[OpenSearch Cluster]
              ALBE1[Application Load Balancer]
              NginxE1[Nginx Proxy]
            end
            
            subgraph "Region 2 - EU West"
              OSW1[OpenSearch Cluster]
              ALBW1[Application Load Balancer]
              NginxW1[Nginx Proxy]
            end
            
            subgraph "Region 3 - Asia Pacific"
              OSA1[OpenSearch Cluster]
              ALBA1[Application Load Balancer]
              NginxA1[Nginx Proxy]
            end
            
            subgraph "Global Services"
              Route53[Route 53<br/>DNS & Failover]
              Cognito[AWS Cognito<br/>Global User Pool]
              S3[S3 Cross-Region<br/>Replication]
            end
            
            Route53 --> ALBE1
            Route53 --> ALBW1
            Route53 --> ALBA1
            
            ALBE1 --> NginxE1
            ALBW1 --> NginxW1
            ALBA1 --> NginxA1
            
            NginxE1 --> OSE1
            NginxW1 --> OSW1
            NginxA1 --> OSA1
            
            Cognito --> ALBE1
            Cognito --> ALBW1
            Cognito --> ALBA1
            
            OSE1 -.-> OSW1
            OSW1 -.-> OSA1
            OSA1 -.-> OSE1
            
            style Route53 fill:#fff3e0
            style Cognito fill:#f3e5f5
            style S3 fill:#e8f5e8
        `
      }
    },
    myeyes: {
      architecture: {
        name: 'System Architecture',
        definition: `
          graph TB
            subgraph "iOS App Layer"
              UI[SwiftUI Interface]
              Camera[Camera Manager<br/>AVFoundation]
              Lidar[LiDAR Scanner<br/>ARKit]
              Audio[Audio Feedback<br/>AVAudioEngine]
            end
            
            subgraph "Computer Vision Pipeline"
              Frame[Frame Processing<br/>Real-time]
              YOLO[YOLOv8<br/>Object Detection]
              OpenCV[OpenCV<br/>Image Processing]
              Depth[Depth Analysis<br/>LiDAR + CV]
            end
            
            subgraph "Safety & Alert System"
              Collision[Collision Detection<br/>Predictive Algorithm]
              Priority[Priority Queue<br/>Threat Assessment]
              Haptic[Haptic Feedback<br/>UIFeedbackGenerator]
              Speech[Speech Synthesis<br/>AVSpeechSynthesizer]
            end
            
            subgraph "Performance Layer"
              Threading[Multi-threading<br/>GCD & Operations]
              Memory[Memory Management<br/>ARC Optimization]
              Battery[Battery Optimization<br/>Background Processing]
            end
            
            Camera --> Frame
            Lidar --> Frame
            Frame --> YOLO
            Frame --> OpenCV
            YOLO --> Depth
            OpenCV --> Depth
            
            Depth --> Collision
            Collision --> Priority
            Priority --> Haptic
            Priority --> Speech
            Priority --> Audio
            
            UI --> Threading
            Frame --> Threading
            Collision --> Threading
            
            Threading --> Memory
            Threading --> Battery
            
            style Camera fill:#e3f2fd
            style YOLO fill:#fff8e1
            style Collision fill:#ffebee
            style Threading fill:#f3e5f5
        `
      },
      processing: {
        name: 'Real-time Processing',
        definition: `
          sequenceDiagram
            participant Camera
            participant LiDAR
            participant CV as Computer Vision
            participant AI as AI Processing
            participant Alert as Alert System
            participant User
            
            loop Every Frame (30 FPS)
                Camera->>CV: Video Frame
                LiDAR->>CV: Depth Data
                CV->>CV: Object Detection
                CV->>AI: Detected Objects + Depth
                AI->>AI: Collision Prediction
                AI->>Alert: Threat Assessment
                
                alt High Priority Threat
                    Alert->>User: Immediate Haptic + Audio
                else Medium Priority
                    Alert->>User: Audio Warning
                else Low Priority
                    Alert->>User: Subtle Notification
                end
            end
        `
      }
    },
    gomokuai: {
      architecture: {
        name: 'Game Architecture',
        definition: `
          graph TB
            subgraph "Game Interface"
              UI[CMU Graphics UI<br/>Game Board Display]
              Input[Mouse Input<br/>Click Handler]
              Render[Board Renderer<br/>Visual Updates]
            end
            
            subgraph "Game Logic"
              Board[Board State<br/>15x15 Grid]
              Rules[Game Rules<br/>Win Condition Check]
              Turn[Turn Manager<br/>Player/AI Switch]
            end
            
            subgraph "AI Engine"
              Eval[Board Evaluator<br/>Position Scoring]
              Search[Graph Search<br/>Alpha-Beta Pruning]
              Memo[Memoization<br/>Position Cache]
            end
            
            subgraph "Game Modes"
              PvP[Player vs Player]
              PvAI[Player vs AI]
              Flip[Flip Mode<br/>Column Reversal]
            end
            
            Input --> Turn
            Turn --> Board
            Board --> Rules
            Rules --> UI
            UI --> Render
            
            Turn --> Eval
            Eval --> Search
            Search --> Memo
            Memo --> Board
            
            Turn --> PvP
            Turn --> PvAI
            Turn --> Flip
            
            style UI fill:#e3f2fd
            style Search fill:#fff8e1
            style Rules fill:#e8f5e8
            style Flip fill:#f3e5f5
        `
      },
      algorithm: {
        name: 'AI Algorithm',
        definition: `
          graph TD
            Start[AI Turn Start]
            
            subgraph "Position Evaluation"
              Scan[Scan All Empty Positions]
              Score[Calculate Position Score]
              Pattern[Pattern Recognition<br/>Threats & Opportunities]
            end
            
            subgraph "Search Algorithm"
              Minimax[Minimax with<br/>Alpha-Beta Pruning]
              Depth[Search Depth: 4-6<br/>Based on Game State]
              Cache[Check Memoization<br/>Cache]
            end
            
            subgraph "Decision Making"
              Best[Select Best Move]
              Validate[Validate Move<br/>Legal & Optimal]
                Place[Place Stone]
            end
            
            Start --> Scan
            Scan --> Score
            Score --> Pattern
            Pattern --> Cache
            
            Cache --> Minimax
            Minimax --> Depth
            Depth --> Best
            Best --> Validate
            Validate --> Place
            
            Cache -.-> Best
            
            style Start fill:#e3f2fd
            style Minimax fill:#fff8e1
            style Best fill:#e8f5e8
            style Place fill:#f3e5f5
        `
      }
    }
  };
  
  return diagrams[projectId] || {};
}

// Make diagram functions globally accessible
window.renderDiagram = renderDiagram;
window.switchDiagram = switchDiagram;
window.getProjectDiagrams = getProjectDiagrams;
window.showDiagramModal = showDiagramModal;
window.switchModalDiagram = switchModalDiagram;
window.closeDiagramModal = closeDiagramModal;
window.addDiagramClickHandlers = addDiagramClickHandlers;

// Mockly iframe handling functions
function handleMocklyIframeLoad(type) {
  console.log(`Mockly iframe loaded successfully (${type})`);
  // Iframe loaded successfully, no action needed
}

function handleMocklyIframeError(type) {
  console.log(`Mockly iframe failed to load (${type}), showing fallback`);
  showMocklyFallback(type);
}

function showMocklyFallback(type) {
  const containerId = type === 'desktop' ? 'mockly-preview-content-desktop' : 'mockly-preview-content-modal';
  const container = document.getElementById(containerId);
  
  if (container) {
    container.innerHTML = `
      <div class="mockly-preview-fallback">
        <div class="mockly-preview-logo">Mockly</div>
        <div class="mockly-preview-tagline">LeetCode for Behavioral Interviews</div>
        <div class="mockly-preview-subtitle">Practice with AI-powered feedback</div>
        <div class="mockly-preview-cta">Click to Visit Site →</div>
      </div>
    `;
  }
}

// Check if iframe fails to load after a timeout
function checkMocklyIframeLoad() {
  setTimeout(() => {
    const desktopIframe = document.querySelector('#mockly-preview-content-desktop iframe');
    const modalIframe = document.querySelector('#mockly-preview-content-modal iframe');
    
    if (desktopIframe) {
      try {
        // Try to access iframe content to check if it loaded
        if (!desktopIframe.contentDocument && !desktopIframe.contentWindow) {
          handleMocklyIframeError('desktop');
        }
      } catch (e) {
        // Cross-origin restrictions mean it might be loading correctly
        console.log('Mockly iframe may be loading (cross-origin restrictions)');
      }
    }
    
    if (modalIframe) {
      try {
        if (!modalIframe.contentDocument && !modalIframe.contentWindow) {
          handleMocklyIframeError('modal');
        }
      } catch (e) {
        console.log('Mockly iframe may be loading (cross-origin restrictions)');
      }
    }
  }, 5000); // Check after 5 seconds
}

// Make functions globally accessible
window.handleMocklyIframeLoad = handleMocklyIframeLoad;
window.handleMocklyIframeError = handleMocklyIframeError;
window.showMocklyFallback = showMocklyFallback;

// Diagram Modal Functions
function showDiagramModal(projectId, diagramType) {
  const diagrams = getProjectDiagrams(projectId);
  const diagram = diagrams[diagramType];
  
  if (!diagram) {
    console.error(`Diagram not found: ${projectId} - ${diagramType}`);
    return;
  }
  
  // Set modal title
  const modalTitle = document.getElementById('diagram-modal-title');
  modalTitle.textContent = `${projectId.charAt(0).toUpperCase() + projectId.slice(1)} - ${diagram.name}`;
  
  // Clear and render diagram in modal
  const modalDiagram = document.getElementById('diagram-modal-diagram');
  modalDiagram.innerHTML = '';
  
  // Render diagram with unique ID for modal
  const modalDiagramId = `modal-diagram-${projectId}-${diagramType}-${Date.now()}`;
  renderDiagram('diagram-modal-diagram', diagram.definition, modalDiagramId);
  
  // Create controls for switching diagrams
  const modalControls = document.getElementById('diagram-modal-controls');
  modalControls.innerHTML = '';
  
  Object.keys(diagrams).forEach(type => {
    const button = document.createElement('button');
    button.className = `diagram-btn ${type === diagramType ? 'active' : ''}`;
    button.textContent = diagrams[type].name;
    button.onclick = () => switchModalDiagram(projectId, type);
    modalControls.appendChild(button);
  });
  
  // Show modal
  const modal = document.getElementById('diagram-modal');
  modal.classList.add('active');
  
  // Prevent body scrolling
  document.body.style.overflow = 'hidden';
}

function switchModalDiagram(projectId, diagramType) {
  const diagrams = getProjectDiagrams(projectId);
  const diagram = diagrams[diagramType];
  
  if (!diagram) return;
  
  // Update title
  const modalTitle = document.getElementById('diagram-modal-title');
  modalTitle.textContent = `${projectId.charAt(0).toUpperCase() + projectId.slice(1)} - ${diagram.name}`;
  
  // Re-render diagram
  const modalDiagramId = `modal-diagram-${projectId}-${diagramType}-${Date.now()}`;
  renderDiagram('diagram-modal-diagram', diagram.definition, modalDiagramId);
  
  // Update active button
  const buttons = document.querySelectorAll('#diagram-modal-controls .diagram-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function closeDiagramModal(event) {
  if (event && event.target !== document.getElementById('diagram-modal')) return;
  
  const modal = document.getElementById('diagram-modal');
  modal.classList.remove('active');
  
  // Restore body scrolling
  document.body.style.overflow = '';
}

// Add click handlers to diagram containers
function addDiagramClickHandlers() {
  // Add click handlers after diagrams are rendered
  setTimeout(() => {
    const containers = document.querySelectorAll('.diagram-container');
    containers.forEach(container => {
      // Remove existing click handlers
      container.onclick = null;
      
      // Add new click handler
      container.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Extract project ID from container ID
        const containerId = container.id;
        const projectId = containerId.replace('diagram-', '');
        
        // Get current active diagram type
        const controlsId = `diagram-controls-${projectId}`;
        const activeButton = document.querySelector(`#${controlsId} .diagram-btn.active`);
        const diagramType = activeButton ? activeButton.dataset.type : 'architecture';
        
        showDiagramModal(projectId, diagramType);
      };
    });
  }, 100);
}

// Debug function to test diagram rendering
window.testDiagram = function() {
  console.log('Testing diagram rendering...');
  console.log('Mermaid available:', typeof mermaid !== 'undefined');
  
  if (typeof mermaid !== 'undefined') {
    const testContainer = document.createElement('div');
    testContainer.id = 'test-diagram';
    testContainer.style.cssText = 'position: fixed; top: 10px; left: 10px; width: 300px; height: 200px; background: white; border: 1px solid black; z-index: 10000;';
    document.body.appendChild(testContainer);
    
    const simpleDefinition = `
      graph TD
        A[Start] --> B[End]
        style A fill:#f9f
        style B fill:#bbf
    `;
    
    renderDiagram('test-diagram', simpleDefinition, 'test-diagram-id');
    
    setTimeout(() => {
      if (confirm('Remove test diagram?')) {
        document.body.removeChild(testContainer);
      }
    }, 3000);
  } else {
    alert('Mermaid is not available');
  }
};
  