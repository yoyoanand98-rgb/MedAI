"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, AlertCircle, Users } from "lucide-react"
import Link from "next/link"
import { AddPatientForm } from "@/components/patients/add-patient-form"

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

interface PatientCohortTableProps {
  patients: Patient[]
}

export function PatientCohortTable({
  patients,
  onPatientAdded,
}: PatientCohortTableProps & { onPatientAdded: () => void }) {
  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "low":
        return "bg-green-100 text-green-800"
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

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Patient Cohort ({patients.length})
          </CardTitle>
          <AddPatientForm onPatientAdded={onPatientAdded} />
        </div>
      </CardHeader>
      <CardContent>
        {patients.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium mb-2">No patients found</p>
            <p className="text-sm">Add your first patient to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Patient</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">MRN</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Age</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Risk Level</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Risk Score</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Last Assessment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => {
                  const latestAssessment = patient.risk_assessments?.[0]
                  const age = calculateAge(patient.date_of_birth)

                  return (
                    <tr key={patient.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">
                          {patient.first_name} {patient.last_name}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{patient.medical_record_number}</td>
                      <td className="py-3 px-4 text-gray-600">{age}</td>
                      <td className="py-3 px-4">
                        {latestAssessment ? (
                          <Badge className={getRiskBadgeColor(latestAssessment.risk_level)}>
                            {latestAssessment.risk_level}
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">No Assessment</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {latestAssessment ? (
                          <span className="font-medium">{latestAssessment.risk_score}%</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {latestAssessment ? (
                          new Date(latestAssessment.assessment_date).toLocaleDateString()
                        ) : (
                          <span className="text-gray-400">Never</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/patients/${patient.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          {latestAssessment?.risk_level === "high" || latestAssessment?.risk_level === "critical" ? (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
