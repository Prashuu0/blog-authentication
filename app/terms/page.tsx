"use client"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-fade-in-down">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 text-center">Terms & Conditions</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          By using ShopHub, you agree to our terms and conditions. Please read them carefully before shopping with us.
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>All sales are subject to our return and refund policy.</li>
          <li>Do not misuse the platform or engage in fraudulent activity.</li>
          <li>Respect other users and our support team.</li>
          <li>ShopHub reserves the right to update these terms at any time.</li>
        </ul>
        <div className="text-xs text-gray-400 mt-6 text-center">Last updated: July 2024</div>
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