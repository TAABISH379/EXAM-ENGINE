import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { Mail, User, Lock, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

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
        <div className="min-h-screen flex bg-[#f8fafc]">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-brand-dark items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-dark to-indigo-900 opacity-90"></div>
                <div className="absolute top-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>

                <div className="relative z-10 p-12 text-white max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl font-bold font-heading mb-6 leading-tight">Start Your Journey to Excellence</h1>
                        <p className="text-indigo-200 text-lg mb-8">
                            Create your personalized profile and get access to unlimited AI-generated practice papers tailored to your syllabus.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/10 p-3 rounded-lg"><BookOpen size={24} /></div>
                                <div>
                                    <h4 className="font-bold">Latest Syllabus</h4>
                                    <p className="text-sm text-indigo-200">Always updated with board guidelines.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="bg-white/10 p-3 rounded-lg"><GraduationCap size={24} /></div>
                                <div>
                                    <h4 className="font-bold">Smart Analysis</h4>
                                    <p className="text-sm text-indigo-200">Track your progress and improve.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative overflow-y-auto">
                <div className="absolute top-0 right-0 p-8 z-10">
                    <p className="text-sm text-slate-600">Already a member? <Link to="/login" className="text-brand font-bold hover:underline">Sign in</Link></p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md mt-12 lg:mt-0"
                >
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold font-heading text-slate-900 mb-2">Create Account</h2>
                        <p className="text-slate-500">Join the community of top achievers.</p>
                    </div>

                    {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">{error}</div>}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="glass-input w-full pl-10 pr-4 py-3 rounded-xl outline-none"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="glass-input w-full pl-10 pr-4 py-3 rounded-xl outline-none"
                                    placeholder="student@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="glass-input w-full pl-10 pr-4 py-3 rounded-xl outline-none"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Class</label>
                                <select
                                    name="className"
                                    value={formData.className}
                                    onChange={handleChange}
                                    className="glass-input w-full px-4 py-3 rounded-xl outline-none bg-white"
                                >
                                    <option value="10">Class 10</option>
                                    <option value="12">Class 12</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Board</label>
                                <select
                                    name="board"
                                    value={formData.board}
                                    onChange={handleChange}
                                    className="glass-input w-full px-4 py-3 rounded-xl outline-none bg-white"
                                >
                                    <option value="CBSE">CBSE</option>
                                    <option value="ICSE">ICSE</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full py-3.5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-4"
                        >
                            Get Started
                            <ArrowRight size={18} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
