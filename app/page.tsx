import { Suspense } from "react"
import ProductGrid from "@/components/ProductGrid"
import HeroSection from "@/components/HeroSection"
import CategorySection from "@/components/CategorySection"
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategorySection />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <Suspense fallback={<ProductGridSkeleton />}>
          <ProductGrid />
        </Suspense>
      </div>
    </div>
  )
}
