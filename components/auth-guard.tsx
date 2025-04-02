"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Skip if still loading
    if (isLoading) return

    // Public routes that don't require authentication
    const publicRoutes = ["/login", "/register", "/forgot-password"]

    // If not authenticated and not on a public route, redirect to login
    if (!user && !publicRoutes.includes(pathname)) {
      router.push("/login")
    }

    // If authenticated and on a public route, redirect to dashboard
    if (user && publicRoutes.includes(pathname)) {
      router.push("/")
    }
  }, [user, isLoading, pathname, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Public routes don't need to wait for authentication
  if (!user && ["/login", "/register", "/forgot-password"].includes(pathname)) {
    return <>{children}</>
  }

  // Protected routes need to wait for authentication
  if (user) {
    return <>{children}</>
  }

  // Default loading state
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
    </div>
  )
}

