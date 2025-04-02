import express from "express"
import { register, login, refreshToken, getMe } from "../controllers/auth.controller"
import { authenticate } from "../middleware/auth"

const router = express.Router()

// Register a new user
router.post("/register", register)

// Login user
router.post("/login", login)

// Refresh token
router.post("/refresh-token", refreshToken)

// Get current user
router.get("/me", authenticate, getMe)

export default router

