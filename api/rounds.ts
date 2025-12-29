import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './db.mjs';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') {
    // Create a new round/contribution
    const { roundNumber, title, description, imageUrl, nftLink, artist, submittedBy } = req.body;
    if (!title || !description || !imageUrl || !submittedBy || !artist) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
      const dbRes = await query(
        `INSERT INTO rounds (round_number, title, description, image_url, nft_link, artist, submitted_by, approved, timestamp)
         VALUES ($1, $2, $3, $4, $5, $6, $7, false, NOW())
         RETURNING *`,
        [roundNumber, title, description, imageUrl, nftLink, artist, submittedBy]
      );
      return res.status(201).json(dbRes.rows[0]);
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to create round', details: e.message });
    }
  } else if (req.method === 'GET') {
    // List all rounds
    try {
      const dbRes = await query('SELECT * FROM rounds ORDER BY round_number DESC');
      return res.status(200).json(dbRes.rows);
    } catch (e: any) {
      return res.status(500).json({ error: 'Failed to fetch rounds', details: e.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
