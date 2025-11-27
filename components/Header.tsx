import React from 'react';
import { Bell, Menu, Home } from 'lucide-react';
import { AppView } from '../types';

interface HeaderProps {
  title?: string;
  onToggleMenu: () => void;
  onToggleNotifications: () => void;
  onNavigate: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ title = "InternMatch", onToggleMenu, onToggleNotifications, onNavigate }) => {
  return (
    <header className="bg-white/80 backdrop-blur-md text-textDark p-5 sticky top-0 z-40 shadow-sm flex justify-between items-center border-b border-gray-100">
      <button onClick={onToggleMenu} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
        <Menu size={24} strokeWidth={2} />
      </button>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-1">
        <button onClick={() => onNavigate('home')} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
          <Home size={24} strokeWidth={2} />
        </button>
        <button onClick={onToggleNotifications} className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors relative">
          <Bell size={24} strokeWidth={2} />
          <span className="absolute top-1.5 right-2 block h-2.5 w-2.5 rounded-full bg-error ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
