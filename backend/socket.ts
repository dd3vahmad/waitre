import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import logger from "../backend/api/utils/logger.util";
import useGetOptionMessage from "./api/hooks/useGetOptionMessage";
import { Options } from "./api/resources/Options";
import { sessionMiddleware } from "./api/middleware/session.middleware";
import sharedSession from "./api/middleware/session.middleware";
import { Menu } from "./api/resources/Menu";

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

// Use session middleware in express
app.use(sessionMiddleware);

io.use(
  sharedSession(sessionMiddleware, {
    autoSave: true,
  })
);

interface Order {
  title: string;
  price: number;
  imageUrl: string;
  itemCount: number;
}

interface OrderLists {
  currentOrder: Order[];
  orderHistory: Order[];
}

interface Orders {
  [key: string]: OrderLists;
}

const users: string[] = [];
const orders: Orders = {};

io.on("connection", (socket) => {
  const socketId = socket.id;
  logger.info(`A user connected - Socket ID: ${socketId}`);

  let usersname: string;
  socket.once("user-joined", (username) => {
    users.push(username);
    usersname = username;
    if (!orders[username]) {
      orders[username] = {
        currentOrder: [],
        orderHistory: [],
      };
    }

    if (username) socket.emit("message", Options);
  });

  socket.on("option", (option: number) => {
    const optionMessage = useGetOptionMessage(option);
    socket.emit("optionMessage", optionMessage);
  });

  function countOccurrences(arr: number[]) {
    const counts: {
      [key: number]: number;
    } = {};

    arr.forEach((num) => {
      counts[num] = (counts[num] || 0) + 1;
    });

    return counts;
  }

  socket.on("order-items", (orderItems: number[]) => {
    const counts = countOccurrences(orderItems);
    const menus = Menu.menu;

    Object.keys(counts).forEach((k) => {
      const key = parseInt(k);
      const order = {
        title: menus[key].title,
        imageUrl: menus[key].imageUrl,
        itemCount: counts[key],
        index: key,
        price: menus[key].price,
      };

      orders[usersname].currentOrder.push(order);
    });
  });

  socket.on("no-order", (orderItems: number[]) => {
    const noOrder = {
      text: "No order to place",
      sentAt: new Date(),
      menuOptions: [
        {
          title: "see all options",
          value: 69,
        },
        {
          title: "place new order",
          value: 1,
        },
      ],
      sentBy: 0,
    };
    return socket.emit("optionMessage", noOrder);
  });

  socket.on("disconnect", () => {
    console.log("User disconnects", socket.id);
  });
});
