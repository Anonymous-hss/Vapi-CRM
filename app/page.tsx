import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"

export default function Home() {
  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}

