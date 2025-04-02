"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X, User, Bell } from "lucide-react";
import { useClientAuth } from "@/lib/client-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ClientDashboardNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useClientAuth();

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 md:px-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/client-dashboard">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-lg font-bold">CRM AI Voice</span>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/client-dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <Link href="/client-dashboard?tab=sheets">
              <Button variant="ghost">Google Sheets</Button>
            </Link>
            <Link href="/client-dashboard?tab=reports">
              <Button variant="ghost">Reports</Button>
            </Link>
            <Link href="/client-dashboard?tab=settings">
              <Button variant="ghost">Settings</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>No new notifications</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                  {user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Link href="/client-dashboard" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
            <Link
              href="/client-dashboard?tab=sheets"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start">
                Google Sheets
              </Button>
            </Link>
            <Link
              href="/client-dashboard?tab=reports"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start">
                Reports
              </Button>
            </Link>
            <Link
              href="/client-dashboard?tab=settings"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button variant="ghost" className="w-full justify-start">
                Settings
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
