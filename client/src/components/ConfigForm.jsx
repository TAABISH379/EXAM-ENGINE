import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { BookOpen, Award, Sparkles, Zap, BrainCircuit, Globe } from 'lucide-react';

const ConfigForm = ({ onGenerate, loading }) => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        board: 'CBSE',
        className: '10',
        subject: '',
        difficulty: 'Medium'
    });

    useEffect(() => {
        if (user) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData(prev => ({
                ...prev,
                board: user.board || prev.board,
                className: user.className || prev.className
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDifficultySelect = (diff) => {
        setFormData({ ...formData, difficulty: diff });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(formData);
    };

    const subjects = [
        { name: 'Mathematics', icon: <BrainCircuit size={16} /> },
        { name: 'Science', icon: <Zap size={16} /> },
        { name: 'English', icon: <BookOpen size={16} /> },
        { name: 'Social Science', icon: <Globe size={16} /> }
    ];

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="glass-panel p-8 md:p-10 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-brand-light/20 to-brand/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-gradient-to-br from-brand to-brand-dark p-3 rounded-2xl text-white shadow-lg shadow-brand/30">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 font-heading">Configure Exam</h2>
                        <p className="text-slate-500 text-sm">Design your perfect practice session.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
                    {/* Fixed Details Card (Left Col) */}
                    <div className="lg:col-span-4 space-y-4">
                        <div className="glass-card p-5 border-l-4 border-brand-accent">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Student Profile</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-brand group-hover:scale-110 transition-transform">
                                        <BookOpen size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Board</p>
                                        <p className="font-bold text-slate-800 text-lg">{formData.board}</p>
                                    </div>
                                </div>
                                <div className="w-full h-px bg-slate-100"></div>
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                                        <Award size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase">Class</p>
                                        <p className="font-bold text-slate-800 text-lg">{formData.className}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Inputs (Right Col) */}
                    <div className="lg:col-span-8 space-y-8">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
                                Select Subject
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                {subjects.map((subj) => (
                                    <button
                                        key={subj.name}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, subject: subj.name })}
                                        className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border transition-all duration-300 ${formData.subject === subj.name
                                            ? 'bg-brand text-white border-brand shadow-lg shadow-brand/25 transform -translate-y-1'
                                            : 'bg-white/50 border-slate-200 text-slate-600 hover:border-brand/30 hover:bg-white'}`}
                                    >
                                        {subj.icon}
                                        <span className="text-xs font-bold">{subj.name}</span>
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="Or type a custom topic (e.g. Thermodynamics)..."
                                className="glass-input w-full px-5 py-4 font-medium"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent"></span>
                                Difficulty Level
                            </label>
                            <div className="bg-slate-100/50 p-1.5 rounded-2xl flex relative backdrop-blur-sm border border-slate-200/60">
                                {['Easy', 'Medium', 'Hard'].map((diff) => (
                                    <button
                                        key={diff}
                                        type="button"
                                        onClick={() => handleDifficultySelect(diff)}
                                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 relative z-10 ${formData.difficulty === diff ? 'text-brand-dark shadow-sm bg-white' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {diff}
                                        {formData.difficulty === diff && (
                                            <motion.div
                                                layoutId="diff-active"
                                                className="absolute inset-0 bg-white rounded-xl shadow-sm -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-5 rounded-2xl font-bold text-xl tracking-wide flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed shadow-glow hover:shadow-glow-lg"
                >
                    {loading ? (
                        <>
                            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span className="animate-pulse">Curating Questions...</span>
                        </>
                    ) : (
                        <>
                            Generate Exam Paper
                            <Sparkles className="group-hover:rotate-12 transition-transform" strokeWidth={2.5} />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default ConfigForm;
