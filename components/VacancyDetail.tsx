
import React, { useState, useEffect } from 'react';
import { Vacancy } from '../types';
import { ArrowLeft, CheckCircle2, XCircle, Star, Building2, Sparkles, Bookmark, MapPin, DollarSign, Briefcase } from 'lucide-react';
import { analyzeCompatibility } from '../services/geminiService';
import { MOCK_USER } from '../constants';

interface VacancyDetailProps {
    vacancy: Vacancy;
    onBack: () => void;
    onApply: (id: string) => void;
    onReject: (id: string) => void;
    isSaved: boolean;
    onToggleSave: (id: string) => void;
}

const VacancyDetail: React.FC<VacancyDetailProps> = ({ vacancy, onBack, onApply, onReject, isSaved, onToggleSave }) => {
    const [aiAnalysis, setAiAnalysis] = useState<string>('');
    const [loadingAi, setLoadingAi] = useState<boolean>(false);

    useEffect(() => {
        const fetchAnalysis = async () => {
            setLoadingAi(true);
            const analysis = await analyzeCompatibility(MOCK_USER, vacancy);
            setAiAnalysis(analysis);
            setLoadingAi(false);
        };
        fetchAnalysis();
    }, [vacancy.id]);

    return (
        <div className="flex flex-col h-full bg-white relative">
            {/* Header Area - Taller */}
            <div className="p-5 border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-30 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4 overflow-hidden">
                    <button onClick={onBack} className="p-2.5 rounded-full hover:bg-gray-100 flex-shrink-0 transition-colors">
                        <ArrowLeft size={28} className="text-textDark" />
                    </button>
                    <h2 className="font-bold text-xl text-textDark truncate">{vacancy.title}</h2>
                </div>
                <button
                    onClick={() => onToggleSave(vacancy.id)}
                    className={`p-2.5 rounded-full transition-all duration-300 flex-shrink-0 ${isSaved ? 'text-primary bg-primary/10 scale-110' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                    <Bookmark size={28} fill={isSaved ? "currentColor" : "none"} />
                </button>
            </div>

            {/* Scrollable Content - Increased Padding */}
            <div className="flex-1 overflow-y-auto p-6 pb-36 space-y-8 bg-neutral">

                {/* Company Header - Larger */}
                <div className="text-center bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="w-28 h-28 mx-auto bg-white rounded-3xl overflow-hidden mb-5 border-[6px] border-gray-50 shadow-md">
                        <img src={vacancy.company.logoUrl} alt={vacancy.company.name} className="w-full h-full object-cover" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-textDark mb-2 tracking-tight">{vacancy.company.name}</h1>
                    <div className="flex justify-center items-center gap-2 text-amber-500 font-bold bg-amber-50 inline-flex px-4 py-1.5 rounded-xl mx-auto border border-amber-100">
                        <span className="text-lg">{vacancy.company.glassdoorRating}</span>
                        <div className="flex"><Star size={18} fill="currentColor" /></div>
                        <span className="text-amber-700/70 text-sm font-medium">Glassdoor</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 mt-6">
                        <div className="flex items-center text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl px-4 py-2 border border-slate-200">
                            <MapPin size={16} className="mr-2 text-slate-400" />
                            {vacancy.company.location}
                        </div>
                        <div className="flex items-center text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl px-4 py-2 border border-slate-200">
                            <Briefcase size={16} className="mr-2 text-slate-400" />
                            {vacancy.workMode}
                        </div>
                        <div className="flex items-center text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl px-4 py-2 border border-slate-200">
                            <DollarSign size={16} className="mr-2 text-slate-400" />
                            {vacancy.salaryRange}
                        </div>
                    </div>
                </div>

                {/* AI Match Section */}
                <div className="bg-gradient-to-br from-primary/5 to-purple-50 p-6 rounded-3xl border border-primary/10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Sparkles size={80} className="text-primary" />
                    </div>
                    <div className="flex items-center gap-2 mb-4 text-primary font-bold text-sm uppercase tracking-wider relative z-10">
                        <Sparkles size={18} />
                        InternMatch AI
                    </div>
                    {loadingAi ? (
                        <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-3 py-1">
                                <div className="h-3 bg-primary/20 rounded"></div>
                                <div className="h-3 bg-primary/20 rounded w-3/4"></div>
                                <div className="h-3 bg-primary/20 rounded w-5/6"></div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-base text-slate-700 italic leading-relaxed font-medium relative z-10">"{aiAnalysis}"</p>
                    )}
                </div>

                {/* Sections - Text Base/LG */}
                <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-textDark mb-4 flex items-center gap-2">
                        <Building2 size={24} className="text-primary" /> Sobre a Empresa
                    </h3>
                    <p className="text-slate-600 text-base leading-relaxed">{vacancy.company.description}</p>
                </section>

                <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-textDark mb-4">Requisitos Obrigatórios</h3>
                    <ul className="space-y-4">
                        {vacancy.mandatoryRequirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-base text-slate-700 font-medium">
                                <div className="bg-emerald-50 p-1 rounded-full mt-0.5">
                                    <CheckCircle2 size={20} className="text-emerald-500" />
                                </div>
                                {req}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-textDark mb-4">Diferenciais</h3>
                    <ul className="space-y-4">
                        {vacancy.desirableRequirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-base text-slate-700 font-medium">
                                <div className="w-2 h-2 rounded-full bg-accent mt-2.5 min-w-[8px] ring-4 ring-accent/20"></div>
                                {req}
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-textDark mb-4">Benefícios</h3>
                    <div className="flex flex-wrap gap-3">
                        {vacancy.benefits.map((ben, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 text-center shadow-sm">
                                {ben}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Sticky Actions - Larger buttons */}
            <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-6 flex gap-5 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] z-20 pb-10">
                <button
                    onClick={() => onReject(vacancy.id)}
                    className="flex-1 py-4 rounded-2xl border-2 border-error/20 text-error font-bold text-base uppercase tracking-wide hover:bg-red-50 hover:border-error transition-all duration-300 flex justify-center items-center gap-2"
                >
                    <XCircle size={24} />
                    Dispensar
                </button>
                <button
                    onClick={() => onApply(vacancy.id)}
                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-primary to-primaryDark text-white font-bold text-base uppercase tracking-wide hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300 flex justify-center items-center gap-2"
                >
                    <CheckCircle2 size={24} />
                    Aplicar Agora
                </button>
            </div>
        </div>
    );
};

export default VacancyDetail;
