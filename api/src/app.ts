import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import plannerRoutes from './routes/plannerRoutes.js';

const app = express();

const allowedOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

app.use(helmet());
app.use(
  cors({
    origin: allowedOrigin === '*' ? true : allowedOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/auth', authRoutes);
app.use('/planner', plannerRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Risorsa non trovata' });
});

export default app;
