const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const logMiddleware = require("./middlewares/logger");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");

//environment variable config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(logMiddleware); // Use the logger middleware globally
app.use(express.json()); // to parse the req.body
app.use(express.urlencoded({ extended: true })); // to parse the form data
app.use(cookieParser());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server is running in the port ${PORT}`);
  dbConnect();
});
