import React from 'react';
import { Printer, FileText } from 'lucide-react';

const PaperView = ({ paper }) => {
    if (!paper) return null;

    const { metadata, instructions, sections } = paper;

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

            <div className="flex justify-between items-center mb-6 print:hidden">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <FileText className="text-brand" />
                    Generated Paper
                </h3>
                <button
                    onClick={() => window.print()}
                    className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
                >
                    <Printer size={18} />
                    <span className="font-bold">Print / Save PDF</span>
                </button>
            </div>

            {/* Paper Container */}
            <div
                className="bg-white p-8 md:p-16 rounded-xl shadow-2xl shadow-slate-300/50 border border-slate-200 print:shadow-none print:border-none print:p-0 print:w-full relative overflow-hidden"
                id="exam-paper"
            >
                {/* Vintage/Paper Texture Overlay (Subtle) */}
                <div className="absolute inset-0 bg-[#fdfbf7] opacity-50 pointer-events-none mix-blend-multiply print:hidden"></div>

                <div className="relative z-10 font-serif text-slate-900">
                    {/* Header */}
                    <div className="text-center border-b-4 border-double border-slate-800 pb-8 mb-10">
                        <h1 className="text-4xl font-extrabold uppercase tracking-widest mb-3 font-serif">{metadata.board} BOARD EXAM</h1>
                        <h2 className="text-xl font-bold text-slate-700 uppercase tracking-wide">Class {metadata.class} • {metadata.subject}</h2>
                        <div className="flex justify-between mt-8 text-sm font-bold text-slate-600 uppercase tracking-widest border-t border-slate-300 pt-4">
                            <span>Time: {metadata.time}</span>
                            <span>Max Marks: {metadata.maxMarks}</span>
                        </div>
                    </div>

                    {/* Instructions */}
                    {instructions && instructions.length > 0 && (
                        <div className="mb-10 bg-slate-50 p-6 border border-slate-200 rounded-lg print:border-slate-300">
                            <h3 className="font-bold underline mb-4 text-slate-800 uppercase text-xs tracking-widest">General Instructions:</h3>
                            <ul className="list-decimal list-inside text-sm space-y-2 text-slate-700 leading-relaxed font-sans">
                                {instructions.map((inst, index) => (
                                    <li key={index}>{inst.replace(/^\d+[.)]\s*/, '')}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Questions */}
                    <div className="space-y-12">
                        {sections.map((section, sIdx) => (
                            <div key={sIdx}>
                                <div className="flex justify-between items-end mb-6 border-b-2 border-slate-800 pb-2">
                                    <h4 className="font-bold text-xl uppercase tracking-wider text-slate-800">{section.name}</h4>
                                    <span className="font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded text-sm print:bg-transparent">{section.marks} Marks</span>
                                </div>
                                <div className="space-y-8">
                                    {section.questions.map((q) => (
                                        <div key={q.questionNumber} className="break-inside-avoid relative group">
                                            <div className="flex gap-4">
                                                <span className="font-bold text-lg min-w-[2rem] text-slate-800">{q.questionNumber}.</span>
                                                <div className="flex-1">
                                                    <p className="mb-3 font-medium text-slate-900 leading-relaxed text-lg">
                                                        {q.text.replace(/^\d+[.)]\s*/, '').replace(/^Q\d+[.)]\s*/i, '')}
                                                    </p>
                                                    {q.type === 'MCQ' && q.options && (
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 mt-4 ml-2">
                                                            {q.options.map((opt, oIdx) => (
                                                                <div key={oIdx} className="text-base text-slate-800 font-medium flex items-start gap-2">
                                                                    <span className="font-bold min-w-[1.5rem] inline-block">({String.fromCharCode(65 + oIdx)})</span>
                                                                    <span>{opt.replace(/^[A-D][.)]\s*/, '').replace(/^\([A-D]\)\s*/, '')}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="font-bold min-w-[3rem] text-right text-slate-500 font-sans text-sm pt-1">[{q.marks}]</div>
                                            </div>

                                            {/* Marking Scheme visual improvement */}
                                            <div className="mt-4 ml-12 p-4 bg-emerald-50/50 text-sm border-l-4 border-emerald-500 text-emerald-900 print:hidden rounded-r-lg opacity-80 group-hover:opacity-100 transition-opacity">
                                                <strong className="block mb-2 text-emerald-700 uppercase tracking-widest text-[10px] font-sans">Marking Scheme / Solution</strong>
                                                <div className="font-serif leading-relaxed">{q.markingScheme}</div>
                                                {q.answer && <div className="mt-2 pt-2 border-t border-emerald-200/50 text-emerald-800"><strong>Answer:</strong> {q.answer}</div>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center text-slate-300 text-sm font-sans uppercase tracking-widest print:text-slate-400">
                        *** End of Paper ***
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaperView;
