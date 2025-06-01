"use client"

import { useState } from "react"
import { Github, Menu, X } from "lucide-react"

interface NavigationProps {
  currentPage: "home" | "research"
  onNavigateToHome: () => void
  onNavigateToResearch: () => void
}

function Navigation({ currentPage, onNavigateToHome, onNavigateToResearch }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const glassStyle = "bg-white/90 border-b border-gray-200 shadow-md";



  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${glassStyle} border-b border-white/20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={onNavigateToHome} className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600 group-hover:from-emerald-500 group-hover:to-sky-500 transition-all duration-300">
              Analyze360
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={onNavigateToHome}
              className={`transition-colors duration-300 font-medium ${
                currentPage === "home" ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              Home
            </button>
            <button
              onClick={onNavigateToResearch}
              className={`transition-colors duration-300 font-medium ${
                currentPage === "research" ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
              }`}
            >
              Research
            </button>
            <button className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium">
              About
            </button>
            <button className="text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium">
              Contact
            </button>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/rithiksingh/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-500 hover:text-gray-700 transition-all duration-300 ${glassStyle} p-2 rounded-xl hover:scale-110 hover:shadow-lg group`}
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5 group-hover:animate-pulse" />
            </a>
            <button
              onClick={onNavigateToResearch}
              className="bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:from-emerald-400 hover:to-sky-400 transition-all duration-300 rounded-xl px-6 py-2 font-medium hover:scale-105 shadow-lg hover:shadow-emerald-500/30"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-emerald-600 p-2">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className={`${glassStyle} rounded-2xl m-4 p-6 space-y-4`}>
              <button
                onClick={() => {
                  onNavigateToHome()
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left py-2 font-medium transition-colors duration-300 ${
                  currentPage === "home" ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigateToResearch()
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left py-2 font-medium transition-colors duration-300 ${
                  currentPage === "research" ? "text-emerald-600" : "text-gray-700 hover:text-emerald-600"
                }`}
              >
                Research
              </button>
              <button className="block w-full text-left text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium py-2">
                About
              </button>
              <button className="block w-full text-left text-gray-700 hover:text-emerald-600 transition-colors duration-300 font-medium py-2">
                Contact
              </button>
              <div className="pt-4 border-t border-white/20">
                <button
                  onClick={() => {
                    onNavigateToResearch()
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:from-emerald-400 hover:to-sky-400 transition-all duration-300 rounded-xl py-3 font-medium"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
