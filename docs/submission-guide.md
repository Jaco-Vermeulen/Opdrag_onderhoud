# Submission

| Platform | Command / script |
|----------|------------------|
| **Windows** | Run **`GITHUB-ONE-CLICK.cmd`** in the **repository root** (same folder as `README.md`). Double-click is enough. |
| **macOS / Linux** | No script. Use the **shell block** in [Publish the repository (Windows)](#publish-the-repository-windows) under **Unix (macOS / Linux)**. |

If `Tuisopdrag_Fullstack_Pokemon.docx` specifies different rules, follow that document.

## Deliverable

Submit a **GitHub repository URL** for the completed work on **`main`** (or name another branch if required).  
Produce that URL by running **`GITHUB-ONE-CLICK.cmd`** on Windows (or the Unix commands above).  
If Git cannot be used, submit a **ZIP** of the repository with all `node_modules` directories removed and no `.env` files included.

## Publish the repository (Windows)

From the repository root, run **`GITHUB-ONE-CLICK.cmd`** (double-click is sufficient).

| Step | Action |
|------|--------|
| 1 | Run the script from the project root directory. |
| 2 | At the prompt, press **Enter** for Quick (commit identity taken from the GitHub account) or type **2** for Custom (`user.name`, `user.email`, commit message). |
| 3 | Approve **UAC** or installer prompts if `winget` installs Git or GitHub CLI. |
| 4 | Complete **GitHub** sign-in in the browser when `gh auth login` runs. |
| 5 | Use the **HTTPS URL** printed at the end (e.g. `https://github.com/<account>/<repo>`) as the submission link. |

**Behaviour:** installs Git and `gh` via `winget` when missing, ensures GitHub authentication, creates a **public** repository named after the folder (spaces replaced with hyphens), commits, and pushes `main`.

**Environment:** Windows 10 or 11 with **winget** available. If `winget` is missing, install [Git for Windows](https://git-scm.com/download/win) and [GitHub CLI](https://cli.github.com/) manually, then run the script again.

**Unix (macOS / Linux):** the `.cmd` file is not used. From the repository root:

```bash
gh auth login
git init -b main    # only if the folder is not yet a Git repository
git add -A
git commit -m "Initial commit: Opdrag onderhoud fullstack Pokemon assignment"
gh repo create REPO_NAME --public --source=. --remote=origin --push
```

Replace `REPO_NAME` with a valid repository name. Submit the resulting GitHub URL.

**Before publishing:** never commit secrets. Keep `.env` out of Git. Complete the **Runtime configuration** table in the root `README.md` so a fresh clone can be run without guessing ports or database credentials.

## README — runtime configuration

The root **`README.md`** must include a filled-in **Runtime configuration** section: base URLs, ports, MySQL host, database name, application database user and password, and a **test login** (email and password) valid after `node scripts/setup.js` or after the documented import procedure.  
`backend/.env` is not committed; all values needed to run the stack belong in that table.

## Database

| Path | Rule |
|------|------|
| `database/schema.sql` | **Required.** DDL only. Must apply cleanly to an empty database. No seed data. |
| `database/dump.sql` | **Optional.** If present, state in `README.md` whether importers should load this dump or run `node scripts/setup.js`, and document the test account accordingly. |

## Architecture

Replace the placeholder in **`docs/architecture.md`** with roughly one to two pages on: schema and constraints; PokeAPI vs MySQL; authentication and protected routes; route / controller / service layout; SPA structure (state, loading, errors, API usage); deliberate omissions and trade-offs. A small diagram is optional.

## Code and API

Use clear naming and brief comments only where the logic is not obvious.  
HTTP: **GET** and **POST** only; deletions via **POST** with `id` in the JSON body (see root `README.md`).

## Copyright and licence

- **`LICENSE`:** **non-commercial** use only. Commercial use needs written permission from the copyright holder(s) in **`NOTICE`**.
- **`NOTICE`:** states **original starter** copyright and ownership. Do not remove or falsify it.
- **Root `README.md` → Ownership:** must always state (1) who owns the original starter (see `NOTICE`) and (2) what **you** added or changed, with authorship claimed **only** for your parts. That is a condition of the licence, not optional text.
- **Third-party:** *Pokémon* names are third-party marks; this project is not affiliated. **PokeAPI:** https://pokeapi.co/ terms apply.

This text is not legal advice. Enforceability depends on jurisdiction; for commercial or high-risk use, obtain professional review.

## Verification

- [ ] `database/schema.sql` applies without error on a new database  
- [ ] `README.md` runtime configuration and test login are complete and verified  
- [ ] `README.md` **Ownership** is complete: original ownership (`NOTICE`) acknowledged; your contributions and authorship scope stated  
- [ ] `LICENSE` and `NOTICE` present and unaltered except as permitted by the licence  
- [ ] `docs/architecture.md` is complete  
- [ ] No secrets in the repository  
- [ ] Submission link (GitHub URL or agreed ZIP) matches the required deliverable format  

## Reference

| Item | Location |
|------|----------|
| Publish script | `GITHUB-ONE-CLICK.cmd` |
| Licence | `LICENSE` |
| Original ownership | `NOTICE` |
| Run instructions | `README.md` |
| API summary | `docs/project-map.md` |
| Brief | `Tuisopdrag_Fullstack_Pokemon.docx` |
