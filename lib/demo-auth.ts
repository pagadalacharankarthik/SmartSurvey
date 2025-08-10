import { demoUsers, type DemoUser } from "./demo-data"

export interface AuthSession {
  user: DemoUser
  token: string
  expiresAt: number
}

export class DemoAuthService {
  private static readonly SESSION_KEY = "demo_auth_session"
  private static readonly SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

  static async login(email: string, password: string): Promise<AuthSession | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = demoUsers.find((u) => u.email === email && u.password === password)

    if (!user) {
      throw new Error("Invalid credentials")
    }

    if (user.status !== "active") {
      throw new Error(`Account is ${user.status}. Please contact administrator.`)
    }

    const session: AuthSession = {
      user,
      token: this.generateToken(),
      expiresAt: Date.now() + this.SESSION_DURATION,
    }

    // Store session in localStorage
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))

    // Update last login
    user.last_login = new Date().toISOString()

    return session
  }

  static async loginWithPhone(phone: string, otp: string): Promise<AuthSession | null> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Demo OTP validation (accept any 6-digit code)
    if (!/^\d{6}$/.test(otp)) {
      throw new Error("Invalid OTP format")
    }

    const user = demoUsers.find((u) => u.phone === phone)

    if (!user) {
      throw new Error("Phone number not found")
    }

    if (user.status !== "active") {
      throw new Error(`Account is ${user.status}. Please contact administrator.`)
    }

    const session: AuthSession = {
      user,
      token: this.generateToken(),
      expiresAt: Date.now() + this.SESSION_DURATION,
    }

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
    user.last_login = new Date().toISOString()

    return session
  }

  static async sendOTP(phone: string): Promise<boolean> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    const user = demoUsers.find((u) => u.phone === phone)
    if (!user) {
      throw new Error("Phone number not found")
    }

    // In demo mode, we just return success
    console.log(`Demo OTP sent to ${phone}: 123456`)
    return true
  }

  static getSession(): AuthSession | null {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY)
      if (!sessionData) return null

      const session: AuthSession = JSON.parse(sessionData)

      // Check if session is expired
      if (Date.now() > session.expiresAt) {
        this.logout()
        return null
      }

      return session
    } catch (error) {
      console.error("Error parsing session:", error)
      this.logout()
      return null
    }
  }

  static logout(): void {
    localStorage.removeItem(this.SESSION_KEY)
  }

  static isAuthenticated(): boolean {
    return this.getSession() !== null
  }

  static getCurrentUser(): DemoUser | null {
    const session = this.getSession()
    return session?.user || null
  }

  static hasRole(role: string): boolean {
    const user = this.getCurrentUser()
    if (!user) return false

    if (role === "super_admin") {
      return user.role === "super_admin"
    }
    if (role === "admin") {
      return user.role === "super_admin" || user.role === "admin"
    }
    if (role === "conductor") {
      return user.role === "super_admin" || user.role === "admin" || user.role === "conductor"
    }

    return false
  }

  static canAccessOrganization(organizationId: string): boolean {
    const user = this.getCurrentUser()
    if (!user) return false

    // Super admin can access all organizations
    if (user.role === "super_admin") return true

    // Other users can only access their own organization
    return user.organization_id === organizationId
  }

  private static generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  }

  static refreshSession(): void {
    const session = this.getSession()
    if (session) {
      session.expiresAt = Date.now() + this.SESSION_DURATION
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
    }
  }
}
