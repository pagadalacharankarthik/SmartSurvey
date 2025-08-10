"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Building, FileText, AlertTriangle, Activity, CheckCircle, BarChart3 } from "lucide-react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { OrganizationManagement } from "@/components/admin/organization-management"
import { UserManagement } from "@/components/admin/user-management"
import { SurveyOverview } from "@/components/admin/survey-overview"
import { RiskMonitoring } from "@/components/admin/risk-monitoring"
import { SystemAnalytics } from "@/components/admin/system-analytics"
import { useAuth } from "@/components/auth-provider"
import { demoDataStore } from "@/lib/demo-data"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(demoDataStore.getStats())

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: `${stats.activeUsers} active users`,
      color: "text-blue-600",
    },
    {
      title: "Organizations",
      value: stats.totalOrganizations,
      icon: Building,
      description: `${stats.pendingApprovals} pending approvals`,
      color: "text-green-600",
    },
    {
      title: "Active Surveys",
      value: stats.activeSurveys,
      icon: FileText,
      description: `${stats.totalSurveys} total surveys`,
      color: "text-purple-600",
    },
    {
      title: "Total Responses",
      value: stats.totalResponses,
      icon: BarChart3,
      description: "Data points collected",
      color: "text-orange-600",
    },
    {
      title: "Risk Alerts",
      value: stats.riskAlerts,
      icon: AlertTriangle,
      description: "High-risk detections",
      color: "text-red-600",
    },
    {
      title: "System Health",
      value: "99.9%",
      icon: Activity,
      description: "Uptime percentage",
      color: "text-green-600",
    },
  ]

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Super Admin Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                <Activity className="w-3 h-3 mr-1" />
                System Online
              </Badge>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {statCards.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="organizations">Organizations</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="surveys">Surveys</TabsTrigger>
              <TabsTrigger value="risk">Risk Monitoring</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">New organization approved</p>
                          <p className="text-sm text-muted-foreground">Health Ministry - 2 minutes ago</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">Risk alert detected</p>
                          <p className="text-sm text-muted-foreground">
                            Duplicate responses from same device - 15 minutes ago
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-blue-600 mr-2" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">New conductor registered</p>
                          <p className="text-sm text-muted-foreground">Amit Singh - Education Board - 1 hour ago</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Demo Features</CardTitle>
                    <CardDescription>Fully functional demo capabilities</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Complete user management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Organization oversight</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Survey monitoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Risk detection system</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>Analytics dashboard</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="organizations">
              <OrganizationManagement />
            </TabsContent>

            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="surveys">
              <SurveyOverview />
            </TabsContent>

            <TabsContent value="risk">
              <RiskMonitoring />
            </TabsContent>

            <TabsContent value="analytics">
              <SystemAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
