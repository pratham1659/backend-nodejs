const express = require("express");
const userRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const authRoutes = require("./routes/authRoutes");
const loggingMiddleware = require("./middleware");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo");

// Load environment variables
dotenv.config();

function createApp() {
  const app = express(); // ✅ Ensure Express app instance is returned

  app.set("view engine", "ejs");
  app.use(express.json());
  app.use(cookieParser("authKey"));

  app.use(
    session({
      secret: "demo authKey",
      saveUninitialized: true,
      resave: false,
      cookie: {
        maxAge: 60000 * 60,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        collectionName: "sessions",
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // Apply middleware
  app.use(loggingMiddleware);

  // Register routes
  app.use(userRoutes);
  app.use(productRoutes);
  app.use(authRoutes);

  return app; // ✅ Ensure app instance is returned
}

// ✅ Correct CommonJS Export
module.exports = createApp;
