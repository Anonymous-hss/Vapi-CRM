"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RefreshCw, AlertCircle, CheckCircle2 } from "lucide-react"
import { googleSheetApi } from "@/lib/api"
import { useAuth } from "@/lib/auth"
import { useToast } from "@/components/ui/use-toast"
import { format, formatDistanceToNow } from "date-fns"

export function GoogleSheetSync() {
  const [syncStatus, setSyncStatus] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const { token } = useAuth()
  const { toast } = useToast()

  const fetchSyncStatus = async () => {
    if (!token) return

    setIsLoading(true)

    try {
      const status = await googleSheetApi.getSyncStatus(token)
      setSyncStatus(status)
    } catch (error) {
      console.error("Failed to fetch sync status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSync = async () => {
    if (!token) return

    setIsSyncing(true)

    try {
      await googleSheetApi.syncGoogleSheet(token)

      toast({
        title: "Success",
        description: "Google Sheet sync triggered successfully",
      })

      // Refresh sync status
      fetchSyncStatus()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to sync Google Sheet",
        variant: "destructive",
      })
    } finally {
      setIsSyncing(false)
    }
  }

  useEffect(() => {
    fetchSyncStatus()

    // Refresh status every 5 minutes
    const interval = setInterval(fetchSyncStatus, 5 * 60 * 1000)

    return () => clearInterval(interval)
  }, [token])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Sheet Sync</CardTitle>
        <CardDescription>Sync leads from Google Sheets to your CRM</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : syncStatus ? (
          <div className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Connected to Google Sheets</AlertTitle>
              <AlertDescription className="text-green-700">
                Your CRM is syncing data from Google Sheets.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Sheet ID:</span>
                <span className="text-sm">{syncStatus.sheetId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Sheet Name:</span>
                <span className="text-sm">{syncStatus.sheetName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Last Synced:</span>
                <span className="text-sm">
                  {format(new Date(syncStatus.lastSyncedAt), "PPpp")} (
                  {formatDistanceToNow(new Date(syncStatus.lastSyncedAt), { addSuffix: true })})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Rows Synced:</span>
                <span className="text-sm">{syncStatus.lastRowCount}</span>
              </div>
            </div>
          </div>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Not Connected</AlertTitle>
            <AlertDescription>Google Sheet sync is not configured or has not run yet.</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSync} disabled={isSyncing} className="w-full">
          {isSyncing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}

