import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import customerRoutes from "./routes/customer.routes";
import appointmentRoutes from "./routes/appointment.routes";
import voiceCallRoutes from "./routes/voiceCall.routes";
import googleSheetRoutes from "./routes/googleSheet.routes";
import vapiWebhookRoutes from "./routes/vapiWebhook.routes";
import { errorHandler } from "./middleware/errorHandler";
import { startGoogleSheetSync } from "./services/googleSheetSync";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Initialize Prisma client
export const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/voice-calls", voiceCallRoutes);
app.use("/api/google-sheet", googleSheetRoutes);
app.use("/api/vapi/webhook", vapiWebhookRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  // Start Google Sheet sync process
  if (process.env.GOOGLE_SHEET_ID) {
    startGoogleSheetSync();
  }
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Disconnected from database");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  console.log("Disconnected from database");
  process.exit(0);
});
