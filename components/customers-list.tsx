"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronLeft, ChevronRight, Download, Filter, MoreHorizontal, Search, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CustomersList() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const customers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "+1 (555) 123-4567",
      status: "Active",
      lastContact: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      tags: ["VIP", "Retail"],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 234-5678",
      status: "New",
      lastContact: "1 day ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SJ",
      tags: ["Healthcare"],
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 (555) 345-6789",
      status: "Inactive",
      lastContact: "1 week ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
      tags: ["Enterprise"],
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "+1 (555) 456-7890",
      status: "Active",
      lastContact: "3 days ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ED",
      tags: ["Retail"],
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "+1 (555) 567-8901",
      status: "Active",
      lastContact: "5 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DW",
      tags: ["VIP", "Enterprise"],
    },
    {
      id: 6,
      name: "Jennifer Taylor",
      email: "jennifer.taylor@example.com",
      phone: "+1 (555) 678-9012",
      status: "Active",
      lastContact: "Yesterday",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JT",
      tags: ["Healthcare"],
    },
    {
      id: 7,
      name: "Robert Anderson",
      email: "robert.anderson@example.com",
      phone: "+1 (555) 789-0123",
      status: "Inactive",
      lastContact: "2 weeks ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RA",
      tags: ["Retail"],
    },
    {
      id: 8,
      name: "Lisa Martinez",
      email: "lisa.martinez@example.com",
      phone: "+1 (555) 890-1234",
      status: "New",
      lastContact: "2 days ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "LM",
      tags: ["Enterprise"],
    },
    {
      id: 9,
      name: "Thomas Jackson",
      email: "thomas.jackson@example.com",
      phone: "+1 (555) 901-2345",
      status: "Active",
      lastContact: "4 days ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TJ",
      tags: ["VIP"],
    },
    {
      id: 10,
      name: "Patricia White",
      email: "patricia.white@example.com",
      phone: "+1 (555) 012-3456",
      status: "Active",
      lastContact: "1 day ago",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "PW",
      tags: ["Healthcare", "Enterprise"],
    },
  ]

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search),
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Management</CardTitle>
        <CardDescription>View and manage all your customers in one place.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search customers..."
                className="w-full pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Last Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={customer.avatar} alt={customer.name} />
                          <AvatarFallback>{customer.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{customer.email}</span>
                        <span className="text-sm text-muted-foreground">{customer.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.status === "Active" ? "default" : customer.status === "New" ? "secondary" : "outline"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {customer.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{customer.lastContact}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit customer</DropdownMenuItem>
                          <DropdownMenuItem>Schedule call</DropdownMenuItem>
                          <DropdownMenuItem>Add note</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Delete customer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong>10</strong> of <strong>{customers.length}</strong> customers
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page + 1)}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next page</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

