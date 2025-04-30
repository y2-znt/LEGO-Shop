import { addToCart } from "@/services/cart.service";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route POST /api/cart/[userId]/items
 * @description Adds a product to the cart
 * @param {string} userId - User's ID
 * @body {string} productId - Product's ID
 * @body {number} [quantity=1] - Quantity to add
 * @returns {CartItem} The item added to the cart
 */
export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const { userId } = params;
  const body = await req.json();
  const { productId, quantity = 1 } = body;

  try {
    const cartItem = await addToCart(userId, productId, quantity);
    return NextResponse.json(cartItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
