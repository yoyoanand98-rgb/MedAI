import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, AlertTriangle, Bell, TrendingUp } from "lucide-react"

interface StatsCardsProps {
  totalPatients: number
  highRiskPatients: number
  activeAlerts: number
  avgRiskScore: number
}

export function StatsCards({ totalPatients, highRiskPatients, activeAlerts, avgRiskScore }: StatsCardsProps) {
  const stats = [
    {
      title: "Total Patients",
      value: totalPatients,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "High Risk Patients",
      value: highRiskPatients,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Active Alerts",
      value: activeAlerts,
      icon: Bell,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Avg Risk Score",
      value: `${avgRiskScore}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
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
