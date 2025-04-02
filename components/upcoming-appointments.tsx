import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Video } from "lucide-react"

export function UpcomingAppointments() {
  const appointments = [
    {
      id: 1,
      customer: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      date: "Today",
      time: "2:00 PM",
      duration: "30 min",
      type: "Video Call",
      status: "Confirmed",
    },
    {
      id: 2,
      customer: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SJ",
      },
      date: "Today",
      time: "4:30 PM",
      duration: "45 min",
      type: "Phone Call",
      status: "Confirmed",
    },
    {
      id: 3,
      customer: {
        name: "Michael Brown",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MB",
      },
      date: "Tomorrow",
      time: "10:00 AM",
      duration: "60 min",
      type: "In Person",
      status: "Pending",
    },
    {
      id: 4,
      customer: {
        name: "Emily Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ED",
      },
      date: "Tomorrow",
      time: "1:15 PM",
      duration: "30 min",
      type: "Video Call",
      status: "Confirmed",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
        <CardDescription>You have {appointments.length} upcoming appointments.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={appointment.customer.avatar} alt={appointment.customer.name} />
                  <AvatarFallback>{appointment.customer.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{appointment.customer.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{appointment.date}</span>
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {appointment.time} ({appointment.duration})
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={appointment.status === "Confirmed" ? "default" : "outline"}>{appointment.status}</Badge>
                <Button size="sm" variant="outline">
                  {appointment.type === "Video Call" && <Video className="mr-2 h-4 w-4" />}
                  {appointment.type}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

