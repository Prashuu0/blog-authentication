import { NextRequest, NextResponse } from "next/server"
import { getUserOrders } from "@/lib/userData"

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    const orders = await getUserOrders(userId)
    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return NextResponse.json(
      { error: "Failed to fetch user orders" },
      { status: 500 }
    )
  }
} 