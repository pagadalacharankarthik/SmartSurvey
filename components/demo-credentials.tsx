"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, Eye, EyeOff, User, Shield, Users, Briefcase } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DemoCredential {
  email: string
  password: string
  name: string
  role: string
  organization: string
  description: string
  features: string[]
  icon: React.ReactNode
  badgeColor: string
}

const demoCredentials: DemoCredential[] = [
  {
    email: "admin@demo.com",
    password: "admin123",
    name: "System Administrator",
    role: "Super Admin",
    organization: "Ministry of Health",
    description: "Complete system control with access to all features and organizations.",
    features: [
      "User & Organization Management",
      "System Analytics & Reports",
      "Risk Monitoring & Alerts",
      "Global Survey Oversight",
      "Security & Compliance Tools",
    ],
    icon: <Shield className="h-4 w-4" />,
    badgeColor: "bg-red-500",
  },
  {
    email: "health.admin@demo.com",
    password: "health123",
    name: "Dr. Sarah Johnson",
    role: "Health Admin",
    organization: "Ministry of Health",
    description: "Health sector administrator with survey management and team oversight.",
    features: [
      "Health Survey Creation & Management",
      "Document Upload & AI Analysis",
      "Team Member Management",
      "Health Data Analytics",
      "Risk Assessment Tools",
    ],
    icon: <Briefcase className="h-4 w-4" />,
    badgeColor: "bg-blue-500",
  },
  {
    email: "edu.admin@demo.com",
    password: "edu123",
    name: "Prof. Michael Chen",
    role: "Education Admin",
    organization: "Education Development Foundation",
    description: "Education sector administrator focusing on literacy and digital assessments.",
    features: [
      "Education Survey Management",
      "Digital Literacy Assessments",
      "Academic Research Tools",
      "Student Progress Tracking",
      "Educational Analytics",
    ],
    icon: <Briefcase className="h-4 w-4" />,
    badgeColor: "bg-green-500",
  },
  {
    email: "water.admin@demo.com",
    password: "water123",
    name: "Engineer Lisa Rodriguez",
    role: "Water Admin",
    organization: "Water Resources Department",
    description: "Water resources administrator managing quality assessments and infrastructure.",
    features: [
      "Water Quality Surveys",
      "Infrastructure Planning Tools",
      "Environmental Monitoring",
      "Resource Allocation Analytics",
      "Compliance Reporting",
    ],
    icon: <Briefcase className="h-4 w-4" />,
    badgeColor: "bg-cyan-500",
  },
  {
    email: "conductor1@demo.com",
    password: "conductor123",
    name: "Field Agent John Smith",
    role: "Survey Conductor",
    organization: "Ministry of Health",
    description: "Field data collector with mobile survey capabilities and offline support.",
    features: [
      "Mobile Survey Collection",
      "Offline Data Capability",
      "GPS Location Tracking",
      "Photo & Document Capture",
      "Real-time Data Sync",
    ],
    icon: <User className="h-4 w-4" />,
    badgeColor: "bg-purple-500",
  },
  {
    email: "conductor2@demo.com",
    password: "conductor123",
    name: "Survey Specialist Emma Davis",
    role: "Survey Conductor",
    organization: "Education Development Foundation",
    description: "Education field specialist with multi-language survey support.",
    features: [
      "Education Field Surveys",
      "Multi-language Support",
      "Student Assessment Tools",
      "Community Engagement",
      "Progress Reporting",
    ],
    icon: <User className="h-4 w-4" />,
    badgeColor: "bg-indigo-500",
  },
]

interface DemoCredentialsProps {
  onUseCredentials: (email: string, password: string) => void
}

export function DemoCredentials({ onUseCredentials }: DemoCredentialsProps) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({})
  const { toast } = useToast()

  const togglePasswordVisibility = (email: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [email]: !prev[email],
    }))
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied!",
        description: `${type} copied to clipboard`,
        duration: 2000,
      })
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold mb-2">Demo Credentials</h3>
        <p className="text-sm text-muted-foreground">
          Choose any role below to explore the platform. Click "Use Now" to auto-fill the login form.
        </p>
      </div>

      <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-2">
        {demoCredentials.map((credential) => (
          <Card key={credential.email} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {credential.icon}
                  <CardTitle className="text-base">{credential.name}</CardTitle>
                </div>
                <Badge className={`${credential.badgeColor} text-white`} variant="secondary">
                  {credential.role}
                </Badge>
              </div>
              <CardDescription className="text-xs">{credential.organization}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{credential.description}</p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Email:</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => copyToClipboard(credential.email, "Email")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">{credential.email}</code>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Password:</span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => togglePasswordVisibility(credential.email)}
                      >
                        {showPasswords[credential.email] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0"
                        onClick={() => copyToClipboard(credential.password, "Password")}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">
                    {showPasswords[credential.email] ? credential.password : "••••••••"}
                  </code>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-medium">Key Features:</span>
                <ul className="text-xs text-muted-foreground space-y-1">
                  {credential.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-current rounded-full" />
                      {feature}
                    </li>
                  ))}
                  {credential.features.length > 3 && (
                    <li className="text-xs text-muted-foreground/70">
                      +{credential.features.length - 3} more features...
                    </li>
                  )}
                </ul>
              </div>

              <Button
                onClick={() => onUseCredentials(credential.email, credential.password)}
                className="w-full"
                size="sm"
              >
                Use Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <Users className="h-4 w-4" />
          Testing Guide
        </h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>
            • <strong>Super Admin:</strong> Access all features, manage organizations and users
          </li>
          <li>
            • <strong>Admins:</strong> Create surveys, manage teams, view analytics for their sector
          </li>
          <li>
            • <strong>Conductors:</strong> Collect field data, work offline, sync responses
          </li>
          <li>• All data is stored locally - no external services required</li>
          <li>• Sessions persist for 24 hours with automatic refresh</li>
        </ul>
      </div>
    </div>
  )
}
