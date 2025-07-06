"use client"

import React, { useState } from "react";
import { Search, Filter, SlidersHorizontal, Star, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FilterOptions {
  priceRange: [number, number];
  brands: string[];
  ratings: number[];
  availability: string;
  discount: string;
  sortBy: string;
  category: string;
}

interface AdvancedSearchProps {
  onFiltersChange: (filters: FilterOptions) => void;
  categories: string[];
  brands: string[];
}

const priceRanges = [
  { label: "Under ₹500", value: [0, 500] },
  { label: "₹500 - ₹1,000", value: [500, 1000] },
  { label: "₹1,000 - ₹2,000", value: [1000, 2000] },
  { label: "₹2,000 - ₹5,000", value: [2000, 5000] },
  { label: "Above ₹5,000", value: [5000, 10000] },
];

const discountRanges = [
  { label: "10% or more", value: "10" },
  { label: "25% or more", value: "25" },
  { label: "35% or more", value: "35" },
  { label: "50% or more", value: "50" },
  { label: "60% or more", value: "60" },
];

export default function AdvancedSearch({ onFiltersChange, categories, brands }: AdvancedSearchProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000],
    brands: [],
    ratings: [],
    availability: "all",
    discount: "all",
    sortBy: "relevance",
    category: "all",
  });

  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    handleFilterChange("brands", newBrands);
  };

  const handleRatingToggle = (rating: number) => {
    const newRatings = filters.ratings.includes(rating)
      ? filters.ratings.filter(r => r !== rating)
      : [...filters.ratings, rating];
    handleFilterChange("ratings", newRatings);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterOptions = {
      priceRange: [0, 10000],
      brands: [],
      ratings: [],
      availability: "all",
      discount: "all",
      sortBy: "relevance",
      category: "all",
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const activeFiltersCount = [
    filters.brands.length,
    filters.ratings.length,
    filters.availability !== "all" ? 1 : 0,
    filters.discount !== "all" ? 1 : 0,
    filters.category !== "all" ? 1 : 0,
  ].reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
      {/* Search Bar */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for products, brands and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
          />
        </div>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="flex items-center space-x-2 px-4 py-3"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge className="bg-blue-500 text-white text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3">
          Search
        </Button>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6 p-4 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-700">Active Filters:</span>
          {filters.brands.map(brand => (
            <Badge key={brand} variant="secondary" className="flex items-center space-x-1">
              <span>{brand}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleBrandToggle(brand)}
              />
            </Badge>
          ))}
          {filters.ratings.map(rating => (
            <Badge key={rating} variant="secondary" className="flex items-center space-x-1">
              <span>{rating}+ Stars</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleRatingToggle(rating)}
              />
            </Badge>
          ))}
          {filters.availability !== "all" && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{filters.availability}</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange("availability", "all")}
              />
            </Badge>
          )}
          {filters.discount !== "all" && (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <span>{filters.discount}%+ off</span>
              <X 
                className="h-3 w-3 cursor-pointer" 
                onClick={() => handleFilterChange("discount", "all")}
              />
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-700"
          >
            Clear All
          </Button>
        </div>
      )}

      {/* Filters Panel */}
      {showFilters && (
        <div className="border-t border-gray-200 pt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Category</h3>
              <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Sort By</h3>
              <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Customer Rating</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Availability</h3>
              <RadioGroup value={filters.availability} onValueChange={(value) => handleFilterChange("availability", value)}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="in-stock" id="in-stock" />
                    <Label htmlFor="in-stock">In Stock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="out-of-stock" id="out-of-stock" />
                    <Label htmlFor="out-of-stock">Out of Stock</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Discount */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Discount</h3>
              <RadioGroup value={filters.discount} onValueChange={(value) => handleFilterChange("discount", value)}>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="discount-all" />
                    <Label htmlFor="discount-all">All</Label>
                  </div>
                  {discountRanges.map(range => (
                    <div key={range.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={range.value} id={`discount-${range.value}`} />
                      <Label htmlFor={`discount-${range.value}`}>{range.label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Price Range</h3>
            <div className="space-y-4">
              <Slider
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange("priceRange", value)}
                max={10000}
                min={0}
                step={100}
                className="w-full"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>₹{filters.priceRange[0]}</span>
                <span>₹{filters.priceRange[1]}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {priceRanges.map(range => (
                  <Button
                    key={range.label}
                    variant="outline"
                    size="sm"
                    onClick={() => handleFilterChange("priceRange", range.value)}
                    className="text-xs"
                  >
                    {range.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Brands */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Brands</h3>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {brands.map(brand => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => handleBrandToggle(brand)}
                  />
                  <Label htmlFor={brand} className="text-sm cursor-pointer">
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Ratings */}
          <div className="mt-6">
            <h3 className="font-semibold text-gray-800 mb-3">Customer Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map(rating => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.ratings.includes(rating)}
                    onCheckedChange={() => handleRatingToggle(rating)}
                  />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center space-x-1 cursor-pointer">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm">& Up</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 