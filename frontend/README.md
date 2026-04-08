# Frontend

Vite and React SPA. Route and file index: `docs/project-map.md`.

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server; proxies `/api` to http://localhost:3001 |
| `npm run build` | Production bundle to `dist/` |
| `npm test` | Vitest |

## Layout

```
src/
├── main.jsx            React root, `BrowserRouter`
├── App.jsx             Routes
├── api/client.js       `fetch` helper, Bearer token
├── hooks/              Shared hooks
├── styles/             Global CSS
└── components/
    ├── layout/AppLayout.jsx   Shell: nav + `<Outlet />`
    └── features/              Route-level UI (see `search/` for search + results)
```

Client-side routing only: the document does not reload when navigating. Search uses the `q` query parameter where applicable.

Feature components start as stubs; implement behaviour per the assignment brief, including loading and error states and guarded routes where required.
