"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  User, 
  MapPin, 
  Package, 
  Heart, 
  Shield, 
  Menu,
  X
} from "lucide-react"

interface ProfileSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: "profile", label: "👤 Profile", icon: User },
  { id: "addresses", label: "📍 Addresses", icon: MapPin },
  { id: "orders", label: "📦 Orders", icon: Package },
  { id: "wishlist", label: "❤️ Wishlist", icon: Heart },
  { id: "security", label: "🔒 Security", icon: Shield },
]

export function ProfileSidebar({ activeTab, onTabChange }: ProfileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId)
    setIsOpen(false)
  }

  const TabItem = ({ tab }: { tab: typeof tabs[0] }) => {
    const Icon = tab.icon
    const isActive = activeTab === tab.id
    
    return (
      <button
        onClick={() => handleTabClick(tab.id)}
        className={`shopping-tab w-full flex items-center space-x-3 px-4 py-3 transition-all duration-300 ${
          isActive ? "shopping-tab active" : ""
        }`}
      >
        <Icon className={`h-5 w-5 transition-all duration-300 ${isActive ? 'animate-pulse' : ''}`} />
        <span className="font-semibold">{tab.label}</span>
        {isActive && (
          <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
        )}
      </button>
    )
  }

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="shopping-btn mb-4 w-full">
              <Menu className="h-4 w-4 mr-2" />
              🛍️ Shopping Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 shopping-sidebar">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold shopping-header">🛍️ Shopping Menu</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <nav className="space-y-3">
              {tabs.map((tab) => (
                <TabItem key={tab.id} tab={tab} />
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-8">
          <h2 className="text-2xl font-bold mb-6 shopping-header">🛍️ Shopping Menu</h2>
          <nav className="space-y-3">
            {tabs.map((tab) => (
              <TabItem key={tab.id} tab={tab} />
            ))}
          </nav>
        </div>
      </div>
    </>
  )
} 