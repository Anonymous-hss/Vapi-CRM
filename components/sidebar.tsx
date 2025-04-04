"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  Calendar,
  BarChart,
  Settings,
  Phone,
  Home,
  MessageSquare,
  FileText,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  open: boolean;
}

export function Sidebar({ open }: SidebarProps) {
  const pathname = usePathname();

  // Update the routes array to include the new pages
  const routes = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Users, label: "Customers", href: "/customers" },
    { icon: Calendar, label: "Appointments", href: "/appointments" },
    { icon: Phone, label: "Voice Calls", href: "/voice-calls" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: FileText, label: "Reports", href: "/reports" },
    { icon: BarChart, label: "Analytics", href: "/analytics" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: HelpCircle, label: "Help", href: "/help" },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card transition-transform duration-300 ease-in-out md:relative",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"
      )}
    >
      <div
        className={cn(
          "flex h-14 items-center border-b px-4",
          open ? "justify-between" : "justify-center"
        )}
      >
        {open ? (
          <h1 className="text-xl font-bold">CRM System</h1>
        ) : (
          <span className="text-xl font-bold">CRM</span>
        )}
      </div>
      <ScrollArea className="flex-1 py-2">
        <nav className="grid gap-1 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex h-10 items-center rounded-md px-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                pathname === route.href && "bg-accent text-accent-foreground",
                !open && "justify-center px-0"
              )}
            >
              <route.icon className={cn("h-5 w-5", open && "mr-2")} />
              {open && <span>{route.label}</span>}
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className={cn("flex items-center", !open && "justify-center")}>
          <div className="h-8 w-8 rounded-full bg-primary" />
          {open && (
            <div className="ml-2">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
