FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Expose le port Angular
EXPOSE 4200

# Lance Angular en mode dev et écoute sur toutes les interfaces
CMD ["npm", "start", "--", "--host", "0.0.0.0"]
