import express from "express";
import { authenticate, authorize } from "../middleware/auth";
import { syncGoogleSheetData } from "../services/googleSheetSync";
import { prisma } from "../index";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Configure Google Sheet
router.post("/configure", authorize(["ADMIN"]), async (req, res) => {
  try {
    const { sheetId, sheetName } = req.body;

    if (!sheetId) {
      return res.status(400).json({ message: "Sheet ID is required" });
    }

    // Update environment variables
    process.env.GOOGLE_SHEET_ID = sheetId;
    process.env.GOOGLE_SHEET_NAME = sheetName || "Sheet1";

    // Create or update sync record
    const existingSync = await prisma.googleSheetSync.findFirst({
      where: {
        sheetId,
      },
    });

    if (existingSync) {
      await prisma.googleSheetSync.update({
        where: { id: existingSync.id },
        data: {
          sheetName: sheetName || "Sheet1",
          updatedAt: new Date(),
        },
      });
    } else {
      await prisma.googleSheetSync.create({
        data: {
          sheetId,
          sheetName: sheetName || "Sheet1",
          lastSyncedAt: new Date(),
          lastRowCount: 0,
        },
      });
    }

    // Trigger initial sync
    await syncGoogleSheetData();

    res.status(200).json({ message: "Google Sheet configured successfully" });
  } catch (error) {
    console.error("Google Sheet configuration error:", error);
    res.status(500).json({ message: "Failed to configure Google Sheet" });
  }
});

// Manually trigger Google Sheet sync (admin only)
router.post("/sync", authorize(["ADMIN"]), async (req, res) => {
  try {
    await syncGoogleSheetData();
    res
      .status(200)
      .json({ message: "Google Sheet sync triggered successfully" });
  } catch (error) {
    console.error("Manual sync error:", error);
    res.status(500).json({ message: "Failed to sync Google Sheet data" });
  }
});

// Get sync status
router.get("/status", async (req, res) => {
  try {
    const syncRecord = await prisma.googleSheetSync.findFirst({
      orderBy: {
        lastSyncedAt: "desc",
      },
    });

    if (!syncRecord) {
      return res.status(404).json({ message: "No sync records found" });
    }

    res.status(200).json({
      lastSyncedAt: syncRecord.lastSyncedAt,
      lastRowCount: syncRecord.lastRowCount,
      sheetId: syncRecord.sheetId,
      sheetName: syncRecord.sheetName,
    });
  } catch (error) {
    console.error("Get sync status error:", error);
    res.status(500).json({ message: "Failed to get sync status" });
  }
});

export default router;
