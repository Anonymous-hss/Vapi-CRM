"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function RecentCustomers() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customers?limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCustomers(data.customers || []);
        }
      } catch (error) {
        console.error("Failed to fetch recent customers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Customers</CardTitle>
          <CardDescription>Loading customer data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
                  <div>
                    <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                    <div className="h-3 w-48 bg-muted animate-pulse rounded mt-2"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                  <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
        <CardDescription>
          You have {customers.length} customers in your database.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customers.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No customers found. Add your first customer to get started.
            </p>
          ) : (
            customers.map((customer) => (
              <div
                key={customer.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={customer.name}
                    />
                    <AvatarFallback>
                      {getInitials(customer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {customer.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {customer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      customer.status === "Active"
                        ? "default"
                        : customer.status === "New"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {customer.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
