import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Download, Calendar, FileText, Mail, Github, Linkedin, ExternalLink, Globe } from 'lucide-react';
import { storage } from '../types';
import type { PortfolioData } from '../types';

export function Resume() {
    const [data, setData] = useState<PortfolioData>(storage.getData());

    useEffect(() => {
        const handleStorage = () => {
            setData(storage.getData());
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-12 no-print"
                >
                    <h1 className="text-6xl font-bold text-gradient mb-4 text-3d">
                        My Resume
                    </h1>
                    <p className="text-xl text-gray-700">
                        Generated from my portfolio data
                    </p>
                </motion.div>

                {/* Actions Bar */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass rounded-3xl p-8 mb-12 text-center no-print"
                >
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <button
                            onClick={handlePrint}
                            className="btn-primary inline-flex items-center gap-3 text-lg"
                        >
                            <Download size={24} />
                            Download / Print PDF
                        </button>

                        <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Calendar size={16} />
                            Last Updated: {new Date(data.resume?.lastUpdated || new Date()).toLocaleDateString()}
                        </div>
                    </div>
                </motion.div>

                {/* Printable Resume Preview (Visible on screen as a 'Paper' view) */}
                <div className="resume-container bg-white shadow-2xl mx-auto max-w-[210mm] min-h-[297mm] p-[10mm] md:p-[20mm] text-left text-slate-800 rounded-sm">
                    {/* Header */}
                    <header className="border-b-2 border-slate-800 pb-6 mb-6">
                        <h1 className="text-4xl font-bold text-slate-900 uppercase tracking-tight mb-2">{data.profile.name}</h1>
                        <p className="text-xl text-slate-600 font-medium mb-4">{data.profile.headline}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                            {data.profile.contact.email && (
                                <a href={`mailto:${data.profile.contact.email}`} className="flex items-center gap-1 hover:text-blue-600">
                                    <Mail size={14} /> {data.profile.contact.email}
                                </a>
                            )}
                            {data.profile.contact.linkedin && (
                                <a href={data.profile.contact.linkedin} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-blue-600">
                                    <Linkedin size={14} /> LinkedIn
                                </a>
                            )}
                            {data.profile.contact.github && (
                                <a href={data.profile.contact.github} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-blue-600">
                                    <Github size={14} /> GitHub
                                </a>
                            )}
                            <span className="flex items-center gap-1">
                                <Globe size={14} /> Portfolio
                            </span>
                        </div>
                    </header>

                    {/* Summary */}
                    <section className="mb-6">
                        <h2 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3 tracking-wider">Professional Summary</h2>
                        <p className="text-sm leading-relaxed text-slate-700">{data.profile.bio}</p>
                    </section>

                    {/* Education */}
                    <section className="mb-6">
                        <h2 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3 tracking-wider">Education</h2>
                        <div className="mb-2">
                            <div className="flex justify-between items-baseline mb-1">
                                <h3 className="font-bold text-slate-800">{data.profile.education.college}</h3>
                                <span className="text-sm font-medium text-slate-600">{data.profile.education.year} ({data.profile.education.graduation})</span>
                            </div>
                            <p className="text-sm text-slate-700 italic">{data.profile.education.degree}</p>
                        </div>
                    </section>

                    {/* Skills */}
                    <section className="mb-6">
                        <h2 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3 tracking-wider">Technical Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill) => (
                                <span key={skill.id} className="bg-slate-100 text-slate-700 px-2 py-1 rounded text-xs font-semibold border border-slate-200 print:border-slate-400">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Projects */}
                    <section className="mb-6">
                        <h2 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3 tracking-wider">Key Projects</h2>
                        <div className="space-y-4">
                            {data.projects.filter(p => p.featured).slice(0, 5).map((project) => (
                                <div key={project.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-slate-800 text-base">{project.name}</h3>
                                        {project.githubLink && (
                                            <a href={project.githubLink} className="text-xs text-blue-600 print:no-underline">Code</a>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-700 mb-1">{project.description}</p>
                                    <div className="text-xs text-slate-500">
                                        <span className="font-semibold">Tech Stack:</span> {project.techStack.join(", ")}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience / Achievements */}
                    <section className="mb-6">
                        <h2 className="text-lg font-bold text-slate-900 uppercase border-b border-slate-300 pb-1 mb-3 tracking-wider">Experience & Achievements</h2>
                        <div className="space-y-4">
                            {data.experiences.map((exp) => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-slate-800 text-sm">{exp.title}</h3>
                                        <span className="text-xs font-medium text-slate-600">{exp.date}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <p className="text-xs font-semibold text-slate-700">{exp.organization}</p>
                                    </div>
                                    <p className="text-xs text-slate-700 leading-snug">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
