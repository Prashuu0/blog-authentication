import { NextRequest, NextResponse } from "next/server"
import { getUserWishlist, removeFromWishlist } from "@/lib/userData"

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId")
    
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    const wishlist = await getUserWishlist(userId)
    return NextResponse.json(wishlist)
  } catch (error) {
    console.error("Error fetching user wishlist:", error)
    return NextResponse.json(
      { error: "Failed to fetch user wishlist" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { wishlistItemId } = body

    if (!wishlistItemId) {
      return NextResponse.json(
        { error: "Wishlist item ID is required" },
        { status: 400 }
      )
    }

    await removeFromWishlist(wishlistItemId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing wishlist item:", error)
    return NextResponse.json(
      { error: "Failed to remove wishlist item" },
      { status: 500 }
    )
  }
} 