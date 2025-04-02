"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useClientAuth } from "@/lib/client-auth";
import { GoogleSheetConnect } from "@/components/google-sheet-connect";
import { ClientDashboardNav } from "@/components/client-dashboard-nav";
import {
  BarChart3,
  CalendarIcon,
  FileSpreadsheet,
  LogOut,
  Settings,
  Users,
} from "lucide-react";

export default function ClientDashboardPage() {
  const { user, logout } = useClientAuth();
  const [isConnected, setIsConnected] = useState(false);

  const handleConnect = () => {
    setIsConnected(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <ClientDashboardNav />

      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome, {user?.name}
            </h1>
            <p className="text-muted-foreground">
              Manage your CRM integration and customer data
            </p>
          </div>
          <Button variant="outline" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isConnected ? "124" : "0"}
              </div>
              <p className="text-xs text-muted-foreground">
                {isConnected
                  ? "Synced from your Google Sheet"
                  : "Connect your Google Sheet to get started"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Appointments
              </CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isConnected ? "8" : "0"}
              </div>
              <p className="text-xs text-muted-foreground">
                {isConnected
                  ? "Scheduled this week"
                  : "No appointments scheduled"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
              <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isConnected ? "Active" : "Not Connected"}
              </div>
              <p className="text-xs text-muted-foreground">
                {isConnected
                  ? "Last synced 5 minutes ago"
                  : "Connect your Google Sheet"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AI Voice Calls
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isConnected ? "42" : "0"}
              </div>
              <p className="text-xs text-muted-foreground">
                {isConnected ? "Handled this month" : "No calls handled yet"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sheets" className="mt-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sheets">Google Sheets</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="sheets" className="mt-6">
            <GoogleSheetConnect
              isConnected={isConnected}
              onConnect={handleConnect}
            />
          </TabsContent>
          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>
                  View analytics and reports for your customer data
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isConnected ? (
                  <div className="space-y-4">
                    <p>Your reports and analytics will appear here.</p>
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">
                            Customer Growth
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-40 w-full bg-muted/30 flex items-center justify-center">
                            <p className="text-muted-foreground">
                              Chart placeholder
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Call Volume</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-40 w-full bg-muted/30 flex items-center justify-center">
                            <p className="text-muted-foreground">
                              Chart placeholder
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No data to display</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Connect your Google Sheet to see reports and analytics.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Company Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Company Name
                      </p>
                      <p>{user?.companyName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{user?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Preferences</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive email updates about your account
                        </p>
                      </div>
                      <div className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                        <div className="h-4 w-4 rounded-full bg-white"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto Sync</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically sync Google Sheet data
                        </p>
                      </div>
                      <div className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                        <div className="h-4 w-4 translate-x-5 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline">
                    <Settings className="mr-2 h-4 w-4" />
                    Update Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
