const mongoose = require("mongoose");
require("dotenv").config();

const dbconfig = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "abdurwebdev2",
      useNewUrlParser: true,
      useUnifiedTopology: true, // this is now ignored but doesn't cause harm
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
};

module.exports = dbconfig;
