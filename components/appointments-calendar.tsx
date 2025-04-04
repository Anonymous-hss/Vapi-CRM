"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
// Add the missing import for Users
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  List,
  CalendarIcon,
  PlusCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export function AppointmentsCalendar() {
  // Replace the appointments array with a useState and useEffect to fetch from backend
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Format date for API
        const formattedDate = date ? date.toISOString().split("T")[0] : "";

        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
          }/appointments?startDate=${formattedDate}`,
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
        console.error("Failed to fetch appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [date]);

  // Function to get appointments for a specific date
  const getAppointmentsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Function to check if a date has appointments
  const hasAppointments = (date: Date) => {
    return appointments.some((appointment) => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const todaysAppointments = getAppointmentsForDate(date);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("calendar")}
            className={cn(view === "calendar" && "bg-accent")}
          >
            <CalendarIcon className="h-4 w-4" />
            <span className="sr-only">Calendar view</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("list")}
            className={cn(view === "list" && "bg-accent")}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List view</span>
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Appointments</SelectItem>
              <SelectItem value="video">Video Calls</SelectItem>
              <SelectItem value="phone">Phone Calls</SelectItem>
              <SelectItem value="inperson">In Person</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDate(new Date())}
          >
            Today
          </Button>
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[350px_1fr]">
        <Card>
          <CardContent className="p-3">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                hasAppointment: (date) => hasAppointments(date),
              }}
              modifiersClassNames={{
                hasAppointment: "bg-primary/10 font-bold text-primary",
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {date ? format(date, "MMMM d, yyyy") : "No date selected"}
                </h3>
                <Badge variant="outline" className="text-xs">
                  {todaysAppointments.length} appointments
                </Badge>
              </div>

              {todaysAppointments.length > 0 ? (
                <div className="space-y-4">
                  {todaysAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium">{appointment.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <span>{appointment.time}</span>
                          <span className="mx-2">•</span>
                          <span>{appointment.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Badge
                          variant={
                            appointment.status === "Confirmed"
                              ? "default"
                              : "outline"
                          }
                        >
                          {appointment.status}
                        </Badge>
                        <Badge variant="secondary">{appointment.type}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">
                    No appointments for this day
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Select a different day or create a new appointment.
                  </p>
                  <Button className="mt-4">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Appointment
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
