"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Eye, Clock, Heart } from "lucide-react"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import Link from "next/link"

interface RecentlyViewedProps {
  maxItems?: number
}

// Utility function for safe JSON parsing
function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export default function RecentlyViewed({ maxItems = 8 }: RecentlyViewedProps) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlist()

  useEffect(() => {
    // Load recently viewed products from localStorage
    const stored = localStorage.getItem("recentlyViewed")
    const products = safeParse<Product[]>(stored, [])
    setRecentlyViewed(products.slice(0, maxItems))
  }, [maxItems])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(price)
  }

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId)
  }

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 4 >= recentlyViewed.length ? 0 : prev + 4
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - 4 < 0 ? Math.max(0, recentlyViewed.length - 4) : prev - 4
    )
  }

  const visibleProducts = recentlyViewed.slice(currentIndex, currentIndex + 4)

  if (recentlyViewed.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          <h2 className="text-xl font-semibold">Recently Viewed</h2>
          <Badge variant="secondary" className="text-xs">
            {recentlyViewed.length} items
          </Badge>
        </div>
        
        {recentlyViewed.length > 4 && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleProducts.map((product) => (
          <Card key={product.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="relative">
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square overflow-hidden rounded-lg mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {product.isNew && (
                    <Badge className="bg-green-600 text-xs">
                      New
                    </Badge>
                  )}
                  {product.isOnSale && (
                    <Badge className="bg-red-600 text-xs">
                      Sale
                    </Badge>
                  )}
                </div>

                {/* Wishlist Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleWishlistToggle(product)}
                  className={`absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white/80 hover:bg-white ${
                    isInWishlist(product.id) ? "text-red-600" : "text-gray-600"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                </Button>
              </div>

              <div className="space-y-2">
                {/* Product Name */}
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-medium text-sm line-clamp-2 hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Brand */}
                <p className="text-xs text-gray-600">{product.brand}</p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1">
                    {renderStars(product.rating)}
                  </div>
                  <span className="text-xs text-gray-600">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xs text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    product.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`} />
                  <span className="text-xs text-gray-600">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 text-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={() => addToCart(product)}
                    disabled={product.stock === 0}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => window.open(`/products/${product.id}`, '_blank')}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View All Button */}
      {recentlyViewed.length > 4 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => {
              // Navigate to a full recently viewed page
              console.log("View all recently viewed products")
            }}
          >
            View All Recently Viewed ({recentlyViewed.length})
          </Button>
        </div>
      )}
    </div>
  )
}

// Utility function to add product to recently viewed
export const addToRecentlyViewed = (product: Product) => {
  try {
    const stored = localStorage.getItem("recentlyViewed")
    let recentlyViewed: Product[] = safeParse<Product[]>(stored, [])
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(p => p.id !== product.id)
    // Add to beginning
    recentlyViewed.unshift(product)
    // Keep only last 20 items
    if (recentlyViewed.length > 20) {
      recentlyViewed = recentlyViewed.slice(0, 20)
    }
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed))
  } catch (error) {
    console.error("Error saving recently viewed product:", error)
  }
} 