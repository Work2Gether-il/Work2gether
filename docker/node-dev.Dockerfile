FROM node:23-alpine

WORKDIR /app

# Copie les fichiers de dépendances
COPY package-lock.json package.json ./

# Installation des dépendances
RUN npm ci

# Copie des fichiers de configuration
COPY server.js ./

# Lancement en mode développement
CMD node server.js
