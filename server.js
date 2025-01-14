const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const logMiddleware = require("./middlewares/logger");
const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const postRoutes = require("./routes/postRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const cloudinary = require("cloudinary");

//environment variable config
dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_url: process.env.CLOUDINARY_URL,
  secure: true,
});

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
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server is running in the port ${PORT}`);
  dbConnect();
});
