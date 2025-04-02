import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, Phone, PhoneOff, VoicemailIcon } from "lucide-react"

export function RecentCalls() {
  const calls = [
    {
      id: 1,
      customer: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      time: "2 hours ago",
      duration: "4:32",
      type: "Inbound",
      status: "Completed",
      aiHandled: true,
    },
    {
      id: 2,
      customer: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      time: "Yesterday",
      duration: "2:15",
      type: "Outbound",
      status: "Completed",
      aiHandled: false,
    },
    {
      id: 3,
      customer: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MB",
      },
      time: "Yesterday",
      duration: "0:45",
      type: "Inbound",
      status: "Missed",
      aiHandled: false,
    },
    {
      id: 4,
      customer: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ED",
      },
      time: "3 days ago",
      duration: "5:20",
      type: "Inbound",
      status: "Voicemail",
      aiHandled: true,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Calls</CardTitle>
        <CardDescription>You have handled {calls.length} calls recently.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {calls.map((call) => (
            <div key={call.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={call.customer.avatar} alt={call.customer.name} />
                  <AvatarFallback>{call.customer.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{call.customer.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{call.time}</span>
                    <span className="text-xs text-muted-foreground">({call.duration})</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    call.status === "Completed" ? "default" : call.status === "Missed" ? "destructive" : "outline"
                  }
                >
                  {call.status === "Completed" && <Phone className="mr-1 h-3 w-3" />}
                  {call.status === "Missed" && <PhoneOff className="mr-1 h-3 w-3" />}
                  {call.status === "Voicemail" && <VoicemailIcon className="mr-1 h-3 w-3" />}
                  {call.status}
                </Badge>
                <Badge variant={call.type === "Inbound" ? "secondary" : "outline"}>{call.type}</Badge>
                {call.aiHandled && (
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    AI Handled
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

