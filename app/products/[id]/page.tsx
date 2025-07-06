"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Star, Heart, Share2, Truck, Shield, RotateCcw, Package, ChevronLeft, ChevronRight } from "lucide-react"
import { Product, ProductReview } from "@/types"
import { getProductById, productReviews } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { addToRecentlyViewed } from "@/components/RecentlyViewed"
import { useToast } from "@/hooks/use-toast"
import ProductReviews from "@/components/ProductReviews"
import RecommendationEngine from "@/components/RecommendationEngine"
import Link from "next/link"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      const foundProduct = getProductById(productId)
      if (foundProduct) {
        setProduct(foundProduct)
        // Add to recently viewed
        addToRecentlyViewed(foundProduct)
      }
      setLoading(false)
    }
    
    loadProduct()
  }, [productId])

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

  const handleAddToCart = () => {
    if (!product) return
    
    // Add the product multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    
    toast({
      title: "Added to Cart",
      description: `${quantity} ${quantity === 1 ? "item" : "items"} added to your cart`,
    })
  }

  const handleWishlistToggle = () => {
    if (!product) return
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Removed from Wishlist",
        description: "Product removed from your wishlist",
      })
    } else {
      addToWishlist(product)
      toast({
        title: "Added to Wishlist",
        description: "Product added to your wishlist",
      })
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: product?.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Product link copied to clipboard",
      })
    }
  }

  const nextImage = () => {
    if (!product?.images) return
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    if (!product?.images) return
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <Link href="/products">
          <Button>Back to Products</Button>
        </Link>
      </div>
    )
  }

  const productReviewsData = productReviews.filter(review => review.productId === product.id)
  const averageRating = productReviewsData.length > 0 
    ? productReviewsData.reduce((sum, review) => sum + review.rating, 0) / productReviewsData.length
    : 0

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <span>/</span>
        <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-blue-600">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img
              src={product.images?.[currentImageIndex] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {/* Image Navigation */}
            {product.images && product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-green-600">New</Badge>
              )}
              {product.isOnSale && (
                <Badge className="bg-red-600">Sale</Badge>
              )}
              {product.isFeatured && (
                <Badge className="bg-blue-600">Featured</Badge>
              )}
            </div>
          </div>

          {/* Thumbnail Images */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((image, index) => (
              <button
                key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? "border-blue-600" : "border-gray-200"
                  }`}
              >
                  <img
                    src={image}
                  alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Brand:</span>
            <Badge variant="outline">{product.brand}</Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {renderStars(product.rating)}
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">SKU: {product.sku}</span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-blue-600">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge className="bg-red-600 text-white">
                    {product.discount}% OFF
                  </Badge>
                </>
              )}
            </div>
            {product.originalPrice && (
              <p className="text-sm text-green-600">
                You save {formatPrice(product.originalPrice - product.price)}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Select Options:</h3>
              {Object.entries(
                product.variants.reduce((acc, variant) => {
                  if (!acc[variant.name]) acc[variant.name] = []
                  acc[variant.name].push(variant)
                  return acc
                }, {} as Record<string, typeof product.variants>)
              ).map(([variantName, variants]) => (
                <div key={variantName} className="space-y-2">
                  <label className="text-sm font-medium">{variantName}:</label>
                  <div className="flex gap-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                          selectedVariant === variant.id
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {variant.value}
                        {variant.price && variant.price !== product.price && (
                          <span className="ml-1 text-xs">
                            (+{formatPrice(variant.price - product.price)})
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
          )}

          {/* Quantity */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity:</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <span className="w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= product.stock}
              >
                +
              </Button>
              <span className="text-sm text-gray-600">
                {product.stock} available
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={handleWishlistToggle}
              className={isInWishlist(product.id) ? "text-red-600 border-red-600" : ""}
            >
              <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
            </Button>
            <Button variant="outline" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${
              product.stock > 0 ? "bg-green-500" : "bg-red-500"
            }`} />
            <span className="text-sm">
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-600" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm">{product.warranty || "1 Year Warranty"}</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-orange-600" />
              <span className="text-sm">{product.returnPolicy || "30 Days Return"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-purple-600" />
              <span className="text-sm">Secure Packaging</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({productReviewsData.length})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            <TabsTrigger value="related">Related Products</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.specifications && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Technical Specifications</h3>
                  <div className="space-y-3">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="font-medium text-gray-700">{key}</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Product Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Brand</span>
                    <span className="text-gray-900">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Category</span>
                    <span className="text-gray-900">{product.category}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">SKU</span>
                    <span className="text-gray-900">{product.sku}</span>
                  </div>
                  {product.weight && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Weight</span>
                      <span className="text-gray-900">{product.weight} kg</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Dimensions</span>
                      <span className="text-gray-900">
                        {product.dimensions.length} × {product.dimensions.width} × {product.dimensions.height} cm
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ProductReviews
              productId={product.id}
              productName={product.name}
              averageRating={averageRating}
              totalReviews={productReviewsData.length}
              reviews={productReviewsData.map(review => ({
                id: review.id,
                userId: review.userId,
                userName: review.userName,
                userAvatar: review.userAvatar,
                rating: review.rating,
                title: review.title,
                comment: review.comment,
                date: new Date(review.createdAt).toLocaleDateString(),
                helpful: review.helpful,
                notHelpful: 0,
                verified: false,
                images: review.images
              }))}
            />
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-5 h-5 text-green-600" />
                      <span>Free shipping on orders above ₹999</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600" />
                      <span>Standard delivery: 3-5 business days</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-purple-600" />
                      <span>Express delivery: 1-2 business days</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Return Policy</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-5 h-5 text-orange-600" />
                      <span>30-day return policy</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span>Full refund or exchange</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-green-600" />
                      <span>Free return shipping</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="related" className="mt-6">
            <div className="text-center py-8 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>Related products will be displayed here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Recommendations Section */}
      <div className="mt-16">
        <RecommendationEngine
          userId="user123"
          currentProduct={product}
          recentlyViewed={[
            {
              id: "1",
              name: "Wireless Bluetooth Headphones",
              price: 2999,
              originalPrice: 3999,
              discount: 25,
              image: "/placeholder.svg",
              rating: 4.5,
              reviews: 128,
              brand: "AudioTech",
              category: "Electronics",
              views: 1500,
              sales: 89
            },
            {
              id: "2", 
              name: "Smart Fitness Band",
              price: 1499,
              originalPrice: 1999,
              discount: 25,
              image: "/placeholder.svg",
              rating: 4.2,
              reviews: 95,
              brand: "FitTech",
              category: "Electronics",
              views: 1200,
              sales: 67
            }
          ]}
          frequentlyBoughtTogether={[
            {
              id: "3",
              name: "Phone Case",
              price: 299,
              image: "/placeholder.svg",
              rating: 4.3,
              reviews: 45,
              brand: "CasePro",
              category: "Accessories",
              views: 800,
              sales: 34
            },
            {
              id: "4",
              name: "Screen Protector",
              price: 199,
              image: "/placeholder.svg",
              rating: 4.1,
              reviews: 32,
              brand: "ProtectMax",
              category: "Accessories",
              views: 600,
              sales: 28
            }
          ]}
          trendingProducts={[
            {
              id: "5",
              name: "Wireless Charger",
              price: 899,
              originalPrice: 1299,
              discount: 31,
              image: "/placeholder.svg",
              rating: 4.6,
              reviews: 156,
              brand: "ChargeTech",
              category: "Electronics",
              isTrending: true,
              views: 2100,
              sales: 123
            },
            {
              id: "6",
              name: "Smart Watch",
              price: 4999,
              originalPrice: 6999,
              discount: 29,
              image: "/placeholder.svg",
              rating: 4.4,
              reviews: 89,
              brand: "WatchPro",
              category: "Electronics",
              isTrending: true,
              views: 1800,
              sales: 78
            }
          ]}
          personalizedRecommendations={[
            {
              id: "7",
              name: "Gaming Mouse",
              price: 2499,
              originalPrice: 3499,
              discount: 29,
              image: "/placeholder.svg",
              rating: 4.7,
              reviews: 203,
              brand: "GameTech",
              category: "Electronics",
              views: 2500,
              sales: 145
            },
            {
              id: "8",
              name: "Mechanical Keyboard",
              price: 3999,
              originalPrice: 5499,
              discount: 27,
              image: "/placeholder.svg",
              rating: 4.5,
              reviews: 167,
              brand: "KeyTech",
              category: "Electronics",
              views: 2200,
              sales: 98
            }
          ]}
          similarProducts={[
            {
              id: "9",
              name: "Bluetooth Speaker",
              price: 1999,
              originalPrice: 2499,
              discount: 20,
              image: "/placeholder.svg",
              rating: 4.3,
              reviews: 78,
              brand: "SoundTech",
              category: "Electronics",
              views: 1100,
              sales: 56
            },
            {
              id: "10",
              name: "Portable Charger",
              price: 1499,
              originalPrice: 1999,
              discount: 25,
              image: "/placeholder.svg",
              rating: 4.2,
              reviews: 92,
              brand: "PowerTech",
              category: "Electronics",
              views: 1300,
              sales: 73
            }
          ]}
          categoryRecommendations={[
            {
              id: "11",
              name: "USB-C Cable",
              price: 299,
              originalPrice: 499,
              discount: 40,
              image: "/placeholder.svg",
              rating: 4.1,
              reviews: 45,
              brand: "CablePro",
              category: "Accessories",
              views: 700,
              sales: 89
            },
            {
              id: "12",
              name: "Laptop Stand",
              price: 799,
              originalPrice: 999,
              discount: 20,
              image: "/placeholder.svg",
              rating: 4.4,
              reviews: 67,
              brand: "StandTech",
              category: "Accessories",
              views: 900,
              sales: 42
            }
          ]}
        />
      </div>
    </div>
  )
}
