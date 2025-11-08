# ========================================
# STAGE 1 : Build de l'application Angular
# ========================================
FROM node:18-alpine AS build

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de configuration npm
COPY package*.json ./

# Installe les dépendances
RUN npm ci --silent

# Copie le code source
COPY . .

# Build de production
RUN npm run build --prod

# ========================================
# STAGE 2 : Serveur Nginx
# ========================================
FROM nginx:1.25-alpine

# Informations sur l'image
LABEL maintainer="sports-quiz-team"
LABEL description="Frontend for Sports Quiz Application"

# Supprime la configuration Nginx par défaut
RUN rm /etc/nginx/conf.d/default.conf

# Copie la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/

# Copie les fichiers buildés depuis l'étape précédente
COPY --from=build /app/dist/front-skeleton/browser /usr/share/nginx/html

# Expose le port 80
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

# Démarre Nginx
CMD ["nginx", "-g", "daemon off;"]
