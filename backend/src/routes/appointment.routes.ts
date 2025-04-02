import express from "express"
import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller"
import { authenticate } from "../middleware/auth"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticate)

// Get all appointments
router.get("/", getAppointments)

// Get appointment by ID
router.get("/:id", getAppointmentById)

// Create a new appointment
router.post("/", createAppointment)

// Update appointment
router.put("/:id", updateAppointment)

// Delete appointment
router.delete("/:id", deleteAppointment)

export default router

