import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LandingNav } from "@/components/landing-nav";
import {
  CalendarIcon,
  CheckCircle,
  Phone,
  BarChart3,
  Users,
  MessageSquare,
  Bot,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-primary to-purple-700 text-white">
        <div className="container mx-auto px-4 py-24 md:px-6">
          <LandingNav />

          <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="space-y-6">
              <Badge className="bg-white/20 hover:bg-white/30 text-white">
                New: AI Voice Integration
              </Badge>
              <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                Transform Your Customer Relationships with AI Voice
              </h1>
              <p className="text-xl text-white/80">
                A powerful CRM with AI voice capabilities to handle customer
                calls, schedule appointments, and boost your productivity.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link href="/client-signup">
                  <Button
                    className="bg-white text-primary hover:bg-white/90"
                    size="lg"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link href="#features">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white/20"
                    size="lg"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[400px] w-full rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Phone className="h-24 w-24 text-white/50" />
                </div>
                <div className="absolute -bottom-6 -right-6 h-48 w-64 rounded-lg bg-card p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      <span className="font-medium">AI Voice Assistant</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <div className="mt-3 space-y-3">
                    <p className="text-sm">
                      Handling customer calls automatically...
                    </p>
                    <div className="h-2 rounded-full bg-muted">
                      <div className="h-2 w-2/3 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      24 calls handled today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Key Features</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Everything you need to manage customer relationships efficiently
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 p-2">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">AI Voice Calls</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Let AI handle customer calls, answer questions, and schedule
                  appointments automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 p-2">
                  <CalendarIcon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">Appointment Scheduling</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Easily manage appointments with calendar integration and
                  automated reminders.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 p-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">Customer Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Keep track of all customer interactions, preferences, and
                  history in one place.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 p-2">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">Analytics & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Gain insights from customer data with detailed analytics and
                  customizable reports.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 p-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">Messaging</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Communicate with customers through multiple channels from a
                  single interface.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 p-2">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="mt-4">
                  Google Sheets Integration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Easily import customer data from Google Sheets and keep
                  everything in sync.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Up to 100 customers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Basic appointment scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>10 AI voice call hours</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Email support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/client-signup" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-primary">
              <CardHeader className="bg-primary/5">
                <Badge>Most Popular</Badge>
                <CardTitle className="mt-2">Professional</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$79</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Unlimited customers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Advanced appointment scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>50 AI voice call hours</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Google Sheets integration</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/client-signup" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Unlimited everything</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Custom AI voice training</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>200 AI voice call hours</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/contact" className="w-full">
                  <Button className="w-full">Contact Sales</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-xl text-muted-foreground">
              Don't take our word for it. Hear from businesses that use our CRM
              every day.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20">
                    <div className="flex h-full w-full items-center justify-center font-bold text-primary">
                      JS
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">John Smith</p>
                    <p className="text-sm text-muted-foreground">
                      CEO, TechStart Inc
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  "The AI voice capabilities have transformed how we handle
                  customer service. Our team can now focus on high-value tasks
                  while the CRM handles routine calls. It's been a game
                  changer!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20">
                    <div className="flex h-full w-full items-center justify-center font-bold text-primary">
                      SD
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Davis</p>
                    <p className="text-sm text-muted-foreground">
                      Marketing Director, GrowFast
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  "Being able to import our leads from Google Sheets directly
                  into the CRM has streamlined our entire sales process. The
                  integration works flawlessly and saves us hours every week."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20">
                    <div className="flex h-full w-full items-center justify-center font-bold text-primary">
                      MB
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">Michael Brown</p>
                    <p className="text-sm text-muted-foreground">
                      Owner, Brown's Consulting
                    </p>
                  </div>
                </div>
                <p className="mt-4">
                  "As a small business owner, I was skeptical about implementing
                  a CRM. But the ease of use and the AI voice features convinced
                  me. Now I can't imagine running my business without it."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold md:text-4xl">
                Ready to transform your customer relationships?
              </h2>
              <p className="text-white/80 text-xl">
                Get started today and see the difference our AI-powered CRM can
                make for your business.
              </p>
            </div>
            <div className="flex items-center justify-end">
              <Link href="/client-signup">
                <Button
                  className="bg-white text-primary hover:bg-white/90"
                  size="lg"
                >
                  Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="text-lg font-bold">CRM AI Voice</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                A powerful CRM with AI voice capabilities to handle customer
                calls, schedule appointments, and boost your productivity.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">Product</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#testimonials"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Resources</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Company</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t pt-6">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} CRM AI Voice. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
