import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { User, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

const UserDetailsForm = () => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('10');
    const [board, setBoard] = useState('CBSE');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Create a guest user object
        const guestUser = {
            name,
            className,
            board,
            isGuest: true
        };
        // Login without a token
        login(guestUser, 'guest-token');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex bg-[#f8fafc]">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-brand items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand to-brand-dark opacity-90"></div>
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-10 right-10 w-60 h-60 bg-indigo-400/20 rounded-full blur-3xl animate-pulse-slow"></div>

                <div className="relative z-10 p-12 text-white max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl font-bold font-heading mb-6 leading-tight">Start Your Journey</h1>
                        <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                            Personalize your exam preparation experience. Tell us a bit about yourself to get started.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold font-heading text-slate-900 mb-2">Enter Details</h2>
                        <p className="text-slate-500">We need these to generate the right papers for you.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    className="glass-input w-full pl-10 pr-4 py-3 rounded-xl outline-none text-slate-900 placeholder:text-slate-400"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Class</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <GraduationCap size={18} />
                                    </div>
                                    <select
                                        className="glass-input w-full pl-10 pr-4 py-3 rounded-xl outline-none text-slate-900 appearance-none bg-white"
                                        value={className}
                                        onChange={(e) => setClassName(e.target.value)}
                                    >
                                        <option value="6">Class 6</option>
                                        <option value="7">Class 7</option>
                                        <option value="8">Class 8</option>
                                        <option value="9">Class 9</option>
                                        <option value="10">Class 10</option>
                                        <option value="11">Class 11</option>
                                        <option value="12">Class 12</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Board</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                        <BookOpen size={18} />
                                    </div>
                                    <select
                                        className="glass-input w-full pl-10 pr-4 py-3 rounded-xl outline-none text-slate-900 appearance-none bg-white"
                                        value={board}
                                        onChange={(e) => setBoard(e.target.value)}
                                    >
                                        <option value="CBSE">CBSE</option>
                                        <option value="ICSE">ICSE</option>
                                        <option value="State">State Board</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 group"
                        >
                            Start Practicing
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default UserDetailsForm;
