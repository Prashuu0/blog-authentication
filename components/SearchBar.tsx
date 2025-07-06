"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Loader2 } from "lucide-react"
import { useDebounce } from "@/hooks/use-debounce"

interface SearchBarProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
  showSuggestions?: boolean
}

interface SearchSuggestion {
  type: "product" | "category" | "brand"
  value: string
  count?: number
}

export default function SearchBar({ 
  placeholder = "Search for products, brands and more...",
  className = "",
  onSearch,
  showSuggestions = true
}: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestionsDropdown, setShowSuggestionsDropdown] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 200)

  // Mock suggestions based on query
  const mockSuggestions: SearchSuggestion[] = [
    { type: "product", value: "Wireless Headphones", count: 3 },
    { type: "product", value: "Smart Watch", count: 2 },
    { type: "category", value: "Electronics", count: 8 },
    { type: "brand", value: "AudioTech", count: 1 },
    { type: "product", value: "Gaming Mouse", count: 1 },
  ]

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.length > 1) {
      setIsLoading(true)
      // Simulate API call with reduced delay
      setTimeout(() => {
        const filtered = mockSuggestions.filter(suggestion =>
          suggestion.value.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        setSuggestions(filtered)
        setIsLoading(false)
      }, 100)
    } else {
      setSuggestions([])
      setIsLoading(false)
    }
  }, [debouncedQuery])

  const handleSearch = useCallback((searchQuery: string) => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim())
      } else {
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      }
      setQuery("")
      setShowSuggestionsDropdown(false)
      setSelectedIndex(-1)
    }
  }, [onSearch, router])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
        handleSearch(suggestions[selectedIndex].value)
      } else {
        handleSearch(query)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === "Escape") {
      setShowSuggestionsDropdown(false)
      setSelectedIndex(-1)
      inputRef.current?.blur()
    }
  }, [selectedIndex, suggestions.length, handleSearch, query])

  const handleSuggestionClick = useCallback((suggestion: SearchSuggestion) => {
    handleSearch(suggestion.value)
  }, [handleSearch])

  const clearQuery = useCallback(() => {
    setQuery("")
    setSuggestions([])
    setSelectedIndex(-1)
    inputRef.current?.focus()
  }, [])

  const getSuggestionIcon = useCallback((type: string) => {
    switch (type) {
      case "product":
        return "📦"
      case "category":
        return "📂"
      case "brand":
        return "🏷️"
      default:
        return "🔍"
    }
  }, [])

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelectedIndex(-1)
            setShowSuggestionsDropdown(true)
          }}
          onFocus={() => setShowSuggestionsDropdown(true)}
          onBlur={() => setTimeout(() => setShowSuggestionsDropdown(false), 150)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-10 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-200"
        />
        
        {isLoading && (
          <Loader2 className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 animate-spin" />
        )}
        
        {query && !isLoading && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearQuery}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-gray-100"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Suggestions */}
      {showSuggestions && showSuggestionsDropdown && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={`${suggestion.type}-${suggestion.value}`}
              className={`px-4 py-3 cursor-pointer transition-colors duration-150 flex items-center justify-between ${
                index === selectedIndex 
                  ? "bg-blue-50 border-l-4 border-blue-500" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="flex items-center flex-1">
                <span className="mr-3 text-lg">{getSuggestionIcon(suggestion.type)}</span>
                <div>
                  <div className="font-medium">{suggestion.value}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {suggestion.type}
                    {suggestion.count && ` • ${suggestion.count} items`}
                  </div>
                </div>
              </div>
              {index === selectedIndex && (
                <span className="text-xs text-blue-500 font-medium">Press Enter</span>
              )}
            </div>
          ))}
          
          {/* Search all results */}
          <div className="border-t border-gray-100">
            <div
              className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer font-medium"
              onClick={() => handleSearch(query)}
            >
              🔍 Search for "{query}"
            </div>
          </div>
        </div>
      )}

      {/* No results */}
      {showSuggestions && showSuggestionsDropdown && query.length > 1 && suggestions.length === 0 && !isLoading && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
          <div className="px-4 py-3 text-gray-500 text-center">
            <div className="text-2xl mb-2">🔍</div>
            <div>No suggestions found for "{query}"</div>
            <div className="text-sm mt-1">Try searching for something else</div>
          </div>
        </div>
      )}
    </div>
  )
} 