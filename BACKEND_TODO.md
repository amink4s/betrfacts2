# Betrmint Wiki Companion: Backend Integration Roadmap & TODO

## 1. Codebase Review Summary
- **Frontend**: Built with React, Vite, Tailwind, and React Router. Contains pages for Feed, Admin Dashboard, and Profile. UI is casino-neon themed.
- **Current Data**: Uses mock data for users and rounds (see `constants.tsx`). All contributions, approvals, and points are simulated in-memory.
- **Authentication**: Placeholder for Farcaster QuickAuth, not implemented.
- **Admin Flow**: Admins can approve/reject rounds, but logic is local only.
- **Contribution Flow**: Users submit round info (artist, round name, NFT link, image), but data is not persisted.

## 2. Backend & Database Roadmap
### A. Backend API
- [ ] Create a backend (Node.js/Express or similar) to handle:
  - User authentication via Farcaster QuickAuth (using Neynar API)
  - CRUD for rounds/contributions
  - Admin approval/rejection endpoints
  - Points calculation and storage
  - User info retrieval and update

### B. Database (NeonDB/Postgres)
- [ ] Design schema for:
  - Users (id, username, pfp, role, points, contributions)
  - Rounds (id, round_number, title, description, image_url, submitted_by, approved, timestamp, nft_link)
  - Contributions (id, user_id, round_id, status, points_awarded, timestamp)
  - Admin Approvals (id, round_id, admin_id, status, timestamp)
- [ ] Write SQL for schema creation

### C. Farcaster/Neynar Integration
- [ ] Integrate Neynar API for QuickAuth
- [ ] Store user info on first login
- [ ] Use Neynar to verify user identity for contributions

### D. Frontend Refactor
- [ ] Remove all mock/template cards and placeholders
- [ ] Connect frontend to backend API for all data
- [ ] Implement real login/logout with Farcaster
- [ ] Show real user points and contributions
- [ ] Admin dashboard to show real pending contributions
- [ ] Approve/reject flows update DB and user points

### E. Points & Airdrop Logic
- [ ] Award points only after admin approval (4/4)
- [ ] Store points in DB for future airdrop
- [ ] Export points data for airdrop

## 3. Immediate TODO (Clean Slate)
- [ ] Remove all mock/template cards and placeholder data from frontend
- [ ] Preserve all UI elements and structure
- [ ] Prepare frontend for backend integration (API hooks, etc.)

---

**This file should be updated as progress is made.**
