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
        ]
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
