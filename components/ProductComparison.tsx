"use client"

import { useState } from "react"
import { X, Star, Check, Minus, ShoppingCart, Heart } from "lucide-react"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"

interface ProductComparisonProps {
  products: Product[]
  onRemoveProduct: (productId: string) => void
  onClearAll: () => void
}

export default function ProductComparison({
  products,
  onRemoveProduct,
  onClearAll
}: ProductComparisonProps) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist()

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
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

  const getSpecificationValue = (product: Product, spec: string) => {
    if (!product.specifications) return "-"
    return product.specifications[spec] || "-"
  }

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.productId === productId)
  }

  const handleWishlistToggle = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <ShoppingCart className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Products to Compare</h3>
        <p className="text-gray-600 mb-4">
          Add products to your comparison list to see them side by side.
        </p>
        <Button onClick={() => window.history.back()}>
          Continue Shopping
        </Button>
      </div>
    )
  }

  // Get all unique specification keys from all products
  const allSpecs = new Set<string>()
  products.forEach(product => {
    if (product.specifications) {
      Object.keys(product.specifications).forEach(spec => allSpecs.add(spec))
    }
  })

  const specificationKeys = Array.from(allSpecs)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Product Comparison</h1>
          <p className="text-gray-600">
            Compare {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onClearAll}
            className="text-red-600 hover:text-red-700"
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-sm font-medium line-clamp-2">
                  {product.name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveProduct(product.id)}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.isNew && (
                  <Badge className="absolute top-2 left-2 bg-green-600">
                    New
                  </Badge>
                )}
                {product.isOnSale && (
                  <Badge className="absolute top-2 right-2 bg-red-600">
                    Sale
                  </Badge>
                )}
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.discount && (
                  <Badge variant="secondary" className="text-xs">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  ({product.reviews})
                </span>
              </div>

              {/* Brand */}
              <div className="text-sm text-gray-600">
                Brand: {product.brand}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  product.stock > 0 ? "bg-green-500" : "bg-red-500"
                }`} />
                <span className="text-sm">
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleWishlistToggle(product)}
                  className={isInWishlist(product.id) ? "text-red-600 border-red-600" : ""}
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Specifications Comparison */}
      {specificationKeys.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Specifications Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Specification</th>
                    {products.map(product => (
                      <th key={product.id} className="text-left py-3 px-4 font-medium">
                        {product.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specificationKeys.map(spec => (
                    <tr key={spec} className="border-b">
                      <td className="py-3 px-4 font-medium text-sm">{spec}</td>
                      {products.map(product => (
                        <td key={product.id} className="py-3 px-4 text-sm">
                          {getSpecificationValue(product, spec)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Features Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Features Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Feature</th>
                  {products.map(product => (
                    <th key={product.id} className="text-left py-3 px-4 font-medium">
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium text-sm">Free Shipping</td>
                  {products.map(product => (
                    <td key={product.id} className="py-3 px-4">
                      <Check className="w-5 h-5 text-green-600" />
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium text-sm">Warranty</td>
                  {products.map(product => (
                    <td key={product.id} className="py-3 px-4 text-sm">
                      {product.warranty || "-"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium text-sm">Return Policy</td>
                  {products.map(product => (
                    <td key={product.id} className="py-3 px-4 text-sm">
                      {product.returnPolicy || "-"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 font-medium text-sm">Weight</td>
                  {products.map(product => (
                    <td key={product.id} className="py-3 px-4 text-sm">
                      {product.weight ? `${product.weight} kg` : "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-sm">SKU</td>
                  {products.map(product => (
                    <td key={product.id} className="py-3 px-4 text-sm">
                      {product.sku}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Comparison Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Math.min(...products.map(p => p.price))}
              </div>
              <div className="text-sm text-gray-600">Lowest Price</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Math.max(...products.map(p => p.rating))}
              </div>
              <div className="text-sm text-gray-600">Highest Rating</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {products.filter(p => p.isOnSale).length}
              </div>
              <div className="text-sm text-gray-600">On Sale</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {products.filter(p => p.stock > 0).length}
              </div>
              <div className="text-sm text-gray-600">In Stock</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 