import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Image } from 'lucide-react';
import { storage } from '../../storage';
import type { Project } from '../../types';

export function ProjectsEditor() {
    const [projects, setProjects] = useState<Project[]>(storage.getData().projects);

    const addProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            title: 'New Project',
            description: 'Project description',
            image: '',
            technologies: [],
            githubLink: '',
            liveLink: '',
            featured: false,
        };
        setProjects([...projects, newProject]);
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setProjects(projects.map(project =>
            project.id === id ? { ...project, ...updates } : project
        ));
    };

    const deleteProject = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            setProjects(projects.filter(project => project.id !== id));
        }
    };

    const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateProject(id, { image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleTechnologiesChange = (id: string, value: string) => {
        const technologies = value.split(',').map(t => t.trim()).filter(t => t);
        updateProject(id, { technologies });
    };

    const handleSave = () => {
        storage.updateSection('projects', projects);
        window.dispatchEvent(new Event('storage'));
        alert('Projects saved successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-purple-700">Edit Projects</h2>
                <motion.button
                    onClick={addProject}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Plus size={18} className="inline mr-2" />
                    Add Project
                </motion.button>
            </div>

            <div className="space-y-4">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-dark rounded-2xl p-6 space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold text-purple-700">Project #{index + 1}</h3>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={project.featured}
                                        onChange={(e) => updateProject(project.id, { featured: e.target.checked })}
                                        className="w-4 h-4 rounded"
                                    />
                                    <span className="text-sm font-semibold text-gray-700">Featured</span>
                                </label>
                            </div>
                            <motion.button
                                onClick={() => deleteProject(project.id)}
                                className="p-2 rounded-full glass hover:bg-red-100 text-red-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Trash2 size={18} />
                            </motion.button>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-700">Project Image</label>
                            <div className="flex gap-4 items-center">
                                <div className="w-32 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center">
                                    {project.image ? (
                                        <img src={project.image} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-4xl">💻</span>
                                    )}
                                </div>
                                <label className="btn-primary cursor-pointer text-sm">
                                    <Image size={16} className="inline mr-2" />
                                    Upload
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(project.id, e)}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-700">Title</label>
                            <input
                                type="text"
                                value={project.title}
                                onChange={(e) => updateProject(project.id, { title: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-700">Description</label>
                            <textarea
                                value={project.description}
                                onChange={(e) => updateProject(project.id, { description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-700">
                                Technologies (comma-separated)
                            </label>
                            <input
                                type="text"
                                value={project.technologies.join(', ')}
                                onChange={(e) => handleTechnologiesChange(project.id, e.target.value)}
                                className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                                placeholder="React, TypeScript, Node.js"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">GitHub Link</label>
                                <input
                                    type="url"
                                    value={project.githubLink}
                                    onChange={(e) => updateProject(project.id, { githubLink: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Live Link (Optional)</label>
                                <input
                                    type="url"
                                    value={project.liveLink || ''}
                                    onChange={(e) => updateProject(project.id, { liveLink: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-12 glass-dark rounded-2xl">
                    <p className="text-gray-600">No projects added yet. Click "Add Project" to get started!</p>
                </div>
            )}

            <motion.button
                onClick={handleSave}
                className="btn-primary w-full py-4 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Save size={20} className="inline mr-2" />
                Save All Projects
            </motion.button>
        </div>
    );
}
