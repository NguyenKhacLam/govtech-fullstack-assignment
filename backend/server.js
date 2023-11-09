const app = require("./app");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

dotenv.config();

const { sequelize } = require("./models");

const port = process.env.PORT || 8000;

async function start() {
  try {
    await sequelize.sync({ force: false });
    console.log("Database connection has been established successfully.");

    const expressServer = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });

    const io = new Server(expressServer, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:3000",
      },
    });

    io.on("connection", (socket) => {
      console.log("User connected");

      socket.on("join poll", (poll) => {
        socket.join(poll.id);
        console.log(socket.rooms);
        console.log("user join poll: " + poll.id);
      });

      socket.on("vote", (vote) => {
        console.log("Received vote:", vote);
        socket.in(vote.pollId).emit("user voted", vote);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

start();
