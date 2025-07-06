"use client"

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-2xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-fade-in-down">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-4 text-center">Shipping Information</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          ShopHub delivers across India with fast, reliable, and affordable shipping options. Here's everything you need to know!
        </p>
        <ul className="list-disc pl-6 text-gray-600 space-y-2">
          <li><b>Delivery Time:</b> 2-5 business days in metros, 4-8 days in other areas.</li>
          <li><b>Shipping Charges:</b> Free for orders above ₹999. Otherwise, ₹49 per order.</li>
          <li><b>Order Tracking:</b> Track your order in real-time from your profile or via email updates.</li>
          <li><b>International Shipping:</b> Currently not available.</li>
        </ul>
        <div className="text-xs text-gray-400 mt-6 text-center">For shipping queries, email <span className='text-blue-600'>support@shophub.com</span></div>
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