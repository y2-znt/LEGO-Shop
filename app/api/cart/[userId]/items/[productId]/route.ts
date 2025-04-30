import {
  removeFromCart,
  updateCartItemQuantity,
} from "@/services/cart.service";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route PATCH /api/cart/[userId]/items/[productId]
 * @description Updates the quantity of a product in the cart
 * @param {string} userId - User's ID
 * @param {string} productId - Product's ID
 * @body {number} quantity - New quantity
 * @returns {CartItem} The updated item in the cart
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { userId: string; productId: string } },
) {
  const { userId, productId } = params;
  const body = await req.json();
  const { quantity } = body;

  try {
    const updatedItem = await updateCartItemQuantity(
      userId,
      productId,
      quantity,
    );
    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * @route DELETE /api/cart/[userId]/items/[productId]
 * @description Removes a product from the cart
 * @param {string} userId - User's ID
 * @param {string} productId - Product's ID
 * @returns {void}
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: { userId: string; productId: string } },
) {
  const { userId, productId } = params;

  try {
    await removeFromCart(userId, productId);
    return NextResponse.json({ message: "Item removed from cart" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
