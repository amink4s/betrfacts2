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


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
