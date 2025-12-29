import React from 'react';
import { BetrRound } from '../types';
import { Check, X, Eye } from 'lucide-react';
import NeonButton from '../components/NeonButton';

interface AdminDashboardProps {
  pendingRounds: BetrRound[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ pendingRounds, onApprove, onReject }) => {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black orbitron neon-text-cyan">MODERATION QUEUE</h1>
        <div className="bg-cyan-500/10 border border-cyan-500/50 px-4 py-1 rounded-full text-cyan-500 font-bold orbitron text-xs">
          {pendingRounds.length} PENDING
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-zinc-900/50 text-left border-b border-zinc-800">
              <th className="px-6 py-4 font-bold text-zinc-400 orbitron text-xs">ROUND #</th>
              <th className="px-6 py-4 font-bold text-zinc-400 orbitron text-xs">USER</th>
              <th className="px-6 py-4 font-bold text-zinc-400 orbitron text-xs">TITLE</th>
              <th className="px-6 py-4 font-bold text-zinc-400 orbitron text-xs">DATE</th>
              <th className="px-6 py-4 font-bold text-zinc-400 orbitron text-xs text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900">
            {pendingRounds.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-10 text-zinc-500">
                  No pending rounds.
                </td>
              </tr>
            )}
            {pendingRounds.map(round => (
              <tr key={round.id}>
                <td className="px-6 py-4 font-bold text-fuchsia-500">{round.roundNumber}</td>
                <td className="px-6 py-4">@{round.submittedBy}</td>
                <td className="px-6 py-4">{round.title}</td>
                <td className="px-6 py-4">{new Date(round.timestamp).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <NeonButton variant="cyan" size="sm" className="mr-2" onClick={() => onApprove(round.id)}>
                    <Check size={16} /> Approve
                  </NeonButton>
                  <NeonButton variant="danger" size="sm" onClick={() => onReject(round.id)}>
                    <X size={16} /> Reject
                  </NeonButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
