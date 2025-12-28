import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import { User, BetrRound } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null); // No default user
  const [rounds, setRounds] = useState<BetrRound[]>([]); // No default rounds
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // TODO: Integrate Farcaster QuickAuth
  };

  const handleAddRound = () => {
    // TODO: Open contribution modal after backend integration
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
    </div>
  );
};

export default App;
