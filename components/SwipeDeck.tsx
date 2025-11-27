
import React, { useState, useRef, useEffect } from 'react';
import { Vacancy } from '../types';
import { X, Heart, SearchX, ArrowLeft, MapPin, Briefcase, DollarSign, Star, CheckCircle2, Building2, ThumbsUp, AlertCircle, Check, ExternalLink } from 'lucide-react';

interface SwipeDeckProps {
    vacancies: Vacancy[];
    onSwipeLeft: (id: string) => void;
    onSwipeRight: (id: string) => void;
    savedIds: string[];
    onGoBack: () => void;
}



const SwipeDeck: React.FC<SwipeDeckProps> = ({ vacancies, onSwipeLeft, onSwipeRight, savedIds, onGoBack }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    // Refs for direct DOM manipulation
    const cardRef = useRef<HTMLDivElement>(null);
    const likeOverlayRef = useRef<HTMLDivElement>(null);
    const nopeOverlayRef = useRef<HTMLDivElement>(null);

    const startPos = useRef({ x: 0, y: 0 });
    const currentPos = useRef({ x: 0, y: 0 });

    const currentVacancy = vacancies[currentIndex];

    useEffect(() => {
        // Reset card position when index changes
        if (cardRef.current) {
            cardRef.current.style.transform = 'translate(0px, 0px) rotate(0deg)';
            cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }
        if (likeOverlayRef.current) likeOverlayRef.current.style.opacity = '0';
        if (nopeOverlayRef.current) nopeOverlayRef.current.style.opacity = '0';

        currentPos.current = { x: 0, y: 0 };
        setIsDragging(false);
    }, [currentIndex]);

    const handleStart = (clientX: number, clientY: number) => {
        setIsDragging(true);
        startPos.current = { x: clientX, y: clientY };

        if (cardRef.current) {
            cardRef.current.style.transition = 'none';
        }
    };

    const handleMove = (clientX: number, clientY: number) => {
        if (!isDragging) return;

        const deltaX = clientX - startPos.current.x;
        const deltaY = clientY - startPos.current.y;
        currentPos.current = { x: deltaX, y: deltaY };

        const rotate = deltaX * 0.05;

        if (cardRef.current) {
            cardRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${rotate}deg)`;
        }

        // Update overlays opacity based on drag distance
        if (deltaX > 0) {
            const opacity = Math.min(deltaX / 100, 1);
            if (likeOverlayRef.current) likeOverlayRef.current.style.opacity = opacity.toString();
            if (nopeOverlayRef.current) nopeOverlayRef.current.style.opacity = '0';
        } else {
            const opacity = Math.min(Math.abs(deltaX) / 100, 1);
            if (nopeOverlayRef.current) nopeOverlayRef.current.style.opacity = opacity.toString();
            if (likeOverlayRef.current) likeOverlayRef.current.style.opacity = '0';
        }
    };

    const handleEnd = () => {
        setIsDragging(false);
        const threshold = 100;
        const deltaX = currentPos.current.x;

        if (deltaX > threshold) {
            // Swipe Right
            if (cardRef.current) {
                cardRef.current.style.transition = 'transform 0.4s ease-out';
                cardRef.current.style.transform = `translate(${window.innerWidth}px, ${currentPos.current.y}px) rotate(20deg)`;
            }
            setTimeout(() => {
                onSwipeRight(currentVacancy.id);
                setCurrentIndex(prev => prev + 1);
            }, 200);
        } else if (deltaX < -threshold) {
            // Swipe Left
            if (cardRef.current) {
                cardRef.current.style.transition = 'transform 0.4s ease-out';
                cardRef.current.style.transform = `translate(-${window.innerWidth}px, ${currentPos.current.y}px) rotate(-20deg)`;
            }
            setTimeout(() => {
                onSwipeLeft(currentVacancy.id);
                setCurrentIndex(prev => prev + 1);
            }, 200);
        } else {
            // Reset
            if (cardRef.current) {
                cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)';
                cardRef.current.style.transform = 'translate(0px, 0px) rotate(0deg)';
            }
            if (likeOverlayRef.current) likeOverlayRef.current.style.opacity = '0';
            if (nopeOverlayRef.current) nopeOverlayRef.current.style.opacity = '0';
        }
    };

    const onMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
    const onMouseMove = (e: React.MouseEvent) => {
        if (isDragging) e.preventDefault();
        handleMove(e.clientX, e.clientY);
    };
    const onMouseUp = () => handleEnd();
    const onMouseLeave = () => { if (isDragging) handleEnd(); };

    const onTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e: React.TouchEvent) => {
        if (isDragging && e.cancelable) {
            // Only prevent default if we are swiping horizontally primarily
            const deltaX = Math.abs(e.touches[0].clientX - startPos.current.x);
            const deltaY = Math.abs(e.touches[0].clientY - startPos.current.y);
            if (deltaX > deltaY) {
                e.preventDefault();
            }
        }
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => handleEnd();

    const manualSwipe = (direction: 'left' | 'right') => {
        if (!currentVacancy) return;

        if (direction === 'right') {
            if (cardRef.current) {
                cardRef.current.style.transition = 'transform 0.4s ease-out';
                cardRef.current.style.transform = `translate(${window.innerWidth}px, 0px) rotate(20deg)`;
            }
            setTimeout(() => {
                onSwipeRight(currentVacancy.id);
                setCurrentIndex(prev => prev + 1);
            }, 200);
        } else {
            if (cardRef.current) {
                cardRef.current.style.transition = 'transform 0.4s ease-out';
                cardRef.current.style.transform = `translate(-${window.innerWidth}px, 0px) rotate(-20deg)`;
            }
            setTimeout(() => {
                onSwipeLeft(currentVacancy.id);
                setCurrentIndex(prev => prev + 1);
            }, 200);
        }
    };

    const getApplicationUrl = () => {
        if (!currentVacancy) return '#';
        const query = encodeURIComponent(`${currentVacancy.title} ${currentVacancy.company.name} carreira estagio`);
        return `https://www.google.com/search?q=${query}`;
    };

    if (!currentVacancy) {
        return (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white animate-in fade-in duration-700 relative">
                <button onClick={onGoBack} className="absolute top-6 left-6 p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-50">
                    <ArrowLeft size={28} className="text-gray-700" />
                </button>
                <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6 shadow-soft">
                    <SearchX size={48} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-textDark mb-3">Não há mais vagas</h3>
                <p className="text-textLight text-lg">Você zerou as opções por enquanto. Volte mais tarde!</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 px-8 py-4 text-white font-bold text-base bg-primary rounded-full shadow-lg hover:bg-primaryDark transition-colors"
                >
                    Recarregar
                </button>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full flex flex-col overflow-hidden bg-neutral">

            {/* Back Button Area - Fixed at top */}
            <div className="absolute top-6 left-6 z-50">
                <button
                    onClick={onGoBack}
                    className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
                >
                    <ArrowLeft size={28} className="text-gray-700" />
                </button>
            </div>

            <div className="relative flex-1 w-full flex items-center justify-center p-3 sm:p-5">

                {/* Active Card Container */}
                <div
                    ref={cardRef}
                    className="absolute top-2 bottom-2 w-[95%] max-w-[500px] bg-white rounded-[3rem] shadow-2xl overflow-hidden z-20 flex flex-col border border-gray-100"
                    style={{
                        touchAction: 'pan-y',
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseLeave}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >
                    {/* Overlays */}
                    <div ref={likeOverlayRef} className="absolute top-16 left-8 z-50 border-[6px] border-secondary rounded-2xl px-6 py-2 transform -rotate-12 bg-white/90 backdrop-blur-sm shadow-xl pointer-events-none opacity-0 transition-opacity duration-200">
                        <span className="text-5xl font-bold text-secondary uppercase tracking-widest">QUERO</span>
                    </div>
                    <div ref={nopeOverlayRef} className="absolute top-16 right-8 z-50 border-[6px] border-error rounded-2xl px-6 py-2 transform rotate-12 bg-white/90 backdrop-blur-sm shadow-xl pointer-events-none opacity-0 transition-opacity duration-200">
                        <span className="text-5xl font-bold text-error uppercase tracking-widest">PASSO</span>
                    </div>

                    {/* Card Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto relative bg-white"
                        onMouseDown={(e) => e.stopPropagation()}
                        onTouchStart={(e) => e.stopPropagation()}
                    >
                        {/* Header Image - Modern Gradient */}
                        <div className="h-48 bg-gradient-to-br from-primary to-purple-600 relative flex items-center justify-center overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <div className="text-white font-bold text-4xl tracking-wider flex items-center gap-3 opacity-90 z-10">
                                <Building2 size={40} />
                                <span>InternMatch</span>
                            </div>
                            <div className="absolute -bottom-12 left-8 z-20">
                                <img
                                    src={currentVacancy.company.logoUrl}
                                    alt={currentVacancy.company.name}
                                    className="w-24 h-24 rounded-3xl border-[6px] border-white shadow-lg object-cover bg-white"
                                />
                            </div>
                        </div>

                        <div className="mt-16 px-8 pb-40">
                            {/* Title & Company */}
                            <div className="mb-8">
                                <h2 className="text-3xl font-extrabold text-textDark leading-tight mb-3 tracking-tight">{currentVacancy.title}</h2>
                                <div className="flex items-center gap-3 text-textLight">
                                    <span className="font-bold text-primary text-xl">{currentVacancy.company.name}</span>
                                    <span className="text-gray-300">•</span>
                                    <div className="flex items-center gap-1.5 text-amber-500 text-base font-bold bg-amber-50 px-3 py-1 rounded-lg border border-amber-100">
                                        <span>{currentVacancy.company.glassdoorRating}</span>
                                        <Star size={14} fill="currentColor" />
                                    </div>
                                </div>
                            </div>

                            {/* Match Analysis Section */}
                            {currentVacancy.matchAnalysis && (
                                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-6 mb-8 border border-indigo-100 shadow-sm">
                                    <div className="flex justify-between items-center mb-5">
                                        <h3 className="font-bold text-indigo-900 flex items-center gap-2 text-lg">
                                            <ThumbsUp size={20} className="text-primary" /> Análise de IA
                                        </h3>
                                        <div className={`
                                    px-4 py-1.5 rounded-full text-sm font-bold border shadow-sm
                                    ${currentVacancy.matchPercentage && currentVacancy.matchPercentage > 80
                                                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                                : currentVacancy.matchPercentage && currentVacancy.matchPercentage > 50
                                                    ? 'bg-amber-100 text-amber-800 border-amber-200'
                                                    : 'bg-red-100 text-red-800 border-red-200'
                                            }
                                `}>
                                            {currentVacancy.matchPercentage}% Match
                                        </div>
                                    </div>

                                    <div className="space-y-5">
                                        <div>
                                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-3 block flex items-center gap-1">
                                                <CheckCircle2 size={12} /> Pontos Fortes
                                            </span>
                                            <ul className="space-y-2">
                                                {currentVacancy.matchAnalysis.positives.map((pos, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-base text-slate-700 font-medium">
                                                        <Check size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                                                        <span>{pos}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="w-full h-px bg-indigo-100"></div>

                                        <div>
                                            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-3 block flex items-center gap-1">
                                                <AlertCircle size={12} /> Onde Melhorar
                                            </span>
                                            <ul className="space-y-2">
                                                {currentVacancy.matchAnalysis.improvements.map((imp, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-base text-slate-700 font-medium">
                                                        <AlertCircle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                                                        <span>{imp}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Tags - Larger text */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                <div className="flex items-center text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl px-4 py-2.5 border border-slate-200">
                                    <MapPin size={16} className="mr-2 text-slate-400" />
                                    {currentVacancy.company.location}
                                </div>
                                <div className="flex items-center text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl px-4 py-2.5 border border-slate-200">
                                    <Briefcase size={16} className="mr-2 text-slate-400" />
                                    {currentVacancy.workMode}
                                </div>
                                <div className="flex items-center text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl px-4 py-2.5 border border-slate-200">
                                    <DollarSign size={16} className="mr-2 text-slate-400" />
                                    {currentVacancy.salaryRange}
                                </div>
                            </div>

                            <hr className="border-gray-100 mb-8" />

                            {/* Description - Increased base font size */}
                            <section className="mb-8">
                                <h3 className="font-bold text-textDark mb-4 flex items-center gap-2 text-xl">
                                    <Building2 size={24} className="text-primary" /> Sobre a vaga
                                </h3>
                                <p className="text-slate-600 text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    {currentVacancy.description}
                                </p>
                                <p className="text-slate-400 text-sm leading-relaxed mt-3 italic px-2">
                                    "{currentVacancy.company.description}"
                                </p>
                            </section>

                            {/* Requirements */}
                            <section className="mb-8">
                                <h3 className="font-bold text-textDark mb-4 text-xl">Requisitos</h3>
                                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                                    <ul className="space-y-4">
                                        {currentVacancy.mandatoryRequirements.map((req, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-base text-slate-700 font-medium">
                                                <div className="bg-white p-1.5 rounded-full shadow-sm mt-0.5 text-secondary">
                                                    <CheckCircle2 size={16} />
                                                </div>
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </section>

                            {/* Benefits */}
                            <section className="mb-8">
                                <h3 className="font-bold text-textDark mb-4 text-xl">Benefícios</h3>
                                <div className="flex flex-wrap gap-3">
                                    {currentVacancy.benefits.map((ben, idx) => (
                                        <span key={idx} className="bg-white border border-gray-200 text-slate-600 px-4 py-2 rounded-xl text-sm font-bold shadow-sm">
                                            {ben}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* External Link */}
                            <section className="mb-4">
                                <a
                                    href={getApplicationUrl()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center py-4 rounded-2xl border-2 border-primary/10 text-primary font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-base"
                                >
                                    Ver vaga completa no site da empresa
                                    <ExternalLink size={18} />
                                </a>
                            </section>
                        </div>
                    </div>

                    {/* Floating Gradient */}
                    <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none z-10" />

                    {/* Action Buttons - Larger for Pro Max thumb reach */}
                    <div className="absolute bottom-8 left-0 w-full flex justify-center gap-8 items-center z-50 pointer-events-auto">
                        <button
                            onClick={(e) => { e.stopPropagation(); manualSwipe('left'); }}
                            className="w-20 h-20 rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 text-gray-300 flex items-center justify-center hover:text-error hover:scale-110 hover:bg-red-50 active:scale-95 transition-all duration-300 group"
                        >
                            <X size={40} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <button
                            onClick={(e) => { e.stopPropagation(); manualSwipe('right'); }}
                            className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-primaryDark shadow-[0_10px_40px_-10px_rgba(99,102,241,0.5)] text-white flex items-center justify-center hover:scale-110 hover:shadow-[0_20px_50px_-10px_rgba(99,102,241,0.6)] active:scale-95 transition-all duration-300"
                        >
                            <Heart size={44} fill="currentColor" strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwipeDeck;


