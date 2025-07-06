"use client"

import React, { useState } from "react";
import { Truck, MapPin, Phone, Clock, CheckCircle, Circle, Package, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TrackingStep {
  id: string;
  title: string;
  description: string;
  status: "completed" | "current" | "pending";
  timestamp: string;
  location?: string;
}

interface DeliveryPerson {
  name: string;
  phone: string;
  avatar?: string;
  vehicleNumber: string;
  estimatedArrival: string;
}

interface OrderTrackingProps {
  orderId: string;
  orderStatus: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
  deliveryPerson?: DeliveryPerson;
  currentLocation?: string;
  destination: string;
}

export default function OrderTracking({ 
  orderId, 
  orderStatus, 
  estimatedDelivery, 
  trackingSteps, 
  deliveryPerson,
  currentLocation,
  destination 
}: OrderTrackingProps) {
  const [showMap, setShowMap] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Order Confirmed":
        return "bg-blue-500";
      case "Processing":
        return "bg-yellow-500";
      case "Shipped":
        return "bg-purple-500";
      case "Out for Delivery":
        return "bg-orange-500";
      case "Delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Order Confirmed":
        return "📋";
      case "Processing":
        return "⚙️";
      case "Shipped":
        return "📦";
      case "Out for Delivery":
        return "🚚";
      case "Delivered":
        return "✅";
      default:
        return "📋";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Order Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-800">Order #{orderId}</CardTitle>
              <p className="text-gray-600 mt-1">Estimated delivery: {estimatedDelivery}</p>
            </div>
            <Badge className={`text-white px-4 py-2 text-lg ${getStatusColor(orderStatus)}`}>
              {getStatusIcon(orderStatus)} {orderStatus}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Tracking Timeline */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-bold text-gray-800">
            <Truck className="h-6 w-6 mr-2 text-blue-600" />
            Order Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Timeline Steps */}
            <div className="space-y-8">
              {trackingSteps.map((step, index) => (
                <div key={step.id} className="relative flex items-start">
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                    step.status === "completed" 
                      ? "bg-green-500" 
                      : step.status === "current" 
                      ? "bg-blue-500 animate-pulse" 
                      : "bg-gray-300"
                  }`}>
                    {step.status === "completed" && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="ml-12 flex-1">
                    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-lg">{step.title}</h3>
                          <p className="text-gray-600 mt-1">{step.description}</p>
                          {step.location && (
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {step.location}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{step.timestamp}</p>
                          {step.status === "current" && (
                            <Badge className="bg-blue-100 text-blue-700 mt-1">Current</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Delivery Person Info */}
      {deliveryPerson && (
        <Card className="shadow-lg border-0 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold text-gray-800">
              <User className="h-6 w-6 mr-2 text-green-600" />
              Delivery Partner
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={deliveryPerson.avatar} />
                <AvatarFallback className="bg-green-100 text-green-700 text-xl">
                  {deliveryPerson.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-lg">{deliveryPerson.name}</h3>
                <p className="text-gray-600">Vehicle: {deliveryPerson.vehicleNumber}</p>
                <p className="text-gray-600">ETA: {deliveryPerson.estimatedArrival}</p>
              </div>

              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={() => window.open(`tel:${deliveryPerson.phone}`)}
                >
                  <Phone className="h-4 w-4" />
                  <span>Call</span>
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
                  onClick={() => setShowMap(!showMap)}
                >
                  <MapPin className="h-4 w-4" />
                  <span>Track</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Map */}
      {showMap && (
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-xl font-bold text-gray-800">
              <MapPin className="h-6 w-6 mr-2 text-red-600" />
              Live Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-xl p-6 h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600 mb-2">Live tracking map</p>
                <p className="text-sm text-gray-500">
                  {currentLocation} → {destination}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Delivery Details */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-bold text-gray-800">
              <Package className="h-5 w-5 mr-2 text-purple-600" />
              Delivery Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-semibold">{orderId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Status:</span>
              <Badge className={getStatusColor(orderStatus)}>
                {orderStatus}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Estimated Delivery:</span>
              <span className="font-semibold">{estimatedDelivery}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Destination:</span>
              <span className="font-semibold text-right">{destination}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-bold text-gray-800">
              <Clock className="h-5 w-5 mr-2 text-orange-600" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Phone className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline" className="w-full">
              <Package className="h-4 w-4 mr-2" />
              View Order Details
            </Button>
            <Button variant="outline" className="w-full">
              <Truck className="h-4 w-4 mr-2" />
              Track Another Order
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Delivery Instructions */}
      <Card className="shadow-lg border-0 bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-bold text-yellow-800">
            📝 Delivery Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-yellow-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Please keep someone available at the delivery address</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Have your ID proof ready for verification</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Check the package before signing the delivery receipt</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>For any issues, contact our support team immediately</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 