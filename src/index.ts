import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

if (
  !process.env.DATABASE_URL ||
  !process.env.DATABASE_URL.startsWith('postgres://')
) {
  throw new Error('Invalid DATABASE_URL');
}

const app = express();
const PORT = process.env.PORT ?? 3000;

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));