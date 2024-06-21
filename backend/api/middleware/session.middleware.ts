import session from "express-session";
import dotenv from "dotenv";
import sharedSession from "express-socket.io-session";

dotenv.config();

export const sessionMiddleware = session({
  secret: process.env.SECRETKEY || "qwerty12345678",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 600000 },
});

export default sharedSession;
