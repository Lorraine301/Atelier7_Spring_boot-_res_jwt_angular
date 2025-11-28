# Atelier 7 — Application Full-Stack de Gestion des Employés  
### Spring Boot 3 + MySQL + JPA + Lombok + JWT + Angular 17+ + Docker

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2+-6DB33F?logo=spring-boot) ![Angular](https://img.shields.io/badge/Angular-17+-DD0031?logo=angular) ![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql) ![JWT](https://img.shields.io/badge/JWT-Secured-black) ![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

Application full-stack complète permettant la **gestion CRUD des employés** avec une **API REST sécurisée par JWT** et une interface moderne en **Angular**.


---

## Fonctionnalités

- Création, lecture, modification et suppression d’employés (CRUD)
- Authentification sécurisée avec **JWT** (login/register)
- Protection des routes Angular avec **AuthGuard**
- Ajout automatique du token JWT via **HttpInterceptor**
- Validation des données (backend + frontend)
- Gestion propre des erreurs (exceptions personnalisées)
- Application entièrement **dockerisée** (backend, frontend, MySQL)

---

## Technologies utilisées

### Backend
- **Spring Boot 3**  
- **Spring Data JPA** + **Hibernate**  
- **MySQL 8**  
- **Lombok**  
- **Spring Security** + **JWT** (io.jsonwebtoken)  
- **Jakarta Validation**

### Frontend
- **Angular 17+**  
- **Angular Material** (optionnel)  
- **HttpClient** + **Interceptor JWT**  
- **Reactive Forms** + **Validation**  
- **Routing** + **AuthGuard**

### DevOps
- **Docker** + **Docker Compose**

---

## Structure du projet
```plantuml
project/
├── backend(employee-api)/                  # Spring Boot API
├── frontend(employe-app)/                 # Angular App
├── docker-compose.yml
└── README.md
```

## Lancement rapide avec Docker
```bash
docker-compose up --build
```
### Accès :

Frontend : http://localhost:4200

Backend API : http://localhost:8080

Base de données MySQL : localhost:3306 (employee_db)

## Lancement en développement sans Docker
### Backend
```bash
cd employee-api
./mvnw spring-boot:run
```
### API → http://localhost:8080
Frontend
```bash
cd employee-app
npm install
ng serve
```
### App → http://localhost:4200

## Endpoints API


| Méthode  | Endpoint                    | Description                        | Authentification |
|---------|-----------------------------|------------------------------------|------------------|
| POST    | `/api/auth/register`        | Créer un utilisateur               | Non              |
| POST    | `/api/auth/login`           | Connexion → retourne un JWT        | Non              |
| GET     | `/api/employees`            | Liste tous les employés            | Oui (JWT)        |
| GET     | `/api/employees/{id}`       | Détail d’un employé                | Oui (JWT)        |
| POST    | `/api/employees`            | Ajouter un employé                 | Oui (JWT)        |
| PUT     | `/api/employees/{id}`       | Modifier un employé                | Oui (JWT)        |
| DELETE  | `/api/employees/{id}`       | Supprimer un employé               | Oui (JWT)        |

> **Header requis pour les routes protégées** :
> ```
> Authorization: Bearer <votre_token_jwt>
> ```

## Sécurité JWT - Fonctionnement

Login → Génération du token (JwtUtil)

Stockage du token dans localStorage

HttpInterceptor → Ajoute automatiquement le header Authorization: Bearer ...

JwtAuthFilter (Spring) → Valide le token à chaque requête

AuthGuard (Angular) → Protège les routes

## Docker Compose (extrait)
```
version: "3.8"

services:

  database:
    image: mysql:8
    container_name: mysql-db
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD:
      MYSQL_DATABASE: employeedb
      MYSQL_USER: root
      MYSQL_PASSWORD:
    ports:
      - "3307:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: ./employee-api
    container_name: spring-backend
    restart: always
    depends_on:
      - database
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://database:3306/employee_db
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD:
      SPRING_JPA_HIBERNATE_DDL_AUTO: update
    ports:
      - "8080:8080"

  frontend:
    build: ./employee-app
    container_name: angular-frontend
    restart: always
    ports:
      - "4200:80"
    depends_on:
      - backend

volumes:
  mysql_data:

```
## Conclusion
Ce projet représente une application full-stack moderne, sécurisée et prête pour la production, intégrant les meilleures pratiques actuelles :

- Architecture propre et modulaire
- Sécurité robuste avec JWT
- Frontend réactif et ergonomique
- Déploiement simplifié via Docker

> **Réalisé par** : RAHELIARISOA Andriamasy Lorraine Agnès  
> **Année universitaire** : 2025 - 2026  
> **Filière** : Logiciels et Systèmes Intelligents - Applications Distribuées
> 
**Merci d'avoir visité ce projet!**
