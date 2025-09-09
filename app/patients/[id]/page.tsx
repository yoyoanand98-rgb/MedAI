import { createClient } from "@/lib/supabase/server"
import { getUser } from "@/lib/auth"
import { notFound } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PatientHeader } from "@/components/patients/patient-header"
import { PatientVitalsChart } from "@/components/patients/patient-vitals-chart"
import { RiskAssessmentHistory } from "@/components/patients/risk-assessment-history"
import { PatientAlerts } from "@/components/patients/patient-alerts"
import { NewRiskAssessmentForm } from "@/components/patients/new-risk-assessment-form"
import { getUserProfile } from "@/lib/auth"

export default async function PatientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getUser()
  const profile = await getUserProfile()
  const supabase = await createClient()

  // Fetch patient data
  const { data: patient, error } = await supabase
    .from("patients")
    .select(`
      *,
      risk_assessments(
        id,
        risk_score,
        risk_level,
        assessment_date,
        notes,
        clinician_id,
        users(first_name, last_name)
      ),
      vital_signs(*),
      alerts(*)
    `)
    .eq("id", id)
    .single()

  if (error || !patient) {
    notFound()
  }

  // Sort data by date
  const sortedAssessments =
    patient.risk_assessments?.sort(
      (a: any, b: any) => new Date(b.assessment_date).getTime() - new Date(a.assessment_date).getTime(),
    ) || []

  const sortedVitals =
    patient.vital_signs?.sort(
      (a: any, b: any) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime(),
    ) || []

  const activeAlerts = patient.alerts?.filter((alert: any) => !alert.is_acknowledged) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PatientHeader patient={patient} />

        {activeAlerts.length > 0 && (
          <div className="mb-8">
            <PatientAlerts alerts={activeAlerts} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <PatientVitalsChart vitals={sortedVitals} />
          </div>
          <div>
            <NewRiskAssessmentForm patientId={id} clinicianId={user.id} />
          </div>
        </div>

        <RiskAssessmentHistory assessments={sortedAssessments} />
      </main>
    </div>
  )
}
