"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  FileSpreadsheet,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GoogleSheetConnectProps {
  isConnected: boolean;
  onConnect: () => void;
}

export function GoogleSheetConnect({
  isConnected,
  onConnect,
}: GoogleSheetConnectProps) {
  const [sheetUrl, setSheetUrl] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<
    "idle" | "syncing" | "success" | "error"
  >("idle");
  const { toast } = useToast();

  const handleConnect = () => {
    if (!sheetUrl) {
      toast({
        title: "Error",
        description: "Please enter a Google Sheet URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onConnect();
      toast({
        title: "Success",
        description: "Google Sheet connected successfully",
      });
    }, 1500);
  };

  const handleSync = () => {
    setSyncStatus("syncing");

    // Simulate API call
    setTimeout(() => {
      setSyncStatus("success");
      toast({
        title: "Success",
        description: "Google Sheet synced successfully",
      });

      // Reset status after a delay
      setTimeout(() => {
        setSyncStatus("idle");
      }, 3000);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Google Sheets Integration</CardTitle>
        <CardDescription>
          Connect your Google Sheet to import customer data
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">
                Connected to Google Sheets
              </AlertTitle>
              <AlertDescription className="text-green-700">
                Your CRM is syncing data from your Google Sheet.
              </AlertDescription>
            </Alert>

            <div className="rounded-md border p-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-green-600" />
                <div>
                  <h3 className="font-medium">Customer Data</h3>
                  <p className="text-sm text-muted-foreground">
                    customers-data.xlsx
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Last Synced</p>
                  <p className="text-muted-foreground">5 minutes ago</p>
                </div>
                <div>
                  <p className="font-medium">Records</p>
                  <p className="text-muted-foreground">124 customers</p>
                </div>
                <div>
                  <p className="font-medium">Sheet Name</p>
                  <p className="text-muted-foreground">
                    {sheetName || "Sheet1"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Status</p>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <p className="text-muted-foreground">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-8 w-8 text-muted-foreground" />
                <div>
                  <h3 className="font-medium">Connect Your Google Sheet</h3>
                  <p className="text-sm text-muted-foreground">
                    Import your customer data from Google Sheets to use with our
                    CRM
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sheet-url">Google Sheet URL</Label>
                <Input
                  id="sheet-url"
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  value={sheetUrl}
                  onChange={(e) => setSheetUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Paste the URL of your Google Sheet containing customer data
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sheet-name">Sheet Name (Optional)</Label>
                <Input
                  id="sheet-name"
                  placeholder="Sheet1"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Enter the name of the specific sheet tab (defaults to
                  "Sheet1")
                </p>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Your Google Sheet must have columns for name, email, and phone
                  number. Make sure the first row contains column headers.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {isConnected ? (
          <Button
            onClick={handleSync}
            disabled={syncStatus === "syncing"}
            className="w-full"
            variant={syncStatus === "success" ? "outline" : "default"}
          >
            {syncStatus === "syncing" ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : syncStatus === "success" ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                Synced Successfully
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Now
              </>
            )}
          </Button>
        ) : (
          <Button
            onClick={handleConnect}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Connecting..." : "Connect Google Sheet"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
