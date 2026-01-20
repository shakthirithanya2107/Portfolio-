import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { storage } from '../types';

export function SkillsSection() {
    const [data, setData] = useState(storage.getData().skills);

    useEffect(() => {
        const handleStorage = () => setData(storage.getData().skills);
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const getSkillContent = (name: string) => {
        switch (name) {
            case 'Leadership':
                return {
                    image: '/badge.png',
                    description: "Consistently served as Class Monitor from Middle School through High School, demonstrating sustained leadership and trust."
                };
            case 'Communication':
                return {
                    image: '/communication.png',
                    description: "Effective communicator with experience in public speaking and team collaboration."
                };
            case 'Team Work':
                return {
                    image: '/teamwork.png',
                    description: "Collaborating effectively with diverse groups to achieve common goals in academic and project settings."
                };
            case 'Organization':
                return {
                    image: '/organization.png',
                    description: "Detail-oriented organizer capable of managing events and complex schedules efficiently."
                };
            case 'Event Co-ordinator':
                return {
                    image: '/neurosphere.png',
                    description: "Overall Co-ordinator of Neurosphere Galaxy. Orchestrated a major fundraising event for a noble cause."
                };
            case 'Technical Mentorship':
                return {
                    image: '/workshop.png',
                    description: "Conducted hands-on technical workshops to mentor students in practical skills."
                };
            default:
                return {
                    image: 'https://placehold.co/600x400/e2e8f0/1e293b?text=Skill',
                    description: "Developing and refining this skill through continuous practice and application."
                };
        }
    };

    return (
        <section id="skills" className="relative py-32 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-display font-bold text-gradient mb-6">
                        Life Skills
                    </h2>
                    <p className="text-xl text-cyber-text opacity-70 max-w-2xl mx-auto">
                        Competencies developed through real-world experience
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {data.filter(s => s.category === 'Life Skills').map((skill, index) => {
                        const content = getSkillContent(skill.name);
                        return (
                            <motion.div
                                key={skill.id}
                                className="glass-strong rounded-3xl overflow-hidden hover-lift card-3d group"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                {/* Image Container */}
                                <div className="relative h-56 bg-gradient-to-br from-cyber-blue/5 to-cyber-purple/5 border-b border-white/10 overflow-hidden flex items-center justify-center p-6">
                                    <div className="w-full h-full flex items-center justify-center filter drop-shadow-xl group-hover:scale-110 transition-transform duration-500">
                                        <img
                                            src={content.image}
                                            alt={skill.name}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 glass px-3 py-1 rounded-full text-xs font-bold text-cyber-dark">
                                        {skill.level}% Proficiency
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl">{skill.icon}</span>
                                        <h3 className="text-2xl font-display font-bold text-cyber-dark">
                                            {skill.name}
                                        </h3>
                                    </div>

                                    <p className="text-cyber-text opacity-70 leading-relaxed mb-6 font-medium">
                                        {content.description}
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-cyber-gray/20 rounded-full h-2">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: skill.color }}
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-cyber-blue opacity-5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyber-purple opacity-5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </section>
    );
}
