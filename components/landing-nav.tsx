"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";

export function LandingNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Phone className="h-6 w-6" />
          <span className="text-xl font-bold">CRM AI Voice</span>
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
          <Link href="/landing#features">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Features
            </Button>
          </Link>
          <Link href="/landing#pricing">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Pricing
            </Button>
          </Link>
          <Link href="/landing#testimonials">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Testimonials
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/20">
              Login
            </Button>
          </Link>
          <Link href="/client-signup">
            <Button className="bg-white text-primary hover:bg-white/90">
              Sign Up Free
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-primary p-4 z-50">
          <div className="flex flex-col space-y-2">
            <Link href="/landing#features" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full text-white hover:bg-white/20 justify-start"
              >
                Features
              </Button>
            </Link>
            <Link href="/landing#pricing" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full text-white hover:bg-white/20 justify-start"
              >
                Pricing
              </Button>
            </Link>
            <Link
              href="/landing#testimonials"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button
                variant="ghost"
                className="w-full text-white hover:bg-white/20 justify-start"
              >
                Testimonials
              </Button>
            </Link>
            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full text-white hover:bg-white/20 justify-start"
              >
                Login
              </Button>
            </Link>
            <Link href="/client-signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-white text-primary hover:bg-white/90 justify-start">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
