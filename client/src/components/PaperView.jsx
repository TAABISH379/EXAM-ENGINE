import React, { useState } from 'react';
import { Printer, FileText, CheckCircle, Lock } from 'lucide-react';

const PaperView = ({ paper }) => {
    const [viewMode, setViewMode] = useState('question'); // 'question' | 'answer'

    if (!paper) return null;

    const { metadata, instructions, sections } = paper;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="md:max-w-4xl mx-auto pb-20">
            {paper.isMock && (
                <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-900 p-4 mb-6 rounded-r-xl shadow-sm print:hidden flex items-start gap-3">
                    <span className="text-xl">⚠️</span>
                    <div>
                        <p className="font-bold">API Limit Reached (Free Tier)</p>
                        <p className="text-sm mt-1 opacity-90">The system is using <strong className="font-bold border-b border-amber-500">Mock Data</strong> as the daily AI quota is exhausted.</p>
                    </div>
                </div>
            )}

            {/* Control Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 print:hidden">
                <div className="bg-slate-100 p-1 rounded-xl flex shadow-inner">
                    <button
                        onClick={() => setViewMode('question')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'question' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <FileText size={16} />
                        Question Paper
                    </button>
                    <button
                        onClick={() => setViewMode('answer')}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'answer' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {viewMode === 'answer' ? <CheckCircle size={16} /> : <Lock size={16} />}
                        Answer Key
                    </button>
                </div>

                <button
                    onClick={handlePrint}
                    className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0 w-full sm:w-auto justify-center"
                >
                    <Printer size={18} />
                    <span className="font-bold">Print {viewMode === 'question' ? 'Paper' : 'Key'}</span>
                </button>
            </div>

            {/* Paper Container */}
            <div
                className="bg-white px-8 py-10 md:p-14 rounded-xl shadow-2xl shadow-slate-300/50 border border-slate-200 print:shadow-none print:border-none print:p-0 print:w-full relative overflow-hidden min-h-[1000px]"
                id="exam-paper"
            >
                {/* Print Watermark */}
                <div className="hidden print:block fixed inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
                    <p className="text-[8rem] font-bold -rotate-45 uppercase">{metadata.board}</p>
                </div>

                {/* --- QUESTION PAPER VIEW --- */}
                {viewMode === 'question' && (
                    <div className="font-serif text-black leading-relaxed relative z-10">

                        {/* Realistic Header */}
                        <div className="border-b-2 border-black pb-4 mb-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm font-bold">
                                        <span>Roll No.</span>
                                        <div className="flex">
                                            {[...Array(8)].map((_, i) => (
                                                <div key={i} className="w-6 h-8 border border-black"></div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-xs font-bold mt-2 max-w-[200px] leading-tight text-slate-600">
                                        Candidates must write the Q.P. Code on the title page of the answer-book.
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="border-2 border-black px-4 py-1 font-bold text-lg inline-block mb-1">
                                        {metadata.qpCode || '30/1/1'}
                                    </div>
                                    <div className="flex justify-end gap-2 text-sm font-bold">
                                        <span>Set</span>
                                        <div className="border border-black px-2">{metadata.set || '1'}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-6">
                                <h1 className="text-3xl font-bold uppercase tracking-widest mb-1">{metadata.subject}</h1>
                                <p className="text-sm font-bold uppercase tracking-wide opacity-80 mb-4">{metadata.board} - CLASS {metadata.class}</p>

                                <div className="flex justify-between text-sm font-bold border-t border-black pt-2 mt-2">
                                    <span>Time: {metadata.time}</span>
                                    <span>Max. Marks: {metadata.maxMarks}</span>
                                </div>
                            </div>
                        </div>

                        {/* General Instructions */}
                        {instructions && instructions.length > 0 && (
                            <div className="mb-8 text-sm">
                                <h3 className="font-bold underline mb-2 uppercase text-xs tracking-wider">General Instructions:</h3>
                                <ul className="list-decimal list-inside space-y-1 text-justify">
                                    {instructions.map((inst, index) => (
                                        <li key={index}>{inst}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Sections & Questions */}
                        <div className="space-y-8">
                            {sections.map((section, sIdx) => (
                                <div key={sIdx}>
                                    <div className="text-center mb-6 mt-8">
                                        <h4 className="font-bold text-lg uppercase decoration-2 underline underline-offset-4">{section.name}</h4>
                                        {section.descriptor && <p className="text-sm italic mt-1 font-sans text-slate-600">{section.descriptor}</p>}
                                    </div>

                                    <div className="space-y-6">
                                        {section.questions.map((q) => (
                                            <div key={q.questionNumber} className="break-inside-avoid relative flex gap-4">
                                                <span className="font-bold min-w-[1.5rem]">{q.questionNumber}.</span>
                                                <div className="flex-1">
                                                    <p className="mb-2 text-justify" dangerouslySetInnerHTML={{ __html: q.text }}></p>
                                                    {/* Using dangerous html for potential sub/sup scripts if AI generates them */}

                                                    {q.type === 'MCQ' && q.options && (
                                                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-2 pl-2">
                                                            {q.options.map((opt, oIdx) => (
                                                                <div key={oIdx} className="flex gap-2 text-sm">
                                                                    <span className="font-bold">({String.fromCharCode(97 + oIdx)})</span>
                                                                    <span>{opt}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="font-bold min-w-[2rem] text-right text-sm">
                                                    {q.marks}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center font-bold text-sm tracking-widest opacity-60">
                            ~~~~~~~~~~~~~
                        </div>
                    </div>
                )}

                {/* --- ANSWER KEY VIEW --- */}
                {viewMode === 'answer' && (
                    <div className="font-sans text-slate-800 relative z-10">
                        <div className="border-b-2 border-emerald-600 pb-4 mb-8 flex justify-between items-end">
                            <div>
                                <h1 className="text-2xl font-bold text-emerald-800 uppercase tracking-wide">Marking Scheme / Answer Key</h1>
                                <p className="font-medium opacity-75">{metadata.subject} • Class {metadata.class}</p>
                            </div>
                            <div className="text-right text-sm font-bold text-emerald-700">
                                {metadata.qpCode ? `Code: ${metadata.qpCode}` : 'Standard Set'}
                            </div>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-slate-200">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-emerald-50 text-emerald-900 border-b border-emerald-100">
                                    <tr>
                                        <th className="px-6 py-3 font-bold w-16">Q.No</th>
                                        <th className="px-6 py-3 font-bold">Answer / Value Points</th>
                                        <th className="px-6 py-3 font-bold w-32 text-right">Marks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {sections.map((section, sIdx) => (
                                        <React.Fragment key={sIdx}>
                                            <tr className="bg-slate-50/50">
                                                <td colSpan="3" className="px-6 py-2 font-bold text-xs uppercase tracking-wider text-slate-500">{section.name}</td>
                                            </tr>
                                            {section.questions.map((q) => (
                                                <tr key={q.questionNumber} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 font-bold align-top text-slate-700">{q.questionNumber}</td>
                                                    <td className="px-6 py-4 align-top">
                                                        <div className="mb-2 font-medium text-emerald-900">{q.answer || 'Answer not provided'}</div>
                                                        <div className="text-xs text-slate-500 italic bg-amber-50 inline-block px-2 py-1 rounded border border-amber-100">
                                                            Scheme: {q.markingScheme}
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
                    </div>
                )}

            </div>
        </div>
    );
};

export default PaperView;

