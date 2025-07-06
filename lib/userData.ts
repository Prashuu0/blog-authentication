import type { UserProfile, UserAddress, Order, WishlistItem, Product } from "@/types"
import { getProducts } from "./products"

// Mock user profile data
export const mockUserProfile: UserProfile = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
  role: "user",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-12-01"),
  addresses: [
    {
      id: "addr1",
      userId: "1",
      type: "home",
      name: "John Doe",
      phone: "+91 98765 43210",
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India",
      isDefault: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date("2024-01-01"),
    },
    {
      id: "addr2",
      userId: "1",
      type: "work",
      name: "John Doe",
      phone: "+91 98765 43210",
      street: "456 Business Park",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400002",
      country: "India",
      isDefault: false,
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-02-01"),
    },
  ],
  defaultAddressId: "addr1",
  preferences: {
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
  },
}

// Mock orders data
export const mockOrders: Order[] = [
  {
    id: "order1",
    userId: "1",
    orderNumber: "ORD-2024-001",
    items: [
      {
        id: "item1",
        productId: "1",
        name: "Wireless Bluetooth Headphones",
        price: 199.99,
        originalPrice: 249.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&auto=format",
        brand: "AudioTech",
      },
      {
        id: "item2",
        productId: "5",
        name: "Wireless Gaming Mouse",
        price: 79.99,
        originalPrice: 99.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&auto=format",
        brand: "GamePro",
      },
    ],
    subtotal: 359.97,
    tax: 36.00,
    shipping: 0,
    total: 395.97,
    status: "delivered",
    shippingAddress: mockUserProfile.addresses[0],
    billingAddress: mockUserProfile.addresses[0],
    paymentMethod: {
      id: "pm1",
      userId: "1",
      type: "card",
      name: "HDFC Credit Card",
      maskedNumber: "**** **** **** 1234",
      expiryDate: "12/25",
      isDefault: true,
      createdAt: new Date("2024-01-01"),
    },
    trackingNumber: "TRK123456789",
    estimatedDelivery: new Date("2024-12-05"),
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-03"),
  },
  {
    id: "order2",
    userId: "1",
    orderNumber: "ORD-2024-002",
    items: [
      {
        id: "item3",
        productId: "3",
        name: "Premium Coffee Maker",
        price: 149.99,
        originalPrice: 199.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop&auto=format",
        brand: "BrewMaster",
      },
    ],
    subtotal: 149.99,
    tax: 15.00,
    shipping: 10.00,
    total: 174.99,
    status: "shipped",
    shippingAddress: mockUserProfile.addresses[1],
    billingAddress: mockUserProfile.addresses[0],
    paymentMethod: {
      id: "pm1",
      userId: "1",
      type: "card",
      name: "HDFC Credit Card",
      maskedNumber: "**** **** **** 1234",
      expiryDate: "12/25",
      isDefault: true,
      createdAt: new Date("2024-01-01"),
    },
    trackingNumber: "TRK987654321",
    estimatedDelivery: new Date("2024-12-10"),
    createdAt: new Date("2024-12-05"),
    updatedAt: new Date("2024-12-07"),
  },
  {
    id: "order3",
    userId: "1",
    orderNumber: "ORD-2024-003",
    items: [
      {
        id: "item4",
        productId: "7",
        name: "4K Ultra HD Monitor",
        price: 449.99,
        originalPrice: 549.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=400&fit=crop&auto=format",
        brand: "DisplayTech",
      },
    ],
    subtotal: 449.99,
    tax: 45.00,
    shipping: 0,
    total: 494.99,
    status: "processing",
    shippingAddress: mockUserProfile.addresses[0],
    billingAddress: mockUserProfile.addresses[0],
    paymentMethod: {
      id: "pm1",
      userId: "1",
      type: "card",
      name: "HDFC Credit Card",
      maskedNumber: "**** **** **** 1234",
      expiryDate: "12/25",
      isDefault: true,
      createdAt: new Date("2024-01-01"),
    },
    createdAt: new Date("2024-12-08"),
    updatedAt: new Date("2024-12-08"),
  },
]

// Mock wishlist data
export const mockWishlist: WishlistItem[] = [
  {
    id: "wish1",
    userId: "1",
    productId: "2",
    product: {
      id: "2",
      name: "Smart Fitness Watch",
      description: "Advanced fitness tracking with heart rate monitor, GPS, and smartphone integration.",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&auto=format",
      category: "Electronics",
      brand: "FitTech",
      rating: 4.3,
      reviews: 856,
      stock: 25,
      tags: ["fitness", "smartwatch", "health", "gps"],
    },
    addedAt: new Date("2024-11-15"),
  },
  {
    id: "wish2",
    userId: "1",
    productId: "4",
    product: {
      id: "4",
      name: "Ergonomic Office Chair",
      description: "Comfortable office chair with lumbar support and adjustable height.",
      price: 399.99,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&auto=format",
      category: "Furniture",
      brand: "ComfortSeating",
      rating: 4.4,
      reviews: 678,
      stock: 8,
      tags: ["office", "chair", "ergonomic", "furniture"],
    },
    addedAt: new Date("2024-11-20"),
  },
  {
    id: "wish3",
    userId: "1",
    productId: "8",
    product: {
      id: "8",
      name: "Stainless Steel Water Bottle",
      description: "Insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop&auto=format",
      category: "Sports & Outdoors",
      brand: "HydroFlask",
      rating: 4.5,
      reviews: 789,
      stock: 75,
      tags: ["water bottle", "insulated", "stainless steel", "outdoor"],
    },
    addedAt: new Date("2024-12-01"),
  },
]

// API functions
export async function getUserProfile(userId: string): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockUserProfile
}

export async function updateUserProfile(userId: string, data: Partial<UserProfile>): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  return { ...mockUserProfile, ...data, updatedAt: new Date() }
}

export async function getUserOrders(userId: string): Promise<Order[]> {
  await new Promise((resolve) => setTimeout(resolve, 150))
  return mockOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getUserWishlist(userId: string): Promise<WishlistItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))
  return mockWishlist.sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime())
}

export async function addAddress(userId: string, address: Omit<UserAddress, "id" | "userId" | "createdAt" | "updatedAt">): Promise<UserAddress> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const newAddress: UserAddress = {
    ...address,
    id: `addr${Date.now()}`,
    userId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  return newAddress
}

export async function updateAddress(addressId: string, address: Partial<UserAddress>): Promise<UserAddress> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  const existingAddress = mockUserProfile.addresses.find(addr => addr.id === addressId)
  if (!existingAddress) throw new Error("Address not found")
  
  return { ...existingAddress, ...address, updatedAt: new Date() }
}

export async function deleteAddress(addressId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  // In real app, this would remove from database
}

export async function removeFromWishlist(wishlistItemId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200))
  // In real app, this would remove from database
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300))
  // In real app, this would validate current password and update
} 