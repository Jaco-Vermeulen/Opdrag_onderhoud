# Project map

Quick reference for where things live.

| Area | Path |
|------|------|
| Assignment brief | `Tuisopdrag_Fullstack_Pokemon.docx` |
| Architecture write-up | `docs/architecture.md` |
| Submission guide | `docs/submission-guide.md` |
| MySQL schema | `database/schema.sql` |
| Backend entry | `backend/src/server.js`, `backend/src/app.js` |
| Routes | `backend/src/routes/*.routes.js` |
| Controllers | `backend/src/controllers/*.controller.js` |
| Services (DB + PokeAPI) | `backend/src/services/*.service.js` |
| Auth middleware | `backend/src/middleware/auth.middleware.js` |
| DB connection pool | `backend/src/config/database.js` |
| React entry | `frontend/src/main.jsx`, `frontend/src/App.jsx` |
| App shell | `frontend/src/components/layout/AppLayout.jsx` |
| Feature components | `frontend/src/components/features/` |
| API client | `frontend/src/api/client.js` |
| Shared hooks | `frontend/src/hooks/` |

## Frontend routes

| URL | Component |
|-----|-----------|
| `/` | Redirect → `/search` |
| `/login` | `features/LoginArea.jsx` |
| `/register` | `features/RegisterArea.jsx` |
| `/search` (+ `?q=`) | `features/search/SearchArea.jsx` |
| `/pokemon/:pokeapiId` | `features/PokemonDetailArea.jsx` |
| `/backpack` | `features/BackpackArea.jsx` |
| `/team` | `features/TeamArea.jsx` |

## API endpoints

Only GET and POST are used. POST endpoints that remove data accept `{ id }` in the request body.

| Method | Path | Auth required | Handler |
|--------|------|---------------|---------|
| GET | `/health` | No | Inline in `app.js` |
| POST | `/api/auth/register` | No | `auth.controller.register` |
| POST | `/api/auth/login` | No | `auth.controller.login` |
| GET | `/api/pokemon/search` | Yes | `pokemon.controller.search` |
| GET | `/api/pokemon/:pokeapiId` | Yes | `pokemon.controller.getById` |
| GET | `/api/pokemon/:pokeapiId/evolution` | Yes | `pokemon.controller.getEvolutionChain` |
| GET | `/api/backpack/` | Yes | `backpack.controller.list` |
| POST | `/api/backpack/` | Yes | `backpack.controller.add` |
| POST | `/api/backpack/remove` | Yes | `backpack.controller.remove` |
| GET | `/api/team/` | Yes | `team.controller.list` |
| POST | `/api/team/move-from-backpack` | Yes | `team.controller.moveFromBackpack` |
| POST | `/api/team/move-to-backpack` | Yes | `team.controller.moveToBackpack` |
| POST | `/api/team/remove` | Yes | `team.controller.removeFromTeam` |

Auth uses `Authorization: Bearer <JWT>`. Protected routes go through `middleware/auth.middleware.js`, which attaches `req.user` on success.
