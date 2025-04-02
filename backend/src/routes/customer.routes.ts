import express from "express"
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customer.controller"
import { authenticate, authorize } from "../middleware/auth"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticate)

// Get all customers
router.get("/", getCustomers)

// Get customer by ID
router.get("/:id", getCustomerById)

// Create a new customer
router.post("/", createCustomer)

// Update customer
router.put("/:id", updateCustomer)

// Delete customer (admin only)
router.delete("/:id", authorize(["ADMIN", "MANAGER"]), deleteCustomer)

export default router

