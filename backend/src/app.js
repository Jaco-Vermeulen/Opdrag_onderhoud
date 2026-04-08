import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth.routes.js';
import { pokemonRouter } from './routes/pokemon.routes.js';
import { backpackRouter } from './routes/backpack.routes.js';
import { teamRouter } from './routes/team.routes.js';

export function createApp() {
  const app = express();
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/pokemon', pokemonRouter);
  app.use('/api/backpack', backpackRouter);
  app.use('/api/team', teamRouter);

  app.use((err, _req, res, _next) => {
    const status = err.statusCode || 500;
    res.status(status).json({ error: err.message || 'Internal Server Error' });
  });

  return app;
}
