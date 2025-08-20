# List Manager (Client)

A minimal React client for managing agents and their task lists. It includes authentication, a dashboard with tasks, agent CRUD, CSV/XLS upload distribution, and a polished light/dark theme with a responsive navbar.

## Features
- Light/dark theme with persistent toggle
- Dashboard showing tasks with search and pagination
- Agents page with add/edit/delete and validation
- Upload page for CSV/XLS to distribute tasks to agents
- Responsive UI, improved navbar, and confirmation modal for logout

## Tech Stack
- React + Vite
- React Router

## Getting Started
1. Install dependencies:
```bash
npm install
```
2. Configure API base URL (optional):
   - Create `.env` and set:
```bash
VITE_API_URL=http://localhost:4000/api
```
   - Defaults to `http://localhost:4000/api` if not set.
3. Start the dev server:
```bash
npm run dev
```
4. Open the app at `http://localhost:5173`.

## Login
Use the seeded credentials from your backend (example):
- Email: `admin@example.com`
- Password: `Admin@123`

## Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build

## Project Structure (key files)
- `src/pages/*` — route pages (Dashboard, Agents, Upload, Login)
- `src/components/*` — UI components (Layout, Nav, Card, Table, etc.)
- `src/lib/api.js` — API helpers
- `src/lib/theme.js` — theme helpers

## Notes
- Theme defaults to light; user choice persists in localStorage.
- The upload endpoint expects the backend defined in `VITE_API_URL`.
