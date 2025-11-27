
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { MapPin, BookOpen, TrendingUp, Zap, Heart, ArrowRight, BarChart2, User, CheckCircle, Menu, Bell, Home, Settings, LogOut, FileText } from 'lucide-react';

interface HomeProfileProps {
    user: UserProfile;
    onStartMatching: () => void;
    onViewSaved: () => void;
    onViewDashboard: () => void;
    onViewProfile: () => void;
    savedCount: number;
    onUploadResume?: () => void;
    onToggleMenu: () => void;
    onToggleNotifications: () => void;
}

const HomeProfile: React.FC<HomeProfileProps> = ({ user, onStartMatching, onViewSaved, onViewDashboard, onViewProfile, savedCount, onUploadResume, onToggleMenu, onToggleNotifications }) => {

    return (
        <div className="flex flex-col h-full bg-neutral relative font-sans overflow-hidden">

            {/* Fixed Header Section */}
            <div className="relative z-20 bg-white shadow-sm rounded-b-[3rem] overflow-hidden flex-shrink-0">
                {/* Background Gradient */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary to-purple-700 z-0">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>

                {/* Header Controls */}
                <div className="relative z-50 flex justify-between items-center p-6 pt-8 text-white">
                    <button onClick={onToggleMenu} className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-colors">
                        <Menu size={24} />
                    </button>
                    <div className="font-bold text-lg tracking-wide opacity-90">InternMatch</div>
                    <button onClick={onToggleNotifications} className="p-2 bg-white/20 backdrop-blur-md rounded-xl hover:bg-white/30 transition-colors relative">
                        <Bell size={24} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-error rounded-full border border-white/50"></span>
                    </button>
                </div>

                {/* Profile Info (Fixed) */}
                <div className="relative z-10 flex flex-col items-center pb-8 px-6">
                    <div className="relative mb-4 group cursor-pointer" onClick={onViewProfile}>
                        <div className="w-32 h-32 rounded-3xl p-1.5 bg-white/10 backdrop-blur-md shadow-2xl transition-transform hover:scale-105 border border-white/20 rotate-3 hover:rotate-0 duration-300">
                            <div className="w-full h-full rounded-2xl bg-white overflow-hidden border-4 border-white/50">
                                <img
                                    src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=6366f1&color=fff&size=256`}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-3xl font-extrabold text-white mb-1 tracking-tight text-center drop-shadow-md">{user.name}</h1>
                    <div className="flex items-center text-indigo-50 text-xs font-bold bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10 mt-1 shadow-lg">
                        <MapPin size={14} className="mr-1.5" />
                        <span>São Paulo, SP</span>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6 relative z-10">

                {/* Floating Stats Card */}
                <div className="w-full bg-white rounded-3xl p-5 shadow-soft flex justify-between items-center border border-gray-50 -mt-2">
                    <div className="flex flex-col items-center flex-1 border-r border-gray-100">
                        <span className="text-2xl font-black text-textDark">42</span>
                        <span className="text-[10px] text-textLight uppercase font-bold tracking-wider mt-1">Visitas</span>
                    </div>
                    <div className="flex flex-col items-center flex-1 border-r border-gray-100">
                        <span className="text-2xl font-black text-primary">12</span>
                        <span className="text-[10px] text-textLight uppercase font-bold tracking-wider mt-1">Matches</span>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                        <span className="text-2xl font-black text-accent">Lvl 5</span>
                        <span className="text-[10px] text-textLight uppercase font-bold tracking-wider mt-1">Nível</span>
                    </div>
                </div>

                {/* Action Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Explore Button */}
                    <button
                        onClick={onStartMatching}
                        className="col-span-2 bg-gradient-to-r from-primary to-purple-600 p-6 rounded-3xl shadow-lg shadow-primary/30 flex items-center justify-between relative overflow-hidden group transition-all hover:scale-[1.02]"
                    >
                        <div className="relative z-10 text-left">
                            <div className="bg-white/20 w-fit p-2 rounded-xl mb-2 backdrop-blur-sm">
                                <Zap className="text-yellow-300" size={24} fill="currentColor" />
                            </div>
                            <span className="block text-white font-bold text-2xl leading-none mb-1">Explorar Vagas</span>
                            <span className="text-indigo-100 text-sm font-medium">Encontrar oportunidades</span>
                        </div>
                        <div className="absolute right-[-10px] bottom-[-20px] opacity-20 rotate-[-15deg] group-hover:rotate-0 transition-transform duration-500">
                            <Zap size={120} className="text-white" />
                        </div>
                        <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
                            <ArrowRight className="text-white" size={24} />
                        </div>
                    </button>

                    {/* Saved Vacancies Button */}
                    <button
                        onClick={onViewSaved}
                        className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start justify-between h-40 relative overflow-hidden group transition-all hover:scale-[1.02] hover:border-pink-200"
                    >
                        <div className="bg-pink-50 p-3 rounded-2xl mb-2">
                            <Heart className="text-pink-500" size={24} fill={savedCount > 0 ? "currentColor" : "none"} />
                        </div>
                        <div className="text-left w-full">
                            <span className="block text-textDark font-bold text-lg leading-none mb-1">Salvas</span>
                            <span className="text-pink-500 text-xs font-bold bg-pink-50 px-2 py-0.5 rounded-full inline-block">
                                {savedCount} vagas
                            </span>
                        </div>
                    </button>

                    {/* Dashboard Button */}
                    <button
                        onClick={onViewDashboard}
                        className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-start justify-between h-40 relative overflow-hidden group transition-all hover:scale-[1.02] hover:border-orange-200"
                    >
                        <div className="bg-orange-50 p-3 rounded-2xl mb-2">
                            <BarChart2 className="text-orange-500" size={24} />
                        </div>
                        <div className="text-left w-full">
                            <span className="block text-textDark font-bold text-lg leading-none mb-1">Painel</span>
                            <span className="text-textLight text-xs font-medium">Progresso</span>
                        </div>
                    </button>
                </div>

                {/* Academic Info */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-indigo-50 p-2 rounded-xl">
                            <BookOpen size={20} className="text-primary" />
                        </div>
                        <h3 className="text-textDark font-bold text-lg">Acadêmico</h3>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div>
                            <span className="text-[10px] text-textLight font-bold uppercase tracking-wider">Curso</span>
                            <h4 className="font-bold text-textDark text-lg leading-tight">{user.course}</h4>
                            <p className="text-sm text-textLight font-medium mt-1">{user.university}</p>
                        </div>
                        <div className="w-full h-px bg-gray-50 my-1"></div>
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-[10px] text-textLight font-bold uppercase tracking-wider">Semestre</span>
                                <p className="font-bold text-textDark text-base">{user.semester}º <span className="text-gray-400 font-normal">/ 8</span></p>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-textLight font-bold uppercase tracking-wider">Formatura</span>
                                <p className="font-bold text-textDark text-base">Dez/2026</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Profile Health */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm mb-20">
                    <div className="flex justify-between items-end mb-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-50 p-2 rounded-xl">
                                <TrendingUp size={20} className="text-secondary" />
                            </div>
                            <h3 className="text-textDark font-bold text-lg">Perfil</h3>
                        </div>
                        <span className="text-secondary font-black text-lg">85%</span>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4 overflow-hidden">
                        <div className="bg-gradient-to-r from-secondary to-emerald-400 h-full rounded-full shadow-lg shadow-emerald-200" style={{ width: '85%' }}></div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-textDark font-medium">
                            <CheckCircle size={16} className="text-secondary" />
                            <span>Currículo Atualizado</span>
                        </div>
                        <span className="text-primary font-bold text-xs cursor-pointer hover:underline">+15%</span>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default HomeProfile;
