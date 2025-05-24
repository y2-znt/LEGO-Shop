import { OrderStatus } from "@prisma/client";

export const getStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case "PAID":
      return "bg-green-500";
    case "PENDING":
      return "bg-yellow-500";
    case "CANCELLED":
      return "bg-red-500";
    case "FAILED":
      return "bg-gray-500";
    default:
      return "bg-gray-500";
  }
};
