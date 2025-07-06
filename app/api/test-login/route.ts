import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { authenticateUser } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log('🔍 Test login request:', { email, password })

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      }
    })

    if (!user) {
      console.log('❌ User not found:', email)
      return NextResponse.json({
        error: 'User not found',
        userExists: false
      }, { status: 404 })
    }

    console.log('✅ User found:', user.email)

    // Test authentication
    const authenticatedUser = await authenticateUser(email, password)
    
    if (!authenticatedUser) {
      console.log('❌ Authentication failed for:', email)
      return NextResponse.json({
        error: 'Authentication failed',
        userExists: true,
        authenticated: false
      }, { status: 401 })
    }

    console.log('✅ Authentication successful for:', email)

    return NextResponse.json({
      success: true,
      userExists: true,
      authenticated: true,
      user: {
        id: authenticatedUser.id,
        name: authenticatedUser.name,
        email: authenticatedUser.email,
        role: authenticatedUser.role,
      }
    })

  } catch (error) {
    console.error('❌ Test login error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 