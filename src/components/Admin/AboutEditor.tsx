import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Image } from 'lucide-react';
import { storage } from '../../storage';
import type { AboutData } from '../../types';

export function AboutEditor() {
    const [data, setData] = useState<AboutData>(storage.getData().about);
    const [imagePreview, setImagePreview] = useState<string>(data.image);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
                setData({ ...data, image: result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        storage.updateSection('about', data);
        window.dispatchEvent(new Event('storage'));
        alert('About section saved successfully!');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-purple-700 mb-6">Edit About Section</h2>

            {/* Image Upload */}
            <div className="space-y-2">
                <label className="block font-semibold text-gray-700">Profile Image</label>
                <div className="flex gap-4 items-center">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center">
                        {imagePreview && imagePreview !== '/default-avatar.png' ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-5xl">👤</span>
                        )}
                    </div>
                    <label className="btn-primary cursor-pointer">
                        <Image size={18} className="inline mr-2" />
                        Upload Image
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
                <label className="block font-semibold text-gray-700">Name</label>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                    placeholder="Your Name"
                />
            </div>

            {/* Title */}
            <div className="space-y-2">
                <label className="block font-semibold text-gray-700">Title</label>
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                    placeholder="Your Professional Title"
                />
            </div>

            {/* Bio */}
            <div className="space-y-2">
                <label className="block font-semibold text-gray-700">Bio</label>
                <textarea
                    value={data.bio}
                    onChange={(e) => setData({ ...data, bio: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-pastel-lavender resize-none"
                    placeholder="Tell us about yourself..."
                />
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                        placeholder="your.email@example.com"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">Phone</label>
                    <input
                        type="tel"
                        value={data.phone}
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                        placeholder="+1 234 567 8900"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="block font-semibold text-gray-700">Location</label>
                <input
                    type="text"
                    value={data.location}
                    onChange={(e) => setData({ ...data, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                    placeholder="City, Country"
                />
            </div>

            {/* Social Links */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-700">Social Links</h3>
                <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">GitHub</label>
                    <input
                        type="url"
                        value={data.social.github}
                        onChange={(e) => setData({ ...data, social: { ...data.social, github: e.target.value } })}
                        className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                        placeholder="https://github.com/username"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">LinkedIn</label>
                    <input
                        type="url"
                        value={data.social.linkedin}
                        onChange={(e) => setData({ ...data, social: { ...data.social, linkedin: e.target.value } })}
                        className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                        placeholder="https://linkedin.com/in/username"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block font-semibold text-gray-700">Twitter</label>
                    <input
                        type="url"
                        value={data.social.twitter}
                        onChange={(e) => setData({ ...data, social: { ...data.social, twitter: e.target.value } })}
                        className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-pastel-lavender"
                        placeholder="https://twitter.com/username"
                    />
                </div>
            </div>

            {/* Save Button */}
            <motion.button
                onClick={handleSave}
                className="btn-primary w-full py-4 text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Save size={20} className="inline mr-2" />
                Save Changes
            </motion.button>
        </div>
    );
}
