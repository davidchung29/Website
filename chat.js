// Chat Terminal with Tool Calls

// Data structure for David's information
const davidData = {
  bio: "Hey, I'm David. I want to make impact by developing products using new technology. At Carnegie Mellon, I'm studying information systems and computer science, learning to translate between human intention and machine execution. My work spans scalable infrastructure at Amazon, AI systems at ValueMate (YC W25), LLM research at CMU Teel Labs, and hackathon wins at Cal Hacks, HackCMU, and HackHarvard. I'm using AI to bridge human needs with technological solutions—transforming healthcare, accessibility, and how we interact with everyday systems.",
  
  experience: [
    {
      org: "Amazon",
      role: "Software Development Engineer Intern",
      desc: "Built scalable backend systems for digital payments team."
    },
    {
      org: "ValueMate (YC)",
      role: "AI/ML Software Engineer Intern",
      desc: "Developing AI agents and infrastructure for real-estate appraisors."
    },
    {
      org: "CMU ACE-AI/TEEL Labs",
      role: "LLM Research Assistant",
      desc: "Exploring the boundaries of LLM in practical applications. Funded by Accenture"
    }
  ],
  
  projects: [
    {
      name: "Haven",
      role: "AI Lead",
      hackathon: "CalHacks 2025",
      wins: "Winner of Y Combinator (1st), Fetch.ai (1st), and LiveKit Best Startup",
      desc: "Multi-agent system for patient anomaly detection.",
      stats: "1/700+ teams"
    },
    {
      name: "Medicly",
      role: "Full Stack Lead",
      hackathon: "HackCMU 2025",
      wins: "Grand Prize Winner",
      desc: "Converts smartphone video into clinician-ready findings.",
      stats: "1/250+ teams"
    },
    {
      name: "Yumi",
      role: "iOS + AI Lead",
      hackathon: "HackHarvard 2025",
      wins: "3rd Place",
      desc: "Social network for food utilizing AI agents.",
      stats: "3/180+ teams"
    }
  ],
  
  contact: {
    resume: "David Chung.pdf",
    // Add other contact info as needed
  }
};

// Tool functions
const tools = {
  get_projects: () => {
    return davidData.projects.map(p => ({
      name: p.name,
      role: p.role,
      hackathon: p.hackathon,
      wins: p.wins,
      desc: p.desc,
      stats: p.stats
    }));
  },
  
  get_project_details: (projectName) => {
    const project = davidData.projects.find(
      p => p.name.toLowerCase() === projectName.toLowerCase()
    );
    return project || null;
  },
  
  search_projects: (keyword) => {
    const lowerKeyword = keyword.toLowerCase();
    return davidData.projects.filter(p => 
      p.name.toLowerCase().includes(lowerKeyword) ||
      p.desc.toLowerCase().includes(lowerKeyword) ||
      p.role.toLowerCase().includes(lowerKeyword) ||
      p.hackathon.toLowerCase().includes(lowerKeyword)
    );
  },
  
  get_project_by_hackathon: (hackathonName) => {
    const lowerName = hackathonName.toLowerCase();
    return davidData.projects.filter(p => 
      p.hackathon.toLowerCase().includes(lowerName)
    );
  },
  
  get_experience: () => {
    return davidData.experience;
  },
  
  get_contact_info: () => {
    return davidData.contact;
  },
  
  get_resume: () => {
    return davidData.contact.resume;
  },
  
  get_timeline: () => {
    // Combine projects and experience in chronological order
    const timeline = [];
    davidData.experience.forEach(exp => {
      timeline.push({ type: 'experience', ...exp });
    });
    davidData.projects.forEach(proj => {
      timeline.push({ type: 'project', ...proj });
    });
    return timeline;
  }
};

// Detect if query needs tool call
function needsToolCall(query) {
  const lowerQuery = query.toLowerCase();
  
  // Tool call patterns
  const toolPatterns = {
    'get_projects': /\b(show|list|get|fetch|display|what are|tell me about)\s+(your|david'?s|the)\s+(projects|project)/i,
    'get_project_details': /\b(tell me|more|details|about|describe)\s+(about\s+)?(haven|medicly|yumi)/i,
    'search_projects': /\b(show|find|search|filter)\s+(projects|project).*?(healthcare|ai|ios|mobile|full.?stack)/i,
    'get_project_by_hackathon': /\b(what|which|show|tell).*?(calhacks|hackcmu|hackharvard)/i,
    'get_experience': /\b(show|list|get|tell me about)\s+(your|david'?s|the)\s+(experience|work|jobs|companies)/i,
    'get_contact_info': /\b(contact|reach|email|linkedin|how to contact|contact info)/i,
    'get_resume': /\b(resume|cv|send|download|get|share)\s+(your|david'?s|the)\s*(resume|cv)?/i,
    'get_timeline': /\b(timeline|chronological|history|show me your history)/i
  };
  
  for (const [tool, pattern] of Object.entries(toolPatterns)) {
    if (pattern.test(query)) {
      return tool;
    }
  }
  
  return null;
}

// Extract parameters from query
function extractParams(query, tool) {
  const lowerQuery = query.toLowerCase();
  
  if (tool === 'get_project_details') {
    const projects = ['haven', 'medicly', 'yumi'];
    for (const proj of projects) {
      if (lowerQuery.includes(proj)) {
        return proj;
      }
    }
  }
  
  if (tool === 'search_projects') {
    const keywords = ['healthcare', 'ai', 'ios', 'mobile', 'full stack', 'fullstack'];
    for (const keyword of keywords) {
      if (lowerQuery.includes(keyword)) {
        return keyword;
      }
    }
  }
  
  if (tool === 'get_project_by_hackathon') {
    const hackathons = ['calhacks', 'hackcmu', 'hackharvard'];
    for (const hack of hackathons) {
      if (lowerQuery.includes(hack)) {
        return hack;
      }
    }
  }
  
  return null;
}

// Format tool result for display
function formatToolResult(tool, result) {
  if (!result || (Array.isArray(result) && result.length === 0)) {
    return "No results found.";
  }
  
  let output = "";
  
  switch(tool) {
    case 'get_projects':
      result.forEach((p, i) => {
        output += `→ ${p.name}\n`;
        output += `  ${p.role} — ${p.wins} at ${p.hackathon}\n`;
        output += `  ${p.desc} (${p.stats})\n\n`;
      });
      break;
      
    case 'get_project_details':
      const p = result;
      output += `${p.name}\n`;
      output += `Role: ${p.role}\n`;
      output += `Hackathon: ${p.hackathon}\n`;
      output += `Achievement: ${p.wins}\n`;
      output += `Description: ${p.desc}\n`;
      output += `Stats: ${p.stats}`;
      break;
      
    case 'search_projects':
    case 'get_project_by_hackathon':
      result.forEach((p, i) => {
        output += `→ ${p.name} — ${p.desc}\n`;
      });
      break;
      
    case 'get_experience':
      result.forEach((exp, i) => {
        output += `→ ${exp.org}\n`;
        output += `  ${exp.role}\n`;
        output += `  ${exp.desc}\n\n`;
      });
      break;
      
    case 'get_contact_info':
      output += `Resume: ${result.resume}\n`;
      output += `You can download David's resume using the link on the main page.`;
      break;
      
    case 'get_resume':
      output += `Resume available: ${result}\n`;
      output += `You can download it from the main page footer.`;
      break;
      
    case 'get_timeline':
      result.forEach((item, i) => {
        if (item.type === 'experience') {
          output += `→ ${item.org} — ${item.role}\n`;
        } else {
          output += `→ ${item.name} — ${item.hackathon}\n`;
        }
      });
      break;
  }
  
  return output.trim();
}

// Generate conversational response (for non-tool queries)
function generateConversationalResponse(query) {
  const lowerQuery = query.toLowerCase();
  
  // Extract key topics
  const aiKeywords = ['ai', 'artificial intelligence', 'machine learning', 'llm', 'ml'];
  const hackathonKeywords = ['hackathon', 'hack', 'win', 'won', 'calhacks', 'hackcmu', 'hackharvard'];
  const experienceKeywords = ['experience', 'work', 'job', 'company', 'intern', 'internship'];
  const projectKeywords = ['project', 'built', 'created', 'made'];
  const healthcareKeywords = ['healthcare', 'health', 'medical', 'patient'];
  
  let response = "";
  
  // AI-related questions
  if (aiKeywords.some(k => lowerQuery.includes(k))) {
    response = "David has extensive AI experience. He's currently an AI/ML Software Engineer Intern at ValueMate (YC W25), developing AI agents and infrastructure. He's also an LLM Research Assistant at CMU ACE-AI/TEEL Labs, exploring LLMs in practical applications. His projects include Haven (multi-agent system), Medicly (AI-powered physical therapy analysis), and Yumi (social network with AI agents).";
  }
  // Hackathon questions
  else if (hackathonKeywords.some(k => lowerQuery.includes(k))) {
    response = "David has won multiple hackathons:\n\n→ CalHacks 2025 — Haven won Y Combinator (1st), Fetch.ai (1st), and LiveKit Best Startup\n→ HackCMU 2025 — Medicly won Grand Prize (1/250+ teams)\n→ HackHarvard 2025 — Yumi won 3rd Place (3/180+ teams)";
  }
  // Experience questions
  else if (experienceKeywords.some(k => lowerQuery.includes(k))) {
    response = "David has worked at:\n\n→ Amazon — Software Development Engineer Intern, building scalable backend systems\n→ ValueMate (YC) — AI/ML Software Engineer Intern, developing AI agents\n→ CMU ACE-AI/TEEL Labs — LLM Research Assistant, exploring practical LLM applications";
  }
  // Project questions
  else if (projectKeywords.some(k => lowerQuery.includes(k))) {
    response = "David has built several notable projects:\n\n→ Haven — Multi-agent system for patient anomaly detection (CalHacks winner)\n→ Medicly — Converts smartphone video into clinician-ready findings (HackCMU Grand Prize)\n→ Yumi — Social network for food utilizing AI agents (HackHarvard 3rd Place)";
  }
  // Healthcare questions
  else if (healthcareKeywords.some(k => lowerQuery.includes(k))) {
    response = "David has worked on healthcare projects:\n\n→ Haven — Multi-agent system for patient anomaly detection\n→ Medicly — Converts smartphone video into clinician-ready findings with 3D mesh visualization";
  }
  // General/about questions
  else if (lowerQuery.includes('who') || lowerQuery.includes('about') || lowerQuery.includes('tell me')) {
    response = davidData.bio;
  }
  // Default
  else {
    response = "I can help you learn about David's experience, projects, hackathon wins, and more. Try asking about his AI experience, projects, or work history!";
  }
  
  return response;
}

// Initialize chat
function initChat() {
  const chatOutput = document.getElementById('chatOutput');
  const chatInput = document.getElementById('chatInput');
  const fab = document.getElementById('fab');
  const overlay = document.getElementById('liquidOverlay');
  const chatClose = document.getElementById('chatClose');
  const chatTerminal = document.getElementById('chatTerminal');
  
  // Prevent clicks on chat terminal from closing overlay
  if (chatTerminal) {
    chatTerminal.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
  
  // Show welcome message
  function showWelcome() {
    chatOutput.innerHTML = `
      <div class="chat-message ai">
        <div class="message-content welcome-message">
hey, i'm david's ai assistant!

ask me anything about david — his experience, projects, hackathon wins, or anything else.
        </div>
      </div>
    `;
  }
  
  // Add typing indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message ai';
    typingDiv.innerHTML = '<div class="typing-indicator"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
    chatOutput.appendChild(typingDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
    return typingDiv;
  }
  
  // Remove typing indicator
  function removeTyping(typingDiv) {
    if (typingDiv && typingDiv.parentNode) {
      typingDiv.remove();
    }
  }
  
  // Add user message
  function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user';
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatOutput.appendChild(messageDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }
  
  // Add AI message
  function addAIMessage(text, toolCall = null, toolResult = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ai';
    
    let content = '';
    
    if (toolCall) {
      content += `<div class="tool-call">[Tool: ${toolCall}]</div>`;
    }
    
    if (toolResult) {
      content += `<div class="tool-result">${toolResult}</div>`;
    }
    
    if (text) {
      content += `<div class="message-content">${text}</div>`;
    }
    
    messageDiv.innerHTML = content;
    chatOutput.appendChild(messageDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }
  
  // Handle user input
  function handleInput() {
    const query = chatInput.value.trim();
    if (!query) return;
    
    // Add user message
    addUserMessage(query);
    chatInput.value = '';
    
    // Show typing indicator
    const typingDiv = showTyping();
    
    // Simulate thinking delay
    setTimeout(() => {
      removeTyping(typingDiv);
      
      // Check if tool call is needed
      const tool = needsToolCall(query);
      
      if (tool) {
        const params = extractParams(query, tool);
        let result;
        
        if (params) {
          result = tools[tool](params);
        } else {
          result = tools[tool]();
        }
        
        const formattedResult = formatToolResult(tool, result);
        addAIMessage(null, tool, formattedResult);
      } else {
        // Conversational response
        const response = generateConversationalResponse(query);
        addAIMessage(response);
      }
    }, 500);
  }
  
  // Event listeners
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInput();
    }
  });
  
  // Close chat
  function closeChat() {
    overlay.classList.remove('active');
    fab.classList.remove('active');
  }
  
  chatClose.addEventListener('click', closeChat);
  
  // Focus input when overlay opens
  fab.addEventListener('click', () => {
    if (!overlay.classList.contains('active')) {
      setTimeout(() => {
        chatInput.focus();
      }, 400);
    }
  });
  
  // Show welcome message on first open
  let isFirstOpen = true;
  overlay.addEventListener('transitionend', () => {
    if (overlay.classList.contains('active') && isFirstOpen) {
      showWelcome();
      isFirstOpen = false;
    }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initChat);

