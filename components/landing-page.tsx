"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Shield,
  Users,
  Globe,
  Smartphone,
  Brain,
  CheckCircle,
  ArrowRight,
  Star,
  Zap,
  Database,
  Lock,
} from "lucide-react"
import Link from "next/link"
import { DemoBanner } from "@/components/demo-banner"

export function LandingPage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI processes documents and detects patterns in survey responses automatically.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-600" />,
      title: "Mobile-First Design",
      description: "Optimized for field data collection with offline capabilities and real-time sync.",
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "Risk Detection",
      description: "Built-in fraud detection and data quality monitoring with real-time alerts.",
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-purple-600" />,
      title: "Advanced Analytics",
      description: "Comprehensive dashboards with real-time insights and customizable reports.",
    },
    {
      icon: <Users className="h-8 w-8 text-orange-600" />,
      title: "Multi-Organization",
      description: "Support for multiple organizations with role-based access control.",
    },
    {
      icon: <Globe className="h-8 w-8 text-cyan-600" />,
      title: "Multi-Channel Distribution",
      description: "Deploy surveys across web, mobile, SMS, and social media platforms.",
    },
  ]

  const demoHighlights = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Instant Access",
      description: "No setup required - start exploring immediately",
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: "Rich Demo Data",
      description: "Pre-loaded with realistic survey data and analytics",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Secure & Private",
      description: "All data stored locally in your browser",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Health Administrator",
      organization: "Ministry of Health",
      content:
        "The AI-powered document analysis has revolutionized how we process health surveys. What used to take weeks now takes hours.",
      rating: 5,
    },
    {
      name: "Prof. Michael Chen",
      role: "Education Researcher",
      organization: "Education Development Foundation",
      content:
        "The offline capabilities are game-changing for rural education assessments. Field teams can work anywhere.",
      rating: 5,
    },
    {
      name: "Engineer Lisa Rodriguez",
      role: "Water Resources Manager",
      organization: "Water Resources Department",
      content: "Risk detection caught data inconsistencies we would have missed. The quality assurance is outstanding.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <DemoBanner />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            🚀 Demo Mode - Full Featured Experience
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Smart Survey Tool
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            AI-Powered Survey Data Collection Platform
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Experience the complete survey platform with advanced AI analysis, risk detection, and multi-organization
            management - all running in demo mode with comprehensive test data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth/login">
              <Button size="lg" className="text-lg px-8 py-3">
                Try Demo Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
              View Features
            </Button>
          </div>

          {/* Demo Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {demoHighlights.map((highlight, index) => (
              <Card key={index} className="border-2 border-blue-100 dark:border-blue-800">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">{highlight.icon}</div>
                  </div>
                  <h3 className="font-semibold mb-2">{highlight.title}</h3>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need for comprehensive survey data collection and analysis
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Users Say</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Trusted by organizations worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white dark:bg-gray-900">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm text-gray-400">{testimonial.organization}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Explore the full platform with our comprehensive demo. No registration required.
          </p>

          <div className="space-y-4">
            <Link href="/auth/login">
              <Button size="lg" className="text-lg px-12 py-4">
                Start Demo Experience
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500">
              ✨ Includes 6 demo accounts, 5 organizations, and comprehensive survey data
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Smart Survey Tool</h3>
              <p className="text-gray-400">
                AI-powered survey platform for comprehensive data collection and analysis.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>AI Document Processing</li>
                <li>Risk Detection</li>
                <li>Mobile Data Collection</li>
                <li>Advanced Analytics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Demo Accounts</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Super Admin</li>
                <li>Organization Admins</li>
                <li>Survey Conductors</li>
                <li>Field Agents</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Demo Mode</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <CheckCircle className="inline h-4 w-4 mr-2" />
                  No Setup Required
                </li>
                <li>
                  <CheckCircle className="inline h-4 w-4 mr-2" />
                  Full Feature Access
                </li>
                <li>
                  <CheckCircle className="inline h-4 w-4 mr-2" />
                  Secure Local Storage
                </li>
                <li>
                  <CheckCircle className="inline h-4 w-4 mr-2" />
                  Rich Test Data
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Smart Survey Tool - Demo Mode. All features available for testing.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
