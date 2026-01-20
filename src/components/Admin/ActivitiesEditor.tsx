import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus, Trash2, Image } from 'lucide-react';
import { storage } from '../../storage';
import type { Activity } from '../../types';

export function ActivitiesEditor() {
    const [activities, setActivities] = useState<Activity[]>(storage.getData().activities);

    const addActivity = () => {
        const newActivity: Activity = {
            id: Date.now().toString(),
            title: 'New Activity',
            description: 'Description of the activity',
            date: new Date().toISOString().split('T')[0],
            type: 'participation',
            image: '',
            link: '',
        };
        setActivities([...activities, newActivity]);
    };

    const updateActivity = (id: string, updates: Partial<Activity>) => {
        setActivities(activities.map(activity =>
            activity.id === id ? { ...activity, ...updates } : activity
        ));
    };

    const deleteActivity = (id: string) => {
        if (confirm('Are you sure you want to delete this activity?')) {
            setActivities(activities.filter(activity => activity.id !== id));
        }
    };

    const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateActivity(id, { image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        storage.updateSection('activities', activities);
        window.dispatchEvent(new Event('storage'));
        alert('Activities saved successfully!');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-purple-700">Edit Activities</h2>
                <motion.button
                    onClick={addActivity}
                    className="btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Plus size={18} className="inline mr-2" />
                    Add Activity
                </motion.button>
            </div>

            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-dark rounded-2xl p-6 space-y-4"
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold text-purple-700">Activity #{index + 1}</h3>
                            <motion.button
                                onClick={() => deleteActivity(activity.id)}
                                className="p-2 rounded-full glass hover:bg-red-100 text-red-600"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Trash2 size={18} />
                            </motion.button>
                        </div>

                        {/* Image Upload */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-700">Image</label>
                            <div className="flex gap-4 items-center">
                                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center">
                                    {activity.image ? (
                                        <img src={activity.image} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-3xl">🏆</span>
                                    )}
                                </div>
                                <label className="btn-primary cursor-pointer text-sm">
                                    <Image size={16} className="inline mr-2" />
                                    Upload
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(activity.id, e)}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Title</label>
                                <input
                                    type="text"
                                    value={activity.title}
                                    onChange={(e) => updateActivity(activity.id, { title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Type</label>
                                <select
                                    value={activity.type}
                                    onChange={(e) => updateActivity(activity.id, { type: e.target.value as 'achievement' | 'participation' })}
                                    className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                                >
                                    <option value="achievement">Achievement</option>
                                    <option value="participation">Participation</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-700">Description</label>
                            <textarea
                                value={activity.description}
                                onChange={(e) => updateActivity(activity.id, { description: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender resize-none"
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Date</label>
                                <input
                                    type="date"
                                    value={activity.date}
                                    onChange={(e) => updateActivity(activity.id, { date: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">Link (Optional)</label>
                                <input
                                    type="url"
                                    value={activity.link || ''}
                                    onChange={(e) => updateActivity(activity.id, { link: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {activities.length === 0 && (
                <div className="text-center py-12 glass-dark rounded-2xl">
                    <p className="text-gray-600">No activities added yet. Click "Add Activity" to get started!</p>
                </div>
            )}

            <motion.button
                onClick={handleSave}
                className="btn-primary w-full py-4 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Save size={20} className="inline mr-2" />
                Save All Activities
            </motion.button>
        </div>
    );
}
