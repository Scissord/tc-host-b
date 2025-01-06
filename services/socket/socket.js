import { Server } from "socket.io";
import http from "http";
import express from "express";
import { redisClient } from "../redis/redis.js";

const app = express();
const server = http.createServer(app);

const redisPublisher = redisClient.duplicate();
const redisSubscriber = redisClient.duplicate();

await redisPublisher.connect();
await redisSubscriber.connect();

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://talkcall-crm.com",
      "https://www.talkcall-crm.com",
    ],
  },
});

// Подписка на Redis для синхронизации событий между воркерами
redisSubscriber.subscribe("broadcast", (message) => {
  const data = JSON.parse(message);
  io.emit(data.event, data.payload);
});

io.on("connection", async (socket) => {
  const { user_id } = socket.handshake.query;

  // Добавляем socket_id в Set для user_id
  await redisClient.sAdd(`sockets:${user_id}`, socket.id);

  console.log(`User connected: ${user_id}, socket: ${socket.id}`);

  socket.on("sendStatus", async (data) => {
    console.log(`Received message from ${socket.id}:`, data);

    // Публикация события в Redis
    await redisPublisher.publish(
      "broadcast",
      JSON.stringify({
        event: "receiveStatus",
        payload: {
          sender: socket.id,
          data: data,
        },
      })
    );
  });

  socket.on("sendEntryOrder", async (data) => {
    console.log("Entry Order:", data);

    // Публикация события в Redis
    await redisPublisher.publish(
      "broadcast",
      JSON.stringify({
        event: "blockOrder",
        payload: {
          message: "Order reserved.",
          order_id: data.order_id,
          name: data.name,
        },
      })
    );
  });

  socket.on("sendExitOrder", async (data) => {
    console.log("Exit Order:", data);

    // Публикация события в Redis
    await redisPublisher.publish(
      "broadcast",
      JSON.stringify({
        event: "openOrder",
        payload: {
          message: "Order unblocked.",
          order_id: data.order_id,
          name: data.name,
        },
      })
    );
  });

  socket.on("privateMessage", async (data) => {
    const { recipient_id, message } = data;

    // Получаем все сокеты получателя
    const recipientSockets = await redisClient.sMembers(`sockets:${recipient_id}`);

    if (recipientSockets.length > 0) {
      recipientSockets.forEach((socketId) => {
        io.to(socketId).emit("newMessage", {
          sender: socket.id,
          message,
        });
      });
    } else {
      console.log(`User ${recipient_id} is not online`);
    }
  });

  socket.on("disconnect", async () => {
    console.log(`User disconnected: ${user_id}`);

    // Удаляем socket_id из Set
    await redisClient.sRem(`sockets:${user_id}`, socket.id);

    // Проверяем, остались ли активные соединения
    const remainingSockets = await redisClient.sCard(`sockets:${user_id}`);
    if (remainingSockets === 0) {
      console.log(`No more active connections for user: ${user_id}`);
    }
  });
});

export { io, app, server };
