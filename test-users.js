const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function createTestUsers() {
  try {
    console.log('Creating test users...')
    
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10)
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        phone: '+91-9876543210',
        role: 'ADMIN',
        referralCode: 'ADMIN001',
      },
    })
    console.log('✅ Admin user created:', adminUser.email)
    
    // Create test user
    const userPassword = await bcrypt.hash('password123', 10)
    const testUser = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        name: 'Test User',
        email: 'user@example.com',
        password: userPassword,
        phone: '+91-9876543211',
        role: 'USER',
        referralCode: 'USER001',
      },
    })
    console.log('✅ Test user created:', testUser.email)
    
    console.log('All test users created successfully!')
  } catch (error) {
    console.error('Error creating users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

createTestUsers() 