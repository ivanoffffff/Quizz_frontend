#  Sports Quiz - Frontend Angular

##  Description

Application web frontend développée avec Angular 17 pour l'application Sports Quiz. Interface utilisateur moderne et responsive permettant aux utilisateurs de jouer à des quiz sportifs et aux administrateurs de gérer le contenu.

##  Repository

**Lien GitHub Frontend** : https://github.com/ivanoffffff/Quizz_frontend
**Lien GitHub Backend** : https://github.com/ivanoffffff/Quizz_backend

## 📁 Structure du projet

```
frontend/
├── src/
│   ├── app/
│   │   ├── admin/                          # Module d'administration
│   │   │   ├── admin-quiz-list/            # Liste des quiz (admin)
│   │   │   ├── admin-quiz-form/            # Formulaire quiz (admin)
│   │   │   ├── admin-question-manager/     # Gestion des questions (admin)
│   │   │   └── admin-create-user/          # Création d'admin
│   │   ├── auth/                           # Authentification
│   │   │   └── auth.component.*
│   │   ├── home/                           # Page d'accueil
│   │   │   └── home.component.*
│   │   ├── quiz-page/                      # Module de jeu
│   │   │   ├── quiz/                       # Interface de jeu
│   │   │   ├── quiz-finished/              # Écran de fin
│   │   │   └── result/                     # Affichage des résultats
│   │   ├── models/                         # Interfaces TypeScript
│   │   │   └── index.ts                    # Quiz, Question, User, Result
│   │   ├── services/                       # Services HTTP
│   │   │   ├── quiz.service.ts
│   │   │   ├── question.service.ts
│   │   │   ├── user.service.ts
│   │   │   ├── result.service.ts
│   │   │   ├── auth.service.ts
│   │   │   └── quiz-state.service.ts       # Gestion de l'état du quiz
│   │   ├── app.component.*                 # Composant racine
│   │   ├── app.routes.ts                   # Configuration des routes
│   │   └── app.config.ts                   # Configuration de l'application
│   ├── assets/
│   │   └── images/                         # Images des sports
│   │       ├── background.png
│   │       ├── FOOTBALL.jpg
│   │       ├── BASKETBALL.jpg
│   │       ├── TENNIS.jpg
│   │       └── [autres sports].jpg
│   ├── styles.scss                         # Styles globaux
│   ├── index.html                          # Page HTML principale
│   └── main.ts                             # Point d'entrée de l'application
├── angular.json                            # Configuration Angular
├── package.json                            # Dépendances npm
├── tsconfig.json                          # Configuration TypeScript
├── Dockerfile                             # Image Docker
└── README.md                              # Ce fichier
```

##  Installation et démarrage

### Option 1 : Avec Docker Compose

#### Prérequis
- Docker
- Docker Compose

#### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/ivanoffffff/Quizz_frontend
cd frontend
```

2. **Démarrer avec Docker Compose**

Si vous avez un fichier `docker-compose.yml` dans le backend qui inclut le frontend :
```bash
docker-compose up -d
```

Ou démarrer uniquement le frontend :
```bash
docker build -t sports-quiz-frontend .
docker run -d -p 4200:80 sports-quiz-frontend
```

3. **Accéder à l'application**

Ouvrez votre navigateur sur : **http://localhost:4200**

### Option 2 : Développement local

#### Prérequis
- Node.js 18 ou supérieur
- npm 9 ou supérieur

#### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/ivanoffffff/Quizz_frontend
cd frontend
```

2. **Installer les dépendances**
```bash
npm install
```

Cette commande va :
- Télécharger toutes les dépendances listées dans `package.json`
- Créer le dossier `node_modules/`
- Générer le fichier `package-lock.json`

3. **Démarrer le serveur de développement**
```bash
npm start
```

Ou avec Angular CLI :
```bash
ng serve
```

L'application sera accessible sur : **http://localhost:4200**

Le serveur de développement supporte le **hot reload** : les modifications sont automatiquement rechargées dans le navigateur.

4. **Arrêter le serveur**

Appuyez sur `Ctrl + C` dans le terminal.

### Option 3 : Build de production

Pour créer un build optimisé pour la production :

```bash
# Build de production
npm run build

# Les fichiers seront générés dans dist/
```

Pour servir le build de production localement :
```bash
# Installer un serveur HTTP simple
npm install -g http-server

# Servir le build
cd dist/front-quiz
http-server -p 4200
```

##  Fonctionnalités

### Pour tous les utilisateurs

#### Page d'accueil (`/`)
- Affichage de tous les quiz disponibles
- Cartes visuelles avec image et description de chaque quiz
- Clic sur une carte pour démarrer le quiz

####  Interface de jeu (`/quiz/:id`)
- Affichage des questions une par une
- Choix multiples pour chaque question
- Barre de progression visuelle
- Indicateur de la question actuelle (ex: "Question 3/10")
- Bouton "Suivant" pour passer à la question suivante
- Bouton "Terminer" pour la dernière question

####  Écran de fin (`/quiz-finished`)
- Message de félicitations
- Invitation à se connecter pour voir le score
- Bouton "Continuer" vers l'authentification
- Bouton "Quitter" pour abandonner

####  Résultats (`/result`)
- Affichage du score global
- Pourcentage de réussite
- Message de félicitations adapté au score
- Liste détaillée des questions avec :
  - Question posée
  - Réponse de l'utilisateur
  - Bonne réponse
  - Indicateur visuel (✅ ou ❌)
- Bouton "Retour à l'accueil"
- Bouton "Rejouer le quiz"

#### Authentification (`/auth`)
- Connexion simplifiée par email
- Création de compte joueur
- Redirection automatique après connexion

### Pour les administrateurs

####  Liste des quiz (`/admin`)
- Tableau complet de tous les quiz
- Colonnes : ID, Titre, Type, Description, Nombre de questions
- Actions : Éditer, Supprimer
- Bouton "Nouveau Quiz"
- Bouton "Nouvel Admin"
- Bouton de déconnexion

####  Création/Édition de quiz (`/admin/quiz/new` ou `/admin/quiz/:id`)
- Formulaire de création/modification
- Champs : Titre, Type de sport, Description
- Validation des champs obligatoires
- Affichage du nombre de questions (en mode édition)
- Bouton "Gérer les questions" (en mode édition)
- Sauvegarde automatique

####  Gestion des questions (`/admin/quiz/:id/questions`)
- Liste de toutes les questions du quiz
- Formulaire d'ajout/édition de question
- Champs :
  - Énoncé de la question
  - 4 choix de réponse
  - Sélection de la bonne réponse
- Actions : Éditer, Supprimer chaque question
- Sauvegarde en temps réel

####  Création d'administrateur (`/admin/create-user`)
- Formulaire de création d'un compte admin
- Champs : Nom, Email
- Attribution automatique du rôle "admin"

##  Configuration de l'API

### URL de l'API Backend

Par défaut, l'application communique avec le backend sur : **http://localhost:8080**

Pour modifier cette URL, éditez les services dans `src/app/services/` :

```typescript
// Exemple dans quiz.service.ts
private apiUrl = 'http://localhost:8080/api/quizzes';

// Pour un environnement de production
private apiUrl = 'https://votre-api.com/api/quizzes';
```

### Endpoints utilisés

L'application communique avec les endpoints suivants :

- `GET /api/quizzes` - Liste des quiz
- `GET /api/quizzes/:id` - Détail d'un quiz
- `POST /api/quizzes` - Créer un quiz
- `PUT /api/quizzes/:id` - Modifier un quiz
- `DELETE /api/quizzes/:id` - Supprimer un quiz
- `GET /api/questions/quiz/:quizId` - Questions d'un quiz
- `POST /api/questions` - Créer une question
- `PUT /api/questions/:id` - Modifier une question
- `DELETE /api/questions/:id` - Supprimer une question
- `GET /api/users/email/:email` - Récupérer un utilisateur
- `POST /api/users` - Créer un utilisateur
- `POST /api/results` - Sauvegarder un résultat

## 🗺️ Routes de l'application

| Route | Description | Accès |
|-------|-------------|-------|
| `/` | Page d'accueil avec tous les quiz | Public |
| `/quiz/:id` | Interface de jeu pour un quiz | Public |
| `/quiz-finished` | Écran de fin de quiz | Public |
| `/auth` | Authentification | Public |
| `/result` | Affichage des résultats | Connecté |
| `/admin` | Liste des quiz (admin) | Admin |
| `/admin/quiz/new` | Création d'un quiz | Admin |
| `/admin/quiz/:id` | Édition d'un quiz | Admin |
| `/admin/quiz/:id/questions` | Gestion des questions | Admin |
| `/admin/create-user` | Création d'un admin | Admin |

##  Gestion de l'état

L'application utilise le `localStorage` pour conserver l'état du quiz en cours :

```typescript
// Données sauvegardées
{
  quizId: number,
  quizTitle: string,
  currentQuestionIndex: number,
  answers: { [questionId: number]: string }
}
```

Cela permet de :
- Reprendre un quiz si la page est rafraîchie
- Conserver les réponses de l'utilisateur
- Afficher les résultats après l'authentification

Le `localStorage` est nettoyé automatiquement :
- Après la sauvegarde du résultat
- Quand l'utilisateur quitte sans voir le score

##  Build

### Build de développement

```bash
ng build
```

### Build de production

```bash
ng build --configuration production
```

Optimisations appliquées :
- Minification du code
- Tree shaking
- AOT (Ahead-of-Time) compilation
- Optimisation des images
- Lazy loading des modules

Les fichiers générés seront dans `dist/front-quiz/`.

##  Dépannage

### L'application ne démarre pas

**Erreur : `Cannot find module`**
```
Error: Cannot find module '@angular/core'
```
**Solution** : Réinstallez les dépendances
```bash
rm -rf node_modules package-lock.json
npm install
```

**Port 4200 déjà utilisé**
```
Port 4200 is already in use.
```
**Solution** : Changez le port
```bash
ng serve --port 4201
```

### Erreurs de communication avec le backend

**Erreur : CORS ou Network Error**

**Solution** : Vérifiez que :
1. Le backend est démarré sur http://localhost:8080
2. Les URLs dans les services sont correctes
3. Le backend autorise les requêtes depuis http://localhost:4200

**Erreur 404 sur les endpoints**

**Solution** : Vérifiez que les endpoints du backend correspondent aux URLs utilisées dans les services.

### Les images ne s'affichent pas

**Solution** : Vérifiez que les images sont bien dans `src/assets/images/` :
- `background.png`
- `FOOTBALL.jpg`
- `BASKETBALL.jpg`
- `TENNIS.jpg`
- etc.

### Le localStorage ne fonctionne pas

**Solution** : Vérifiez que :
- Le navigateur autorise le localStorage
- Vous n'êtes pas en navigation privée
- Le localStorage n'est pas plein

##  Scripts disponibles

```json
{
  "start": "ng serve",                    // Démarre le serveur de dev
  "build": "ng build",                    // Build de développement
  "watch": "ng build --watch",            // Build avec watch mode
  "test": "ng test",                      // Lance les tests
  "serve:ssr:front-quiz": "node dist/front-quiz/server/server.mjs"  // SSR
}
```
