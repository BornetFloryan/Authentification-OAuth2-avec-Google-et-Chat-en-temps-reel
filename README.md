
# Mini-projet 3 : Authentification OAuth2 avec Google et Chat en temps réel

## Auteurs
- Floryan BORNET
- Corentin BRENDLE

## Description du projet
Ce projet est le troisième des trois mini-projets visant à explorer différentes stratégies d'authentification et de gestion des sessions.  
Il implémente une authentification OAuth2 via Google et GitHub ainsi qu'un système de chat en temps réel entre utilisateurs connectés.

## Fonctionnalités principales
- Authentification OAuth2 via Google et GitHub.
- Interface de messagerie en temps réel entre utilisateurs connectés.
- Stockage de l'historique des messages dans MongoDB.
- Mise en cache des sessions avec Redis.

## Organisation du projet
Le projet est organisé en deux parties :

- **Backend** : API REST avec gestion de l'authentification, des sessions, du chat en temps réel, etc.
- **Frontend** : Interface utilisateur développée avec Vue.js.

## Structure des dossiers
```
Authentification-OAuth2-et-Chat/
├── backend/
│   ├── config/       # Configuration de Passport.js, MongoDB et Redis
│   ├── controllers/  # Logique métier (authentification, chat, etc.)
│   ├── models/       # Schémas Mongoose pour utilisateurs et messages
│   ├── routes/       # Routes API
│   ├── socket/       # Gestion de Socket.IO
│   ├── app.js        # Point d'entrée du serveur
│   └── package.json  # Dépendances backend
├── frontend/
│   ├── src/
│   │   ├── components/  # Composants Vue.js (chat, login, etc.)
│   │   ├── views/       # Pages Vue.js
│   │   ├── router/      # Configuration des routes
│   │   ├── store/       # Gestion de l'état global
│   │   └── main.js      # Point d'entrée du frontend
│   └── package.json     # Dépendances frontend
└── README.md
```

## Instructions pour exécuter le projet

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn
- MongoDB
- Redis

### Étapes

#### Cloner le dépôt GitHub :
```bash
git clone https://github.com/BornetFloryan/Authentification-OAuth2-avec-Google-et-Chat-en-temps-reel
cd Authentification-OAuth2-et-Chat
```

### Créez un fichier `.env` dans le dossier `backend` :
# Fichier .env - Variables d'environnement du backend

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

MONGO_URI=mongodb://localhost:27017/your_database_name

COOKIE_KEY=your_cookie_key

#### Configurer le backend :
```bash
cd backend
npm install
npm start
```

#### Configurer le frontend :
```bash
cd ../frontend
npm install
npm run serve
```

### Accéder à l'application :
Ouvrir votre navigateur à l'adresse suivante : [http://localhost:8080](http://localhost:8080)

---
