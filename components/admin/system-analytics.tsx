"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Download,
  Calendar,
  Activity,
  Database,
  Server,
  Wifi,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SystemAnalytics() {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const systemMetrics = {
    totalUsers: 1247,
    activeUsers: 892,
    totalSurveys: 156,
    activeSurveys: 23,
    totalResponses: 45678,
    todayResponses: 234,
    systemUptime: 99.97,
    avgResponseTime: 1.2,
    dataStorage: 2.4, // GB
    bandwidth: 156.7, // MB
  }

  const geographicData = [
    { state: "Uttar Pradesh", responses: 8945, coverage: 78 },
    { state: "Maharashtra", responses: 7234, coverage: 82 },
    { state: "Bihar", responses: 6123, coverage: 65 },
    { state: "West Bengal", responses: 5678, coverage: 71 },
    { state: "Rajasthan", responses: 4567, coverage: 69 },
    { state: "Madhya Pradesh", responses: 4234, coverage: 73 },
    { state: "Tamil Nadu", responses: 3890, coverage: 85 },
    { state: "Karnataka", responses: 3456, coverage: 79 },
  ]

  const domainAnalytics = [
    { domain: "Health", surveys: 45, responses: 12456, completion: 76 },
    { domain: "Education", surveys: 38, responses: 9876, completion: 82 },
    { domain: "Infrastructure", surveys: 32, responses: 8765, completion: 68 },
    { domain: "Agriculture", surveys: 25, responses: 7654, completion: 71 },
    { domain: "Water", surveys: 16, responses: 6543, completion: 79 },
  ]

  const exportReport = async (type: string) => {
    setLoading(true)
    try {
      // Mock export functionality
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Export Successful",
        description: `${type} report has been generated and downloaded.`,
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">System Analytics</h3>
          <p className="text-sm text-muted-foreground">Comprehensive system performance and usage analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => exportReport("CSV")} disabled={loading}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => exportReport("PDF")} disabled={loading}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-green-600">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Active Surveys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.activeSurveys}</div>
            <div className="text-sm text-blue-600">{systemMetrics.totalSurveys} total surveys</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4" />
              System Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.systemUptime}%</div>
            <div className="text-sm text-green-600">Avg response: {systemMetrics.avgResponseTime}s</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data Storage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.dataStorage} GB</div>
            <div className="text-sm text-orange-600">Bandwidth: {systemMetrics.bandwidth} MB/day</div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="geographic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="geographic">Geographic Analysis</TabsTrigger>
          <TabsTrigger value="domain">Domain Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="usage">Usage Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="geographic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{item.state}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.responses.toLocaleString()} responses
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={item.coverage} className="flex-1 h-2" />
                        <span className="text-sm font-medium w-12">{item.coverage}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Domain-wise Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {domainAnalytics.map((item, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{item.domain}</h4>
                      <Badge variant="outline">{item.surveys} surveys</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Responses:</span>
                        <span className="ml-2 font-medium">{item.responses.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Completion:</span>
                        <span className="ml-2 font-medium">{item.completion}%</span>
                      </div>
                    </div>
                    <Progress value={item.completion} className="mt-2 h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Server Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>CPU Usage</span>
                  <span className="font-medium">45%</span>
                </div>
                <Progress value={45} className="h-2" />

                <div className="flex items-center justify-between">
                  <span>Memory Usage</span>
                  <span className="font-medium">62%</span>
                </div>
                <Progress value={62} className="h-2" />

                <div className="flex items-center justify-between">
                  <span>Disk Usage</span>
                  <span className="font-medium">38%</span>
                </div>
                <Progress value={38} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Network Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Bandwidth Usage</span>
                  <span className="font-medium">156.7 MB</span>
                </div>
                <Progress value={67} className="h-2" />

                <div className="flex items-center justify-between">
                  <span>Request Rate</span>
                  <span className="font-medium">1,234/min</span>
                </div>
                <Progress value={78} className="h-2" />

                <div className="flex items-center justify-between">
                  <span>Error Rate</span>
                  <span className="font-medium">0.02%</span>
                </div>
                <Progress value={2} className="h-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Daily Usage Patterns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Peak Hours</span>
                    <span className="font-medium">10 AM - 2 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Average Session</span>
                    <span className="font-medium">24 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Mobile Usage</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Offline Sync</span>
                    <span className="font-medium">234 pending</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Active Users</span>
                    <span className="font-medium text-green-600">892</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Surveys in Progress</span>
                    <span className="font-medium text-blue-600">156</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Responses Today</span>
                    <span className="font-medium text-purple-600">234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>System Load</span>
                    <span className="font-medium text-orange-600">Medium</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
