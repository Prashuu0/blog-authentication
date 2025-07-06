import { NextRequest, NextResponse } from "next/server"
import { changePassword } from "@/lib/userData"

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, currentPassword, newPassword } = body

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "User ID, current password, and new password are required" },
        { status: 400 }
      )
    }

    await changePassword(userId, currentPassword, newPassword)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error changing password:", error)
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    )
  }
} 