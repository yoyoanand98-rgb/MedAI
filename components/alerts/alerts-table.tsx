"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Check, Clock, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Alert {
  id: string
  alert_type: string
  severity: string
  message: string
  is_acknowledged: boolean
  acknowledged_at: string | null
  created_at: string
  patients: {
    first_name: string
    last_name: string
    medical_record_number: string
  }
}

interface AlertsTableProps {
  alerts: Alert[]
}

export function AlertsTable({ alerts }: AlertsTableProps) {
  const [acknowledgingAlerts, setAcknowledgingAlerts] = useState<Set<string>>(new Set())
  const router = useRouter()

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

  const getAlertTypeIcon = (alertType: string) => {
    switch (alertType) {
      case "high_risk":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "critical_vitals":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "missing_data":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
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

  const handleAcknowledge = async (alertId: string) => {
    setAcknowledgingAlerts((prev) => new Set(prev).add(alertId))

    const supabase = createClient()
    const { error } = await supabase
      .from("alerts")
      .update({
        is_acknowledged: true,
        acknowledged_at: new Date().toISOString(),
      })
      .eq("id", alertId)

    if (error) {
      console.error("Error acknowledging alert:", error)
    } else {
      router.refresh()
    }

    setAcknowledgingAlerts((prev) => {
      const newSet = new Set(prev)
      newSet.delete(alertId)
      return newSet
    })
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          System Alerts ({alerts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No alerts found</div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`border rounded-lg p-4 ${
                  alert.is_acknowledged ? "bg-gray-50 opacity-75" : "bg-white"
                } hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getAlertTypeIcon(alert.alert_type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                        <span className="text-xs text-gray-500 capitalize">{alert.alert_type.replace("_", " ")}</span>
                        {alert.is_acknowledged && (
                          <Badge className="bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            Acknowledged
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-900 mb-2">{alert.message}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <Link href={`/patients/${alert.patients}`} className="hover:text-blue-600 underline">
                            {alert.patients.first_name} {alert.patients.last_name} (
                            {alert.patients.medical_record_number})
                          </Link>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(alert.created_at)}
                        </div>
                        {alert.is_acknowledged && alert.acknowledged_at && (
                          <div>Acknowledged {formatTimeAgo(alert.acknowledged_at)}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {!alert.is_acknowledged && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcknowledge(alert.id)}
                        disabled={acknowledgingAlerts.has(alert.id)}
                      >
                        {acknowledgingAlerts.has(alert.id) ? "Acknowledging..." : "Acknowledge"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
