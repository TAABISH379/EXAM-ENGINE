import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, GraduationCap, Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="sticky top-0 z-50 mb-8 w-full"
        >
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-white/50 shadow-sm"></div>

            <div className="max-w-7xl mx-auto px-6 py-4 relative z-10">
                <div className="flex justify-between items-center">
                    {/* Logo Area */}
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                        <div className="w-10 h-10 bg-gradient-to-br from-brand to-brand-dark rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 group-hover:scale-105 transition-transform duration-300">
                            <GraduationCap size={22} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-slate-900 font-heading tracking-tight group-hover:text-brand transition-colors">ExamEngine</span>
                            <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest flex items-center gap-1">
                                <Sparkles size={8} /> AI Powered
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        {user ? (
                            <div className="flex items-center gap-6">
                                <div className="text-right group cursor-default">
                                    <p className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors">{user.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Class {user.className} • {user.board}</p>
                                </div>
                                <div className="w-px h-8 bg-slate-200"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 font-bold bg-slate-50 hover:bg-red-50 px-5 py-2.5 rounded-xl transition-all border border-transparent hover:border-red-100 cursor-pointer active:scale-95 group"
                                >
                                    <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="space-x-4">
                                <span className="text-sm font-medium text-slate-400">Guest Mode</span>
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
                                        <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-brand-light/20 flex items-center justify-center text-brand font-bold">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-lg leading-tight">{user.name}</p>
                                                <p className="text-xs font-medium text-slate-500 mt-0.5">Class {user.className} • {user.board}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 text-red-600 font-bold bg-white border border-red-100 shadow-sm px-4 py-4 rounded-xl transition-all cursor-pointer active:scale-95"
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
