export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
  stock: number
  tags: string[]
  images: string[]
  variants?: ProductVariant[]
  specifications?: Record<string, string>
  warranty?: string
  returnPolicy?: string
  shippingInfo?: string
  isFeatured?: boolean
  isNew?: boolean
  isOnSale?: boolean
  sku: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  value: string
  price?: number
  stock: number
  sku: string
}

export interface ProductReview {
  id: string
  productId: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  images?: string[]
  helpful: number
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  role: "user" | "admin" | "seller"
  avatar?: string
  createdAt: Date
  updatedAt: Date
  isEmailVerified: boolean
  isPhoneVerified: boolean
  loyaltyPoints: number
  referralCode: string
  referredBy?: string
  lastLoginAt?: Date
  preferences: {
    emailNotifications: boolean
    smsNotifications: boolean
    marketingEmails: boolean
    pushNotifications: boolean
    language: string
    currency: string
  }
}

export interface UserProfile extends User {
  addresses: UserAddress[]
  defaultAddressId?: string
}

export interface UserAddress {
  id: string
  userId: string
  type: "home" | "work" | "other"
  name: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  orderNumber: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned"
  shippingAddress: UserAddress
  billingAddress: UserAddress
  paymentMethod: PaymentMethod
  trackingNumber?: string
  estimatedDelivery?: Date
  createdAt: Date
  updatedAt: Date
  couponCode?: string
  loyaltyPointsUsed?: number
  loyaltyPointsEarned?: number
  notes?: string
  deliveryInstructions?: string
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  brand: string
}

export interface PaymentMethod {
  id: string
  userId: string
  type: "card" | "upi" | "netbanking" | "wallet"
  name: string
  maskedNumber?: string
  expiryDate?: string
  isDefault: boolean
  createdAt: Date
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product: Product
  addedAt: Date
  notes?: string
  priority: "low" | "medium" | "high"
}

// Legacy Address interface for backward compatibility
export interface Address {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

// Form validation types
export interface ProfileFormData {
  name: string
  phone: string
}

export interface PasswordFormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface AddressFormData {
  type: "home" | "work" | "other"
  name: string
  phone: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

// New interfaces for enhanced features

export interface Notification {
  id: string
  userId: string
  type: "order" | "product" | "promotion" | "system"
  title: string
  message: string
  isRead: boolean
  data?: Record<string, any>
  createdAt: Date
}

export interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed" | "free_shipping"
  value: number
  minOrderAmount?: number
  maxDiscount?: number
  usageLimit: number
  usedCount: number
  validFrom: Date
  validUntil: Date
  isActive: boolean
  applicableCategories?: string[]
  applicableProducts?: string[]
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
  selectedVariant?: ProductVariant
  addedAt: Date
  notes?: string
}

export interface RecentlyViewedProduct {
  id: string
  userId: string
  productId: string
  product: Product
  viewedAt: Date
}

export interface ProductComparison {
  id: string
  userId: string
  products: Product[]
  createdAt: Date
  updatedAt: Date
}

export interface SearchHistory {
  id: string
  userId: string
  query: string
  resultsCount: number
  searchedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
  children?: Category[]
  productCount: number
  isActive: boolean
  sortOrder: number
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
  website?: string
  productCount: number
  isActive: boolean
}

export interface ReturnRequest {
  id: string
  orderId: string
  userId: string
  items: ReturnItem[]
  reason: string
  description?: string
  images?: string[]
  status: "pending" | "approved" | "rejected" | "processed"
  refundAmount?: number
  refundMethod?: string
  createdAt: Date
  updatedAt: Date
}

export interface ReturnItem {
  id: string
  orderItemId: string
  productId: string
  productName: string
  quantity: number
  reason: string
}
