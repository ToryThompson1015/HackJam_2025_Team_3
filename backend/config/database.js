const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not set in environment variables");
  }

  try {
    // In Mongoose 6+, NewUrlParser & UnifiedTopology are the defaults
    await mongoose.connect(uri);

    console.log(` MongoDB connected → ${mongoose.connection.host}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
