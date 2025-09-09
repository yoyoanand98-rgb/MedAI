"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

interface VitalSigns {
  id: string
  systolic_bp: number
  diastolic_bp: number
  heart_rate: number
  temperature: number
  oxygen_saturation: number
  recorded_at: string
}

interface PatientVitalsChartProps {
  vitals: VitalSigns[]
}

export function PatientVitalsChart({ vitals }: PatientVitalsChartProps) {
  // Prepare data for chart (last 10 readings)
  const chartData = vitals
    .slice(0, 10)
    .reverse()
    .map((vital) => ({
      date: new Date(vital.recorded_at).toLocaleDateString(),
      systolic: vital.systolic_bp,
      diastolic: vital.diastolic_bp,
      heartRate: vital.heart_rate,
      temperature: vital.temperature,
      oxygenSat: vital.oxygen_saturation,
    }))

  const latestVitals = vitals[0]

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Vital Signs Trends</CardTitle>
      </CardHeader>
      <CardContent>
        {latestVitals && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-gray-600">Blood Pressure</div>
              <div className="text-lg font-semibold">
                {latestVitals.systolic_bp}/{latestVitals.diastolic_bp}
              </div>
              <div className="text-xs text-gray-500">mmHg</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Heart Rate</div>
              <div className="text-lg font-semibold">{latestVitals.heart_rate}</div>
              <div className="text-xs text-gray-500">bpm</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Temperature</div>
              <div className="text-lg font-semibold">{latestVitals.temperature}°</div>
              <div className="text-xs text-gray-500">F</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Oxygen Sat</div>
              <div className="text-lg font-semibold">{latestVitals.oxygen_saturation}%</div>
              <div className="text-xs text-gray-500">SpO2</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Last Reading</div>
              <div className="text-sm font-semibold">{new Date(latestVitals.recorded_at).toLocaleDateString()}</div>
              <div className="text-xs text-gray-500">{new Date(latestVitals.recorded_at).toLocaleTimeString()}</div>
            </div>
          </div>
        )}

        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="systolic" stroke="#EF4444" name="Systolic BP" strokeWidth={2} />
              <Line type="monotone" dataKey="diastolic" stroke="#F97316" name="Diastolic BP" strokeWidth={2} />
              <Line type="monotone" dataKey="heartRate" stroke="#3B82F6" name="Heart Rate" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-8 text-gray-500">No vital signs data available</div>
        )}
      </CardContent>
    </Card>
  )
}
