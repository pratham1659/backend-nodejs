const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    logger.error("Failed to connect to the database:", err.message || err);
    process.exit(1);
  }
}

module.exports = dbConnect;
