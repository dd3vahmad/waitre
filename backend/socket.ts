import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import logger from "../backend/api/utils/logger.util";
import useGetOptionMessage from "./api/hooks/useGetOptionMessage";
import { Options } from "./api/resources/Options";
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
  logger.info(`A user connected - Socket ID: ${socket.id}`);

  socket.emit("message", Options);

  socket.on("option", (option: number) => {
    const optionMessage = useGetOptionMessage(option);
    socket.emit("optionMessage", optionMessage);
  });

  socket.on("order-items", (orderItems: number[]) => {
    // return
  });

  socket.on("disconnect", () => {
    console.log("User disconnects", socket.id);
  });
});
