import type { Request, Response, NextFunction } from "express"

export const errorHandler = (err: Error & { statusCode?: number }, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)

  const statusCode = err.statusCode || 500
  const message = err.message || "Something went wrong"

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  })
}

