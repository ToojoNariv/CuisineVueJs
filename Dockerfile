# Étape 1 : Utiliser une image de base avec Node.js
FROM node:16 AS build-stage

# Étape 2 : Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers de configuration du projet
COPY package*.json ./
COPY vite.config.js ./

# Étape 4 : Installer les dépendances
RUN npm install

# Étape 5 : Copier le reste des fichiers du projet
COPY . .

# Étape 6 : Nettoyer le cache et réinstaller les dépendances (optionnel)
RUN npm cache clean --force && npm install

# Étape 7 : Construire l'application
RUN npm run build

# Étape 8 : Utiliser une image légère pour l'exécution
FROM nginx:alpine AS production-stage

# Étape 9 : Copier les fichiers construits dans le répertoire de Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Étape 10 : Exposer le port 80
EXPOSE 80

# Étape 11 : Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]