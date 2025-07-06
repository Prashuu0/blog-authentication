import type { Product } from "@/types"
import { ProductReview, Category, Brand } from "@/types"

// Enhanced product data with new features
export const products: Product[] = [
  {
    id: "1",
    name: "Gaming Mouse Pro",
    description: "High-performance gaming mouse with RGB lighting and customizable buttons. Perfect for competitive gaming with 25,600 DPI sensor and 1000Hz polling rate.",
    price: 2999,
    originalPrice: 3999,
    discount: 25,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=left",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=right",
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=top"
    ],
    category: "Electronics",
    brand: "GamingTech",
    rating: 4.8,
    reviews: 1247,
    stock: 45,
    tags: ["gaming", "mouse", "rgb", "wireless"],
    sku: "GM-PRO-001",
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    warranty: "2 Years",
    returnPolicy: "30 Days Return",
    shippingInfo: "Free shipping on orders above ₹999",
    weight: 0.12,
    dimensions: {
      length: 12.5,
      width: 6.8,
      height: 3.9
    },
    specifications: {
      "Sensor": "25,600 DPI Optical",
      "Polling Rate": "1000Hz",
      "Buttons": "7 Programmable",
      "RGB": "16.8 Million Colors",
      "Battery": "70 Hours",
      "Connectivity": "2.4GHz Wireless + Bluetooth"
    },
    variants: [
      {
        id: "v1-1",
        productId: "1",
        name: "Color",
        value: "Black",
        stock: 25,
        sku: "GM-PRO-001-BLK"
      },
      {
        id: "v1-2",
        productId: "1",
        name: "Color",
        value: "White",
        stock: 20,
        sku: "GM-PRO-001-WHT"
      }
    ]
  },
  {
    id: "2",
    name: "Wireless Bluetooth Headphones",
    description: "Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.",
    price: 4999,
    originalPrice: 6999,
    discount: 29,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=left",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Electronics",
    brand: "SoundMaster",
    rating: 4.6,
    reviews: 892,
    stock: 32,
    tags: ["headphones", "wireless", "bluetooth", "noise-cancelling"],
    sku: "WH-BT-002",
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    warranty: "1 Year",
    returnPolicy: "30 Days Return",
    shippingInfo: "Free shipping on orders above ₹999",
    weight: 0.28,
    dimensions: {
      length: 18.5,
      width: 16.8,
      height: 8.2
    },
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz-20kHz",
      "Battery Life": "30 Hours",
      "Noise Cancellation": "Active ANC",
      "Connectivity": "Bluetooth 5.0",
      "Charging Time": "2 Hours"
    },
    variants: [
      {
        id: "v2-1",
        productId: "2",
        name: "Color",
        value: "Black",
        stock: 18,
        sku: "WH-BT-002-BLK"
      },
      {
        id: "v2-2",
        productId: "2",
        name: "Color",
        value: "Silver",
        stock: 14,
        sku: "WH-BT-002-SLV"
      }
    ]
  },
  {
    id: "3",
    name: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS tracking, and 7-day battery life. Tracks 15+ activities and provides detailed health insights.",
    price: 8999,
    originalPrice: 11999,
    discount: 25,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=left",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Electronics",
    brand: "FitTech",
    rating: 4.7,
    reviews: 1563,
    stock: 28,
    tags: ["smartwatch", "fitness", "health", "gps"],
    sku: "SFW-003",
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    warranty: "1 Year",
    returnPolicy: "30 Days Return",
    shippingInfo: "Free shipping on orders above ₹999",
    weight: 0.045,
    dimensions: {
      length: 4.2,
      width: 3.8,
      height: 1.2
    },
    specifications: {
      "Display": "1.4\" AMOLED",
      "Battery Life": "7 Days",
      "Water Resistance": "5ATM",
      "GPS": "Built-in",
      "Heart Rate": "24/7 Monitoring",
      "Activities": "15+ Sports Modes"
    },
    variants: [
      {
        id: "v3-1",
        productId: "3",
        name: "Size",
        value: "40mm",
    stock: 15,
        sku: "SFW-003-40"
      },
      {
        id: "v3-2",
        productId: "3",
        name: "Size",
        value: "44mm",
        stock: 13,
        sku: "SFW-003-44"
      }
    ]
  },
  {
    id: "4",
    name: "Mechanical Gaming Keyboard",
    description: "RGB mechanical keyboard with Cherry MX switches, aluminum frame, and programmable macro keys. Perfect for gaming and typing with premium build quality.",
    price: 5999,
    originalPrice: 7999,
    discount: 25,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=left",
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Electronics",
    brand: "GamingTech",
    rating: 4.9,
    reviews: 2341,
    stock: 67,
    tags: ["keyboard", "mechanical", "rgb", "gaming"],
    sku: "MGK-004",
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    warranty: "2 Years",
    returnPolicy: "30 Days Return",
    shippingInfo: "Free shipping on orders above ₹999",
    weight: 1.2,
    dimensions: {
      length: 44.5,
      width: 13.2,
      height: 3.5
    },
    specifications: {
      "Switches": "Cherry MX Red",
      "Layout": "Full Size",
      "RGB": "16.8 Million Colors",
      "Macro Keys": "5 Programmable",
      "Frame": "Aluminum",
      "Cable": "Detachable USB-C"
    },
    variants: [
      {
        id: "v4-1",
        productId: "4",
        name: "Switch Type",
        value: "Red",
        stock: 35,
        sku: "MGK-004-RED"
      },
      {
        id: "v4-2",
        productId: "4",
        name: "Switch Type",
        value: "Blue",
        stock: 32,
        sku: "MGK-004-BLU"
      }
    ]
  },
  {
    id: "5",
    name: "4K Gaming Monitor",
    description: "27-inch 4K gaming monitor with 144Hz refresh rate, 1ms response time, and HDR support. Perfect for competitive gaming and content creation.",
    price: 24999,
    originalPrice: 32999,
    discount: 24,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&crop=left",
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Electronics",
    brand: "DisplayPro",
    rating: 4.8,
    reviews: 892,
    stock: 23,
    tags: ["monitor", "4k", "gaming", "hdr"],
    sku: "4KM-005",
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    warranty: "3 Years",
    returnPolicy: "30 Days Return",
    shippingInfo: "Free shipping on orders above ₹999",
    weight: 6.8,
    dimensions: {
      length: 61.2,
      width: 36.8,
      height: 24.5
    },
    specifications: {
      "Resolution": "3840x2160",
      "Refresh Rate": "144Hz",
      "Response Time": "1ms",
      "Panel Type": "IPS",
      "HDR": "HDR400",
      "Ports": "HDMI 2.1, DisplayPort 1.4"
    },
    variants: [
      {
        id: "v5-1",
        productId: "5",
        name: "Size",
        value: "27\"",
        stock: 12,
        sku: "4KM-005-27"
      },
      {
        id: "v5-2",
        productId: "5",
        name: "Size",
        value: "32\"",
        price: 29999,
        stock: 11,
        sku: "4KM-005-32"
      }
    ]
  },
  {
    id: "6",
    name: "Wireless Gaming Controller",
    description: "Ergonomic wireless controller with haptic feedback, customizable buttons, and 20-hour battery life. Compatible with PC, PS4, and PS5.",
    price: 3999,
    originalPrice: 5499,
    discount: 27,
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=400&fit=crop&crop=left",
      "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Electronics",
    brand: "GamingTech",
    rating: 4.5,
    reviews: 567,
    stock: 89,
    tags: ["controller", "wireless", "gaming", "ps5"],
    sku: "WGC-006",
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    warranty: "1 Year",
    returnPolicy: "30 Days Return",
    shippingInfo: "Free shipping on orders above ₹999",
    weight: 0.28,
    dimensions: {
      length: 16.2,
      width: 10.5,
      height: 6.2
    },
    specifications: {
      "Battery Life": "20 Hours",
      "Connectivity": "2.4GHz + Bluetooth",
      "Haptic Feedback": "Dual Motors",
      "Triggers": "Adaptive",
      "Compatibility": "PC, PS4, PS5",
      "Charging": "USB-C"
    },
    variants: [
      {
        id: "v6-1",
        productId: "6",
        name: "Color",
        value: "Black",
        stock: 45,
        sku: "WGC-006-BLK"
      },
      {
        id: "v6-2",
        productId: "6",
        name: "Color",
        value: "White",
        stock: 44,
        sku: "WGC-006-WHT"
      }
    ]
  },
  {
    id: "7",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound, waterproof design, and 12-hour battery life. Perfect for outdoor activities and parties.",
    price: 1999,
    originalPrice: 2999,
    discount: 33,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=left",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Electronics",
    brand: "SoundMaster",
    rating: 4.4,
    reviews: 1234,
    stock: 156,
    tags: ["speaker", "bluetooth", "portable", "waterproof"],
    sku: "BTS-007",
    isFeatured: false,
    isNew: false,
    isOnSale: true,
    warranty: "1 Year",
    returnPolicy: "30 Days Return",
    shippingInfo: "Free shipping on orders above ₹999",
    weight: 0.85,
    dimensions: {
      length: 18.5,
      width: 18.5,
      height: 8.2
    },
    specifications: {
      "Power Output": "20W",
      "Battery Life": "12 Hours",
      "Waterproof": "IPX7",
      "Connectivity": "Bluetooth 5.0",
      "Range": "30 Meters",
      "Charging": "USB-C"
    },
    variants: [
      {
        id: "v7-1",
        productId: "7",
        name: "Color",
        value: "Black",
        stock: 78,
        sku: "BTS-007-BLK"
      },
      {
        id: "v7-2",
        productId: "7",
        name: "Color",
        value: "Blue",
        stock: 78,
        sku: "BTS-007-BLU"
      }
    ]
  },
  {
    id: "8",
    name: "Gaming Chair Pro",
    description: "Ergonomic gaming chair with lumbar support, adjustable armrests, and premium fabric. Designed for long gaming sessions with maximum comfort.",
    price: 8999,
    originalPrice: 12999,
    discount: 31,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=left",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&crop=right"
    ],
    category: "Furniture",
    brand: "ComfortMax",
    rating: 4.6,
    reviews: 445,
    stock: 34,
    tags: ["chair", "gaming", "ergonomic", "office"],
    sku: "GCP-008",
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    warranty: "2 Years",
    returnPolicy: "30 Days Return",
    shippingInfo: "Free shipping on orders above ₹999",
    weight: 18.5,
    dimensions: {
      length: 75.5,
      width: 68.2,
      height: 135.8
    },
    specifications: {
      "Weight Capacity": "150kg",
      "Material": "Premium Fabric",
      "Adjustments": "Height, Armrests, Backrest",
      "Lumbar Support": "Adjustable",
      "Headrest": "Removable",
      "Wheels": "5 Casters"
    },
    variants: [
      {
        id: "v8-1",
        productId: "8",
        name: "Color",
        value: "Black",
        stock: 18,
        sku: "GCP-008-BLK"
      },
      {
        id: "v8-2",
        productId: "8",
        name: "Color",
        value: "Gray",
        stock: 16,
        sku: "GCP-008-GRY"
      }
    ]
  },
  // --- COMPUTERS ---
  {
    id: "c1",
    name: "Apple MacBook Air M2",
    description: "Apple MacBook Air with M2 chip, 13.6-inch Liquid Retina display, 8GB RAM, 512GB SSD, macOS Ventura.",
    price: 119999,
    originalPrice: 129999,
    discount: 8,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=left"
    ],
    category: "Computers",
    brand: "Apple",
    rating: 4.9,
    reviews: 3200,
    stock: 25,
    tags: ["laptop", "macbook", "apple", "m2", "ssd"],
    sku: "MBA-M2-512",
    isFeatured: true,
    isNew: true,
    isOnSale: false,
    warranty: "1 Year",
    returnPolicy: "7 Days Replacement",
    shippingInfo: "Free delivery",
    weight: 1.24,
    dimensions: { length: 30.4, width: 21.5, height: 1.13 },
    specifications: {
      "Processor": "Apple M2",
      "RAM": "8GB",
      "Storage": "512GB SSD",
      "Display": "13.6-inch Liquid Retina",
      "Battery": "18 hours",
      "OS": "macOS Ventura"
    },
    variants: [
      { id: "c1-v1", productId: "c1", name: "Color", value: "Silver", stock: 10, sku: "MBA-M2-512-SLV" },
      { id: "c1-v2", productId: "c1", name: "Color", value: "Space Gray", stock: 15, sku: "MBA-M2-512-GRY" }
    ]
  },
  {
    id: "c2",
    name: "Dell XPS 13 Plus",
    description: "Dell XPS 13 Plus, 12th Gen Intel i7, 16GB RAM, 1TB SSD, 13.4-inch FHD+ InfinityEdge, Windows 11.",
    price: 139999,
    originalPrice: 149999,
    discount: 7,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop"
    ],
    category: "Computers",
    brand: "Dell",
    rating: 4.7,
    reviews: 2100,
    stock: 18,
    tags: ["laptop", "dell", "xps", "intel", "ssd"],
    sku: "XPS13P-1TB",
    isFeatured: true,
    isNew: false,
    isOnSale: true,
    warranty: "2 Years",
    returnPolicy: "7 Days Replacement",
    shippingInfo: "Free delivery",
    weight: 1.23,
    dimensions: { length: 29.6, width: 19.9, height: 1.5 },
    specifications: {
      "Processor": "Intel Core i7-1260P",
      "RAM": "16GB",
      "Storage": "1TB SSD",
      "Display": "13.4-inch FHD+",
      "Battery": "14 hours",
      "OS": "Windows 11"
    },
    variants: [
      { id: "c2-v1", productId: "c2", name: "Color", value: "Platinum", stock: 8, sku: "XPS13P-1TB-PLT" },
      { id: "c2-v2", productId: "c2", name: "Color", value: "Graphite", stock: 10, sku: "XPS13P-1TB-GPH" }
    ]
  }
]

// Create a search index for faster search
const searchIndex = new Map<string, Product[]>()

// Pre-build search index
products.forEach(product => {
  const searchTerms = [
    product.name.toLowerCase(),
    product.description.toLowerCase(),
    product.brand.toLowerCase(),
    product.category.toLowerCase(),
    ...product.tags.map(tag => tag.toLowerCase())
  ]
  
  searchTerms.forEach(term => {
    const words = term.split(' ')
    words.forEach(word => {
      if (word.length > 2) {
        if (!searchIndex.has(word)) {
          searchIndex.set(word, [])
        }
        searchIndex.get(word)!.push(product)
      }
    })
  })
})

export async function getProducts(): Promise<Product[]> {
  // Reduced delay for faster loading
  await new Promise((resolve) => setTimeout(resolve, 100))
  return products
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Reduced delay
  await new Promise((resolve) => setTimeout(resolve, 50))
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export async function searchProducts(query: string): Promise<Product[]> {
  // Reduced delay and improved search performance
  await new Promise((resolve) => setTimeout(resolve, 50))
  
  const lowercaseQuery = query.toLowerCase()
  const queryWords = lowercaseQuery.split(' ').filter(word => word.length > 2)
  
  if (queryWords.length === 0) return []
  
  // Use search index for faster results
  const matchedProducts = new Set<Product>()
  
  queryWords.forEach(word => {
    const products = searchIndex.get(word) || []
    products.forEach(product => matchedProducts.add(product))
  })
  
  return Array.from(matchedProducts)
}

// Mock reviews data
export const productReviews: ProductReview[] = [
  {
    id: "r1",
    productId: "1",
    userId: "user1",
    userName: "GamerPro123",
    userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    title: "Excellent Gaming Mouse!",
    comment: "This mouse is absolutely amazing for gaming. The RGB lighting is beautiful and the sensor is incredibly accurate. Battery life is great too!",
    helpful: 45,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    id: "r2",
    productId: "1",
    userId: "user2",
    userName: "TechEnthusiast",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    title: "Great mouse, minor issues",
    comment: "Overall a great gaming mouse. The only downside is the software could be better. But the performance is top-notch.",
    helpful: 23,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-10")
  },
  {
    id: "r3",
    productId: "2",
    userId: "user3",
    userName: "MusicLover",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    title: "Perfect for music!",
    comment: "The sound quality is incredible and the noise cancellation works perfectly. Battery life is as advertised. Highly recommend!",
    helpful: 67,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  }
]

// Categories data
export const categories: Category[] = [
  { id: "cat1", name: "Electronics", slug: "electronics", description: "Latest gadgets and electronic devices", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop", productCount: 156, isActive: true, sortOrder: 1 },
  { id: "cat2", name: "Computers", slug: "computers", description: "Laptops, desktops, and accessories", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=200&fit=crop", productCount: 89, isActive: true, sortOrder: 2 },
  { id: "cat3", name: "Fashion", slug: "fashion", description: "Clothing, shoes, and accessories", image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=200&fit=crop", productCount: 234, isActive: true, sortOrder: 3 },
  { id: "cat4", name: "Home & Garden", slug: "home-garden", description: "Furniture, decor, and garden supplies", image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=300&h=200&fit=crop", productCount: 178, isActive: true, sortOrder: 4 },
  { id: "cat5", name: "Books", slug: "books", description: "Fiction, non-fiction, and educational", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop", productCount: 456, isActive: true, sortOrder: 5 },
  { id: "cat6", name: "Gaming", slug: "gaming", description: "Games, consoles, and gaming accessories", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop", productCount: 123, isActive: true, sortOrder: 6 },
  { id: "cat7", name: "Automotive", slug: "automotive", description: "Car parts, tools, and accessories", image: "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=300&h=200&fit=crop", productCount: 67, isActive: true, sortOrder: 7 },
  { id: "cat8", name: "Health & Beauty", slug: "health-beauty", description: "Skincare, makeup, and wellness products", image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=300&h=200&fit=crop", productCount: 145, isActive: true, sortOrder: 8 },
  { id: "cat9", name: "Photography", slug: "photography", description: "Cameras, lenses, and photo equipment", image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=300&h=200&fit=crop", productCount: 78, isActive: true, sortOrder: 9 },
  { id: "cat10", name: "Music", slug: "music", description: "Instruments, audio equipment, and accessories", image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=200&fit=crop", productCount: 92, isActive: true, sortOrder: 10 }
]

// Brands data
export const brands: Brand[] = [
  {
    id: "brand1",
    name: "GamingTech",
    slug: "gamingtech",
    logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&h=100&fit=crop",
    description: "Premium gaming accessories and equipment",
    website: "https://gamingtech.com",
    productCount: 3,
    isActive: true
  },
  {
    id: "brand2",
    name: "SoundMaster",
    slug: "soundmaster",
    logo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
    description: "High-quality audio equipment",
    website: "https://soundmaster.com",
    productCount: 2,
    isActive: true
  },
  {
    id: "brand3",
    name: "FitTech",
    slug: "fittech",
    logo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
    description: "Smart fitness and health devices",
    website: "https://fittech.com",
    productCount: 1,
    isActive: true
  }
]
