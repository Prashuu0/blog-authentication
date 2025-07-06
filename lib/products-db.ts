import { prisma } from './db'
import type { Product } from '@/types'

export async function getProductsFromDB(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        category: true,
        brand: true,
        images: true,
        variants: true,
        specifications: true,
        tags: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || undefined,
      discount: product.discount || undefined,
      image: product.image,
      images: product.images.map((img) => img.url),
      category: product.category.name,
      brand: product.brand.name,
      rating: product.rating,
      reviews: product.reviewCount,
      stock: product.stock,
      tags: product.tags.map((tag) => tag.tag),
      sku: product.sku,
      weight: product.weight || undefined,
      dimensions: product.length && product.width && product.height ? {
        length: product.length,
        width: product.width,
        height: product.height,
      } : undefined,
      warranty: product.warranty || undefined,
      returnPolicy: product.returnPolicy || undefined,
      shippingInfo: product.shippingInfo || undefined,
      isFeatured: product.isFeatured,
      isNew: product.isNew,
      isOnSale: product.isOnSale,
      variants: product.variants.map((variant) => ({
        id: variant.id,
        productId: variant.productId,
        name: variant.name,
        value: variant.value,
        price: variant.price || undefined,
        stock: variant.stock,
        sku: variant.sku,
      })),
      specifications: product.specifications.reduce((acc, spec) => {
        acc[spec.key] = spec.value
        return acc
      }, {} as Record<string, string>),
    }))
  } catch (error) {
    console.error('Error fetching products from database:', error)
    throw new Error('Failed to fetch products')
  }
}

export async function getProductByIdFromDB(id: string): Promise<Product | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id, isActive: true },
      include: {
        category: true,
        brand: true,
        images: true,
        variants: true,
        specifications: true,
        tags: true,
        reviews: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!product) return null

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || undefined,
      discount: product.discount || undefined,
      image: product.image,
      images: product.images.map((img) => img.url),
      category: product.category.name,
      brand: product.brand.name,
      rating: product.rating,
      reviews: product.reviewCount,
      stock: product.stock,
      tags: product.tags.map((tag) => tag.tag),
      sku: product.sku,
      weight: product.weight || undefined,
      dimensions: product.length && product.width && product.height ? {
        length: product.length,
        width: product.width,
        height: product.height,
      } : undefined,
      warranty: product.warranty || undefined,
      returnPolicy: product.returnPolicy || undefined,
      shippingInfo: product.shippingInfo || undefined,
      isFeatured: product.isFeatured,
      isNew: product.isNew,
      isOnSale: product.isOnSale,
      variants: product.variants.map((variant) => ({
        id: variant.id,
        productId: variant.productId,
        name: variant.name,
        value: variant.value,
        price: variant.price || undefined,
        stock: variant.stock,
        sku: variant.sku,
      })),
      specifications: product.specifications.reduce((acc, spec) => {
        acc[spec.key] = spec.value
        return acc
      }, {} as Record<string, string>),
    }
  } catch (error) {
    console.error('Error fetching product from database:', error)
    throw new Error('Failed to fetch product')
  }
}

export async function searchProductsFromDB(query: string): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: query } },
          { description: { contains: query } },
          { sku: { contains: query } },
          { tags: { some: { tag: { contains: query } } } },
          { category: { name: { contains: query } } },
          { brand: { name: { contains: query } } },
        ],
      },
      include: {
        category: true,
        brand: true,
        images: true,
        variants: true,
        specifications: true,
        tags: true,
      },
    })

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || undefined,
      discount: product.discount || undefined,
      image: product.image,
      images: product.images.map((img) => img.url),
      category: product.category.name,
      brand: product.brand.name,
      rating: product.rating,
      reviews: product.reviewCount,
      stock: product.stock,
      tags: product.tags.map((tag) => tag.tag),
      sku: product.sku,
      weight: product.weight || undefined,
      dimensions: product.length && product.width && product.height ? {
        length: product.length,
        width: product.width,
        height: product.height,
      } : undefined,
      warranty: product.warranty || undefined,
      returnPolicy: product.returnPolicy || undefined,
      shippingInfo: product.shippingInfo || undefined,
      isFeatured: product.isFeatured,
      isNew: product.isNew,
      isOnSale: product.isOnSale,
      variants: product.variants.map((variant) => ({
        id: variant.id,
        productId: variant.productId,
        name: variant.name,
        value: variant.value,
        price: variant.price || undefined,
        stock: variant.stock,
        sku: variant.sku,
      })),
      specifications: product.specifications.reduce((acc, spec) => {
        acc[spec.key] = spec.value
        return acc
      }, {} as Record<string, string>),
    }))
  } catch (error) {
    console.error('Error searching products in database:', error)
    throw new Error('Failed to search products')
  }
} 