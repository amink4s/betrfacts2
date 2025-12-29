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
  const [user, setUser] = useState<User | null>(null); // No default user
  const [rounds, setRounds] = useState<BetrRound[]>([]); // No default rounds
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await sdk.quickAuth.fetch(`${BACKEND_ORIGIN}/me`);
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          console.debug('QuickAuth userData:', userData);
        } else {
          console.debug('QuickAuth fetch failed:', res.status, res.statusText);
        }
      } catch (err) {
        console.error('QuickAuth error:', err);
      }
      sdk.actions.ready();
    })();
  }, []);

  const handleLogin = async () => {
    try {
      const res = await sdk.quickAuth.fetch(`${BACKEND_ORIGIN}/me`);
      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        console.debug('Manual QuickAuth userData:', userData);
      } else {
        console.debug('Manual QuickAuth fetch failed:', res.status, res.statusText);
      }
    } catch (err) {
      console.error('Manual QuickAuth error:', err);
    }
  };

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
      {/* DEBUG: Show user object and error info */}
      <div className="fixed top-16 right-0 z-50 bg-black/80 text-xs text-fuchsia-400 p-2 max-w-md overflow-x-auto border-l border-fuchsia-500/30">
        <div>DEBUG user: {user ? JSON.stringify(user) : 'null'}</div>
      </div>
      
      <Navbar user={user} onLogin={handleLogin} />
      
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
