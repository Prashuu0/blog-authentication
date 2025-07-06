import { NextRequest, NextResponse } from "next/server"
import { addAddress, updateAddress, deleteAddress } from "@/lib/userData"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...addressData } = body

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    const newAddress = await addAddress(userId, addressData)
    return NextResponse.json(newAddress, { status: 201 })
  } catch (error) {
    console.error("Error adding address:", error)
    return NextResponse.json(
      { error: "Failed to add address" },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { addressId, ...updateData } = body

    if (!addressId) {
      return NextResponse.json(
        { error: "Address ID is required" },
        { status: 400 }
      )
    }

    const updatedAddress = await updateAddress(addressId, updateData)
    return NextResponse.json(updatedAddress)
  } catch (error) {
    console.error("Error updating address:", error)
    return NextResponse.json(
      { error: "Failed to update address" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json()
    const { addressId } = body

    if (!addressId) {
      return NextResponse.json(
        { error: "Address ID is required" },
        { status: 400 }
      )
    }

    await deleteAddress(addressId)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting address:", error)
    return NextResponse.json(
      { error: "Failed to delete address" },
      { status: 500 }
    )
  }
} 