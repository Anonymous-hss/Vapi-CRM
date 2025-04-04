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
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video } from "lucide-react";
import { format } from "date-fns";

export function UpcomingAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Get today's date and format it for the API
        const today = new Date();
        const startDate = today.toISOString().split("T")[0];

        // Get date 7 days from now
        const endDate = new Date(today);
        endDate.setDate(today.getDate() + 7);
        const endDateStr = endDate.toISOString().split("T")[0];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments?startDate=${startDate}&endDate=${endDateStr}&limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setAppointments(data.appointments || []);
        }
      } catch (error) {
        console.error("Failed to fetch upcoming appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Function to format date for display
  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return format(date, "MMM d");
    }
  };

  // Function to format time
  const formatTime = (dateString) => {
    return format(new Date(dateString), "h:mm a");
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Loading appointment data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
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
                  <div className="h-8 w-24 bg-muted animate-pulse rounded"></div>
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
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>
          You have {appointments.length} upcoming appointments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No upcoming appointments scheduled.
            </p>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={appointment.customer?.name}
                    />
                    <AvatarFallback>
                      {appointment.customer
                        ? getInitials(appointment.customer.name)
                        : "?"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {appointment.customer?.name || "Unknown Customer"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatAppointmentDate(appointment.date)}
                      </span>
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatTime(appointment.date)} ({appointment.duration}{" "}
                        min)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      appointment.status === "Confirmed" ? "default" : "outline"
                    }
                  >
                    {appointment.status}
                  </Badge>
                  <Button size="sm" variant="outline">
                    {appointment.type === "Video Call" && (
                      <Video className="mr-2 h-4 w-4" />
                    )}
                    {appointment.type}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
