"use client"

import { useState, useEffect } from "react"
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface ProductFiltersProps {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  onFiltersChange: (filters: FilterState) => void
  totalProducts: number
  filteredCount: number
}

export interface FilterState {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  ratings: number[]
  availability: "all" | "inStock" | "outOfStock"
  sortBy: "relevance" | "priceLow" | "priceHigh" | "rating" | "newest" | "popular"
  features: string[]
}

const defaultFilters: FilterState = {
  categories: [],
  brands: [],
  priceRange: [0, 50000],
  ratings: [],
  availability: "all",
  sortBy: "relevance",
  features: []
}

export default function ProductFilters({
  categories,
  brands,
  priceRange,
  onFiltersChange,
  totalProducts,
  filteredCount
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    rating: true,
    features: true
  })

  useEffect(() => {
    onFiltersChange(filters)
  }, [filters, onFiltersChange])

  const updateFilters = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }))
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const clearFilters = () => {
    setFilters(defaultFilters)
  }

  const hasActiveFilters = () => {
    return (
      filters.categories.length > 0 ||
      filters.brands.length > 0 ||
      filters.ratings.length > 0 ||
      filters.availability !== "all" ||
      filters.sortBy !== "relevance" ||
      filters.features.length > 0 ||
      filters.priceRange[0] !== priceRange[0] ||
      filters.priceRange[1] !== priceRange[1]
    )
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.categories.length > 0) count += filters.categories.length
    if (filters.brands.length > 0) count += filters.brands.length
    if (filters.ratings.length > 0) count += filters.ratings.length
    if (filters.availability !== "all") count += 1
    if (filters.sortBy !== "relevance") count += 1
    if (filters.features.length > 0) count += filters.features.length
    if (filters.priceRange[0] !== priceRange[0] || filters.priceRange[1] !== priceRange[1]) count += 1
    return count
  }

  const removeFilter = (type: keyof FilterState, value: string | number) => {
    switch (type) {
      case "categories":
        updateFilters({
          categories: filters.categories.filter(cat => cat !== value)
        })
        break
      case "brands":
        updateFilters({
          brands: filters.brands.filter(brand => brand !== value)
        })
        break
      case "ratings":
        updateFilters({
          ratings: filters.ratings.filter(rating => rating !== value)
        })
        break
      case "features":
        updateFilters({
          features: filters.features.filter(feature => feature !== value)
        })
        break
    }
  }

  const FilterSection = ({ 
    title, 
    section, 
    children 
  }: { 
    title: string
    section: keyof typeof expandedSections
    children: React.ReactNode 
  }) => (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex items-center justify-between w-full py-2 text-left font-medium"
      >
        {title}
        {expandedSections[section] ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>
      {expandedSections[section] && (
        <div className="mt-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Mobile Filter Trigger */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {filteredCount} of {totalProducts}
              </span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {renderFilterContent()}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Filters</h3>
            {hasActiveFilters() && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700"
              >
                Clear All
              </Button>
            )}
          </div>
          
          <div className="space-y-4">
            {renderFilterContent()}
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map(category => (
            <Badge key={category} variant="secondary" className="gap-1">
              {category}
              <button
                onClick={() => removeFilter("categories", category)}
                className="ml-1 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.brands.map(brand => (
            <Badge key={brand} variant="secondary" className="gap-1">
              {brand}
              <button
                onClick={() => removeFilter("brands", brand)}
                className="ml-1 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.ratings.map(rating => (
            <Badge key={rating} variant="secondary" className="gap-1">
              {rating}★ & up
              <button
                onClick={() => removeFilter("ratings", rating)}
                className="ml-1 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {filters.availability !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {filters.availability === "inStock" ? "In Stock" : "Out of Stock"}
              <button
                onClick={() => updateFilters({ availability: "all" })}
                className="ml-1 hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )

  function renderFilterContent() {
    return (
      <>
        {/* Sort By */}
        <FilterSection title="Sort By" section="categories">
          <div className="space-y-2">
            {[
              { value: "relevance", label: "Relevance" },
              { value: "priceLow", label: "Price: Low to High" },
              { value: "priceHigh", label: "Price: High to Low" },
              { value: "rating", label: "Highest Rated" },
              { value: "newest", label: "Newest First" },
              { value: "popular", label: "Most Popular" }
            ].map(option => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`sort-${option.value}`}
                  checked={filters.sortBy === option.value}
                  onCheckedChange={() => updateFilters({ sortBy: option.value as FilterState["sortBy"] })}
                />
                <label
                  htmlFor={`sort-${option.value}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <Separator />

        {/* Categories */}
        <FilterSection title="Categories" section="categories">
          <div className="space-y-2">
            {categories.map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilters({
                        categories: [...filters.categories, category]
                      })
                    } else {
                      updateFilters({
                        categories: filters.categories.filter(c => c !== category)
                      })
                    }
                  }}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <Separator />

        {/* Brands */}
        <FilterSection title="Brands" section="brands">
          <div className="space-y-2">
            {brands.map(brand => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brands.includes(brand)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilters({
                        brands: [...filters.brands, brand]
                      })
                    } else {
                      updateFilters({
                        brands: filters.brands.filter(b => b !== brand)
                      })
                    }
                  }}
                />
                <label
                  htmlFor={`brand-${brand}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <Separator />

        {/* Price Range */}
        <FilterSection title="Price Range" section="price">
          <div className="space-y-4">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
              max={priceRange[1]}
              min={priceRange[0]}
              step={100}
              className="w-full"
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-xs text-gray-500">Min</label>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => updateFilters({
                    priceRange: [parseInt(e.target.value) || 0, filters.priceRange[1]]
                  })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500">Max</label>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilters({
                    priceRange: [filters.priceRange[0], parseInt(e.target.value) || priceRange[1]]
                  })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        </FilterSection>

        <Separator />

        {/* Ratings */}
        <FilterSection title="Customer Ratings" section="rating">
          <div className="space-y-2">
            {[4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.ratings.includes(rating)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilters({
                        ratings: [...filters.ratings, rating]
                      })
                    } else {
                      updateFilters({
                        ratings: filters.ratings.filter(r => r !== rating)
                      })
                    }
                  }}
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {rating}★ & up
                </label>
              </div>
            ))}
          </div>
        </FilterSection>

        <Separator />

        {/* Availability */}
        <FilterSection title="Availability" section="features">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={filters.availability === "inStock"}
                onCheckedChange={(checked) => {
                  updateFilters({ availability: checked ? "inStock" : "all" })
                }}
              />
              <label
                htmlFor="inStock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                In Stock
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="outOfStock"
                checked={filters.availability === "outOfStock"}
                onCheckedChange={(checked) => {
                  updateFilters({ availability: checked ? "outOfStock" : "all" })
                }}
              />
              <label
                htmlFor="outOfStock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Out of Stock
              </label>
            </div>
          </div>
        </FilterSection>

        <Separator />

        {/* Features */}
        <FilterSection title="Features" section="features">
          <div className="space-y-2">
            {[
              "Free Shipping",
              "On Sale",
              "New Arrival",
              "Best Seller",
              "Gift Available"
            ].map(feature => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={`feature-${feature}`}
                  checked={filters.features.includes(feature)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilters({
                        features: [...filters.features, feature]
                      })
                    } else {
                      updateFilters({
                        features: filters.features.filter(f => f !== feature)
                      })
                    }
                  }}
                />
                <label
                  htmlFor={`feature-${feature}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </FilterSection>
      </>
    )
  }
} 