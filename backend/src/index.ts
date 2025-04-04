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
import { authenticate } from "./middleware/auth";

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

// Dashboard stats endpoint
app.get("/api/stats/dashboard", authenticate, async (req, res) => {
  try {
    // Get current date
    const now = new Date();

    // Get date 30 days ago
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(now.getDate() - 30);

    // Get date 60 days ago
    const sixtyDaysAgo = new Date(now);
    sixtyDaysAgo.setDate(now.getDate() - 60);

    // Get date 7 days ago
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    // Get date 14 days ago
    const fourteenDaysAgo = new Date(now);
    fourteenDaysAgo.setDate(now.getDate() - 14);

    // Get yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    // Get day before yesterday
    const dayBeforeYesterday = new Date(now);
    dayBeforeYesterday.setDate(now.getDate() - 2);

    // Get counts
    const [
      totalCustomers,
      customersLastMonth,
      customersMonthBefore,
      appointments,
      appointmentsLastWeek,
      appointmentsWeekBefore,
      voiceCalls,
      voiceCallsYesterday,
      voiceCallsDayBefore,
    ] = await Promise.all([
      prisma.customer.count(),
      prisma.customer.count({
        where: {
          createdAt: {
            gte: thirtyDaysAgo,
          },
        },
      }),
      prisma.customer.count({
        where: {
          createdAt: {
            gte: sixtyDaysAgo,
            lt: thirtyDaysAgo,
          },
        },
      }),
      prisma.appointment.count(),
      prisma.appointment.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      }),
      prisma.appointment.count({
        where: {
          createdAt: {
            gte: fourteenDaysAgo,
            lt: sevenDaysAgo,
          },
        },
      }),
      prisma.voiceCall.count(),
      prisma.voiceCall.count({
        where: {
          startTime: {
            gte: yesterday,
          },
        },
      }),
      prisma.voiceCall.count({
        where: {
          startTime: {
            gte: dayBeforeYesterday,
            lt: yesterday,
          },
        },
      }),
    ]);

    // Calculate growth percentages
    const customerGrowth =
      customersMonthBefore === 0
        ? 100
        : Math.round(
            ((customersLastMonth - customersMonthBefore) /
              customersMonthBefore) *
              100
          );

    const appointmentGrowth =
      appointmentsWeekBefore === 0
        ? 100
        : Math.round(
            ((appointmentsLastWeek - appointmentsWeekBefore) /
              appointmentsWeekBefore) *
              100
          );

    const callGrowth =
      voiceCallsDayBefore === 0
        ? 100
        : Math.round(
            ((voiceCallsYesterday - voiceCallsDayBefore) /
              voiceCallsDayBefore) *
              100
          );

    // Calculate conversion rate (appointments / customers)
    const conversionRate =
      totalCustomers === 0
        ? 0
        : Math.round((appointments / totalCustomers) * 100);

    // Dummy conversion growth for now
    const conversionGrowth = 7;

    res.status(200).json({
      totalCustomers,
      appointments,
      voiceCalls,
      conversionRate,
      customerGrowth,
      appointmentGrowth,
      callGrowth,
      conversionGrowth,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to get dashboard stats" });
  }
});

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
