"use client"

import React, { useState } from "react";
import { TrendingUp, Heart, Eye, ShoppingCart, Star, Clock, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
  isNew?: boolean;
  isTrending?: boolean;
  views?: number;
  sales?: number;
}

interface RecommendationEngineProps {
  userId?: string;
  currentProduct?: Product;
  recentlyViewed: Product[];
  frequentlyBoughtTogether: Product[];
  trendingProducts: Product[];
  personalizedRecommendations: Product[];
  similarProducts: Product[];
  categoryRecommendations: Product[];
}

export default function RecommendationEngine({
  userId,
  currentProduct,
  recentlyViewed,
  frequentlyBoughtTogether,
  trendingProducts,
  personalizedRecommendations,
  similarProducts,
  categoryRecommendations,
}: RecommendationEngineProps) {
  const [activeTab, setActiveTab] = useState("personalized");

  const ProductCard = ({ product, showBadge = false, badgeText = "" }: { 
    product: Product; 
    showBadge?: boolean; 
    badgeText?: string;
  }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-48 bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            
            {showBadge && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-blue-500 text-white">
                  {badgeText}
                </Badge>
              </div>
            )}

            {product.isNew && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-500 text-white">NEW</Badge>
              </div>
            )}

            {product.isTrending && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-orange-500 text-white">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  TRENDING
                </Badge>
              </div>
            )}
          </div>
        </Link>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex flex-col space-y-2">
            <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="secondary" className="bg-white/90 backdrop-blur-sm">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-xs">
              {product.brand}
            </Badge>
            {product.views && (
              <div className="flex items-center text-xs text-gray-500">
                <Eye className="h-3 w-3 mr-1" />
                {product.views}
              </div>
            )}
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 line-clamp-2 text-sm">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-600">({product.reviews})</span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-bold text-green-600">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
            {product.discount && (
              <Badge className="bg-green-100 text-green-700 text-xs">
                -{product.discount}%
              </Badge>
            )}
          </div>

          <Button 
            size="sm" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Main Recommendations */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-gray-800">
            <Sparkles className="h-8 w-8 mr-3 text-purple-600" />
            Recommended for You
            {userId && <span className="text-sm font-normal text-gray-600 ml-2">(Personalized)</span>}
          </CardTitle>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personalized">Personalized</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="similar">Similar</TabsTrigger>
          <TabsTrigger value="frequently">Frequently Bought</TabsTrigger>
          <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
        </TabsList>

        <TabsContent value="personalized" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {personalizedRecommendations.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showBadge={true} 
                badgeText="FOR YOU"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {trendingProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showBadge={true} 
                badgeText="TRENDING"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="similar" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {similarProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showBadge={true} 
                badgeText="SIMILAR"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="frequently" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {frequentlyBoughtTogether.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showBadge={true} 
                badgeText="POPULAR"
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {recentlyViewed.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                showBadge={true} 
                badgeText="RECENT"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Category-based Recommendations */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-bold text-gray-800">
            <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
            Popular in {currentProduct?.category || "Electronics"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categoryRecommendations.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Insights */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Based on Your Likes</h3>
                <p className="text-sm text-blue-600">Products you've shown interest in</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-700">Similar to your favorites</span>
                <span className="font-semibold text-blue-800">85% match</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Purchase History</h3>
                <p className="text-sm text-green-600">Based on your past orders</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-700">Frequently bought together</span>
                <span className="font-semibold text-green-800">92% accuracy</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-800">Trending Now</h3>
                <p className="text-sm text-purple-600">What others are buying</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-700">Popular in your area</span>
                <span className="font-semibold text-purple-800">78% relevance</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation Settings */}
      <Card className="bg-gray-50 border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-800">Improve Recommendations</h3>
              <p className="text-sm text-gray-600">
                Rate products and update preferences for better suggestions
              </p>
            </div>
            <Button variant="outline" className="bg-white">
              Update Preferences
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 