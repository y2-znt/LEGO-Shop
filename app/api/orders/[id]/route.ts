import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { updateOrderStatus } from "@/services/order.service";

/**
 * @route PATCH /api/orders/:id
 * @description Update the status of an order
 * @param {string} id - The ID of the order
 * @param {object} req - The request body
 * @returns {object} The updated order
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status } = body;

    if (!status || !Object.values(OrderStatus).includes(status)) {
      return new NextResponse("Invalid status", { status: 400 });
    }

    const updatedOrder = await updateOrderStatus(id, status);

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("[ORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
