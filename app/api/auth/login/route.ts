import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser } from '@/lib/auth'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('🔐 Login request body:', body)
    
    const { email, password } = body

    // Validation
    if (!email || !password) {
      console.log('❌ Login validation failed:', { email: !!email, password: !!password })
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    console.log('✅ Login validation passed, authenticating...')

    // Authenticate user
    const user = await authenticateUser(email, password)
    
    if (!user) {
      console.log('❌ Authentication failed for email:', email)
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('✅ Authentication successful for user:', user.id)

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json({
      user,
      token,
      message: 'Login successful'
    })

  } catch (error) {
    console.error('❌ Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 