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
}

export interface PortfolioData {
    profile: ProfileData;
    skills: Skill[];
    projects: Project[];
    experiences: Experience[];
}

// Default Data
export const defaultData: PortfolioData = {
    profile: {
        name: "Shakthi Rithanya",
        headline: "AI/ML Undergraduate | Full Stack | ML Developer | Data Analyst | Finance Model Driven",
        role: "Student, Builder",
        bio: "Driven by curiosity and code, I explore the intersections of Artificial Intelligence and human potential. My journey is one of constant evolution—transforming abstract concepts into tangible, intelligent systems. As a 2nd-year AI & ML student at KGISL Institute of Technology, I'm not just studying the future; I'm actively building it, one algorithm at a time. From predictive finance models to dynamic full-stack applications, I craft solutions that perform.",
        image: "https://placehold.co/400",
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
            id: "new-1",
            name: "AI-Powered Financial Statement Analyzer (v1.2 PRO)",
            description: "A Financial Intelligence Platform that transforms static PDF reports into actionable investment insights in seconds. Features a 3-Stage Analysis Pipeline: Extraction Lab, Analysis Desk, and AI War Room.",
            techStack: ["Python", "Streamlit", "Gemini 1.5", "Pandas", "Plotly"],
            image: "/fin_analyzer_dashboard.png",
            githubLink: "https://lnkd.in/gQDP5tVq",
            liveLink: "",
            role: "Lead Developer & Architect",
            featured: true
        },
        {
            id: "new-2",
            name: "MoodSync - AI Recommendation Engine",
            description: "An intelligent recommendation engine that analyzes the 'DNA' of your favorite content using TF-IDF and Cosine Similarity to suggest hidden gems based on genres, descriptions, and authors.",
            techStack: ["React", "FastAPI", "Scikit-learn", "SQLite", "Python"],
            image: "/moodsync.jpg",
            githubLink: "https://github.com/ShakthiRithanya/Mood-based-movie-and-book-recomender-",
            liveLink: "",
            role: "Full Stack Developer",
            featured: true
        },
        {
            id: "new-3",
            name: "What The World Feels Like - Global Dashboard",
            description: "A Global Situation Awareness Dashboard that aggregates real-time data to measure a country’s national stress index. Features news mood analysis, currency volatility tracking, and a social tension engine.",
            techStack: ["Python", "Streamlit", "NLP", "Pandas"],
            image: "/global_dashboard.png",
            githubLink: "https://github.com/ShakthiRithanya/Global-Situation-Awareness-Dashboard",
            liveLink: "",
            role: "Data Scientist & Developer",
            featured: true
        },
        {
            id: "new-4",
            name: "Path Finder - BFS vs DFS Algorithm Visualizer",
            description: "An interactive web application visualizing BFS and DFS algorithms in real-time. Created to compare performance metrics like execution time and path length within randomized mazes.",
            techStack: ["Vanilla JS", "HTML5 Canvas", "Chart.js", "CSS3"],
            image: "/pathfinder.png",
            githubLink: "https://lnkd.in/gUfZSvs4",
            liveLink: "",
            role: "Frontend Developer & Algorithm Engineer",
            featured: true
        },
        {
            id: "new-5",
            name: "Healthcare Risk Prediction System",
            description: "A full-stack ML application for efficient patient risk assessment. Features intelligent risk stratification using K-means & PCA, role-based access control, and privacy-focused dashboarding.",
            techStack: ["Python", "Flask", "scikit-learn", "Pandas", "SQLite"],
            image: "/healthcare_dashboard.png",
            githubLink: "https://lnkd.in/gjr_mS-Y",
            liveLink: "",
            role: "Full Stack ML Engineer",
            featured: true
        },
        {
            id: "new-6",
            name: "Neuroverse Galaxy Fundraiser",
            description: "A full-stack event management platform for the 'Neuroverse Galaxy' charity event. Features secure student authentication, stall booking, and a real-time admin dashboard.",
            techStack: ["React", "Node.js", "Express.js", "Prisma", "SQLite"],
            image: "/neuroverse_galaxy.png",
            githubLink: "https://github.com/ShakthiRithanya/neuroverse-galaxy-fundraiser",
            liveLink: "",
            role: "Full Stack Developer",
            featured: true
        },
        {
            id: "new-7",
            name: "VoiceSync AI - Voice-to-Task Assistant",
            description: "An elite voice-to-task dashboard powered by LLaMA 3.1. Transforms natural speech into a perfectly organized timeline using high-precision math for second-accurate reminders and a premium glassmorphism UI.",
            techStack: ["Vanilla JS", "Node.js", "Express.js", "Groq SDK (LLaMA 3.1)", "Web Speech API"],
            image: "/voicesync.png",
            githubLink: "https://github.com/ShakthiRithanya/VoiceSync-AI",
            liveLink: "",
            role: "Full Stack AI Developer",
            featured: true
        },
        {
            id: "new-8",
            name: "Resume Skill Gap Analyzer",
            description: "A career intelligence platform that parses resumes, compares them against job descriptions, and provides visualized skill gap analysis with a personalized learning roadmap.",
            techStack: ["Streamlit", "Python", "Regex", "Fuzzy Matching", "Plotly"],
            image: "/career_analyzer.png",
            githubLink: "https://github.com/ShakthiRithanya/Career-Skill-Gap-Analyzer",
            liveLink: "",
            role: "Data Scientist & Developer",
            featured: true
        },
        {
            id: "1",
            name: "Project Name",
            description: "What it does: [Describe the project's purpose and impact]\n\nTech used: [List technologies]\n\nYour role: [Your contribution]",
            techStack: ["Python", "TensorFlow", "React"],
            role: "Full Stack Developer",
            githubLink: "https://github.com/ShakthiRithanya",
            image: "https://placehold.co/600x400",
            featured: true
        },
        {
            id: "2",
            name: "Another Project",
            description: "What it does: [Describe the project]\n\nTech used: [Technologies]\n\nYour role: [Your role]",
            techStack: ["Python", "FastAPI", "PostgreSQL"],
            role: "Backend Developer",
            githubLink: "https://github.com/ShakthiRithanya",
            image: "https://placehold.co/600x400",
            featured: false
        }
    ],
    experiences: [
        {
            id: "1",
            title: "Achievement Title",
            organization: "Organization Name",
            description: "Description of achievement or experience",
            date: "2024",
            type: "achievement"
        },
        {
            id: "2",
            title: "Experience Title",
            organization: "Company/Organization",
            description: "What you did and learned",
            date: "2023-2024",
            type: "experience"
        }
    ]
};

// Storage utilities
export const storage = {
    getData: (): PortfolioData => {
        const stored = localStorage.getItem('portfolio_data_v15');
        return stored ? JSON.parse(stored) : defaultData;
    },

    saveData: (data: PortfolioData) => {
        localStorage.setItem('portfolio_data_v15', JSON.stringify(data));
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
