const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

// Ensure the logs directory exists
const logDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Create a writable stream for log files
const logStream = fs.createWriteStream(path.join(logDir, "app.log"), { flags: "a" });

// Define a custom token for date format
morgan.token("customDate", () => moment().format("YYYY-MM-DD HH:mm:ss"));

// Define a custom token to capture the request path only (no domain or protocol)
morgan.token("pathOnly", (req) => req.originalUrl); // This gives the full URL path (e.g., "/api/auth/login")

// Create a custom morgan logger for logging both to the console and the file
const logger = morgan(
  (tokens, req, res) => {
    // Determine log level based on the response status code
    const logLevel = res.statusCode >= 400 && res.statusCode < 600 ? "ERROR:" : "INFO:";

    // Format log message
    return [
      logLevel, // Log level (INFO/ERROR)
      tokens.method(req, res), // HTTP method (GET, POST, etc.)
      tokens["pathOnly"](req, res), // Request path
      tokens.status(req, res), // Response status code
      tokens["response-time"](req, res), // Response time
      "ms",
    ].join(" ");
  },
  {
    stream: process.stdout, // Log to console
    skip: (req, res) => false, // Log every request, no skipping
  }
);

// Middleware to log to both console and file
const logMiddleware = (req, res, next) => {
  // Capture the start time of the request
  const start = Date.now();

  // Set up a function to calculate response-time once the response ends
  const end = res.end;
  res.end = function (...args) {
    // Calculate the response time
    const responseTime = Date.now() - start;
    res.responseTime = responseTime; // Attach the response time to the response object

    // Log the request data to the console
    logger(req, res, () => {});

    // Log to file using custom format
    const logMessage = [
      `[${moment().format("YYYY-MM-DD HH:mm:ss")}]`, // Date in desired format
      res.statusCode >= 400 && res.statusCode < 600 ? "ERROR:" : "INFO:", // Log level (INFO/ERROR)
      req.method, // HTTP method (GET, POST, etc.)
      req.originalUrl, // Request path
      res.statusCode, // Response status code
      responseTime.toFixed(3), // Response time in milliseconds
      "ms",
    ].join(" ");

    logStream.write(logMessage + "\n"); // Write log to file

    // Call the original `res.end` to properly send the response
    end.apply(res, args);
  };

  next(); // Continue to next middleware/route handler
};

module.exports = logMiddleware;
