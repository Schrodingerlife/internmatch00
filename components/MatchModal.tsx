import React from 'react';
import { Vacancy } from '../types';
import { MessageCircle, X, CheckCircle, ArrowRight, Building2 } from 'lucide-react';

interface MatchModalProps {
    vacancy: Vacancy;
    onClose: () => void;
    onSendMessage: () => void;
}

const MatchModal: React.FC<MatchModalProps> = ({ vacancy, onClose, onSendMessage }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border-4 border-white ring-1 ring-gray-200">

                {/* Header Gradient */}
                <div className="bg-gradient-to-br from-secondary to-emerald-600 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10">
                        <h2 className="text-4xl font-black text-white italic tracking-tighter drop-shadow-md transform -rotate-2">IT'S A MATCH!</h2>
                        <p className="text-emerald-100 font-medium mt-2">Você e {vacancy.company.name} deram match</p>
                    </div>
                </div>

                <div className="px-6 py-8 flex flex-col items-center">

                    {/* Avatars */}
                    <div className="flex items-center justify-center -space-x-4 mb-8">
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100 z-10">
                            <img src={`https://ui-avatars.com/api/?name=User&background=6366f1&color=fff`} alt="You" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white z-20">
                            <img src={vacancy.company.logoUrl} alt={vacancy.company.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute bg-white rounded-full p-2 shadow-md z-30 text-secondary">
                            <CheckCircle size={24} fill="currentColor" className="text-white" />
                        </div>
                    </div>

                    {/* Company Info */}
                    <div className="text-center mb-8">
                        <h3 className="text-xl font-bold text-textDark mb-1">{vacancy.title}</h3>
                        <div className="flex items-center justify-center gap-2 text-textLight text-sm font-medium">
                            <Building2 size={14} />
                            {vacancy.company.name}
                        </div>
                    </div>

                    {/* Next Steps */}
                    <div className="w-full bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                        <h4 className="text-sm font-bold text-textDark mb-3 uppercase tracking-wider">Próximos Passos</h4>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">1</div>
                                <span>A empresa receberá seu perfil completo.</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">2</div>
                                <span>Envie uma mensagem para demonstrar interesse.</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full space-y-3">
                        <button
                            onClick={onSendMessage}
                            className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary/30 hover:bg-primaryDark hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                        >
                            <MessageCircle size={20} strokeWidth={2.5} />
                            Enviar Mensagem
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-gray-50 text-gray-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
                        >
                            Continuar Buscando
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MatchModal;
