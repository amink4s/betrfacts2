import React from 'react';
import { NavLink } from 'react-router-dom';
import { User as UserIcon, Home, List, ShieldCheck, PlusCircle } from 'lucide-react';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogin: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogin }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-fuchsia-500/20">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full border-2 border-fuchsia-500 flex items-center justify-center bg-black overflow-hidden shadow-[0_0_10px_rgba(217,70,239,0.5)]">
               <span className="text-fuchsia-500 font-black text-xl orbitron">B</span>
            </div>
            <span className="hidden sm:block text-xl font-black orbitron bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">BETRMINT WIKI</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/" className={({ isActive }) => `flex items-center gap-1 transition-colors ${isActive ? 'text-fuchsia-500' : 'text-zinc-400 hover:text-white'}`}>
              <span>Feed</span>
            </NavLink>
            <NavLink to="/rounds" className={({ isActive }) => `flex items-center gap-1 transition-colors ${isActive ? 'text-fuchsia-500' : 'text-zinc-400 hover:text-white'}`}>
              <span>Rounds</span>
            </NavLink>
            {user?.role === 'admin' && (
              <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-1 transition-colors ${isActive ? 'text-cyan-500' : 'text-zinc-400 hover:text-white'}`}>
                <span>Admin</span>
              </NavLink>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <NavLink to="/profile" className="flex items-center gap-3 bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-fuchsia-500/30 p-1 pr-3 rounded-full transition-all group">
              <img src={user.pfp || 'https://placehold.co/32x32'} alt={user.username} className="w-8 h-8 rounded-full border border-zinc-700 group-hover:border-fuchsia-500 transition-colors" />
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm font-bold text-white">@{user.username}</span>
                <span className="text-[10px] text-fuchsia-400 font-bold">{user.points?.toLocaleString() ?? 0} Karma</span>
              </div>
            </NavLink>
          ) : (
            <button 
              onClick={onLogin}
              className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-all orbitron text-xs shadow-[0_0_15px_rgba(217,70,239,0.4)]"
            >
              QUICKAUTH
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
