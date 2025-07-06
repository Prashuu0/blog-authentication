"use client"

import React from "react";

const leadershipTeam = [
  {
    name: "Rajesh Kumar",
    position: "Chief Executive Officer",
    experience: "15+ years in e-commerce",
    education: "IIT Delhi, IIM Bangalore",
    image: "👨‍💼"
  },
  {
    name: "Priya Sharma",
    position: "Chief Technology Officer",
    experience: "12+ years in technology",
    education: "BITS Pilani, Stanford University",
    image: "👩‍💻"
  },
  {
    name: "Amit Patel",
    position: "Chief Financial Officer",
    experience: "18+ years in finance",
    education: "CA, IIM Ahmedabad",
    image: "👨‍💼"
  },
  {
    name: "Neha Singh",
    position: "Chief Marketing Officer",
    experience: "10+ years in marketing",
    education: "Delhi University, Kellogg School",
    image: "👩‍💼"
  }
];

const boardMembers = [
  {
    name: "Dr. Sanjay Mehta",
    position: "Chairman",
    background: "Former CEO, Global Tech Corp",
    image: "👨‍🦳"
  },
  {
    name: "Anita Desai",
    position: "Independent Director",
    background: "Former Partner, McKinsey & Co",
    image: "👩‍🦳"
  },
  {
    name: "Vikram Malhotra",
    position: "Non-Executive Director",
    background: "Managing Director, Venture Capital",
    image: "👨‍💼"
  }
];

const financialHighlights = [
  {
    metric: "Revenue (FY 2024)",
    value: "₹2,500 Cr",
    growth: "+45% YoY"
  },
  {
    metric: "GMV",
    value: "₹15,000 Cr",
    growth: "+60% YoY"
  },
  {
    metric: "Active Users",
    value: "25M+",
    growth: "+35% YoY"
  },
  {
    metric: "Orders Delivered",
    value: "50M+",
    growth: "+55% YoY"
  }
];

const awards = [
  {
    title: "Best E-commerce Platform 2024",
    organization: "Digital India Awards",
    year: "2024"
  },
  {
    title: "Innovation in Technology",
    organization: "NASSCOM",
    year: "2024"
  },
  {
    title: "Customer Choice Award",
    organization: "Consumer Voice",
    year: "2023"
  },
  {
    title: "Sustainable Business Award",
    organization: "Green Business Council",
    year: "2023"
  }
];

const csrInitiatives = [
  {
    title: "Digital Literacy Program",
    description: "Educating 1 million students in digital skills",
    impact: "500K+ students trained"
  },
  {
    title: "Women Empowerment",
    description: "Supporting 10,000 women entrepreneurs",
    impact: "5,000+ businesses launched"
  },
  {
    title: "Environmental Conservation",
    description: "Planting 1 million trees across India",
    impact: "750K+ trees planted"
  }
];

export default function CorporatePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 md:px-0">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">
          Corporate Information
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Learn about ShopHub's corporate structure, leadership, governance, and commitment to sustainable growth.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">₹2,500 Cr</div>
            <div className="text-sm text-gray-600">Annual Revenue</div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">25M+</div>
            <div className="text-sm text-gray-600">Active Users</div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Cities Served</div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Company Overview</h2>
        <div className="bg-white/80 rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">About ShopHub</h3>
              <p className="text-gray-700 mb-4">
                ShopHub is India's fastest-growing e-commerce platform, founded in 2024 with a vision to democratize 
                online shopping for every Indian. We connect millions of customers with sellers across the country, 
                offering a seamless, secure, and delightful shopping experience.
              </p>
              <p className="text-gray-700">
                Our mission is to make quality products accessible to everyone while supporting local businesses 
                and promoting sustainable practices in e-commerce.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Key Facts</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">🏢</span>
                  <span>Founded: 2024</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">📍</span>
                  <span>Headquarters: Mumbai, Maharashtra</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">👥</span>
                  <span>Employees: 2,500+</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">🌍</span>
                  <span>Presence: Pan India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Leadership Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadershipTeam.map((leader, index) => (
            <div key={index} className="bg-white/80 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="text-4xl mb-4 text-center">{leader.image}</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">{leader.name}</h3>
              <p className="text-blue-600 font-medium mb-2 group-hover:text-blue-700 transition-colors duration-200">{leader.position}</p>
              <p className="text-gray-600 text-sm mb-1 group-hover:text-gray-700 transition-colors duration-200">{leader.experience}</p>
              <p className="text-gray-500 text-xs group-hover:text-gray-600 transition-colors duration-200">{leader.education}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Board of Directors */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Board of Directors</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {boardMembers.map((member, index) => (
            <div key={index} className="bg-white/80 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="text-3xl mb-4 text-center">{member.image}</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-2 group-hover:text-blue-700 transition-colors duration-200">{member.position}</p>
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">{member.background}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Financial Highlights */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Financial Highlights</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialHighlights.map((highlight, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="text-2xl font-bold mb-2 group-hover:text-blue-100 transition-colors duration-200">{highlight.value}</div>
              <div className="text-blue-100 text-sm mb-2 group-hover:text-blue-50 transition-colors duration-200">{highlight.metric}</div>
              <div className="text-green-300 text-xs font-medium group-hover:text-green-200 transition-colors duration-200">{highlight.growth}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Awards & Recognition</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {awards.map((award, index) => (
            <div key={index} className="bg-white/80 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">{award.year}</span>
                <span className="text-blue-500">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">{award.title}</h3>
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">{award.organization}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CSR Initiatives */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Corporate Social Responsibility</h2>
        <div className="space-y-6">
          {csrInitiatives.map((initiative, index) => (
            <div key={index} className="bg-white/80 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">{initiative.title}</h3>
                  <p className="text-gray-600 mb-3 group-hover:text-gray-700 transition-colors duration-200">{initiative.description}</p>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">{initiative.impact}</span>
                </div>
                <div className="text-3xl ml-4">🌱</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Governance */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Corporate Governance</h2>
        <div className="bg-white/80 rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Governance Structure</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">📋</span>
                  Board of Directors
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">⚖️</span>
                  Audit Committee
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">👥</span>
                  Nomination Committee
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">💰</span>
                  Remuneration Committee
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Policies & Compliance</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">📄</span>
                  Code of Conduct
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">🔒</span>
                  Data Protection Policy
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">🌱</span>
                  Environmental Policy
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-blue-500 mr-2">🤝</span>
                  Supplier Code of Conduct
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Relations */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Investor Relations</h2>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Financial Reports</h3>
              <ul className="space-y-3 text-blue-100">
                <li className="flex items-center hover:text-white transition-colors duration-200 cursor-pointer">
                  <span className="mr-2">📊</span>
                  Annual Report 2024
                </li>
                <li className="flex items-center hover:text-white transition-colors duration-200 cursor-pointer">
                  <span className="mr-2">📈</span>
                  Quarterly Reports
                </li>
                <li className="flex items-center hover:text-white transition-colors duration-200 cursor-pointer">
                  <span className="mr-2">💰</span>
                  Financial Statements
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-blue-100">
                <div className="flex items-center">
                  <span className="mr-2">📧</span>
                  <span>investors@shophub.com</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📞</span>
                  <span>+91 1800-SHOPHUB</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">📍</span>
                  <span>Mumbai, Maharashtra</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-2xl mx-auto text-center">
        <div className="bg-white/80 rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">Need More Information?</h2>
          <p className="text-gray-700 mb-6">
            For detailed corporate information, investor queries, or media inquiries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out">
              Download Annual Report
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white hover:scale-105 transition-all duration-300 ease-in-out">
              Contact IR Team
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