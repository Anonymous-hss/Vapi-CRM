"use client";

import type React from "react";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useClientAuth } from "@/lib/client-auth";

interface ClientAuthGuardProps {
  children: React.ReactNode;
}

export function ClientAuthGuard({ children }: ClientAuthGuardProps) {
  const { user, isLoading } = useClientAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip if still loading
    if (isLoading) return;

    // Public routes that don't require authentication
    const publicRoutes = [
      "/landing",
      "/login",
      "/client-signup",
      "/register",
      "/forgot-password",
    ];
    const isPublicRoute = publicRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // If not authenticated and not on a public route, redirect to login
    if (!user && !isPublicRoute && pathname.startsWith("/client")) {
      router.push("/login");
    }
  }, [user, isLoading, pathname, router]);

  // Show loading state
  if (isLoading && pathname.startsWith("/client")) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Public routes don't need to wait for authentication
  if (!user && pathname.startsWith("/landing")) {
    return <>{children}</>;
  }

  // Protected routes need to wait for authentication
  if (user || !pathname.startsWith("/client")) {
    return <>{children}</>;
  }

  // Default loading state
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
