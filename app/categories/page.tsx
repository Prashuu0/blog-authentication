"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Laptop, Shirt, Home, Book, Gamepad2, Car, Heart, Camera, Music } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Electronics",
    icon: Smartphone,
    href: "/products?category=electronics",
    count: 156,
    description: "Latest gadgets and electronic devices",
  },
  {
    name: "Computers",
    icon: Laptop,
    href: "/products?category=computers",
    count: 89,
    description: "Laptops, desktops, and accessories",
  },
  {
    name: "Fashion",
    icon: Shirt,
    href: "/products?category=fashion",
    count: 234,
    description: "Clothing, shoes, and accessories",
  },
  {
    name: "Home & Garden",
    icon: Home,
    href: "/products?category=home",
    count: 178,
    description: "Furniture, decor, and garden supplies",
  },
  {
    name: "Books",
    icon: Book,
    href: "/products?category=books",
    count: 456,
    description: "Fiction, non-fiction, and educational",
  },
  {
    name: "Gaming",
    icon: Gamepad2,
    href: "/products?category=gaming",
    count: 123,
    description: "Games, consoles, and gaming accessories",
  },
  {
    name: "Automotive",
    icon: Car,
    href: "/products?category=automotive",
    count: 67,
    description: "Car parts, tools, and accessories",
  },
  {
    name: "Health & Beauty",
    icon: Heart,
    href: "/products?category=health",
    count: 145,
    description: "Skincare, makeup, and wellness products",
  },
  {
    name: "Photography",
    icon: Camera,
    href: "/products?category=photography",
    count: 78,
    description: "Cameras, lenses, and photo equipment",
  },
  {
    name: "Music",
    icon: Music,
    href: "/products?category=music",
    count: 92,
    description: "Instruments, audio equipment, and accessories",
  },
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
        <p className="text-xl text-gray-600">Discover products in your favorite categories</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer h-full">
              <CardContent className="p-6 text-center h-full flex flex-col justify-between">
                <div>
                  <category.icon className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                </div>
                <Badge variant="secondary" className="mx-auto">
                  {category.count} products
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Featured Categories */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8">
              <Smartphone className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Electronics</h3>
              <p className="mb-4">Latest smartphones, tablets, and gadgets with up to 50% off</p>
              <Badge className="bg-white text-blue-600">Hot Deals</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-teal-600 text-white">
            <CardContent className="p-8">
              <Shirt className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Fashion</h3>
              <p className="mb-4">Trendy clothing and accessories for every season</p>
              <Badge className="bg-white text-green-600">New Arrivals</Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-8">
              <Home className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">Home & Garden</h3>
              <p className="mb-4">Transform your space with our home decor collection</p>
              <Badge className="bg-white text-orange-600">Best Sellers</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
