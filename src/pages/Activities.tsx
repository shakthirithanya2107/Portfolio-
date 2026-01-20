import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Trophy, Users, ExternalLink, Calendar } from 'lucide-react';
import { storage } from '../storage';
import type { Activity } from '../types';

export function Activities() {
    const [activities, setActivities] = useState<Activity[]>(storage.getData().activities);

    useEffect(() => {
        const handleStorage = () => {
            setActivities(storage.getData().activities);
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const sortedActivities = [...activities].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

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
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl font-bold text-gradient mb-4 text-3d">
                        Activities & Achievements
                    </h1>
                    <p className="text-xl text-gray-700">
                        My journey of participation and accomplishments
                    </p>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    className="relative"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Timeline Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pastel-pink via-pastel-lavender to-pastel-mint transform md:-translate-x-1/2" />

                    {sortedActivities.map((activity, index) => {
                        const isEven = index % 2 === 0;
                        const Icon = activity.type === 'achievement' ? Trophy : Users;

                        return (
                            <motion.div
                                key={activity.id}
                                variants={itemVariants}
                                className={`relative mb-12 ${isEven ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'
                                    } w-full md:w-1/2`}
                            >
                                {/* Timeline Dot */}
                                <motion.div
                                    className="absolute left-8 md:left-auto md:right-0 md:transform md:translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-pastel-pink to-pastel-lavender border-4 border-white shadow-lg"
                                    style={{
                                        left: isEven ? 'auto' : '2rem',
                                        right: isEven ? '-0.75rem' : 'auto',
                                    }}
                                    whileHover={{ scale: 1.5 }}
                                    animate={{
                                        boxShadow: [
                                            '0 0 0 0 rgba(255, 214, 232, 0.7)',
                                            '0 0 0 10px rgba(255, 214, 232, 0)',
                                        ],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                />

                                {/* Content Card */}
                                <motion.div
                                    className={`ml-20 md:ml-0 ${isEven ? 'md:mr-12' : 'md:ml-12'
                                        } glass rounded-3xl p-6 hover-lift card-3d`}
                                    whileHover={{ scale: 1.02, rotateY: isEven ? 5 : -5 }}
                                >
                                    {/* Type Badge */}
                                    <div className="flex items-center gap-2 mb-4">
                                        <div
                                            className={`p-2 rounded-full ${activity.type === 'achievement'
                                                ? 'bg-pastel-yellow'
                                                : 'bg-pastel-mint'
                                                }`}
                                        >
                                            <Icon size={20} className="text-purple-700" />
                                        </div>
                                        <span className="text-sm font-semibold text-purple-600 uppercase">
                                            {activity.type}
                                        </span>
                                    </div>

                                    {/* Image */}
                                    {activity.image && (
                                        <motion.div
                                            className="mb-4 rounded-2xl overflow-hidden h-48 bg-gradient-to-br from-pastel-pink to-pastel-lavender"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            {activity.image.startsWith('http') || activity.image.startsWith('/') ? (
                                                <img
                                                    src={activity.image}
                                                    alt={activity.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-6xl">
                                                    🏆
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-purple-700 mb-2">
                                        {activity.title}
                                    </h3>

                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                                        <Calendar size={16} />
                                        <span className="text-sm">
                                            {new Date(activity.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-700 mb-4">{activity.description}</p>

                                    {/* Link */}
                                    {activity.link && (
                                        <motion.a
                                            href={activity.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800"
                                            whileHover={{ x: 5 }}
                                        >
                                            Learn More <ExternalLink size={16} />
                                        </motion.a>
                                    )}
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Empty State */}
                {sortedActivities.length === 0 && (
                    <motion.div
                        className="text-center py-20 glass rounded-3xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <p className="text-2xl text-gray-600">
                            No activities added yet
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
