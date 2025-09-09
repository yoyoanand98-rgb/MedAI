import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, User, Calendar } from "lucide-react"

interface RiskAssessment {
  id: string
  risk_score: number
  risk_level: string
  assessment_date: string
  notes: string
  users: {
    first_name: string
    last_name: string
  }
}

interface RiskAssessmentHistoryProps {
  assessments: RiskAssessment[]
}

export function RiskAssessmentHistory({ assessments }: RiskAssessmentHistoryProps) {
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

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Risk Assessment History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {assessments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">No risk assessments available</div>
        ) : (
          <div className="space-y-4">
            {assessments.map((assessment) => (
              <div key={assessment.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Badge className={getRiskBadgeColor(assessment.risk_level)}>{assessment.risk_level} Risk</Badge>
                    <span className="text-xl font-semibold text-gray-900">{assessment.risk_score}%</span>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(assessment.assessment_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {assessment.users.first_name} {assessment.users.last_name}
                    </div>
                  </div>
                </div>
                {assessment.notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Clinical Notes:</h4>
                    <p className="text-sm text-gray-600">{assessment.notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
