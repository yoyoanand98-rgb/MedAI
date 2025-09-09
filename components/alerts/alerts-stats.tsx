import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Bell, XCircle } from "lucide-react"

interface AlertsStatsProps {
  stats: {
    total: number
    active: number
    critical: number
    high: number
  }
}

export function AlertsStats({ stats }: AlertsStatsProps) {
  const statCards = [
    {
      title: "Total Alerts",
      value: stats.total,
      icon: Bell,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Alerts",
      value: stats.active,
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Critical Alerts",
      value: stats.critical,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "High Priority",
      value: stats.high,
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <Card key={index} className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <div className={`p-2 rounded-full ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
