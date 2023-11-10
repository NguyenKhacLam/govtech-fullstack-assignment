FROM node

WORKDIR /app

COPY package*.json /app/

COPY . /app

RUN npm install
RUN npx sequelize init
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all


EXPOSE 8000

CMD ["npm", "start"]