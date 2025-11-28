# 1. Build Angular
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build --configuration=production

# 2. NGINX pour servir Angular
FROM nginx:1.25
COPY --from=build /app/dist/* /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
