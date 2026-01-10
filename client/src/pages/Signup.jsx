import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { Mail, User, Lock, BookOpen, GraduationCap, ArrowRight, Sparkles, Rocket } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        className: '10',
        board: 'CBSE'
    });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                login(data.user, data.token);
                navigate('/');
            } else {
                setError(data.error);
            }
        } catch (error) {
            console.error("Signup Error:", error);
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-900 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-light/20 rounded-full blur-[120px] animate-float opacity-70"></div>
                <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[100px] animate-pulse-slow opacity-60"></div>
            </div>

            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-5/12 relative p-12 flex-col justify-between z-10 bg-white/5 backdrop-blur-lg border-r border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-light to-brand-dark rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/30">
                        <Rocket size={20} />
                    </div>
                </div>

                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold font-heading mb-6 leading-tight text-white drop-shadow-md">
                            Start Your Journey <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-light">
                                to Excellence.
                            </span>
                        </h1>
                        <p className="text-indigo-200 text-lg mb-12 max-w-sm leading-relaxed">
                            Create your personalized profile and get access to unlimited AI-generated practice papers tailored to your syllabus.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-5 group">
                                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-brand/20 transition-colors border border-white/5"><BookOpen size={24} className="text-brand-accent" /></div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Latest Syllabus</h4>
                                    <p className="text-sm text-indigo-300">Always updated with board guidelines.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 group">
                                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-brand/20 transition-colors border border-white/5"><GraduationCap size={24} className="text-brand-light" /></div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Smart Analysis</h4>
                                    <p className="text-sm text-indigo-300">Track your progress and improve.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className="text-indigo-200/40 text-xs">
                    Join 20,000+ students today.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-6 lg:p-12 relative z-10 overflow-y-auto">
                <div className="absolute top-6 right-6 lg:top-10 lg:right-10">
                    <p className="text-sm text-slate-400 font-medium">Already a member? <Link to="/login" className="text-brand-accent font-bold hover:underline">Sign in</Link></p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-lg"
                >
                    <div className="mb-8 mt-12 lg:mt-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand-light text-xs font-bold uppercase tracking-wider mb-4">
                            <Sparkles size={12} /> Free Access
                        </div>
                        <h2 className="text-4xl font-extrabold font-heading text-white mb-3">Create Account</h2>
                        <p className="text-slate-400 text-lg">Join the community of top achievers.</p>
                    </div>

                    {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>{error}</div>}

                    <div className="mb-8 flex justify-center">
                        <GoogleLogin
                            text="signup_with"
                            onSuccess={async (credentialResponse) => {
                                try {
                                    const res = await fetch('/api/auth/google', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ token: credentialResponse.credential }),
                                    });
                                    const data = await res.json();
                                    if (res.ok) {
                                        login(data.user, data.token);
                                        navigate('/');
                                    } else {
                                        setError(data.error);
                                    }
                                } catch (err) {
                                    console.error("Google Signup Error", err);
                                    setError("Google Signup Failed");
                                }
                            }}
                            onError={() => {
                                setError('Google Signup Failed');
                            }}
                            theme="filled_black"
                            width="100%"
                            shape="pill"
                        />
                    </div>

                    <div className="relative mb-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-slate-900 text-slate-500">Or sign up with email</span>
                        </div>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-brand transition-colors" size={18} />
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        className="glass-input w-full pl-11 pr-4 py-3 rounded-xl outline-none bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:bg-slate-800 focus:border-brand"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-brand transition-colors" size={18} />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="glass-input w-full pl-11 pr-4 py-3 rounded-xl outline-none bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:bg-slate-800 focus:border-brand"
                                        placeholder="student@ex.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-brand transition-colors" size={18} />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="glass-input w-full pl-11 pr-4 py-3 rounded-xl outline-none bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:bg-slate-800 focus:border-brand"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Class</label>
                                <select
                                    name="className"
                                    value={formData.className}
                                    onChange={handleChange}
                                    className="glass-input w-full px-4 py-3 rounded-xl outline-none bg-slate-800/50 border-slate-700 text-white focus:bg-slate-800 focus:border-brand appearance-none"
                                >
                                    <option value="10">Class 10</option>
                                    <option value="12">Class 12</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-slate-500 mb-1.5 ml-1">Board</label>
                                <select
                                    name="board"
                                    value={formData.board}
                                    onChange={handleChange}
                                    className="glass-input w-full px-4 py-3 rounded-xl outline-none bg-slate-800/50 border-slate-700 text-white focus:bg-slate-800 focus:border-brand appearance-none"
                                >
                                    <option value="CBSE">CBSE</option>
                                    <option value="ICSE">ICSE</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-6 shadow-glow hover:shadow-glow-lg"
                        >
                            Get Started
                            <ArrowRight size={20} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
