"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function AlertFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/alerts?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/alerts")
  }

  const hasFilters = searchParams.get("severity") || searchParams.get("type") || searchParams.get("status")

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Severity:</label>
        <Select
          value={searchParams.get("severity") || "all"}
          onValueChange={(value) => updateFilter("severity", value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Type:</label>
        <Select value={searchParams.get("type") || "all"} onValueChange={(value) => updateFilter("type", value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="high_risk">High Risk</SelectItem>
            <SelectItem value="critical_vitals">Critical Vitals</SelectItem>
            <SelectItem value="missing_data">Missing Data</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Status:</label>
        <Select value={searchParams.get("status") || "all"} onValueChange={(value) => updateFilter("status", value)}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="acknowledged">Acknowledged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasFilters && (
        <Button variant="outline" size="sm" onClick={clearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear Filters
        </Button>
      )}
    </div>
  )
}
