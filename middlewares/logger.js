const winston = require("winston");
const path = require("path");

// Create Winston logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.printf(({ level, message, stack }) => {
      return `${level.toUpperCase()}: ${stack || message}`;
    })
  ),
  transports: [
    // Console logging without timestamps
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`)
      ),
    }),
    // File logging with timestamps
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/app.log"),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
        })
      ),
    }),
    new winston.transports.File({
      filename: path.join(__dirname, "../logs/error.log"),
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}`;
        })
      ),
    }),
  ],
});

module.exports = logger;
