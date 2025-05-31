"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import StatsOverview from "@/features/admin/components/StatsOverview";
import Status from "@/features/admin/components/Status";
import { useGetOrders } from "@/features/admin/hooks/useOrders";
import { useProduct } from "@/features/admin/hooks/useProduct";
import { useUser } from "@/features/admin/hooks/useUser";

import Title from "@/components/shared/Title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const transformData = (products: Product[]) => {
  return products.map((product) => ({
    name: product.name,
    price: product.price,
    stockStatus: product.inStock ? "inStock" : "outOfStock",
  }));
};

export default function SummaryView() {
  const { data: allUsers } = useUser();
  const { data: products } = useProduct();
  const { stats: orderStats, isLoading } = useGetOrders();
  const chartData = transformData(products ?? []);

  const statsData = [
    {
      title: "Total Revenue",
      value: `$${orderStats?.totalRevenue.toFixed(2) || 0}`,
    },
    {
      title: "Total Orders",
      value: orderStats?.totalOrders || 0,
    },
    {
      title: "Total Products",
      value: products?.length || 0,
    },
    {
      title: "Total Users",
      value: allUsers?.length || 0,
    },
  ];

  const chartConfig = {
    inStock: {
      label: "In Stock",
      color: "#ffcd56",
    },
    outOfStock: {
      label: "Out of Stock",
      color: "#ff6384",
    },
  } satisfies ChartConfig;

  return (
    <div>
      <Title text="Dashboard Overview" />
      <StatsOverview stats={statsData} />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Product Price Distribution</CardTitle>
            <CardDescription>
              Overview of product prices and stock status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={chartData} accessibilityLayer height={300}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar dataKey="price" radius={8}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.stockStatus === "inStock"
                          ? chartConfig.inStock.color
                          : chartConfig.outOfStock.color
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Updated Products</CardTitle>
            <CardDescription>Latest product modifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products?.slice(0, 5).map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="flex items-center gap-3">
                      <Image
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-lg border object-cover"
                        width={40}
                        height={40}
                      />
                      <span className="font-medium">{product.name}</span>
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>
                      <Status
                        text={product.inStock ? "In Stock" : "Out of Stock"}
                        color={product.inStock ? "bg-green-500" : "bg-red-500"}
                        width="w-28"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>
                Showing the 5 most recently updated products
              </TableCaption>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
