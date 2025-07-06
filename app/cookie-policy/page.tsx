"use client"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-fade-in-down">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-purple-600 bg-clip-text text-transparent mb-4 text-center">Cookie Policy</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          ShopHub uses cookies to enhance your experience. Here's how and why we use them:
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>Essential cookies keep our site secure and working properly.</li>
          <li>We use analytics cookies to understand how you use ShopHub (anonymously).</li>
          <li>We never use cookies to sell your data or track you across other sites.</li>
          <li>You can manage your cookie preferences in your browser settings.</li>
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