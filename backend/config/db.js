
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    if (error.reason && error.reason.servers) {
      for (const [address, server] of error.reason.servers) {
        console.log("\nServer:", address);
        console.log("Error:", server.error?.message || "No detailed error");
        console.log("Error name:", server.error?.name || "Unknown");
        console.log("Error code:", server.error?.code || "Not provided");
      }
    }

    process.exit(1);
  }
};

module.exports = connectDB;
