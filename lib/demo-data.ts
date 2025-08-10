export interface DemoUser {
  id: string
  email: string
  password: string
  name: string
  role: "super_admin" | "admin" | "conductor"
  organization_id: string
  phone?: string
  status: "active" | "pending" | "suspended"
  created_at: string
  last_login?: string
}

export interface DemoOrganization {
  id: string
  name: string
  type: "government" | "ngo" | "private" | "academic"
  status: "active" | "pending" | "suspended"
  contact_email: string
  phone?: string
  address?: string
  created_at: string
  user_count: number
}

export interface DemoSurvey {
  id: string
  title: string
  description: string
  organization_id: string
  created_by: string
  status: "draft" | "active" | "completed" | "archived"
  questions: DemoQuestion[]
  responses_count: number
  created_at: string
  updated_at: string
  target_responses: number
  category: "health" | "education" | "water" | "infrastructure" | "social"
}

export interface DemoQuestion {
  id: string
  survey_id: string
  question_text: string
  question_type: "text" | "multiple_choice" | "rating" | "boolean" | "number"
  options?: string[]
  required: boolean
  order: number
}

export interface DemoResponse {
  id: string
  survey_id: string
  question_id: string
  answer: string
  respondent_id: string
  created_at: string
  location?: {
    latitude: number
    longitude: number
    address: string
  }
}

export interface DemoRiskLog {
  id: string
  type: "fraud_detection" | "data_quality" | "security" | "compliance"
  severity: "low" | "medium" | "high" | "critical"
  message: string
  details: any
  survey_id?: string
  user_id?: string
  created_at: string
  resolved: boolean
  resolved_at?: string
  resolved_by?: string
}

export interface DemoDocument {
  id: string
  name: string
  type: string
  size: number
  uploaded_by: string
  organization_id: string
  survey_id?: string
  status: "processing" | "completed" | "failed"
  ai_analysis?: {
    summary: string
    key_points: string[]
    sentiment: "positive" | "neutral" | "negative"
    confidence: number
  }
  created_at: string
}

// Demo Organizations
export const demoOrganizations: DemoOrganization[] = [
  {
    id: "org-1",
    name: "Ministry of Health",
    type: "government",
    status: "active",
    contact_email: "contact@health.gov",
    phone: "+1-555-0101",
    address: "123 Government Plaza, Capital City",
    created_at: "2024-01-15T08:00:00Z",
    user_count: 25,
  },
  {
    id: "org-2",
    name: "Education Development Foundation",
    type: "ngo",
    status: "active",
    contact_email: "info@edf.org",
    phone: "+1-555-0102",
    address: "456 NGO Street, Metro City",
    created_at: "2024-01-20T09:00:00Z",
    user_count: 18,
  },
  {
    id: "org-3",
    name: "Water Resources Department",
    type: "government",
    status: "active",
    contact_email: "water@gov.dept",
    phone: "+1-555-0103",
    address: "789 Water Works Ave, River City",
    created_at: "2024-02-01T10:00:00Z",
    user_count: 12,
  },
  {
    id: "org-4",
    name: "Community Research Institute",
    type: "academic",
    status: "pending",
    contact_email: "research@cri.edu",
    phone: "+1-555-0104",
    address: "321 University Blvd, College Town",
    created_at: "2024-02-15T11:00:00Z",
    user_count: 8,
  },
  {
    id: "org-5",
    name: "DataTech Solutions",
    type: "private",
    status: "active",
    contact_email: "contact@datatech.com",
    phone: "+1-555-0105",
    address: "654 Tech Park, Innovation City",
    created_at: "2024-02-20T12:00:00Z",
    user_count: 15,
  },
]

// Demo Users
export const demoUsers: DemoUser[] = [
  {
    id: "user-1",
    email: "admin@demo.com",
    password: "admin123",
    name: "System Administrator",
    role: "super_admin",
    organization_id: "org-1",
    phone: "+1-555-1001",
    status: "active",
    created_at: "2024-01-01T00:00:00Z",
    last_login: "2024-03-15T14:30:00Z",
  },
  {
    id: "user-2",
    email: "health.admin@demo.com",
    password: "health123",
    name: "Dr. Sarah Johnson",
    role: "admin",
    organization_id: "org-1",
    phone: "+1-555-1002",
    status: "active",
    created_at: "2024-01-15T08:00:00Z",
    last_login: "2024-03-15T10:15:00Z",
  },
  {
    id: "user-3",
    email: "edu.admin@demo.com",
    password: "edu123",
    name: "Prof. Michael Chen",
    role: "admin",
    organization_id: "org-2",
    phone: "+1-555-1003",
    status: "active",
    created_at: "2024-01-20T09:00:00Z",
    last_login: "2024-03-14T16:45:00Z",
  },
  {
    id: "user-4",
    email: "water.admin@demo.com",
    password: "water123",
    name: "Engineer Lisa Rodriguez",
    role: "admin",
    organization_id: "org-3",
    phone: "+1-555-1004",
    status: "active",
    created_at: "2024-02-01T10:00:00Z",
    last_login: "2024-03-15T09:20:00Z",
  },
  {
    id: "user-5",
    email: "conductor1@demo.com",
    password: "conductor123",
    name: "Field Agent John Smith",
    role: "conductor",
    organization_id: "org-1",
    phone: "+1-555-1005",
    status: "active",
    created_at: "2024-02-10T11:00:00Z",
    last_login: "2024-03-15T13:10:00Z",
  },
  {
    id: "user-6",
    email: "conductor2@demo.com",
    password: "conductor123",
    name: "Survey Specialist Emma Davis",
    role: "conductor",
    organization_id: "org-2",
    phone: "+1-555-1006",
    status: "active",
    created_at: "2024-02-15T12:00:00Z",
    last_login: "2024-03-15T11:30:00Z",
  },
  {
    id: "user-7",
    email: "pending.user@demo.com",
    password: "pending123",
    name: "New User Pending",
    role: "conductor",
    organization_id: "org-4",
    phone: "+1-555-1007",
    status: "pending",
    created_at: "2024-03-01T13:00:00Z",
  },
  {
    id: "user-8",
    email: "suspended.user@demo.com",
    password: "suspended123",
    name: "Suspended User",
    role: "conductor",
    organization_id: "org-5",
    phone: "+1-555-1008",
    status: "suspended",
    created_at: "2024-02-25T14:00:00Z",
    last_login: "2024-03-10T15:00:00Z",
  },
]

// Demo Surveys
export const demoSurveys: DemoSurvey[] = [
  {
    id: "survey-1",
    title: "Community Health Assessment 2024",
    description: "Comprehensive health survey to assess community health needs and access to healthcare services.",
    organization_id: "org-1",
    created_by: "user-2",
    status: "active",
    responses_count: 1247,
    target_responses: 2000,
    category: "health",
    created_at: "2024-02-01T10:00:00Z",
    updated_at: "2024-03-15T14:30:00Z",
    questions: [
      {
        id: "q1-1",
        survey_id: "survey-1",
        question_text: "How would you rate your overall health?",
        question_type: "rating",
        options: ["1", "2", "3", "4", "5"],
        required: true,
        order: 1,
      },
      {
        id: "q1-2",
        survey_id: "survey-1",
        question_text: "Do you have access to a healthcare facility within 10km?",
        question_type: "boolean",
        required: true,
        order: 2,
      },
      {
        id: "q1-3",
        survey_id: "survey-1",
        question_text: "What is your primary health concern?",
        question_type: "multiple_choice",
        options: [
          "Chronic diseases",
          "Mental health",
          "Infectious diseases",
          "Maternal health",
          "Child health",
          "Other",
        ],
        required: false,
        order: 3,
      },
    ],
  },
  {
    id: "survey-2",
    title: "Digital Literacy Assessment",
    description: "Survey to evaluate digital literacy levels and technology access in educational institutions.",
    organization_id: "org-2",
    created_by: "user-3",
    status: "active",
    responses_count: 892,
    target_responses: 1500,
    category: "education",
    created_at: "2024-02-15T09:00:00Z",
    updated_at: "2024-03-14T16:45:00Z",
    questions: [
      {
        id: "q2-1",
        survey_id: "survey-2",
        question_text: "How comfortable are you with using computers?",
        question_type: "rating",
        options: ["1", "2", "3", "4", "5"],
        required: true,
        order: 1,
      },
      {
        id: "q2-2",
        survey_id: "survey-2",
        question_text: "Do you have internet access at home?",
        question_type: "boolean",
        required: true,
        order: 2,
      },
    ],
  },
  {
    id: "survey-3",
    title: "Water Quality Monitoring",
    description: "Assessment of water quality and access in rural communities.",
    organization_id: "org-3",
    created_by: "user-4",
    status: "active",
    responses_count: 634,
    target_responses: 1000,
    category: "water",
    created_at: "2024-03-01T11:00:00Z",
    updated_at: "2024-03-15T09:20:00Z",
    questions: [
      {
        id: "q3-1",
        survey_id: "survey-3",
        question_text: "What is your primary source of drinking water?",
        question_type: "multiple_choice",
        options: ["Tap water", "Well water", "Bottled water", "River/stream", "Rainwater", "Other"],
        required: true,
        order: 1,
      },
      {
        id: "q3-2",
        survey_id: "survey-3",
        question_text: "How would you rate the quality of your drinking water?",
        question_type: "rating",
        options: ["1", "2", "3", "4", "5"],
        required: true,
        order: 2,
      },
    ],
  },
  {
    id: "survey-4",
    title: "Infrastructure Development Needs",
    description: "Community survey to identify priority infrastructure development projects.",
    organization_id: "org-4",
    created_by: "user-7",
    status: "draft",
    responses_count: 0,
    target_responses: 800,
    category: "infrastructure",
    created_at: "2024-03-10T12:00:00Z",
    updated_at: "2024-03-10T12:00:00Z",
    questions: [
      {
        id: "q4-1",
        survey_id: "survey-4",
        question_text: "What infrastructure improvement is most needed in your area?",
        question_type: "multiple_choice",
        options: [
          "Roads",
          "Electricity",
          "Water supply",
          "Internet connectivity",
          "Public transport",
          "Healthcare facilities",
        ],
        required: true,
        order: 1,
      },
    ],
  },
  {
    id: "survey-5",
    title: "Social Impact Assessment",
    description: "Evaluation of social programs and community development initiatives.",
    organization_id: "org-5",
    created_by: "user-8",
    status: "completed",
    responses_count: 1856,
    target_responses: 1500,
    category: "social",
    created_at: "2024-01-15T08:00:00Z",
    updated_at: "2024-02-28T17:00:00Z",
    questions: [
      {
        id: "q5-1",
        survey_id: "survey-5",
        question_text: "How satisfied are you with community services?",
        question_type: "rating",
        options: ["1", "2", "3", "4", "5"],
        required: true,
        order: 1,
      },
    ],
  },
]

// Demo Risk Logs
export const demoRiskLogs: DemoRiskLog[] = [
  {
    id: "risk-1",
    type: "fraud_detection",
    severity: "high",
    message: "Suspicious response pattern detected",
    details: {
      pattern: "Multiple identical responses from different locations",
      affected_responses: 15,
      confidence: 0.87,
    },
    survey_id: "survey-1",
    user_id: "user-5",
    created_at: "2024-03-15T10:30:00Z",
    resolved: false,
  },
  {
    id: "risk-2",
    type: "data_quality",
    severity: "medium",
    message: "Incomplete response rate detected",
    details: {
      completion_rate: 0.65,
      expected_rate: 0.85,
      affected_questions: ["q2-3", "q2-4"],
    },
    survey_id: "survey-2",
    created_at: "2024-03-14T15:20:00Z",
    resolved: true,
    resolved_at: "2024-03-15T09:00:00Z",
    resolved_by: "user-3",
  },
  {
    id: "risk-3",
    type: "security",
    severity: "critical",
    message: "Unauthorized access attempt",
    details: {
      ip_address: "192.168.1.100",
      attempted_actions: ["user_creation", "data_export"],
      blocked: true,
    },
    user_id: "user-8",
    created_at: "2024-03-13T22:15:00Z",
    resolved: true,
    resolved_at: "2024-03-14T08:00:00Z",
    resolved_by: "user-1",
  },
  {
    id: "risk-4",
    type: "compliance",
    severity: "low",
    message: "Data retention policy reminder",
    details: {
      surveys_affected: ["survey-5"],
      retention_deadline: "2024-04-15",
      action_required: "Archive or delete",
    },
    created_at: "2024-03-12T09:00:00Z",
    resolved: false,
  },
]

// Demo Documents
export const demoDocuments: DemoDocument[] = [
  {
    id: "doc-1",
    name: "Health Survey Guidelines.pdf",
    type: "application/pdf",
    size: 2048576,
    uploaded_by: "user-2",
    organization_id: "org-1",
    survey_id: "survey-1",
    status: "completed",
    ai_analysis: {
      summary: "Comprehensive guidelines for conducting health surveys in rural communities.",
      key_points: [
        "Emphasis on cultural sensitivity",
        "Standardized data collection protocols",
        "Quality assurance measures",
      ],
      sentiment: "positive",
      confidence: 0.92,
    },
    created_at: "2024-02-01T10:00:00Z",
  },
  {
    id: "doc-2",
    name: "Education Assessment Report.docx",
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 1536000,
    uploaded_by: "user-3",
    organization_id: "org-2",
    survey_id: "survey-2",
    status: "completed",
    ai_analysis: {
      summary: "Analysis of digital literacy gaps in educational institutions.",
      key_points: [
        "Significant urban-rural divide",
        "Need for teacher training programs",
        "Infrastructure limitations",
      ],
      sentiment: "neutral",
      confidence: 0.88,
    },
    created_at: "2024-02-15T09:30:00Z",
  },
  {
    id: "doc-3",
    name: "Water Quality Standards.xlsx",
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 512000,
    uploaded_by: "user-4",
    organization_id: "org-3",
    status: "processing",
    created_at: "2024-03-15T14:00:00Z",
  },
]

// Analytics Data
export const demoAnalytics = {
  totalSurveys: demoSurveys.length,
  activeSurveys: demoSurveys.filter((s) => s.status === "active").length,
  totalResponses: demoSurveys.reduce((sum, s) => sum + s.responses_count, 0),
  totalUsers: demoUsers.length,
  activeUsers: demoUsers.filter((u) => u.status === "active").length,
  totalOrganizations: demoOrganizations.length,
  activeOrganizations: demoOrganizations.filter((o) => o.status === "active").length,
  riskAlerts: demoRiskLogs.filter((r) => !r.resolved).length,
  criticalRisks: demoRiskLogs.filter((r) => r.severity === "critical" && !r.resolved).length,
  documentsProcessed: demoDocuments.filter((d) => d.status === "completed").length,
  responsesByCategory: {
    health: 1247,
    education: 892,
    water: 634,
    infrastructure: 0,
    social: 1856,
  },
  responsesTrend: [
    { date: "2024-03-01", responses: 3245 },
    { date: "2024-03-02", responses: 3312 },
    { date: "2024-03-03", responses: 3456 },
    { date: "2024-03-04", responses: 3523 },
    { date: "2024-03-05", responses: 3687 },
    { date: "2024-03-06", responses: 3789 },
    { date: "2024-03-07", responses: 3892 },
    { date: "2024-03-08", responses: 4012 },
    { date: "2024-03-09", responses: 4156 },
    { date: "2024-03-10", responses: 4234 },
    { date: "2024-03-11", responses: 4367 },
    { date: "2024-03-12", responses: 4445 },
    { date: "2024-03-13", responses: 4523 },
    { date: "2024-03-14", responses: 4612 },
    { date: "2024-03-15", responses: 4629 },
  ],
}
