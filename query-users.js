const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function queryUsers() {
  try {
    console.log('Querying users from database...')
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    })
    
    console.log('Found users:', users.length)
    users.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - ${user.role}`)
    })
    
    if (users.length === 0) {
      console.log('No users found. Creating test users...')
      
      const bcrypt = require('bcryptjs')
      
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
    }
    
  } catch (error) {
    console.error('Error querying users:', error)
  } finally {
    await prisma.$disconnect()
  }
}

queryUsers() 