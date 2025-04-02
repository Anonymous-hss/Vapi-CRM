import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarDays, FileSpreadsheet, Phone, RefreshCw } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "call",
      title: "AI Voice Call",
      description: "Incoming call handled by AI assistant",
      time: "2 hours ago",
      icon: Phone,
    },
    {
      id: 2,
      type: "sheet",
      title: "Google Sheet Synced",
      description: "Marketing Contacts sheet synchronized with 8 new records",
      time: "Yesterday",
      icon: FileSpreadsheet,
    },
    {
      id: 3,
      type: "appointment",
      title: "Appointment Scheduled",
      description: "New appointment with John Smith for next Monday at 2:00 PM",
      time: "2 days ago",
      icon: CalendarDays,
    },
    {
      id: 4,
      type: "sheet",
      title: "Google Sheet Connected",
      description: "Customer Leads sheet successfully connected",
      time: "3 days ago",
      icon: FileSpreadsheet,
    },
    {
      id: 5,
      type: "call",
      title: "Multiple AI Voice Calls",
      description: "5 customer inquiries handled by AI assistant",
      time: "1 week ago",
      icon: Phone,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Track your recent interactions and events
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-4 mt-0.5">
                <Avatar className="h-9 w-9 border bg-muted">
                  <AvatarFallback>
                    <activity.icon className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
