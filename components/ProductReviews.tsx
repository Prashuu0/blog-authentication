"use client"

import React, { useState } from "react"
import { Star, ThumbsUp, ThumbsDown, Filter, MessageCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  date: string
  helpful: number
  notHelpful: number
  verified: boolean
  images?: string[]
}

interface ProductReviewsProps {
  productId: string
  productName: string
  averageRating: number
  totalReviews: number
  reviews: Review[]
}

const ratingDistribution = [
  { stars: 5, count: 1250, percentage: 65 },
  { stars: 4, count: 480, percentage: 25 },
  { stars: 3, count: 120, percentage: 6 },
  { stars: 2, count: 60, percentage: 3 },
  { stars: 1, count: 30, percentage: 1 },
]

export default function ProductReviews({ 
  productId, 
  productName, 
  averageRating, 
  totalReviews, 
  reviews 
}: ProductReviewsProps) {
  const [selectedRating, setSelectedRating] = useState<number>(0)
  const [reviewTitle, setReviewTitle] = useState("")
  const [reviewComment, setReviewComment] = useState("")
  const [filterRating, setFilterRating] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("recent")
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({})

  const handleSubmitReview = () => {
    if (selectedRating === 0) {
      alert("Please select a rating")
      return
    }
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      alert("Please fill in all fields")
      return
    }
    
    // Here you would typically submit to your API
    console.log("Submitting review:", {
      productId,
      rating: selectedRating,
      title: reviewTitle,
      comment: reviewComment,
    })
    
    // Reset form
    setSelectedRating(0)
    setReviewTitle("")
    setReviewComment("")
    setShowReviewForm(false)
  }

  const handleHelpfulVote = (reviewId: string, isHelpful: boolean) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: isHelpful
    }))
  }

  const filteredReviews = reviews.filter(review => {
    if (filterRating === "all") return true
    return review.rating === parseInt(filterRating)
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "recent":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "helpful":
        return b.helpful - a.helpful
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Reviews Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Customer Reviews</h2>
          <Button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Write a Review
          </Button>
        </div>

        {/* Rating Summary */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 ${
                    i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">Based on {totalReviews} reviews</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Rating Distribution</h3>
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center mb-2">
                <div className="flex items-center w-16">
                  <span className="text-sm text-gray-600 mr-2">{item.stars}★</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm text-gray-500 ml-2">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Write Your Review</h3>
          
          {/* Rating Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors duration-200 ${
                      rating <= selectedRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 hover:text-yellow-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Review Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
            <input
              type="text"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Summarize your experience"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Review Comment */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <Textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={4}
              className="w-full"
            />
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSubmitReview} className="bg-blue-600 hover:bg-blue-700">
              Submit Review
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowReviewForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Filters and Sort */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 border border-gray-100">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.userAvatar} />
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800">{review.userName}</span>
                    {review.verified && (
                      <Badge className="bg-green-100 text-green-700 text-xs">Verified Purchase</Badge>
                    )}
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
              <p className="text-gray-600 leading-relaxed">{review.comment}</p>
            </div>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex space-x-2 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                ))}
              </div>
            )}

            {/* Helpful Votes */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleHelpfulVote(review.id, true)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    helpfulVotes[review.id] === true
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600 hover:bg-green-50"
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button
                  onClick={() => handleHelpfulVote(review.id, false)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors duration-200 ${
                    helpfulVotes[review.id] === false
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600 hover:bg-red-50"
                  }`}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>Not Helpful ({review.notHelpful})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {sortedReviews.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="outline" className="px-8 py-3">
            Load More Reviews
          </Button>
        </div>
      )}
    </div>
  )
} 