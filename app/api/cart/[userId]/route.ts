import { clearCart, getOrCreateCart } from "@/services/cart.service";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route GET /api/cart/[userId]
 * @description Retrieves the user's cart
 * @param {string} userId - User's ID
 * @returns {Cart} The user's cart
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  try {
    const cart = await getOrCreateCart(userId);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * @route DELETE /api/cart/[userId]
 * @description Empties the user's cart
 * @param {string} userId - User's ID
 * @returns {void}
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;

  try {
    await clearCart(userId);
    return NextResponse.json({ message: "Cart cleared" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
