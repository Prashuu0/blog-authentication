import { NextRequest, NextResponse } from "next/server"
import { getProductsFromDB, searchProductsFromDB } from "@/lib/products-db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")
    const category = searchParams.get("category")
    const sortBy = searchParams.get("sort")
    const limit = searchParams.get("limit")

    let products

    if (query) {
      // Search products
      products = await searchProductsFromDB(query)
    } else {
      // Get all products
      products = await getProductsFromDB()
    }

    // Apply category filter
    if (category && category !== "all") {
      products = products.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      )
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
      query: query || null,
      category: category || null,
      sortBy: sortBy || null,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch products",
        message: error instanceof Error ? error.message : "Unknown error"
      }, 
      { status: 500 }
    )
  }
}
