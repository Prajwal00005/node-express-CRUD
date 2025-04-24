const mongoose = require("mongoose");
require("dotenv").config();

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connection successful");
  } catch (e) {
    console.error("Database connection failed:", e.message);
    process.exit(1);
  }
};

module.exports = connectdb;
