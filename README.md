# Gestion des Primes

Application de gestion des primes de rendement pour les agents. Composée d'un backend Spring Boot et d'un frontend React.

## Structure du projet

gestion-primes/
├── src/                  → Backend (Spring Boot)
├── frontend/             → Frontend (React + Vite)
└── pom.xml

## Prérequis

- Java 21
- Maven
- Node.js et npm
- MySQL

## Installation du Backend

1. Créer la base de données MySQL (ou laisser le backend la créer automatiquement)

2. Copier le fichier de configuration exemple :
cp src/main/resources/application.properties.example src/main/resources/application.properties

3. Ouvrir src/main/resources/application.properties et remplacer VOTRE_MOT_DE_PASSE_ICI par votre mot de passe MySQL local

4. Lancer le backend (depuis IntelliJ, ou en ligne de commande) :
mvn spring-boot:run

Le backend démarre sur http://localhost:8080

## Installation du Frontend

1. Aller dans le dossier frontend :
cd frontend

2. Installer les dépendances :
npm install

3. Lancer le frontend :
npm run dev

Le frontend démarre sur http://localhost:5175

## Connexion

Un compte administrateur doit être créé en base pour se connecter. Voir avec l'auteur du projet pour les identifiants de test.
