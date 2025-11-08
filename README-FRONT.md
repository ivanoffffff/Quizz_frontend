# Sports Quiz - Frontend

Interface utilisateur Angular pour l'application Sports Quiz.

## 🔧 Stack technique

- **Framework** : Angular 17
- **Langage** : TypeScript
- **Build** : Angular CLI
- **Serveur** : Nginx (production)

## 📁 Structure du projet

```
front-skeleton/
├── src/
│   ├── app/
│   │   ├── admin/              # Interface d'administration
│   │   │   ├── admin-dashboard/
│   │   │   ├── create-admin/
│   │   │   ├── create-quiz/
│   │   │   └── manage-questions/
│   │   ├── auth/               # Authentification
│   │   ├── home/               # Page d'accueil
│   │   ├── quiz-page/          # Interface de jeu
│   │   ├── models/             # Interfaces TypeScript
│   │   └── services/           # Services HTTP
│   └── assets/
│       └── images/             # Images des sports
├── angular.json
├── package.json
├── Dockerfile
└── README.md
```

## 🚀 Lancement manuel

### Prérequis
- Node.js 18+ et npm
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Installer les dépendances**
```bash
cd front-skeleton
npm install
```

2. **Configurer l'URL du backend**

Le frontend se connecte au backend sur `http://localhost:8080` par défaut.

Si le backend tourne sur un autre port, modifier les services dans `src/app/services/` :
```typescript
// Exemple dans quiz.service.ts
private apiUrl = 'http://localhost:8080/api/quizzes';
```

3. **Lancer le serveur de développement**
```bash
npm start
```

Ou :
```bash
ng serve
```

L'application sera accessible sur : http://localhost:4200

### Mode développement avec live reload

```bash
ng serve --open
```

Le navigateur s'ouvrira automatiquement et l'application se rechargera à chaque modification du code.

## 🏗️ Build de production

### Build pour déploiement

```bash
npm run build
```

Ou :
```bash
ng build --configuration production
```

Les fichiers de production seront générés dans le dossier `dist/`.

### Test du build de production localement

```bash
# Installer un serveur HTTP simple
npm install -g http-server

# Servir les fichiers de production
cd dist/front-skeleton
http-server -p 4200
```

## 📱 Fonctionnalités

### Interface Joueur
- **Page d'accueil** : Affiche tous les quiz disponibles avec images
- **Page de quiz** : Interface de jeu avec progression
- **Résultats** : Affichage du score et des réponses
- **Authentification** : Connexion pour sauvegarder les résultats

### Interface Admin
- **Dashboard** : Vue d'ensemble des quiz
- **Gestion des quiz** : Créer, modifier, supprimer des quiz
- **Gestion des questions** : Ajouter, modifier, supprimer des questions
- **Création d'admins** : Créer de nouveaux comptes administrateurs

## 🛠️ Commandes utiles

```bash
# Développement
npm start                # Démarre le serveur de dev
ng serve --port 4300     # Démarre sur un autre port

# Build
npm run build            # Build de production
ng build                 # Build standard

# Tests
npm test                 # Lance les tests unitaires
ng test                  # Lance les tests avec Karma

# Linting
ng lint                  # Vérifie le code

# Génération de composants
ng generate component mon-composant
ng generate service mon-service
```

## 🔗 Connexion au Backend

Le frontend communique avec le backend via les services HTTP :

```typescript
// Exemple de configuration dans les services
QuizService      → http://localhost:8080/api/quizzes
QuestionService  → http://localhost:8080/api/questions
UserService      → http://localhost:8080/api/users
ResultService    → http://localhost:8080/api/results
```

**Important** : Le backend doit être démarré avant le frontend pour que l'application fonctionne correctement.

## 🌐 Accès à l'application

- **Développement** : http://localhost:4200
- **Production** : http://localhost:80 (avec Docker)

### Pages principales
- `/` - Page d'accueil
- `/quiz` - Liste des quiz
- `/quiz/:id` - Interface de jeu
- `/admin` - Dashboard admin
- `/admin/create-quiz` - Création de quiz
- `/admin/manage-questions/:id` - Gestion des questions

## 🔗 Repository

https://github.com/ivanoffffff/Quizz_frontend

## 📝 Notes

- L'application utilise des **composants standalone** (Angular 17+)
- Les formulaires utilisent **ReactiveFormsModule**
- Les images des sports sont dans `assets/images/`
- Le routage est configuré dans `app.routes.ts`
