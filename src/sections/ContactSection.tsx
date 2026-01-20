import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, MapPin } from 'lucide-react';
import { storage } from '../types';

export function ContactSection() {
    const [data, setData] = useState(storage.getData().profile);

    useEffect(() => {
        const handleStorage = () => setData(storage.getData().profile);
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    return (
        <section id="contact" className="relative py-32 px-6 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-7xl font-display font-bold text-gradient mb-6">
                        Let's Build Something
                    </h2>
                    <p className="text-2xl text-cyber-text opacity-70">
                        Together, we can create the future
                    </p>
                </motion.div>

                {/* Contact Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <motion.a
                        href={`mailto:${data.contact.email}`}
                        className="glass-strong rounded-3xl p-8 hover-lift group text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyber-blue to-cyber-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Mail className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-cyber-dark mb-2">Email</h3>
                        <p className="text-cyber-text opacity-70 break-all">{data.contact.email}</p>
                    </motion.a>

                    <motion.a
                        href={data.contact.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-strong rounded-3xl p-8 hover-lift group text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyber-purple to-cyber-pink flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Github className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-cyber-dark mb-2">GitHub</h3>
                        <p className="text-cyber-text opacity-70">View my code</p>
                    </motion.a>

                    <motion.a
                        href={data.contact.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-strong rounded-3xl p-8 hover-lift group text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyber-cyan to-cyber-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Linkedin className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-cyber-dark mb-2">LinkedIn</h3>
                        <p className="text-cyber-text opacity-70">Let's connect</p>
                    </motion.a>
                </div>

                {/* CTA */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <a
                        href={`mailto:${data.contact.email}`}
                        className="btn-primary text-xl px-12 py-5 inline-flex items-center gap-3 group"
                    >
                        <Send className="group-hover:translate-x-1 transition-transform" size={24} />
                        Get In Touch
                    </a>
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="text-center mt-20 pt-10 border-t border-cyber-gray"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <p className="text-cyber-text opacity-50 mb-2">
                        © {new Date().getFullYear()} {data.name}. Built with passion & code.
                    </p>
                    <p className="text-sm text-cyber-text opacity-40">
                        Designed & Developed with React, Three.js, and Tailwind CSS
                    </p>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-cyber-blue opacity-10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyber-purple opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </section>
    );
}
