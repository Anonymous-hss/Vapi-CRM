import { DashboardLayout } from "@/components/dashboard-layout"
import { VapiIntegration } from "@/components/vapi-integration"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

export default function VoiceCallsPage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Voice Calls</h1>
          <p className="text-muted-foreground">Manage AI voice interactions with your customers</p>
        </div>
        <Button>
          <Phone className="mr-2 h-4 w-4" />
          Make Call
        </Button>
      </div>
      <VapiIntegration />
    </DashboardLayout>
  )
}

