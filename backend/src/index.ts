import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
// Đã xóa import cors từ 'cors';

dotenv.config();

const app = express();

/**
 * Middlewares
 */
// Đã xóa app.use(cors()); -> Không cần thiết nữa vì Frontend và Backend chung Domain qua CloudFront
app.use(express.json());

/**
 * Validate env
 */
// const dbUrl = process.env.DATABASE_URL;
// 
// if (!dbUrl?.startsWith('postgres://')) {
//   throw new Error('Invalid DATABASE_URL');
// }

/**
 * Routes
 */
// Sửa đổi từ '/health' thành '/api/health' để khớp với CloudFront Behavior
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV ?? 'development',
  });
});

/**
 * Start server
 */
const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});