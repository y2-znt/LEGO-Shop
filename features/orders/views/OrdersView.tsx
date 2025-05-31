"use client";

import Image from "next/image";
import { MdDelete } from "react-icons/md";

import ActionBtn from "@/features/admin/components/ActionBtn";
import {
  useDeleteOrderForCurrentUser,
  useOrderForCurrentUser,
} from "@/features/orders/hooks/useOrder";

import PageState from "@/components/shared/PageState";
import Title from "@/components/shared/Title";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function OrdersView() {
  const { data: orders } = useOrderForCurrentUser();
  const { deleteOrder } = useDeleteOrderForCurrentUser();

  const handleDeleteOrder = (orderId: string) => {
    deleteOrder({ orderId });
  };

  if (orders?.length === 0) {
    return (
      <div>
        <Title text="My Orders" />
        <PageState
          title="No orders found"
          imagePath="/assets/no-orders.png"
          imageWidth="size-1/3"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Title text="My Orders" />
      <div className="space-y-8 py-16">
        {orders?.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold">
                    Order #{order.id.slice(0, 8)}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    order.status === "PAID"
                      ? "bg-green-100 text-green-800"
                      : order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status.charAt(0) + order.status.slice(1).toLowerCase()}
                </span>
              </div>

              <div className="mb-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.orderItems.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-muted-foreground py-4 text-center"
                        >
                          Products no longer available
                        </TableCell>
                      </TableRow>
                    ) : (
                      order.orderItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                width={50}
                                height={50}
                                className="h-16 w-12 rounded-lg border object-cover p-1"
                              />
                              <span className="font-bold uppercase">
                                {item.product.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${(item.quantity * item.product.price).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.amount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${order.amount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <ActionBtn
                    icon={MdDelete}
                    onClick={() => handleDeleteOrder(order.id)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
