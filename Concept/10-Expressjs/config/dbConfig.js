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

async function dbDisconnect() {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    console.log("🔴 Disconnected from Database");
  } catch (err) {
    console.error("❌ Database Disconnection Error:", err);
  }
}

module.exports = { dbConnect, dbDisconnect };
