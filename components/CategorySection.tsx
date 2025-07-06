"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Smartphone, Laptop, Shirt, Home, Book, Gamepad2 } from "lucide-react"
import Link from "next/link"

const categories = [
  { name: "Electronics", icon: Smartphone, href: "/categories/electronics", color: "from-blue-500 to-cyan-500" },
  { name: "Computers", icon: Laptop, href: "/categories/computers", color: "from-purple-500 to-pink-500" },
  { name: "Fashion", icon: Shirt, href: "/categories/fashion", color: "from-pink-500 to-rose-500" },
  { name: "Home & Garden", icon: Home, href: "/categories/home", color: "from-green-500 to-emerald-500" },
  { name: "Books", icon: Book, href: "/categories/books", color: "from-orange-500 to-red-500" },
  { name: "Gaming", icon: Gamepad2, href: "/categories/gaming", color: "from-indigo-500 to-purple-500" },
]

export default function CategorySection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(categories.length).fill(false))

  useEffect(() => {
    const timer = setTimeout(() => {
      categories.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => {
            const newVisible = [...prev]
            newVisible[index] = true
            return newVisible
          })
        }, index * 200)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-purple-200/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-200/30 rounded-full animate-ping"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">Discover amazing products in every category</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <Link key={category.name} href={category.href}>
              <Card
                className={`group hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 cursor-pointer border-0 shadow-lg overflow-hidden ${
                  visibleCards[index] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center relative">
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>

                  {/* Icon Container */}
                  <div className="relative mb-4">
                    <div
                      className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg`}
                    >
                      <category.icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Floating Particles */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-300"></div>
                    <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-100"></div>
                  </div>

                  <h3 className="font-semibold text-gray-800 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {category.name}
                  </h3>

                  {/* Hover Effect Border */}
                  <div
                    className={`absolute inset-0 border-2 border-transparent bg-gradient-to-r ${category.color} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    style={{ padding: "1px" }}
                  >
                    <div className="bg-white rounded-lg h-full w-full"></div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Animated CTA */}
        <div className="text-center mt-12">
          <div className="inline-block animate-bounce">
            <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-2"></div>
          </div>
          <p className="text-gray-600 animate-pulse">Explore all categories and find your perfect products!</p>
        </div>
      </div>
    </section>
  )
}
