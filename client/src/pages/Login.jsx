import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                login(data.user, data.token);
                navigate('/');
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error("Login Error:", error);
            setError('Something went wrong. Please try again.');
        }
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
                        <h1 className="text-5xl font-bold font-heading mb-6 leading-tight">Master Your Exams with AI Power</h1>
                        <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
                            Generate board-perfect papers in seconds. Join thousands of students acing their exams with intelligent practice.
                        </p>
                        <div className="flex gap-4">
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                <h3 className="font-bold text-2xl">100%</h3>
                                <p className="text-sm text-indigo-100">Syllabus Match</p>
                            </div>
                            <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl border border-white/10">
                                <h3 className="font-bold text-2xl">20k+</h3>
                                <p className="text-sm text-indigo-100">Papers Created</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
                <div className="absolute top-0 right-0 p-8">
                    <p className="text-sm text-slate-600">Don't have an account? <Link to="/signup" className="text-brand font-bold hover:underline">Sign up</Link></p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold font-heading text-slate-900 mb-2">Welcome Back</h2>
                        <p className="text-slate-500">Enter your credentials to access your dashboard.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-r" role="alert"
                        >
                            <p className="font-medium">{error}</p>
                        </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="glass-input w-full pl-10 pr-4 py-3 rounded-xl outline-none text-slate-900 placeholder:text-slate-400"
                                    placeholder="student@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-medium text-slate-700">Password</label>
                                <a href="#" className="text-xs text-brand font-medium hover:text-brand-dark">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="glass-input w-full pl-10 pr-4 py-3 rounded-xl outline-none text-slate-900 placeholder:text-slate-400"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 group"
                        >
                            Sign In
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
