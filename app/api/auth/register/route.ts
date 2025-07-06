import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/auth'
import { generateToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('📝 Register request body:', body)
    
    const { name, email, password, phone } = body

    // Validation
    if (!name || !email || !password) {
      console.log('❌ Validation failed:', { name: !!name, email: !!email, password: !!password })
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      console.log('❌ Password too short:', password.length)
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    console.log('✅ Validation passed, creating user...')

    // Check if user already exists
    const existingUser = await createUser({ name, email, password, phone })
    
    console.log('✅ User created:', existingUser.id)
    
    // Generate JWT token
    const token = generateToken({
      userId: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    })

    // Return user data and token
    return NextResponse.json({
      user: existingUser,
      token,
      message: 'User registered successfully'
    }, { status: 201 })

  } catch (error: any) {
    console.error('❌ Registration error:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
} 