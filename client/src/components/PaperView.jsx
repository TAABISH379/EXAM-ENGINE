import React, { useState } from 'react';
import { Printer, FileText, CheckCircle, Lock, Download, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PaperView = ({ paper }) => {
    const [viewMode, setViewMode] = useState('question'); // 'question' | 'answer'

    if (!paper) return null;

    const { metadata, instructions, sections } = paper;

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        if (typeof window === 'undefined') return;

        await import('html2pdf.js').then(html2pdf => {
            const element = document.getElementById('exam-paper');
            const opt = {
                margin: [10, 10], // top, left, bottom, right (mm approx)
                filename: `${paper.metadata.subject}_${paper.metadata.class}_${paper.metadata.board}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2pdf.default().set(opt).from(element).save();
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="md:max-w-4xl mx-auto pb-20 relative"
        >
            {/* Amber Warning Card */}
            {paper.isMock && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-amber-50/80 backdrop-blur-md border-l-4 border-amber-500 text-amber-900 p-4 mb-8 rounded-r-xl shadow-sm print:hidden flex items-start gap-4"
                >
                    <span className="text-xl">⚠️</span>
                    <div>
                        <p className="font-bold">API Limit Reached (Free Tier)</p>
                        <p className="text-sm mt-1 opacity-90">The system is using <strong className="font-bold border-b border-amber-500">Mock Data</strong> as the daily AI quota is exhausted.</p>
                    </div>
                </motion.div>
            )}

            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6 print:hidden">
                <div className="bg-white/40 backdrop-blur-xl p-1.5 rounded-2xl flex shadow-sm border border-white/40 ring-1 ring-slate-200/50">
                    <button
                        onClick={() => setViewMode('question')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative flex items-center gap-2 ${viewMode === 'question' ? 'text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-white/30'}`}
                    >
                        {viewMode === 'question' && (
                            <motion.div
                                layoutId="viewMode"
                                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-100/50"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            <FileText size={16} className={viewMode === 'question' ? 'text-brand' : ''} />
                            Question Paper
                        </span>
                    </button>
                    <button
                        onClick={() => setViewMode('answer')}
                        className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all relative flex items-center gap-2 ${viewMode === 'answer' ? 'text-emerald-800 shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-white/30'}`}
                    >
                        {viewMode === 'answer' && (
                            <motion.div
                                layoutId="viewMode"
                                className="absolute inset-0 bg-white rounded-xl shadow-sm border border-slate-100/50"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                            {viewMode === 'answer' ? <CheckCircle size={16} className="text-emerald-600" /> : <Lock size={16} />}
                            Answer Key
                        </span>
                    </button>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                    <button
                        onClick={handleDownload}
                        className="flex-1 sm:flex-none py-3 px-4 rounded-xl font-bold text-slate-600 bg-white/40 hover:bg-white/60 border border-white/50 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95"
                    >
                        <Download size={18} />
                    </button>
                    <button
                        onClick={handlePrint}
                        className="flex-1 sm:flex-none btn-primary px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 active:translate-y-0 active:scale-95 group"
                    >
                        <Printer size={18} className="group-hover:rotate-12 transition-transform" />
                        <span className="font-bold">Print {viewMode === 'question' ? 'Paper' : 'Key'}</span>
                    </button>
                </div>
            </div>

            {/* Paper Container - Realistic Paper Look */}
            <motion.div
                layout
                className="bg-white px-8 py-12 md:px-14 md:py-16 rounded-xl shadow-2xl shadow-slate-400/20 border-t border-white ring-1 ring-slate-900/5 print:shadow-none print:border-none print:p-0 print:w-full relative overflow-hidden min-h-[1000px] mx-auto w-full"
                id="exam-paper"
            >
                {/* Print Watermark */}
                <div className="hidden print:block fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
                    <p className="text-[12rem] font-bold -rotate-45 uppercase">{metadata.board}</p>
                </div>

                <AnimatePresence mode="wait">
                    {/* --- QUESTION PAPER VIEW --- */}
                    {viewMode === 'question' && (
                        <motion.div
                            key="question"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="font-serif text-black leading-relaxed relative z-10"
                        >

                            {/* Realistic Header */}
                            <div className="border-b-2 border-black pb-6 mb-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm font-bold">
                                            <span className="shrink-0">Roll No.</span>
                                            <div className="flex gap-px">
                                                {[...Array(8)].map((_, i) => (
                                                    <div key={i} className="w-8 h-10 border border-black flex items-center justify-center text-lg"></div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-xs font-bold mt-2 max-w-[220px] leading-tight text-slate-700 italic">
                                            Candidates must write the Q.P. Code on the title page of the answer-book.
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="border-2 border-black px-4 py-1.5 font-bold text-xl inline-block mb-2 shadow-sm">
                                            {metadata.qpCode || '30/1/1'}
                                        </div>
                                        <div className="flex justify-end gap-3 text-sm font-bold items-center">
                                            <span className="uppercase tracking-wider text-xs">Set No.</span>
                                            <div className="border border-black w-8 h-8 flex items-center justify-center text-lg">{metadata.set || '1'}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-8">
                                    <h1 className="text-4xl font-black uppercase tracking-widest mb-2 scale-y-90">{metadata.subject}</h1>
                                    <p className="text-base font-bold uppercase tracking-[0.2em] text-slate-800 mb-6">{metadata.board} - CLASS {metadata.class}</p>

                                    <div className="flex justify-between text-base font-bold border-t-2 border-black border-dashed pt-3 mt-4">
                                        <span>Time Allowed: {metadata.time}</span>
                                        <span>Maximum Marks: {metadata.maxMarks}</span>
                                    </div>
                                </div>
                            </div>

                            {/* General Instructions */}
                            {instructions && instructions.length > 0 && (
                                <div className="mb-10 text-sm bg-slate-50 p-6 border border-slate-200 print:bg-transparent print:p-0 print:border-none">
                                    <h3 className="font-bold underline mb-3 uppercase text-xs tracking-wider">General Instructions:</h3>
                                    <ul className="list-decimal list-inside space-y-1.5 text-justify text-slate-900">
                                        {instructions.map((inst, index) => (
                                            <li key={index} className="pl-2 -indent-2 ml-2">{inst}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Sections & Questions */}
                            <div className="space-y-10">
                                {sections.map((section, sIdx) => (
                                    <div key={sIdx}>
                                        <div className="text-center mb-8 mt-4 relative">
                                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                                <div className="w-full border-t border-slate-300 print:hidden"></div>
                                            </div>
                                            <div className="relative flex justify-center">
                                                <span className="bg-white px-4 font-bold text-lg uppercase shadow-sm border border-slate-200 py-1 rounded-full print:border-none print:shadow-none print:px-0">
                                                    {section.name}
                                                </span>
                                            </div>
                                            {section.descriptor && <p className="text-sm italic mt-2 font-sans text-slate-500">{section.descriptor}</p>}
                                        </div>

                                        <div className="space-y-8">
                                            {section.questions.map((q) => (
                                                <div key={q.questionNumber} className="break-inside-avoid relative flex gap-5 group">
                                                    <span className="font-bold text-lg min-w-[2rem] text-slate-900">{q.questionNumber}.</span>
                                                    <div className="flex-1">
                                                        <p className="mb-3 text-justify text-[1.05rem]" dangerouslySetInnerHTML={{ __html: q.text }}></p>
                                                        {/* Using dangerous html for potential sub/sup scripts if AI generates them */}

                                                        {q.type === 'MCQ' && q.options && (
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-3 pl-1">
                                                                {q.options.map((opt, oIdx) => (
                                                                    <div key={oIdx} className="flex gap-3 text-base items-baseline">
                                                                        <span className="font-bold text-slate-700">({String.fromCharCode(97 + oIdx)})</span>
                                                                        <span>{opt}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="font-bold min-w-[3rem] text-right text-base text-slate-700 pt-0.5 font-sans">
                                                        [{q.marks}]
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-20 text-center font-bold text-sm tracking-[0.5em] opacity-40">
                                ~~~ END OF PAPER ~~~
                            </div>
                        </motion.div>
                    )}

                    {/* --- ANSWER KEY VIEW --- */}
                    {viewMode === 'answer' && (
                        <motion.div
                            key="answer"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="font-sans text-slate-800 relative z-10"
                        >
                            <div className="border-b-2 border-emerald-600 pb-5 mb-8 flex justify-between items-end">
                                <div>
                                    <h1 className="text-3xl font-bold text-emerald-900 uppercase tracking-tight flex items-center gap-3">
                                        <CheckCircle className="text-emerald-500" size={32} />
                                        Marking Scheme
                                    </h1>
                                    <p className="font-medium text-emerald-700/80 mt-1 ml-1">{metadata.subject} • Class {metadata.class}</p>
                                </div>
                                <div className="text-right text-sm font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-lg border border-emerald-100">
                                    {metadata.qpCode ? `QP Code: ${metadata.qpCode}` : 'Standard Set'}
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-emerald-50/80 text-emerald-900 border-b border-emerald-100">
                                        <tr>
                                            <th className="px-6 py-4 font-bold w-20 text-center">Q.No</th>
                                            <th className="px-6 py-4 font-bold">Answer / Value Points</th>
                                            <th className="px-6 py-4 font-bold w-28 text-right">Marks</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {sections.map((section, sIdx) => (
                                            <React.Fragment key={sIdx}>
                                                <tr className="bg-slate-50/80">
                                                    <td colSpan="3" className="px-6 py-3 font-bold text-xs uppercase tracking-wider text-slate-500 border-l-4 border-slate-300">{section.name}</td>
                                                </tr>
                                                {section.questions.map((q) => (
                                                    <tr key={q.questionNumber} className="hover:bg-slate-50 transition-colors group">
                                                        <td className="px-6 py-4 font-bold align-top text-slate-700 text-center bg-slate-50/30 group-hover:bg-slate-100/50 transition-colors border-r border-dashed border-slate-200">{q.questionNumber}</td>
                                                        <td className="px-6 py-4 align-top">
                                                            <div className="mb-2 font-medium text-emerald-950 text-base">{q.answer || 'Answer not provided'}</div>
                                                            <div className="text-xs text-slate-500 italic bg-amber-50 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-amber-100/50">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                                                                Marking Scheme: <span className="text-slate-700 not-italic">{q.markingScheme}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 font-bold align-top text-right text-slate-400">{q.marks}</td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-8 text-center text-xs text-slate-400">
                                Generated by ExamEngine AI • Confidential
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default PaperView;

