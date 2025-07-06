"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const { addToCart } = useCart()
  const { addToWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const handleAddToCart = useCallback(async () => {
    setIsAdding(true)
    await new Promise((resolve) => setTimeout(resolve, 300)) // Reduced delay
    addToCart(product)
    setIsAdding(false)

    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your cart.`,
      duration: 2000,
    })
  }, [addToCart, product, toast])

  const handleAddToWishlist = useCallback(() => {
    addToWishlist(product)
    toast({
      title: isInWishlist(product.id) ? "Removed from Wishlist 💔" : "Added to Wishlist! ❤️",
      description: `${product.name} ${isInWishlist(product.id) ? "removed from" : "added to"} your wishlist.`,
      duration: 2000,
    })
  }, [addToWishlist, isInWishlist, product, toast])

  return (
    <Card
      className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.01] relative overflow-hidden border-0 shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="relative overflow-hidden">
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={300}
                className={`w-full h-48 object-cover transition-all duration-500 ${
                  isHovered ? "scale-105" : "scale-100"
                } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onLoad={() => setImageLoaded(true)}
                priority={false}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Overlay Effects */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            ></div>

            {/* Quick View Button */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <Button size="sm" className="bg-white/90 text-black hover:bg-white backdrop-blur-sm">
                <Eye className="h-4 w-4 mr-1" />
                Quick View
              </Button>
            </div>
          </div>
        </Link>

        {/* Action Buttons */}
        <div
          className={`absolute top-2 right-2 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
            onClick={handleAddToWishlist}
          >
            <Heart
              className={`h-4 w-4 transition-colors duration-300 ${
                isInWishlist(product.id) ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.discount && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <Zap className="h-3 w-3 mr-1" />-{product.discount}%
            </Badge>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <Badge variant="destructive">
              Only {product.stock} left!
            </Badge>
          )}
        </div>
      </div>

      <CardContent className="p-4 relative z-10">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
          <Badge
            variant={product.stock > 0 ? "default" : "destructive"}
            className={product.stock > 0 ? "bg-green-100 text-green-800" : ""}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        {/* Brand */}
        <p className="text-xs text-gray-500 mb-2">by {product.brand}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0 relative z-10">
        <Button
          className={`w-full transition-all duration-300 ${
            isAdding
              ? "bg-green-500 hover:bg-green-600"
              : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          } transform hover:scale-105 shadow-lg hover:shadow-xl`}
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAdding}
        >
          {isAdding ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </CardFooter>

      {/* Animated Border */}
      <div
        className={`absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ padding: "2px" }}
      >
        <div className="bg-white rounded-lg h-full w-full"></div>
      </div>
    </Card>
  )
}
