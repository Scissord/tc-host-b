import { Server } from "socket.io";
import http from "http";
import express from "express";
import * as Order from "#models/order.js";
import * as Log from '#models/log.js';
import { setKeyValue, getKeyValue } from '#services/redis/redis.js';
import { mapOrders } from "#services/order/map.js";

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:5173',
  'https://talkcall-crm.com',
  "https://www.talkcall-crm.com",
  // greenapi
  "https://7103.api.greenapi.com",
  "https://7103.media.greenapi.com",
  "https://46.101.109.139",
  "https://51.250.12.167",
  "https://51.250.84.44",
  "https://51.250.95.149",
  "https://89.169.137.216",
  "https://158.160.49.84",
  "https://165.22.93.202",
  "https://167.172.162.71",
  // dialer
  "https://92.46.108.23",
];

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  const { user_id } = socket.handshake.query;

  const onlineUsers = await getKeyValue('onlineUsers') || [];
  const existUser = onlineUsers.find((u) => +u.user_id === +user_id);

  if (existUser) {
    existUser.sockets.push(socket.id);
  } else {
    onlineUsers.push({
      user_id,
      sockets: [socket.id]
    });
  };

  await setKeyValue('onlineUsers', onlineUsers);

  console.log('online:', onlineUsers.length);

  socket.on("sendStatus", async (data) => {
    // console.log(`Received message from ${socket.id}:`, data);

    const onlineUsers = await getKeyValue('onlineUsers') || [];

    let total = null;
    let mappedOrders = [];
    if (!data.ids.length) {
      const result = await Order.getForSocket({ sub_status_id: data.old_sub_status_id });
      mappedOrders = await mapOrders(result.orders, 'operator');
      total = result.total;
    } else {
      const orders = await Order.getWhereIn('o.id', data.ids);
      mappedOrders = await mapOrders(orders, 'operator');
    };

    const payload = {
      old_sub_status_id: data.old_sub_status_id,
      new_sub_status_id: data.new_sub_status_id,
      ids: data.ids,
      orders: mappedOrders,
    };

    if (total !== null) {
      payload.total = total;
    };

    onlineUsers.forEach((user) => {
      if (+user.user_id === +user_id) return;
      user.sockets.forEach((socketId) => {
        io.to(socketId).emit("receiveStatus", payload);
      });
    });
  });

  socket.on("sendEntryOrder", async (data) => {
    // console.log("Entry Order:", data);

    // to redis
    const reservedOrders = await getKeyValue('reservedOrders') || [];
    reservedOrders.push({
      order_id: data.order_id,
      name: data.name,
    });
    await setKeyValue('reservedOrders', reservedOrders);

    const onlineUsers = await getKeyValue('onlineUsers') || [];
    onlineUsers.forEach((user) => {
      if (+user.user_id === +user_id) return;

      user.sockets.forEach((socketId) => {
        io.to(socketId).emit("blockOrder", {
          message: "Order reserved.",
          order_id: data.order_id,
          name: data.name,
        });
      });
    });

    // create log
    await Log.create({
      order_id: data.order_id,
      action: `${data.name} вошел (-a) в заказ №${data.order_id}.`
    })
  });

  socket.on("sendExitOrder", async (data) => {
    // console.log("Exit Order:", data);

    const reservedOrders = await getKeyValue('reservedOrders') || [];
    const reservedOrder = reservedOrders.find((ro) => +ro.order_id === +data.order_id);
    if (reservedOrder) {
      const updatedReservedOrders = reservedOrders.filter((ro) => +ro.order_id !== +data.order_id);
      await setKeyValue('reservedOrders', updatedReservedOrders);
    };

    const onlineUsers = await getKeyValue('onlineUsers') || [];
    const existUser = onlineUsers.find((u) => +u.user_id === +user_id);

    if (existUser) {
      const socketIndex = existUser.sockets.indexOf(socket.id);
      if (socketIndex !== -1) {
        existUser.sockets.splice(socketIndex, 1);
      };
    };

    onlineUsers.forEach((user) => {
      if (+user.user_id === +user_id) return;

      user.sockets.forEach((socketId) => {
        io.to(socketId).emit("openOrder", {
          message: "Order reserved.",
          order_id: data.order_id,
          name: data.name,
        });
      });
    });

    // create log
    await Log.create({
      order_id: data.order_id,
      action: `${data.name} вышел (-a) из заказа №${data.order_id}.`
    })
  });

  socket.on("privateMessage", (data) => {
    // const { recipient_id, message } = data;

    // Находим пользователя в onlineUsers по recipient_id
    // const recipientUser = onlineUsers.find(
    //   (user) => +user.user_id === +recipient_id
    // );

    // if (recipientUser) {
    // У пользователя могут быть несколько сокетов, рассылаем на все
    //     recipientUser.sockets.forEach((socketId) => {
    //       io.to(socketId).emit("newMessage", {
    //         sender: user_id, // отправитель - текущий user_id
    //         message,
    //       });
    //     });
    //   } else {
    //     console.log(`User ${recipient_id} is not online`);
    //   }

  });

  socket.on("disconnect", async () => {
    const onlineUsers = await getKeyValue('onlineUsers') || [];
    const existUser = onlineUsers.find((u) => +u.user_id === +user_id);

    if (existUser) {
      // Находим индекс сокета и удаляем его
      const socketIndex = existUser.sockets.indexOf(socket.id);
      if (socketIndex !== -1) {
        existUser.sockets.splice(socketIndex, 1); // Удаляем один элемент по индексу
      };

      // Если больше нет сокетов, удаляем пользователя из onlineUsers
      if (existUser.sockets.length === 0) {
        const userIndex = onlineUsers.findIndex((u) => +u.user_id === +user_id);
        if (userIndex !== -1) {
          onlineUsers.splice(userIndex, 1); // Удаляем пользователя
        };
      };
    };

    await setKeyValue('onlineUsers', onlineUsers);

    console.log('online:', onlineUsers.length);
  });
});

export { io, app, server };
