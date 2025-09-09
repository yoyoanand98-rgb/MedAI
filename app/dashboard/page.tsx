"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { getUser, getUserProfile } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { PatientCohortTable } from "@/components/dashboard/patient-cohort-table"
import { RiskDistributionChart } from "@/components/dashboard/risk-distribution-chart"
import { RecentAlertsCard } from "@/components/dashboard/recent-alerts-card"
import { Loader2 } from "lucide-react"

interface Patient {
  id: string
  first_name: string
  last_name: string
  date_of_birth: string
  medical_record_number: string
  risk_assessments?: Array<{
    risk_score: number
    risk_level: string
    assessment_date: string
  }>
  vital_signs?: Array<{
    systolic_bp: number
    diastolic_bp: number
    heart_rate: number
    recorded_at: string
  }>
}

interface Alert {
  id: string
  patient_id: string
  alert_type: string
  message: string
  severity: string
  created_at: string
  is_acknowledged: boolean
}

interface Assessment {
  risk_level: string
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [assessments, setAssessments] = useState<Assessment[]>([])

  const supabase = createClient()

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard data
      const [patientsResult, alertsResult, assessmentsResult] = await Promise.all([
        supabase
          .from("patients")
          .select(`
            *,
            risk_assessments(risk_score, risk_level, assessment_date),
            vital_signs(systolic_bp, diastolic_bp, heart_rate, recorded_at)
          `)
          .order("created_at", { ascending: false }),

        supabase
          .from("alerts")
          .select("*")
          .eq("is_acknowledged", false)
          .order("created_at", { ascending: false })
          .limit(5),

        supabase.from("risk_assessments").select("risk_level").order("assessment_date", { ascending: false }),
      ])

      setPatients(patientsResult.data || [])
      setAlerts(alertsResult.data || [])
      setAssessments(assessmentsResult.data || [])
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    }
  }

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        const userData = await getUser()
        const profileData = await getUserProfile()
        setUser(userData)
        setProfile(profileData)

        await fetchDashboardData()
      } catch (error) {
        console.error("Error initializing dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeDashboard()
  }, [])

  const handlePatientAdded = async () => {
    await fetchDashboardData()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading dashboard...</span>
        </div>
      </div>
    )
  }

  // Calculate stats
  const totalPatients = patients.length
  const highRiskPatients = patients.filter(
    (p) => p.risk_assessments?.[0]?.risk_level === "high" || p.risk_assessments?.[0]?.risk_level === "critical",
  ).length
  const activeAlerts = alerts.length
  const avgRiskScore =
    patients.reduce((acc, p) => {
      const score = p.risk_assessments?.[0]?.risk_score || 0
      return acc + score
    }, 0) / (totalPatients || 1)

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor patient risk levels and system alerts</p>
        </div>

        <StatsCards
          totalPatients={totalPatients}
          highRiskPatients={highRiskPatients}
          activeAlerts={activeAlerts}
          avgRiskScore={Math.round(avgRiskScore)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <RiskDistributionChart assessments={assessments} />
          </div>
          <div>
            <RecentAlertsCard alerts={alerts} />
          </div>
        </div>

        <PatientCohortTable patients={patients} onPatientAdded={handlePatientAdded} />
      </main>
    </div>
  )
}
