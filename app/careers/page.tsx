"use client"

import React from "react";

const jobCategories = [
  {
    title: "Engineering & Technology",
    count: 12,
    description: "Build the future of e-commerce with cutting-edge technology",
    icon: "💻"
  },
  {
    title: "Product & Design",
    count: 8,
    description: "Create delightful user experiences that millions love",
    icon: "🎨"
  },
  {
    title: "Business & Operations",
    count: 15,
    description: "Drive growth and optimize our business operations",
    icon: "📊"
  },
  {
    title: "Marketing & Sales",
    count: 10,
    description: "Connect with customers and grow our brand presence",
    icon: "📈"
  }
];

const benefits = [
  {
    title: "Health & Wellness",
    description: "Comprehensive health insurance, wellness programs, and mental health support",
    icon: "🏥"
  },
  {
    title: "Learning & Growth",
    description: "Continuous learning opportunities, skill development, and career advancement",
    icon: "📚"
  },
  {
    title: "Work-Life Balance",
    description: "Flexible work hours, remote options, and generous time-off policies",
    icon: "⚖️"
  },
  {
    title: "Team & Culture",
    description: "Inclusive environment, team events, and collaborative workspace",
    icon: "🤝"
  }
];

const values = [
  "Innovation First",
  "Customer Obsession", 
  "Transparency",
  "Sustainability",
  "Diversity & Inclusion",
  "Excellence"
];

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 md:px-0">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-6 drop-shadow-sm">
          Join ShopHub
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Be part of a team that's revolutionizing e-commerce in India. Build, innovate, and grow with us.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <div className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">45+</div>
            <div className="text-sm text-gray-600">Open Positions</div>
          </div>
          <div className="bg-white/80 rounded-xl p-4 shadow-md border border-blue-100 hover:shadow-lg hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer">
            <div className="text-2xl font-bold text-blue-600">25+</div>
            <div className="text-sm text-gray-600">Cities</div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Explore Opportunities</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobCategories.map((category, index) => (
            <div key={index} className="bg-white/80 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{category.icon}</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">{category.title}</h3>
              <p className="text-gray-600 text-sm mb-3 group-hover:text-gray-700 transition-colors duration-200">{category.description}</p>
              <div className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-200">{category.count} positions</div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Culture */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Our Culture</h2>
        <div className="bg-white/80 rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <p className="text-lg text-gray-700 mb-6 text-center">
            At ShopHub, we believe in fostering an environment where innovation thrives, 
            diversity is celebrated, and every team member has the opportunity to make a meaningful impact.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">Our Values</h3>
              <div className="grid grid-cols-2 gap-3">
                {values.map((value, index) => (
                  <div key={index} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 hover:scale-105 transition-all duration-200 cursor-pointer">
                    {value}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">What We Offer</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-green-500 mr-2">✓</span>
                  Competitive salary & equity
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-green-500 mr-2">✓</span>
                  Flexible work arrangements
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-green-500 mr-2">✓</span>
                  Professional development
                </li>
                <li className="flex items-center hover:text-gray-800 transition-colors duration-200 cursor-pointer">
                  <span className="text-green-500 mr-2">✓</span>
                  Health & wellness benefits
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-6xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Benefits & Perks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white/80 rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl hover:scale-105 hover:bg-white/90 transition-all duration-300 ease-in-out cursor-pointer group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{benefit.icon}</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">{benefit.title}</h3>
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Process */}
      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">How to Apply</h2>
        <div className="bg-white/80 rounded-3xl p-8 shadow-xl border border-blue-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300">1</div>
              <h3 className="font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">Browse & Apply</h3>
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">Explore our open positions and submit your application</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300">2</div>
              <h3 className="font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">Interview Process</h3>
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">Meet our team through technical and cultural interviews</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 group-hover:bg-blue-700 group-hover:scale-110 transition-all duration-300">3</div>
              <h3 className="font-semibold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">Join the Team</h3>
              <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors duration-200">Welcome aboard! Start your journey with ShopHub</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-2xl mx-auto text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Us?</h2>
          <p className="text-blue-100 mb-6">
            Send your resume to careers@shophub.com or browse our current openings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 ease-in-out">
              View Open Positions
            </button>
            <button className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 hover:scale-105 transition-all duration-300 ease-in-out">
              Contact HR Team
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