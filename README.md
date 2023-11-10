# Project Setup

This project is a full-stack application with a React front end, an Express backend, and Sequelize with PostgreSQL as the database.

## Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- MongoDB: [Download and Install MongoDB](https://www.mongodb.com/try/download/community)

### Getting started

## Manual setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/NguyenKhacLam/govtech-fullstack-assignment.git
   cd govtech-fullstack-assignment

   ```

2. **Install Dependencies:**

   ```
       # Install client dependencies
       cd backend
       npm install

       # Install server dependencies
       cd ../frontend
       npm install
   ```

3. **Create env file in backend and frontend folder:**
   Duplicate env.example and then rename it to .env and enter your configs

4. **Start projects:**

   ```
       # start backend application
       cd backend
       npm start

       # start backend application
       cd ../frontend
       npm start
   ```

5. **Open the Application**:
   Open your browser and navigate to http://localhost:3000 to view the application.

## Running with docker

1. **Install docker to your machine**:
   - Docker Desktop: [Link](https://www.docker.com/products/docker-desktop/)
2. **Clone the repository:**

   ```bash
   git clone https://github.com/NguyenKhacLam/govtech-fullstack-assignment.git
   cd govtech-fullstack-assignment
   ```

3. **Create env file in backend and frontend folder:**
   Duplicate env.example and then rename it to .env and enter your configs
   Note: Please enter like this

   - DB_HOST=database-container (In backend folder, because this is the container name of database)
   - REACT_APP_BASE_BE_ENDPOINT=http://localhost:8000/api/v1 (In frontend folder, because this is the container name of api will be expose on port 8000)
   - REACT_APP_SOCKET_ENDPOINT=http://localhost:8000 (In frontend folder, because this is the container name of api will be expose on port 8000)

4. **Build image:**
   In the root directoty, run

   ```
   docker-compose build

   ```

5. **Run application:**
   In the root directoty, run

   ```
   docker-compose up

   ```

6. **Open the Application**:
   Open your browser and navigate to http://localhost:3000 to view the application.

## Project Structure

- client: Contains the React front end.
- server: Contains the Express backend and Sequelize models.
