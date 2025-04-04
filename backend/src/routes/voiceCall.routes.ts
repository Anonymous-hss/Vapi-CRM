import express from "express";
import { authenticate } from "../middleware/auth";
import { prisma } from "../index";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all voice calls
router.get("/", async (req, res) => {
  try {
    const {
      customerId,
      startDate,
      endDate,
      status,
      direction,
      page = "1",
      limit = "10",
    } = req.query;

    const pageNumber = Number.parseInt(page as string, 10);
    const limitNumber = Number.parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // Build filter conditions
    const where: any = {};

    if (customerId) {
      where.customerId = customerId as string;
    }

    if (startDate && endDate) {
      where.startTime = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      };
    } else if (startDate) {
      where.startTime = {
        gte: new Date(startDate as string),
      };
    } else if (endDate) {
      where.startTime = {
        lte: new Date(endDate as string),
      };
    }

    if (status) {
      where.status = status as string;
    }

    if (direction) {
      where.direction = direction as string;
    }

    // Get voice calls with pagination
    const [voiceCalls, totalCount] = await Promise.all([
      prisma.voiceCall.findMany({
        where,
        include: {
          customer: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
            },
          },
        },
        orderBy: {
          startTime: "desc",
        },
        skip,
        take: limitNumber,
      }),
      prisma.voiceCall.count({ where }),
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limitNumber);
    const hasNextPage = pageNumber < totalPages;
    const hasPrevPage = pageNumber > 1;

    res.status(200).json({
      voiceCalls,
      pagination: {
        total: totalCount,
        page: pageNumber,
        limit: limitNumber,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error("Get voice calls error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get voice call by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const voiceCall = await prisma.voiceCall.findUnique({
      where: { id },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    if (!voiceCall) {
      return res.status(404).json({ message: "Voice call not found" });
    }

    res.status(200).json(voiceCall);
  } catch (error) {
    console.error("Get voice call by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a voice call record
router.post("/", async (req, res) => {
  try {
    const {
      customerId,
      direction,
      status,
      duration,
      recordingUrl,
      transcriptUrl,
      aiHandled,
      notes,
      startTime,
      endTime,
    } = req.body;

    // Check if customer exists
    if (customerId) {
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
      });

      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
    }

    // Create voice call
    const voiceCall = await prisma.voiceCall.create({
      data: {
        customerId,
        userId: req.user?.id,
        direction,
        status,
        duration,
        recordingUrl,
        transcriptUrl,
        aiHandled: aiHandled || false,
        notes,
        startTime: startTime ? new Date(startTime) : new Date(),
        endTime: endTime ? new Date(endTime) : undefined,
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    res.status(201).json(voiceCall);
  } catch (error) {
    console.error("Create voice call error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update voice call
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status,
      duration,
      recordingUrl,
      transcriptUrl,
      aiHandled,
      notes,
      endTime,
    } = req.body;

    // Check if voice call exists
    const existingVoiceCall = await prisma.voiceCall.findUnique({
      where: { id },
    });

    if (!existingVoiceCall) {
      return res.status(404).json({ message: "Voice call not found" });
    }

    // Update voice call
    const voiceCall = await prisma.voiceCall.update({
      where: { id },
      data: {
        status,
        duration,
        recordingUrl,
        transcriptUrl,
        aiHandled,
        notes,
        endTime: endTime ? new Date(endTime) : undefined,
        updatedAt: new Date(),
      },
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    res.status(200).json(voiceCall);
  } catch (error) {
    console.error("Update voice call error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete voice call
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if voice call exists
    const existingVoiceCall = await prisma.voiceCall.findUnique({
      where: { id },
    });

    if (!existingVoiceCall) {
      return res.status(404).json({ message: "Voice call not found" });
    }

    // Delete voice call
    await prisma.voiceCall.delete({
      where: { id },
    });

    res.status(200).json({ message: "Voice call deleted successfully" });
  } catch (error) {
    console.error("Delete voice call error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get voice call statistics
router.get("/stats", async (req, res) => {
  try {
    // Check if Vapi is connected
    const isConnected = !!process.env.VAPI_API_KEY;

    // Get call statistics
    const [totalCalls, aiHandledCalls, callsWithDuration] = await Promise.all([
      prisma.voiceCall.count(),
      prisma.voiceCall.count({
        where: { aiHandled: true },
      }),
      prisma.voiceCall.findMany({
        where: {
          duration: {
            not: null,
          },
        },
        select: {
          duration: true,
        },
      }),
    ]);

    // Calculate average duration
    let avgDuration = "0:00";
    if (callsWithDuration.length > 0) {
      const totalDuration = callsWithDuration.reduce(
        (sum, call) => sum + (call.duration || 0),
        0
      );
      const avgSeconds = Math.round(totalDuration / callsWithDuration.length);
      const minutes = Math.floor(avgSeconds / 60);
      const seconds = avgSeconds % 60;
      avgDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    // Calculate success rate (completed calls / total calls)
    const completedCalls = await prisma.voiceCall.count({
      where: { status: "Completed" },
    });
    const successRate =
      totalCalls > 0
        ? `${Math.round((completedCalls / totalCalls) * 100)}%`
        : "0%";

    res.status(200).json({
      isConnected,
      stats: {
        totalCalls,
        aiHandled: aiHandledCalls,
        avgDuration,
        successRate,
      },
    });
  } catch (error) {
    console.error("Get voice call stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
