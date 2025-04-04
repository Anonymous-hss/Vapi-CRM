"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Phone, PhoneOff, VoicemailIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function RecentCalls() {
  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/voice-calls?limit=5`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCalls(data.voiceCalls || []);
        }
      } catch (error) {
        console.error("Failed to fetch recent calls:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalls();
  }, []);

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Function to format duration
  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Calls</CardTitle>
          <CardDescription>Loading call data...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
                  <div>
                    <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                    <div className="h-3 w-48 bg-muted animate-pulse rounded mt-2"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                  <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                  <div className="h-6 w-24 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Calls</CardTitle>
        <CardDescription>
          You have handled {calls.length} calls recently.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {calls.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              No recent calls found.
            </p>
          ) : (
            calls.map((call) => (
              <div key={call.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder.svg?height=40&width=40`}
                      alt={call.customer?.name}
                    />
                    <AvatarFallback>
                      {getInitials(call.customer?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {call.customer?.name || "Unknown Customer"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(call.startTime), {
                          addSuffix: true,
                        })}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({formatDuration(call.duration)})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      call.status === "Completed"
                        ? "default"
                        : call.status === "Missed"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {call.status === "Completed" && (
                      <Phone className="mr-1 h-3 w-3" />
                    )}
                    {call.status === "Missed" && (
                      <PhoneOff className="mr-1 h-3 w-3" />
                    )}
                    {call.status === "Voicemail" && (
                      <VoicemailIcon className="mr-1 h-3 w-3" />
                    )}
                    {call.status}
                  </Badge>
                  <Badge
                    variant={
                      call.direction === "Inbound" ? "secondary" : "outline"
                    }
                  >
                    {call.direction}
                  </Badge>
                  {call.aiHandled && (
                    <Badge
                      variant="outline"
                      className="bg-purple-50 text-purple-700 border-purple-200"
                    >
                      AI Handled
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
