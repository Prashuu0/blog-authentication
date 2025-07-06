"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingCart, User, Heart, Menu, X, Sparkles, Zap } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import SearchBar from "@/components/SearchBar"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { items } = useCart()
  const { user, logout } = useAuth()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b" : "bg-white border-b"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ShopHub
                </div>
                <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500 animate-pulse" />
              </div>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <SearchBar 
                placeholder="Search for products, brands and more..."
              className="w-full"
            />
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Flash Sale */}
            <Button variant="ghost" size="icon" asChild className="relative group">
              <Link href="/flash-sale">
                <Zap className="h-5 w-5 group-hover:text-orange-500 transition-colors duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              </Link>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" asChild className="relative group">
              <Link href="/wishlist">
                <Heart className="h-5 w-5 group-hover:text-red-500 transition-colors duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 animate-ping"></div>
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild className="relative group">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5 group-hover:text-blue-500 transition-colors duration-300" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-blue-500 to-purple-500 animate-bounce">
                    {totalItems}
                  </Badge>
                )}
              </Link>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative group">
                  <User className="h-5 w-5 group-hover:text-green-500 transition-colors duration-300" />
                  {user && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-fade-in">
                {user ? (
                  <>
                    <div className="px-2 py-1.5 text-sm font-medium text-gray-900">Welcome, {user.name}! 👋</div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        👤 Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="cursor-pointer">
                        📦 Orders
                      </Link>
                    </DropdownMenuItem>
                    {user.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link href="/admin" className="cursor-pointer">
                          ⚙️ Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600">
                      🚪 Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/login" className="cursor-pointer">
                        🔑 Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/register" className="cursor-pointer">
                        📝 Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur-md animate-fade-in">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <SearchBar 
                  placeholder="Search products..."
                  showSuggestions={false}
                />
              </div>
              
              <Link href="/flash-sale" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500">
                <Zap className="h-5 w-5" />
                <span>Flash Sale</span>
              </Link>
              
              <Link href="/wishlist" className="flex items-center space-x-2 text-gray-700 hover:text-red-500">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>
              <Link href="/cart" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({totalItems})</span>
              </Link>
              {user ? (
                <>
                  <Link href="/profile" className="flex items-center space-x-2 text-gray-700">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </Link>
                  <button onClick={logout} className="flex items-center space-x-2 text-red-600">
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="flex items-center space-x-2 text-gray-700">
                    <span>Login</span>
                  </Link>
                  <Link href="/register" className="flex items-center space-x-2 text-gray-700">
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
