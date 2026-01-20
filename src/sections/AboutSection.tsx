import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Target } from 'lucide-react';
import { storage } from '../types';

export function AboutSection() {
    const [data, setData] = useState(storage.getData().profile);

    useEffect(() => {
        const handleStorage = () => setData(storage.getData().profile);
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const cards = [
        {
            icon: <Briefcase className="w-8 h-8" />,
            title: data.role,
            description: "Building the future with AI & ML",
            bgClass: "bg-cyber-blue/10 border-cyber-blue/20",
            textClass: "text-cyber-blue"
        },
        {
            icon: <GraduationCap className="w-8 h-8" />,
            title: data.education.degree,
            description: `${data.education.college} • ${data.education.year}`,
            bgClass: "bg-cyber-purple/10 border-cyber-purple/20",
            textClass: "text-cyber-purple"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Focus Areas",
            description: "AI/ML • Full Stack • Data • Finance Models",
            bgClass: "bg-cyber-cyan/10 border-cyber-cyan/20",
            textClass: "text-cyber-cyan"
        }
    ];

    return (
        <section id="about" className="relative py-32 px-6">
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
                        About Me
                    </h2>
                    <p className="text-xl text-cyber-text opacity-70 max-w-2xl mx-auto">
                        A story of innovation, learning, and building intelligent systems
                    </p>
                </motion.div>

                {/* 3D Cards Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {cards.map((card, index) => (
                        <motion.div
                            key={index}
                            className="glass-strong rounded-3xl p-8 hover-lift card-3d group"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className={`w-16 h-16 rounded-2xl ${card.bgClass} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <div className={card.textClass}>
                                    {card.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-display font-bold text-cyber-dark mb-3">
                                {card.title}
                            </h3>
                            <p className="text-cyber-text opacity-70 leading-relaxed">
                                {card.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bio Card */}
                <motion.div
                    className="glass-strong rounded-3xl p-12 max-w-4xl mx-auto"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        {data.image && (
                            <div className="w-48 h-48 rounded-full overflow-hidden glass glow-blue flex-shrink-0">
                                <img
                                    src={data.image}
                                    alt={data.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                        <div className="flex-1">
                            <h3 className="text-3xl font-display font-bold text-gradient mb-4">
                                The Journey
                            </h3>
                            <p className="text-lg text-cyber-text opacity-80 leading-relaxed mb-4">
                                {data.bio}
                            </p>
                            <div className="flex flex-wrap gap-4 mt-6">
                                <div className="glass-dark px-6 py-3 rounded-full">
                                    <span className="font-semibold text-cyber-blue">Graduation:</span> {data.education.graduation}
                                </div>
                                <div className="glass-dark px-6 py-3 rounded-full">
                                    <span className="font-semibold text-cyber-purple">Location:</span> India
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-cyber-blue opacity-10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyber-purple opacity-10 rounded-full blur-3xl" />
        </section>
    );
}
