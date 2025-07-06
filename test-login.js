const bcrypt = require('bcryptjs')

async function testLogin() {
  try {
    console.log('Testing login functionality...')
    
    // Test password hashing
    const password = 'admin123'
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('Password hashed successfully')
    
    // Test password verification
    const isValid = await bcrypt.compare(password, hashedPassword)
    console.log('Password verification:', isValid)
    
    // Test login API
    const loginData = {
      email: 'admin@example.com',
      password: 'admin123'
    }
    
    console.log('Testing login API...')
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
    
    const data = await response.json()
    console.log('Response status:', response.status)
    console.log('Response data:', data)
    
    if (response.ok) {
      console.log('✅ Login successful!')
    } else {
      console.log('❌ Login failed:', data.error)
    }
    
  } catch (error) {
    console.error('Error testing login:', error)
  }
}

testLogin() 