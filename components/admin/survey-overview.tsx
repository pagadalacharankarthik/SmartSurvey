"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { FileText, Search, Play, Pause, Square, BarChart3 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface Survey {
  id: string
  title: string
  description: string
  domain: string
  status: "draft" | "active" | "paused" | "completed"
  target_responses: number
  response_count: number
  organization_name: string
  created_by_name: string
  created_at: string
  ai_generated: boolean
}

export function SurveyOverview() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [domainFilter, setDomainFilter] = useState<string>("all")

  const { toast } = useToast()
  const supabase = createClient()

  useEffect(() => {
    fetchSurveys()
  }, [])

  const fetchSurveys = async () => {
    try {
      // Mock data for demo
      const mockSurveys: Survey[] = [
        {
          id: "44444444-4444-4444-4444-444444444444",
          title: "Rural Health Access Survey",
          description: "Assessment of healthcare accessibility in rural areas",
          domain: "health",
          status: "active",
          target_responses: 1000,
          response_count: 756,
          organization_name: "Health Ministry",
          created_by_name: "Dr. Priya Sharma",
          created_at: "2025-01-08T10:00:00Z",
          ai_generated: true,
        },
        {
          id: "55555555-5555-5555-5555-555555555555",
          title: "Literacy Assessment Survey",
          description: "Evaluation of literacy rates and educational needs",
          domain: "education",
          status: "active",
          target_responses: 500,
          response_count: 342,
          organization_name: "Education Board",
          created_by_name: "Prof. Rajesh Kumar",
          created_at: "2025-01-07T14:30:00Z",
          ai_generated: true,
        },
        {
          id: "77777777-7777-7777-7777-777777777777",
          title: "Rural Infrastructure Assessment",
          description: "Evaluation of road, electricity, and communication infrastructure",
          domain: "infrastructure",
          status: "active",
          target_responses: 2000,
          response_count: 1234,
          organization_name: "Rural Development Ministry",
          created_by_name: "Dr. Anita Verma",
          created_at: "2025-01-06T09:15:00Z",
          ai_generated: true,
        },
        {
          id: "99999999-9999-9999-9999-999999999999",
          title: "Digital Literacy Survey",
          description: "Evaluation of technology adoption and digital skills",
          domain: "technology",
          status: "active",
          target_responses: 800,
          response_count: 567,
          organization_name: "Digital India Initiative",
          created_by_name: "Rahul Sharma",
          created_at: "2025-01-05T16:45:00Z",
          ai_generated: true,
        },
        {
          id: "66666666-6666-6666-6666-666666666666",
          title: "Water Quality Survey",
          description: "Assessment of water quality and access in communities",
          domain: "water",
          status: "draft",
          target_responses: 750,
          response_count: 0,
          organization_name: "Water Resources Dept",
          created_by_name: "Eng. Sunita Patel",
          created_at: "2025-01-04T11:20:00Z",
          ai_generated: true,
        },
      ]

      setSurveys(mockSurveys)
    } catch (error) {
      console.error("Error fetching surveys:", error)
      toast({
        title: "Error",
        description: "Failed to fetch surveys",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updateSurveyStatus = async (surveyId: string, newStatus: string) => {
    try {
      // Mock update for demo
      setSurveys((prev) =>
        prev.map((survey) => (survey.id === surveyId ? { ...survey, status: newStatus as any } : survey)),
      )

      toast({
        title: "Success",
        description: `Survey status updated to ${newStatus}`,
      })
    } catch (error) {
      console.error("Error updating survey:", error)
      toast({
        title: "Error",
        description: "Failed to update survey status",
        variant: "destructive",
      })
    }
  }

  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch =
      survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.organization_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || survey.status === statusFilter
    const matchesDomain = domainFilter === "all" || survey.domain === domainFilter
    return matchesSearch && matchesStatus && matchesDomain
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: { variant: "secondary" as const, color: "text-gray-600" },
      active: { variant: "default" as const, color: "text-green-600" },
      paused: { variant: "outline" as const, color: "text-yellow-600" },
      completed: { variant: "destructive" as const, color: "text-blue-600" },
    }

    const config = variants[status as keyof typeof variants] || variants.draft

    return (
      <Badge variant={config.variant} className={config.color}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100)
  }

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
          <h3 className="text-lg font-medium">Survey Overview</h3>
          <p className="text-sm text-muted-foreground">Monitor and manage all surveys across organizations</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search surveys..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={domainFilter} onValueChange={setDomainFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by domain" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Domains</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="education">Education</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
            <SelectItem value="technology">Technology</SelectItem>
            <SelectItem value="water">Water</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Surveys Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Surveys ({filteredSurveys.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Survey</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSurveys.map((survey) => (
                <TableRow key={survey.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {survey.title}
                        {survey.ai_generated && (
                          <Badge variant="outline" className="text-xs">
                            AI
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{survey.description}</div>
                      <div className="text-xs text-muted-foreground">by {survey.created_by_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{survey.organization_name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {survey.domain}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(survey.status)}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {survey.response_count} / {survey.target_responses}
                        </span>
                        <span>
                          {Math.round(getProgressPercentage(survey.response_count, survey.target_responses))}%
                        </span>
                      </div>
                      <Progress
                        value={getProgressPercentage(survey.response_count, survey.target_responses)}
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  <TableCell>{new Date(survey.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {survey.status === "draft" && (
                        <Button size="sm" onClick={() => updateSurveyStatus(survey.id, "active")}>
                          <Play className="h-4 w-4 mr-1" />
                          Start
                        </Button>
                      )}
                      {survey.status === "active" && (
                        <Button size="sm" variant="outline" onClick={() => updateSurveyStatus(survey.id, "paused")}>
                          <Pause className="h-4 w-4 mr-1" />
                          Pause
                        </Button>
                      )}
                      {survey.status === "paused" && (
                        <>
                          <Button size="sm" onClick={() => updateSurveyStatus(survey.id, "active")}>
                            <Play className="h-4 w-4 mr-1" />
                            Resume
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateSurveyStatus(survey.id, "completed")}
                          >
                            <Square className="h-4 w-4 mr-1" />
                            Complete
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost">
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
