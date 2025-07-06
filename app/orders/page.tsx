"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/AuthContext"
import { Package, Truck, CheckCircle, Clock } from "lucide-react"
import Image from "next/image"
import OrderTracking from "@/components/OrderTracking"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 299.99,
    items: [
      {
        id: "1",
        name: "Wireless Bluetooth Headphones",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "2",
        name: "Smart Fitness Watch",
        price: 100.0,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "shipped",
    total: 149.99,
    items: [
      {
        id: "3",
        name: "Premium Coffee Maker",
        price: 149.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-003",
    date: "2024-01-25",
    status: "processing",
    total: 79.99,
    items: [
      {
        id: "5",
        name: "Wireless Gaming Mouse",
        price: 79.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "processing":
      return <Clock className="h-4 w-4" />
    case "shipped":
      return <Truck className="h-4 w-4" />
    case "delivered":
      return <CheckCircle className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "processing":
      return "bg-yellow-500"
    case "shipped":
      return "bg-blue-500"
    case "delivered":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders] = useState(mockOrders)
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  if (!user) {
    return (
      <div className="profile-bg flex items-center justify-center min-h-screen relative">
        <div className="ecommerce-card p-8 max-w-md w-full text-center zero-gravity">
          <h1 className="text-4xl font-bold mb-8 shopping-header bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">📦 My Orders</h1>
          <p className="text-gray-700 mb-8 text-lg font-medium">Please login to view your orders</p>
          <Button asChild className="btn-accent w-full py-4 text-lg font-semibold">
            <a href="/login">🛒 Login to View Orders</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-bg relative">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight shopping-header drop-shadow-lg bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">📦 My Orders</h1>
        </div>

      {orders.length === 0 ? (
        <div className="ecommerce-card p-8 text-center">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
          <Button asChild className="shopping-btn">
            <a href="/">🛒 Browse Products</a>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="ecommerce-card border-0 shadow-none bg-transparent">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Order #{order.id}
                      <Badge className={`${getStatusColor(order.status)} text-white`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </Badge>
                    </CardTitle>
                    <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedOrder(selectedOrder === order.id ? null : order.id)}
                  >
                    {selectedOrder === order.id ? "Hide Tracking" : "Track Order"}
                  </Button>
                  <Button variant="outline">Reorder Items</Button>
                </div>
                
                {/* Order Tracking */}
                {selectedOrder === order.id && (
                  <div className="mt-6 pt-6 border-t">
                    <OrderTracking
                      orderId={order.id}
                      orderStatus={order.status}
                      estimatedDelivery="2024-02-05"
                      trackingSteps={[
                        {
                          id: "1",
                          title: "Order Confirmed",
                          description: "Your order has been confirmed and is being processed",
                          status: "completed",
                          timestamp: order.date,
                          location: "Warehouse"
                        },
                        {
                          id: "2",
                          title: "Processing",
                          description: "Your order is being prepared for shipment",
                          status: order.status === "processing" ? "current" : "completed",
                          timestamp: "2024-01-26",
                          location: "Warehouse"
                        },
                        {
                          id: "3",
                          title: "Shipped",
                          description: "Your order has been shipped and is on its way",
                          status: order.status === "shipped" ? "current" : order.status === "delivered" ? "completed" : "pending",
                          timestamp: "2024-01-27",
                          location: "Shipping Center"
                        },
                        {
                          id: "4",
                          title: "Out for Delivery",
                          description: "Your order is out for delivery",
                          status: order.status === "delivered" ? "completed" : "pending",
                          timestamp: "2024-01-28",
                          location: "Local Delivery"
                        },
                        {
                          id: "5",
                          title: "Delivered",
                          description: "Your order has been delivered successfully",
                          status: order.status === "delivered" ? "completed" : "pending",
                          timestamp: "2024-01-29",
                          location: "Your Address"
                        }
                      ]}
                      deliveryPerson={order.status === "shipped" ? {
                        name: "Rahul Kumar",
                        phone: "+91 98765 43210",
                        vehicleNumber: "DL-01-AB-1234",
                        estimatedArrival: "Today, 2:00 PM - 4:00 PM"
                      } : undefined}
                      currentLocation={order.status === "shipped" ? "Mumbai, Maharashtra" : undefined}
                      destination="Delhi, India"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      </div>
    </div>
  )
}
