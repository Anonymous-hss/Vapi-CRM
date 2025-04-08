import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, BarChart, Users, Calendar, Phone, Shield } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Streamline Your Customer Relationships
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Our CRM system with AI voice integration helps you manage customers, appointments, and leads from Meta
                  Ads Manager with ease.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 border border-border rounded-lg">
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm p-8 flex items-center justify-center">
                    <div className="w-full max-w-md bg-card rounded-lg shadow-lg p-6 border border-border">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">CRM Dashboard</h3>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Live Demo</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-background p-4 rounded-md border border-border">
                            <div className="text-2xl font-bold">1,248</div>
                            <div className="text-xs text-muted-foreground">Total Customers</div>
                          </div>
                          <div className="bg-background p-4 rounded-md border border-border">
                            <div className="text-2xl font-bold">24</div>
                            <div className="text-xs text-muted-foreground">Appointments</div>
                          </div>
                          <div className="bg-background p-4 rounded-md border border-border">
                            <div className="text-2xl font-bold">42</div>
                            <div className="text-xs text-muted-foreground">Voice Calls</div>
                          </div>
                          <div className="bg-background p-4 rounded-md border border-border">
                            <div className="text-2xl font-bold">24.5%</div>
                            <div className="text-xs text-muted-foreground">Conversion Rate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need in One Place</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our CRM system combines powerful features with an intuitive interface to help you manage your customer
                relationships effectively.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Customer Management</h3>
              <p className="text-center text-muted-foreground">
                Store and manage all your customer information in one place with easy search and filtering.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Appointment Scheduling</h3>
              <p className="text-center text-muted-foreground">
                Schedule and manage appointments with a visual calendar interface and automated reminders.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">AI Voice Integration</h3>
              <p className="text-center text-muted-foreground">
                Handle customer calls with AI voice assistants that can schedule appointments and answer questions.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Analytics & Reporting</h3>
              <p className="text-center text-muted-foreground">
                Gain insights into your business with detailed analytics and customizable reports.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Google Sheets Integration</h3>
              <p className="text-center text-muted-foreground">
                Automatically import leads from Google Sheets connected to your Meta Ads Manager.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Secure & Reliable</h3>
              <p className="text-center text-muted-foreground">
                Your data is protected with enterprise-grade security and regular backups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                How It Works
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Setup, Powerful Results</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get started in minutes and transform your customer relationship management.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="text-xl font-bold">Create Your Account</h3>
              <p className="text-center text-muted-foreground">
                Sign up for an account and set up your organization profile.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="text-xl font-bold">Connect Your Google Sheet</h3>
              <p className="text-center text-muted-foreground">
                Link your Meta Ads Manager Google Sheet to automatically import leads.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="text-xl font-bold">Start Managing Customers</h3>
              <p className="text-center text-muted-foreground">
                Use the dashboard to manage customers, schedule appointments, and make calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                Pricing
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple, Transparent Pricing</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Choose the plan that works best for your business.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <div className="flex flex-col rounded-lg border shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-bold">Starter</h3>
                <div className="mt-4 text-4xl font-bold">
                  $29<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-muted-foreground">Perfect for small businesses just getting started.</p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 500 customers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic Google Sheets integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>5 user accounts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Email support</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col p-6 pt-0">
                <Link href="/register?plan=starter">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border shadow-sm bg-primary/5 border-primary/20 relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs rounded-bl-lg rounded-tr-lg font-medium">
                Popular
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold">Professional</h3>
                <div className="mt-4 text-4xl font-bold">
                  $79<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-muted-foreground">Ideal for growing businesses with more customers.</p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Up to 2,500 customers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Advanced Google Sheets integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>15 user accounts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Priority email & chat support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Basic AI voice integration</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col p-6 pt-0">
                <Link href="/register?plan=professional">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border shadow-sm">
              <div className="p-6">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <div className="mt-4 text-4xl font-bold">
                  $199<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-muted-foreground">For large businesses with advanced needs.</p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited customers</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Premium Google Sheets integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited user accounts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>24/7 phone & priority support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Full AI voice integration</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>Custom integrations</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col p-6 pt-0">
                <Link href="/register?plan=enterprise">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Business?
              </h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
                Join thousands of businesses that use our CRM system to grow their customer relationships.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="gap-1">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">FAQ</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about our CRM system.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold">How does the Google Sheets integration work?</h3>
              <p className="text-muted-foreground">
                Our system connects to your Google Sheets that contain leads from Meta Ads Manager. It automatically
                syncs new leads every 5 minutes, so your CRM is always up-to-date with the latest information.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Can I import my existing customer data?</h3>
              <p className="text-muted-foreground">
                Yes, you can import existing customer data via CSV upload or through our Google Sheets integration. Our
                team can also assist with custom data migration for larger datasets.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">How does the AI voice integration work?</h3>
              <p className="text-muted-foreground">
                Our AI voice system can handle incoming calls, answer common questions, schedule appointments, and
                collect customer information. It integrates with your calendar and CRM data to provide a seamless
                experience.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Is my data secure?</h3>
              <p className="text-muted-foreground">
                Yes, we take security seriously. All data is encrypted both in transit and at rest. We use
                industry-standard security practices and regular security audits to ensure your data is protected.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Can I cancel my subscription anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. We offer a 30-day money-back guarantee for all new
                subscriptions.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Do you offer custom integrations?</h3>
              <p className="text-muted-foreground">
                Yes, our Enterprise plan includes custom integrations with other business tools and systems. Contact our
                sales team to discuss your specific integration needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

