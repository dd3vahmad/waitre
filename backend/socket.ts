import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
dotenv.config();

export const app = express();

export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const options = {
    text: "Hello there, how may I help you?",
    sentAt: new Date(),
    options: [
      {
        title: "place an order",
        value: 1,
      },
      {
        title: "checkout an order",
        value: 99,
      },
      {
        title: "see order history",
        value: 98,
      },
      {
        title: "see current order",
        value: 97,
      },
      {
        title: "cancel order",
        value: 0,
      },
    ],
    sentBy: 0,
  };

  socket.emit("message", options);

  socket.on("disconnect", () => {
    console.log("User disconnects", socket.id);
  });
});
