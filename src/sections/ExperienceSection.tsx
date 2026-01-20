import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Briefcase, GraduationCap } from 'lucide-react';
import { storage } from '../types';

export function ExperienceSection() {
    const [data, setData] = useState(storage.getData().experiences);

    useEffect(() => {
        const handleStorage = () => setData(storage.getData().experiences);
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case 'achievement':
                return <Trophy className="w-6 h-6" />;
            case 'experience':
                return <Briefcase className="w-6 h-6" />;
            case 'education':
                return <GraduationCap className="w-6 h-6" />;
            default:
                return <Briefcase className="w-6 h-6" />;
        }
    };

    return (
        <section id="experience" className="relative py-32 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-display font-bold text-gradient mb-6">
                        Experience & Achievements
                    </h2>
                    <p className="text-xl text-cyber-text opacity-70">
                        Milestones in my journey
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-blue via-cyber-purple to-cyber-pink" />

                    {/* Timeline Items */}
                    {data.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                                }`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            {/* Timeline Dot */}
                            <div className={`absolute top-6 ${index % 2 === 0 ? 'md:right-0 left-6' : 'md:left-0 left-6'
                                } md:left-1/2 w-4 h-4 bg-cyber-blue rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10`} />

                            {/* Content Card */}
                            <div className="glass-strong rounded-2xl p-6 ml-16 md:ml-0 hover-lift">
                                <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:justify-end' : ''
                                    }`}>
                                    <div className="w-10 h-10 rounded-full bg-cyber-blue/10 flex items-center justify-center text-cyber-blue border border-cyber-blue/20">
                                        {getIcon(exp.type)}
                                    </div>
                                    <span className="text-sm font-mono text-cyber-blue">{exp.date}</span>
                                </div>
                                <h3 className="text-2xl font-display font-bold text-cyber-dark mb-2">
                                    {exp.title}
                                </h3>
                                <p className="text-cyber-purple font-semibold mb-3">{exp.organization}</p>
                                <p className="text-cyber-text opacity-70">{exp.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {data.length === 0 && (
                    <div className="text-center py-20 glass-strong rounded-3xl">
                        <p className="text-xl text-cyber-text opacity-50">
                            No experiences added yet. Add some in the Admin Panel!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
