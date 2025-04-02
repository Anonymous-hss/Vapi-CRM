"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useClientAuth } from "@/lib/client-auth";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle } from "lucide-react";

export default function ClientSignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    industry: "",
    employees: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register } = useClientAuth();
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const validateStep2 = () => {
    if (!formData.companyName || !formData.industry) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await register(formData);
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Failed to create account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            Create your account
          </CardTitle>
          <CardDescription>
            {step === 1
              ? "Enter your personal information"
              : step === 2
              ? "Tell us about your company"
              : "Review and complete your registration"}
          </CardDescription>
          <div className="flex justify-between pt-4">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 1 ? <CheckCircle className="h-4 w-4" /> : "1"}
              </div>
              <span className="mt-1 text-xs">Account</span>
            </div>
            <div className="flex flex-1 items-center px-2">
              <div
                className={`h-1 w-full ${
                  step >= 2 ? "bg-primary" : "bg-muted"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 2
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > 2 ? <CheckCircle className="h-4 w-4" /> : "2"}
              </div>
              <span className="mt-1 text-xs">Company</span>
            </div>
            <div className="flex flex-1 items-center px-2">
              <div
                className={`h-1 w-full ${
                  step >= 3 ? "bg-primary" : "bg-muted"
                }`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full ${
                  step >= 3
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className="mt-1 text-xs">Finish</span>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {step === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    type="text"
                    placeholder="Acme Inc."
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <select
                    id="industry"
                    name="industry"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employees">Number of Employees</Label>
                  <select
                    id="employees"
                    name="employees"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={formData.employees}
                    onChange={handleChange}
                  >
                    <option value="">Select company size</option>
                    <option value="1-10">1-10</option>
                    <option value="11-50">11-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501+">501+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="rounded-lg border bg-card p-4">
                  <h3 className="font-medium">Account Information</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p>{formData.fullName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p>{formData.email}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card p-4">
                  <h3 className="font-medium">Company Information</h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Company</p>
                      <p>{formData.companyName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Industry</p>
                      <p>{formData.industry}</p>
                    </div>
                    {formData.employees && (
                      <div>
                        <p className="text-muted-foreground">Size</p>
                        <p>{formData.employees} employees</p>
                      </div>
                    )}
                    {formData.phone && (
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p>{formData.phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded border-gray-300"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link
                      href="#"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="#"
                      className="text-primary underline-offset-4 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            {step === 1 && (
              <Button type="button" className="w-full" onClick={nextStep}>
                Continue
              </Button>
            )}

            {step === 2 && (
              <div className="flex w-full gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-1/2"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button type="button" className="w-1/2" onClick={nextStep}>
                  Continue
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="flex w-full gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-1/2"
                  onClick={prevStep}
                >
                  Back
                </Button>
                <Button type="submit" className="w-1/2" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Complete Registration"}
                </Button>
              </div>
            )}

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
