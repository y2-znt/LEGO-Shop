import { getCurrentUser } from "@/services/auth.service";
import { deleteOrderForCurrentUser } from "@/services/order.service";
import { NextResponse } from "next/server";

/**
 * @route DELETE /api/orders/me/:id
 * @description Delete an order for the current user
 * @returns {object} The deleted order
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await deleteOrderForCurrentUser(id, currentUser.id);

    return NextResponse.json({ message: "Order deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "Order not found") {
        return NextResponse.json({ error: "Order not found" }, { status: 404 });
      }
      if (
        error.message === "Unauthorized: This order belongs to another user"
      ) {
        return NextResponse.json(
          { error: "You are not authorized to delete this order" },
          { status: 403 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
