
import React from 'react';
import { Vacancy } from '../types';
import { MapPin, Briefcase, DollarSign, Bookmark } from 'lucide-react';

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
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 mb-5 cursor-pointer border border-gray-100 active:scale-[0.98] transform transition-transform duration-200 relative group"
    >
      <div className="flex justify-between items-start mb-4 pr-10">
        <div className="flex items-center gap-4">
          <img 
            src={vacancy.company.logoUrl} 
            alt={vacancy.company.name} 
            className="w-16 h-16 rounded-xl object-cover border border-gray-200"
          />
          <div>
            <h3 className="font-bold text-textDark text-xl leading-tight">{vacancy.title}</h3>
            <p className="text-textLight text-base font-medium mt-1">{vacancy.company.name}</p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handleBookmarkClick}
        className={`absolute top-5 right-5 p-2.5 rounded-full transition-colors ${isSaved ? 'text-primary bg-indigo-50' : 'text-gray-400 hover:bg-gray-100'}`}
      >
        <Bookmark size={24} fill={isSaved ? "currentColor" : "none"} />
      </button>

      <div className={`
        absolute top-[5.5rem] right-5 px-3 py-1 rounded-full text-xs font-bold
        ${vacancy.matchPercentage > 80 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
      `}>
        {vacancy.matchPercentage}% Match
      </div>

      <div className="flex flex-wrap gap-3 mt-5">
        <div className="flex items-center text-sm text-textLight bg-neutral rounded-lg px-3 py-1.5">
          <MapPin size={14} className="mr-1.5" />
          {vacancy.company.location}
        </div>
        <div className="flex items-center text-sm text-textLight bg-neutral rounded-lg px-3 py-1.5">
          <Briefcase size={14} className="mr-1.5" />
          {vacancy.workMode}
        </div>
        <div className="flex items-center text-sm text-textLight bg-neutral rounded-lg px-3 py-1.5">
          <DollarSign size={14} className="mr-1.5" />
          {vacancy.salaryRange}
        </div>
      </div>
    </div>
  );
};

export default VacancyCard;
