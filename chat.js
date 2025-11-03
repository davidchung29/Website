// Chat Terminal with Tool Calls

// Data structure for David's information
const davidData = {
  bio: "Hey, I'm David. I want to make impact by developing products using new technology. At Carnegie Mellon, I'm studying information systems and computer science, learning to translate between human intention and machine execution. My work spans scalable infrastructure at Amazon, AI systems at ValueMate (YC W25), LLM research at CMU Teel Labs, and hackathon wins at Cal Hacks, HackCMU, and HackHarvard. I'm using AI to bridge human needs with technological solutions—transforming healthcare, accessibility, and how we interact with everyday systems.",
  
  education: {
    school: "Carnegie Mellon University",
    degree: "B.S. in Information Systems and Computer Science",
    location: "Pittsburgh, PA",
    graduation: "May 2027"
  },
  
  experience: [
    {
      org: "Amazon",
      orgLink: "https://www.amazon.com/",
      role: "Software Engineer Intern",
      location: "Seattle, WA",
      startDate: "May 2025",
      endDate: "Aug 2025",
      period: "May 2025 -- Aug 2025",
      desc: "Built scalable backend systems for digital payments team.",
      details: [
        "Deployed a scalable OpenSearch data warehouse indexing 2B+ payment documents across 3 global regions",
        "Integrated SQL, DSL, and NLP queries, reduced customer-impacting resolution time from 4 days to 10 minutes",
        "Implemented 12 zero-ETL ingestion pipelines enabling real-time ingestion of Apple Pay and Google Pay data"
      ]
    },
    {
      org: "ValueMate (YC X25)",
      orgLink: "https://valuemate.ai/",
      role: "AI Software Engineer Intern",
      location: "Pittsburgh, PA",
      startDate: "Sep 2025",
      endDate: "Dec 2025",
      period: "Sep 2025 -- Dec 2025",
      desc: "Developing AI agents and infrastructure for real-estate appraisors.",
      details: [
        "Developed iOS app reducing appraisal turnarounds by 80%, enabling appraisers to complete 5X more appraisals",
        "Shipped core iOS floor plan editor with Swift, built smart PDF editor with AI and BAML integrations",
        "Served 4 leading firms as 5-person team, raised $2M seed round"
      ]
    },
    {
      org: "Carnegie Mellon University TEEL Labs",
      orgLink: "https://www.cmu.edu/teel/projects/ace-ai.html",
      role: "LLM Research Assistant",
      location: "Pittsburgh, PA",
      startDate: "Sep 2025",
      endDate: "Dec 2025",
      period: "Sep 2025 -- Dec 2025",
      desc: "Exploring the boundaries of LLM in practical applications. Funded by Accenture",
      details: [
        "Research funded by CMU Accenture Center of Excellence for AI",
        "Engineered multi-stage LLM orchestration pipeline with vector embeddings and RAG for automated evaluation",
        "Deployed system analyzing 5,000+ student submissions for learning objective alignment and mastery prediction"
      ]
    }
  ],
  
  projects: [
    {
      name: "Haven",
      link: "https://devpost.com/software/haven-536r1q",
      role: "AI Lead",
      date: "Oct 2025",
      hackathon: "CalHacks 2025",
      hackathonLink: "https://www.calhacks.io/",
      wins: "Winner of Y Combinator (1st), Fetch.ai (1st), and LiveKit Best Startup",
      stats: "1/700+ teams",
      desc: "Multi-agent system for patient anomaly detection.",
      tech: ["Claude API", "LiveKit", "OpenAI Whisper", "Next.js", "FastAPI", "Supabase"],
      details: [
        "Won Y Combinator (1st), Fetch.ai (1st), and LiveKit Best Startup against 3000+ competitors at CalHacks 2025",
        "Multi-agent system using CV and vital monitoring to detect patient anomalies and show alerts on 3D hospital map",
        "Built FPPG pipeline with OpenCV for heart rate extraction, feeding real-time streams to Fetch.ai agent network coordinating with Claude chain-tool-calling for 3D map updates"
      ],
      fullDescription: "Hospital command center powered by context-aware agentic AI that alerts nurses, unifies EHR data, and answers patient questions, improving understanding and reducing response delays and clinical error."
    },
    {
      name: "Medicly",
      link: "https://www.medicly.dev/",
      role: "Full Stack Lead",
      date: "Sep 2025",
      hackathon: "HackCMU 2025",
      hackathonLink: "https://www.acmatcmu.com/hackcmu2025/",
      wins: "Grand Prize Winner",
      stats: "1/250+ teams",
      desc: "Converts smartphone video into clinician-ready findings.",
      tech: ["FastAPI", "Next.js", "Supabase", "MediaPipe"],
      details: [
        "Grand Prize (1/250+ teams) at HackCMU 2025 w/ sponsors from Anthropic, Citadel, Stripe, Jane Street & HRT",
        "Converts raw smartphone video into clinician-ready findings with 3D mesh visualization & exercise suggestions",
        "Built a MediaPipe/OpenCV pose pipeline with keyframe splicing and joint-angle time-series data into a Claude feedback analysis loop"
      ],
      fullDescription: "AI-powered rehabilitation tracking with intelligent pose analysis and personalized recovery insights."
    },
    {
      name: "Yumi",
      link: "https://devpost.com/software/yumi",
      role: "iOS + AI Lead",
      date: "Oct 2025",
      hackathon: "HackHarvard 2025",
      hackathonLink: "https://hackharvard.io/",
      wins: "3rd Place",
      stats: "3/180+ teams",
      desc: "Social network for food utilizing AI agents.",
      tech: ["SwiftUI", "Hugging Face", "Gemini", "FastAPI", "Supabase"],
      details: [
        "Awarded 3rd Place (3/150+ teams) at HackHarvard 2025 for a social network for food utilizing multiple AI agents",
        "Built a hybrid recommendation system using Hugging Face Sentence Transformers for food similarity embeddings and Gemini function calling for semantic restaurant retrieval",
        "Architected SwiftUI iOS app and built an image pipeline with CV for food property detection"
      ],
      fullDescription: "The agentic social food network. You bring your taste. Your friends bring the vibe. AI agents orchestrate the rest."
    }
  ],
  
  contact: {
    email: "dichung@andrew.cmu.edu",
    phone: "213-322-5501",
    linkedin: "https://www.linkedin.com/in/david-chung-00b04a199/",
    github: "https://github.com/davidchung29",
    resume: "David Chung.pdf"
  },
  
  leadership: [
    {
      org: "CSYA 501(c)(3)",
      orgLink: "https://www.csya-edu.org/",
      role: "Founder & Director",
      location: "Riverside, CA",
      startDate: "Feb 2023",
      endDate: "Aug 2025",
      period: "Feb 2023 - Aug 2025",
      details: [
        "Led a 35+ member team and raised $280,000+ with sponsorships from Wolfram Alpha & Brilliant",
        "Served 1k+ students from 25+ countries, collaborated with 20+ professionals from Google, Princeton, Harvard"
      ]
    }
  ],
  
  skills: {
    languages: ["TypeScript", "JavaScript", "Python", "Swift", "Kotlin", "Java", "C", "Assembly", "HTML", "CSS", "SQL"],
    frameworks: ["React", "Next.js", "Node.js", "FastAPI", "PyTorch", "OpenCV", "SwiftUI", "ARKit", "MediaPipe", "Tailwind"],
    tools: ["AWS", "Supabase", "Railway", "Vercel", "Git", "VS Code", "Cursor", "Claude Code"]
  }
};

// Tool functions
const tools = {
  get_projects: () => {
    return davidData.projects.map(p => ({
      name: p.name,
      link: p.link,
      role: p.role,
      date: p.date,
      hackathon: p.hackathon,
      hackathonLink: p.hackathonLink,
      wins: p.wins,
      desc: p.desc,
      stats: p.stats,
      tech: p.tech,
      details: p.details,
      fullDescription: p.fullDescription
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
      p.fullDescription.toLowerCase().includes(lowerKeyword) ||
      p.role.toLowerCase().includes(lowerKeyword) ||
      p.hackathon.toLowerCase().includes(lowerKeyword) ||
      p.tech.some(tech => tech.toLowerCase().includes(lowerKeyword))
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
  },
  
  get_skills: () => {
    return davidData.skills;
  },
  
  get_education: () => {
    return davidData.education;
  },
  
  get_leadership: () => {
    return davidData.leadership;
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
    'get_timeline': /\b(timeline|chronological|history|show me your history)/i,
    'get_skills': /\b(skills|tech stack|technologies|programming languages|what can you do|what technologies)/i,
    'get_education': /\b(education|school|degree|cmu|carnegie mellon|where did you go|what did you study)/i,
    'get_leadership': /\b(leadership|csya|founder|director|led|team)/i
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
        output += `→ ${p.name} (${p.link})\n`;
        output += `  ${p.role} — ${p.wins} at ${p.hackathon}\n`;
        output += `  ${p.desc} (${p.stats})\n`;
        output += `  Tech: ${p.tech.join(', ')}\n\n`;
      });
      break;
      
    case 'get_project_details':
      const p = result;
      output += `${p.name}\n`;
      output += `Link: ${p.link}\n`;
      output += `Role: ${p.role}\n`;
      output += `Date: ${p.date}\n`;
      output += `Hackathon: ${p.hackathon}\n`;
      output += `Achievement: ${p.wins} (${p.stats})\n`;
      output += `Tech Stack: ${p.tech.join(', ')}\n\n`;
      output += `Description: ${p.fullDescription || p.desc}\n\n`;
      output += `Details:\n`;
      p.details.forEach(detail => {
        output += `  → ${detail}\n`;
      });
      break;
      
    case 'search_projects':
    case 'get_project_by_hackathon':
      result.forEach((p, i) => {
        output += `→ ${p.name} (${p.link})\n`;
        output += `  ${p.desc} — ${p.wins} at ${p.hackathon}\n`;
        output += `  Tech: ${p.tech.join(', ')}\n\n`;
      });
      break;
      
    case 'get_experience':
      result.forEach((exp, i) => {
        output += `→ ${exp.org}\n`;
        output += `  ${exp.role}\n`;
        output += `  ${exp.period} | ${exp.location}\n`;
        if (exp.orgLink) {
          output += `  ${exp.orgLink}\n`;
        }
        output += `  ${exp.desc}\n`;
        if (exp.details && exp.details.length > 0) {
          exp.details.forEach(detail => {
            output += `    • ${detail}\n`;
          });
        }
        output += `\n`;
      });
      break;
      
    case 'get_contact_info':
      output += `Email: ${result.email}\n`;
      output += `Phone: ${result.phone}\n`;
      output += `LinkedIn: ${result.linkedin}\n`;
      output += `GitHub: ${result.github}\n`;
      output += `Resume: ${result.resume}\n`;
      output += `\nYou can download David's resume using the link on the main page.`;
      break;
      
    case 'get_resume':
      output += `Resume available: ${result}\n`;
      output += `You can download it from the main page footer.`;
      break;
      
    case 'get_timeline':
      result.forEach((item, i) => {
        if (item.type === 'experience') {
          output += `→ ${item.org} — ${item.role}\n`;
          output += `  ${item.period} | ${item.location}\n\n`;
        } else {
          output += `→ ${item.name} — ${item.hackathon}\n`;
          output += `  ${item.date} | ${item.wins}\n\n`;
        }
      });
      break;
      
    case 'get_skills':
      output += `Languages: ${result.languages.join(', ')}\n\n`;
      output += `Frameworks & Libraries: ${result.frameworks.join(', ')}\n\n`;
      output += `Developer Tools: ${result.tools.join(', ')}`;
      break;
      
    case 'get_education':
      output += `${result.school}\n`;
      output += `${result.degree}\n`;
      output += `${result.location}\n`;
      output += `Graduation: ${result.graduation}`;
      break;
      
    case 'get_leadership':
      result.forEach((lead, i) => {
        output += `→ ${lead.org} (${lead.orgLink})\n`;
        output += `  ${lead.role}\n`;
        output += `  ${lead.period} | ${lead.location}\n`;
        if (lead.details && lead.details.length > 0) {
          lead.details.forEach(detail => {
            output += `    • ${detail}\n`;
          });
        }
        output += `\n`;
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

