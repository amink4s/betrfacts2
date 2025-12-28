import React, { useState } from 'react';
import { BetrRound } from '../types';
import RoundCard from '../components/RoundCard';
import { PlusCircle, Search } from 'lucide-react';
import NeonButton from '../components/NeonButton';

interface FeedProps {
  rounds: BetrRound[];
  onAddRound: () => void;
}

const Feed: React.FC<FeedProps> = ({ rounds, onAddRound }) => {
  const [search, setSearch] = useState('');
  const filteredRounds = rounds.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.roundNumber.toString().includes(search)
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-black orbitron mb-4 neon-text-purple tracking-tighter">
          BETRFACTS
        </h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed">
          The crowdsourced chronicle of every <span className="text-fuchsia-500 font-bold">Betrmint</span> spin. Document the history, earn points, get the airdrop.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Search rounds, keywords, or numbers..."
            className="w-full bg-[#0a0a0a] border border-zinc-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl py-3 pl-10 pr-4 text-white transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <NeonButton 
          variant="cyan" 
          className="flex items-center gap-2 whitespace-nowrap"
          onClick={onAddRound}
        >
          <PlusCircle size={18} />
          Contribute
        </NeonButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* No template cards. Will be filled by backend data. */}
        {filteredRounds.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-2xl">
            No rounds found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
