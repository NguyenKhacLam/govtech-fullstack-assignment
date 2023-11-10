FROM node

WORKDIR /app

COPY package*.json /app/

COPY . /app

RUN npm install

# Install wait-for-it
RUN apt-get update && apt-get install -y wait-for-it && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

EXPOSE 8000

# Add a custom script to wait for the database to be ready
COPY wait-for-db.sh /app/wait-for-db.sh
RUN chmod +x /app/wait-for-db.sh

# Run migrations and seed data only when the database is ready
CMD /app/wait-for-db.sh && npm start