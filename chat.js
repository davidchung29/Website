// Chat Terminal with Context-Based AI

// Data structure for David's information
// Make it global so project-preview.js can access it
window.davidData = {
  bio: "Hey, I'm David. I want to make impact by developing products using new technology. I'm currently studying information systems and computer science @ CMU.",
  
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
    // Figma - hidden for now
    // {
    //   org: "Figma",
    //   orgLink: "https://www.figma.com/",
    //   role: "Software Engineer Intern",
    //   location: "San Francisco, CA",
    //   startDate: "Summer 2026",
    //   endDate: "Summer 2026",
    //   period: "Summer 2026",
    //   desc: "Incoming SWE intern.",
    //   details: [
    //     "Incoming Software Engineer Intern for summer 2026"
    //   ]
    // },
    {
      org: "ValueMate (YC X25)",
      orgLink: "https://valuemate.ai/",
      role: "AI Software Engineer Intern",
      location: "Pittsburgh, PA",
      startDate: "Sep 2025",
      endDate: "Nov 2025",
      period: "Sep 2025 -- Nov 2025",
      desc: "Developed AI agents and infrastructure for real-estate appraisors.",
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
      githubLink: "https://github.com/scrappydevs/haven",
      demoUrl: "assets/projects/haven/Haven AI Chat.gif",
      techStackUrl: "assets/projects/haven/Haven Tech Stack.png",
      demoType: "image",
      previewCaption: "Hospital command center powered by context-aware agentic AI. Multi-agent system using CV and vital monitoring to detect patient anomalies, answer questions, and alert nurses in real-time.",
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
      name: "Healthier",
      link: "https://devpost.com/software/healthier",
      githubLink: "https://github.com/scrappydevs/healthier",
      demoUrl: "assets/projects/nexhacks/ios.gif",
      demoImages: ["assets/projects/nexhacks/ios.gif", "assets/projects/nexhacks/ios2.gif"],
      dashboardUrl: "assets/projects/nexhacks/dashboard.png",
      techStackUrl: "assets/projects/nexhacks/techstack.png",
      demoType: "image",
      imageLayout: "side-by-side",
      previewCaption: "AI-powered elderly care app. Seniors scan pills/meals and chat with a voice agent. Healthcare providers get dashboards that flag risks early. 3D facility tracking for senior homes.",
      role: "Full Stack + AI Lead",
      date: "Jan 2026",
      hackathon: "NexHacks 2026",
      hackathonLink: "https://nexhacks.com/",
      wins: "2nd Place",
      stats: "2/300 teams",
      desc: "AI-powered elderly care app with multimodal capture and risk scoring.",
      tech: ["Swift", "CoreML", "YOLOv8", "LiveKit", "Claude", "Cerebras", "Overshoot", "MediaPipe", "Next.js", "FastAPI", "Supabase"],
      details: [
        "Placed 2nd (2/300 teams) at NexHacks 2026 for an AI-powered elderly care continuity platform",
        "Built on-device pill detection with custom YOLOv8 model trained on 700+ annotated images, converted to CoreML for privacy-preserving iPhone inference",
        "Implemented LiveKit WebRTC voice interface for natural check-ins and Overshoot computer vision for real-time exercise form analysis with MediaPipe pose estimation",
        "Developed plan-vs-behavior engine with risk scoring and triage alerting system, 3D spatial care maps, and AI chat for natural language plan updates"
      ],
      fullDescription: "AI-powered elderly care app bridging in-clinic and at-home care. Features include on-device pill scanning with YOLOv8, LiveKit voice journaling, Overshoot exercise analysis, real-time adherence telemetry, risk scoring, and 3D facility maps for care coordination."
    },
    {
      name: "Medicly",
      link: "https://yummy-ideas-956789.framer.app/",
      githubLink: "https://github.com/scrappydevs/medicly",
      demoUrl: "https://yummy-ideas-956789.framer.app/",
      demoType: "iframe",
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
        "Built a MediaPipe/OpenCV pose pipeline with keyframe splicing and joint-angle time-series data into a Claude feedback analysis loop",
        "Presented @ Palantir"
      ],
      fullDescription: "AI-powered rehabilitation tracking with intelligent pose analysis and personalized recovery insights."
    },
    {
      name: "Yumi",
      link: "https://devpost.com/software/yumi",
      githubLink: "https://github.com/scrappydevs/Yumi",
      demoUrl: "assets/projects/yumi/Yumi_Demo.gif",
      techStackUrl: "assets/projects/yumi/Yumi_Tech_Stack.png",
      demoType: "image",
      previewCaption: "The agentic social food network. AI-powered recommendations using Sentence Transformers for food similarity embeddings and Gemini function calling for semantic restaurant retrieval.",
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
    },
    {
      name: "CMU ACE-AI",
      link: "https://www.cmu.edu/teel/projects/ace-ai.html",
      githubLink: "",
      demoUrl: "https://www.cmu.edu/teel/projects/ace-ai.html",
      demoType: "iframe",
      role: "LLM Research Assistant",
      date: "Sep 2025 - Dec 2025",
      hackathon: "",
      hackathonLink: "",
      wins: "",
      stats: "",
      desc: "Automated learning objective mapping using AI agents.",
      tech: ["Claude API", "OpenAI", "Python", "Vector Embeddings", "RAG"],
      details: [
        "Research funded by CMU Accenture Center of Excellence for AI",
        "Engineered multi-stage LLM orchestration pipeline with vector embeddings and RAG for automated evaluation",
        "Deployed system analyzing 5,000+ student submissions for learning objective alignment and mastery prediction"
      ],
      fullDescription: "Research project exploring the boundaries of LLM in practical applications, focusing on automated learning objective mapping and educational assessment. Funded by Accenture."
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

// Tool functions removed - using context-based approach instead

// Netlify Function endpoint for OpenAI API
// The function handles API calls server-side to avoid CORS issues
const NETLIFY_FUNCTION_URL = '/.netlify/functions/openai-chat';

// Create context prompt with all David's information
function createContextPrompt() {
  let context = `You are David Chung's AI assistant. Here is all the information about David:

BIO:
${davidData.bio}

EDUCATION:
- School: ${davidData.education.school}
- Degree: ${davidData.education.degree}
- Location: ${davidData.education.location}
- Graduation: ${davidData.education.graduation}

WORK EXPERIENCE:
`;
  
  davidData.experience.forEach(exp => {
    context += `\n${exp.org} (${exp.orgLink})
- Role: ${exp.role}
- Period: ${exp.period}
- Location: ${exp.location}
- Description: ${exp.desc}
- Details:
`;
    exp.details.forEach(detail => {
      context += `  • ${detail}\n`;
    });
  });
  
  context += `\nPROJECTS:\n`;
  davidData.projects.forEach(proj => {
    context += `\n${proj.name} (${proj.link})
- Role: ${proj.role}
- Date: ${proj.date}
- Hackathon: ${proj.hackathon} (${proj.hackathonLink})
- Achievement: ${proj.wins} (${proj.stats})
- Description: ${proj.desc}
- Full Description: ${proj.fullDescription}
- Tech Stack: ${proj.tech.join(', ')}
- Details:
`;
    proj.details.forEach(detail => {
      context += `  • ${detail}\n`;
    });
  });
  
  context += `\nLEADERSHIP:\n`;
  davidData.leadership.forEach(lead => {
    context += `\n${lead.org} (${lead.orgLink})
- Role: ${lead.role}
- Period: ${lead.period}
- Location: ${lead.location}
- Details:
`;
    lead.details.forEach(detail => {
      context += `  • ${detail}\n`;
    });
  });
  
  context += `\nTECHNICAL SKILLS:
- Languages: ${davidData.skills.languages.join(', ')}
- Frameworks & Libraries: ${davidData.skills.frameworks.join(', ')}
- Developer Tools: ${davidData.skills.tools.join(', ')}

CONTACT INFORMATION:
- Email: ${davidData.contact.email}
- Phone: ${davidData.contact.phone}
- LinkedIn: ${davidData.contact.linkedin}
- GitHub: ${davidData.contact.github}
- Resume: ${davidData.contact.resume}

Answer questions naturally and conversationally based on this information. Be specific and accurate. If asked about something not in the context, say you don't have that information.`;
  
  return context;
}

// Get AI response using Netlify function (which proxies to OpenAI)
async function getAIResponse(query) {
  try {
    const contextPrompt = createContextPrompt();
    
    const response = await fetch(NETLIFY_FUNCTION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: query,
        contextPrompt: contextPrompt
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg = errorData.error || response.statusText;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return data.response;
    
  } catch (error) {
    console.error('Error calling Netlify function:', error);
    
    // Re-throw with more context if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Failed to connect to server');
    }
    
    throw error;
  }
}

// Old tool-based functions removed - now using context-based approach

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
  function addAIMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ai';
    messageDiv.innerHTML = `<div class="message-content">${text}</div>`;
    chatOutput.appendChild(messageDiv);
    chatOutput.scrollTop = chatOutput.scrollHeight;
  }
  
  // Handle user input
  async function handleInput() {
    const query = chatInput.value.trim();
    if (!query) return;
    
    // Add user message
    addUserMessage(query);
    chatInput.value = '';
    
    // Show typing indicator
    const typingDiv = showTyping();
    
    try {
      // Get AI response with full context
      const response = await getAIResponse(query);
      removeTyping(typingDiv);
      addAIMessage(response);
    } catch (error) {
      removeTyping(typingDiv);
      console.error('Error handling input:', error);
      
      // Show user-friendly error message
      let errorMessage = "Sorry, I encountered an error. ";
      
      if (error.message.includes('API key') || error.message.includes('not configured')) {
        errorMessage += "The API key may not be configured correctly. Please check Netlify environment variables (OPENAI_API_KEY).";
      } else if (error.message.includes('network') || error.message.includes('fetch') || error.message.includes('Failed to connect')) {
        errorMessage += "Network error. Please check your connection and try again.";
      } else if (error.message.includes('OpenAI')) {
        errorMessage += error.message;
      } else {
        errorMessage += error.message || "Please try again.";
      }
      
      addAIMessage(errorMessage);
    }
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

