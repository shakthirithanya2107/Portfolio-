import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Star } from 'lucide-react';
import { storage } from '../types';

export function ProjectsSection() {
    const [data, setData] = useState(storage.getData().projects);
    const [filter, setFilter] = useState<'all' | 'featured'>('all');

    useEffect(() => {
        const handleStorage = () => setData(storage.getData().projects);
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const filteredProjects = filter === 'featured'
        ? data.filter(p => p.featured)
        : data;

    return (
        <section id="projects" className="relative py-32 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-display font-bold text-gradient mb-6">
                        Projects
                    </h2>
                    <p className="text-xl text-cyber-text opacity-70 max-w-2xl mx-auto mb-8">
                        Building solutions that matter
                    </p>

                    {/* Filter */}
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${filter === 'all' ? 'btn-primary' : 'glass-dark hover-lift'
                                }`}
                        >
                            All Projects
                        </button>
                        <button
                            onClick={() => setFilter('featured')}
                            className={`px-6 py-3 rounded-full font-semibold transition-all ${filter === 'featured' ? 'btn-primary' : 'glass-dark hover-lift'
                                }`}
                        >
                            Featured
                        </button>
                    </div>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="glass-strong rounded-3xl overflow-hidden hover-lift card-3d group"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            {/* Project Image */}
                            <div className="relative h-48 bg-gradient-to-br from-cyber-blue to-cyber-purple overflow-hidden">
                                {project.image ? (
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                                        💻
                                    </div>
                                )}
                                {project.featured && (
                                    <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full flex items-center gap-2">
                                        <Star size={16} className="text-cyber-blue fill-cyber-blue" />
                                        <span className="text-sm font-semibold">Featured</span>
                                    </div>
                                )}
                            </div>

                            {/* Project Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-display font-bold text-cyber-dark mb-3">
                                    {project.name}
                                </h3>

                                <p className="text-cyber-text opacity-70 mb-4 line-clamp-3 whitespace-pre-line">
                                    {project.description}
                                </p>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.techStack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="glass-dark px-3 py-1 rounded-full text-xs font-semibold text-cyber-blue"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div className="flex gap-3">
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 glass-dark px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover-glow transition-all"
                                    >
                                        <Github size={18} />
                                        <span className="font-semibold">GitHub</span>
                                    </a>
                                    {project.liveLink && (
                                        <a
                                            href={project.liveLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 glass-dark px-4 py-3 rounded-xl flex items-center justify-center gap-2 hover-glow transition-all"
                                        >
                                            <ExternalLink size={18} />
                                            <span className="font-semibold">Live</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-xl text-cyber-text opacity-50">
                            No projects to display. Add some in the Admin Panel!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
