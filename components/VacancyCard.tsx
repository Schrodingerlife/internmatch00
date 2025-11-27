
import React from 'react';
import { Vacancy } from '../types';
import { MapPin, Briefcase, DollarSign, Bookmark, ArrowRight } from 'lucide-react';

interface VacancyCardProps {
  vacancy: Vacancy;
  onClick: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy, onClick, isSaved, onToggleSave }) => {

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(vacancy.id);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[2rem] shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 p-5 mb-5 cursor-pointer border border-gray-100 active:scale-[0.98] relative group overflow-hidden"
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex-shrink-0 bg-white">
            <img
              src={vacancy.company.logoUrl}
              alt={vacancy.company.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-textDark text-lg leading-tight group-hover:text-primary transition-colors">{vacancy.title}</h3>
            <p className="text-textLight text-sm font-medium mt-1">{vacancy.company.name}</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleBookmarkClick}
        className={`absolute top-5 right-5 p-2.5 rounded-full transition-all duration-300 z-20 ${isSaved ? 'text-primary bg-primary/10 scale-110' : 'text-gray-300 hover:text-primary hover:bg-primary/5'}`}
      >
        <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} strokeWidth={isSaved ? 2.5 : 2} />
      </button>

      <div className={`
        absolute top-[4.5rem] right-5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wide uppercase
        ${vacancy.matchPercentage > 80 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}
      `}>
        {vacancy.matchPercentage}% Match
      </div>

      <div className="flex flex-wrap gap-2 mt-5 relative z-10">
        <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
          <MapPin size={14} className="mr-1.5 text-slate-400" />
          {vacancy.company.location}
        </div>
        <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
          <Briefcase size={14} className="mr-1.5 text-slate-400" />
          {vacancy.workMode}
        </div>
        <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
          <DollarSign size={14} className="mr-1.5 text-slate-400" />
          {vacancy.salaryRange}
        </div>
      </div>

      <div className="mt-4 flex items-center text-primary text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
        Ver detalhes <ArrowRight size={16} className="ml-1" />
      </div>
    </div>
  );
};

export default VacancyCard;
