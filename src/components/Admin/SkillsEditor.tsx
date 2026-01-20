import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2 } from 'lucide-react';
import { storage } from '../../storage';
import type { Skill } from '../../types';

export function SkillsEditor() {
    const [skills, setSkills] = useState<Skill[]>(storage.getData().skills);

    const addSkill = () => {
        const newSkill: Skill = {
            id: Date.now().toString(),
            name: 'New Skill',
            level: 50,
            category: 'General',
            icon: '⭐',
        };
        setSkills([...skills, newSkill]);
    };

    const updateSkill = (id: string, updates: Partial<Skill>) => {
        setSkills(skills.map(skill =>
            skill.id === id ? { ...skill, ...updates } : skill
        ));
    };

    const deleteSkill = (id: string) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            setSkills(skills.filter(skill => skill.id !== id));
        }
    };

    const handleSave = () => {
        storage.updateSection('skills', skills);
        window.dispatchEvent(new Event('storage'));
        alert('Skills saved successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-purple-700">Edit Skills</h2>
                <motion.button
                    onClick={addSkill}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Plus size={18} className="inline mr-2" />
                    Add Skill
                </motion.button>
            </div>

            <div className="space-y-4">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-dark rounded-2xl p-6 space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-purple-700">Skill #{index + 1}</h3>
                            <motion.button
                                onClick={() => deleteSkill(skill.id)}
                                className="p-2 rounded-full glass hover:bg-red-100 text-red-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Trash2 size={18} />
                            </motion.button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Skill Name</label>
                                <input
                                    type="text"
                                    value={skill.name}
                                    onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Category</label>
                                <input
                                    type="text"
                                    value={skill.category}
                                    onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Icon (Emoji)</label>
                                <input
                                    type="text"
                                    value={skill.icon}
                                    onChange={(e) => updateSkill(skill.id, { icon: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender text-2xl text-center"
                                    maxLength={2}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">
                                    Level: {skill.level}%
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={skill.level}
                                    onChange={(e) => updateSkill(skill.id, { level: parseInt(e.target.value) })}
                                    className="w-full"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {skills.length === 0 && (
                <div className="text-center py-12 glass-dark rounded-2xl">
                    <p className="text-gray-600">No skills added yet. Click "Add Skill" to get started!</p>
                </div>
            )}

            <motion.button
                onClick={handleSave}
                className="btn-primary w-full py-4 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Save size={20} className="inline mr-2" />
                Save All Skills
            </motion.button>
        </div>
    );
}
