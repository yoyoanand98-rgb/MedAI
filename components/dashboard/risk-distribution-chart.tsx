"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RiskDistributionChartProps {
  assessments: Array<{ risk_level: string }>
}

export function RiskDistributionChart({ assessments }: RiskDistributionChartProps) {
  // Count risk levels
  const riskCounts = assessments.reduce(
    (acc, assessment) => {
      acc[assessment.risk_level] = (acc[assessment.risk_level] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const data = [
    { name: "Low", count: riskCounts.low || 0, color: "#10B981" },
    { name: "Medium", count: riskCounts.medium || 0, color: "#F59E0B" },
    { name: "High", count: riskCounts.high || 0, color: "#F97316" },
    { name: "Critical", count: riskCounts.critical || 0, color: "#EF4444" },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Risk Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
