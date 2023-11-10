FROM node

WORKDIR /app

COPY package*.json /app/

COPY . /app

RUN npm install


EXPOSE 8000


# Run migrations and seed data only when the database is ready
CMD ["npm", "start"]