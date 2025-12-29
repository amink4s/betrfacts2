import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './db';
import { createClient, Errors } from '@farcaster/quick-auth';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const quickAuthClient = createClient();

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Betrmint backend running!' });
});

app.get('/test-db', async (_req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, error: errorMsg });
  }
});

app.get('/me', async (req, res) => {
  const auth = req.headers.authorization;
  console.log('DEBUG /me Authorization header:', auth);
  if (!auth || !auth.startsWith('Bearer ')) {
    console.log('DEBUG /me: Missing or invalid Authorization header');
    return res.status(401).json({ error: 'Missing token' });
  }
  try {
    const payload = await quickAuthClient.verifyJwt({
      token: auth.split(' ')[1],
      domain: process.env.HOSTNAME || 'localhost',
    });
    const fid = payload.sub;
    console.log('DEBUG /me: Token payload:', payload);
    // Upsert user in DB (username is placeholder, replace with real if available)
    const dbUser = await query(
      `INSERT INTO users (id, username, role, points, contributions)
       VALUES ($1, $2, 'user', 0, 0)
       ON CONFLICT (id) DO UPDATE SET id=EXCLUDED.id
       RETURNING *`,
      [fid, `user${fid}`]
    );
    console.log('DEBUG /me: DB user:', dbUser.rows[0]);
    res.json(dbUser.rows[0]);
  } catch (e) {
    console.error('DEBUG /me: Error verifying token or DB:', e);
    if (e instanceof Errors.InvalidTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
