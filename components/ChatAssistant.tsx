import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles, Bot } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { GeminiChatMessage } from '../types';

interface ChatAssistantProps {
  currentVacancyTitle?: string;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ currentVacancyTitle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<GeminiChatMessage[]>([
    { role: 'model', text: 'Olá! Sou o assistente de carreira da InternMatch. Como posso ajudar com sua busca por estágio?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg as GeminiChatMessage]);
    setInput('');
    setIsTyping(true);

    const context = currentVacancyTitle ? `O usuário está vendo a vaga: ${currentVacancyTitle}` : "O usuário está na tela principal.";

    const responseText = await getChatResponse(messages, userMsg.text, context);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsTyping(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-primary to-primaryDark text-white p-4 rounded-full shadow-lg shadow-primary/30 z-50 hover:scale-110 transition-all duration-300 group"
      >
        <MessageCircle size={28} strokeWidth={2.5} />
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-accent text-[10px] items-center justify-center text-white font-bold">AI</span>
        </span>
        <div className="absolute bottom-full right-0 mb-3 w-48 bg-white p-3 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none text-xs text-textDark font-medium border border-gray-100">
          Precisa de ajuda com seu currículo?
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white transform rotate-45 border-b border-r border-gray-100"></div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-center pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto transition-opacity duration-300"
        onClick={() => setIsOpen(false)}
      ></div>

      <div className="bg-white w-full h-[85%] sm:h-[650px] sm:w-[420px] sm:rounded-[2.5rem] rounded-t-[2.5rem] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300 pointer-events-auto relative border-[8px] border-white ring-1 ring-gray-200">
        {/* Chat Header */}
        <div className="bg-white/90 backdrop-blur-md p-5 flex justify-between items-center border-b border-gray-100 absolute top-0 left-0 w-full z-10">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-primary to-purple-600 p-2.5 rounded-xl shadow-lg shadow-primary/20">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-textDark text-lg leading-tight">InternMatch AI</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-xs text-textLight font-medium">Online agora</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 pt-24 pb-4 space-y-6 bg-neutral">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm
                ${msg.role === 'user'
                  ? 'bg-gradient-to-br from-primary to-primaryDark text-white rounded-tr-none'
                  : 'bg-white text-slate-600 border border-gray-100 rounded-tl-none'}
              `}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white px-5 py-3 rounded-full border border-gray-100 text-xs text-primary font-bold flex items-center gap-2 shadow-sm">
                <Sparkles size={14} className="animate-spin" />
                Digitando...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-white border-t border-gray-100 flex gap-3 items-center pb-8 sm:pb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-gray-50 rounded-2xl px-5 py-4 text-sm font-medium text-textDark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim()}
            className="bg-primary text-white p-4 rounded-2xl hover:bg-primaryDark disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
          >
            <Send size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
