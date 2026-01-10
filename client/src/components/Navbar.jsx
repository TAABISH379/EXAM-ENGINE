import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, GraduationCap, Menu, X, Sparkles, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="fixed top-0 left-0 w-full z-50 px-4 pt-6 md:px-8">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
                className="max-w-7xl mx-auto rounded-3xl bg-white/60 backdrop-blur-xl border border-white/40 shadow-glass-sm overflow-hidden"
            >
                {/* Shiny glass reflection */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-150%] animate-shine pointer-events-none"></div>

                <div className="px-6 py-3 relative z-10 flex justify-between items-center">
                    {/* Logo Area */}
                    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-glow blur-lg opacity-40 group-hover:opacity-70 transition-opacity"></div>
                            <div className="w-10 h-10 bg-gradient-to-br from-brand-light to-brand-dark rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/20 relative z-10 group-hover:rotate-12 transition-transform duration-500">
                                <Rocket size={20} className="group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold font-heading tracking-tight text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-dark group-hover:to-brand-accent transition-all">ExamEngine</span>
                            <span className="text-[10px] font-bold text-brand-dark flex items-center gap-1 opacity-80 uppercase tracking-widest">
                                <Sparkles size={8} /> Cosmic Edition
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {user ? (
                            <>
                                <div className="text-right group cursor-default">
                                    <p className="text-sm font-bold text-slate-800 group-hover:text-brand transition-colors">{user.name}</p>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-white/50 px-2 py-0.5 rounded-full inline-block mt-0.5 border border-white/50">{user.board} • {user.className}</p>
                                </div>
                                <div className="w-px h-8 bg-slate-200/60"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-red-500 bg-white/40 hover:bg-red-50/50 px-5 py-2.5 rounded-xl transition-all border border-transparent hover:border-red-100 cursor-pointer active:scale-95 group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-red-100/0 group-hover:bg-red-100/20 transition-colors"></div>
                                    <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                                    <span>Logout</span>
                                </button>
                            </>
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
                            className="p-2 text-slate-600 hover:bg-white/50 rounded-lg transition-colors cursor-pointer"
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
                            className="md:hidden overflow-hidden bg-white/40 backdrop-blur-md border-t border-white/20"
                        >
                            <div className="p-4 space-y-4">
                                {user && (
                                    <>
                                        <div className="bg-white/60 p-5 rounded-2xl flex items-center gap-4 shadow-sm">
                                            <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold">
                                                {user.name[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-lg leading-tight">{user.name}</p>
                                                <p className="text-xs font-medium text-slate-500 mt-0.5">Class {user.className} • {user.board}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 text-red-600 font-bold bg-white/80 border border-red-100 shadow-sm px-4 py-4 rounded-xl transition-all cursor-pointer active:scale-95"
                                        >
                                            <div className="w-full flex items-center justify-center gap-2">
                                                <LogOut size={18} />
                                                <span>Logout</span>
                                            </div>
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </div>
    );
};

export default Navbar;
