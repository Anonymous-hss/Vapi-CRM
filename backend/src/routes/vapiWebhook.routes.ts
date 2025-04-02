import express from "express"
import { prisma } from "../index"

const router = express.Router()

// Webhook for call started event
router.post("/call-started", async (req, res) => {
  try {
    const { callId, direction, customerPhone, timestamp } = req.body

    // Validate webhook secret
    const webhookSecret = req.headers["x-vapi-webhook-secret"]

    if (webhookSecret !== process.env.VAPI_WEBHOOK_SECRET) {
      return res.status(401).json({ message: "Invalid webhook secret" })
    }

    // Find customer by phone number
    let customer = null

    if (customerPhone) {
      customer = await prisma.customer.findFirst({
        where: { phone: customerPhone },
      })
    }

    // Create voice call record
    await prisma.voiceCall.create({
      data: {
        callId,
        direction,
        status: "In Progress",
        startTime: new Date(timestamp),
        aiHandled: true,
        customerId: customer?.id || null,
      },
    })

    res.status(200).json({ message: "Call started event processed" })
  } catch (error) {
    console.error("Call started webhook error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Webhook for call ended event
router.post("/call-ended", async (req, res) => {
  try {
    const { callId, status, duration, recordingUrl, timestamp } = req.body

    // Validate webhook secret
    const webhookSecret = req.headers["x-vapi-webhook-secret"]

    if (webhookSecret !== process.env.VAPI_WEBHOOK_SECRET) {
      return res.status(401).json({ message: "Invalid webhook secret" })
    }

    // Find voice call by callId
    const voiceCall = await prisma.voiceCall.findFirst({
      where: { callId },
    })

    if (!voiceCall) {
      return res.status(404).json({ message: "Voice call not found" })
    }

    // Update voice call record
    await prisma.voiceCall.update({
      where: { id: voiceCall.id },
      data: {
        status,
        duration,
        recordingUrl,
        endTime: new Date(timestamp),
      },
    })

    res.status(200).json({ message: "Call ended event processed" })
  } catch (error) {
    console.error("Call ended webhook error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Webhook for transcription event
router.post("/transcription", async (req, res) => {
  try {
    const { callId, transcriptUrl } = req.body

    // Validate webhook secret
    const webhookSecret = req.headers["x-vapi-webhook-secret"]

    if (webhookSecret !== process.env.VAPI_WEBHOOK_SECRET) {
      return res.status(401).json({ message: "Invalid webhook secret" })
    }

    // Find voice call by callId
    const voiceCall = await prisma.voiceCall.findFirst({
      where: { callId },
    })

    if (!voiceCall) {
      return res.status(404).json({ message: "Voice call not found" })
    }

    // Update voice call record
    await prisma.voiceCall.update({
      where: { id: voiceCall.id },
      data: {
        transcriptUrl,
      },
    })

    res.status(200).json({ message: "Transcription event processed" })
  } catch (error) {
    console.error("Transcription webhook error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Webhook for appointment event
router.post("/appointment", async (req, res) => {
  try {
    const { callId, customerPhone, appointmentDetails } = req.body

    // Validate webhook secret
    const webhookSecret = req.headers["x-vapi-webhook-secret"]

    if (webhookSecret !== process.env.VAPI_WEBHOOK_SECRET) {
      return res.status(401).json({ message: "Invalid webhook secret" })
    }

    // Find customer by phone number
    let customer = await prisma.customer.findFirst({
      where: { phone: customerPhone },
    })

    // If customer doesn't exist, create a new one
    if (!customer) {
      const adminUser = await prisma.user.findFirst({
        where: { role: "ADMIN" },
      })

      if (!adminUser) {
        return res.status(500).json({ message: "No admin user found" })
      }

      customer = await prisma.customer.create({
        data: {
          name: appointmentDetails.name || "Unknown",
          phone: customerPhone,
          status: "New",
          tags: ["Lead", "Voice Call"],
          source: "Voice Call",
          userId: adminUser.id,
        },
      })
    }

    // Create appointment
    await prisma.appointment.create({
      data: {
        title: appointmentDetails.title || "Voice Call Appointment",
        date: new Date(appointmentDetails.date),
        duration: appointmentDetails.duration || 30,
        type: appointmentDetails.type || "Phone Call",
        status: "Pending",
        notes: appointmentDetails.notes || "Scheduled via AI voice call",
        customerId: customer.id,
        userId: customer.userId,
      },
    })

    res.status(200).json({ message: "Appointment event processed" })
  } catch (error) {
    console.error("Appointment webhook error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router

