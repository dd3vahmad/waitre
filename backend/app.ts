import { app } from "./socket";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import logger from "./api/utils/logger.util";

interface InternalServerError {
  message: string;
  statusCode: number;
}

// CORS configuration
app.use(cors());

// Parses json bodies
app.use(express.json());
app.use(cookieParser());
app.use(morgan("tiny"));

const uri: string = process.env.MONGOURI || "";

// Connects to db
mongoose
  .connect(uri)
  .then(() => console.log("Database connected"))
  .catch((err) => logger.error("Database connection error"));

// Internal server error
app.use((err: InternalServerError, req: any, res?: any, next?: any) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    failed: true,
    message,
    statusCode,
  });
});
