"use client";

import type React from "react";

import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface ClientUser {
  id: string;
  name: string;
  email: string;
  companyName: string;
}

interface ClientAuthContextType {
  user: ClientUser | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(
  undefined
);

export function ClientAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<ClientUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Check if client user is logged in
    const storedToken = localStorage.getItem("clientToken");
    const storedUser = localStorage.getItem("clientUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login
      const mockUser = {
        id: "client-123",
        name: "Demo Client",
        email: email,
        companyName: "Demo Company",
      };

      const mockToken =
        "mock-client-token-" + Math.random().toString(36).substring(2);

      localStorage.setItem("clientToken", mockToken);
      localStorage.setItem("clientUser", JSON.stringify(mockUser));

      setToken(mockToken);
      setUser(mockUser);

      toast({
        title: "Login successful",
        description: "Welcome back to your CRM dashboard",
      });

      router.push("/client-dashboard");
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful registration
      const mockUser = {
        id: "client-" + Math.random().toString(36).substring(2),
        name: userData.fullName,
        email: userData.email,
        companyName: userData.companyName,
      };

      const mockToken =
        "mock-client-token-" + Math.random().toString(36).substring(2);

      localStorage.setItem("clientToken", mockToken);
      localStorage.setItem("clientUser", JSON.stringify(mockUser));

      setToken(mockToken);
      setUser(mockUser);

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully",
      });

      router.push("/client-dashboard");
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

  const logout = () => {
    localStorage.removeItem("clientToken");
    localStorage.removeItem("clientUser");

    setToken(null);
    setUser(null);

    router.push("/landing");
  };

  return (
    <ClientAuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </ClientAuthContext.Provider>
  );
}

export function useClientAuth() {
  const context = useContext(ClientAuthContext);

  if (context === undefined) {
    throw new Error("useClientAuth must be used within a ClientAuthProvider");
  }

  return context;
}
