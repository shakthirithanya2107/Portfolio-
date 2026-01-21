import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, Code, Briefcase, Award, Mail, FileText } from 'lucide-react';

export function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Determine active section
            const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
            const current = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'hero', label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: User },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'projects', label: 'Projects', icon: Briefcase },
        { id: 'experience', label: 'Experience', icon: Award },
        { id: 'resume', label: 'Resume', icon: FileText },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];

    const scrollToSection = (id: string) => {
        if (id === 'resume') {
            window.location.href = '/resume';
            return;
        }

        if (window.location.pathname !== '/') {
            window.location.href = '/#' + id;
            return;
        }

        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div className={`glass-strong rounded-full px-8 py-4 flex items-center justify-between transition-all ${scrolled ? 'shadow-2xl' : ''
                    }`}>
                    {/* Logo */}
                    <button
                        onClick={() => scrollToSection('hero')}
                        className="text-2xl font-display font-bold text-gradient hover:scale-105 transition-transform"
                    >
                        SR
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all ${isActive
                                        ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-cyber-dark font-bold shadow-lg'
                                        : 'text-cyber-dark hover:bg-white hover:bg-opacity-50'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="font-semibold">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Mobile Menu Button - Hidden for now */}
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
                <div className="glass-strong rounded-full px-4 py-3 flex items-center justify-around shadow-2xl">
                    {navItems.slice(0, 5).map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`p-3 rounded-full transition-all ${isActive
                                    ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-cyber-dark scale-110 shadow-lg'
                                    : 'text-cyber-dark hover:bg-white hover:bg-opacity-50'
                                    }`}
                            >
                                <Icon size={20} />
                            </button>
                        );
                    })}
                </div>
            </div>
        </motion.nav>
    );
}
