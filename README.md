# Projet fil rouge DevOps

Application web permettant de **créer un compte, se connecter et modifier son profil**, exécutable avec Docker Compose.

## Architecture
| Service | Technologie | Rôle |
|---|---|---|
| frontend | React + Vite, servi par Nginx | Interface, accessible dans le navigateur |
| backend | Node.js + Express + JWT | API REST (inscription, connexion, profil) |
| db | PostgreSQL 16 | Stockage des utilisateurs (volume `db_data`) |

Le navigateur appelle uniquement le frontend. Nginx redirige les requêtes `/api/` vers le backend, qui communique avec la base `db` sur le réseau interne de Compose.

## Prérequis
- Git
- Docker Desktop (ou Docker Engine) avec Docker Compose v2
- Aucune autre installation (Node.js et PostgreSQL ne sont pas nécessaires)

## Lancement
```bash
git clone https://github.com/dijand02518-jpg/projet_fil_rouge_devops.git
cd projet_fil_rouge_devops
cp .env.example .env
```
Éditer `.env` et remplacer `DB_PASSWORD` et `JWT_SECRET` par des valeurs personnelles, puis :
```bash
docker compose up --build
```
Pour lancer en arrière-plan : `docker compose up --build -d`.

## Arrêt
```bash
docker compose down        # arrête les conteneurs, conserve les données
docker compose down -v     # arrête et supprime aussi le volume (données effacées)
```

## Configuration (fichier `.env`)
| Variable | Description | Exemple |
|---|---|---|
| DB_USER | Utilisateur PostgreSQL | appuser |
| DB_PASSWORD | Mot de passe PostgreSQL | (à définir) |
| DB_NAME | Nom de la base | appdb |
| JWT_SECRET | Clé de signature des tokens | (chaîne aléatoire) |
| BACKEND_PORT | Port du backend sur la machine | 3000 |
| FRONTEND_PORT | Port du frontend sur la machine | 8080 |

Le fichier `.env` n'est jamais publié (voir `.gitignore`). Seul `.env.example` est versionné.

## Vérifier que l'application fonctionne
1. `docker compose ps` : les 3 services sont `running`, `db` et `backend` sont `healthy`.
2. `curl http://localhost:3000/health` renvoie `{"status":"ok"}`.
3. Ouvrir http://localhost:8080 dans le navigateur.
4. Cliquer sur « Créer un compte », renseigner nom, email et mot de passe : on est connecté automatiquement.
5. Modifier le nom dans « Mon profil » puis « Enregistrer » : le message « Profil mis à jour » s'affiche.
6. « Se déconnecter » puis se reconnecter avec les mêmes identifiants.
7. Test de persistance : `docker compose down` puis `docker compose up -d`, et se reconnecter. Le compte existe toujours.

## Choix de configuration
- **Nginx en reverse proxy** : une seule origine pour le navigateur, pas de problème de CORS et pas d'URL de l'API à fixer à la construction de l'image.
- **Build multi-étapes** du frontend : l'image finale ne contient que Nginx et les fichiers statiques.
- **Healthchecks et `depends_on`** : le backend attend que PostgreSQL soit prêt, le frontend attend le backend.
- **Volume `db_data`** : les données survivent à `docker compose down`.
- **`database/init.sql`** : monté dans l'image PostgreSQL, il crée la table `users` au premier démarrage uniquement (volume vide).
- **`.dockerignore`** : exclut `node_modules`, `.env` et `.git` du contexte de construction.
- **Secrets** : aucun mot de passe dans le dépôt, tout passe par `.env`.

## Test effectué
Test réalisé en local avec `docker compose up --build` : création de compte, connexion, modification du profil et persistance après `docker compose down` / `up`. Résultat : OK.

## Auteur
Khady Ndiaye
