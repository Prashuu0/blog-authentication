"use client"

import React from "react";

const milestones = [
  {
    year: "2024",
    title: "ShopHub launches with a vision to empower every shopper in India.",
    description:
      "ShopHub opens its virtual doors, offering a seamless, modern shopping experience with a curated catalog and lightning-fast delivery.",
  },
  {
    year: "2025",
    title: "Sustainability at the Core",
    description:
      "ShopHub introduces eco-friendly packaging, partners with local artisans, and launches the GreenCart initiative to promote conscious shopping.",
  },
  {
    year: "2026",
    title: "Innovation in Every Cart",
    description:
      "AI-powered recommendations, zero-gravity delivery drones, and a personalized shopping journey set new standards for e-commerce.",
  },
  {
    year: "2027",
    title: "Community & Impact",
    description:
      "ShopHub Foundation launches, supporting education and digital literacy for underserved communities across India.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-12 px-4 md:px-0 flex flex-col items-center">
      <section className="max-w-3xl w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 mb-12 mt-8 border border-blue-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 text-center drop-shadow-sm">About ShopHub</h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6 text-center">
          ShopHub is India's modern e-commerce destination, built to empower every shopper and seller with technology, trust, and transparency. From humble beginnings to a thriving platform, our journey is driven by innovation, sustainability, and a passion for making shopping delightful for all.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-blue-200 hover:scale-105 transition-all duration-200 cursor-pointer">400K+ Happy Customers</span>
          <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-green-200 hover:scale-105 transition-all duration-200 cursor-pointer">10M+ Products</span>
          <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full font-semibold text-sm hover:bg-yellow-200 hover:scale-105 transition-all duration-200 cursor-pointer">Nationwide Delivery</span>
        </div>
      </section>

      <section className="max-w-4xl w-full mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Our Journey</h2>
        <ol className="relative border-l-4 border-blue-200 ml-4">
          {milestones.map((m, idx) => (
            <li key={m.year} className="mb-10 ml-6 group">
              <span className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full ring-4 ring-white text-white font-bold text-lg shadow-lg group-hover:bg-blue-700 group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 ease-in-out">
                {m.year}
              </span>
              <div className="bg-white/60 rounded-xl p-4 hover:bg-white/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out cursor-pointer">
                <h3 className="font-semibold text-lg md:text-xl text-blue-800 mb-1 mt-1 group-hover:text-blue-900 transition-colors duration-200">{m.title}</h3>
                <p className="text-gray-600 text-base md:text-lg group-hover:text-gray-700 transition-colors duration-200">{m.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="max-w-4xl w-full mb-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white/80 rounded-2xl shadow p-6 border-t-4 border-blue-400 hover:shadow-xl hover:scale-105 hover:border-blue-500 transition-all duration-300 ease-in-out cursor-pointer group">
          <h4 className="text-xl font-bold text-blue-700 mb-2 group-hover:text-blue-800 transition-colors duration-200">Innovation</h4>
          <p className="text-gray-700 text-base group-hover:text-gray-800 transition-colors duration-200">
            From AI-powered recommendations to seamless checkout, ShopHub is at the forefront of digital retail, making shopping smarter and more personal every day.
          </p>
        </div>
        <div className="bg-white/80 rounded-2xl shadow p-6 border-t-4 border-green-400 hover:shadow-xl hover:scale-105 hover:border-green-500 transition-all duration-300 ease-in-out cursor-pointer group">
          <h4 className="text-xl font-bold text-green-700 mb-2 group-hover:text-green-800 transition-colors duration-200">Sustainability</h4>
          <p className="text-gray-700 text-base group-hover:text-gray-800 transition-colors duration-200">
            We're committed to a greener future—eco-friendly packaging, local partnerships, and conscious commerce are at the heart of our mission.
          </p>
        </div>
        <div className="bg-white/80 rounded-2xl shadow p-6 border-t-4 border-yellow-400 hover:shadow-xl hover:scale-105 hover:border-yellow-500 transition-all duration-300 ease-in-out cursor-pointer group">
          <h4 className="text-xl font-bold text-yellow-700 mb-2 group-hover:text-yellow-800 transition-colors duration-200">Impact</h4>
          <p className="text-gray-700 text-base group-hover:text-gray-800 transition-colors duration-200">
            ShopHub empowers communities, supports artisans, and invests in digital literacy, ensuring everyone can thrive in the digital economy.
          </p>
        </div>
      </section>

      <section className="max-w-3xl w-full mb-12 text-center">
        <div className="bg-white/60 rounded-2xl p-8 hover:bg-white/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-2">
            To make shopping joyful, accessible, and sustainable for every Indian.
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mt-8 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700">
            To be India's most trusted and innovative e-commerce platform, connecting people, products, and possibilities.
          </p>
        </div>
      </section>

      <footer className="text-center text-gray-400 text-sm mt-8 mb-4">
        &copy; {new Date().getFullYear()} ShopHub. All rights reserved.
      </footer>
    </main>
  );
} 