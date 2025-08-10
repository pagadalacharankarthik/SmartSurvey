"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { DemoAuthService, type AuthSession } from "@/lib/demo-auth"
import type { DemoUser } from "@/lib/demo-data"

interface AuthContextType {
  user: DemoUser | null
  session: AuthSession | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  loginWithPhone: (phone: string, otp: string) => Promise<void>
  sendOTP: (phone: string) => Promise<void>
  logout: () => void
  hasRole: (role: string) => boolean
  canAccessOrganization: (organizationId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const existingSession = DemoAuthService.getSession()
    setSession(existingSession)
    setIsLoading(false)

    // Set up session refresh interval
    const interval = setInterval(() => {
      const currentSession = DemoAuthService.getSession()
      if (currentSession) {
        DemoAuthService.refreshSession()
        setSession(currentSession)
      } else {
        setSession(null)
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const newSession = await DemoAuthService.login(email, password)
      setSession(newSession)
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithPhone = async (phone: string, otp: string) => {
    setIsLoading(true)
    try {
      const newSession = await DemoAuthService.loginWithPhone(phone, otp)
      setSession(newSession)
    } finally {
      setIsLoading(false)
    }
  }

  const sendOTP = async (phone: string) => {
    await DemoAuthService.sendOTP(phone)
  }

  const logout = () => {
    DemoAuthService.logout()
    setSession(null)
  }

  const hasRole = (role: string) => {
    return DemoAuthService.hasRole(role)
  }

  const canAccessOrganization = (organizationId: string) => {
    return DemoAuthService.canAccessOrganization(organizationId)
  }

  const value: AuthContextType = {
    user: session?.user || null,
    session,
    isLoading,
    login,
    loginWithPhone,
    sendOTP,
    logout,
    hasRole,
    canAccessOrganization,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
