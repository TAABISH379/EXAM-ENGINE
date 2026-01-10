import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { GoogleLogin } from '@react-oauth/google';
import { Lock, Mail, ArrowRight, Sparkles, Rocket } from 'lucide-react';

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
        <div className="min-h-screen flex bg-slate-900 relative overflow-hidden">
            {/* Background Animation */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand/20 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-brand-accent/20 rounded-full blur-[100px] animate-pulse-slow"></div>
            </div>

            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 relative p-20 flex-col justify-between z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-brand-light to-brand-dark rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand/30">
                        <Rocket size={20} />
                    </div>
                    <span className="text-2xl font-bold text-white font-heading tracking-tight">ExamEngine</span>
                </div>

                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="glass-panel p-10 border-white/10 bg-white/5 backdrop-blur-3xl"
                    >
                        <div className="absolute -top-10 -right-10 text-brand-accent opacity-50 animate-spin-slow">
                            <Sparkles size={100} />
                        </div>
                        <h1 className="text-5xl font-bold font-heading mb-6 leading-tight text-white drop-shadow-md">
                            Master Your Exams <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-brand-accent">
                                with AI Intelligence.
                            </span>
                        </h1>
                        <p className="text-indigo-100/80 text-lg mb-8 leading-relaxed max-w-md">
                            Generate board-perfect papers in seconds. Join thousands of students acing their exams with smart practice.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
                                <h3 className="font-bold text-2xl text-white">100%</h3>
                                <p className="text-sm text-indigo-200">Syllabus Match</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
                                <h3 className="font-bold text-2xl text-white">20k+</h3>
                                <p className="text-sm text-indigo-200">Papers Created</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="text-indigo-200/60 text-sm">
                    © 2026 ExamEngine AI. Built for Excellence.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative z-10 bg-white/80 backdrop-blur-3xl rounded-l-[50px] lg:rounded-l-[80px] shadow-2xl">
                <div className="absolute top-8 right-8">
                    <p className="text-sm text-slate-500 font-medium">New Here? <Link to="/signup" className="text-brand font-bold hover:underline">Create Account</Link></p>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full max-w-md"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-6 mx-auto lg:mx-0">
                            <Lock size={32} />
                        </div>
                        <h2 className="text-4xl font-extrabold font-heading text-slate-850 mb-2 tracking-tight">Welcome Back</h2>
                        <p className="text-slate-500 text-lg">Enter your credentials to access your dashboard.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700 p-4 mb-6 rounded-xl flex items-center gap-3"
                        >
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <p className="font-medium text-sm">{error}</p>
                        </motion.div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
                                    <Mail size={20} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="glass-input w-full pl-12 pr-4 py-4 rounded-xl outline-none text-slate-900 placeholder:text-slate-400 border border-slate-200 bg-white/50 focus:bg-white"
                                    placeholder="student@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block text-sm font-bold text-slate-700">Password</label>
                                <a href="#" className="text-sm text-brand font-bold hover:text-brand-dark hover:underline">Forgot password?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand transition-colors">
                                    <Lock size={20} />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="glass-input w-full pl-12 pr-4 py-4 rounded-xl outline-none text-slate-900 placeholder:text-slate-400 border border-slate-200 bg-white/50 focus:bg-white"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 group shadow-glow"
                        >
                            Sign In
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white/80 backdrop-blur-xl text-slate-500 font-medium">Or continue with</span>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
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
                                    console.error("Google Login Error", err);
                                    setError("Google Login Failed");
                                }
                            }}
                            onError={() => setError('Google Login Failed')}
                            useOneTap
                            theme="filled_blue"
                            shape="pill"
                            size="large"
                            width="100%"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
