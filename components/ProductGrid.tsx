import { getProductsFromDB } from "@/lib/products-db"
import ProductCard from "./ProductCard"

export default async function ProductGrid() {
  const products = await getProductsFromDB()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
