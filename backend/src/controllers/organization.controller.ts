import type { Request, Response } from "express";
import { prisma } from "../index";

export const createOrganization = async (req: Request, res: Response) => {
  try {
    const { name, industry, size } = req.body;

    // Create organization
    const organization = await prisma.organization.create({
      data: {
        name,
        industry,
        size,
      },
    });

    // Update user's organization
    await prisma.user.update({
      where: { id: req.user?.id },
      data: {
        organizationId: organization.id,
        role: "ADMIN", // First user is always admin
      },
    });

    res.status(201).json(organization);
  } catch (error) {
    console.error("Create organization error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getOrganization = async (req: Request, res: Response) => {
  try {
    // Get user with organization
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      include: {
        organization: true,
      },
    });

    if (!user || !user.organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(user.organization);
  } catch (error) {
    console.error("Get organization error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrganization = async (req: Request, res: Response) => {
  try {
    const { name, industry, size } = req.body;

    // Get user with organization
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
      include: {
        organization: true,
      },
    });

    if (!user || !user.organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // Update organization
    const organization = await prisma.organization.update({
      where: { id: user.organization.id },
      data: {
        name,
        industry,
        size,
      },
    });

    res.status(200).json(organization);
  } catch (error) {
    console.error("Update organization error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
