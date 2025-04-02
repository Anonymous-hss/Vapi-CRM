import express from "express"
import { createOrganization, getOrganization, updateOrganization } from "../controllers/organization.controller"
import { authenticate } from "../middleware/auth"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticate)

// Create organization
router.post("/", createOrganization)

// Get organization
router.get("/", getOrganization)

// Update organization
router.put("/", updateOrganization)

export default router

