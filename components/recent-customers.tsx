import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentCustomers() {
  const customers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      status: "Active",
      lastContact: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      status: "New",
      lastContact: "1 day ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      status: "Inactive",
      lastContact: "1 week ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      status: "Active",
      lastContact: "3 days ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      status: "Active",
      lastContact: "5 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DW",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
        <CardDescription>You have {customers.length} customers in your database.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {customers.map((customer) => (
            <div key={customer.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback>{customer.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">{customer.name}</p>
                  <p className="text-sm text-muted-foreground">{customer.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    customer.status === "Active" ? "default" : customer.status === "New" ? "secondary" : "outline"
                  }
                >
                  {customer.status}
                </Badge>
                <span className="text-xs text-muted-foreground">{customer.lastContact}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

