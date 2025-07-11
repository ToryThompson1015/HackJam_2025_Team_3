const mongoose = require("mongoose");

/* Replace <username> <password> with your database details */
const db = process.env.MONGO_URI;
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    if (!db) {
      throw new Error('MongoDB URI is not defined in environment variables');
    }
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is Connected...");
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
module.exports = connectDB;
