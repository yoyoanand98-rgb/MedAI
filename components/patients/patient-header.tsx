import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, User, Calendar, FileText } from "lucide-react"
import Link from "next/link"

interface PatientHeaderProps {
  patient: {
    id: string
    first_name: string
    last_name: string
    date_of_birth: string
    gender: string
    medical_record_number: string
    risk_assessments?: Array<{
      risk_score: number
      risk_level: string
      assessment_date: string
    }>
  }
}

export function PatientHeader({ patient }: PatientHeaderProps) {
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

  const latestAssessment = patient.risk_assessments?.[0]
  const age = calculateAge(patient.date_of_birth)

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {patient.first_name} {patient.last_name}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>MRN: {patient.medical_record_number}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Age: {age} years</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="capitalize">Gender: {patient.gender}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-right">
              {latestAssessment ? (
                <div className="space-y-2">
                  <Badge className={getRiskBadgeColor(latestAssessment.risk_level)}>
                    {latestAssessment.risk_level} Risk
                  </Badge>
                  <div className="text-2xl font-bold text-gray-900">{latestAssessment.risk_score}%</div>
                  <div className="text-sm text-gray-500">
                    Last assessed: {new Date(latestAssessment.assessment_date).toLocaleDateString()}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Badge className="bg-gray-100 text-gray-800">No Assessment</Badge>
                  <div className="text-sm text-gray-500">No risk assessment available</div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
