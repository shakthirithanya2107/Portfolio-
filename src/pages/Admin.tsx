import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Code, Award, FolderGit2, FileText, Download, Upload, Trash2, Save } from 'lucide-react';
import { storage } from '../storage';
import { AboutEditor } from '../components/Admin/AboutEditor';
import { SkillsEditor } from '../components/Admin/SkillsEditor';
import { ActivitiesEditor } from '../components/Admin/ActivitiesEditor';
import { ProjectsEditor } from '../components/Admin/ProjectsEditor';
import { ResumeEditor } from '../components/Admin/ResumeEditor';

type Tab = 'about' | 'skills' | 'activities' | 'projects' | 'resume';

export function Admin() {
    const [activeTab, setActiveTab] = useState<Tab>('about');
    const [showExportModal, setShowExportModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    const tabs = [
        { id: 'about' as Tab, label: 'About', icon: User },
        { id: 'skills' as Tab, label: 'Skills', icon: Code },
        { id: 'activities' as Tab, label: 'Activities', icon: Award },
        { id: 'projects' as Tab, label: 'Projects', icon: FolderGit2 },
        { id: 'resume' as Tab, label: 'Resume', icon: FileText },
    ];

    const handleExport = () => {
        const data = storage.exportData();
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        setShowExportModal(false);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target?.result as string;
                if (storage.importData(content)) {
                    alert('Data imported successfully!');
                    window.location.reload();
                } else {
                    alert('Failed to import data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
        setShowImportModal(false);
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all data to defaults? This cannot be undone!')) {
            storage.reset();
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-6xl font-bold text-gradient mb-4 text-3d">
                        Admin Console
                    </h1>
                    <p className="text-xl text-gray-700">
                        Manage your portfolio content
                    </p>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.button
                        onClick={() => setShowExportModal(true)}
                        className="glass px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover-lift"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Download size={18} />
                        Export Data
                    </motion.button>
                    <motion.button
                        onClick={() => setShowImportModal(true)}
                        className="glass px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover-lift"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Upload size={18} />
                        Import Data
                    </motion.button>
                    <motion.button
                        onClick={handleReset}
                        className="glass px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover-lift text-red-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Trash2 size={18} />
                        Reset to Default
                    </motion.button>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    className="glass rounded-3xl p-2 mb-8 flex flex-wrap gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 min-w-[120px] px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === tab.id
                                        ? 'glass-dark text-purple-700 glow-lavender'
                                        : 'text-gray-700 hover:bg-white hover:bg-opacity-30'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Icon size={20} />
                                {tab.label}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="glass rounded-3xl p-8"
                    >
                        {activeTab === 'about' && <AboutEditor />}
                        {activeTab === 'skills' && <SkillsEditor />}
                        {activeTab === 'activities' && <ActivitiesEditor />}
                        {activeTab === 'projects' && <ProjectsEditor />}
                        {activeTab === 'resume' && <ResumeEditor />}
                    </motion.div>
                </AnimatePresence>

                {/* Export Modal */}
                <AnimatePresence>
                    {showExportModal && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowExportModal(false)}
                        >
                            <motion.div
                                className="glass rounded-3xl p-8 max-w-md w-full"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-2xl font-bold text-purple-700 mb-4">
                                    Export Portfolio Data
                                </h3>
                                <p className="text-gray-700 mb-6">
                                    This will download all your portfolio data as a JSON file. You can use this to backup or transfer your data.
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={handleExport}
                                        className="btn-primary flex-1"
                                    >
                                        <Download size={18} className="inline mr-2" />
                                        Export
                                    </button>
                                    <button
                                        onClick={() => setShowExportModal(false)}
                                        className="glass px-6 py-3 rounded-full font-semibold flex-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Import Modal */}
                <AnimatePresence>
                    {showImportModal && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowImportModal(false)}
                        >
                            <motion.div
                                className="glass rounded-3xl p-8 max-w-md w-full"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0.9 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h3 className="text-2xl font-bold text-purple-700 mb-4">
                                    Import Portfolio Data
                                </h3>
                                <p className="text-gray-700 mb-6">
                                    Select a JSON file to import. This will replace all current data.
                                </p>
                                <div className="flex gap-4">
                                    <label className="btn-primary flex-1 cursor-pointer text-center">
                                        <Upload size={18} className="inline mr-2" />
                                        Choose File
                                        <input
                                            type="file"
                                            accept=".json"
                                            onChange={handleImport}
                                            className="hidden"
                                        />
                                    </label>
                                    <button
                                        onClick={() => setShowImportModal(false)}
                                        className="glass px-6 py-3 rounded-full font-semibold flex-1"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
