"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Star, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"

const heroTexts = ["Welcome to ShopHub", "Discover Amazing Deals", "Shop Smart, Save More", "Your Shopping Paradise"]

const floatingIcons = [
  { icon: ShoppingBag, delay: 0 },
  { icon: Star, delay: 0.5 },
  { icon: Zap, delay: 1 },
  { icon: TrendingUp, delay: 1.5 },
]

export default function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-blue-300/30 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className={`absolute animate-float`}
          style={{
            top: `${20 + index * 15}%`,
            right: `${10 + index * 5}%`,
            animationDelay: `${item.delay}s`,
          }}
        >
          <item.icon className="h-8 w-8 text-white/30" />
        </div>
      ))}

      <div className="container mx-auto px-4 text-center relative z-10">
        <div
          className={`transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <h1 className="text-6xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent animate-pulse">
              {heroTexts[currentTextIndex]}
            </span>
            <div className="absolute -top-2 -right-2">
              <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            </div>
          </h1>

          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in-up delay-500">
            Discover amazing products at unbeatable prices. Shop from millions of items with
            <span className="font-semibold text-yellow-300"> lightning-fast delivery</span> and
            <span className="font-semibold text-pink-300"> secure payments</span>.
          </p>

          <div className="flex gap-4 justify-center animate-fade-in-up delay-1000">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Link href="/products" className="group">
                <ShoppingBag className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                Shop Now
                <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 bg-transparent font-bold transform hover:scale-105 transition-all duration-300 group"
            >
              <Link href="/categories">
                Browse Categories
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>

          {/* Stats Counter */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up delay-1500">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300 counter" data-target="10000">
                0
              </div>
              <div className="text-sm opacity-80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-300 counter" data-target="50000">
                0
              </div>
              <div className="text-sm opacity-80">Products Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300 counter" data-target="99">
                0
              </div>
              <div className="text-sm opacity-80">% Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="fill-white animate-wave"
          ></path>
        </svg>
      </div>
    </section>
  )
}
