const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://prafulkusugal:tLz7RnFv3tWHLzt8@cluster0.klvwa.mongodb.net/",
    );

    console.log("MongoDB Atlas Connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;
