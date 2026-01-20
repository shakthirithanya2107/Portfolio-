import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { storage } from '../types';

export function SkillsSection() {
    const [data, setData] = useState(storage.getData().skills);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    useEffect(() => {
        const handleStorage = () => setData(storage.getData().skills);
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <section id="skills" className="relative py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-display font-bold text-gradient mb-6">
                        Skills Galaxy
                    </h2>
                    <p className="text-xl text-cyber-text opacity-70 max-w-2xl mx-auto">
                        Exploring the universe of technologies and capabilities
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                    {data.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            className="relative group"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredSkill(skill.id)}
                            onMouseLeave={() => setHoveredSkill(null)}
                        >
                            {/* Skill Orb */}
                            <div
                                className="aspect-square glass-strong rounded-full flex flex-col items-center justify-center p-6 hover-glow cursor-pointer transition-all duration-300"
                                style={{
                                    boxShadow: hoveredSkill === skill.id ? `0 0 40px ${skill.color}80` : undefined,
                                    transform: hoveredSkill === skill.id ? 'scale(1.1) translateY(-10px)' : undefined
                                }}
                            >
                                <div className="text-5xl mb-2 animate-float">{skill.icon}</div>
                                <div className="text-sm font-semibold text-center text-cyber-dark">{skill.name}</div>
                            </div>

                            {/* Hover Popup */}
                            {hoveredSkill === skill.id && (
                                <motion.div
                                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 z-50"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="glass-strong rounded-2xl p-4 min-w-[200px] shadow-2xl">
                                        <div className="text-sm font-semibold text-cyber-dark mb-2">{skill.category}</div>
                                        <div className="w-full bg-cyber-gray rounded-full h-2 mb-2">
                                            <motion.div
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: skill.color }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${skill.level}%` }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                            />
                                        </div>
                                        <div className="text-xs text-cyber-text opacity-70">
                                            Proficiency: {skill.level}%
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Categories */}
                <motion.div
                    className="flex flex-wrap gap-4 justify-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    {Array.from(new Set(data.map(s => s.category))).map((category) => (
                        <div key={category} className="glass-dark px-6 py-3 rounded-full">
                            <span className="font-semibold text-cyber-dark">{category}</span>
                            <span className="ml-2 text-cyber-text opacity-70">
                                ({data.filter(s => s.category === category).length})
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-cyber-blue opacity-10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyber-purple opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cyber-cyan opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </section>
    );
}
