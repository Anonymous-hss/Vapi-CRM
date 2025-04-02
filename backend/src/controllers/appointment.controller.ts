import type { Request, Response } from "express"
import { prisma } from "../index"

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const { customerId, startDate, endDate, status, type, page = "1", limit = "10" } = req.query

    const pageNumber = Number.parseInt(page as string, 10)
    const limitNumber = Number.parseInt(limit as string, 10)
    const skip = (pageNumber - 1) * limitNumber

    // Build filter conditions
    const where: any = {}

    if (customerId) {
      where.customerId = customerId as string
    }

    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate as string),
        lte: new Date(endDate as string),
      }
    } else if (startDate) {
      where.date = {
        gte: new Date(startDate as string),
      }
    } else if (endDate) {
      where.date = {
        lte: new Date(endDate as string),
      }
    }

    if (status) {
      where.status = status as string
    }

    if (type) {
      where.type = type as string
    }

    // Get appointments with pagination
    const [appointments, totalCount] = await Promise.all([
      prisma.appointment.findMany({
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
          date: "asc",
        },
        skip,
        take: limitNumber,
      }),
      prisma.appointment.count({ where }),
    ])

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limitNumber)
    const hasNextPage = pageNumber < totalPages
    const hasPrevPage = pageNumber > 1

    res.status(200).json({
      appointments,
      pagination: {
        total: totalCount,
        page: pageNumber,
        limit: limitNumber,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    })
  } catch (error) {
    console.error("Get appointments error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const appointment = await prisma.appointment.findUnique({
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
    })

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" })
    }

    res.status(200).json(appointment)
  } catch (error) {
    console.error("Get appointment by ID error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { title, date, duration, type, status, notes, customerId } = req.body

    // Check if customer exists
    const customer = await prisma.customer.findUnique({
      where: { id: customerId },
    })

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" })
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        title,
        date: new Date(date),
        duration,
        type,
        status: status || "Pending",
        notes,
        customerId,
        userId: req.user?.id as string,
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
    })

    res.status(201).json(appointment)
  } catch (error) {
    console.error("Create appointment error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, date, duration, type, status, notes } = req.body

    // Check if appointment exists
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id },
    })

    if (!existingAppointment) {
      return res.status(404).json({ message: "Appointment not found" })
    }

    // Update appointment
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        title,
        date: date ? new Date(date) : undefined,
        duration,
        type,
        status,
        notes,
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
    })

    res.status(200).json(appointment)
  } catch (error) {
    console.error("Update appointment error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const deleteAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Check if appointment exists
    const existingAppointment = await prisma.appointment.findUnique({
      where: { id },
    })

    if (!existingAppointment) {
      return res.status(404).json({ message: "Appointment not found" })
    }

    // Delete appointment
    await prisma.appointment.delete({
      where: { id },
    })

    res.status(200).json({ message: "Appointment deleted successfully" })
  } catch (error) {
    console.error("Delete appointment error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

