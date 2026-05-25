import { motion } from 'framer-motion';
import { Download, ExternalLink, FileText } from 'lucide-react';

export function Resume() {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Title Section */}
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex p-4 bg-purple-500/10 rounded-full text-purple-600 mb-4 border border-purple-500/20">
                        <FileText size={40} />
                    </div>
                    <h1 className="text-6xl font-bold text-gradient mb-4 text-3d">
                        My Resume
                    </h1>
                    <p className="text-xl text-gray-700">
                        View or download my professional experience and credentials
                    </p>
                </motion.div>

                {/* Actions Bar */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass rounded-3xl p-8 mb-12 text-center"
                >
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <a
                            href="/resume.pdf"
                            download="RESUME-SHAKTHI_RITHANYA_S.pdf"
                            className="btn-primary inline-flex items-center justify-center gap-3 text-lg w-full sm:w-auto"
                        >
                            <Download size={22} />
                            Download PDF
                        </a>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary inline-flex items-center justify-center gap-3 text-lg w-full sm:w-auto"
                        >
                            <ExternalLink size={22} />
                            Open in New Tab
                        </a>
                    </div>
                </motion.div>

                {/* PDF Viewer Container */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-3xl p-4 shadow-2xl relative z-10 overflow-hidden"
                >
                    <div className="w-full bg-slate-900/5 rounded-2xl overflow-hidden border border-white/20">
                        <iframe
                            src="/resume.pdf#toolbar=1"
                            className="w-full h-[75vh] md:h-[90vh] rounded-2xl border-none"
                            title="Shakthi Rithanya S - Resume"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

