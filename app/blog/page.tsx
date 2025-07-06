"use client"

export default function BlogPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 p-4">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 animate-fade-in-down">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent mb-4 text-center">ShopHub Blog</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Tips, stories, and updates from the world of online shopping. Get inspired and stay informed with ShopHub!
        </p>
        <div className="grid gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
            <div className="font-semibold text-lg mb-1">How to Get the Best Deals on ShopHub</div>
            <div className="text-xs text-gray-500 mb-2">July 2024</div>
            <div className="text-gray-600">Discover insider tips for saving big on your favorite products, using coupons, and catching flash sales before they're gone!</div>
          </div>
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-5">
            <div className="font-semibold text-lg mb-1">Behind the Scenes: How We Deliver Fast</div>
            <div className="text-xs text-gray-500 mb-2">June 2024</div>
            <div className="text-gray-600">A look at our logistics magic — from smart warehouses to last-mile delivery, see how your order reaches you lightning fast.</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-5">
            <div className="font-semibold text-lg mb-1">Customer Stories: Real Reviews, Real Smiles</div>
            <div className="text-xs text-gray-500 mb-2">May 2024</div>
            <div className="text-gray-600">Read how ShopHub is making a difference in the lives of shoppers across India, one happy delivery at a time.</div>
          </div>
        </div>
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