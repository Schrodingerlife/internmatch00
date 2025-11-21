import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles } from 'lucide-react';
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
        className="fixed bottom-20 right-4 bg-gradient-to-r from-primary to-indigo-600 text-white p-4 rounded-full shadow-xl z-50 hover:scale-105 transition-transform"
      >
        <MessageCircle size={28} />
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 text-[10px] items-center justify-center text-white font-bold">AI</span>
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-full bg-black/50 z-50 flex items-end sm:items-center sm:justify-center p-0 sm:p-4">
      <div className="bg-white w-full h-[85%] sm:h-[600px] sm:w-[400px] sm:rounded-2xl rounded-t-2xl flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Chat Header */}
        <div className="bg-primary p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-300" />
            <div>
                <h3 className="font-bold">InternMatch AI</h3>
                <p className="text-xs opacity-80">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-indigo-700 rounded">
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`
                max-w-[80%] p-3 rounded-2xl text-sm
                ${msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'}
              `}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
               <div className="bg-white px-4 py-2 rounded-full border border-gray-200 text-xs text-gray-500 italic">
                 Digitando...
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center pb-6 sm:pb-3">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre carreira, currículo..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="bg-primary text-white p-3 rounded-full hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAssistant;
