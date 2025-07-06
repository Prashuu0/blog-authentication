import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './db'
import type { User } from '@/types'

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key'

export interface JWTPayload {
  userId: string
  email: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export async function createUser(userData: {
  name: string
  email: string
  password: string
  phone?: string
}): Promise<User> {
  const hashedPassword = await hashPassword(userData.password)
  
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      phone: userData.phone,
      role: 'USER',
      referralCode: generateReferralCode(),
    },
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || undefined,
    role: user.role as 'user' | 'admin' | 'seller',
    avatar: user.avatar || undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    loyaltyPoints: user.loyaltyPoints,
    referralCode: user.referralCode,
    referredBy: user.referredBy || undefined,
    lastLoginAt: user.lastLoginAt || undefined,
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: true,
      pushNotifications: true,
      language: 'en',
      currency: 'INR',
    },
  }
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) return null

  const isValidPassword = await comparePassword(password, user.password)
  if (!isValidPassword) return null

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLoginAt: new Date() },
  })

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || undefined,
    role: user.role as 'user' | 'admin' | 'seller',
    avatar: user.avatar || undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    loyaltyPoints: user.loyaltyPoints,
    referralCode: user.referralCode,
    referredBy: user.referredBy || undefined,
    lastLoginAt: user.lastLoginAt || undefined,
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: true,
      pushNotifications: true,
      language: 'en',
      currency: 'INR',
    },
  }
}

export async function getUserById(id: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  })

  if (!user) return null

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || undefined,
    role: user.role as 'user' | 'admin' | 'seller',
    avatar: user.avatar || undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isEmailVerified: user.isEmailVerified,
    isPhoneVerified: user.isPhoneVerified,
    loyaltyPoints: user.loyaltyPoints,
    referralCode: user.referralCode,
    referredBy: user.referredBy || undefined,
    lastLoginAt: user.lastLoginAt || undefined,
    preferences: {
      emailNotifications: true,
      smsNotifications: true,
      marketingEmails: true,
      pushNotifications: true,
      language: 'en',
      currency: 'INR',
    },
  }
}

function generateReferralCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase()
} 