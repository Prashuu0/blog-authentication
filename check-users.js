const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function checkAndCreateUsers() {
  try {
    console.log('Checking existing users...')
    
    // Check existing users
    const existingUsers = await prisma.user.findMany()
    console.log('Existing users:', existingUsers.length)
    
    if (existingUsers.length === 0) {
      console.log('No users found. Creating test users...')
      
      // Create admin user
      const adminPassword = await bcrypt.hash('admin123', 10)
      const adminUser = await prisma.user.create({
        data: {
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
      const testUser = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'user@example.com',
          password: userPassword,
          phone: '+91-9876543211',
          role: 'USER',
          referralCode: 'USER001',
        },
      })
      console.log('✅ Test user created:', testUser.email)
    } else {
      console.log('Users found:')
      existingUsers.forEach(user => {
        console.log(`- ${user.email} (${user.role})`)
      })
    }
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkAndCreateUsers() 