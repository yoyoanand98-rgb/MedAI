import { createClient } from "@/lib/supabase/server"
import { getUser, getUserProfile } from "@/lib/auth"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AlertsTable } from "@/components/alerts/alerts-table"
import { AlertsStats } from "@/components/alerts/alerts-stats"
import { AlertFilters } from "@/components/alerts/alert-filters"

export default async function AlertsPage({
  searchParams,
}: {
  searchParams: Promise<{ severity?: string; type?: string; status?: string }>
}) {
  const params = await searchParams
  const user = await getUser()
  const profile = await getUserProfile()
  const supabase = await createClient()

  // Build query with filters
  let query = supabase
    .from("alerts")
    .select(`
      *,
      patients(first_name, last_name, medical_record_number)
    `)
    .order("created_at", { ascending: false })

  if (params.severity) {
    query = query.eq("severity", params.severity)
  }
  if (params.type) {
    query = query.eq("alert_type", params.type)
  }
  if (params.status === "active") {
    query = query.eq("is_acknowledged", false)
  } else if (params.status === "acknowledged") {
    query = query.eq("is_acknowledged", true)
  }

  const { data: alerts } = await query

  // Get alert statistics
  const { data: allAlerts } = await supabase.from("alerts").select("severity, is_acknowledged")

  const stats = {
    total: allAlerts?.length || 0,
    active: allAlerts?.filter((a) => !a.is_acknowledged).length || 0,
    critical: allAlerts?.filter((a) => a.severity === "critical").length || 0,
    high: allAlerts?.filter((a) => a.severity === "high").length || 0,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={profile} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Alert Management</h1>
          <p className="text-gray-600">Monitor and manage system alerts and notifications</p>
        </div>

        <AlertsStats stats={stats} />

        <div className="mb-6">
          <AlertFilters />
        </div>

        <AlertsTable alerts={alerts || []} />
      </main>
    </div>
  )
}
