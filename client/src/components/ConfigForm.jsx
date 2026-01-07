import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { BookOpen, Award, Sparkles } from 'lucide-react';

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

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100 relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 font-heading">Configure Exam</h2>
                        <p className="text-slate-500 text-sm">Customize your practice paper parameters</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Fixed Details Card */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Your Profile (Fixed)</h3>
                        <div className="flex gap-4">
                            <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                                <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Board</p>
                                    <p className="font-bold text-slate-800">{formData.board}</p>
                                </div>
                            </div>
                            <div className="flex-1 bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-3">
                                <div className="bg-purple-100 p-2 rounded-lg text-purple-600">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-medium">Class</p>
                                    <p className="font-bold text-slate-800">{formData.className}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Inputs */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {['Mathematics', 'Science', 'English', 'Social Science', 'Physics'].map((subj) => (
                                    <button
                                        key={subj}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, subject: subj })}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${formData.subject === subj ? 'bg-brand text-white border-brand' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-brand/50 hover:text-brand'}`}
                                    >
                                        {subj}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="or type custom subject..."
                                className="glass-input w-full px-4 py-3 rounded-xl outline-none font-medium text-slate-900 placeholder-slate-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Difficulty</label>
                            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                                {['Easy', 'Medium', 'Hard'].map((diff) => (
                                    <button
                                        key={diff}
                                        type="button"
                                        onClick={() => handleDifficultySelect(diff)}
                                        className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${formData.difficulty === diff ? 'bg-white text-brand shadow-sm scale-100' : 'text-slate-400 hover:text-slate-600 scale-95'}`}
                                    >
                                        {diff}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Generating Paper...
                        </>
                    ) : (
                        <>
                            Generate Exam Paper
                            <Sparkles className="group-hover:rotate-12 transition-transform" />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default ConfigForm;
