const app = require("./app");
const dotenv = require("dotenv");

dotenv.config();

const { sequelize } = require("./models");

const port = process.env.PORT || 8000;

async function start() {
  try {
    await sequelize.sync({ force: false });
    console.log("Database connection has been established successfully.");

    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

start();
