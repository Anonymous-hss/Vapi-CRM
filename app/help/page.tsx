import { DashboardLayout } from "@/components/dashboard-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  HelpCircle,
  Book,
  FileText,
  MessageSquare,
  Phone,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function HelpPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
          <p className="text-muted-foreground">
            Get help with using the CRM system
          </p>
        </div>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          Contact Support
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for help topics..."
            className="pl-10 py-6 text-lg"
          />
        </div>
      </div>

      <Tabs defaultValue="guides" className="space-y-4">
        <TabsList>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Book className="mr-2 h-5 w-5 text-primary" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn the basics of using the CRM system and set up your
                  account.
                </p>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline block"
                  >
                    Setting up your profile
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline block"
                  >
                    Navigating the dashboard
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline block"
                  >
                    Adding your first customer
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Customer Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to manage your customers and their information.
                </p>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline block"
                  >
                    Adding and editing customers
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline block"
                  >
                    Customer tags and segmentation
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline block"
                  >
                    Importing customers from Google Sheets
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-primary" />
                  AI Voice Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to use the AI voice features to handle customer
                  calls.
                </p>
                <div className="space-y-2">
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline block"
                  >
                    Setting up Vapi integration
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline block"
                  >
                    Configuring your AI voice agent
                  </Link>
                  <Link
                    href="#"
                    className="text-sm text-primary hover:underline block"
                  >
                    Managing voice call recordings
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Popular Guides</CardTitle>
              <CardDescription>
                Most frequently accessed help articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 border-b pb-4">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">
                      How to set up Google Sheets integration
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn how to connect your Google Sheet to import customer
                      data automatically.
                    </p>
                    <Link
                      href="#"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      Read guide →
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-b pb-4">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">
                      Configuring your AI voice agent
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Step-by-step instructions for setting up and customizing
                      your AI voice agent.
                    </p>
                    <Link
                      href="#"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      Read guide →
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium">
                      Managing appointments and scheduling
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn how to create, edit, and manage customer
                      appointments efficiently.
                    </p>
                    <Link
                      href="#"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      Read guide →
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-medium">How do I reset my password?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can reset your password by clicking on the "Forgot
                    password" link on the login page. You will receive an email
                    with instructions to reset your password.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium">
                    Can I import customers from a CSV file?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Currently, the system supports importing customers from
                    Google Sheets. You can export your CSV data to Google Sheets
                    first, then connect it to the CRM.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium">
                    How does the AI voice agent work?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    The AI voice agent uses Vapi's technology to handle customer
                    calls. It can answer questions, schedule appointments, and
                    collect information automatically.
                  </p>
                </div>
                <div className="border-b pb-4">
                  <h3 className="font-medium">Is my data secure?</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes, all data is encrypted and stored securely. We follow
                    industry best practices for data security and privacy.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">
                    Can I customize the AI voice agent's responses?
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Yes, you can customize the AI voice agent's instructions and
                    responses in the Voice Calls settings page.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Video Tutorials</CardTitle>
              <CardDescription>
                Learn by watching step-by-step video guides
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <HelpCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">
                      Getting Started with the CRM
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      A complete walkthrough of the CRM system and its features.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Duration: 8:24
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <HelpCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">
                      Setting Up Vapi AI Voice Integration
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Learn how to connect and configure the AI voice
                      capabilities.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Duration: 12:37
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <HelpCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">
                      Managing Customers and Appointments
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Tips and tricks for efficient customer and appointment
                      management.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Duration: 10:15
                    </p>
                  </div>
                </div>
                <div className="rounded-lg border overflow-hidden">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <HelpCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Google Sheets Integration</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      How to import and sync customer data from Google Sheets.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Duration: 7:42
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input className="mt-1" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      className="mt-1"
                      placeholder="Your email"
                      type="email"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input
                    className="mt-1"
                    placeholder="What do you need help with?"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                    placeholder="Describe your issue in detail"
                  />
                </div>
                <Button className="w-full">Submit Support Request</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
