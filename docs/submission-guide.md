# Submission guide

## README — assessor section

Include a section titled **Assessor setup** with every URL, port, and credential needed to run the app. Do not expect the assessor to read `backend/.env`.

Example:

```markdown
## Assessor setup

| Item | Value |
|------|-------|
| Backend URL | http://localhost:3001 |
| Frontend URL | http://localhost:5173 |
| MySQL host | 127.0.0.1 |
| MySQL port | 3306 |
| Database name | pokemon_spanbouer |
| Database user | pokemon_app |
| Database password | (your value) |

### Test account

| Field | Value |
|-------|-------|
| Email | you@example.com |
| Password | yourpassword |
```

## Database files

**`database/schema.sql` (required)**  
DDL only: every table, index, constraint, and foreign key your app uses. Must run cleanly on an empty database. No seed data in this file.

**`database/dump.sql` (optional)**  
Optional `mysqldump` for assessors who should import data instead of an empty schema:

```bash
mysqldump -u USER -p DATABASE_NAME > database/dump.sql
```

If you provide a dump, list a test user in the README and say whether the assessor should import the dump or run `scripts/setup.js`.

## Architecture write-up

Replace the placeholder in `docs/architecture.md` with about one to two pages covering:

1. Tables, relationships, and constraints  
2. What lives in PokeAPI vs MySQL  
3. Registration, login, and how protected routes are enforced  
4. How routes, controllers, and services are split  
5. How the SPA is structured (state, loading, errors, API calls)  
6. Trade-offs and what you did not implement  

A small diagram is fine if it clarifies the design.

## Code style

Readable names and short comments on non-obvious logic. Avoid commenting every line.

## API contract

Use **GET** and **POST** only. Mutations that remove a row use POST with an `id` in the JSON body (see root `README.md`).

## Pre-submit checklist

- [ ] `database/schema.sql` runs on a fresh database without errors  
- [ ] README **Assessor setup** is complete  
- [ ] Test account works  
- [ ] `docs/architecture.md` is finished  
- [ ] Endpoints return real implementations where required (not permanent `501`)  
- [ ] UI handles loading and errors where it matters  
- [ ] Unauthenticated users are handled for protected areas as required by the brief  
