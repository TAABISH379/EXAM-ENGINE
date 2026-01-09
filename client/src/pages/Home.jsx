import React, { useState, useContext } from 'react';
import ConfigForm from '../components/ConfigForm';
import PaperView from '../components/PaperView';
import Navbar from '../components/Navbar';
import { generatePaper } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

// Premium Skeleton Loader
const SkeletonPaper = () => (
    <div className="bg-white p-12 rounded-3xl shadow-xl mt-12 animate-pulse border border-slate-100">
        <div className="flex flex-col items-center mb-12 space-y-4">
            <div className="h-2 w-32 bg-slate-200 rounded-full"></div>
            <div className="h-10 w-3/4 max-w-lg bg-slate-200 rounded-lg"></div>
            <div className="h-6 w-1/2 bg-slate-100 rounded-lg"></div>
        </div>
        <div className="space-y-12">
            {[1, 2, 3].map(i => (
                <div key={i} className="space-y-4">
                    <div className="h-8 w-1/4 bg-slate-200 rounded-lg mb-6"></div>
                    {[1, 2].map(j => (
                        <div key={j} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-full bg-slate-100 rounded"></div>
                                <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
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
            // Smooth scroll to paper
            setTimeout(() => {
                const paperElement = document.getElementById('paper-result');
                if (paperElement) paperElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } catch (error) {
            console.error("Home Generate Error:", error);
            setError('Failed to generate paper. Please check the backend connection or API key.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pb-32">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-10">
                <header className="mb-16 text-center lg:text-left lg:flex items-end justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-2 font-heading leading-tight tracking-tight">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-accent">{user?.name ? user.name.split(' ')[0] : 'Student'}.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl font-medium">
                            Ready to ace your <span className="text-brand-dark font-bold">{user?.board} Class {user?.className}</span> exams today?
                        </p>
                    </motion.div>
                </header>

                <ConfigForm onGenerate={handleGenerate} loading={loading} />

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 bg-red-50 border-l-4 border-red-500 text-red-700 p-6 rounded-r-xl flex items-center justify-center gap-4 shadow-sm"
                    >
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <p className="font-bold">{error}</p>
                    </motion.div>
                )}

                {loading && <SkeletonPaper />}

                {!loading && paper && (
                    <motion.div
                        id="paper-result"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="mt-16"
                    >
                        <PaperView paper={paper} />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Home;
