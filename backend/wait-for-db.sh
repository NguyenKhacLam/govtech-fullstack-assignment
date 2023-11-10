#!/bin/bash

# Replace the following values with your actual database connection details
DB_HOST=database-container
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=lamnk
DB_NAME=pollapp

# Function to check if the database is ready
check_db() {
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
}

# Wait for the database to be ready
until PGPASSWORD=$DB_PASSWORD psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c '\q'; do
  >&2 echo "Database is unavailable - sleeping"
  sleep 1
done

>&2 echo "Database is up - executing command"
check_db
