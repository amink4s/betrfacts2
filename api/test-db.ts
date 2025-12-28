import type { VercelRequest, VercelResponse } from '@vercel/node';
import { query } from './db';

export default async function handler(_req: any, res: any) {
  try {
    const result = await query('SELECT NOW()');
    res.json({ success: true, time: result.rows[0].now });
  } catch (err: any) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ success: false, error: errorMsg });
  }
}
