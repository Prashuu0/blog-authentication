"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Shield, 
  Edit, 
  Trash2, 
  Plus, 
  Star,
  Phone,
  Mail,
  Calendar,
  Truck,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react"
import type { UserProfile, UserAddress, Order, WishlistItem, AddressFormData, PasswordFormData } from "@/types"
import { 
  getUserProfile, 
  updateUserProfile, 
  getUserOrders, 
  getUserWishlist,
  addAddress,
  updateAddress,
  deleteAddress,
  removeFromWishlist,
  changePassword
} from "@/lib/userData"
import { validateProfile, validateAddress, validatePassword, formatPhoneNumber } from "@/lib/validation"
import { ProfileSidebar } from "@/components/ProfileSidebar"
import { ProfileSkeleton } from "@/components/ProfileSkeleton"
import "@/styles/globals.css"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("profile")
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
  })
  
  const [passwordForm, setPasswordForm] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [addressForm, setAddressForm] = useState<AddressFormData>({
    type: "home",
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    isDefault: false,
  })

  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null)
  const [showAddressDialog, setShowAddressDialog] = useState(false)

  useEffect(() => {
    if (user) {
      loadUserData()
    }
  }, [user])

  const loadUserData = async () => {
    try {
      setLoading(true)
      const [profileData, ordersData, wishlistData] = await Promise.all([
        getUserProfile(user!.id),
        getUserOrders(user!.id),
        getUserWishlist(user!.id)
      ])
      
      setProfile(profileData)
      setOrders(ordersData)
      setWishlist(wishlistData)
      setProfileForm({
        name: profileData.name,
        phone: profileData.phone || "",
      })
    } catch (error) {
    toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
    })
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return
    
    // Validate form
    const validation = validateProfile(profileForm)
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0]
      toast({
        title: "Validation Error",
        description: firstError,
        variant: "destructive",
      })
      return
    }
    
    try {
      const updatedProfile = await updateUserProfile(user!.id, {
        name: profileForm.name,
        phone: formatPhoneNumber(profileForm.phone),
      })
      setProfile(updatedProfile)
      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
    toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
    })
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }
    
    // Validate password
    const validation = validatePassword(passwordForm.newPassword)
    if (!validation.isValid) {
      toast({
        title: "Password Requirements",
        description: validation.errors.join(", "),
        variant: "destructive",
      })
      return
    }
    
    try {
      await changePassword(user!.id, passwordForm.currentPassword, passwordForm.newPassword)
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      toast({
        title: "Success",
        description: "Password updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      })
    }
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate address form
    const validation = validateAddress(addressForm)
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0]
      toast({
        title: "Validation Error",
        description: firstError,
        variant: "destructive",
      })
      return
    }
    
    try {
      if (editingAddress) {
        await updateAddress(editingAddress.id, addressForm)
        toast({
          title: "Success",
          description: "Address updated successfully",
        })
      } else {
        await addAddress(user!.id, addressForm)
        toast({
          title: "Success",
          description: "Address added successfully",
        })
      }
      
      setShowAddressDialog(false)
      setEditingAddress(null)
      setAddressForm({
        type: "home",
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "India",
        isDefault: false,
      })
      loadUserData() // Reload to get updated data
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save address",
        variant: "destructive",
      })
    }
  }

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await deleteAddress(addressId)
      toast({
        title: "Success",
        description: "Address deleted successfully",
      })
      loadUserData()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete address",
        variant: "destructive",
      })
    }
  }

  const handleRemoveFromWishlist = async (wishlistItemId: string) => {
    try {
      await removeFromWishlist(wishlistItemId)
      setWishlist(wishlist.filter(item => item.id !== wishlistItemId))
      toast({
        title: "Success",
        description: "Item removed from wishlist",
      })
    } catch (error) {
    toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800"
      case "shipped": return "bg-blue-100 text-blue-800"
      case "processing": return "bg-yellow-100 text-yellow-800"
      case "pending": return "bg-gray-100 text-gray-800"
      case "cancelled": return "bg-red-100 text-red-800"
      case "returned": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered": return <CheckCircle className="h-4 w-4" />
      case "shipped": return <Truck className="h-4 w-4" />
      case "processing": return <Clock className="h-4 w-4" />
      case "pending": return <Clock className="h-4 w-4" />
      case "cancelled": return <AlertCircle className="h-4 w-4" />
      case "returned": return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  if (!user) {
    return (
      <div className="profile-bg flex items-center justify-center min-h-screen relative">
        {/* Floating shopping icons */}
        <div className="floating-icon">🛒</div>
        <div className="floating-icon">📱</div>
        <div className="floating-icon">💻</div>
        <div className="floating-icon">🎧</div>
        
        <div className="ecommerce-card p-8 max-w-md w-full text-center zero-gravity">
          <h1 className="text-4xl font-bold mb-8 shopping-header">Welcome Back!</h1>
          <p className="text-gray-600 mb-8 text-lg">Please login to access your shopping profile</p>
          <Button asChild className="shopping-btn w-full py-3 text-lg font-semibold">
            <a href="/login">🛒 Start Shopping</a>
        </Button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="profile-bg">
        <div className="floating-icon">🛒</div>
        <div className="floating-icon">📱</div>
        <div className="floating-icon">💻</div>
        <div className="floating-icon">🎧</div>
        <ProfileSkeleton />
      </div>
    )
  }

  return (
    <div className="profile-bg relative">
      {/* Floating shopping icons */}
      <div className="floating-icon">🛒</div>
      <div className="floating-icon">📱</div>
      <div className="floating-icon">💻</div>
      <div className="floating-icon">🎧</div>
      <div className="floating-icon">⌚</div>
      <div className="floating-icon">🎮</div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="shopping-sidebar p-6 md:w-64 w-full mb-4 md:mb-0">
            <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-8">
              <h1 className="text-5xl font-extrabold tracking-tight shopping-header drop-shadow-lg">🛍️ My Shopping Profile</h1>
            </div>
            <div className="space-y-8">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="ecommerce-card p-8">
                  <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
                      <CardTitle className="flex items-center text-2xl font-bold">
                        👤 Personal Information
                      </CardTitle>
            </CardHeader>
            <CardContent>
                      <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-semibold">Full Name *</Label>
                    <Input
                      id="name"
                              value={profileForm.name}
                              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                              required
                              className="shopping-input"
                    />
                  </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
                            <div className="flex items-center space-x-2">
                    <Input
                      id="email"
                      type="email"
                                value={profile?.email || ""}
                                disabled
                                className="shopping-input bg-gray-50"
                    />
                              <Mail className="h-4 w-4 text-gray-400" />
                            </div>
                            <p className="text-sm text-gray-500">Email cannot be changed</p>
                  </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-semibold">Phone Number *</Label>
                            <div className="flex items-center space-x-2">
                    <Input
                      id="phone"
                                value={profileForm.phone}
                                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                                placeholder="+91 98765 43210"
                                required
                                className="shopping-input"
                              />
                              <Phone className="h-4 w-4 text-gray-400" />
                            </div>
                  </div>
                          <div className="space-y-2">
                            <Label className="text-sm font-semibold">Member Since</Label>
                            <div className="flex items-center space-x-2">
                    <Input
                                value={profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : ""}
                                disabled
                                className="shopping-input bg-gray-50"
                              />
                              <Calendar className="h-4 w-4 text-gray-400" />
                            </div>
                  </div>
                </div>
                        <Button type="submit" className="shopping-btn w-full md:w-auto px-8 py-3">
                          💾 Update Profile
                        </Button>
              </form>
            </CardContent>
          </Card>
                </div>
              )}
              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div className="ecommerce-card p-8">
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center text-2xl font-bold">
                        📍 My Addresses
                      </CardTitle>
                      <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
                        <DialogTrigger asChild>
                          <Button onClick={() => setEditingAddress(null)} className="shopping-btn">
                            ➕ Add Address
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl ecommerce-card">
                          <DialogHeader>
                            <DialogTitle className="text-xl font-bold">
                              {editingAddress ? "✏️ Edit Address" : "➕ Add New Address"}
                            </DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleAddressSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="addressType" className="text-sm font-semibold">Address Type</Label>
                                <Select
                                  value={addressForm.type}
                                  onValueChange={(value: "home" | "work" | "other") => 
                                    setAddressForm({ ...addressForm, type: value })
                                  }
                                >
                                  <SelectTrigger className="shopping-input">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="home">🏠 Home</SelectItem>
                                    <SelectItem value="work">💼 Work</SelectItem>
                                    <SelectItem value="other">📍 Other</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="addressName" className="text-sm font-semibold">Full Name *</Label>
                                <Input
                                  id="addressName"
                                  value={addressForm.name}
                                  onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                                  required
                                  className="shopping-input"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="addressPhone" className="text-sm font-semibold">Phone Number *</Label>
                              <Input
                                id="addressPhone"
                                value={addressForm.phone}
                                onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                                placeholder="+91 98765 43210"
                                required
                                className="shopping-input"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="street" className="text-sm font-semibold">Street Address *</Label>
                  <Input
                    id="street"
                                value={addressForm.street}
                                onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                                required
                                className="shopping-input"
                  />
                </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="city" className="text-sm font-semibold">City *</Label>
                    <Input
                      id="city"
                                  value={addressForm.city}
                                  onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                                  required
                                  className="shopping-input"
                    />
                  </div>
                              <div className="space-y-2">
                                <Label htmlFor="state" className="text-sm font-semibold">State *</Label>
                    <Input
                      id="state"
                                  value={addressForm.state}
                                  onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                                  required
                                  className="shopping-input"
                    />
                  </div>
                              <div className="space-y-2">
                                <Label htmlFor="zipCode" className="text-sm font-semibold">ZIP Code *</Label>
                    <Input
                      id="zipCode"
                                  value={addressForm.zipCode}
                                  onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })}
                                  required
                                  className="shopping-input"
                    />
                  </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="country" className="text-sm font-semibold">Country</Label>
                    <Input
                      id="country"
                                value={addressForm.country}
                                onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                                className="shopping-input"
                    />
                  </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="isDefault"
                                checked={addressForm.isDefault}
                                onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                                className="rounded"
                              />
                              <Label htmlFor="isDefault" className="text-sm font-semibold">Set as default address</Label>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button type="button" variant="outline" onClick={() => setShowAddressDialog(false)}>
                                ❌ Cancel
                              </Button>
                              <Button type="submit" className="shopping-btn">
                                {editingAddress ? "💾 Update Address" : "➕ Add Address"}
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {profile?.addresses.map((address) => (
                          <Card key={address.id} className="p-4 product-card">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant={address.isDefault ? "default" : "secondary"} className={address.isDefault ? "shopping-badge" : ""}>
                                    {address.isDefault ? "⭐ Default" : `📍 ${address.type}`}
                                  </Badge>
                                  <span className="font-medium">{address.name}</span>
                                </div>
                                <p className="text-gray-600 mb-1">{address.street}</p>
                                <p className="text-gray-600 mb-1">
                                  {address.city}, {address.state} {address.zipCode}
                                </p>
                                <p className="text-gray-600 mb-2">{address.country}</p>
                                <p className="text-sm text-gray-500">{address.phone}</p>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setEditingAddress(address)
                                    setAddressForm({
                                      type: address.type,
                                      name: address.name,
                                      phone: address.phone,
                                      street: address.street,
                                      city: address.city,
                                      state: address.state,
                                      zipCode: address.zipCode,
                                      country: address.country,
                                      isDefault: address.isDefault,
                                    })
                                    setShowAddressDialog(true)
                                  }}
                                  className="hover:bg-blue-50 hover:text-blue-600"
                                >
                                  ✏️ Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteAddress(address.id)}
                                  disabled={address.isDefault}
                                  className="hover:bg-red-50 hover:text-red-600"
                                >
                                  🗑️ Delete
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                        {profile?.addresses.length === 0 && (
                          <div className="text-center py-8">
                            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No addresses found</p>
                            <p className="text-sm text-gray-400">Add your first address to get started</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="ecommerce-card p-8">
                  <Card className="border-0 shadow-none bg-transparent">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl font-bold">
                        📦 My Orders
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <Card key={order.id} className="p-6 product-card">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">📦 Order #{order.orderNumber}</h3>
                                <p className="text-sm text-gray-500">
                                  📅 Placed on {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <Badge className={`${getStatusColor(order.status)} shopping-badge`}>
                                <span className="flex items-center space-x-1">
                                  {getStatusIcon(order.status)}
                                  <span className="capitalize">{order.status}</span>
                                </span>
                              </Badge>
                            </div>
                            
                            <div className="space-y-3 mb-4">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <h4 className="font-medium">{item.name}</h4>
                                    <p className="text-sm text-gray-600">{item.brand}</p>
                                    <p className="text-sm text-gray-500">📦 Qty: {item.quantity}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium">₹{item.price.toFixed(2)}</p>
                                    {item.originalPrice && item.originalPrice > item.price && (
                                      <p className="text-sm text-gray-500 line-through">
                                        ₹{item.originalPrice.toFixed(2)}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <Separator className="my-4" />
                            
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-600">
                                <p>💰 Subtotal: ₹{order.subtotal.toFixed(2)}</p>
                                <p>📊 Tax: ₹{order.tax.toFixed(2)}</p>
                                <p>🚚 Shipping: ₹{order.shipping.toFixed(2)}</p>
                                <p className="font-semibold text-lg">💳 Total: ₹{order.total.toFixed(2)}</p>
                              </div>
                              {order.trackingNumber && (
                                <div className="text-sm">
                                  <p className="font-medium">📋 Tracking: {order.trackingNumber}</p>
                                  {order.estimatedDelivery && (
                                    <p className="text-gray-500">
                                      📅 Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </Card>
                        ))}
                        
                        {orders.length === 0 && (
                          <div className="text-center py-8">
                            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">No orders found</p>
                            <p className="text-sm text-gray-400">Start shopping to see your orders here</p>
                          </div>
                        )}
                      </div>
            </CardContent>
          </Card>
                </div>
              )}
              {/* Wishlist Tab */}
              {activeTab === "wishlist" && (
                <div className="ecommerce-card p-8">
                  <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
                      <CardTitle className="flex items-center text-2xl font-bold">
                        ❤️ My Wishlist
                      </CardTitle>
            </CardHeader>
            <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlist.map((item) => (
                          <Card key={item.id} className="overflow-hidden product-card">
                            <div className="relative">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="w-full h-48 object-cover"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2 hover:bg-red-50 hover:text-red-600"
                                onClick={() => handleRemoveFromWishlist(item.id)}
                              >
                                ❌ Remove
                              </Button>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-semibold mb-2 line-clamp-2">{item.product.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">{item.product.brand}</p>
                              <div className="flex items-center space-x-1 mb-2">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{item.product.rating}</span>
                                <span className="text-sm text-gray-500">({item.product.reviews})</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-semibold">₹{item.product.price.toFixed(2)}</p>
                                  {item.product.originalPrice && item.product.originalPrice > item.product.price && (
                                    <p className="text-sm text-gray-500 line-through">
                                      ₹{item.product.originalPrice.toFixed(2)}
                                    </p>
                                  )}
                                </div>
                                <Button size="sm" className="shopping-btn">🛒 Add to Cart</Button>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                📅 Added on {new Date(item.addedAt).toLocaleDateString()}
                              </p>
            </CardContent>
          </Card>
                        ))}
                        
                        {wishlist.length === 0 && (
                          <div className="col-span-full text-center py-8">
                            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">Your wishlist is empty</p>
                            <p className="text-sm text-gray-400">Start adding products to your wishlist</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="ecommerce-card p-8">
                  <Card className="border-0 shadow-none bg-transparent">
            <CardHeader>
                      <CardTitle className="flex items-center text-2xl font-bold">
                        🔒 Security Settings
                      </CardTitle>
            </CardHeader>
            <CardContent>
                      <form onSubmit={handlePasswordUpdate} className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-sm font-semibold">Current Password *</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                              required
                              className="shopping-input"
                  />
                </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-sm font-semibold">New Password *</Label>
                  <Input
                    id="newPassword"
                    type="password"
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                              required
                              className="shopping-input"
                            />
                            <p className="text-sm text-gray-500">Password must be at least 6 characters long</p>
                </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-sm font-semibold">Confirm New Password *</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                              required
                              className="shopping-input"
                  />
                </div>
                        </div>
                        <Button type="submit" className="shopping-btn w-full md:w-auto px-8 py-3">
                          🔐 Update Password
                        </Button>
              </form>
            </CardContent>
          </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
