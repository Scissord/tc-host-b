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
  // console.log("A user connected", user_id);
  const connection = {
    socket_id: socket.id,
    user_id
  };

  onlineUsers.push(connection);

  // console.log(onlineUsers);

  socket.on("sendStatus", (data) => {
    console.log(`Received message from ${socket.id}:`, data);

    // Отправить сообщение всем пользователям, кроме отправителя
    socket.broadcast.emit("receiveStatus", {
      sender: socket.id,
      data: data
    });
  });

  socket.on("sendEntryOrder", (order_id) => {
    // console.log(`Order entry received from ${socket.id}:`, order_id);

    // Signal to all other connected clients
    socket.broadcast.emit("blockOrder", {
      message: "Message for everyone else.",
      order_id: order_id,
    });
  
    // Signal to the sender
    socket.emit("receiveEntryOrder", {
      message: "Message for entry order sender",
      order_id: order_id,
    });
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected", user_id);
    const index = onlineUsers.findIndex(
      (connection) => connection.socket_id === socket.id
    );

    if (index !== -1) {
      onlineUsers.splice(index, 1);
    }

    // console.log(onlineUsers);
  })
})

export { io, app, server };
