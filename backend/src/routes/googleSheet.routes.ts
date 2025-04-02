import express from "express";
import { authenticate, authorize } from "../middleware/auth";
import { syncGoogleSheetData } from "../services/googleSheetSync";
import { prisma } from "../index"; // Fix the import path

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

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
