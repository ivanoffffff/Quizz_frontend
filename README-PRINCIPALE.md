#  Sports Quiz - Application de Quiz Sportifs

##  Description du projet

**Sports Quiz** est une application web interactive permettant aux utilisateurs de tester leurs connaissances sportives à travers différents quiz thématiques. L'application couvre plusieurs sports : Football, Basketball, Tennis, Rugby, Golf, Athlétisme, Natation et bien d'autres.

###  Fonctionnalités principales

#### Pour les joueurs :
-  Jouer à des quiz sur différents sports
-  Visualiser son score et ses réponses après chaque quiz
-  Système d'authentification pour sauvegarder ses résultats

#### Pour les administrateurs :
-  Créer et modifier des quiz
-  Gérer les questions (ajouter, modifier, supprimer)
-  Créer de nouveaux comptes administrateurs
-  Supprimer des quiz existants

### Captures d'écran

L'application propose une interface moderne et intuitive avec :
- Une page d'accueil présentant tous les quiz disponibles
- Une interface de jeu fluide avec progression visuelle
- Un tableau de résultats détaillé
- Un panel d'administration complet

## Architecture technique

### Modèle de données

```
USER
├── user_id (PK)
├── name
├── email
└── role (admin/player)

QUIZ
├── quiz_id (PK)
├── title
├── type (FOOTBALL, BASKETBALL, etc.)
└── description

QUESTION
├── question_id (PK)
├── quiz_id (FK)
├── statement
├── choices
└── correct_answer

RESULT
├── result_id (PK)
├── user_id (FK)
├── quiz_id (FK)
├── score
└── play_date
```

## Repositories

- **Frontend** : https://github.com/ivanoffffff/Quizz_frontend
- **Backend** : https://github.com/ivanoffffff/Quizz_backend

## Guide de démarrage

### Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Docker** : version 20.10 ou supérieure
- **Docker Compose** : version 2.0 ou supérieure
- *(Optionnel pour le développement)* Java 17, Node.js 18+, Maven 3.8+

### Installation et lancement avec Docker Compose

#### 1. Cloner les repositories

```bash
# Cloner le backend
git clone https://github.com/ivanoffffff/Quizz_backend
cd backend

# Cloner le frontend (dans un autre terminal/dossier)
git clone https://github.com/ivanoffffff/Quizz_frontend
cd frontend
```

#### 2. Configuration du backend

Créez un fichier `.env` à la racine du projet backend :

```env
# Configuration de la base de données
DATABASE_NAME=quiz_db
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres123

# Configuration de l'application
SERVER_PORT=8080
```

**Note** : Un fichier `.env.sample` est fourni dans le repository backend comme exemple.

#### 3. Démarrer l'application complète

Depuis le dossier **backend**, lancez :

```bash
docker-compose up -d
```

Cette commande va :
1.  Créer et démarrer la base de données PostgreSQL
2.  Créer automatiquement les tables via les scripts SQL
3.  Insérer les données de test (utilisateurs, quiz, questions)
4.  Démarrer le serveur backend sur le port 8080
5.  Démarrer le serveur frontend sur le port 4200

#### 4. Vérifier que tout fonctionne

Attendez quelques secondes que tous les services démarrent, puis :

- **Frontend** : Ouvrez http://localhost:4200
- **Backend API** : Testez http://localhost:8080/api/quizzes
- **Swagger UI** : Consultez http://localhost:8080/swagger-ui.html
- **Base de données** : Connexion sur localhost:5432

#### 5. Arrêter l'application

```bash
docker-compose down
```

## Initialisation de la base de données

Les scripts SQL sont exécutés automatiquement au premier démarrage du conteneur PostgreSQL :

1. **`initdb/1_TABLES.sql`** : Création du schéma
  - Tables : user, quiz, question, result
  - Contraintes et relations
  - Index pour les performances

2. **`initdb/2_DEFAULT_ENTRIES.sql`** : Données de test
  - 5 utilisateurs (1 admin + 4 joueurs)
  - 10 quiz sur différents sports
  - Plus de 100 questions
  - Plusieurs résultats de test

##  Comptes de test

### Administrateur
- **Email** : alice@example.com
- **Rôle** : admin

### Joueurs
- **Email** : bob@example.com (rôle : player)
- **Email** : charlie@example.com (rôle : player)
- **Email** : diana@example.com (rôle : player)
- **Email** : ethan@example.com (rôle : player)

**Note** : Dans cette version, l'authentification est simplifiée (pas de mot de passe). En production, il faudrait implémenter un système d'authentification sécurisé (JWT, OAuth2, etc.).

##  Tests

### Tester l'API Backend

Utilisez Swagger UI : http://localhost:8080/swagger-ui.html

Ou utilisez curl :

```bash
# Récupérer tous les quiz
curl http://localhost:8080/api/quizzes

# Récupérer un quiz spécifique
curl http://localhost:8080/api/quizzes/1

# Récupérer les questions d'un quiz
curl http://localhost:8080/api/questions/quiz/1
```

### Tester le Frontend

1. Accédez à http://localhost:4200
2. Cliquez sur un quiz pour commencer
3. Répondez aux questions
4. À la fin, connectez-vous avec un compte de test
5. Consultez vos résultats

##  Documentation de l'API

### Endpoints principaux

#### Quiz
- `GET /api/quizzes` - Liste tous les quiz
- `GET /api/quizzes/{id}` - Récupère un quiz par ID
- `POST /api/quizzes` - Crée un nouveau quiz (admin)
- `PUT /api/quizzes/{id}` - Met à jour un quiz (admin)
- `DELETE /api/quizzes/{id}` - Supprime un quiz (admin)

#### Questions
- `GET /api/questions/quiz/{quizId}` - Liste les questions d'un quiz
- `POST /api/questions` - Crée une question (admin)
- `PUT /api/questions/{id}` - Met à jour une question (admin)
- `DELETE /api/questions/{id}` - Supprime une question (admin)

#### Utilisateurs
- `GET /api/users` - Liste tous les utilisateurs
- `GET /api/users/{id}` - Récupère un utilisateur par ID
- `POST /api/users` - Crée un utilisateur

#### Résultats
- `GET /api/results/user/{userId}` - Résultats d'un utilisateur
- `GET /api/results/quiz/{quizId}` - Résultats d'un quiz
- `GET /api/results/leaderboard/{quizId}` - Classement d'un quiz
- `POST /api/results` - Enregistre un résultat

Documentation complète disponible sur : http://localhost:8080/swagger-ui.html

##  Développement

### Mode développement (sans Docker)

#### Backend

```bash
cd backend

# Démarrer uniquement la base de données avec Docker
docker-compose up database -d

# Créer le fichier .env
cp .env.sample .env

# Lancer l'application Spring Boot
./mvnw spring-boot:run
```

Le backend sera accessible sur http://localhost:8080

#### Frontend

```bash
cd frontend

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm start
```

Le frontend sera accessible sur http://localhost:4200

### Structure des projets

#### Backend
```
backend/
├── src/
│   ├── main/
│   │   ├── java/com/takima/backskeleton/
│   │   │   ├── controllers/     # Contrôleurs REST
│   │   │   ├── DAO/             # Repositories
│   │   │   ├── models/          # Entités JPA
│   │   │   └── services/        # Logique métier
│   │   └── resources/
│   │       └── application.properties
├── initdb/                      # Scripts SQL
│   ├── 1_TABLES.sql
│   └── 2_DEFAULT_ENTRIES.sql
├── docker-compose.yml
├── Dockerfile
├── pom.xml
└── README.md
```

#### Frontend
```
frontend/
├── src/
│   ├── app/
│   │   ├── admin/              # Components admin
│   │   ├── auth/               # Authentification
│   │   ├── home/               # Page d'accueil
│   │   ├── quiz-page/          # Components quiz
│   │   ├── models/             # Interfaces TypeScript
│   │   └── services/           # Services HTTP
│   └── assets/
│       └── images/             # Images des sports
├── angular.json
├── package.json
├── Dockerfile
└── README.md
```

##  Dépannage

### Le backend ne démarre pas
- Vérifiez que le port 8080 est libre : `lsof -i :8080`
- Vérifiez les logs : `docker-compose logs backend`
- Vérifiez que la base de données est prête : `docker-compose ps`

### Le frontend ne s'affiche pas
- Vérifiez que le port 4200 est libre : `lsof -i :4200`
- Vérifiez les logs : `docker-compose logs frontend`
- Videz le cache du navigateur

### La base de données ne contient pas de données
- Supprimez le volume : `docker-compose down -v`
- Redémarrez : `docker-compose up -d`
- Les scripts SQL seront ré-exécutés

### Erreur de connexion à la base de données
- Vérifiez le fichier `.env`
- Vérifiez que le service database est démarré : `docker-compose ps`
- Vérifiez les credentials dans `application.properties`

##  Auteurs

Luacs BOSQ
Ivan COCUSSE
