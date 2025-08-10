"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Search, Shield, MapPin, Clock, Smartphone, Ban, CheckCircle, Eye } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface RiskAlert {
  id: string
  response_id: string
  conductor_id: string
  conductor_name: string
  risk_type: string
  risk_level: "low" | "medium" | "high"
  description: string
  survey_title: string
  detected_at: string
  metadata: any
  status: "pending" | "reviewed" | "resolved"
}

export function RiskMonitoring() {
  const [alerts, setAlerts] = useState<RiskAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [riskLevelFilter, setRiskLevelFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchRiskAlerts()
  }, [])

  const fetchRiskAlerts = async () => {
    try {
      // Mock data for demo
      const mockAlerts: RiskAlert[] = [
        {
          id: "alert001",
          response_id: "r0000003-0003-0003-0003-000000000003",
          conductor_id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
          conductor_name: "Amit Singh",
          risk_type: "duplicate_device",
          risk_level: "high",
          description: "Same device fingerprint detected for multiple responses",
          survey_title: "Rural Health Access Survey",
          detected_at: "2025-01-09T14:30:00Z",
          metadata: { fingerprint: "fp123456", duplicate_count: 3 },
          status: "pending",
        },
        {
          id: "alert002",
          response_id: "r0000005-0005-0005-0005-000000000005",
          conductor_id: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
          conductor_name: "Meera Joshi",
          risk_type: "location_mismatch",
          risk_level: "medium",
          description: "GPS location does not match claimed location",
          survey_title: "Literacy Assessment Survey",
          detected_at: "2025-01-09T12:15:00Z",
          metadata: { claimed: "Mumbai", actual: "Delhi", distance_km: 1400 },
          status: "pending",
        },
        {
          id: "alert003",
          response_id: "r0000006-0006-0006-0006-000000000006",
          conductor_id: "eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee",
          conductor_name: "Meera Joshi",
          risk_type: "rapid_submission",
          risk_level: "medium",
          description: "Multiple surveys submitted in unrealistically short time",
          survey_title: "Literacy Assessment Survey",
          detected_at: "2025-01-09T11:45:00Z",
          metadata: { submissions_per_hour: 15, average_time_seconds: 45 },
          status: "reviewed",
        },
        {
          id: "alert004",
          response_id: "r0000004-0004-0004-0004-000000000004",
          conductor_id: "dddddddd-dddd-dddd-dddd-dddddddddddd",
          conductor_name: "Amit Singh",
          risk_type: "suspicious_pattern",
          risk_level: "high",
          description: "Identical response patterns detected across multiple surveys",
          survey_title: "Rural Health Access Survey",
          detected_at: "2025-01-09T10:20:00Z",
          metadata: { pattern_similarity: 0.95, affected_responses: 8 },
          status: "pending",
        },
        {
          id: "alert005",
          response_id: "r0000007-0007-0007-0007-000000000007",
          conductor_id: "66666666-6666-6666-6666-666666666666",
          conductor_name: "Priya Kumari",
          risk_type: "device_spoofing",
          risk_level: "low",
          description: "Potential device information manipulation detected",
          survey_title: "Rural Infrastructure Assessment",
          detected_at: "2025-01-09T09:10:00Z",
          metadata: { inconsistent_headers: ["user-agent", "screen-resolution"] },
          status: "resolved",
        },
      ]

      setAlerts(mockAlerts)
    } catch (error) {
      console.error("Error fetching risk alerts:", error)
      toast({
        title: "Error",
        description: "Failed to fetch risk alerts",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateAlertStatus = async (alertId: string, newStatus: string) => {
    try {
      setAlerts((prev) => prev.map((alert) => (alert.id === alertId ? { ...alert, status: newStatus as any } : alert)))

      toast({
        title: "Success",
        description: `Alert status updated to ${newStatus}`,
      })
    } catch (error) {
      console.error("Error updating alert:", error)
      toast({
        title: "Error",
        description: "Failed to update alert status",
        variant: "destructive",
      })
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.conductor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.survey_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRiskLevel = riskLevelFilter === "all" || alert.risk_level === riskLevelFilter
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    return matchesSearch && matchesRiskLevel && matchesStatus
  })

  const getRiskBadge = (level: string) => {
    const variants = {
      low: { variant: "outline" as const, className: "border-green-200 text-green-800 bg-green-50" },
      medium: { variant: "outline" as const, className: "border-yellow-200 text-yellow-800 bg-yellow-50" },
      high: { variant: "destructive" as const, className: "border-red-200 text-red-800 bg-red-50" },
    }

    const config = variants[level as keyof typeof variants] || variants.low

    return (
      <Badge variant={config.variant} className={config.className}>
        <AlertTriangle className="w-3 h-3 mr-1" />
        {level.toUpperCase()}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock },
      reviewed: { variant: "outline" as const, icon: Eye },
      resolved: { variant: "default" as const, icon: CheckCircle },
    }

    const config = variants[status as keyof typeof variants] || variants.pending
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getRiskTypeIcon = (type: string) => {
    const icons = {
      duplicate_device: Smartphone,
      location_mismatch: MapPin,
      rapid_submission: Clock,
      suspicious_pattern: AlertTriangle,
      device_spoofing: Shield,
    }

    return icons[type as keyof typeof icons] || AlertTriangle
  }

  const highRiskCount = alerts.filter((a) => a.risk_level === "high" && a.status === "pending").length
  const mediumRiskCount = alerts.filter((a) => a.risk_level === "medium" && a.status === "pending").length

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Risk Monitoring Dashboard</h3>
          <p className="text-sm text-muted-foreground">Monitor and manage fraud detection alerts</p>
        </div>
      </div>

      {/* Risk Summary */}
      {(highRiskCount > 0 || mediumRiskCount > 0) && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Active Threats Detected:</strong> {highRiskCount} high-risk and {mediumRiskCount} medium-risk alerts
            require immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-red-600">High Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {alerts.filter((a) => a.risk_level === "high").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-yellow-600">Medium Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {alerts.filter((a) => a.risk_level === "medium").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-600">Low Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {alerts.filter((a) => a.risk_level === "low").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {alerts.filter((a) => a.status === "resolved").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={riskLevelFilter} onValueChange={setRiskLevelFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by risk level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Risk Levels</SelectItem>
            <SelectItem value="high">High Risk</SelectItem>
            <SelectItem value="medium">Medium Risk</SelectItem>
            <SelectItem value="low">Low Risk</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="reviewed">Reviewed</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Risk Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Alerts ({filteredAlerts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert</TableHead>
                <TableHead>Conductor</TableHead>
                <TableHead>Survey</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Detected</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAlerts.map((alert) => {
                const RiskIcon = getRiskTypeIcon(alert.risk_type)
                return (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                          <RiskIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{alert.risk_type.replace("_", " ").toUpperCase()}</div>
                          <div className="text-sm text-muted-foreground">{alert.description}</div>
                          {alert.metadata && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {Object.entries(alert.metadata)
                                .slice(0, 2)
                                .map(([key, value]) => `${key}: ${value}`)
                                .join(", ")}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{alert.conductor_name}</TableCell>
                    <TableCell>
                      <div className="text-sm">{alert.survey_title}</div>
                    </TableCell>
                    <TableCell>{getRiskBadge(alert.risk_level)}</TableCell>
                    <TableCell>{getStatusBadge(alert.status)}</TableCell>
                    <TableCell>{new Date(alert.detected_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {alert.status === "pending" && (
                          <>
                            <Button size="sm" onClick={() => updateAlertStatus(alert.id, "reviewed")}>
                              <Eye className="h-4 w-4 mr-1" />
                              Review
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => updateAlertStatus(alert.id, "resolved")}>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Resolve
                            </Button>
                          </>
                        )}
                        {alert.status === "reviewed" && (
                          <Button size="sm" onClick={() => updateAlertStatus(alert.id, "resolved")}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Resolve
                          </Button>
                        )}
                        <Button size="sm" variant="ghost">
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
