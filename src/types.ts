// Portfolio Data Types
export interface ProfileData {
    name: string;
    headline: string;
    role: string;
    bio: string;
    image: string;
    education: {
        degree: string;
        college: string;
        year: string;
        graduation: string;
    };
    contact: {
        email: string;
        github: string;
        linkedin: string;
    };
}

export interface Skill {
    id: string;
    name: string;
    category: string;
    level: number;
    icon: string;
    color: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    techStack: string[];
    role: string;
    githubLink: string;
    liveLink?: string;
    image: string;
    featured: boolean;
}

export interface Experience {
    id: string;
    title: string;
    organization: string;
    description: string;
    date: string;
    type: 'achievement' | 'experience' | 'education';
    image?: string;
}

export interface ResumeData {
    pdfUrl: string;
    lastUpdated: string;
}

export interface PortfolioData {
    profile: ProfileData;
    skills: Skill[];
    projects: Project[];
    experiences: Experience[];
    resume: ResumeData;
}

// Default Data
export const defaultData: PortfolioData = {
    profile: {
        name: "Shakthi Rithanya",
        headline: "AI/ML Undergraduate | Full Stack | ML Developer | Data Analyst | Finance Model Driven",
        role: "Student, Builder",
        bio: "Driven by curiosity and code, I explore the intersections of Artificial Intelligence and human potential. My journey is one of constant evolution—transforming abstract concepts into tangible, intelligent systems. As a 2nd-year AI & ML student at KGISL Institute of Technology, I'm not just studying the future; I'm actively building it, one algorithm at a time. From predictive finance models to dynamic full-stack applications, I craft solutions that perform.",
        image: "/profile.jpg",
        education: {
            degree: "BE CSE (AI & ML)",
            college: "KGISL Institute of Technology",
            year: "2nd Year",
            graduation: "2028"
        },
        contact: {
            email: "shakthirithanyasr07@gmail.com",
            github: "https://github.com/ShakthiRithanya",
            linkedin: "https://www.linkedin.com/in/shakthi-rithanya-s-461a2a314/"
        }
    },
    skills: [
        {
            id: "1",
            name: "Python",
            category: "Programming",
            level: 90,
            icon: "🐍",
            color: "#60A5FA"
        },
        {
            id: "2",
            name: "AI Tools",
            category: "Programming",
            level: 85,
            icon: "🤖",
            color: "#A78BFA"
        },
        {
            id: "3",
            name: "Leadership",
            category: "Life Skills",
            level: 88,
            icon: "👑",
            color: "#F472B6"
        },
        {
            id: "4",
            name: "Communication",
            category: "Life Skills",
            level: 90,
            icon: "💬",
            color: "#22D3EE"
        },
        {
            id: "5",
            name: "Organization",
            category: "Life Skills",
            level: 85,
            icon: "📅",
            color: "#FCD34D"
        },
        {
            id: "6",
            name: "Machine Learning",
            category: "Programming",
            level: 82,
            icon: "🧠",
            color: "#818CF8"
        },
        {
            id: "7",
            name: "Full Stack Development",
            category: "Programming",
            level: 80,
            icon: "💻",
            color: "#60A5FA"
        },
        {
            id: "8",
            name: "Team Work",
            category: "Life Skills",
            level: 92,
            icon: "🤝",
            color: "#10B981"
        },
        {
            id: "9",
            name: "Event Co-ordinator",
            category: "Life Skills",
            level: 95,
            icon: "🚀",
            color: "#F59E0B"
        },
        {
            id: "10",
            name: "Technical Mentorship",
            category: "Life Skills",
            level: 90,
            icon: "👨‍🏫",
            color: "#8B5CF6"
        }
    ],
    projects: [
        {
            id: "proj-fin-analyzer",
            name: "AI-Powered Financial Statement Analyzer",
            description: "An AI-powered financial intelligence platform that parses static PDF, Excel, and CSV financial reports, normalizes key line items, calculates key financial ratios, and leverages Google Gemini to provide deep insights, risk analysis, and investment recommendations.",
            techStack: ["Python", "Streamlit", "Gemini AI", "Pandas", "Plotly", "PDFPlumber"],
            image: "/proj_fin_analyzer.png",
            githubLink: "https://github.com/ShakthiRithanya/Ai-Financial-Statement-Analyzer",
            liveLink: "",
            role: "AI Product Developer",
            featured: true
        },
        {
            id: "proj-intelli-credit",
            name: "Intelli-Credit",
            description: "An AI-driven credit scoring and risk decisioning engine designed for modern financial institutions. Utilizes Explainable AI (SHAP) for transparent risk scoring, implements a What-If simulation sandbox, and uses a 5C RADAR framework to automate Credit Appraisal Memo generation.",
            techStack: ["React 18", "FastAPI", "SQLite", "SHAP", "Gradient Boosting"],
            image: "/proj_intelli_credit.png",
            githubLink: "https://github.com/ShakthiRithanya/Intelli-Credit",
            liveLink: "",
            role: "AI/ML Project Developer",
            featured: true
        },
        {
            id: "proj-vazhikaatti",
            name: "VazhiKaatti",
            description: "An AI-powered agricultural credit companion platform to empower rural women farmers. Integrates machine learning-based credit scoring, Tamil/English bilingual interfaces, speech-to-text voice input for accessibility, document verification modules, and scheme recommendations.",
            techStack: ["React 18", "FastAPI", "Scikit-learn", "SQLAlchemy", "Speech-to-Text"],
            image: "/proj_vazhikaatti.png",
            githubLink: "https://github.com/ShakthiRithanya/VAZHIKAATI",
            liveLink: "",
            role: "Full Stack AI Developer",
            featured: true
        },
        {
            id: "proj-securehealth-ai",
            name: "SecureHealth AI",
            description: "An AI-agent powered hospital security and access control system. Employs a Gradient Boosting model to detect insider threat anomalies from access logs with real-time WebSocket alerts and auto-locking features, and a Privacy Query Agent scope-locked with Gemini 1.5 Flash for natural language data queries.",
            techStack: ["React 18", "FastAPI", "SQLite", "WebSockets", "Gemini AI"],
            image: "/proj_securehealth.png",
            githubLink: "https://github.com/ShakthiRithanya/Securehealth-ai",
            liveLink: "",
            role: "AI Platform Developer",
            featured: true
        },
        {
            id: "proj-matrinet",
            name: "MATRINET",
            description: "An AI-powered maternal and child healthcare monitoring system designed for early risk detection. Includes specialized dashboards for hospitals, beneficiaries, and health authorities with predictive analysis, healthcare coverage tracking, and secure role-based management.",
            techStack: ["React", "FastAPI", "SQLite", "SQLModel"],
            image: "/proj_matrinet.png",
            githubLink: "https://github.com/ShakthiRithanya/MATRINET",
            liveLink: "",
            role: "AI Healthcare Platform Developer",
            featured: true
        }
    ],
    experiences: [
        {
            id: "exp-skill-radar",
            title: "AI Innovation Learning Sprint",
            organization: "Skill Radar",
            description: "Completed an intensive hands-on workshop focused on real-time AI delivery. Built custom Voice Agents, designed end-to-end AI automation workflows, and deployed Vibe-Coding web apps, shifting focus from theory to deployment.",
            date: "Dec 2025",
            type: "experience",
            image: "/skill_radar_workshop.png"
        },
        {
            id: "exp-yei-internship",
            title: "AI Internship (YEI 2025)",
            organization: "Adverk Technologies",
            description: "Successfully completed a national-level AI internship. Worked on practical AI projects, gained industry workflow exposure, and transitioned from theoretical learning to building real-world products.",
            date: "Jul 2025 - Sep 2025",
            type: "experience",
            image: "/yei_internship_certificate.png"
        },
        {
            id: "ach-1",
            title: "3rd Prize - Math Expo 2025",
            organization: "KITE (Department of Science & Humanities)",
            description: "Awarded 3rd prize for building a software application that solves complex mathematical equations.",
            date: "2025",
            type: "achievement",
            image: "/math_expo_prize.png"
        },


    ],
    resume: {
        pdfUrl: "",
        lastUpdated: new Date().toISOString()
    }
};

// Storage utilities
export const storage = {
    getData: (): PortfolioData => {
        const stored = localStorage.getItem('portfolio_data_v30');
        return stored ? JSON.parse(stored) : defaultData;
    },

    saveData: (data: PortfolioData) => {
        localStorage.setItem('portfolio_data_v30', JSON.stringify(data));
        window.dispatchEvent(new Event('storage'));
    },

    updateProfile: (profile: Partial<ProfileData>) => {
        const data = storage.getData();
        storage.saveData({ ...data, profile: { ...data.profile, ...profile } });
    },

    updateSkills: (skills: Skill[]) => {
        const data = storage.getData();
        storage.saveData({ ...data, skills });
    },

    updateProjects: (projects: Project[]) => {
        const data = storage.getData();
        storage.saveData({ ...data, projects });
    },

    updateExperiences: (experiences: Experience[]) => {
        const data = storage.getData();
        storage.saveData({ ...data, experiences });
    },

    updateResume: (resume: ResumeData) => {
        const data = storage.getData();
        storage.saveData({ ...data, resume });
    },

    exportData: () => {
        const data = storage.getData();
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    },

    importData: (file: File) => {
        return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target?.result as string);
                    storage.saveData(data);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(file);
        });
    },

    reset: () => {
        storage.saveData(defaultData);
    }
};
