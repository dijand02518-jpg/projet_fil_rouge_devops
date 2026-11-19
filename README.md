# Projet fil rouge DevOps

## Description
Application web de gestion de tâches (Todo App) servant de fil rouge pour les modules DevOps.

## Architecture
| Couche | Technologie |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express (API REST) |
| Base de données | PostgreSQL |

## Structure du dépôt
- `frontend/` : interface utilisateur React
- `backend/` : API REST Express
- `database/` : script SQL d'initialisation

## API
| Méthode | Route | Description |
|---|---|---|
| GET | /tasks | Lister les tâches |
| POST | /tasks | Créer une tâche |
| PUT | /tasks/:id | Marquer une tâche faite / non faite |
| DELETE | /tasks/:id | Supprimer une tâche |

## Lancement en local

### 1. Base de données
```bash
createdb -U postgres todos
psql -U postgres -d todos -f database/init.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env
npm install
npm start
```
L'API démarre sur http://localhost:3000.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
L'application est disponible sur http://localhost:5173.

## Prochaines étapes
Conteneurisation (Docker), intégration continue (CI/CD), déploiement.

## Auteur
Khady Ndiaye
