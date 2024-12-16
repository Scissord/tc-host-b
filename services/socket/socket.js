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
  const { user_id } = socket.handshake.query;
  console.log("A user connected", user_id);
  onlineUsers.push(user_id);

  socket.on("sendStatus", (data) => {
    console.log(`Received message from ${user_id}:`, data);

    // Отправить сообщение всем пользователям, кроме отправителя
    socket.broadcast.emit("receiveStatus", {
      sender: socket.id,
      data: data
    });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", user_id);
    const index = onlineUsers.indexOf(user_id);
    if (index !== -1) {
      onlineUsers.splice(index, 1);
    }
  })
})

export { io, app, server };
