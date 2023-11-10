const app = require("./app");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

dotenv.config();

const port = process.env.PORT || 8000;

async function start() {
  try {
    mongoose
      .connect("mongodb://127.0.0.1:27017/test")
      .then(() => console.log("DB connection successful!"));

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
