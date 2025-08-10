"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, Search, CheckCircle, XCircle, Clock, Users, FileText } from "lucide-react"
import { demoDataStore } from "@/lib/demo-data"
import { useToast } from "@/hooks/use-toast"

export function OrganizationManagement() {
  const [organizations, setOrganizations] = useState(demoDataStore.getOrganizations())
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const { toast } = useToast()

  const updateOrganizationStatus = async (orgId: string, newStatus: string) => {
    setLoading(true)
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updatedOrg = demoDataStore.updateOrganization(orgId, { status: newStatus as any })
      if (updatedOrg) {
        setOrganizations(demoDataStore.getOrganizations())
        toast({
          title: "Success",
          description: `Organization status updated to ${newStatus}`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update organization status",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const filteredOrganizations = organizations.filter((org) => {
    const matchesSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || org.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      inactive: { variant: "outline" as const, icon: XCircle, color: "text-gray-600" },
      suspended: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
    }

    const config = variants[status as keyof typeof variants] || variants.inactive
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className={`w-3 h-3 ${config.color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getAdminName = (adminId: string) => {
    const admin = demoDataStore.getUserById(adminId)
    return admin?.full_name || "No admin assigned"
  }

  const getSurveyCount = (orgId: string) => {
    return demoDataStore.getSurveysByOrganization(orgId).length
  }

  const getUserCount = (orgName: string) => {
    return demoDataStore.getUsers().filter((user) => user.organization === orgName).length
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Organization Management</h3>
          <p className="text-sm text-muted-foreground">Manage and approve organization accounts</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search organizations..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Organizations Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Organizations ({filteredOrganizations.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Surveys</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrganizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{org.name}</div>
                      <div className="text-sm text-muted-foreground">{org.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getAdminName(org.admin_id)}</TableCell>
                  <TableCell>{getStatusBadge(org.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {getUserCount(org.name)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {getSurveyCount(org.id)}
                    </div>
                  </TableCell>
                  <TableCell>{new Date(org.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {org.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateOrganizationStatus(org.id, "active")}
                            disabled={loading}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateOrganizationStatus(org.id, "inactive")}
                            disabled={loading}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}
                      {org.status === "active" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateOrganizationStatus(org.id, "suspended")}
                          disabled={loading}
                        >
                          Suspend
                        </Button>
                      )}
                      {org.status === "suspended" && (
                        <Button size="sm" onClick={() => updateOrganizationStatus(org.id, "active")} disabled={loading}>
                          Reactivate
                        </Button>
                      )}
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
