import React from 'react';
import { Bell, Menu } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "InternMatch" }) => {
  return (
    <header className="bg-primary text-white p-4 sticky top-0 z-50 shadow-md flex justify-between items-center">
      <button className="p-1 rounded hover:bg-indigo-700 transition-colors">
        <Menu size={24} />
      </button>
      <h1 className="text-lg font-bold tracking-wide">{title}</h1>
      <button className="p-1 rounded hover:bg-indigo-700 transition-colors relative">
        <Bell size={24} />
        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-accent ring-2 ring-primary transform translate-x-1/4 -translate-y-1/4"></span>
      </button>
    </header>
  );
};

export default Header;
