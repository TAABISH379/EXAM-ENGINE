import React, { useState, useContext } from 'react';
import ConfigForm from '../components/ConfigForm';
import PaperView from '../components/PaperView';
import Navbar from '../components/Navbar';
import { generatePaper } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// Premium Skeleton Loader
const SkeletonPaper = () => (
    <div className="glass-panel p-12 mt-12 animate-pulse">
        <div className="flex flex-col items-center mb-12 space-y-4">
            <div className="h-2 w-32 bg-slate-200/50 rounded-full"></div>
            <div className="h-10 w-3/4 max-w-lg bg-slate-200/50 rounded-lg"></div>
            <div className="h-6 w-1/2 bg-slate-100/30 rounded-lg"></div>
        </div>
        <div className="space-y-12">
            {[1, 2, 3].map(i => (
                <div key={i} className="space-y-4">
                    <div className="h-8 w-1/4 bg-slate-200/50 rounded-lg mb-6"></div>
                    {[1, 2].map(j => (
                        <div key={j} className="flex gap-4">
                            <div className="w-8 h-8 rounded-full bg-slate-200/50 flex-shrink-0"></div>
                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-full bg-slate-100/50 rounded"></div>
                                <div className="h-4 w-5/6 bg-slate-100/50 rounded"></div>
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
        <div className="min-h-screen pb-32 relative">
            {/* Background Blobs */}
            <div className="blob-decor w-96 h-96 bg-brand-light top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="blob-decor w-[500px] h-[500px] bg-brand-accent bottom-0 right-0 translate-x-1/3 translate-y-1/3 animation-delay-2000"></div>

            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 pt-28">
                <header className="mb-16 text-center lg:text-left lg:flex items-end justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-850 mb-2 font-heading leading-tight tracking-tight drop-shadow-sm">
                            Welcome back, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark via-brand to-brand-accent animate-shine bg-[length:200%_auto]">
                                {user?.name ? user.name.split(' ')[0] : 'Student'}.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 max-w-2xl font-medium mt-4">
                            Ready to ace your <span className="text-brand-dark font-bold bg-brand-light/20 px-2 rounded-md">{user?.board} Class {user?.className}</span> exams?
                        </p>
                    </motion.div>
                </header>

                <ConfigForm onGenerate={handleGenerate} loading={loading} />

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-8 bg-red-50/80 backdrop-blur-md border border-red-200 text-red-700 p-6 rounded-2xl flex items-center justify-center gap-4 shadow-lg text-lg"
                        >
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-red-500/50 shadow-lg"></div>
                            <p className="font-bold">{error}</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {loading && <SkeletonPaper />}

                {!loading && paper && (
                    <motion.div
                        id="paper-result"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="mt-20"
                    >
                        <PaperView paper={paper} />
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Home;
