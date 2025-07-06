"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/ProductCard"
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton"
import { getProducts } from "@/lib/products"
import { Search, Filter, X } from "lucide-react"
import type { Product } from "@/types"
import AdvancedSearch from "@/components/AdvancedSearch"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [filterCategory, setFilterCategory] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    // Handle URL search parameters
    const urlSearch = searchParams.get("search")
    if (urlSearch) {
      setSearchQuery(urlSearch)
    }
  }, [searchParams])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchQuery, sortBy, filterCategory, priceRange])

  const loadProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = [...products]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === filterCategory.toLowerCase())
    }

    // Price range filter
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-50":
          filtered = filtered.filter((product) => product.price < 50)
          break
        case "50-100":
          filtered = filtered.filter((product) => product.price >= 50 && product.price <= 100)
          break
        case "100-200":
          filtered = filtered.filter((product) => product.price >= 100 && product.price <= 200)
          break
        case "over-200":
          filtered = filtered.filter((product) => product.price > 200)
          break
      }
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

    setFilteredProducts(filtered)
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setFilterCategory("all")
    setPriceRange("all")
    setSortBy("name")
  }

  const categories = [...new Set(products.map((product) => product.category))]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProductGridSkeleton />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Advanced Search */}
      <AdvancedSearch
        onFiltersChange={(filters) => {
          console.log("Filters changed:", filters);
          // Apply filters to products
          let filtered = [...products];
          
          if (filters.category !== "all") {
            filtered = filtered.filter(p => p.category.toLowerCase() === filters.category.toLowerCase());
          }
          
          if (filters.brands.length > 0) {
            filtered = filtered.filter(p => filters.brands.includes(p.brand));
          }
          
          if (filters.ratings.length > 0) {
            filtered = filtered.filter(p => filters.ratings.includes(Math.floor(p.rating)));
          }
          
          if (filters.priceRange[0] > 0 || filters.priceRange[1] < 10000) {
            filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
          }
          
          setFilteredProducts(filtered);
        }}
        categories={categories}
        brands={[...new Set(products.map(p => p.brand))]}
      />

      {/* Products Grid */}
      <div className="w-full mt-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            {searchQuery && (
              <p className="text-gray-600 mt-1">
                Search results for: <span className="font-semibold">"{searchQuery}"</span>
              </p>
            )}
          </div>
          <Badge variant="secondary">{filteredProducts.length} products found</Badge>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg mb-2">No products found matching your criteria.</p>
            <p className="text-gray-500 text-sm mb-4">Try adjusting your search or filters.</p>
            <Button
              onClick={clearAllFilters}
              className="mt-4"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
