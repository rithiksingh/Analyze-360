"use client"

import { useState } from "react"
import HomePage from "./HomePage"
import Navigation from "./Navigation"
import Footer from "./Footer"
import App from "./App" // Your existing App.tsx component

type Page = "home" | "research"

function MainApp() {
  const [currentPage, setCurrentPage] = useState<Page>("home")

  const navigateToHome = () => setCurrentPage("home")
  const navigateToResearch = () => setCurrentPage("research")

  return (
    <div className="min-h-screen">
      <Navigation
        currentPage={currentPage}
        onNavigateToHome={navigateToHome}
        onNavigateToResearch={navigateToResearch}
      />

      <main className="pt-16">
        {currentPage === "home" && <HomePage onNavigateToResearch={navigateToResearch} />}
        {currentPage === "research" && <App />}
      </main>

      <Footer />
    </div>
  )
}

export default MainApp
