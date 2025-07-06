import { prisma } from './db'
import { createUser } from './auth'

async function main() {
  console.log('🌱 Starting database seeding...')

  // Create test users
  console.log('👤 Creating test users...')
  
  try {
    const adminUser = await createUser({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'admin123',
      phone: '+91-9876543210'
    })
    console.log('✅ Admin user created:', adminUser.email)
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('ℹ️ Admin user already exists')
    } else {
      console.error('❌ Error creating admin user:', error)
    }
  }

  try {
    const testUser = await createUser({
      name: 'Test User',
      email: 'user@example.com',
      password: 'password123',
      phone: '+91-9876543211'
    })
    console.log('✅ Test user created:', testUser.email)
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('ℹ️ Test user already exists')
    } else {
      console.error('❌ Error creating test user:', error)
    }
  }

  // Create categories
  const electronicsCategory = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
      description: 'Latest electronic gadgets and devices',
      isActive: true,
      sortOrder: 1,
    },
  })

  const fashionCategory = await prisma.category.upsert({
    where: { slug: 'fashion' },
    update: {},
    create: {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Trendy fashion and clothing',
      isActive: true,
      sortOrder: 2,
    },
  })

  const homeCategory = await prisma.category.upsert({
    where: { slug: 'home' },
    update: {},
    create: {
      name: 'Home & Living',
      slug: 'home',
      description: 'Home decor and living essentials',
      isActive: true,
      sortOrder: 3,
    },
  })

  // Create brands
  const gamingTechBrand = await prisma.brand.upsert({
    where: { slug: 'gamingtech' },
    update: {},
    create: {
      name: 'GamingTech',
      slug: 'gamingtech',
      description: 'Premium gaming accessories and equipment',
      isActive: true,
    },
  })

  const soundMasterBrand = await prisma.brand.upsert({
    where: { slug: 'soundmaster' },
    update: {},
    create: {
      name: 'SoundMaster',
      slug: 'soundmaster',
      description: 'High-quality audio equipment',
      isActive: true,
    },
  })

  const fitTechBrand = await prisma.brand.upsert({
    where: { slug: 'fittech' },
    update: {},
    create: {
      name: 'FitTech',
      slug: 'fittech',
      description: 'Smart fitness and health devices',
      isActive: true,
    },
  })

  // Create products
  const gamingMouse = await prisma.product.upsert({
    where: { sku: 'GM-PRO-001' },
    update: {},
    create: {
      name: 'Gaming Mouse Pro',
      description: 'High-performance gaming mouse with RGB lighting and customizable buttons. Perfect for competitive gaming with 25,600 DPI sensor and 1000Hz polling rate.',
      price: 2999,
      originalPrice: 3999,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      categoryId: electronicsCategory.id,
      brandId: gamingTechBrand.id,
      rating: 4.8,
      reviewCount: 1247,
      stock: 45,
      sku: 'GM-PRO-001',
      isFeatured: true,
      isNew: false,
      isOnSale: true,
      warranty: '2 Years',
      returnPolicy: '30 Days Return',
      shippingInfo: 'Free shipping on orders above ₹999',
      weight: 0.12,
      length: 12.5,
      width: 6.8,
      height: 3.9,
      isActive: true,
    },
  })

  const wirelessHeadphones = await prisma.product.upsert({
    where: { sku: 'WH-BT-002' },
    update: {},
    create: {
      name: 'Wireless Bluetooth Headphones',
      description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.',
      price: 4999,
      originalPrice: 6999,
      discount: 29,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      categoryId: electronicsCategory.id,
      brandId: soundMasterBrand.id,
      rating: 4.6,
      reviewCount: 892,
      stock: 32,
      sku: 'WH-BT-002',
      isFeatured: true,
      isNew: false,
      isOnSale: true,
      warranty: '1 Year',
      returnPolicy: '30 Days Return',
      shippingInfo: 'Free shipping on orders above ₹999',
      weight: 0.28,
      length: 18.5,
      width: 16.8,
      height: 8.2,
      isActive: true,
    },
  })

  const fitnessWatch = await prisma.product.upsert({
    where: { sku: 'SFW-003' },
    update: {},
    create: {
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracker with heart rate monitoring, GPS tracking, and 7-day battery life. Tracks 15+ activities and provides detailed health insights.',
      price: 8999,
      originalPrice: 11999,
      discount: 25,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      categoryId: electronicsCategory.id,
      brandId: fitTechBrand.id,
      rating: 4.7,
      reviewCount: 1563,
      stock: 28,
      sku: 'SFW-003',
      isFeatured: true,
      isNew: true,
      isOnSale: false,
      warranty: '1 Year',
      returnPolicy: '30 Days Return',
      shippingInfo: 'Free shipping on orders above ₹999',
      weight: 0.045,
      length: 4.2,
      width: 3.8,
      height: 1.2,
      isActive: true,
    },
  })

  // Create product images
  await prisma.productImage.upsert({
    where: { id: 'img-gm-1' },
    update: {},
    create: {
      id: 'img-gm-1',
      productId: gamingMouse.id,
      url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop',
      alt: 'Gaming Mouse Pro',
      order: 0,
    },
  })

  await prisma.productImage.upsert({
    where: { id: 'img-wh-1' },
    update: {},
    create: {
      id: 'img-wh-1',
      productId: wirelessHeadphones.id,
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      alt: 'Wireless Bluetooth Headphones',
      order: 0,
    },
  })

  await prisma.productImage.upsert({
    where: { id: 'img-fw-1' },
    update: {},
    create: {
      id: 'img-fw-1',
      productId: fitnessWatch.id,
      url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      alt: 'Smart Fitness Watch',
      order: 0,
    },
  })

  // Create product variants
  await prisma.productVariant.upsert({
    where: { sku: 'GM-PRO-001-BLK' },
    update: {},
    create: {
      productId: gamingMouse.id,
      name: 'Color',
      value: 'Black',
      stock: 25,
      sku: 'GM-PRO-001-BLK',
    },
  })

  await prisma.productVariant.upsert({
    where: { sku: 'GM-PRO-001-WHT' },
    update: {},
    create: {
      productId: gamingMouse.id,
      name: 'Color',
      value: 'White',
      stock: 20,
      sku: 'GM-PRO-001-WHT',
    },
  })

  // Create product specifications
  await prisma.productSpecification.upsert({
    where: { id: 'spec-gm-1' },
    update: {},
    create: {
      id: 'spec-gm-1',
      productId: gamingMouse.id,
      key: 'Sensor',
      value: '25,600 DPI Optical',
    },
  })

  await prisma.productSpecification.upsert({
    where: { id: 'spec-gm-2' },
    update: {},
    create: {
      id: 'spec-gm-2',
      productId: gamingMouse.id,
      key: 'Polling Rate',
      value: '1000Hz',
    },
  })

  // Create product tags
  await prisma.productTag.upsert({
    where: { id: 'tag-gm-1' },
    update: {},
    create: {
      id: 'tag-gm-1',
      productId: gamingMouse.id,
      tag: 'gaming',
    },
  })

  await prisma.productTag.upsert({
    where: { id: 'tag-gm-2' },
    update: {},
    create: {
      id: 'tag-gm-2',
      productId: gamingMouse.id,
      tag: 'mouse',
    },
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 