const { createLogger, format, transports } = require("winston");
const { combine, timestamp, colorize, printf } = format;

const logFormat = printf(({ level, timestamp, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(colorize(), timestamp(), logFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

module.exports = logger;
