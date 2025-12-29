import React from 'react';
import { User, BetrRound } from '../types';
import { Trophy, Gift, Share2, ArrowUpRight } from 'lucide-react';
import NeonButton from '../components/NeonButton';

interface ProfileProps {
  user: User;
  userRounds: BetrRound[];
}

const Profile: React.FC<ProfileProps> = ({ user, userRounds }) => {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          <div className="relative">
            <div className="w-32 h-32 rounded-3xl border-4 border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.5)] overflow-hidden">
              <img src={user.pfp} alt={user.username} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-black border border-fuchsia-500 px-3 py-1 rounded-lg text-xs font-black text-fuchsia-500 orbitron">
              RANK #12
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-black orbitron mb-2 neon-text-purple">@{user.username}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
              <span className="bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Trophy size={12} className="text-amber-500" /> TOP CONTRIBUTOR
              </span>
              <span className="bg-fuchsia-500/10 text-fuchsia-500 border border-fuchsia-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase orbitron tracking-tighter">
                {user.role}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-black/40 border border-zinc-800 p-3 rounded-2xl">
                <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1 orbitron">POINTS</p>
                <p className="text-xl font-black text-white">{user.points.toLocaleString()}</p>
              </div>
              <div className="bg-black/40 border border-zinc-800 p-3 rounded-2xl">
                <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1 orbitron">Edits</p>
                <p className="text-xl font-black text-white">{user.contributions}</p>
              </div>
              <div className="bg-black/40 border border-zinc-800 p-3 rounded-2xl">
                <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1 orbitron">$BETR Share</p>
                <p className="text-xl font-black text-cyan-400">0.02%</p>
              </div>
              <div className="bg-black/40 border border-zinc-800 p-3 rounded-2xl">
                <p className="text-zinc-500 text-[10px] uppercase font-bold mb-1 orbitron">Rewards</p>
                <p className="text-xl font-black text-emerald-400">Claimable</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* No template/mock cards. Will be filled by backend data. */}
        {userRounds.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl">
            No contributions yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
