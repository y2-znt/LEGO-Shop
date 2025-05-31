"use client";

import { OrderStatus } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { MdCached } from "react-icons/md";

import ActionBtn from "@/features/admin/components/ActionBtn";
import StatsOverview from "@/features/admin/components/StatsOverview";
import Status from "@/features/admin/components/Status";

import Title from "@/components/shared/Title";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useGetOrders, useUpdateOrder } from "../hooks/useOrders";
import { getStatusBadge } from "../utils/getStatusBadge";

const ORDER_STATUS_CYCLE: OrderStatus[] = ["PENDING", "PAID", "CANCELLED"];

export default function ManageOrdersView() {
  const { orders, stats, isLoading } = useGetOrders();
  const { updateOrderStatus } = useUpdateOrder();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const handleToggleStatus = (orderId: string, currentStatus: OrderStatus) => {
    if (!ORDER_STATUS_CYCLE.includes(currentStatus)) return;
    const currentIndex = ORDER_STATUS_CYCLE.indexOf(currentStatus);
    const nextStatus =
      ORDER_STATUS_CYCLE[(currentIndex + 1) % ORDER_STATUS_CYCLE.length];
    updateOrderStatus({ orderId, status: nextStatus });
  };

  const statsData = [
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders || 0,
    },
    {
      title: "Completed Orders",
      value: stats?.paidOrders || 0,
    },
    {
      title: "Total Revenue",
      value: `$${stats?.totalRevenue.toFixed(2) || 0}`,
    },
  ];

  return (
    <div>
      <Title text="Manage Orders" />
      <StatsOverview stats={statsData} />
      <Table>
        <TableCaption>A list of your orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.user.name || order.user.email}</TableCell>
              <TableCell>${order.amount.toFixed(2)}</TableCell>
              <TableCell>
                <Status
                  text={order.status}
                  color={getStatusBadge(order.status)}
                  width="w-28"
                />
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()} -
                {new Date(order.createdAt).toLocaleTimeString()}
              </TableCell>
              <TableCell className="flex gap-4 py-4">
                <ActionBtn
                  icon={MdCached}
                  onClick={() => handleToggleStatus(order.id, order.status)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
