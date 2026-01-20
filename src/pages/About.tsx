import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { storage } from '../storage';
import type { AboutData } from '../types';

export function About() {
    const [data, setData] = useState<AboutData>(storage.getData().about);

    useEffect(() => {
        const handleStorage = () => {
            setData(storage.getData().about);
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <motion.div
                className="max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Image */}
                    <motion.div variants={itemVariants} className="relative">
                        <motion.div
                            className="relative w-full aspect-square max-w-md mx-auto"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <div className="absolute inset-0 glass rounded-3xl glow-pink animate-glow" />
                            <div className="absolute inset-4 bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky rounded-3xl overflow-hidden">
                                {data.image && data.image !== '/default-avatar.png' ? (
                                    <img
                                        src={data.image}
                                        alt={data.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-9xl">
                                        👤
                                    </div>
                                )}
                            </div>

                            {/* Floating Decorations */}
                            <motion.div
                                className="absolute -top-6 -right-6 w-24 h-24 bg-pastel-lavender rounded-full glass"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <motion.div
                                className="absolute -bottom-6 -left-6 w-32 h-32 bg-pastel-mint rounded-full glass"
                                animate={{ y: [0, 20, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Content */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h1 className="text-6xl md:text-7xl font-bold text-gradient mb-4 text-3d">
                                {data.name}
                            </h1>
                            <h2 className="text-2xl md:text-3xl font-semibold text-purple-600 mb-6">
                                {data.title}
                            </h2>
                        </motion.div>

                        <motion.p
                            className="text-lg text-gray-700 leading-relaxed glass rounded-2xl p-6"
                            variants={itemVariants}
                        >
                            {data.bio}
                        </motion.p>

                        {/* Contact Info */}
                        <motion.div
                            className="space-y-3 glass rounded-2xl p-6"
                            variants={itemVariants}
                        >
                            <div className="flex items-center gap-3 text-gray-700 hover-lift cursor-pointer p-2 rounded-lg">
                                <Mail className="text-pastel-pink" size={20} />
                                <span>{data.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 hover-lift cursor-pointer p-2 rounded-lg">
                                <Phone className="text-pastel-lavender" size={20} />
                                <span>{data.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700 hover-lift cursor-pointer p-2 rounded-lg">
                                <MapPin className="text-pastel-mint" size={20} />
                                <span>{data.location}</span>
                            </div>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            className="flex gap-4"
                            variants={itemVariants}
                        >
                            {data.social.github && (
                                <motion.a
                                    href={data.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass p-4 rounded-full hover-lift glow-pink"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Github size={24} />
                                </motion.a>
                            )}
                            {data.social.linkedin && (
                                <motion.a
                                    href={data.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass p-4 rounded-full hover-lift glow-lavender"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Linkedin size={24} />
                                </motion.a>
                            )}
                            {data.social.twitter && (
                                <motion.a
                                    href={data.social.twitter}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass p-4 rounded-full hover-lift glow-mint"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <Twitter size={24} />
                                </motion.a>
                            )}
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
