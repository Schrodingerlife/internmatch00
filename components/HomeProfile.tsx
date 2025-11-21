
import React from 'react';
import { UserProfile } from '../types';
import { MapPin, BookOpen, TrendingUp, Zap, Heart, ArrowRight, BarChart2, User, CheckCircle } from 'lucide-react';

interface HomeProfileProps {
  user: UserProfile;
  onStartMatching: () => void;
  onViewSaved: () => void;
  onViewDashboard: () => void;
  onViewProfile: () => void;
  savedCount: number;
}

const HomeProfile: React.FC<HomeProfileProps> = ({ user, onStartMatching, onViewSaved, onViewDashboard, onViewProfile, savedCount }) => {
  return (
    <div className="flex flex-col h-full bg-gray-50 relative font-sans">
      
      {/* Top Header Background with Glassmorphism - Taller for Pro Max */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-b-[50px] z-0 shadow-2xl">
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 pt-16 z-10 overflow-y-auto no-scrollbar pb-32">
        
        {/* Profile Header Block */}
        <div className="flex flex-col items-center w-full mb-10">
            <div className="relative mb-5 group cursor-pointer" onClick={onViewProfile}>
                <div className="w-36 h-36 rounded-full p-1.5 bg-white/20 backdrop-blur-md shadow-xl transition-transform hover:scale-105">
                    <div className="w-full h-full rounded-full bg-white overflow-hidden border-4 border-white">
                    <img 
                        src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=3F51B5&color=fff&size=256`} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                    />
                    </div>
                </div>
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight text-center">{user.name}</h1>
            <div className="flex items-center text-indigo-100 text-base bg-white/10 px-5 py-2 rounded-full backdrop-blur-md border border-white/10 mt-1">
                <MapPin size={16} className="mr-2" />
                <span className="font-medium">São Paulo, SP</span>
            </div>
        </div>

        {/* Floating Stats Card */}
        <div className="w-full bg-white rounded-3xl p-6 shadow-xl shadow-indigo-900/5 mb-8 flex justify-between items-center border border-gray-100/50">
            <div className="flex flex-col items-center flex-1 border-r border-gray-100">
                <span className="text-3xl font-bold text-gray-800">42</span>
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wide mt-1">Visitas</span>
            </div>
            <div className="flex flex-col items-center flex-1 border-r border-gray-100">
                <span className="text-3xl font-bold text-indigo-600">12</span>
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wide mt-1">Matches</span>
            </div>
            <div className="flex flex-col items-center flex-1">
                <span className="text-3xl font-bold text-yellow-500">Lvl 5</span>
                <span className="text-xs text-gray-400 uppercase font-bold tracking-wide mt-1">Nível</span>
            </div>
        </div>

        {/* Action Grid - Taller buttons for large screens */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
             {/* Explore Button */}
             <button 
               onClick={onStartMatching}
               className="bg-gradient-to-br from-primary to-indigo-700 p-5 rounded-3xl shadow-lg shadow-indigo-500/30 flex flex-col items-start justify-between h-44 relative overflow-hidden group transition-all hover:scale-[1.02]"
             >
                 <div className="bg-white/20 p-3 rounded-2xl mb-2 backdrop-blur-sm">
                    <Zap className="text-yellow-300" size={24} fill="currentColor" />
                 </div>
                 <div className="relative z-10 text-left">
                     <span className="block text-white font-bold text-xl leading-none mb-1">Explorar</span>
                     <span className="text-indigo-200 text-sm block leading-tight">Encontrar Vagas</span>
                 </div>
                 <div className="absolute right-[-15px] bottom-[-15px] opacity-20 rotate-[-15deg] group-hover:rotate-0 transition-transform duration-500">
                    <Zap size={90} className="text-white"/>
                 </div>
             </button>

             {/* Saved Vacancies Button */}
             <button 
               onClick={onViewSaved}
               className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start justify-between h-44 relative overflow-hidden group transition-all hover:scale-[1.02] hover:border-pink-200 hover:shadow-md"
             >
                 <div className="bg-pink-50 p-3 rounded-2xl mb-2 group-hover:bg-pink-100 transition-colors">
                    <Heart className="text-pink-500" size={24} fill={savedCount > 0 ? "currentColor" : "none"} />
                 </div>
                 <div className="relative z-10 text-left w-full">
                     <span className="block text-gray-800 font-bold text-xl leading-none mb-1">Salvas</span>
                     <div className="flex items-center justify-between w-full">
                        <span className="text-pink-500 text-sm font-bold block bg-pink-50 px-3 py-1 rounded-full mt-1">
                            {savedCount}
                        </span>
                        <ArrowRight size={18} className="text-gray-300 group-hover:text-pink-500 transition-colors" />
                     </div>
                 </div>
             </button>

             {/* Dashboard Button */}
             <button 
               onClick={onViewDashboard}
               className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start justify-between h-44 relative overflow-hidden group transition-all hover:scale-[1.02] hover:border-orange-200 hover:shadow-md"
             >
                 <div className="bg-orange-50 p-3 rounded-2xl mb-2 group-hover:bg-orange-100 transition-colors">
                    <BarChart2 className="text-orange-500" size={24} />
                 </div>
                 <div className="relative z-10 text-left w-full">
                     <span className="block text-gray-800 font-bold text-xl leading-none mb-1">Painel</span>
                     <span className="text-gray-400 text-sm block leading-tight">Meu Progresso</span>
                 </div>
             </button>

             {/* Profile Button */}
             <button 
               onClick={onViewProfile}
               className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start justify-between h-44 relative overflow-hidden group transition-all hover:scale-[1.02] hover:border-blue-200 hover:shadow-md"
             >
                 <div className="bg-blue-50 p-3 rounded-2xl mb-2 group-hover:bg-blue-100 transition-colors">
                    <User className="text-blue-500" size={24} />
                 </div>
                 <div className="relative z-10 text-left w-full">
                     <span className="block text-gray-800 font-bold text-xl leading-none mb-1">Perfil</span>
                     <span className="text-gray-400 text-sm block leading-tight">Editar Dados</span>
                 </div>
             </button>
        </div>

        {/* Academic Info */}
        <div className="w-full mb-8">
            <h3 className="text-gray-800 font-bold text-xl mb-4 flex items-center gap-2">
                <BookOpen size={24} className="text-primary"/>
                <span>Acadêmico</span>
            </h3>
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-green-100 text-green-700 text-xs font-bold px-4 py-2 rounded-bl-2xl">
                    MATRICULADO
                </div>
                <div className="flex flex-col gap-4">
                    <div>
                        <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Curso</span>
                        <h4 className="font-bold text-gray-800 text-xl mt-1">{user.course}</h4>
                        <p className="text-base text-gray-500">{user.university}</p>
                    </div>
                    <div className="w-full h-px bg-gray-100 my-2"></div>
                    <div className="flex justify-between items-center">
                        <div>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Semestre</span>
                            <p className="font-bold text-gray-800 text-lg">{user.semester}º <span className="text-gray-400 font-normal">/ 8</span></p>
                        </div>
                         <div>
                            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider text-right block">Formatura</span>
                            <p className="font-bold text-gray-800 text-lg">Dez/2026</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Profile Health */}
        <div className="w-full mb-10">
             <div className="flex justify-between items-end mb-4">
                <h3 className="text-gray-800 font-bold text-xl flex items-center gap-2">
                    <TrendingUp size={24} className="text-primary"/>
                    <span>Força do Perfil</span>
                </h3>
                <span className="text-primary font-bold text-xl">85%</span>
             </div>
             
             <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                 <div className="w-full bg-gray-100 rounded-full h-4 mb-5 overflow-hidden">
                    <div className="bg-gradient-to-r from-secondary to-green-400 h-4 rounded-full shadow-lg shadow-green-200" style={{ width: '85%' }}></div>
                 </div>
                 <div className="space-y-4">
                     <div className="flex items-center justify-between text-base">
                         <div className="flex items-center gap-2 text-gray-600">
                             <div className="bg-green-100 p-1.5 rounded-full"><CheckCircle size={14} className="text-green-600"/></div>
                             Currículo Atualizado
                         </div>
                         <span className="text-xs text-gray-400">Há 2 dias</span>
                     </div>
                     <div className="flex items-center justify-between text-base opacity-60">
                         <div className="flex items-center gap-2 text-gray-500">
                             <div className="bg-gray-100 p-1.5 rounded-full border border-gray-300"><div className="w-3.5 h-3.5 rounded-full"></div></div>
                             Adicionar Bio
                         </div>
                         <span className="text-sm text-primary font-bold cursor-pointer">+15%</span>
                     </div>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};

export default HomeProfile;
