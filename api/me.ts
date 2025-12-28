import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient, Errors } from '@farcaster/quick-auth';
const axios = require('axios');
const { query } = require('./db.js');

const quickAuthClient = createClient();

export default async function handler(req: any, res: any) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing token' });
  }
  try {
    const payload = await quickAuthClient.verifyJwt({
      token: auth.split(' ')[1],
      domain: process.env.HOSTNAME || 'localhost',
    });
    const fid = payload.sub;
    // Fetch user profile from Neynar
    const neynarApiKey = process.env.NEYNAR_API_KEY;
    const neynarResp = await axios.get(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
      { headers: { 'accept': 'application/json', 'api_key': neynarApiKey } }
    );
    const userData = neynarResp.data.users && neynarResp.data.users[0];
    const username = userData?.username || `user${fid}`;
    const pfp = userData?.pfp?.url || '';
    // Upsert user in DB with real username and pfp
    const dbUser = await query(
      `INSERT INTO users (id, username, pfp, role, points, contributions)
       VALUES ($1, $2, $3, 'user', 0, 0)
       ON CONFLICT (id) DO UPDATE SET username=EXCLUDED.username, pfp=EXCLUDED.pfp
       RETURNING *`,
      [fid, username, pfp]
    );
    res.json(dbUser.rows[0]);
  } catch (e: any) {
    if (e instanceof Errors.InvalidTokenError) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.status(500).json({ error: 'Server error', details: e.message });
  }
}
