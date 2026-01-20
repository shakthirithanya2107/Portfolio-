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
        bio: "I build AI, ML, and intelligent systems. Passionate about creating innovative solutions that bridge technology and real-world problems. Currently pursuing BE CSE (AI & ML) at KGISL Institute of Technology.",
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
        }
    ],
    projects: [
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
        const stored = localStorage.getItem('portfolio_data_v3');
        return stored ? JSON.parse(stored) : defaultData;
    },

    saveData: (data: PortfolioData) => {
        localStorage.setItem('portfolio_data_v3', JSON.stringify(data));
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
