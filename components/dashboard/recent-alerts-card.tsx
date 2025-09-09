import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock } from "lucide-react"

interface Alert {
  id: string
  alert_type: string
  severity: string
  message: string
  created_at: string
}

interface RecentAlertsCardProps {
  alerts: Alert[]
}

export function RecentAlertsCard({ alerts }: RecentAlertsCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-100 text-blue-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "critical":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          Recent Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <p className="text-gray-500 text-sm">No active alerts</p>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                    <span className="text-xs text-gray-500 capitalize">{alert.alert_type.replace("_", " ")}</span>
                  </div>
                  <p className="text-sm text-gray-900 mb-1">{alert.message}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {formatTimeAgo(alert.created_at)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
