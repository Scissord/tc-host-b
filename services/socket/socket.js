import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"]
  }
});

const onlineUsers = [];

io.on("connection", (socket) => {
  // console.log("A user connected", socket.id);
  onlineUsers.push(socket.id);

  console.log(onlineUsers);

  socket.on("disconnect", () => {
    // console.log("A user disconnected", socket.id);
    const index = onlineUsers.indexOf(socket.id);
    if (index !== -1) {
      onlineUsers.splice(index, 1);
    }
  })
})

export { io, app, server };
