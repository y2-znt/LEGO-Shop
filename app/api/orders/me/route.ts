import { NextResponse } from "next/server";

import { getCurrentUser } from "@/services/auth.service";
import { getOrdersByCurrentUser } from "@/services/order.service";

/**
 * @route GET /api/orders/me
 * @description Get orders for the current user
 * @returns {order[]} The list of orders for the current user
 */
export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await getOrdersByCurrentUser(currentUser.id);
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
