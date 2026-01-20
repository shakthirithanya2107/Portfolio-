import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload } from 'lucide-react';
import { storage } from '../../storage';
import type { ResumeData } from '../../types';

export function ResumeEditor() {
    const [resumeData, setResumeData] = useState<ResumeData>(storage.getData().resume);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const newData: ResumeData = {
                    pdfUrl: reader.result as string,
                    lastUpdated: new Date().toISOString(),
                };
                setResumeData(newData);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        storage.updateSection('resume', resumeData);
        window.dispatchEvent(new Event('storage'));
        alert('Resume saved successfully!');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">Edit Resume</h2>

            <div className="glass-dark rounded-2xl p-8 space-y-6">
                <div className="text-center">
                    <p className="text-gray-700 mb-6">
                        Upload your resume as a PDF or image file. This will be available for download on the Resume page.
                    </p>

                    <label className="btn-primary cursor-pointer inline-flex items-center gap-2 text-lg">
                        <Upload size={20} />
                        Upload Resume
                        <input
                            type="file"
                            accept=".pdf,image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>

                {resumeData.pdfUrl && resumeData.pdfUrl !== '/resume.pdf' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="glass rounded-xl p-4">
                            <p className="text-sm text-gray-600 mb-2">
                                <strong>Last Updated:</strong>{' '}
                                {new Date(resumeData.lastUpdated).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </p>
                            <p className="text-sm text-green-600 font-semibold">
                                ✓ Resume uploaded successfully
                            </p>
                        </div>

                        <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                            <h3 className="text-lg font-bold text-purple-700 p-4 bg-pastel-lavender">
                                Preview
                            </h3>
                            <div className="p-4">
                                {resumeData.pdfUrl.includes('application/pdf') || resumeData.pdfUrl.endsWith('.pdf') ? (
                                    <iframe
                                        src={resumeData.pdfUrl}
                                        className="w-full h-[500px] border-0"
                                        title="Resume Preview"
                                    />
                                ) : (
                                    <img
                                        src={resumeData.pdfUrl}
                                        alt="Resume"
                                        className="w-full h-auto max-h-[500px] object-contain"
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {(!resumeData.pdfUrl || resumeData.pdfUrl === '/resume.pdf') && (
                    <div className="text-center py-12 glass rounded-xl">
                        <p className="text-gray-600 text-lg">
                            No resume uploaded yet. Click the button above to upload your resume.
                        </p>
                    </div>
                )}
            </div>

            <motion.button
                onClick={handleSave}
                className="btn-primary w-full py-4 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Save size={20} className="inline mr-2" />
                Save Resume
            </motion.button>

            <div className="glass-dark rounded-xl p-6">
                <h3 className="font-bold text-purple-700 mb-3">Tips:</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Upload a PDF for best compatibility</li>
                    <li>• Keep file size under 5MB for optimal performance</li>
                    <li>• Make sure your resume is up-to-date before uploading</li>
                    <li>• The resume will be downloadable from the Resume page</li>
                </ul>
            </div>
        </div>
    );
}
