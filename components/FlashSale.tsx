"use client"

import React, { useState, useEffect } from "react";
import { Clock, Flame, Zap, TrendingUp, Users, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import Link from "next/link";

interface FlashSaleProduct {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  soldCount: number;
  totalStock: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
}

interface FlashSaleProps {
  title: string;
  endTime: Date;
  products: FlashSaleProduct[];
}

export default function FlashSale({ title, endTime, products }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = endTime.getTime();
      const difference = end - now;

      if (difference <= 0) {
        setIsActive(false);
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const formatTime = (time: number) => time.toString().padStart(2, "0");

  const getStockPercentage = (sold: number, total: number) => {
    return Math.min((sold / total) * 100, 100);
  };

  const getStockStatus = (percentage: number) => {
    if (percentage >= 90) return { color: "bg-red-500", text: "Almost Gone!" };
    if (percentage >= 70) return { color: "bg-orange-500", text: "Selling Fast!" };
    if (percentage >= 50) return { color: "bg-yellow-500", text: "Limited Stock" };
    return { color: "bg-green-500", text: "In Stock" };
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Flash Sale Header */}
      <Card className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 border-0 shadow-2xl mb-8">
        <CardHeader className="text-center text-white">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Flame className="h-8 w-8 animate-pulse" />
            <CardTitle className="text-3xl font-bold">🔥 {title} 🔥</CardTitle>
            <Zap className="h-8 w-8 animate-pulse" />
          </div>
          
          {isActive ? (
            <div className="space-y-4">
              <p className="text-xl font-semibold">Sale Ends In:</p>
              <div className="flex items-center justify-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px]">
                  <div className="text-2xl font-bold">{formatTime(timeLeft.hours)}</div>
                  <div className="text-sm">Hours</div>
                </div>
                <div className="text-2xl font-bold">:</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px]">
                  <div className="text-2xl font-bold">{formatTime(timeLeft.minutes)}</div>
                  <div className="text-sm">Minutes</div>
                </div>
                <div className="text-2xl font-bold">:</div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center min-w-[80px]">
                  <div className="text-2xl font-bold">{formatTime(timeLeft.seconds)}</div>
                  <div className="text-sm">Seconds</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-2xl font-bold">Sale Ended</p>
              <p className="text-lg">Check back for more amazing deals!</p>
            </div>
          )}
        </CardHeader>
      </Card>

      {/* Flash Sale Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => {
          const stockPercentage = getStockPercentage(product.soldCount, product.totalStock);
          const stockStatus = getStockStatus(stockPercentage);
          const remainingStock = product.totalStock - product.soldCount;

          return (
            <Card 
              key={product.id} 
              className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <Link href={`/products/${product.id}`}>
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src="/placeholder.svg"
                      alt={product.name}
                      width={200}
                      height={200}
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Debug fallback: plain img tag */}
                    <img
                      src="/placeholder.jpg"
                      alt={product.name}
                      width={200}
                      height={200}
                      style={{ objectFit: 'cover', border: '2px solid red' }}
                    />
                    
                    {/* Flash Sale Badge */}
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 text-white animate-pulse">
                        <Flame className="h-3 w-3 mr-1" />
                        FLASH SALE
                      </Badge>
                    </div>

                    {/* Discount Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white text-lg font-bold">
                        -{product.discount}%
                      </Badge>
                    </div>

                    {/* Stock Status */}
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="bg-black/70 backdrop-blur-sm rounded-lg p-2">
                        <div className="flex items-center justify-between text-white text-sm mb-1">
                          <span>{stockStatus.text}</span>
                          <span>{remainingStock} left</span>
                        </div>
                        <Progress 
                          value={stockPercentage} 
                          className="h-2"
                        />
                      </div>
                    </div>
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

              {/* Product Info */}
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Brand & Category */}
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {product.brand}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </div>

                  {/* Product Name */}
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${
                            i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-green-600">
                        ₹{product.salePrice.toLocaleString()}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">
                        You save ₹{(product.originalPrice - product.salePrice).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Sold Count */}
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Users className="h-4 w-4" />
                    <span>{product.soldCount} people bought this</span>
                  </div>

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-3"
                    disabled={remainingStock === 0}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {remainingStock === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Flash Sale Stats */}
      <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {products.length}
              </div>
              <div className="text-gray-600">Products on Sale</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {products.reduce((sum, p) => sum + p.soldCount, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Units Sold</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {Math.max(...products.map(p => p.discount))}%
              </div>
              <div className="text-gray-600">Max Discount</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {isActive ? "LIVE" : "ENDED"}
              </div>
              <div className="text-gray-600">Sale Status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flash Sale Tips */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-800 mb-4 flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Flash Sale Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">⚡</span>
              <span>Add items to cart quickly - stock is limited!</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">⏰</span>
              <span>Set reminders for upcoming flash sales</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">💳</span>
              <span>Use UPI for instant discounts</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-600">🎯</span>
              <span>Check the progress bar for stock availability</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 