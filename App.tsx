import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import ContributeModal from './components/ContributeModal';
import { User, BetrRound } from './types';
import { sdk } from '@farcaster/miniapp-sdk';


const BACKEND_ORIGIN = '/api';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); 
  const [rounds, setRounds] = useState<BetrRound[]>([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { token } = await sdk.quickAuth.getToken();
        if (!token) {
          console.error('No QuickAuth token received');
          return;
        }
        const res = await fetch(`${BACKEND_ORIGIN}/me`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        let userData = null;
        if (res.ok) {
          userData = await res.json();
        } else {
          console.debug('QuickAuth fetch failed:', res.status, res.statusText);
        }
        // Always try to get pfp from miniapp context if available
        try {
          const context = await sdk.context;
          if (context?.user?.pfpUrl) {
            userData = { ...userData, pfp: context.user.pfpUrl };
          }
        } catch (e) {
          // context may not be available, fallback to backend pfp
        }
        setUser(userData);
      } catch (err) {
        console.error('QuickAuth error:', err);
      }
      sdk.actions.ready();
    })();
  }, []);

  const handleAddRound = () => {
    setIsModalOpen(true);
  };

  const handleContributeSubmit = (newRound: BetrRound) => {
    setRounds(prev => [newRound, ...prev]);
    setIsModalOpen(false);
    // TODO: Send to backend instead of local state
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit contribution to backend
  };

  const handleApprove = (id: string) => {
    setRounds(prev => prev.map(r => r.id === id ? { ...r, approved: true } : r));
    // In a real app, update user points too
  };

  const handleReject = (id: string) => {
    setRounds(prev => prev.filter(r => r.id !== id));
  };

  const pendingRounds = rounds.filter(r => !r.approved);
  const approvedRounds = rounds.filter(r => r.approved);
  const userRounds = rounds.filter(r => r.submittedBy === user?.username && r.approved);

  return (
    <div className="min-h-screen pb-20">
      <Navbar user={user} onLogin={undefined} />
      
      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Feed rounds={approvedRounds} onAddRound={handleAddRound} />} />
          <Route path="/rounds" element={<Feed rounds={approvedRounds} onAddRound={handleAddRound} />} />
          <Route path="/profile" element={user ? <Profile user={user} userRounds={userRounds} /> : <div className="text-center py-20 text-zinc-500">Please Login.</div>} />
          {user?.role === 'admin' && (
            <Route path="/admin" element={
              <AdminDashboard 
                pendingRounds={pendingRounds} 
                onApprove={handleApprove} 
                onReject={handleReject} 
              />
            } />
          )}
        </Routes>
      </main>
      <ContributeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleContributeSubmit}
        user={user}
        nextRoundNumber={rounds.length > 0 ? Math.max(...rounds.map(r => r.roundNumber)) + 1 : 1}
      />
    </div>
  );
};

export default App;
