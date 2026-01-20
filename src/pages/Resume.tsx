import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Download, Calendar, FileText } from 'lucide-react';
import { storage } from '../storage';
import type { ResumeData } from '../types';

export function Resume() {
    const [resumeData, setResumeData] = useState<ResumeData>(storage.getData().resume);

    useEffect(() => {
        const handleStorage = () => {
            setResumeData(storage.getData().resume);
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const handleDownload = () => {
        if (resumeData.pdfUrl && resumeData.pdfUrl !== '/resume.pdf') {
            const link = document.createElement('a');
            link.href = resumeData.pdfUrl;
            link.download = 'resume.pdf';
            link.click();
        } else {
            alert('Please upload a resume in the Admin Console first!');
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-6xl font-bold text-gradient mb-4 text-3d">
                        My Resume
                    </h1>
                    <p className="text-xl text-gray-700">
                        Download my professional resume
                    </p>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-3xl p-12 text-center relative overflow-hidden"
                >
                    {/* Decorative Background Elements */}
                    <motion.div
                        className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20"
                        style={{
                            background: 'radial-gradient(circle, rgba(255, 214, 232, 0.8), transparent)',
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            x: [-20, 20, -20],
                            y: [-20, 20, -20],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-0 w-64 h-64 rounded-full opacity-20"
                        style={{
                            background: 'radial-gradient(circle, rgba(230, 217, 255, 0.8), transparent)',
                        }}
                        animate={{
                            scale: [1.2, 1, 1.2],
                            x: [20, -20, 20],
                            y: [20, -20, 20],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* Resume Icon */}
                    <motion.div
                        className="inline-block mb-8 relative"
                        animate={{
                            y: [0, -10, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    >
                        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky rounded-3xl flex items-center justify-center glow-lavender">
                            <FileText size={64} className="text-purple-700" />
                        </div>
                    </motion.div>

                    {/* Last Updated */}
                    <motion.div
                        className="flex items-center justify-center gap-2 text-gray-600 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Calendar size={18} />
                        <span className="text-sm">
                            Last Updated:{' '}
                            {new Date(resumeData.lastUpdated).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </span>
                    </motion.div>

                    {/* Download Button */}
                    <motion.button
                        onClick={handleDownload}
                        className="btn-primary inline-flex items-center gap-3 text-lg relative z-10"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <Download size={24} />
                        Download Resume
                    </motion.button>

                    {/* Preview Section */}
                    {resumeData.pdfUrl && resumeData.pdfUrl !== '/resume.pdf' && (
                        <motion.div
                            className="mt-12 glass-dark rounded-2xl p-8 relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <h3 className="text-2xl font-bold text-purple-700 mb-4">
                                Resume Preview
                            </h3>
                            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
                                {resumeData.pdfUrl.endsWith('.pdf') ? (
                                    <iframe
                                        src={resumeData.pdfUrl}
                                        className="w-full h-[600px]"
                                        title="Resume Preview"
                                    />
                                ) : (
                                    <img
                                        src={resumeData.pdfUrl}
                                        alt="Resume"
                                        className="w-full h-auto"
                                    />
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Info Cards */}
                    <motion.div
                        className="grid md:grid-cols-3 gap-6 mt-12 relative z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <div className="glass-dark rounded-2xl p-6">
                            <div className="text-4xl mb-2">📄</div>
                            <h4 className="font-bold text-purple-700 mb-1">Professional</h4>
                            <p className="text-sm text-gray-600">
                                Comprehensive work history and achievements
                            </p>
                        </div>
                        <div className="glass-dark rounded-2xl p-6">
                            <div className="text-4xl mb-2">🎓</div>
                            <h4 className="font-bold text-purple-700 mb-1">Education</h4>
                            <p className="text-sm text-gray-600">
                                Academic background and certifications
                            </p>
                        </div>
                        <div className="glass-dark rounded-2xl p-6">
                            <div className="text-4xl mb-2">💼</div>
                            <h4 className="font-bold text-purple-700 mb-1">Skills</h4>
                            <p className="text-sm text-gray-600">
                                Technical expertise and competencies
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
