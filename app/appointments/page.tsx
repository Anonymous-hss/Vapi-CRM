import { AppointmentsCalendar } from "@/components/appointments-calendar"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function AppointmentsPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Schedule and manage your customer appointments</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Appointment
        </Button>
      </div>
      <AppointmentsCalendar />
    </DashboardLayout>
  )
}

