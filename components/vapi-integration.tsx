"use client";

import { Badge } from "@/components/ui/badge";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertCircle,
  Bot,
  FileCode,
  MessageSquare,
  Phone,
  Settings,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function VapiIntegration() {
  // Add state and useEffect to fetch real data
  const [isConnected, setIsConnected] = useState(false);
  const [callStats, setCallStats] = useState({
    totalCalls: 0,
    aiHandled: 0,
    avgDuration: "0:00",
    successRate: "0%",
  });

  useEffect(() => {
    const fetchVapiStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        // Check if Vapi is connected
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
          }/voice-calls/stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setIsConnected(data.isConnected || false);

          if (data.stats) {
            setCallStats({
              totalCalls: data.stats.totalCalls || 0,
              aiHandled: data.stats.aiHandled || 0,
              avgDuration: data.stats.avgDuration || "0:00",
              successRate: data.stats.successRate || "0%",
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch Vapi status:", error);
      }
    };

    fetchVapiStatus();
  }, []);

  return (
    <Tabs defaultValue="dashboard">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="calls">Call History</TabsTrigger>
        <TabsTrigger value="agents">Voice Agents</TabsTrigger>
        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard" className="space-y-4 mt-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* Update the card content to use real data */}
              {/* In the Dashboard tab, update the card content: */}
              <div className="text-2xl font-bold">{callStats.totalCalls}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Handled</CardTitle>
              <Bot className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* For AI Handled: */}
              <div className="text-2xl font-bold">{callStats.aiHandled}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  (callStats.aiHandled / callStats.totalCalls) * 100
                ) || 0}
                % of total calls
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Duration
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* For Avg. Duration: */}
              <div className="text-2xl font-bold">{callStats.avgDuration}</div>
              <p className="text-xs text-muted-foreground">
                -18% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Success Rate
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {/* For Success Rate: */}
              <div className="text-2xl font-bold">{callStats.successRate}</div>
              <p className="text-xs text-muted-foreground">
                +5% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Vapi Connection Status</CardTitle>
              <CardDescription>
                Configure your Vapi AI voice integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isConnected ? (
                <Alert className="bg-green-50 border-green-200">
                  <Bot className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-600">
                    Connected to Vapi
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your CRM is successfully connected to Vapi AI voice
                    services.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Not Connected</AlertTitle>
                  <AlertDescription>
                    Please configure your Vapi API credentials to enable voice
                    integration.
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="api-key">Vapi API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter your Vapi API key"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="webhook-url"
                    value="https://your-crm-domain.com/api/vapi/webhook"
                    readOnly
                  />
                  <Button variant="outline" size="icon">
                    <FileCode className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Configure this URL in your Vapi dashboard to receive events.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => setIsConnected(!isConnected)}
              >
                {isConnected ? "Disconnect" : "Connect to Vapi"}
              </Button>
            </CardFooter>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Quick Settings</CardTitle>
              <CardDescription>
                Configure your AI voice agent behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-answer">Automatic Call Answering</Label>
                  <p className="text-xs text-muted-foreground">
                    Let AI answer incoming calls automatically
                  </p>
                </div>
                <Switch id="auto-answer" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="transcription">Call Transcription</Label>
                  <p className="text-xs text-muted-foreground">
                    Record and transcribe all voice interactions
                  </p>
                </div>
                <Switch id="transcription" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="appointment">Appointment Scheduling</Label>
                  <p className="text-xs text-muted-foreground">
                    Allow AI to schedule appointments during calls
                  </p>
                </div>
                <Switch id="appointment" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="human-transfer">Human Transfer</Label>
                  <p className="text-xs text-muted-foreground">
                    Transfer to human agent when AI can't resolve
                  </p>
                </div>
                <Switch id="human-transfer" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="agents" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Voice Agent Configuration</CardTitle>
            <CardDescription>
              Customize how your AI voice agents interact with customers
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input id="agent-name" defaultValue="CRM Assistant" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-voice">Voice Type</Label>
              <select
                id="agent-voice"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="alloy">Alloy (Neutral)</option>
                <option value="shimmer">Shimmer (Female)</option>
                <option value="echo">Echo (Male)</option>
                <option value="fable">Fable (Female)</option>
                <option value="onyx">Onyx (Male)</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-instructions">Agent Instructions</Label>
              <Textarea
                id="agent-instructions"
                rows={5}
                defaultValue="You are a helpful CRM assistant. Your job is to help customers schedule appointments, answer questions about our services, and collect their contact information. Always be polite and professional. If you can't help with something, offer to transfer them to a human agent."
              />
              <p className="text-xs text-muted-foreground">
                Provide clear instructions for how your AI agent should interact
                with customers.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="agent-model">AI Model</Label>
              <select
                id="agent-model"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="gpt-4o">GPT-4o (Recommended)</option>
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3-opus">Claude 3 Opus</option>
                <option value="claude-3-sonnet">Claude 3 Sonnet</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Agent Capabilities</Label>
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="schedule"
                    className="rounded border-gray-300"
                    defaultChecked
                  />
                  <Label htmlFor="schedule">Schedule Appointments</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="collect"
                    className="rounded border-gray-300"
                    defaultChecked
                  />
                  <Label htmlFor="collect">Collect Customer Information</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="answer"
                    className="rounded border-gray-300"
                    defaultChecked
                  />
                  <Label htmlFor="answer">Answer FAQs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="transfer"
                    className="rounded border-gray-300"
                    defaultChecked
                  />
                  <Label htmlFor="transfer">Transfer to Human Agent</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Configuration</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="webhooks" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Webhook Configuration</CardTitle>
            <CardDescription>
              Set up webhooks to receive real-time events from Vapi
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                Configure these webhook endpoints in your Vapi dashboard to
                receive events in your CRM.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="call-started">Call Started Webhook</Label>
                <div className="flex gap-2">
                  <Input
                    id="call-started"
                    value="https://your-crm-domain.com/api/vapi/call-started"
                    readOnly
                  />
                  <Button variant="outline" size="icon">
                    <FileCode className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="call-ended">Call Ended Webhook</Label>
                <div className="flex gap-2">
                  <Input
                    id="call-ended"
                    value="https://your-crm-domain.com/api/vapi/call-ended"
                    readOnly
                  />
                  <Button variant="outline" size="icon">
                    <FileCode className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="transcription">Transcription Webhook</Label>
                <div className="flex gap-2">
                  <Input
                    id="transcription"
                    value="https://your-crm-domain.com/api/vapi/transcription"
                    readOnly
                  />
                  <Button variant="outline" size="icon">
                    <FileCode className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment">Appointment Webhook</Label>
                <div className="flex gap-2">
                  <Input
                    id="appointment"
                    value="https://your-crm-domain.com/api/vapi/appointment"
                    readOnly
                  />
                  <Button variant="outline" size="icon">
                    <FileCode className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4">
              <Label htmlFor="secret-key">Webhook Secret Key</Label>
              <Input
                id="secret-key"
                type="password"
                placeholder="Enter a secret key for webhook verification"
              />
              <p className="text-xs text-muted-foreground">
                This secret key will be used to verify that webhook requests are
                coming from Vapi.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Save Webhook Configuration</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="calls" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Call History</CardTitle>
            <CardDescription>
              View and manage your recent voice interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 font-medium">
                    <th className="py-3 px-4 text-left">Date & Time</th>
                    <th className="py-3 px-4 text-left">Customer</th>
                    <th className="py-3 px-4 text-left">Duration</th>
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">AI Handled</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4">Today, 2:34 PM</td>
                    <td className="py-3 px-4">John Smith</td>
                    <td className="py-3 px-4">4:32</td>
                    <td className="py-3 px-4">Inbound</td>
                    <td className="py-3 px-4">
                      <Badge variant="default">Completed</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        AI Handled
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Today, 11:15 AM</td>
                    <td className="py-3 px-4">Sarah Johnson</td>
                    <td className="py-3 px-4">2:15</td>
                    <td className="py-3 px-4">Outbound</td>
                    <td className="py-3 px-4">
                      <Badge variant="default">Completed</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">Human</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Yesterday, 3:45 PM</td>
                    <td className="py-3 px-4">Michael Brown</td>
                    <td className="py-3 px-4">0:45</td>
                    <td className="py-3 px-4">Inbound</td>
                    <td className="py-3 px-4">
                      <Badge variant="destructive">Missed</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">Human</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4">Yesterday, 10:20 AM</td>
                    <td className="py-3 px-4">Emily Davis</td>
                    <td className="py-3 px-4">5:20</td>
                    <td className="py-3 px-4">Inbound</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">Voicemail</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        AI Handled
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">2 days ago, 1:30 PM</td>
                    <td className="py-3 px-4">David Wilson</td>
                    <td className="py-3 px-4">3:10</td>
                    <td className="py-3 px-4">Outbound</td>
                    <td className="py-3 px-4">
                      <Badge variant="default">Completed</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200"
                      >
                        AI Handled
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="settings" className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Vapi Integration Settings</CardTitle>
            <CardDescription>
              Configure advanced settings for your Vapi integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">API Configuration</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">Vapi API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Enter your Vapi API key"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-url">API Base URL</Label>
                  <Input id="api-url" defaultValue="https://api.vapi.ai" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-version">API Version</Label>
                  <select
                    id="api-version"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="v1">v1 (Latest)</option>
                    <option value="v0">v0 (Legacy)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Call Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="record-calls">Record Calls</Label>
                    <p className="text-xs text-muted-foreground">
                      Record all voice interactions for quality and training
                    </p>
                  </div>
                  <Switch id="record-calls" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="transcribe-calls">Transcribe Calls</Label>
                    <p className="text-xs text-muted-foreground">
                      Generate text transcripts of all voice interactions
                    </p>
                  </div>
                  <Switch id="transcribe-calls" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="retention-period">
                    Call Retention Period
                  </Label>
                  <select
                    id="retention-period"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                    <option value="365">1 year</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Integration Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-sync">Auto-Sync Customer Data</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically sync customer data with Vapi
                    </p>
                  </div>
                  <Switch id="auto-sync" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="calendar-sync">Calendar Integration</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow Vapi to access calendar for scheduling
                    </p>
                  </div>
                  <Switch id="calendar-sync" defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhook-secret">Webhook Secret</Label>
                  <Input
                    id="webhook-secret"
                    type="password"
                    placeholder="Enter webhook secret key"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Reset to Default</Button>
            <Button>Save Settings</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
