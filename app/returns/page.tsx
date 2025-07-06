"use client"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-fade-in-down">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 text-center">Returns & Refunds</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Not satisfied with your order? No worries! ShopHub offers easy returns and hassle-free refunds for your peace of mind.
        </p>
        <ol className="list-decimal pl-6 text-gray-600 space-y-2">
          <li>Go to your <b>Orders</b> page and select the item you want to return.</li>
          <li>Click <b>Request Return</b> and fill out the form.</li>
          <li>Our team will arrange a pickup or guide you for drop-off.</li>
          <li>Once we receive the item, your refund will be processed within 3-5 business days.</li>
        </ol>
        <div className="text-xs text-gray-400 mt-6 text-center">For any issues, email <span className='text-blue-600'>support@shophub.com</span></div>
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