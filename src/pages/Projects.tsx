import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Github, ExternalLink, Star } from 'lucide-react';
import { storage } from '../storage';
import type { Project } from '../types';

export function Projects() {
    const [projects, setProjects] = useState<Project[]>(storage.getData().projects);
    const [filter, setFilter] = useState<'all' | 'featured'>('all');

    useEffect(() => {
        const handleStorage = () => {
            setProjects(storage.getData().projects);
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.featured);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0, rotateX: -15 },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
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
                        My Projects
                    </h1>
                    <p className="text-xl text-gray-700 mb-8">
                        Showcasing my creative work and technical expertise
                    </p>

                    {/* Filter Buttons */}
                    <div className="flex justify-center gap-4">
                        <motion.button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${filter === 'all'
                                ? 'glass-dark text-purple-700 glow-lavender'
                                : 'glass text-gray-700'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            All Projects
                        </motion.button>
                        <motion.button
                            onClick={() => setFilter('featured')}
                            className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 ${filter === 'featured'
                                ? 'glass-dark text-purple-700 glow-lavender'
                                : 'glass text-gray-700'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Star size={18} />
                            Featured
                        </motion.button>
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={itemVariants}
                            className="glass rounded-3xl overflow-hidden hover-lift card-3d group relative"
                            whileHover={{ y: -10 }}
                        >
                            {/* Featured Badge */}
                            {project.featured && (
                                <motion.div
                                    className="absolute top-4 right-4 z-10 bg-pastel-yellow px-3 py-1 rounded-full flex items-center gap-1 shadow-lg"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    <Star size={14} className="text-purple-700" fill="currentColor" />
                                    <span className="text-xs font-bold text-purple-700">Featured</span>
                                </motion.div>
                            )}

                            {/* Project Image */}
                            <motion.div
                                className="relative h-56 bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky overflow-hidden"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.4 }}
                            >
                                {project.image && (project.image.startsWith('http') || project.image.startsWith('/')) ? (
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-8xl">
                                        💻
                                    </div>
                                )}

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div className="flex gap-3">
                                        <motion.a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white rounded-full hover:bg-pastel-pink transition-colors"
                                            whileHover={{ scale: 1.2, rotate: 360 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Github size={20} className="text-purple-700" />
                                        </motion.a>
                                        {project.liveLink && (
                                            <motion.a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 bg-white rounded-full hover:bg-pastel-lavender transition-colors"
                                                whileHover={{ scale: 1.2, rotate: 360 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <ExternalLink size={20} className="text-purple-700" />
                                            </motion.a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Project Info */}
                            <div className="p-6">
                                <h3 className="text-2xl font-bold text-purple-700 mb-3">
                                    {project.title}
                                </h3>
                                <p className="text-gray-700 mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, i) => (
                                        <motion.span
                                            key={i}
                                            className="px-3 py-1 bg-white bg-opacity-50 rounded-full text-xs font-semibold text-purple-600"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: index * 0.1 + i * 0.05 }}
                                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(230, 217, 255, 0.8)' }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>

                            {/* Decorative Element */}
                            <motion.div
                                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full opacity-20"
                                style={{
                                    background: 'radial-gradient(circle, rgba(230, 217, 255, 0.8), transparent)',
                                }}
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        className="text-center py-20 glass rounded-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-2xl text-gray-600">
                            No projects found
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
