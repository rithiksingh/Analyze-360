"use client"

import { useState, useEffect } from "react"
import { Search, Zap, Globe, ArrowRight, Sparkles, Building2, BarChart3, FileText } from "lucide-react"

// Floating Particles Component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; size: number; duration: number }>
  >([])

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-emerald-300/20 to-sky-300/20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite alternate`,
          }}
        />
      ))}
    </div>
  )
}

interface HomePageProps {
  onNavigateToResearch: () => void
}

function HomePage({ onNavigateToResearch }: HomePageProps) {
  const glassStyle =
    "backdrop-filter backdrop-blur-xl bg-gradient-to-br from-white/20 via-white/15 to-white/20 border border-white/30 shadow-2xl"
  const glassCardStyle = `${glassStyle} rounded-3xl p-8 transition-all duration-500 hover:shadow-3xl hover:scale-[1.02] hover:border-white/40`
  const glassButtonStyle =
    "group relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 via-sky-500 to-indigo-500 px-12 py-6 text-xl font-semibold text-white shadow-2xl hover:shadow-emerald-500/50 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 focus:ring-offset-2 focus:ring-offset-white transition-all duration-300 hover:scale-105 hover:shadow-3xl overflow-hidden"

  const features = [
    {
      icon: <Search className="h-8 w-8" />,
      title: "Intelligent Research",
      description: "AI-powered queries generate comprehensive business intelligence across multiple data sources.",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Real-time Analytics",
      description: "Live progress tracking with detailed insights into company, industry, financial, and news data.",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Comprehensive Reports",
      description: "Detailed markdown reports with downloadable PDF exports for professional presentations.",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Advanced WebSocket technology ensures real-time updates and rapid research completion.",
    },
  ]

  const stats = [
    { number: "10K+", label: "Companies Analyzed" },
    { number: "50+", label: "Data Sources" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "< 5min", label: "Average Analysis Time" },
  ]

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-slate-50 via-white via-blue-50 to-slate-100 overflow-hidden">
      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Animated background gradients */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-sky-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-violet-300/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section with Video Background */}
        <section className="relative min-h-screen flex items-center justify-center px-8 overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute w-full h-full object-cover"
              style={{ filter: "brightness(0.9)" }}
            >
              <source src="/background-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="max-w-6xl mx-auto text-center space-y-12 relative z-20">
            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400 animate-fade-in">
                Analyze360
              </h1>
              <p className="text-2xl md:text-3xl text-white font-light leading-relaxed max-w-4xl mx-auto">
                Automated business intelligence at your fingertips
              </p>
              <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Transform any company name into comprehensive market research with AI-powered analysis, real-time data
                enrichment, and professional reporting.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button onClick={onNavigateToResearch} className={glassButtonStyle}>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center">
                  <Sparkles className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                  Try Now - Free
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>

              <button
                className={`${glassStyle} rounded-2xl px-8 py-6 text-lg font-medium text-white hover:text-white transition-all duration-300 hover:scale-105 border-2 border-white/40 hover:border-white/60`}
              >
                <Globe className="mr-3 h-5 w-5 inline" />
                View Demo
              </button>
            </div>

            {/* Stats */}
            <div className={`${glassCardStyle} mt-16 bg-white/10`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-200 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-8 bg-gradient-to-br from-slate-50 via-white via-blue-50 to-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600 mb-6">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Everything you need to conduct comprehensive business research and competitive analysis
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`${glassCardStyle} group relative overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-sky-400/5 to-indigo-400/5 group-hover:from-emerald-400/10 group-hover:via-sky-400/10 group-hover:to-indigo-400/10 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-sky-500/20 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 ml-4">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-8 bg-gradient-to-br from-slate-50 via-white via-blue-50 to-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600 mb-6">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Simple, fast, and comprehensive business research in just a few steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: <Building2 className="h-8 w-8" />,
                  title: "Enter Company Details",
                  description:
                    "Simply input the company name and any additional details like website, location, or industry.",
                },
                {
                  step: "02",
                  icon: <Search className="h-8 w-8" />,
                  title: "AI Research Process",
                  description:
                    "Our AI generates targeted queries and searches across multiple data sources for comprehensive insights.",
                },
                {
                  step: "03",
                  icon: <FileText className="h-8 w-8" />,
                  title: "Get Detailed Report",
                  description:
                    "Receive a professional report with company analysis, industry insights, and financial data in minutes.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`${glassCardStyle} text-center group relative overflow-hidden`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400/5 via-indigo-400/5 to-violet-400/5 group-hover:from-sky-400/10 group-hover:via-indigo-400/10 group-hover:to-violet-400/10 transition-all duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500/30 to-indigo-500/30 mb-6">
                      {step.step}
                    </div>
                    <div className="flex justify-center mb-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-600 group-hover:scale-110 transition-transform duration-300">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8 bg-gradient-to-br from-slate-50 via-white via-blue-50 to-slate-100">
          <div className="max-w-4xl mx-auto">
            <div className={`${glassCardStyle} text-center relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-sky-400/10 to-indigo-400/10 animate-pulse"></div>
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600 mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Join thousands of businesses using Analyze360 for comprehensive market research and competitive
                  intelligence.
                </p>
                <button onClick={onNavigateToResearch} className={glassButtonStyle}>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-indigo-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 flex items-center">
                    <Zap className="mr-3 h-6 w-6 group-hover:animate-pulse" />
                    Start Your Research
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Custom styles for animations */}
      <style>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          100% { transform: translateY(-20px) translateX(10px); }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  )
}

export default HomePage
