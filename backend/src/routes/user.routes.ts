import express from "express";
import { authenticate, authorize } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Get all users (admin only)
router.get("/", authorize(["ADMIN"]), async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Users can only access their own data unless they're an admin
    if (req.user?.id !== id && req.user?.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Not authorized to access this resource" });
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;

    // Users can only update their own data unless they're an admin
    if (req.user?.id !== id && req.user?.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "Not authorized to access this resource" });
    }

    // Only admins can update roles
    if (role && req.user?.role !== "ADMIN") {
      return res.status(403).json({ message: "Not authorized to update role" });
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete user (admin only)
router.delete("/:id", authorize(["ADMIN"]), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
