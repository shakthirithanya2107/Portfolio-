import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Code, Award, FolderGit2, FileText, Settings } from 'lucide-react';

export function Navigation() {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'About', icon: Home },
        { path: '/skills', label: 'Skills', icon: Code },
        { path: '/activities', label: 'Activities', icon: Award },
        { path: '/projects', label: 'Projects', icon: FolderGit2 },
        { path: '/resume', label: 'Resume', icon: FileText },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto glass rounded-full px-8 py-4 flex items-center justify-between">
                <motion.div
                    className="text-2xl font-bold text-gradient"
                    whileHover={{ scale: 1.05 }}
                >
                    Portfolio
                </motion.div>

                <div className="flex items-center gap-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.path} to={item.path}>
                                <motion.div
                                    className={`nav-link flex items-center gap-2 rounded-full px-4 py-2 ${isActive(item.path) ? 'active glass-dark' : ''
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Icon size={18} />
                                    <span className="hidden md:inline">{item.label}</span>
                                </motion.div>
                            </Link>
                        );
                    })}

                    <Link to="/admin">
                        <motion.div
                            className="ml-4 p-2 rounded-full glass-dark hover-lift"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            title="Admin Console"
                        >
                            <Settings size={20} />
                        </motion.div>
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
}
