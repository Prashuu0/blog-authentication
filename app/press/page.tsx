"use client"

import React from "react";

const pressReleases = [
  {
    title: "ShopHub Launches Revolutionary AI-Powered Shopping Experience",
    date: "December 15, 2024",
    category: "Technology",
    description: "ShopHub introduces cutting-edge AI recommendations and personalized shopping journeys for millions of Indian customers.",
    featured: true
  },
  {
    title: "ShopHub Partners with 500+ Local Artisans Under 'Made in India' Initiative",
    date: "December 10, 2024",
    category: "Partnership",
    description: "Supporting local craftsmanship and bringing authentic Indian products to customers nationwide.",
    featured: false
  },
  {
    title: "ShopHub Achieves 100% Electric Delivery Fleet in Major Cities",
    date: "December 5, 2024",
    category: "Sustainability",
    description: "Leading the green revolution in e-commerce with eco-friendly delivery solutions.",
    featured: false
  },
  {
    title: "ShopHub's Big Shopping Festival Breaks All Records",
    date: "November 30, 2024",
    category: "Business",
    description: "10 million orders in 5 days, making it the most successful shopping event in Indian e-commerce history.",
    featured: false
  }
];

const mediaCoverage = [
  {
    title: "ShopHub: The New Face of Indian E-commerce",
    source: "Economic Times",
    date: "December 12, 2024",
    excerpt: "How ShopHub is revolutionizing online shopping with technology and customer-centric approach..."
  },
  {
    title: "AI and Innovation: ShopHub's Recipe for Success",
    source: "TechCrunch India",
    date: "December 8, 2024",
    excerpt: "Exclusive interview with ShopHub's CTO on the future of e-commerce technology..."
  },
  {
    title: "ShopHub's Sustainable Approach Wins Customer Hearts",
    source: "Business Standard",
    date: "December 3, 2024",
    excerpt: "Environmental initiatives and green practices that set ShopHub apart from competitors..."
  }
];

const announcements = [
  {
    title: "ShopHub Announces New Leadership Team",
    date: "December 1, 2024",
    type: "Leadership"
  },
  {
    title: "ShopHub Expands to 50+ New Cities",
    date: "November 25, 2024",
    type: "Expansion"
  },
  {
    title: "ShopHub Launches Mobile App 2.0",
    date: "November 20, 2024",
    type: "Product"
  }
];

const deals = [
  {
    title: "Big Shopping Festival 2024",
    description: "Up to 80% off on electronics, fashion, and home products",
    validUntil: "December 31, 2024",
    discount: "80% OFF"
  },
  {
    title: "New Year Sale",
    description: "Start 2025 with amazing deals on premium brands",
    validUntil: "January 15, 2025",
    discount: "70% OFF"
  },
  {
    title: "Student Special",
    description: "Extra discounts for students with valid ID",
    validUntil: "Ongoing",
    discount: "25% OFF"
  }
];

export default function PressPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 md:px-0">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">
          Press & Media
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Stay updated with ShopHub's latest news, announcements, and media coverage. 
          For media inquiries, contact us at media@shophub.com
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">50+</div>
            <div className="text-sm text-gray-600">Press Releases</div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">100+</div>
            <div className="text-sm text-gray-600">Media Mentions</div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-sm text-gray-600">Media Support</div>
          </div>
        </div>
      </section>

      {/* Featured Press Release */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Featured Press Release</h2>
        {pressReleases.filter(pr => pr.featured).map((release, index) => (
          <div key={index} className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">{release.category}</span>
              <span className="text-blue-100">{release.date}</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">{release.title}</h3>
            <p className="text-blue-100 text-lg mb-6">{release.description}</p>
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 ease-in-out">
              Read Full Release
            </button>
          </div>
        ))}
      </section>

      {/* Press Releases Grid */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Latest Press Releases</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pressReleases.filter(pr => !pr.featured).map((release, index) => (
            <div key={index} className="bg-white/80 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">{release.category}</span>
                <span className="text-gray-500 text-sm">{release.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3 group-hover:text-blue-800 transition-colors duration-200">{release.title}</h3>
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">{release.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Media Coverage */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Media Coverage</h2>
        <div className="space-y-6">
          {mediaCoverage.map((coverage, index) => (
            <div key={index} className="bg-white/80 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-blue-600 font-semibold">{coverage.source}</span>
                <span className="text-gray-500 text-sm">{coverage.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">{coverage.title}</h3>
              <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">{coverage.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements & Deals */}
      <section className="max-w-6xl mx-auto mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Announcements */}
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Recent Announcements</h2>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-blue-700 group-hover:text-blue-800 transition-colors duration-200">{announcement.title}</h3>
                      <span className="text-gray-500 text-sm">{announcement.date}</span>
                    </div>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">{announcement.type}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Deals */}
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Current Deals</h2>
            <div className="space-y-4">
              {deals.map((deal, index) => (
                <div key={index} className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold group-hover:text-green-100 transition-colors duration-200">{deal.title}</h3>
                    <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold">{deal.discount}</span>
                  </div>
                  <p className="text-green-100 text-sm mb-2 group-hover:text-green-50 transition-colors duration-200">{deal.description}</p>
                  <span className="text-green-200 text-xs">Valid until: {deal.validUntil}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Media Resources */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Media Resources</h2>
        <div className="bg-white/80 rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Press Kit</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">📄</span>
                  Company Fact Sheet
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">🖼️</span>
                  High-Resolution Logos
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">📸</span>
                  Product Images
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">🎥</span>
                  Brand Videos
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Contact Information</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">📧</span>
                  <span>media@shophub.com</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">📞</span>
                  <span>+91 1800-SHOPHUB</span>
                </div>
                <div className="flex items-center">
                  <span className="text-blue-500 mr-2">📍</span>
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-2xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
          <p className="text-blue-100 mb-6">
            Our media team is available 24/7 to assist with your inquiries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 ease-in-out">
              Download Press Kit
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out">
              Contact Media Team
            </button>
          </div>
        </div>
      </section>

      <footer className="text-center text-gray-400 text-sm mt-16">
        &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
      </footer>
    </main>
  );
} 