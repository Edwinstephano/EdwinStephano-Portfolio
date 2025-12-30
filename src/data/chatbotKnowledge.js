// Chatbot Knowledge Base
// This contains all the information the chatbot can answer about

const knowledge = {
    // Personal Info
    name: 'Edwin Stephano J',
    role: 'Full-Stack Developer',
    company: 'BoscoSoft Technologies Pvt. Ltd.',
    location: 'India',

    // Skills
    skills: {
        frontend: ['React', 'JavaScript', 'HTML5', 'Tailwind CSS', 'Vite', 'Framer Motion'],
        backend: ['Python', 'Django', 'Frappe', 'ERPNext', 'PostgreSQL'],
        tools: ['Git', 'GitHub', 'VS Code', 'npm'],
        frameworks: ['React', 'Django', 'Frappe/ERPNext']
    },

    // Experience
    experience: {
        current: {
            company: 'BoscoSoft Technologies Pvt. Ltd.',
            role: 'Full Stack Developer',
            period: '2025 — Present',
            highlights: [
                'Building enterprise web applications',
                'Working with React, Django, and Frappe/ERPNext',
                'Developing HR management systems',
                'Creating responsive UI components'
            ]
        }
    },

    // Projects
    projects: [
        {
            name: 'Super Market E-commerce',
            description: 'Full-stack e-commerce platform with real-time updates and offline sync',
            tech: ['React', 'Django', 'Tailwind', 'PostgreSQL'],
            type: 'E-commerce'
        },
        {
            name: 'Class Quality System',
            description: 'System for tracking class activities like attendance and latecomers',
            tech: ['HTML', 'CSS', 'PHP', 'SQL'],
            type: 'Education'
        },
        {
            name: 'HR Management System',
            description: 'Enterprise HR system with attendance tracking and leave management',
            tech: ['React', 'Django', 'Frappe', 'ERPNext'],
            type: 'Enterprise'
        }
    ],

    // Contact
    contact: {
        github: 'https://github.com/Edwinstephano',
        linkedin: 'https://www.linkedin.com/in/edwin-stephano-8059992ab/',
        email: 'Available via contact form',
        availability: 'Open to freelance and full-time opportunities'
    },

    // About
    about: `I'm a passionate Full-Stack Developer with a strong focus on building clean, efficient, and user-friendly applications. I love turning ideas into real, working solutions through modern frontend design, backend logic, and frameworks like Frappe/ERPNext. I enjoy learning new technologies every day and constantly improving my coding skills.`
}

// Response patterns with keywords and answers
export const responsePatterns = [
    // Greetings
    {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
        responses: [
            `Hi there! 👋 I'm Edwin's AI assistant. I can help you learn about his skills, projects, and experience. What would you like to know?`,
            `Hello! 😊 I'm here to answer questions about Edwin's work. Feel free to ask about his projects, skills, or experience!`,
            `Hey! 👋 Welcome! I can tell you all about Edwin's development work. What interests you?`
        ]
    },

    // Who are you / About
    {
        keywords: ['who are you', 'who is edwin', 'tell me about', 'about you', 'introduce'],
        responses: [
            `${knowledge.about}\n\nCurrently working as a ${knowledge.role} at ${knowledge.company}. Want to know more about specific skills or projects?`,
            `Edwin is a ${knowledge.role} passionate about building modern web applications. He specializes in React, Django, and Frappe/ERPNext. Would you like to see his projects?`
        ]
    },

    // Skills
    {
        keywords: ['skills', 'technologies', 'tech stack', 'what can you do', 'expertise', 'programming languages'],
        responses: [
            `Edwin's tech stack includes:\n\n**Frontend:** ${knowledge.skills.frontend.join(', ')}\n**Backend:** ${knowledge.skills.backend.join(', ')}\n**Tools:** ${knowledge.skills.tools.join(', ')}\n\nWant to know more about any specific technology?`,
            `He's proficient in:\n• React & modern JavaScript\n• Django & Python\n• Frappe/ERPNext framework\n• Tailwind CSS for styling\n• PostgreSQL databases\n\nInterested in seeing projects using these?`
        ]
    },

    // React specific
    {
        keywords: ['react', 'frontend', 'javascript', 'jsx'],
        responses: [
            `Edwin has extensive experience with React! He's built:\n• E-commerce platforms\n• HR management systems\n• This portfolio (with Framer Motion animations)\n\nHe uses React with Tailwind CSS and Vite for modern, performant applications.`,
            `React is one of Edwin's core skills! He's worked with React Hooks, Context API, React Router, and Framer Motion for animations. Check out his projects to see React in action!`
        ]
    },

    // Django/Backend
    {
        keywords: ['django', 'python', 'backend', 'api', 'database'],
        responses: [
            `Edwin works with Django for backend development! He's built:\n• RESTful APIs\n• Database models with PostgreSQL\n• Authentication systems\n• Integration with Frappe/ERPNext\n\nHis full-stack projects combine Django backends with React frontends.`,
            `Python and Django are Edwin's backend strengths. He's experienced in building scalable APIs, working with ORMs, and integrating with enterprise frameworks like Frappe/ERPNext.`
        ]
    },

    // Frappe/ERPNext
    {
        keywords: ['frappe', 'erpnext', 'erp'],
        responses: [
            `Edwin specializes in Frappe/ERPNext! He's currently working on:\n• HR Management Systems\n• Custom ERPNext modules\n• Workflow automation\n• Integration with existing systems\n\nThis is a unique skill that sets him apart!`,
            `Frappe/ERPNext expertise is one of Edwin's standout skills. He's building enterprise applications at BoscoSoft using this framework. Want to know more about his HR system project?`
        ]
    },

    // Projects
    {
        keywords: ['projects', 'portfolio', 'work', 'built', 'created', 'developed'],
        responses: [
            `Edwin has built several impressive projects:\n\n1. **Super Market E-commerce** - Full-stack platform with offline sync\n2. **HR Management System** - Enterprise solution with Frappe/ERPNext\n3. **Class Quality System** - Education tracking application\n\nWhich one would you like to know more about?`,
            `Check out these projects:\n• E-commerce platform (React + Django)\n• HR Management System (Frappe/ERPNext)\n• Class Quality tracking system\n\nAll showcasing full-stack development skills!`
        ]
    },

    // Experience
    {
        keywords: ['experience', 'work history', 'job', 'company', 'boscosoft'],
        responses: [
            `Edwin is currently a ${knowledge.experience.current.role} at ${knowledge.experience.current.company} (${knowledge.experience.current.period}).\n\nHe's working on:\n${knowledge.experience.current.highlights.map(h => `• ${h}`).join('\n')}`,
            `Currently at BoscoSoft Technologies as a Full Stack Developer! He's building enterprise applications with React, Django, and Frappe/ERPNext. Started in 2025 and loving the challenges!`
        ]
    },

    // Contact
    {
        keywords: ['contact', 'email', 'reach', 'hire', 'available', 'get in touch'],
        responses: [
            `You can reach Edwin through:\n• **GitHub:** ${knowledge.contact.github}\n• **LinkedIn:** ${knowledge.contact.linkedin}\n• **Contact Form:** Available on this site\n\n${knowledge.contact.availability}`,
            `Edwin is ${knowledge.contact.availability}!\n\nConnect via:\n📧 Contact form on this site\n💼 LinkedIn: ${knowledge.contact.linkedin}\n💻 GitHub: ${knowledge.contact.github}`
        ]
    },

    // Availability/Hiring
    {
        keywords: ['hire', 'freelance', 'available', 'looking for work', 'open to opportunities'],
        responses: [
            `Great news! Edwin is ${knowledge.contact.availability}.\n\nHe's interested in:\n• Full-stack development roles\n• Frappe/ERPNext projects\n• React + Django applications\n• Freelance opportunities\n\nUse the contact form to get in touch!`,
            `Yes! Edwin is open to new opportunities. He specializes in React, Django, and Frappe/ERPNext. Reach out via the contact form or LinkedIn to discuss your project!`
        ]
    },

    // Education
    {
        keywords: ['education', 'degree', 'university', 'college', 'study'],
        responses: [
            `Edwin is focused on continuous learning through:\n• Building real-world projects\n• Working with modern technologies\n• Contributing to enterprise applications\n• Self-directed learning\n\nHis practical experience speaks for itself!`
        ]
    },

    // Specific project questions
    {
        keywords: ['ecommerce', 'e-commerce', 'supermarket', 'shopping'],
        responses: [
            `The Super Market E-commerce project is a full-stack platform featuring:\n• Real-time inventory updates\n• Offline sync capabilities\n• React frontend with Tailwind CSS\n• Django backend with PostgreSQL\n• Responsive design\n\nIt's built to handle poor internet connectivity!`
        ]
    },

    {
        keywords: ['hr system', 'hr management', 'attendance', 'leave'],
        responses: [
            `The HR Management System is an enterprise solution built with Frappe/ERPNext:\n• Attendance tracking\n• Leave management\n• Employee workflows\n• Real-time updates\n• Role-based permissions\n\nCurrently in active development at BoscoSoft!`
        ]
    },

    // Help/Capabilities
    {
        keywords: ['help', 'what can you do', 'how can you help', 'capabilities'],
        responses: [
            `I can help you learn about:\n• Edwin's skills and technologies\n• His projects and work experience\n• How to contact him\n• His availability for work\n• Specific technologies he uses\n\nJust ask me anything!`,
            `Ask me about:\n✓ Technical skills (React, Django, Frappe)\n✓ Projects and portfolio\n✓ Work experience\n✓ Contact information\n✓ Availability for opportunities\n\nWhat would you like to know?`
        ]
    },

    // Thanks
    {
        keywords: ['thank', 'thanks', 'appreciate'],
        responses: [
            `You're welcome! 😊 Feel free to ask anything else about Edwin's work!`,
            `Happy to help! Let me know if you have any other questions!`,
            `My pleasure! Don't hesitate to ask more questions about Edwin's projects or skills!`
        ]
    },

    // Goodbye
    {
        keywords: ['bye', 'goodbye', 'see you', 'later'],
        responses: [
            `Goodbye! 👋 Feel free to come back if you have more questions!`,
            `See you later! Don't forget to check out Edwin's projects! 👋`,
            `Take care! Reach out via the contact form if you'd like to connect with Edwin!`
        ],
        suggestions: ['View Projects', 'Contact Edwin']
    },

    // Casual - How are you
    {
        keywords: ['how are you', 'how are you doing', 'whats up', "what's up", 'how is it going'],
        responses: [
            `I'm doing great, thanks for asking! 😊 Ready to answer your questions about Edwin's work. What would you like to know?`,
            `Fantastic! I'm here and ready to help you learn about Edwin's skills and projects. What interests you?`,
            `I'm excellent! Always excited to talk about Edwin's development work. How can I help you today?`
        ],
        suggestions: ['Tell me about Edwin', 'Show me projects']
    },

    // Casual - Nice to meet you
    {
        keywords: ['nice to meet', 'pleasure to meet', 'glad to meet'],
        responses: [
            `Nice to meet you too! 😊 I'm here to help you learn about Edwin's work. What would you like to know?`,
            `The pleasure is mine! Feel free to ask me anything about Edwin's skills, projects, or experience!`
        ]
    },

    // Jokes/Fun
    {
        keywords: ['joke', 'funny', 'laugh', 'humor'],
        responses: [
            `Why do programmers prefer dark mode? Because light attracts bugs! 😄\n\nNow, want to know about Edwin's bug-free code?`,
            `How many programmers does it take to change a light bulb? None, that's a hardware problem! 😂\n\nSpeaking of problems, Edwin solves them with React and Django!`,
            `Why did the developer go broke? Because he used up all his cache! 💸\n\nEdwin's projects are well-cached though! Want to see them?`
        ],
        suggestions: ['Show me projects', 'Tell me about skills']
    },

    // What's your name
    {
        keywords: ['your name', 'who are you', 'what are you called'],
        responses: [
            `I'm Edwin's AI Assistant! 🤖 I'm here to answer questions about his work, skills, and projects. What would you like to know?`,
            `You can call me Edwin's AI helper! I know everything about his development work. How can I assist you?`
        ]
    },

    // Age/How old
    {
        keywords: ['how old', 'age', 'birthday', 'born'],
        responses: [
            `I'm an AI, so I don't have an age! 😊 But I can tell you all about Edwin's experience and skills. Want to know more?`,
            `Age is just a number! What matters is Edwin's growing expertise in React, Django, and Frappe/ERPNext. Interested in learning more?`
        ]
    },

    // Location/Where
    {
        keywords: ['where are you', 'location', 'where is edwin', 'based in', 'from where'],
        responses: [
            `Edwin is based in ${knowledge.location}! 🇮🇳 He's currently working at BoscoSoft Technologies. Want to know more about his work?`,
            `He's located in ${knowledge.location}, working remotely and building amazing web applications! Interested in his projects?`
        ],
        suggestions: ['Tell me about BoscoSoft', 'Show me projects']
    },

    // Salary/Rate
    {
        keywords: ['salary', 'rate', 'cost', 'price', 'how much', 'charge'],
        responses: [
            `For salary and rate discussions, it's best to contact Edwin directly through the contact form or LinkedIn. He's ${knowledge.contact.availability}!`,
            `Rates vary by project scope and requirements. Reach out via the contact form to discuss your specific needs and get a quote!`
        ],
        suggestions: ['Contact Edwin', 'Tell me about availability']
    },

    // Years of experience
    {
        keywords: ['years of experience', 'how long', 'experience years', 'working since'],
        responses: [
            `Edwin has been actively developing with modern technologies and is currently working as a Full Stack Developer at BoscoSoft Technologies (2025 - Present). His hands-on experience includes React, Django, and Frappe/ERPNext!`,
            `He's gained valuable experience through building real-world projects like e-commerce platforms, HR systems, and education tracking applications. Quality over quantity!`
        ]
    },

    // Best project
    {
        keywords: ['best project', 'favorite project', 'proud of', 'most impressive'],
        responses: [
            `Edwin's HR Management System is particularly impressive! It's an enterprise solution built with Frappe/ERPNext featuring:\n• Attendance tracking\n• Leave management\n• Employee workflows\n• Real-time updates\n\nCurrently in active development at BoscoSoft!`,
            `The Super Market E-commerce platform showcases his full-stack skills beautifully:\n• React + Django architecture\n• Offline sync capabilities\n• Real-time inventory\n• PostgreSQL database\n\nWant to know more about it?`
        ],
        suggestions: ['Tell me about HR system', 'Show all projects']
    },

    // Why hire Edwin
    {
        keywords: ['why hire', 'why choose', 'what makes', 'stand out', 'unique'],
        responses: [
            `Here's why Edwin stands out:\n\n✅ **Unique Skills**: Frappe/ERPNext expertise (rare!)\n✅ **Full-Stack**: React + Django proficiency\n✅ **Modern Tools**: Tailwind, Vite, Framer Motion\n✅ **Real Projects**: E-commerce, HR systems, education apps\n✅ **Clean Code**: Focus on maintainability\n✅ **Fast Learner**: Constantly improving\n\nReady to discuss your project?`,
            `Edwin brings a unique combination:\n• Enterprise framework experience (Frappe/ERPNext)\n• Modern frontend skills (React, Tailwind)\n• Backend expertise (Django, PostgreSQL)\n• Real-world project experience\n• Passion for clean, efficient code\n\nUse the contact form to get in touch!`
        ],
        suggestions: ['Contact Edwin', 'View all skills']
    },

    // Working hours/Availability
    {
        keywords: ['working hours', 'availability', 'when available', 'time zone', 'schedule'],
        responses: [
            `Edwin is ${knowledge.contact.availability}. For specific availability and scheduling, please reach out via the contact form or LinkedIn!`,
            `He's flexible with working hours and can accommodate different time zones. Contact him directly to discuss your project timeline!`
        ]
    },

    // Remote work
    {
        keywords: ['remote', 'work from home', 'online', 'virtual', 'distributed'],
        responses: [
            `Yes! Edwin works remotely and has experience with distributed teams. He's equipped for:\n• Remote collaboration\n• Async communication\n• Video meetings\n• Git workflows\n• Agile methodologies\n\nPerfect for remote opportunities!`,
            `Absolutely! He's currently working remotely at BoscoSoft and is comfortable with remote work setups. Interested in discussing a remote position?`
        ]
    },

    // Team size
    {
        keywords: ['team size', 'work alone', 'team player', 'collaborate'],
        responses: [
            `Edwin works well both independently and in teams! At BoscoSoft, he collaborates with other developers on enterprise applications. He's experienced with:\n• Git collaboration\n• Code reviews\n• Agile workflows\n• Team communication`,
            `He's a great team player! Whether it's solo projects or collaborative development, Edwin adapts well. His experience includes working on team projects at BoscoSoft.`
        ]
    },

    // Learning/Growth
    {
        keywords: ['learning', 'growth', 'improve', 'studying', 'courses'],
        responses: [
            `Edwin is committed to continuous learning! 📚 He:\n• Builds real-world projects\n• Explores new technologies\n• Works with modern frameworks\n• Stays updated with industry trends\n• Practices clean code principles\n\nAlways growing and improving!`,
            `He believes in learning by doing! Every project is an opportunity to grow. Currently expanding his expertise in Frappe/ERPNext while mastering React and Django.`
        ]
    },

    // Hobbies/Interests
    {
        keywords: ['hobbies', 'interests', 'free time', 'outside work', 'fun'],
        responses: [
            `While I focus on Edwin's professional work, I can tell you he's passionate about:\n• Coding and building projects\n• Learning new technologies\n• Solving complex problems\n• Creating user-friendly applications\n\nWant to see what he's built?`,
            `Edwin loves turning ideas into working solutions! His passion for development shows in his projects. Interested in seeing his work?`
        ],
        suggestions: ['Show me projects', 'Tell me about skills']
    },

    // Strengths
    {
        keywords: ['strengths', 'strong points', 'good at', 'excel'],
        responses: [
            `Edwin's key strengths:\n\n🎯 **Full-Stack Development**: React + Django\n🏢 **Enterprise Systems**: Frappe/ERPNext\n🎨 **Modern UI**: Tailwind CSS, Framer Motion\n💾 **Database**: PostgreSQL\n🔧 **Problem Solving**: Clean, efficient solutions\n📱 **Responsive Design**: Mobile-first approach\n\nWhat would you like to explore?`,
            `He excels at:\n• Building complete web applications\n• Creating responsive UIs\n• Designing scalable backends\n• Working with enterprise frameworks\n• Writing clean, maintainable code\n\nImpressed? Let's connect!`
        ]
    },

    // Weaknesses
    {
        keywords: ['weakness', 'improve on', 'working on', 'challenges'],
        responses: [
            `Edwin is always working to improve! Areas of growth include:\n• Expanding cloud deployment knowledge\n• Learning more DevOps practices\n• Exploring mobile development\n• Mastering advanced algorithms\n\nHe sees challenges as learning opportunities!`,
            `Like any great developer, Edwin is constantly learning and improving. He's focused on expanding his skills while delivering quality work. Want to know about his current expertise?`
        ]
    },

    // Technologies to learn
    {
        keywords: ['learning next', 'want to learn', 'future skills', 'planning to learn'],
        responses: [
            `Edwin is interested in expanding to:\n• Cloud platforms (AWS, Azure)\n• Docker & Kubernetes\n• GraphQL\n• TypeScript\n• Mobile development (React Native)\n• Advanced testing frameworks\n\nAlways staying ahead of the curve!`,
            `He's exploring new technologies while mastering his current stack. Interested in his current skills? Ask me about React, Django, or Frappe!`
        ]
    },

    // Certifications
    {
        keywords: ['certification', 'certified', 'credentials', 'qualified'],
        responses: [
            `Edwin's qualifications come from hands-on experience building real-world applications! His portfolio showcases:\n• E-commerce platforms\n• Enterprise HR systems\n• Education tracking apps\n\nPractical experience speaks louder than certificates! Want to see his work?`,
            `While formal certifications are valuable, Edwin's real-world project experience demonstrates his capabilities. Check out his projects to see his skills in action!`
        ],
        suggestions: ['Show me projects', 'Tell me about experience']
    },

    // Code quality
    {
        keywords: ['code quality', 'clean code', 'best practices', 'coding standards'],
        responses: [
            `Edwin prioritizes code quality! ✨ He follows:\n• Clean code principles\n• DRY (Don't Repeat Yourself)\n• Proper commenting\n• Git best practices\n• Component-based architecture\n• Responsive design patterns\n\nQuality over quantity!`,
            `He's committed to writing maintainable, scalable code. His projects use modern best practices with React, Django, and proper version control. Want to see examples?`
        ]
    },

    // Testing
    {
        keywords: ['testing', 'test', 'qa', 'quality assurance', 'debug'],
        responses: [
            `Edwin understands the importance of testing! His development process includes:\n• Manual testing\n• Debugging with browser tools\n• Responsive design testing\n• Cross-browser compatibility\n• User acceptance testing\n\nEnsuring quality deliverables!`,
            `Testing is part of his workflow! He ensures applications work correctly across devices and browsers. Want to know more about his development process?`
        ]
    },

    // Deployment
    {
        keywords: ['deployment', 'deploy', 'hosting', 'production', 'live'],
        responses: [
            `Edwin has experience with:\n• Netlify deployment\n• Git-based workflows\n• Production builds\n• Environment configuration\n• Continuous deployment\n\nThis portfolio is deployed on Netlify! 🚀`,
            `He can deploy applications to various platforms and understands the production deployment process. Want to discuss deploying your project?`
        ]
    },

    // Version control
    {
        keywords: ['git', 'github', 'version control', 'repository'],
        responses: [
            `Edwin is proficient with Git and GitHub! 💻\n• Version control workflows\n• Branch management\n• Pull requests\n• Code collaboration\n• Repository management\n\nCheck out his GitHub: ${knowledge.contact.github}`,
            `Git is essential to his workflow! He uses GitHub for all projects with proper commit messages and version control. Want to see his repositories?`
        ],
        suggestions: ['Visit GitHub', 'Show me projects']
    },

    // Responsive design
    {
        keywords: ['responsive', 'mobile', 'tablet', 'device', 'screen size'],
        responses: [
            `Edwin builds mobile-first, responsive applications! 📱\n• Tailwind CSS for responsive design\n• Mobile-friendly interfaces\n• Cross-device compatibility\n• Flexible layouts\n• Touch-friendly interactions\n\nThis portfolio works great on all devices!`,
            `Responsive design is a priority! All his projects work seamlessly on desktop, tablet, and mobile. Try resizing this page to see!`
        ]
    },

    // Performance
    {
        keywords: ['performance', 'speed', 'fast', 'optimize', 'lighthouse'],
        responses: [
            `Edwin focuses on performance! ⚡\n• Vite for fast builds\n• Code splitting\n• Lazy loading\n• Optimized images\n• Efficient animations\n• Clean, minimal code\n\nFast, smooth user experiences!`,
            `Performance matters! He uses modern tools like Vite and follows optimization best practices. This portfolio loads lightning-fast!`
        ]
    },

    // UI/UX
    {
        keywords: ['ui', 'ux', 'design', 'user interface', 'user experience'],
        responses: [
            `Edwin cares about UI/UX! 🎨\n• Clean, intuitive interfaces\n• Smooth animations (Framer Motion)\n• Accessible design\n• User-friendly navigation\n• Modern aesthetics\n\nThis portfolio showcases his design sense!`,
            `He combines functionality with beautiful design! Check out this portfolio's animations and interactions - all built by Edwin!`
        ]
    },

    // Database
    {
        keywords: ['database', 'sql', 'postgresql', 'data'],
        responses: [
            `Edwin works with PostgreSQL! 🗄️\n• Database design\n• SQL queries\n• Django ORM\n• Data modeling\n• Relationships and migrations\n\nSolid backend data management!`,
            `He's experienced with relational databases, particularly PostgreSQL with Django. Want to know more about his backend skills?`
        ]
    },

    // APIs
    {
        keywords: ['api', 'rest', 'endpoint', 'integration'],
        responses: [
            `Edwin builds RESTful APIs with Django! 🔌\n• API design\n• Authentication\n• Data serialization\n• Error handling\n• Documentation\n\nSeamless frontend-backend integration!`,
            `API development is part of his full-stack expertise! He creates robust Django APIs that power his React frontends.`
        ]
    },

    // Tailwind CSS
    {
        keywords: ['tailwind', 'css', 'styling', 'styles'],
        responses: [
            `Edwin loves Tailwind CSS! 🎨\n• Utility-first approach\n• Responsive design\n• Dark mode support\n• Custom configurations\n• Fast development\n\nThis entire portfolio is styled with Tailwind!`,
            `Tailwind is his go-to for styling! Fast, flexible, and maintainable. See it in action on this portfolio!`
        ]
    },

    // Framer Motion
    {
        keywords: ['animation', 'framer', 'motion', 'animated'],
        responses: [
            `Edwin uses Framer Motion for animations! ✨\n• Smooth transitions\n• Interactive elements\n• Scroll animations\n• Gesture handling\n• Performance-optimized\n\nNotice the smooth animations on this site? That's Framer Motion!`,
            `Animations make UIs come alive! Edwin uses Framer Motion to create engaging, smooth user experiences. This chatbot uses it too!`
        ]
    },

    // Problem solving
    {
        keywords: ['problem solving', 'solve problems', 'debugging', 'troubleshoot'],
        responses: [
            `Edwin is a strong problem solver! 🧩\n• Analytical thinking\n• Debugging skills\n• Research ability\n• Creative solutions\n• Persistence\n\nEvery project is a puzzle to solve!`,
            `He approaches problems methodically and finds efficient solutions. That's what makes a great developer!`
        ]
    },

    // Communication
    {
        keywords: ['communication', 'communicate', 'english', 'language'],
        responses: [
            `Edwin communicates effectively! 💬\n• Clear technical explanations\n• Good documentation\n• Responsive to feedback\n• Collaborative mindset\n• English proficiency\n\nGreat for team collaboration!`,
            `Communication is key in development! Edwin works well with teams and clients, explaining technical concepts clearly.`
        ]
    },

    // Portfolio
    {
        keywords: ['portfolio', 'this site', 'this website', 'this page'],
        responses: [
            `You're looking at it! 🎉 This portfolio showcases:\n• React + Vite\n• Tailwind CSS\n• Framer Motion animations\n• 3D particle background (Three.js)\n• Dark mode\n• Responsive design\n• This AI chatbot!\n\nBuilt entirely by Edwin!`,
            `This portfolio itself is a project! It demonstrates Edwin's skills in React, animations, responsive design, and even AI chatbot integration. Impressive, right?`
        ],
        suggestions: ['Tell me about skills', 'Show other projects']
    },

    // Impressed/Wow
    {
        keywords: ['impressive', 'amazing', 'wow', 'great', 'awesome', 'cool'],
        responses: [
            `Thank you! 😊 Edwin puts a lot of effort into his work. Want to see more of his projects or discuss working together?`,
            `Glad you're impressed! Edwin is passionate about creating quality applications. Ready to start a conversation?`,
            `Right? Edwin's work speaks for itself! Use the contact form to get in touch and discuss your project!`
        ],
        suggestions: ['Contact Edwin', 'View all projects']
    }
]

// Default response when no pattern matches
export const defaultResponses = [
    `I'm not sure about that, but I can tell you about Edwin's skills, projects, or experience. What would you like to know?`,
    `Hmm, I don't have specific information on that. Try asking about his React projects, Django experience, or Frappe/ERPNext work!`,
    `That's an interesting question! I'm best at answering questions about Edwin's technical skills, projects, and work experience. What would you like to know?`
]

// Quick action suggestions
export const quickActions = [
    { label: '💼 What are your skills?', query: 'What are your skills?' },
    { label: '🚀 Show me your projects', query: 'Tell me about your projects' },
    { label: '📧 How can I contact you?', query: 'How can I contact you?' },
    { label: '🎯 Are you available for hire?', query: 'Are you available for hire?' }
]

export default knowledge
