import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectionUrl = process.env.DB_URL;

const connectDB = async () => {
  try {
    // Disable strict query mode to allow more flexible queries
    await mongoose.set("strictQuery", false);

    // Connect to the MongoDB database using the provided URL
    await mongoose.connect(connectionUrl);
    console.log("CONNECTION SUCCESS");
    // Log a success message if the connection is successful
    console.log("Connection to the database successful");
  } catch (error) {
    // Log an error message and exit the process if the connection fails
    console.log("Connection to the database failed");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
