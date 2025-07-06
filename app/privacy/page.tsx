"use client"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-fade-in-down">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 text-center">Privacy Policy</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Your privacy is important to us. ShopHub is committed to protecting your data and providing a safe, secure shopping experience.
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li>We never share your personal information with third parties without your consent.</li>
          <li>All payment data is encrypted and processed securely.</li>
          <li>You can update or delete your account information anytime.</li>
          <li>We use cookies only to improve your experience, not to track you across the web.</li>
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