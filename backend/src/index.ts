import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './db';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
