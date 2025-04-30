FROM node:23-alpine

WORKDIR /app

# Copie les fichiers de dépendances
COPY package-lock.json package.json ./

# Installation des dépendances
RUN npm ci

# Copie des fichiers de configuration
COPY tsconfig.json next.config.ts ./
COPY next-env.d.ts postcss.config.js tailwind.config.ts ./

# Copie du code source
ADD app app
ADD components components
ADD lib lib
ADD utils utils
COPY components.json middleware.ts ./

# Lancement en mode développement
CMD npm run dev
