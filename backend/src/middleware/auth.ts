import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
        email: string
        role: string
      }
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" })
    }

    const token = authHeader.split(" ")[1]

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string
      email: string
      role: string
    }

    // Add user to request
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" })
  }
}

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Not authorized to access this resource" })
    }

    next()
  }
}

