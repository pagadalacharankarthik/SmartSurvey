// Demo data interfaces
export interface DemoUser {
  id: string
  email: string
  password: string
  phone?: string
  name: string
  role: "super_admin" | "health_admin" | "education_admin" | "water_admin" | "field_agent" | "survey_specialist"
  organization_id: string
  created_at: string
  last_login?: string
  status: "active" | "inactive" | "suspended"
  avatar?: string
}

export interface DemoOrganization {
  id: string
  name: string
  type: "government" | "ngo" | "private" | "international"
  status: "active" | "inactive" | "pending"
  created_at: string
  contact_email: string
  contact_phone: string
  address: string
  description: string
  logo?: string
}

export interface DemoSurvey {
  id: string
  title: string
  description: string
  organization_id: string
  created_by: string
  status: "draft" | "active" | "completed" | "archived"
  created_at: string
  updated_at: string
  questions: DemoQuestion[]
  responses_count: number
  target_responses: number
  category: "health" | "education" | "water" | "infrastructure" | "social"
}

export interface DemoQuestion {
  id: string
  survey_id: string
  question_text: string
  question_type: "multiple_choice" | "text" | "rating" | "yes_no" | "checkbox"
  options?: string[]
  required: boolean
  order: number
}

export interface DemoResponse {
  id: string
  survey_id: string
  question_id: string
  answer: string | string[]
  respondent_id?: string
  created_at: string
  location?: {
    latitude: number
    longitude: number
    address: string
  }
}

export interface DemoRiskLog {
  id: string
  survey_id: string
  risk_type: "data_quality" | "bias_detection" | "anomaly" | "security" | "compliance"
  severity: "low" | "medium" | "high" | "critical"
  description: string
  detected_at: string
  status: "open" | "investigating" | "resolved" | "false_positive"
  assigned_to?: string
  resolution_notes?: string
}

export interface DemoDocument {
  id: string
  name: string
  type: "pdf" | "doc" | "xlsx" | "image"
  size: number
  uploaded_by: string
  uploaded_at: string
  organization_id: string
  ai_analysis?: {
    summary: string
    key_insights: string[]
    confidence_score: number
    processed_at: string
  }
  tags: string[]
  status: "processing" | "completed" | "failed"
}

export interface DemoAnalytics {
  survey_id: string
  total_responses: number
  completion_rate: number
  average_time: number
  response_trend: Array<{
    date: string
    count: number
  }>
  demographic_breakdown: {
    age_groups: Record<string, number>
    locations: Record<string, number>
    devices: Record<string, number>
  }
}

// Demo data arrays
export const demoUsers: DemoUser[] = [
  {
    id: "1",
    email: "admin@demo.com",
    password: "admin123",
    phone: "+1234567890",
    name: "System Administrator",
    role: "super_admin",
    organization_id: "1",
    created_at: "2024-01-01T00:00:00Z",
    last_login: "2024-01-15T10:30:00Z",
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "2",
    email: "health.admin@demo.com",
    password: "health123",
    phone: "+1234567891",
    name: "Dr. Sarah Johnson",
    role: "health_admin",
    organization_id: "1",
    created_at: "2024-01-02T00:00:00Z",
    last_login: "2024-01-15T09:15:00Z",
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "3",
    email: "edu.admin@demo.com",
    password: "edu123",
    phone: "+1234567892",
    name: "Prof. Michael Chen",
    role: "education_admin",
    organization_id: "2",
    created_at: "2024-01-03T00:00:00Z",
    last_login: "2024-01-14T16:45:00Z",
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "4",
    email: "water.admin@demo.com",
    password: "water123",
    phone: "+1234567893",
    name: "Engineer Lisa Rodriguez",
    role: "water_admin",
    organization_id: "3",
    created_at: "2024-01-04T00:00:00Z",
    last_login: "2024-01-15T08:20:00Z",
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "5",
    email: "conductor1@demo.com",
    password: "conductor123",
    phone: "+1234567894",
    name: "James Wilson",
    role: "field_agent",
    organization_id: "1",
    created_at: "2024-01-05T00:00:00Z",
    last_login: "2024-01-15T07:30:00Z",
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "6",
    email: "conductor2@demo.com",
    password: "conductor123",
    phone: "+1234567895",
    name: "Maria Garcia",
    role: "survey_specialist",
    organization_id: "2",
    created_at: "2024-01-06T00:00:00Z",
    last_login: "2024-01-14T18:00:00Z",
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "7",
    email: "field.agent@demo.com",
    password: "field123",
    phone: "+1234567896",
    name: "David Thompson",
    role: "field_agent",
    organization_id: "3",
    created_at: "2024-01-07T00:00:00Z",
    last_login: "2024-01-15T06:45:00Z",
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "8",
    email: "specialist@demo.com",
    password: "spec123",
    phone: "+1234567897",
    name: "Anna Kowalski",
    role: "survey_specialist",
    organization_id: "4",
    created_at: "2024-01-08T00:00:00Z",
    last_login: "2024-01-14T14:20:00Z",
    status: "active",
    avatar: "/placeholder-user.jpg",
  },
]

export const demoOrganizations: DemoOrganization[] = [
  {
    id: "1",
    name: "Ministry of Health",
    type: "government",
    status: "active",
    created_at: "2024-01-01T00:00:00Z",
    contact_email: "contact@health.gov",
    contact_phone: "+1234567890",
    address: "123 Government Plaza, Capital City",
    description: "National health ministry responsible for public health policies and programs.",
    logo: "/placeholder-logo.png",
  },
  {
    id: "2",
    name: "Education Development Foundation",
    type: "ngo",
    status: "active",
    created_at: "2024-01-02T00:00:00Z",
    contact_email: "info@edf.org",
    contact_phone: "+1234567891",
    address: "456 Education Ave, Learning District",
    description: "Non-profit organization focused on improving educational outcomes.",
    logo: "/placeholder-logo.png",
  },
  {
    id: "3",
    name: "Water Resources Department",
    type: "government",
    status: "active",
    created_at: "2024-01-03T00:00:00Z",
    contact_email: "water@resources.gov",
    contact_phone: "+1234567892",
    address: "789 Water St, Riverside",
    description: "Government department managing water resources and infrastructure.",
    logo: "/placeholder-logo.png",
  },
  {
    id: "4",
    name: "Global Survey Solutions",
    type: "private",
    status: "active",
    created_at: "2024-01-04T00:00:00Z",
    contact_email: "hello@globalsolutions.com",
    contact_phone: "+1234567893",
    address: "321 Business Park, Tech City",
    description: "Private company specializing in survey technology and data analytics.",
    logo: "/placeholder-logo.png",
  },
  {
    id: "5",
    name: "International Development Agency",
    type: "international",
    status: "pending",
    created_at: "2024-01-05T00:00:00Z",
    contact_email: "contact@ida.org",
    contact_phone: "+1234567894",
    address: "555 International Blvd, Global Center",
    description: "International organization supporting development projects worldwide.",
    logo: "/placeholder-logo.png",
  },
]

export const demoSurveys: DemoSurvey[] = [
  {
    id: "1",
    title: "Community Health Assessment 2024",
    description: "Comprehensive survey to assess community health needs and access to healthcare services.",
    organization_id: "1",
    created_by: "2",
    status: "active",
    created_at: "2024-01-10T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    responses_count: 1247,
    target_responses: 2000,
    category: "health",
    questions: [
      {
        id: "1-1",
        survey_id: "1",
        question_text: "How would you rate your overall health?",
        question_type: "rating",
        required: true,
        order: 1,
      },
      {
        id: "1-2",
        survey_id: "1",
        question_text: "Do you have access to healthcare services in your area?",
        question_type: "yes_no",
        required: true,
        order: 2,
      },
      {
        id: "1-3",
        survey_id: "1",
        question_text: "What are the main health challenges in your community?",
        question_type: "checkbox",
        options: ["Lack of doctors", "High costs", "Distance to facilities", "Long wait times", "Other"],
        required: false,
        order: 3,
      },
    ],
  },
  {
    id: "2",
    title: "Educational Quality Survey",
    description: "Survey to evaluate the quality of education and identify areas for improvement.",
    organization_id: "2",
    created_by: "3",
    status: "active",
    created_at: "2024-01-12T00:00:00Z",
    updated_at: "2024-01-14T00:00:00Z",
    responses_count: 856,
    target_responses: 1500,
    category: "education",
    questions: [
      {
        id: "2-1",
        survey_id: "2",
        question_text: "How satisfied are you with the quality of education?",
        question_type: "rating",
        required: true,
        order: 1,
      },
      {
        id: "2-2",
        survey_id: "2",
        question_text: "What is the biggest challenge in education?",
        question_type: "multiple_choice",
        options: ["Teacher shortage", "Lack of resources", "Infrastructure", "Curriculum", "Other"],
        required: true,
        order: 2,
      },
    ],
  },
  {
    id: "3",
    title: "Water Access and Quality Study",
    description: "Assessment of water access, quality, and infrastructure needs in rural communities.",
    organization_id: "3",
    created_by: "4",
    status: "completed",
    created_at: "2024-01-05T00:00:00Z",
    updated_at: "2024-01-13T00:00:00Z",
    responses_count: 2341,
    target_responses: 2000,
    category: "water",
    questions: [
      {
        id: "3-1",
        survey_id: "3",
        question_text: "Do you have access to clean drinking water?",
        question_type: "yes_no",
        required: true,
        order: 1,
      },
      {
        id: "3-2",
        survey_id: "3",
        question_text: "How far is your nearest water source?",
        question_type: "multiple_choice",
        options: ["Less than 100m", "100m-500m", "500m-1km", "More than 1km"],
        required: true,
        order: 2,
      },
    ],
  },
  {
    id: "4",
    title: "Infrastructure Development Priorities",
    description: "Survey to identify community priorities for infrastructure development projects.",
    organization_id: "4",
    created_by: "8",
    status: "draft",
    created_at: "2024-01-14T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
    responses_count: 0,
    target_responses: 1000,
    category: "infrastructure",
    questions: [
      {
        id: "4-1",
        survey_id: "4",
        question_text: "What infrastructure improvement is most needed?",
        question_type: "multiple_choice",
        options: ["Roads", "Electricity", "Internet", "Public transport", "Healthcare facilities"],
        required: true,
        order: 1,
      },
    ],
  },
  {
    id: "5",
    title: "Social Services Evaluation",
    description: "Comprehensive evaluation of social services accessibility and effectiveness.",
    organization_id: "5",
    created_by: "1",
    status: "active",
    created_at: "2024-01-08T00:00:00Z",
    updated_at: "2024-01-12T00:00:00Z",
    responses_count: 432,
    target_responses: 800,
    category: "social",
    questions: [
      {
        id: "5-1",
        survey_id: "5",
        question_text: "How would you rate the social services in your area?",
        question_type: "rating",
        required: true,
        order: 1,
      },
    ],
  },
]

export const demoRiskLogs: DemoRiskLog[] = [
  {
    id: "1",
    survey_id: "1",
    risk_type: "data_quality",
    severity: "medium",
    description: "Detected inconsistent response patterns in health assessment survey",
    detected_at: "2024-01-15T10:30:00Z",
    status: "investigating",
    assigned_to: "2",
  },
  {
    id: "2",
    survey_id: "2",
    risk_type: "bias_detection",
    severity: "high",
    description: "Potential sampling bias detected in education survey responses",
    detected_at: "2024-01-14T15:45:00Z",
    status: "open",
    assigned_to: "3",
  },
  {
    id: "3",
    survey_id: "3",
    risk_type: "anomaly",
    severity: "low",
    description: "Unusual response spike detected in water access survey",
    detected_at: "2024-01-13T09:20:00Z",
    status: "resolved",
    assigned_to: "4",
    resolution_notes: "Spike was due to community outreach event, no action needed",
  },
  {
    id: "4",
    survey_id: "1",
    risk_type: "security",
    severity: "critical",
    description: "Potential data breach attempt detected",
    detected_at: "2024-01-15T14:00:00Z",
    status: "investigating",
    assigned_to: "1",
  },
  {
    id: "5",
    survey_id: "5",
    risk_type: "compliance",
    severity: "medium",
    description: "Survey may not meet international data protection standards",
    detected_at: "2024-01-12T11:30:00Z",
    status: "open",
    assigned_to: "1",
  },
]

export const demoDocuments: DemoDocument[] = [
  {
    id: "1",
    name: "Health Survey Report 2023.pdf",
    type: "pdf",
    size: 2048576,
    uploaded_by: "2",
    uploaded_at: "2024-01-10T00:00:00Z",
    organization_id: "1",
    ai_analysis: {
      summary:
        "Comprehensive health survey report showing improved access to healthcare services but persistent challenges in rural areas.",
      key_insights: [
        "Healthcare access improved by 15% compared to 2022",
        "Rural areas still face significant challenges",
        "Mental health services need expansion",
      ],
      confidence_score: 0.92,
      processed_at: "2024-01-10T01:30:00Z",
    },
    tags: ["health", "annual-report", "2023"],
    status: "completed",
  },
  {
    id: "2",
    name: "Education Statistics.xlsx",
    type: "xlsx",
    size: 1024000,
    uploaded_by: "3",
    uploaded_at: "2024-01-12T00:00:00Z",
    organization_id: "2",
    ai_analysis: {
      summary: "Educational statistics showing enrollment trends and performance metrics across different regions.",
      key_insights: [
        "Primary school enrollment increased by 8%",
        "Gender gap in education continues to narrow",
        "Technology integration in classrooms needs improvement",
      ],
      confidence_score: 0.88,
      processed_at: "2024-01-12T02:15:00Z",
    },
    tags: ["education", "statistics", "enrollment"],
    status: "completed",
  },
  {
    id: "3",
    name: "Water Infrastructure Plan.doc",
    type: "doc",
    size: 512000,
    uploaded_by: "4",
    uploaded_at: "2024-01-14T00:00:00Z",
    organization_id: "3",
    ai_analysis: {
      summary: "Strategic plan for water infrastructure development focusing on rural communities and sustainability.",
      key_insights: [
        "Investment needed in rural water systems",
        "Sustainability measures are crucial",
        "Community involvement is key to success",
      ],
      confidence_score: 0.85,
      processed_at: "2024-01-14T01:45:00Z",
    },
    tags: ["water", "infrastructure", "planning"],
    status: "completed",
  },
  {
    id: "4",
    name: "Survey Methodology Guide.pdf",
    type: "pdf",
    size: 1536000,
    uploaded_by: "8",
    uploaded_at: "2024-01-15T00:00:00Z",
    organization_id: "4",
    tags: ["methodology", "guide", "best-practices"],
    status: "processing",
  },
  {
    id: "5",
    name: "Community Feedback Images.zip",
    type: "image",
    size: 5120000,
    uploaded_by: "5",
    uploaded_at: "2024-01-13T00:00:00Z",
    organization_id: "1",
    ai_analysis: {
      summary: "Collection of community feedback images showing various infrastructure and service conditions.",
      key_insights: [
        "Visual evidence of infrastructure needs",
        "Community engagement is high",
        "Documentation quality varies",
      ],
      confidence_score: 0.76,
      processed_at: "2024-01-13T03:20:00Z",
    },
    tags: ["community", "feedback", "images"],
    status: "completed",
  },
]

// Data store class
export class DemoDataStore {
  private users: DemoUser[] = [...demoUsers]
  private organizations: DemoOrganization[] = [...demoOrganizations]
  private surveys: DemoSurvey[] = [...demoSurveys]
  private riskLogs: DemoRiskLog[] = [...demoRiskLogs]
  private documents: DemoDocument[] = [...demoDocuments]

  // User methods
  getUsers(): DemoUser[] {
    return this.users
  }

  getUserById(id: string): DemoUser | undefined {
    return this.users.find((user) => user.id === id)
  }

  getUserByEmail(email: string): DemoUser | undefined {
    return this.users.find((user) => user.email === email)
  }

  updateUser(id: string, updates: Partial<DemoUser>): DemoUser | null {
    const userIndex = this.users.findIndex((user) => user.id === id)
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updates }
      return this.users[userIndex]
    }
    return null
  }

  getUsersByOrganization(organizationId: string): DemoUser[] {
    return this.users.filter((user) => user.organization_id === organizationId)
  }

  // Organization methods
  getOrganizations(): DemoOrganization[] {
    return this.organizations
  }

  getOrganizationById(id: string): DemoOrganization | undefined {
    return this.organizations.find((org) => org.id === id)
  }

  updateOrganization(id: string, updates: Partial<DemoOrganization>): DemoOrganization | null {
    const orgIndex = this.organizations.findIndex((org) => org.id === id)
    if (orgIndex !== -1) {
      this.organizations[orgIndex] = { ...this.organizations[orgIndex], ...updates }
      return this.organizations[orgIndex]
    }
    return null
  }

  // Survey methods
  getSurveys(): DemoSurvey[] {
    return this.surveys
  }

  getSurveyById(id: string): DemoSurvey | undefined {
    return this.surveys.find((survey) => survey.id === id)
  }

  getSurveysByOrganization(organizationId: string): DemoSurvey[] {
    return this.surveys.filter((survey) => survey.organization_id === organizationId)
  }

  getSurveysByStatus(status: DemoSurvey["status"]): DemoSurvey[] {
    return this.surveys.filter((survey) => survey.status === status)
  }

  updateSurvey(id: string, updates: Partial<DemoSurvey>): DemoSurvey | null {
    const surveyIndex = this.surveys.findIndex((survey) => survey.id === id)
    if (surveyIndex !== -1) {
      this.surveys[surveyIndex] = { ...this.surveys[surveyIndex], ...updates }
      return this.surveys[surveyIndex]
    }
    return null
  }

  // Risk log methods
  getRiskLogs(): DemoRiskLog[] {
    return this.riskLogs
  }

  getRiskLogsBySurvey(surveyId: string): DemoRiskLog[] {
    return this.riskLogs.filter((log) => log.survey_id === surveyId)
  }

  getRiskLogsBySeverity(severity: DemoRiskLog["severity"]): DemoRiskLog[] {
    return this.riskLogs.filter((log) => log.severity === severity)
  }

  getRiskLogsByStatus(status: DemoRiskLog["status"]): DemoRiskLog[] {
    return this.riskLogs.filter((log) => log.status === status)
  }

  updateRiskLog(id: string, updates: Partial<DemoRiskLog>): DemoRiskLog | null {
    const logIndex = this.riskLogs.findIndex((log) => log.id === id)
    if (logIndex !== -1) {
      this.riskLogs[logIndex] = { ...this.riskLogs[logIndex], ...updates }
      return this.riskLogs[logIndex]
    }
    return null
  }

  // Document methods
  getDocuments(): DemoDocument[] {
    return this.documents
  }

  getDocumentById(id: string): DemoDocument | undefined {
    return this.documents.find((doc) => doc.id === id)
  }

  getDocumentsByOrganization(organizationId: string): DemoDocument[] {
    return this.documents.filter((doc) => doc.organization_id === organizationId)
  }

  getDocumentsByStatus(status: DemoDocument["status"]): DemoDocument[] {
    return this.documents.filter((doc) => doc.status === status)
  }

  updateDocument(id: string, updates: Partial<DemoDocument>): DemoDocument | null {
    const docIndex = this.documents.findIndex((doc) => doc.id === id)
    if (docIndex !== -1) {
      this.documents[docIndex] = { ...this.documents[docIndex], ...updates }
      return this.documents[docIndex]
    }
    return null
  }

  // Analytics and statistics
  getSystemStats() {
    return {
      totalUsers: this.users.length,
      activeUsers: this.users.filter((u) => u.status === "active").length,
      totalOrganizations: this.organizations.length,
      activeOrganizations: this.organizations.filter((o) => o.status === "active").length,
      totalSurveys: this.surveys.length,
      activeSurveys: this.surveys.filter((s) => s.status === "active").length,
      totalResponses: this.surveys.reduce((sum, s) => sum + s.responses_count, 0),
      openRisks: this.riskLogs.filter((r) => r.status === "open").length,
      criticalRisks: this.riskLogs.filter((r) => r.severity === "critical").length,
      documentsProcessed: this.documents.filter((d) => d.status === "completed").length,
    }
  }

  getSurveyStats(surveyId: string) {
    const survey = this.getSurveyById(surveyId)
    if (!survey) return null

    const risks = this.getRiskLogsBySurvey(surveyId)
    const organization = this.getOrganizationById(survey.organization_id)
    const creator = this.getUserById(survey.created_by)

    return {
      survey,
      organization,
      creator,
      risks,
      completionRate: (survey.responses_count / survey.target_responses) * 100,
      riskCount: risks.length,
      openRisks: risks.filter((r) => r.status === "open").length,
    }
  }

  getOrganizationStats(organizationId: string) {
    const organization = this.getOrganizationById(organizationId)
    if (!organization) return null

    const users = this.getUsersByOrganization(organizationId)
    const surveys = this.getSurveysByOrganization(organizationId)
    const documents = this.getDocumentsByOrganization(organizationId)

    return {
      organization,
      userCount: users.length,
      activeUsers: users.filter((u) => u.status === "active").length,
      surveyCount: surveys.length,
      activeSurveys: surveys.filter((s) => s.status === "active").length,
      totalResponses: surveys.reduce((sum, s) => sum + s.responses_count, 0),
      documentCount: documents.length,
      processedDocuments: documents.filter((d) => d.status === "completed").length,
    }
  }
}

// Export singleton instance
export const demoDataStore = new DemoDataStore()

// Export individual data arrays for direct access;
