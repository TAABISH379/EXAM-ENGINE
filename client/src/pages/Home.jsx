import React, { useState, useContext } from 'react';
import ConfigForm from '../components/ConfigForm';
import PaperView from '../components/PaperView';
import Navbar from '../components/Navbar';
import { generatePaper } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

// Basic Skeleton Loader Component
const SkeletonPaper = () => (
    <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-slate-100 animate-pulse mt-12">
        <div className="flex flex-col items-center mb-8 space-y-3">
            <div className="h-8 w-64 bg-slate-200 rounded"></div>
            <div className="h-6 w-40 bg-slate-200 rounded"></div>
            <div className="h-4 w-56 bg-slate-100 rounded mt-2"></div>
        </div>
        <div className="space-y-8">
            <div className="space-y-4">
                <div className="h-10 bg-slate-100 rounded-lg w-full"></div>
                {[1, 2, 3].map(i => (
                    <div key={i} className="space-y-2 pl-4">
                        <div className="h-4 w-3/4 bg-slate-200 rounded"></div>
                        <div className="h-4 w-1/2 bg-slate-100 rounded"></div>
                    </div>
                ))}
            </div>
            <div className="space-y-4">
                <div className="h-10 bg-slate-100 rounded-lg w-full"></div>
                {[1, 2].map(i => (
                    <div key={i} className="space-y-2 pl-4">
                        <div className="h-4 w-5/6 bg-slate-200 rounded"></div>
                        <div className="h-4 w-full bg-slate-100 rounded"></div>
                        <div className="h-4 w-4/5 bg-slate-100 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const Home = () => {
    const [paper, setPaper] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContext);

    const handleGenerate = async (config) => {
        setLoading(true);
        setError(null);
        setPaper(null);
        try {
            const result = await generatePaper(config);
            setPaper(result);
        } catch (error) {
            console.error("Home Generate Error:", error);
            setError('Failed to generate paper. Please check the backend connection or API key.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-20">
            <Navbar />
            <div className="max-w-5xl mx-auto px-4">
                <header className="mb-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 font-heading leading-tight">
                            Ready to Excel, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user?.name ? user.name.split(' ')[0] : 'Student'}?</span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                            Generate unlimited practice papers based on {user?.board} Class {user?.className} syllabus with our advanced AI engine.
                        </p>
                    </motion.div>
                </header>

                <ConfigForm onGenerate={handleGenerate} loading={loading} />

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-8 bg-red-50 border border-red-100 text-red-700 p-6 rounded-2xl flex items-center justify-center gap-4"
                    >
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <p className="font-medium">{error}</p>
                    </motion.div>
                )}

                {loading && <SkeletonPaper />}

                {!loading && paper && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mt-12"
                    >
                        <PaperView paper={paper} />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Home;
