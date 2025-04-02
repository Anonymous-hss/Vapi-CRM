import type React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth";
import { ClientAuthProvider } from "@/lib/client-auth";
import { ClientAuthGuard } from "@/components/client-auth-guard";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CRM System with Vapi AI Voice Integration",
  description: "A comprehensive CRM system with AI voice capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <ClientAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ClientAuthGuard>{children}</ClientAuthGuard>
              <Toaster />
            </ThemeProvider>
          </ClientAuthProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
