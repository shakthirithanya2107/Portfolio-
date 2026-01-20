// Data types for portfolio content
export interface AboutData {
    name: string;
    title: string;
    bio: string;
    image: string;
    email: string;
    phone: string;
    location: string;
    social: {
        github: string;
        linkedin: string;
        twitter: string;
    };
}

export interface Skill {
    id: string;
    name: string;
    level: number; // 0-100
    category: string;
    icon: string;
}

export interface Activity {
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'achievement' | 'participation';
    image: string;
    link?: string;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubLink: string;
    liveLink?: string;
    featured: boolean;
}

export interface ResumeData {
    pdfUrl: string;
    lastUpdated: string;
}

export interface PortfolioData {
    about: AboutData;
    skills: Skill[];
    activities: Activity[];
    projects: Project[];
    resume: ResumeData;
}

// Default data
export const defaultData: PortfolioData = {
    about: {
        name: "Your Name",
        title: "Full Stack Developer & Designer",
        bio: "Passionate developer with a keen eye for design and a love for creating beautiful, functional web experiences. Specialized in modern web technologies and 3D interactive interfaces.",
        image: "/default-avatar.png",
        email: "your.email@example.com",
        phone: "+1 234 567 8900",
        location: "San Francisco, CA",
        social: {
            github: "https://github.com/yourusername",
            linkedin: "https://linkedin.com/in/yourusername",
            twitter: "https://twitter.com/yourusername"
        }
    },
    skills: [
        { id: '1', name: 'React', level: 90, category: 'Frontend', icon: '⚛️' },
        { id: '2', name: 'TypeScript', level: 85, category: 'Language', icon: '📘' },
        { id: '3', name: 'Three.js', level: 75, category: 'Graphics', icon: '🎨' },
        { id: '4', name: 'Node.js', level: 80, category: 'Backend', icon: '🟢' },
        { id: '5', name: 'Python', level: 85, category: 'Language', icon: '🐍' },
        { id: '6', name: 'UI/UX Design', level: 88, category: 'Design', icon: '✨' },
    ],
    activities: [
        {
            id: '1',
            title: 'Hackathon Winner',
            description: 'Won first place at XYZ Hackathon for innovative web solution',
            date: '2024-01-15',
            type: 'achievement',
            image: '/activity1.jpg',
            link: 'https://example.com'
        },
        {
            id: '2',
            title: 'Tech Conference Speaker',
            description: 'Presented on Modern Web Development at Tech Summit 2024',
            date: '2024-03-20',
            type: 'participation',
            image: '/activity2.jpg'
        }
    ],
    projects: [
        {
            id: '1',
            title: '3D Portfolio Website',
            description: 'An interactive 3D portfolio showcasing projects with stunning visual effects',
            image: '/project1.jpg',
            technologies: ['React', 'Three.js', 'TypeScript', 'Tailwind CSS'],
            githubLink: 'https://github.com/yourusername/portfolio',
            liveLink: 'https://yourportfolio.com',
            featured: true
        },
        {
            id: '2',
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with payment integration',
            image: '/project2.jpg',
            technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
            githubLink: 'https://github.com/yourusername/ecommerce',
            featured: false
        }
    ],
    resume: {
        pdfUrl: '/resume.pdf',
        lastUpdated: new Date().toISOString()
    }
};
