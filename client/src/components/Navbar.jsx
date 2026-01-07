import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, GraduationCap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel sticky top-0 z-50 mb-8 rounded-b-2xl border-t-0"
        >
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo Area */}
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="ExamEngine Logo" className="w-12 h-12 object-contain" />
                        <div>
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 font-heading">ExamEngine</span>
                            <span className="text-xs text-blue-500 font-medium ml-2 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 hidden sm:inline-block">PRO</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        {user ? (
                            <div className="flex items-center gap-6">
                                <div className="text-right group cursor-default">
                                    <p className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors">{user.name}</p>
                                    <p className="text-xs text-slate-500 font-medium">Class {user.className} • {user.board}</p>
                                </div>
                                <div className="w-px h-8 bg-slate-200"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 font-medium bg-white/50 hover:bg-red-50 px-4 py-2 rounded-xl transition-all border border-transparent hover:border-red-100 cursor-pointer active:scale-95"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-4">
                                {/* Public Nav Links */}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="pt-4 pb-2 space-y-4 border-t border-slate-100 mt-4">
                                {user && (
                                    <>
                                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                            <p className="font-bold text-slate-800 text-lg">{user.name}</p>
                                            <p className="text-sm text-slate-500">Class {user.className} • {user.board}</p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 text-red-600 font-medium bg-red-50 hover:bg-red-100 px-4 py-3 rounded-xl transition-all cursor-pointer active:scale-95"
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
