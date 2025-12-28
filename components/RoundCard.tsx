
import React from 'react';
import { BetrRound } from '../types';
import { Clock, User, CheckCircle, Info } from 'lucide-react';

interface RoundCardProps {
  round: BetrRound;
}

const RoundCard: React.FC<RoundCardProps> = ({ round }) => {
  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 hover:border-fuchsia-500/50 rounded-xl overflow-hidden transition-all duration-300 group shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={round.imageUrl} 
          alt={round.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-fuchsia-500/50 flex items-center gap-2">
          <span className="text-fuchsia-500 font-bold orbitron">ROUND {round.roundNumber}</span>
        </div>
        {!round.approved && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-amber-500/90 text-black font-black px-4 py-1 rounded-md orbitron">PENDING APPROVAL</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-400 transition-colors">
            {round.title}
          </h3>
          {round.approved && <CheckCircle size={18} className="text-cyan-500 mt-1" />}
        </div>
        
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
          {round.description}
        </p>

        <div className="flex items-center justify-between text-xs text-zinc-500 border-t border-zinc-800 pt-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden">
              <img src={`https://picsum.photos/seed/${round.submittedBy}/20`} alt="" />
            </div>
            <span className="hover:text-white transition-colors cursor-pointer">@{round.submittedBy}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{new Date(round.timestamp).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoundCard;
