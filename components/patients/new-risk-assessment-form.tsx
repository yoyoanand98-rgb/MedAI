"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"

interface NewRiskAssessmentFormProps {
  patientId: string
  clinicianId: string
}

export function NewRiskAssessmentForm({ patientId, clinicianId }: NewRiskAssessmentFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [riskScore, setRiskScore] = useState("")
  const [riskLevel, setRiskLevel] = useState("")
  const [notes, setNotes] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase.from("risk_assessments").insert({
        patient_id: patientId,
        clinician_id: clinicianId,
        risk_score: Number.parseFloat(riskScore),
        risk_level: riskLevel,
        notes: notes || null,
      })

      if (error) throw error

      // Reset form
      setRiskScore("")
      setRiskLevel("")
      setNotes("")
      setIsOpen(false)

      // Refresh the page to show new assessment
      router.refresh()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <Button onClick={() => setIsOpen(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            New Risk Assessment
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>New Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="riskScore">Risk Score (%)</Label>
            <Input
              id="riskScore"
              type="number"
              min="0"
              max="100"
              step="0.1"
              required
              value={riskScore}
              onChange={(e) => setRiskScore(e.target.value)}
              placeholder="Enter risk score (0-100)"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="riskLevel">Risk Level</Label>
            <Select value={riskLevel} onValueChange={setRiskLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Clinical Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter clinical observations, recommendations, or notes..."
              rows={3}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2">
            <Button type="submit" disabled={isLoading || !riskScore || !riskLevel}>
              {isLoading ? "Saving..." : "Save Assessment"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
