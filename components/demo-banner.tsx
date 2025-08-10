"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Info, Zap, Shield, Database } from "lucide-react"

export function DemoBanner() {
  return (
    <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50 rounded-none border-x-0 border-t-0">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          <span className="text-blue-800 dark:text-blue-200 font-medium">🚀 Demo Mode Active</span>
          <span className="text-blue-700 dark:text-blue-300 text-sm">
            Full-featured demo with comprehensive test data - no setup required!
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Zap className="h-3 w-3 mr-1" />
            Instant Access
          </Badge>
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Shield className="h-3 w-3 mr-1" />
            Secure Local Storage
          </Badge>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            <Database className="h-3 w-3 mr-1" />
            Rich Demo Data
          </Badge>
        </div>
      </AlertDescription>
    </Alert>
  )
}
