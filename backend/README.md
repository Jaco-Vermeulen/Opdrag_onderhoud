# Backend

Express REST API. Route and file index: `docs/project-map.md`.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | `node --watch` — restarts on file changes |
| `npm start` | Single run |
| `npm test` | Tests |

## Layout

```
src/
├── server.js           Entry — loads env, listens for HTTP
├── app.js              Express app, `/api/*`, error handler
├── config/database.js  mysql2 pool
├── middleware/         JWT gate
├── routes/             Routers (GET / POST only)
├── controllers/        HTTP adapters
└── services/           Domain logic, DB, PokeAPI
```

## Environment

Copy `.env.example` from the repository root to `backend/.env`, or generate `.env` with `node scripts/setup.js` from the repo root.

| Variable | Description |
|----------|-------------|
| `PORT` | HTTP port (default `3001`) |
| `DATABASE_HOST` | MySQL host |
| `DATABASE_PORT` | MySQL port |
| `DATABASE_USER` | Application MySQL user |
| `DATABASE_PASSWORD` | Application MySQL password |
| `DATABASE_NAME` | Database name |
| `JWT_SECRET` | Secret for signing JWTs |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `POKEAPI_BASE_URL` | e.g. `https://pokeapi.co/api/v2` |

Stubs return `501` until you implement controllers and services. Protected routes expect `Authorization: Bearer <token>`.
