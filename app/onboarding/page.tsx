"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { GoogleSheetSetup } from "@/components/onboarding/google-sheet-setup"
import { useAuth } from "@/lib/auth"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"

export default function OnboardingPage() {
  const [activeTab, setActiveTab] = useState("welcome")
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const router = useRouter()
  const { user } = useAuth()

  const steps = [
    { id: "welcome", label: "Welcome" },
    { id: "company", label: "Company" },
    { id: "google-sheet", label: "Google Sheet" },
    { id: "complete", label: "Complete" },
  ]

  const handleNext = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeTab)

    if (currentIndex < steps.length - 1) {
      // Mark current step as completed
      if (!completedSteps.includes(activeTab)) {
        setCompletedSteps([...completedSteps, activeTab])
      }

      // Move to next step
      setActiveTab(steps[currentIndex + 1].id)
    } else {
      // Onboarding complete, redirect to dashboard
      router.push("/")
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex((step) => step.id === activeTab)

    if (currentIndex > 0) {
      setActiveTab(steps[currentIndex - 1].id)
    }
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome to CRM System</h1>
        <p className="text-muted-foreground">Let's get your account set up in just a few steps.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  completedSteps.includes(step.id)
                    ? "bg-primary border-primary text-primary-foreground"
                    : activeTab === step.id
                      ? "border-primary text-primary"
                      : "border-muted-foreground text-muted-foreground"
                }`}
              >
                {completedSteps.includes(step.id) ? <CheckCircle className="h-5 w-5" /> : <span>{index + 1}</span>}
              </div>
              <span
                className={`mt-2 text-sm ${
                  activeTab === step.id || completedSteps.includes(step.id) ? "font-medium" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{
              width: `${(completedSteps.length / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsContent value="welcome" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user?.name || "User"}!</CardTitle>
              <CardDescription>We're excited to have you on board. Let's set up your CRM system.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>In the next few steps, we'll help you:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Set up your company profile</li>
                  <li>Connect your Google Sheet with leads from Meta Ads Manager</li>
                  <li>Configure your preferences</li>
                </ul>
                <p>This should only take a few minutes. Let's get started!</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" onClick={() => router.push("/")}>
                Skip for now
              </Button>
              <Button onClick={handleNext}>
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="company" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Tell us about your company</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="company-name" className="text-sm font-medium">
                    Company Name
                  </label>
                  <input
                    id="company-name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter your company name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="industry" className="text-sm font-medium">
                    Industry
                  </label>
                  <select
                    id="industry"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select an industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="company-size" className="text-sm font-medium">
                    Company Size
                  </label>
                  <select
                    id="company-size"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501+">501+ employees</option>
                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={handleNext}>
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="google-sheet" className="space-y-4">
          <GoogleSheetSetup />
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNext}>
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="complete" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Setup Complete!</CardTitle>
              <CardDescription>You're all set to start using the CRM system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-6 space-y-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-center">Your CRM is Ready</h3>
                <p className="text-center text-muted-foreground max-w-md">
                  Congratulations! You've successfully set up your CRM system. You can now start managing your
                  customers, appointments, and voice calls.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button onClick={() => router.push("/")}>
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

