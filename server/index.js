import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import path from "path";
import corsHandler from "./middleware/corsHandler.js";
import indexRoutes from "./routes/indexRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import initializeSocket from "./services/socket.js";
import cron from "node-cron";
dotenv.config();
import updatePatrollingStatus from "./services/crons.js";
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use("/v1/logs", express.static(path.join(__dirname, "/logs")));
app.use(corsHandler);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Apply socket middleware before routes
const io = initializeSocket(app);
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Run the updatePatrollingStatus function every minute
cron.schedule("0 */4 * * *", updatePatrollingStatus);

app.use("/api", indexRoutes);
app.use(errorHandler);
