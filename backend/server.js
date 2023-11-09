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

      // socket.on("setup", (pollData) => {
      //   console.log(pollData.id);
      //   socket.join(pollData.id);
      //   socket.emit("connected");
      // });

      socket.on("join poll", (poll) => {
        socket.join(poll.id);
        console.log("user join poll: " + poll.id);
        io.emit("message", "New user join");
      });

      socket.on("vote", (vote) => {
        const poll = vote.poll;
        console.log(poll, ">>>>>");

        io.emit("user voted", vote);
      });
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

start();
