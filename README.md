# Sports Quiz

Application web de quiz sportifs développée dans le cadre d'un projet académique EPF.

## 📋 Description

**Sports Quiz** permet aux utilisateurs de tester leurs connaissances sportives à travers des quiz interactifs couvrant plusieurs disciplines : Football, Basketball, Tennis, Rugby, Golf, Athlétisme, Natation et autres sports.

### Fonctionnalités

**Pour les joueurs :**
- Participer à des quiz thématiques sur différents sports
- Visualiser son score et les réponses correctes
- Sauvegarder ses résultats (avec authentification)

**Pour les administrateurs :**
- Créer et gérer des quiz (ajouter, modifier, supprimer)
- Gérer les questions et leurs réponses
- Créer de nouveaux comptes administrateurs

## 🚀 Démarrage rapide avec Docker

### Prérequis
- Docker
- Docker Compose

### Installation

1. **Cloner les repositories**

Créer un dossier parent et cloner les deux projets dedans :

```bash
# Créer le dossier parent
mkdir sports-quiz
cd sports-quiz

# Cloner le backend
git clone https://github.com/ivanoffffff/Quizz_backend back-skeleton

# Cloner le frontend
git clone https://github.com/ivanoffffff/Quizz_frontend front-skeleton
```

Vous devez obtenir cette structure :
```
sports-quiz/
├── back-skeleton/
└── front-skeleton/
```

2. **Configurer l'environnement**
```bash
cd back-skeleton
cp env.sample .env
```

Contenu par défaut de `.env` :
```env
DATABASE_NAME=default-database
DATABASE_USER=root
DATABASE_PASSWORD=toor
```

3. **Démarrer l'application**
```bash
docker-compose up -d
```

Cette commande démarre :
- 🗄️ Base de données PostgreSQL (port 5432)
- 🔧 Backend Spring Boot (port 8080)
- 🎨 Frontend Angular (port 4200)

4. **Créer et remplir les tables de la base de données**

Les tables doivent être créées manuellement :

```bash
# Se connecter à la base de données
docker exec -it quiz_database psql -U root -d default-database
```

Dans le terminal PostgreSQL, exécuter :
```sql
\i /docker-entrypoint-initdb.d/1_TABLES.sql
\i /docker-entrypoint-initdb.d/2_DEFAULT_ENTRIES.sql
\q
```

5. **Accéder à l'application**
- **Application** : http://localhost:4200
- **API** : http://localhost:8080/api/quizzes
- **Documentation API (Swagger)** : http://localhost:8080/swagger-ui.html

6. **Arrêter l'application**
```bash
docker-compose down
```

Pour supprimer également les données :
```bash
docker-compose down -v
```

## 👥 Comptes de test

### Administrateur
- Email : `alice@example.com`

### Joueurs
- Email : `bob@example.com`
- Email : `charlie@example.com`
- Email : `diana@example.com`
- Email : `ethan@example.com`

*Note : L'authentification est simplifiée (pas de mot de passe) pour ce projet académique.*

## 🛠️ Développement manuel

Pour lancer les services séparément en mode développement, consultez :
- [README Backend](./back-skeleton/README.md)
- [README Frontend](./front-skeleton/README.md)

## 📚 Stack technique

- **Frontend** : Angular 17, TypeScript
- **Backend** : Spring Boot 3.1.3, Java 17
- **Base de données** : PostgreSQL 15
- **Conteneurisation** : Docker, Docker Compose

## 🔗 Repositories

- **Backend** : https://github.com/ivanoffffff/Quizz_backend
- **Frontend** : https://github.com/ivanoffffff/Quizz_frontend

## 👨‍💻 Auteurs

- Lucas BOSQ
- Ivan COCUSSE

## 🎓 Contexte

Projet académique réalisé dans le cadre de la formation EPF.
