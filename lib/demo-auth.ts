"use client"

import { demoDataStore, type DemoUser } from "./demo-data"

export interface AuthSession {
  user: DemoUser
  token: string
  expiresAt: number
}

export class DemoAuthService {
  private static instance: DemoAuthService
  private currentSession: AuthSession | null = null

  static getInstance(): DemoAuthService {
    if (!DemoAuthService.instance) {
      DemoAuthService.instance = new DemoAuthService()
    }
    return DemoAuthService.instance
  }

  constructor() {
    // Load session from localStorage on initialization
    if (typeof window !== "undefined") {
      this.loadSession()
    }
  }

  private loadSession(): void {
    try {
      const sessionData = localStorage.getItem("demo_auth_session")
      if (sessionData) {
        const session: AuthSession = JSON.parse(sessionData)
        if (session.expiresAt > Date.now()) {
          this.currentSession = session
        } else {
          localStorage.removeItem("demo_auth_session")
        }
      }
    } catch (error) {
      console.error("Error loading session:", error)
      localStorage.removeItem("demo_auth_session")
    }
  }

  private saveSession(session: AuthSession): void {
    try {
      localStorage.setItem("demo_auth_session", JSON.stringify(session))
    } catch (error) {
      console.error("Error saving session:", error)
    }
  }

  async signIn(email: string, password: string): Promise<{ user: DemoUser; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = demoDataStore.getUserByEmail(email)

    if (!user) {
      return { user: null as any, error: "User not found" }
    }

    if (user.password !== password) {
      return { user: null as any, error: "Invalid password" }
    }

    if (user.status !== "active") {
      return { user: null as any, error: "Account is not active" }
    }

    // Create session
    const session: AuthSession = {
      user,
      token: `demo_token_${user.id}_${Date.now()}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }

    this.currentSession = session
    this.saveSession(session)

    // Update last login
    demoDataStore.updateUser(user.id, {
      last_login: new Date().toISOString(),
    })

    return { user }
  }

  async signInWithPhone(phone: string, otp: string): Promise<{ user: DemoUser; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, accept any 6-digit OTP
    if (!/^\d{6}$/.test(otp)) {
      return { user: null as any, error: "Invalid OTP format" }
    }

    const user = demoDataStore.getUsers().find((u) => u.phone === phone)

    if (!user) {
      return { user: null as any, error: "Phone number not found" }
    }

    if (user.status !== "active") {
      return { user: null as any, error: "Account is not active" }
    }

    // Create session
    const session: AuthSession = {
      user,
      token: `demo_token_${user.id}_${Date.now()}`,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }

    this.currentSession = session
    this.saveSession(session)

    // Update last login
    demoDataStore.updateUser(user.id, {
      last_login: new Date().toISOString(),
    })

    return { user }
  }

  async sendOTP(phone: string): Promise<{ success: boolean; error?: string }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const user = demoDataStore.getUsers().find((u) => u.phone === phone)

    if (!user) {
      return { success: false, error: "Phone number not found" }
    }

    // In demo mode, we just return success
    // In real implementation, this would send an actual OTP
    return { success: true }
  }

  signOut(): void {
    this.currentSession = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("demo_auth_session")
    }
  }

  getCurrentUser(): DemoUser | null {
    if (!this.currentSession) return null

    // Check if session is expired
    if (this.currentSession.expiresAt <= Date.now()) {
      this.signOut()
      return null
    }

    return this.currentSession.user
  }

  getSession(): AuthSession | null {
    if (!this.currentSession) return null

    // Check if session is expired
    if (this.currentSession.expiresAt <= Date.now()) {
      this.signOut()
      return null
    }

    return this.currentSession
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  hasRole(role: DemoUser["role"]): boolean {
    const user = this.getCurrentUser()
    return user?.role === role
  }

  hasAnyRole(roles: DemoUser["role"][]): boolean {
    const user = this.getCurrentUser()
    return user ? roles.includes(user.role) : false
  }

  canAccessAdmin(): boolean {
    return this.hasAnyRole(["super_admin", "health_admin", "education_admin", "water_admin"])
  }

  canManageUsers(): boolean {
    return this.hasRole("super_admin")
  }

  canManageOrganizations(): boolean {
    return this.hasRole("super_admin")
  }

  canViewAllSurveys(): boolean {
    return this.hasAnyRole(["super_admin", "health_admin", "education_admin", "water_admin"])
  }

  canCreateSurveys(): boolean {
    return this.hasAnyRole(["super_admin", "health_admin", "education_admin", "water_admin"])
  }

  canConductSurveys(): boolean {
    return this.hasAnyRole(["field_agent", "survey_specialist"])
  }
}

// Export singleton instance
export const demoAuth = DemoAuthService.getInstance()

// Demo credentials for easy testing
export const DEMO_CREDENTIALS = [
  {
    email: "admin@demo.com",
    password: "admin123",
    phone: "+1234567890",
    role: "super_admin",
    name: "System Administrator",
    description: "Full system access with all administrative privileges",
    features: ["User management", "Organization oversight", "System analytics", "Risk monitoring", "Global settings"],
  },
  {
    email: "health.admin@demo.com",
    password: "health123",
    phone: "+1234567891",
    role: "health_admin",
    name: "Dr. Sarah Johnson",
    description: "Health ministry administrator with health survey management",
    features: [
      "Health survey creation",
      "Health data analytics",
      "Field agent management",
      "Health risk monitoring",
      "Report generation",
    ],
  },
  {
    email: "edu.admin@demo.com",
    password: "edu123",
    phone: "+1234567892",
    role: "education_admin",
    name: "Prof. Michael Chen",
    description: "Education foundation administrator for educational surveys",
    features: [
      "Education survey management",
      "Student data analysis",
      "Teacher coordination",
      "Educational reporting",
      "Quality assurance",
    ],
  },
  {
    email: "water.admin@demo.com",
    password: "water123",
    phone: "+1234567893",
    role: "water_admin",
    name: "Engineer Lisa Rodriguez",
    description: "Water resources department administrator",
    features: [
      "Water quality surveys",
      "Infrastructure assessment",
      "Resource planning",
      "Environmental monitoring",
      "Community outreach",
    ],
  },
  {
    email: "conductor1@demo.com",
    password: "conductor123",
    phone: "+1234567894",
    role: "field_agent",
    name: "James Wilson",
    description: "Field agent for conducting surveys in communities",
    features: [
      "Survey data collection",
      "Community engagement",
      "Mobile data entry",
      "Location tracking",
      "Offline capabilities",
    ],
  },
  {
    email: "conductor2@demo.com",
    password: "conductor123",
    phone: "+1234567895",
    role: "survey_specialist",
    name: "Maria Garcia",
    description: "Survey specialist with advanced data collection expertise",
    features: [
      "Advanced survey tools",
      "Data quality control",
      "Survey optimization",
      "Training coordination",
      "Technical support",
    ],
  },
] as const
