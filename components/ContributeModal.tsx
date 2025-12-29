import React, { useState } from 'react';
import { X, Upload, Info } from 'lucide-react';
import NeonButton from './NeonButton';
import { User, BetrRound } from '../types';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newRound: BetrRound) => void;
  user: User | null;
  nextRoundNumber: number;
}

const ContributeModal: React.FC<ContributeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  user,
  nextRoundNumber
}) => {
  const [formData, setFormData] = useState({
    roundNumber: nextRoundNumber,
    title: '',
    artist: '',
    description: '',
    image: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRound: BetrRound = {
      id: `round-${formData.roundNumber}-${Date.now()}`,
      roundNumber: Number(formData.roundNumber),
      title: formData.title,
      description: formData.description,
      imageUrl: formData.image || `https://picsum.photos/seed/${Math.random()}/600/400`,
      nftLink: '',
      submittedBy: user?.username || 'anonymous',
      approved: false,
      timestamp: new Date().toISOString(),
      artist: formData.artist
    };
    
    onSubmit(newRound);
    // Reset local form
    setFormData({ 
      roundNumber: formData.roundNumber + 1, 
      title: '', 
      artist: '',
      description: '', 
      image: '' 
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-[#0a0a0a] border border-fuchsia-500/30 rounded-3xl w-full max-w-xl overflow-hidden shadow-[0_0_50px_rgba(217,70,239,0.2)]">
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <h2 className="text-2xl font-black orbitron neon-text-purple">SUBMIT ROUND</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase orbitron">Round Number</label>
              <input 
                type="number" 
                required
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-500"
                value={formData.roundNumber}
                onChange={e => setFormData({...formData, roundNumber: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase orbitron">Title</label>
              <input 
                type="text" 
                required
                placeholder="e.g. The Holiday Heist"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-500"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase orbitron">Artist Username</label>
            <input 
              type="text" 
              required
              placeholder="e.g. artist.eth"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-500"
              value={formData.artist}
              onChange={e => setFormData({...formData, artist: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase orbitron">Description / Details</label>
            <textarea 
              required
              rows={4}
              placeholder="Tell us what happened in this round..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-500 resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase orbitron">Round Banner Image URL</label>
            <div className="relative">
              <Upload className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
              <input 
                type="url" 
                placeholder="https://..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-10 py-3 text-white outline-none focus:border-fuchsia-500"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
              />
            </div>
          </div>

          <div className="bg-fuchsia-500/5 border border-fuchsia-500/20 p-4 rounded-2xl flex gap-3">
            <Info size={20} className="text-fuchsia-500 shrink-0" />
            <p className="text-xs text-zinc-400">
              Submissions are reviewed by admins. Accurate information earns <span className="text-fuchsia-500 font-bold">facts points</span> and increases your $FACTS airdrop eligibility.
            </p>
          </div>

          <NeonButton type="submit" className="w-full py-4 text-lg">POST CONTRIBUTION</NeonButton>
        </form>
      </div>
    </div>
  );
};

export default ContributeModal;