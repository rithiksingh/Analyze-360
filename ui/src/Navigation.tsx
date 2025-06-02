"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

interface NavigationProps {
  currentPage: "home" | "research"
  onNavigateToHome: () => void
  onNavigateToResearch: () => void
}

export default function Navigation({
  currentPage,
  onNavigateToHome,
  onNavigateToResearch,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-black/30 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button onClick={onNavigateToHome} className="flex items-center">
            <div className="text-2xl font-bold text-white">
              Analyze360
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={onNavigateToHome}
              className={`font-medium transition-colors duration-200 ${
                currentPage === "home"
                  ? "text-gray-200"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Home
            </button>
            <button
              onClick={onNavigateToResearch}
              className={`font-medium transition-colors duration-200 ${
                currentPage === "research"
                  ? "text-gray-200"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Research
            </button>
            <button className="font-medium text-white hover:text-gray-200 transition-colors duration-200">
              About
            </button>
            <button className="font-medium text-white hover:text-gray-200 transition-colors duration-200">
              Contact
            </button>
            <button
              onClick={onNavigateToResearch}
              className="font-medium text-white hover:text-gray-200 transition-colors duration-200"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/30 backdrop-blur-sm shadow-md">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <button
                onClick={() => {
                  onNavigateToHome()
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left py-2 font-medium transition-colors duration-200 ${
                  currentPage === "home"
                    ? "text-gray-200"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigateToResearch()
                  setIsMenuOpen(false)
                }}
                className={`block w-full text-left py-2 font-medium transition-colors duration-200 ${
                  currentPage === "research"
                    ? "text-gray-200"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Research
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left py-2 font-medium text-white hover:text-gray-200 transition-colors duration-200"
              >
                About
              </button>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left py-2 font-medium text-white hover:text-gray-200 transition-colors duration-200"
              >
                Contact
              </button>
              <button
                onClick={() => {
                  onNavigateToResearch()
                  setIsMenuOpen(false)
                }}
                className="block w-full text-left py-2 font-medium text-white hover:text-gray-200 transition-colors duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
