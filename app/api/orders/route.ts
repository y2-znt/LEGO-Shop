import { NextResponse } from "next/server";

import { getAllOrders, getOrderStats } from "@/services/order.service";

/**
 * @route GET /api/orders
 * @description Get all orders and their stats
 * @returns {object} The orders and stats
 */
export async function GET() {
  try {
    const [orders, stats] = await Promise.all([
      getAllOrders(),
      getOrderStats(),
    ]);

    return NextResponse.json({ orders, stats });
  } catch (error) {
    console.error("[ORDERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
