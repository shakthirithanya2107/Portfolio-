import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Save, Download, Upload, RotateCcw, User, Code, Briefcase, Award } from 'lucide-react';
import { storage, type PortfolioData } from '../types';

export function AdminPanel() {
    const [data, setData] = useState<PortfolioData>(storage.getData());
    const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'projects' | 'experience'>('profile');

    const handleSave = () => {
        storage.saveData(data);
        alert('✅ Changes saved successfully!');
    };

    const handleExport = () => {
        storage.exportData();
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            storage.importData(file).then(() => {
                setData(storage.getData());
                alert('✅ Data imported successfully!');
            }).catch(() => {
                alert('❌ Failed to import data');
            });
        }
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all data?')) {
            storage.reset();
            setData(storage.getData());
            alert('✅ Data reset to defaults');
        }
    };

    const tabs = [
        { id: 'profile' as const, label: 'Profile', icon: User },
        { id: 'skills' as const, label: 'Skills', icon: Code },
        { id: 'projects' as const, label: 'Projects', icon: Briefcase },
        { id: 'experience' as const, label: 'Experience', icon: Award },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyber-light via-white to-cyber-gray py-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-5xl font-display font-bold text-gradient mb-2">Admin Panel</h1>
                        <p className="text-cyber-text opacity-70">Manage your portfolio content</p>
                    </div>
                    <Link to="/" className="btn-secondary flex items-center gap-2">
                        <Home size={20} />
                        Back to Site
                    </Link>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mb-8">
                    <button onClick={handleSave} className="btn-primary flex items-center gap-2">
                        <Save size={18} />
                        Save Changes
                    </button>
                    <button onClick={handleExport} className="glass-dark px-6 py-3 rounded-xl font-semibold hover-lift flex items-center gap-2">
                        <Download size={18} />
                        Export Data
                    </button>
                    <label className="glass-dark px-6 py-3 rounded-xl font-semibold hover-lift flex items-center gap-2 cursor-pointer">
                        <Upload size={18} />
                        Import Data
                        <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                    </label>
                    <button onClick={handleReset} className="glass-dark px-6 py-3 rounded-xl font-semibold hover-lift flex items-center gap-2 text-red-600">
                        <RotateCcw size={18} />
                        Reset
                    </button>
                </div>

                {/* Tabs */}
                <div className="glass-strong rounded-3xl p-2 mb-8 flex gap-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-white'
                                        : 'hover:bg-white hover:bg-opacity-50'
                                    }`}
                            >
                                <Icon size={20} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="glass-strong rounded-3xl p-8">
                    {activeTab === 'profile' && (
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-cyber-dark mb-6">Profile Information</h2>

                            <div>
                                <label className="block font-semibold text-cyber-dark mb-2">Name</label>
                                <input
                                    type="text"
                                    value={data.profile.name}
                                    onChange={(e) => setData({ ...data, profile: { ...data.profile, name: e.target.value } })}
                                    className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-cyber-dark mb-2">Headline</label>
                                <input
                                    type="text"
                                    value={data.profile.headline}
                                    onChange={(e) => setData({ ...data, profile: { ...data.profile, headline: e.target.value } })}
                                    className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                                />
                            </div>

                            <div>
                                <label className="block font-semibold text-cyber-dark mb-2">Bio</label>
                                <textarea
                                    value={data.profile.bio}
                                    onChange={(e) => setData({ ...data, profile: { ...data.profile, bio: e.target.value } })}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-cyber-blue resize-none"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block font-semibold text-cyber-dark mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={data.profile.contact.email}
                                        onChange={(e) => setData({ ...data, profile: { ...data.profile, contact: { ...data.profile.contact, email: e.target.value } } })}
                                        className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-cyber-dark mb-2">GitHub</label>
                                    <input
                                        type="url"
                                        value={data.profile.contact.github}
                                        onChange={(e) => setData({ ...data, profile: { ...data.profile, contact: { ...data.profile.contact, github: e.target.value } } })}
                                        className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                                    />
                                </div>
                                <div>
                                    <label className="block font-semibold text-cyber-dark mb-2">LinkedIn</label>
                                    <input
                                        type="url"
                                        value={data.profile.contact.linkedin}
                                        onChange={(e) => setData({ ...data, profile: { ...data.profile, contact: { ...data.profile.contact, linkedin: e.target.value } } })}
                                        className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-cyber-blue"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'skills' && (
                        <div>
                            <h2 className="text-3xl font-bold text-cyber-dark mb-6">Skills Management</h2>
                            <p className="text-cyber-text opacity-70 mb-6">
                                Edit skills in the browser console using: <code className="bg-cyber-gray px-2 py-1 rounded">storage.updateSkills(newSkills)</code>
                            </p>
                            <pre className="bg-cyber-gray p-4 rounded-xl overflow-auto text-sm">
                                {JSON.stringify(data.skills, null, 2)}
                            </pre>
                        </div>
                    )}

                    {activeTab === 'projects' && (
                        <div>
                            <h2 className="text-3xl font-bold text-cyber-dark mb-6">Projects Management</h2>
                            <p className="text-cyber-text opacity-70 mb-6">
                                Edit projects in the browser console using: <code className="bg-cyber-gray px-2 py-1 rounded">storage.updateProjects(newProjects)</code>
                            </p>
                            <pre className="bg-cyber-gray p-4 rounded-xl overflow-auto text-sm">
                                {JSON.stringify(data.projects, null, 2)}
                            </pre>
                        </div>
                    )}

                    {activeTab === 'experience' && (
                        <div>
                            <h2 className="text-3xl font-bold text-cyber-dark mb-6">Experience Management</h2>
                            <p className="text-cyber-text opacity-70 mb-6">
                                Edit experiences in the browser console using: <code className="bg-cyber-gray px-2 py-1 rounded">storage.updateExperiences(newExperiences)</code>
                            </p>
                            <pre className="bg-cyber-gray p-4 rounded-xl overflow-auto text-sm">
                                {JSON.stringify(data.experiences, null, 2)}
                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
