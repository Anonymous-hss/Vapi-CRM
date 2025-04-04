"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Phone,
  Users,
  ArrowUp,
  ArrowDown,
  Activity,
} from "lucide-react";
import { RecentCustomers } from "@/components/recent-customers";
import { UpcomingAppointments } from "@/components/upcoming-appointments";
import { RecentCalls } from "@/components/recent-calls";

export function DashboardOverview() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    appointments: 0,
    voiceCalls: 0,
    conversionRate: 0,
    customerGrowth: 0,
    appointmentGrowth: 0,
    callGrowth: 0,
    conversionGrowth: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // You would create these endpoints in your backend
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/stats/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.totalCustomers}
            </div>
            <p className="text-xs text-muted-foreground">
              <span
                className={`text-${
                  stats.customerGrowth >= 0 ? "green" : "red"
                }-500 flex items-center`}
              >
                {stats.customerGrowth >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.customerGrowth)}%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.appointments}
            </div>
            <p className="text-xs text-muted-foreground">
              <span
                className={`text-${
                  stats.appointmentGrowth >= 0 ? "green" : "red"
                }-500 flex items-center`}
              >
                {stats.appointmentGrowth >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.appointmentGrowth)}%
              </span>{" "}
              from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voice Calls</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.voiceCalls}
            </div>
            <p className="text-xs text-muted-foreground">
              <span
                className={`text-${
                  stats.callGrowth >= 0 ? "green" : "red"
                }-500 flex items-center`}
              >
                {stats.callGrowth >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.callGrowth)}%
              </span>{" "}
              from yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : stats.conversionRate}%
            </div>
            <p className="text-xs text-muted-foreground">
              <span
                className={`text-${
                  stats.conversionGrowth >= 0 ? "green" : "red"
                }-500 flex items-center`}
              >
                {stats.conversionGrowth >= 0 ? (
                  <ArrowUp className="mr-1 h-3 w-3" />
                ) : (
                  <ArrowDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(stats.conversionGrowth)}%
              </span>{" "}
              from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="customers" className="space-y-4">
        <TabsList>
          <TabsTrigger value="customers">Recent Customers</TabsTrigger>
          <TabsTrigger value="appointments">Upcoming Appointments</TabsTrigger>
          <TabsTrigger value="calls">Recent Calls</TabsTrigger>
        </TabsList>
        <TabsContent value="customers" className="space-y-4">
          <RecentCustomers />
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <UpcomingAppointments />
        </TabsContent>
        <TabsContent value="calls" className="space-y-4">
          <RecentCalls />
        </TabsContent>
      </Tabs>
    </div>
  );
}
