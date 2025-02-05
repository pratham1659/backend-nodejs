const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("✅ MongoDB Connected Successfully!");
    })
    .catch((error) => {
      console.error("❌ MongoDB Connection Failed:", error);
    });
}

module.exports = dbConnect;
