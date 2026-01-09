import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { User, BookOpen, GraduationCap, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const UserDetailsForm = () => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('10');
    const [board, setBoard] = useState('CBSE');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const guestUser = {
            name,
            className,
            board,
            isGuest: true
        };
        login(guestUser, 'guest-token');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-light/20 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-accent/10 rounded-full blur-[100px] animate-pulse-slow"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
                {/* Left Side: Welcome Message */}
                <div className="text-center lg:text-left order-2 lg:order-1">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-brand-dark text-sm font-semibold mb-6 shadow-sm"
                    >
                        <Sparkles size={16} className="text-brand-accent animate-spin-slow" />
                        <span>AI-Powered Exam Prep</span>
                    </motion.div>

                    <h1 className="text-5xl lg:text-7xl font-bold mb-6 font-heading tracking-tight text-slate-900 leading-[1.1]">
                        Master Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-accent">Syllabus.</span>
                    </h1>

                    <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                        Join thousands of students generating unlimited, board-aligned practice papers in seconds. purely customizable.
                    </p>

                    <div className="hidden lg:flex gap-4 opacity-80">
                        {['Instant Feedback', '100% Syllabus Match', 'Smart Analytics'].map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                <CheckCircle2 size={16} className="text-brand" />
                                {feat}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Glass Form */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="order-1 lg:order-2"
                >
                    <div className="glass-panel p-8 md:p-10 relative">
                        {/* Decorative glow behind form */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-brand/10 blur-[80px] -z-10 rounded-full"></div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-900 font-heading">Get Started</h2>
                            <p className="text-slate-500 text-sm">Customize your experience in seconds.</p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="group">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Your Name</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-light transition-colors group-focus-within:text-brand">
                                        <User size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        className="glass-input w-full pl-12 pr-4 py-4 text-lg font-medium outline-none"
                                        placeholder="e.g. Arav Kumar"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <div className="group">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Class</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-light transition-colors group-focus-within:text-brand">
                                            <GraduationCap size={20} />
                                        </div>
                                        <select
                                            className="glass-input w-full pl-12 pr-4 py-4 font-medium outline-none appearance-none bg-transparent cursor-pointer"
                                            value={className}
                                            onChange={(e) => setClassName(e.target.value)}
                                        >
                                            {[6, 7, 8, 9, 10, 11, 12].map(c => <option key={c} value={c}>{c}th</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Board</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-brand-light transition-colors group-focus-within:text-brand">
                                            <BookOpen size={20} />
                                        </div>
                                        <select
                                            className="glass-input w-full pl-12 pr-4 py-4 font-medium outline-none appearance-none bg-transparent cursor-pointer"
                                            value={board}
                                            onChange={(e) => setBoard(e.target.value)}
                                        >
                                            <option value="CBSE">CBSE</option>
                                            <option value="ICSE">ICSE</option>
                                            <option value="State">State</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full py-4 text-lg mt-4 flex items-center justify-center gap-2 group shadow-glow"
                            >
                                Start Learning
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default UserDetailsForm;
