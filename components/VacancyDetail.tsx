
import React, { useState, useEffect } from 'react';
import { Vacancy } from '../types';
import { ArrowLeft, CheckCircle2, XCircle, Star, Building2, Sparkles, Bookmark } from 'lucide-react';
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
      <div className="p-5 border-b border-gray-100 sticky top-0 bg-white z-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4 overflow-hidden">
            <button onClick={onBack} className="p-2.5 rounded-full hover:bg-gray-100 flex-shrink-0">
            <ArrowLeft size={28} className="text-textDark" />
            </button>
            <h2 className="font-bold text-xl text-textDark truncate">{vacancy.title}</h2>
        </div>
        <button 
            onClick={() => onToggleSave(vacancy.id)}
            className={`p-2.5 rounded-full transition-colors flex-shrink-0 ${isSaved ? 'text-primary bg-indigo-50' : 'text-gray-400 hover:bg-gray-100'}`}
        >
            <Bookmark size={28} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Scrollable Content - Increased Padding */}
      <div className="flex-1 overflow-y-auto p-6 pb-32 space-y-8">
        
        {/* Company Header - Larger */}
        <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-3xl overflow-hidden mb-4 border-2 border-gray-200">
                 <img src={vacancy.company.logoUrl} alt={vacancy.company.name} className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">{vacancy.company.name}</h1>
            <div className="flex justify-center items-center gap-2 text-yellow-500 font-medium bg-yellow-50 inline-flex px-3 py-1 rounded-lg mx-auto">
                <span className="text-lg">{vacancy.company.glassdoorRating}</span>
                <div className="flex"><Star size={18} fill="currentColor" /></div>
                <span className="text-textLight text-sm font-normal">Rating Glassdoor</span>
            </div>
        </div>

        {/* AI Match Section */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-2xl border border-indigo-100 shadow-sm">
            <div className="flex items-center gap-2 mb-3 text-primary font-bold text-sm uppercase tracking-wider">
                <Sparkles size={18} />
                InternMatch AI
            </div>
            {loadingAi ? (
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-3 py-1">
                        <div className="h-3 bg-indigo-200 rounded"></div>
                        <div className="h-3 bg-indigo-200 rounded w-3/4"></div>
                    </div>
                </div>
            ) : (
                <p className="text-base text-gray-700 italic leading-relaxed">"{aiAnalysis}"</p>
            )}
        </div>

        {/* Sections - Text Base/LG */}
        <section>
            <h3 className="text-lg font-bold text-textDark mb-3 flex items-center gap-2">
                <Building2 size={22} className="text-textLight"/> Sobre a Empresa
            </h3>
            <p className="text-textLight text-base leading-relaxed">{vacancy.company.description}</p>
        </section>

        <hr className="border-gray-100" />

        <section>
            <h3 className="text-lg font-bold text-textDark mb-4">Requisitos Obrigatórios</h3>
            <ul className="space-y-3">
                {vacancy.mandatoryRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-gray-700">
                        <CheckCircle2 size={20} className="text-secondary min-w-[20px] mt-0.5" />
                        {req}
                    </li>
                ))}
            </ul>
        </section>

        <section>
            <h3 className="text-lg font-bold text-textDark mb-4">Diferenciais</h3>
            <ul className="space-y-3">
                {vacancy.desirableRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-base text-gray-700">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2 min-w-[8px]"></div>
                        {req}
                    </li>
                ))}
            </ul>
        </section>

        <section>
             <h3 className="text-lg font-bold text-textDark mb-4">Benefícios</h3>
             <div className="grid grid-cols-2 gap-3">
                 {vacancy.benefits.map((ben, idx) => (
                     <div key={idx} className="bg-neutral p-3 rounded-xl text-sm font-medium text-gray-600 text-center">
                         {ben}
                     </div>
                 ))}
             </div>
        </section>
      </div>

      {/* Sticky Actions - Larger buttons */}
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 p-6 flex gap-5 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] z-20 pb-10">
        <button 
            onClick={() => onReject(vacancy.id)}
            className="flex-1 py-4 rounded-2xl border-2 border-error text-error font-bold text-base uppercase tracking-wide hover:bg-red-50 transition-colors flex justify-center items-center gap-2"
        >
            <XCircle size={24} />
            Dispensar
        </button>
        <button 
            onClick={() => onApply(vacancy.id)}
            className="flex-1 py-4 rounded-2xl bg-primary text-white font-bold text-base uppercase tracking-wide hover:bg-indigo-700 shadow-lg transition-colors flex justify-center items-center gap-2"
        >
            <CheckCircle2 size={24} />
            Aplicar Agora
        </button>
      </div>
    </div>
  );
};

export default VacancyDetail;
