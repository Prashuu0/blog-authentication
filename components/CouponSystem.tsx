"use client"

import { useState } from "react"
import { Tag, Check, X, Gift, Percent, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coupon } from "@/types"
import { useToast } from "@/hooks/use-toast"

interface CouponSystemProps {
  subtotal: number
  onCouponApplied: (coupon: Coupon, discount: number) => void
  onCouponRemoved: () => void
  appliedCoupon?: Coupon
}

// Mock available coupons
const availableCoupons: Coupon[] = [
  {
    id: "welcome10",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minOrderAmount: 1000,
    maxDiscount: 500,
    usageLimit: 1000,
    usedCount: 234,
    validFrom: new Date("2024-01-01"),
    validUntil: new Date("2024-12-31"),
    isActive: true,
    applicableCategories: ["Electronics", "Furniture"]
  },
  {
    id: "freeship",
    code: "FREESHIP",
    type: "free_shipping",
    value: 0,
    minOrderAmount: 2000,
    usageLimit: 500,
    usedCount: 89,
    validFrom: new Date("2024-01-01"),
    validUntil: new Date("2024-12-31"),
    isActive: true
  },
  {
    id: "save500",
    code: "SAVE500",
    type: "fixed",
    value: 500,
    minOrderAmount: 3000,
    maxDiscount: 500,
    usageLimit: 200,
    usedCount: 45,
    validFrom: new Date("2024-01-01"),
    validUntil: new Date("2024-12-31"),
    isActive: true
  },
  {
    id: "gaming20",
    code: "GAMING20",
    type: "percentage",
    value: 20,
    minOrderAmount: 1500,
    maxDiscount: 1000,
    usageLimit: 100,
    usedCount: 12,
    validFrom: new Date("2024-01-01"),
    validUntil: new Date("2024-12-31"),
    isActive: true,
    applicableCategories: ["Electronics"]
  }
]

export default function CouponSystem({
  subtotal,
  onCouponApplied,
  onCouponRemoved,
  appliedCoupon
}: CouponSystemProps) {
  const [couponCode, setCouponCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showAvailableCoupons, setShowAvailableCoupons] = useState(false)
  const { toast } = useToast()

  const validateCoupon = (code: string): Coupon | null => {
    const coupon = availableCoupons.find(c => c.code === code.toUpperCase())
    if (!coupon) return null
    
    // Check if coupon is active
    if (!coupon.isActive) return null
    
    // Check if coupon is still valid
    const now = new Date()
    if (now < coupon.validFrom || now > coupon.validUntil) return null
    
    // Check usage limit
    if (coupon.usedCount >= coupon.usageLimit) return null
    
    // Check minimum order amount
    if (coupon.minOrderAmount && subtotal < coupon.minOrderAmount) return null
    
    return coupon
  }

  const calculateDiscount = (coupon: Coupon): number => {
    let discount = 0
    
    switch (coupon.type) {
      case "percentage":
        discount = (subtotal * coupon.value) / 100
        if (coupon.maxDiscount) {
          discount = Math.min(discount, coupon.maxDiscount)
        }
        break
      case "fixed":
        discount = coupon.value
        break
      case "free_shipping":
        discount = 200 // Assuming shipping cost is ₹200
        break
    }
    
    return Math.min(discount, subtotal) // Can't discount more than subtotal
  }

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const coupon = validateCoupon(couponCode)
    
    if (!coupon) {
      toast({
        title: "Invalid Coupon",
        description: "The coupon code you entered is invalid or has expired",
        variant: "destructive"
      })
      setIsLoading(false)
      return
    }

    const discount = calculateDiscount(coupon)
    
    onCouponApplied(coupon, discount)
    setCouponCode("")
    
    toast({
      title: "Coupon Applied!",
      description: `You saved ${formatPrice(discount)} with ${coupon.code}`,
    })
    
    setIsLoading(false)
  }

  const handleRemoveCoupon = () => {
    onCouponRemoved()
    toast({
      title: "Coupon Removed",
      description: "The coupon has been removed from your order",
    })
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR"
    }).format(amount)
  }

  const getCouponIcon = (type: Coupon["type"]) => {
    switch (type) {
      case "percentage":
        return <Percent className="w-4 h-4" />
      case "fixed":
        return <Gift className="w-4 h-4" />
      case "free_shipping":
        return <Truck className="w-4 h-4" />
      default:
        return <Tag className="w-4 h-4" />
    }
  }

  const getCouponDescription = (coupon: Coupon) => {
    switch (coupon.type) {
      case "percentage":
        return `${coupon.value}% off${coupon.maxDiscount ? ` (max ₹${coupon.maxDiscount})` : ""}`
      case "fixed":
        return `₹${coupon.value} off`
      case "free_shipping":
        return "Free shipping"
      default:
        return "Discount"
    }
  }

  return (
    <div className="space-y-4">
      {/* Applied Coupon */}
      {appliedCoupon && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-800">
                      {appliedCoupon.code}
                    </span>
                    <Badge className="bg-green-600 text-white">
                      {getCouponDescription(appliedCoupon)}
                    </Badge>
                  </div>
                  <p className="text-sm text-green-700">
                    Applied successfully
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveCoupon}
                className="text-green-600 hover:text-green-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Coupon Input */}
      {!appliedCoupon && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Have a Coupon?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === "Enter" && handleApplyCoupon()}
              />
              <Button
                onClick={handleApplyCoupon}
                disabled={isLoading || !couponCode.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? "Applying..." : "Apply"}
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAvailableCoupons(!showAvailableCoupons)}
              className="text-blue-600 hover:text-blue-700"
            >
              {showAvailableCoupons ? "Hide" : "Show"} Available Coupons
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Available Coupons */}
      {showAvailableCoupons && !appliedCoupon && (
        <Card>
          <CardHeader>
            <CardTitle>Available Coupons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {availableCoupons.map((coupon) => {
                const isValid = validateCoupon(coupon.code)
                const discount = isValid ? calculateDiscount(coupon) : 0
                
                return (
                  <div
                    key={coupon.id}
                    className={`p-4 border rounded-lg ${
                      isValid ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isValid ? "bg-blue-100" : "bg-gray-100"
                        }`}>
                          {getCouponIcon(coupon.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{coupon.code}</span>
                            <Badge variant={isValid ? "default" : "secondary"}>
                              {getCouponDescription(coupon)}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Min. order: {formatPrice(coupon.minOrderAmount || 0)}
                            {coupon.applicableCategories && (
                              <span> • {coupon.applicableCategories.join(", ")}</span>
                            )}
                          </p>
                          {isValid && discount > 0 && (
                            <p className="text-sm text-green-600 font-medium">
                              You save: {formatPrice(discount)}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {isValid ? (
                        <Button
                          size="sm"
                          onClick={() => {
                            setCouponCode(coupon.code)
                            handleApplyCoupon()
                          }}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Apply
                        </Button>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {coupon.usedCount >= coupon.usageLimit ? "Fully redeemed" : "Not applicable"}
                        </span>
                      )}
                    </div>
                    
                    {/* Usage Progress */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Usage: {coupon.usedCount}/{coupon.usageLimit}</span>
                        <span>{Math.round((coupon.usedCount / coupon.usageLimit) * 100)}% used</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{
                            width: `${Math.min((coupon.usedCount / coupon.usageLimit) * 100, 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 