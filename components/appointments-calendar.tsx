"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  List,
  CalendarIcon,
  PlusCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";

export function AppointmentsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState<"calendar" | "list">("calendar");

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      title: "Meeting with John Smith",
      date: new Date(),
      time: "2:00 PM",
      duration: "30 min",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 2,
      title: "Call with Sarah Johnson",
      date: new Date(),
      time: "4:30 PM",
      duration: "45 min",
      type: "Phone Call",
      status: "Confirmed",
    },
    {
      id: 3,
      title: "Consultation with Michael Brown",
      date: addDays(new Date(), 1),
      time: "10:00 AM",
      duration: "60 min",
      type: "In Person",
      status: "Pending",
    },
    {
      id: 4,
      title: "Follow-up with Emily Davis",
      date: addDays(new Date(), 1),
      time: "1:15 PM",
      duration: "30 min",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 5,
      title: "Product demo for David Wilson",
      date: addDays(new Date(), 2),
      time: "11:00 AM",
      duration: "45 min",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 6,
      title: "Initial consultation with Jennifer Taylor",
      date: addDays(new Date(), 3),
      time: "3:30 PM",
      duration: "60 min",
      type: "Phone Call",
      status: "Pending",
    },
  ];

  // Function to get appointments for a specific date
  const getAppointmentsForDate = (date: Date | undefined) => {
    if (!date) return [];
    return appointments.filter(
      (appointment) =>
        appointment.date.getDate() === date.getDate() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getFullYear() === date.getFullYear()
    );
  };

  // Function to check if a date has appointments
  const hasAppointments = (date: Date) => {
    return appointments.some(
      (appointment) =>
        appointment.date.getDate() === date.getDate() &&
        appointment.date.getMonth() === date.getMonth() &&
        appointment.date.getFullYear() === date.getFullYear()
    );
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
