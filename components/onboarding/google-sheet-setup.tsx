"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { FileText, AlertCircle, CheckCircle2 } from "lucide-react"
import { googleSheetApi } from "@/lib/api"
import { useAuth } from "@/lib/auth"

export function GoogleSheetSetup() {
  const [sheetId, setSheetId] = useState("")
  const [sheetName, setSheetName] = useState("Sheet1")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const { token } = useAuth()
  const { toast } = useToast()

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!token) {
      toast({
        title: "Error",
        description: "You must be logged in to connect a Google Sheet",
        variant: "destructive",
      })
      return
    }

    if (!sheetId) {
      toast({
        title: "Error",
        description: "Please enter a Google Sheet ID",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real implementation, you would call an API to save the Google Sheet connection
      // For now, we'll simulate this with a timeout
      setTimeout(() => {
        // Update environment variables
        localStorage.setItem("GOOGLE_SHEET_ID", sheetId)
        localStorage.setItem("GOOGLE_SHEET_NAME", sheetName)

        // Trigger initial sync
        if (token) {
          googleSheetApi
            .syncGoogleSheet(token)
            .then(() => {
              toast({
                title: "Success",
                description: "Initial sync completed successfully",
              })
            })
            .catch((error) => {
              console.error("Sync error:", error)
            })
        }

        setIsConnected(true)

        toast({
          title: "Success",
          description: "Google Sheet connected successfully",
        })

        setIsLoading(false)
      }, 2000)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to connect Google Sheet",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect Google Sheet</CardTitle>
        <CardDescription>Connect your Google Sheet containing leads from Meta Ads Manager</CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <Alert className="bg-green-50 border-green-200">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-600">Connected Successfully</AlertTitle>
            <AlertDescription className="text-green-700">
              Your Google Sheet is now connected. Leads will be automatically synced every 5 minutes.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleConnect}>
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>How to find your Google Sheet ID</AlertTitle>
                <AlertDescription>
                  The Google Sheet ID is the long string of characters in the URL of your sheet. For example, in the URL
                  "https://docs.google.com/spreadsheets/d/1ABC123XYZ/edit", the ID is "1ABC123XYZ".
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <Label htmlFor="sheet-id">Google Sheet ID</Label>
                <Input
                  id="sheet-id"
                  placeholder="Enter your Google Sheet ID"
                  value={sheetId}
                  onChange={(e) => setSheetId(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sheet-name">Sheet Name (optional)</Label>
                <Input
                  id="sheet-name"
                  placeholder="Sheet1"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Leave as "Sheet1" if you're not sure. This is the name of the tab in your Google Sheet.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Required Columns</Label>
                <div className="rounded-md border p-4">
                  <p className="text-sm mb-2">Your Google Sheet should have the following columns:</p>
                  <ul className="text-sm space-y-1 list-disc pl-5">
                    <li>Name (required)</li>
                    <li>Email (recommended)</li>
                    <li>Phone (recommended)</li>
                    <li>Source (optional)</li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        )}
      </CardContent>
      <CardFooter>
        {!isConnected && (
          <Button type="submit" onClick={handleConnect} disabled={isLoading || !sheetId} className="w-full">
            {isLoading ? "Connecting..." : "Connect Google Sheet"}
          </Button>
        )}

        {isConnected && (
          <Button variant="outline" className="w-full" onClick={() => setIsConnected(false)}>
            <FileText className="mr-2 h-4 w-4" />
            Change Google Sheet
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

