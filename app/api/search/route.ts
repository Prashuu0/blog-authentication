import { NextRequest, NextResponse } from "next/server"
import { searchProducts, getProducts } from "@/lib/products"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const category = searchParams.get("category")
    const priceMin = searchParams.get("priceMin")
    const priceMax = searchParams.get("priceMax")
    const sortBy = searchParams.get("sort")
    const limit = searchParams.get("limit")

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Search query is required",
          message: "Please provide a search query"
        }, 
        { status: 400 }
      )
    }

    // Search products
    let products = await searchProducts(query.trim())

    // Apply category filter
    if (category && category !== "all") {
      products = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
    }

    // Apply price range filter
    if (priceMin || priceMax) {
      products = products.filter((product) => {
        const min = priceMin ? parseFloat(priceMin) : 0
        const max = priceMax ? parseFloat(priceMax) : Infinity
        return product.price >= min && product.price <= max
      })
    }

    // Apply sorting
    if (sortBy) {
      products.sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "name":
            return a.name.localeCompare(b.name)
          case "relevance":
            // Sort by how well the product matches the query
            const aScore = getRelevanceScore(a, query)
            const bScore = getRelevanceScore(b, query)
            return bScore - aScore
          default:
            return 0
        }
      })
    }

    // Apply limit
    if (limit) {
      const limitNum = parseInt(limit, 10)
      if (!isNaN(limitNum)) {
        products = products.slice(0, limitNum)
      }
    }

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length,
      query: query.trim(),
      category: category || null,
      priceRange: {
        min: priceMin ? parseFloat(priceMin) : null,
        max: priceMax ? parseFloat(priceMax) : null,
      },
      sortBy: sortBy || null,
      suggestions: generateSuggestions(query, products),
    })
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to search products",
        message: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    )
  }
}

// Helper function to calculate relevance score
function getRelevanceScore(product: any, query: string): number {
  const queryLower = query.toLowerCase()
  let score = 0

  // Exact name match gets highest score
  if (product.name.toLowerCase().includes(queryLower)) {
    score += 10
  }

  // Description match
  if (product.description.toLowerCase().includes(queryLower)) {
    score += 5
  }

  // Tag match
  if (product.tags.some((tag: string) => tag.toLowerCase().includes(queryLower))) {
    score += 3
  }

  // Brand match
  if (product.brand.toLowerCase().includes(queryLower)) {
    score += 2
  }

  // Category match
  if (product.category.toLowerCase().includes(queryLower)) {
    score += 1
  }

  return score
}

// Helper function to generate search suggestions
function generateSuggestions(query: string, products: any[]): string[] {
  const suggestions = new Set<string>()
  
  // Add product names that start with the query
  products.forEach(product => {
    if (product.name.toLowerCase().startsWith(query.toLowerCase())) {
      suggestions.add(product.name)
    }
  })

  // Add categories
  products.forEach(product => {
    if (product.category.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(product.category)
    }
  })

  // Add brands
  products.forEach(product => {
    if (product.brand.toLowerCase().includes(query.toLowerCase())) {
      suggestions.add(product.brand)
    }
  })

  return Array.from(suggestions).slice(0, 5)
} 