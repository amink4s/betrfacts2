
export interface User {
  id: string;
  username: string;
  pfp: string;
  points: number;
  role: 'admin' | 'user';
  contributions: number;
}

export interface BetrRound {
  id: string;
  roundNumber: number;
  title: string;
  description: string;
  imageUrl: string;
  submittedBy: string; // Username
  approved: boolean;
  timestamp: string;
  totalParticipants?: number;
  prizesWon?: string[];
}

export interface Contribution {
  id: string;
  userId: string;
  roundId: string;
  status: 'pending' | 'approved' | 'rejected';
  pointsAwarded: number;
  timestamp: string;
}
