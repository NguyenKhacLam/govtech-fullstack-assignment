# Project Setup

This project is a full-stack application with a React front end, an Express backend, and Sequelize with PostgreSQL as the database.

## Prerequisites

Before you begin, ensure you have the following software installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- PostgreSQL: [Download and Install PostgreSQL](https://www.postgresql.org/)

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo

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

3. **Create database:**
   Once you have Postgresql installed on your machine, create a database for the app

4. **Create env file in backend and frontend folder:**
   Duplicate env.example and then rename it to .env and enter your configs

5. **Run Migrations and Seeds:**

   ```
        npx sequelize-cli db:migrate
        npx sequelize-cli db:seed:all
   ```

6. **Start projects:**

   ```
       # start backend application
       cd backend
       npm start

       # start backend application
       cd ../frontend
       npm start
   ```

7. **Open the Application**:
   Open your browser and navigate to http://localhost:3000 to view the application.

## Project Structure

- client: Contains the React front end.
- server: Contains the Express backend and Sequelize models.
