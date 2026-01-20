import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { storage } from '../storage';
import type { Skill } from '../types';

export function Skills() {
    const [skills, setSkills] = useState<Skill[]>(storage.getData().skills);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    useEffect(() => {
        const handleStorage = () => {
            setSkills(storage.getData().skills);
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const categories = ['All', ...Array.from(new Set(skills.map((s) => s.category)))];
    const filteredSkills = selectedCategory === 'All'
        ? skills
        : skills.filter((s) => s.category === selectedCategory);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 15,
            },
        },
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl font-bold text-gradient mb-4 text-3d">
                        My Skills
                    </h1>
                    <p className="text-xl text-gray-700">
                        Technologies and tools I work with
                    </p>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${selectedCategory === category
                                ? 'glass-dark text-purple-700 glow-lavender'
                                : 'glass text-gray-700'
                                }`}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredSkills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            variants={itemVariants}
                            className="glass rounded-3xl p-6 hover-lift card-3d relative overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                            style={{
                                background: `linear-gradient(135deg, rgba(255, 214, 232, 0.3), rgba(230, 217, 255, 0.3))`,
                            }}
                        >
                            {/* Skill Icon */}
                            <motion.div
                                className="text-6xl mb-4 text-center"
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: index * 0.2,
                                }}
                            >
                                {skill.icon}
                            </motion.div>

                            {/* Skill Name */}
                            <h3 className="text-2xl font-bold text-center mb-2 text-purple-700">
                                {skill.name}
                            </h3>

                            {/* Category Badge */}
                            <div className="text-center mb-4">
                                <span className="inline-block px-3 py-1 bg-white bg-opacity-50 rounded-full text-sm font-semibold text-purple-600">
                                    {skill.category}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-3 bg-white bg-opacity-30 rounded-full overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 h-full rounded-full"
                                    style={{
                                        background: 'linear-gradient(90deg, #FFD6E8, #E6D9FF, #D9E8FF)',
                                    }}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${skill.level}%` }}
                                    transition={{
                                        duration: 1,
                                        delay: index * 0.1,
                                        ease: 'easeOut',
                                    }}
                                />
                            </div>

                            {/* Level Percentage */}
                            <motion.div
                                className="text-center mt-2 font-bold text-purple-600"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                            >
                                {skill.level}%
                            </motion.div>

                            {/* Floating Decoration */}
                            <motion.div
                                className="absolute -top-2 -right-2 w-16 h-16 rounded-full"
                                style={{
                                    background: 'radial-gradient(circle, rgba(255, 214, 232, 0.6), transparent)',
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.15,
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredSkills.length === 0 && (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-2xl text-gray-600">
                            No skills found in this category
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
