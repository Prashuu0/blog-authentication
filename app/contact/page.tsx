"use client"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-fade-in-down">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 text-center">Contact Us</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Have a question, feedback, or need help? Our team is here for you! Reach out anytime — we usually reply within 24 hours.
        </p>
        <div className="text-center mb-6">
          <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-2 rounded-full shadow">support@shophub.com</span>
        </div>
        <form className="space-y-4">
          <div>
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300" />
          </div>
          <div>
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300" />
          </div>
          <div>
            <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300" />
          </div>
          <button type="button" className="w-full py-3 rounded-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-lg">Send Message</button>
        </form>
      </div>
      <style jsx>{`
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out;
        }
      `}</style>
    </div>
  )
} 