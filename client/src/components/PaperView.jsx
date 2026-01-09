import React from 'react';
import { Printer } from 'lucide-react';

const PaperView = ({ paper }) => {
    if (!paper) return null;

    const { metadata, instructions, sections } = paper;

    return (
        <div className="md:max-w-4xl mx-auto">
            {paper.isMock && (
                <div className="bg-amber-50 border-l-4 border-amber-500 text-amber-700 p-4 mb-6 rounded-r-lg shadow-sm print:hidden" role="alert">
                    <p className="font-bold flex items-center gap-2">
                        <span>⚠️</span> API Limit Reached (Free Tier)
                    </p>
                    <p className="text-sm mt-1">The system is using <strong>Mock Data</strong> as the daily AI quota is exhausted.</p>
                </div>
            )}

            <div className="flex justify-end mb-6 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="bg-slate-800 hover:bg-slate-900 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Printer size={18} />
                    <span className="font-medium">Print Paper</span>
                </button>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-slate-200 print:shadow-none print:border-none print:p-0 print:w-full font-serif" id="exam-paper">
                {/* Header */}
                <div className="text-center border-b-2 border-slate-800 pb-6 mb-8">
                    <h1 className="text-3xl font-bold uppercase tracking-wider mb-2 font-serif text-slate-900">{metadata.board} BOARD EXAM</h1>
                    <h2 className="text-xl font-bold text-slate-700 uppercase">Class {metadata.class} • {metadata.subject}</h2>
                    <div className="flex justify-between mt-6 text-sm font-bold text-slate-600 uppercase tracking-wide border-t border-slate-200 pt-4">
                        <span>Time: {metadata.time}</span>
                        <span>Max Marks: {metadata.maxMarks}</span>
                    </div>
                </div>

                {/* Instructions */}
                {instructions && instructions.length > 0 && (
                    <div className="mb-8">
                        <h3 className="font-bold underline mb-3 text-slate-800 uppercase text-sm">General Instructions:</h3>
                        <ul className="list-decimal list-inside text-sm space-y-1.5 text-slate-700">
                            {instructions.map((inst, index) => (
                                <li key={index}>{inst.replace(/^\d+[.)]\s*/, '')}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Questions */}
                <div className="space-y-10">
                    {sections.map((section, sIdx) => (
                        <div key={sIdx}>
                            <div className="flex justify-between items-center bg-slate-100 p-3 mb-6 font-bold border-y-2 border-slate-300 print:bg-transparent print:border-slate-800">
                                <span className="uppercase text-slate-800">{section.name}</span>
                                <span className="text-slate-800">{section.marks} Marks</span>
                            </div>
                            <div className="space-y-8">
                                {section.questions.map((q) => (
                                    <div key={q.questionNumber} className="break-inside-avoid">
                                        <div className="flex gap-4">
                                            <span className="font-bold w-8 text-slate-800">{q.questionNumber}.</span>
                                            <div className="flex-1">
                                                <p className="mb-2 font-medium text-slate-900 leading-relaxed">
                                                    {q.text.replace(/^\d+[.)]\s*/, '').replace(/^Q\d+[.)]\s*/i, '')}
                                                </p>
                                                {q.type === 'MCQ' && q.options && (
                                                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-3 ml-4">
                                                        {q.options.map((opt, oIdx) => (
                                                            <div key={oIdx} className="text-sm text-slate-800 font-medium">
                                                                <span className="font-bold mr-2">({String.fromCharCode(65 + oIdx)})</span>
                                                                {opt.replace(/^[A-D][.)]\s*/, '').replace(/^\([A-D]\)\s*/, '')}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="font-bold w-12 text-right text-slate-600">[{q.marks}]</div>
                                        </div>

                                        {/* Marking Scheme visual improvement */}
                                        <div className="mt-3 ml-12 p-3 bg-green-50 text-xs border-l-4 border-green-500 text-green-800 print:hidden rounded-r-md">
                                            <strong className="block mb-1 text-green-700 uppercase tracking-wide text-[10px]">Marking Scheme</strong>
                                            {q.markingScheme}
                                            {q.answer && <div className="mt-2 pt-2 border-t border-green-200"><strong>Answer:</strong> {q.answer}</div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaperView;
