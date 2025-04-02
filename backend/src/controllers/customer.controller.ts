import type { Request, Response } from "express"
import { prisma } from "../index"

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const { search, status, tag, page = "1", limit = "10" } = req.query

    const pageNumber = Number.parseInt(page as string, 10)
    const limitNumber = Number.parseInt(limit as string, 10)
    const skip = (pageNumber - 1) * limitNumber

    // Build filter conditions
    const where: any = {}

    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: "insensitive" } },
        { email: { contains: search as string, mode: "insensitive" } },
        { phone: { contains: search as string, mode: "insensitive" } },
      ]
    }

    if (status) {
      where.status = status as string
    }

    if (tag) {
      where.tags = { has: tag as string }
    }

    // Get customers with pagination
    const [customers, totalCount] = await Promise.all([
      prisma.customer.findMany({
        where,
        include: {
          appointments: {
            select: {
              id: true,
              date: true,
              status: true,
            },
            orderBy: {
              date: "desc",
            },
            take: 1,
          },
          voiceCalls: {
            select: {
              id: true,
              startTime: true,
              status: true,
            },
            orderBy: {
              startTime: "desc",
            },
            take: 1,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip,
        take: limitNumber,
      }),
      prisma.customer.count({ where }),
    ])

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limitNumber)
    const hasNextPage = pageNumber < totalPages
    const hasPrevPage = pageNumber > 1

    res.status(200).json({
      customers,
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
    console.error("Get customers error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        appointments: {
          orderBy: {
            date: "desc",
          },
        },
        voiceCalls: {
          orderBy: {
            startTime: "desc",
          },
        },
      },
    })

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" })
    }

    res.status(200).json(customer)
  } catch (error) {
    console.error("Get customer by ID error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, status, tags, notes, source } = req.body

    // Check if customer with same email already exists
    if (email) {
      const existingCustomer = await prisma.customer.findUnique({
        where: { email },
      })

      if (existingCustomer) {
        return res.status(400).json({ message: "Customer with this email already exists" })
      }
    }

    const customer = await prisma.customer.create({
      data: {
        name,
        email,
        phone,
        status: status || "New",
        tags: tags || [],
        notes,
        source: source || "Manual",
        userId: req.user?.id as string,
      },
    })

    res.status(201).json(customer)
  } catch (error) {
    console.error("Create customer error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { name, email, phone, status, tags, notes } = req.body

    // Check if customer exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    })

    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer not found" })
    }

    // Check if email is being changed and if it's already in use
    if (email && email !== existingCustomer.email) {
      const customerWithEmail = await prisma.customer.findUnique({
        where: { email },
      })

      if (customerWithEmail) {
        return res.status(400).json({ message: "Email is already in use" })
      }
    }

    const customer = await prisma.customer.update({
      where: { id },
      data: {
        name,
        email,
        phone,
        status,
        tags,
        notes,
        updatedAt: new Date(),
      },
    })

    res.status(200).json(customer)
  } catch (error) {
    console.error("Update customer error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    // Check if customer exists
    const existingCustomer = await prisma.customer.findUnique({
      where: { id },
    })

    if (!existingCustomer) {
      return res.status(404).json({ message: "Customer not found" })
    }

    // Delete customer
    await prisma.customer.delete({
      where: { id },
    })

    res.status(200).json({ message: "Customer deleted successfully" })
  } catch (error) {
    console.error("Delete customer error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

