import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { storage } from '../types';

export function HeroSection() {
    const [data, setData] = useState(storage.getData().profile);

    useEffect(() => {
        const handleStorage = () => setData(storage.getData().profile);
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            {/* Content */}
            <div className="relative z-20 max-w-6xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Greeting */}
                    <motion.p
                        className="text-xl md:text-2xl font-mono text-cyber-blue mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Hi, I'm
                    </motion.p>

                    {/* Name */}
                    <motion.h1
                        className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-gradient mb-6 text-3d"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {data.name}
                    </motion.h1>

                    {/* Headline */}
                    <motion.h2
                        className="text-2xl md:text-4xl lg:text-5xl font-display font-semibold text-cyber-dark mb-8 max-w-4xl mx-auto leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        {data.headline}
                    </motion.h2>

                    {/* Bio */}
                    <motion.p
                        className="text-lg md:text-xl text-cyber-text opacity-80 max-w-3xl mx-auto mb-12 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        {data.bio}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-wrap gap-6 justify-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <button
                            onClick={scrollToProjects}
                            className="btn-primary text-lg px-8 py-4 flex items-center gap-3 group"
                        >
                            View Projects
                            <ArrowDown className="group-hover:translate-y-1 transition-transform" size={20} />
                        </button>
                        <button
                            onClick={scrollToContact}
                            className="btn-secondary text-lg px-8 py-4"
                        >
                            Contact Me
                        </button>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        className="flex gap-6 justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.4 }}
                    >
                        <a
                            href={data.contact.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass p-4 rounded-full hover-glow transition-all"
                            aria-label="GitHub"
                        >
                            <Github size={28} className="text-cyber-dark" />
                        </a>
                        <a
                            href={data.contact.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass p-4 rounded-full hover-glow transition-all"
                            aria-label="LinkedIn"
                        >
                            <Linkedin size={28} className="text-cyber-dark" />
                        </a>
                        <a
                            href={`mailto:${data.contact.email}`}
                            className="glass p-4 rounded-full hover-glow transition-all"
                            aria-label="Email"
                        >
                            <Mail size={28} className="text-cyber-dark" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, repeat: Infinity, duration: 2 }}
            >
                <div className="w-6 h-10 border-2 border-cyber-blue rounded-full flex justify-center p-2">
                    <div className="w-1 h-3 bg-cyber-blue rounded-full animate-pulse" />
                </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-cyber-blue opacity-20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyber-purple opacity-20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 right-20 w-16 h-16 bg-cyber-cyan opacity-20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        </section>
    );
}
