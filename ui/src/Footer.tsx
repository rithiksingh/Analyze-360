import { Github, Twitter, Linkedin, Mail } from "lucide-react"

function Footer() {
  const glassStyle =
    "backdrop-filter backdrop-blur-xl bg-gradient-to-br from-white/20 via-white/15 to-white/20 border border-white/30 shadow-2xl"

  return (
    <footer>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-sky-600">
              Analyze360
            </div>
            <p className="text-gray-600 leading-relaxed">
              Automated business intelligence at your fingertips. Transform any company name into comprehensive market
              research.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/rithiksingh/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-600 transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@analyze360.com"
                className="text-gray-500 hover:text-emerald-600 transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Product</h3>
            <div className="space-y-2">
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                Research Tool
              </button>
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                Features
              </button>
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                Pricing
              </button>
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">API</button>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Company</h3>
            <div className="space-y-2">
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                About Us
              </button>
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                Blog
              </button>
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                Careers
              </button>
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                Contact
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Support</h3>
            <div className="space-y-2">
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                Help Center
              </button>
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                Documentation
              </button>
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                Privacy Policy
              </button>
              <button className="block text-gray-600 hover:text-emerald-600 transition-colors duration-300">
                Terms of Service
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">© 2024 Analyze360. All rights reserved.</p>
            <p className="text-gray-600 text-sm mt-4 md:mt-0">Built with ❤️ for better business intelligence</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
