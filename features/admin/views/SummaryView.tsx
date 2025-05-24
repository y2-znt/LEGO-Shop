"use client";

import { Product } from "@prisma/client";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import StatsCard from "@/features/admin/components/StatsCard";
import { useProduct } from "@/features/admin/hooks/useProduct";
import { useUser } from "@/features/admin/hooks/useUser";

import Title from "@/components/shared/Title";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  const chartData = transformData(products ?? []);

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
      <Title text="Summary" />
      <div className="mt-10 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <StatsCard value={products?.length ?? 0} label="Total LEGO" />
        <StatsCard value={allUsers?.length ?? 0} label="Total Users" />
        <StatsCard
          value={products?.filter((product) => product.inStock).length ?? 0}
          label="LEGO in Stock"
        />
        <StatsCard
          value={
            (products?.length ?? 0) -
            (products?.filter((product) => product.inStock).length ?? 0)
          }
          label="LEGO out of Stock"
        />
      </div>
      <div className="mt-20">
        <Card>
          <CardHeader className="md:pl-8">
            <CardTitle className="font-bold md:text-2xl">
              LEGO Overview
            </CardTitle>
            <CardDescription className="md:text-lg">
              overview for each LEGO
            </CardDescription>
            <div className="flex items-center justify-center gap-5">
              <div className="text-muted-foreground flex flex-row items-center gap-2 text-center text-sm">
                <span className="h-4 w-10 rounded-sm bg-[#ffcd56]"></span>In
                Stock
              </div>
              <div className="text-muted-foreground flex flex-row items-center gap-2 text-center text-sm">
                <span className="h-4 w-10 rounded-sm bg-[#ff6384]"></span>Out of
                Stock
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart data={chartData} accessibilityLayer>
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
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="text-muted-foreground leading-none">
              Showing overview of LEGO
            </div>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-20">
        <h2 className="text-2xl">Recently Updated LEGO</h2>
        <div className="overflow-auto">
          <Table className="my-10">
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Updated At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.slice(0, 5).map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Image
                      src={product.image}
                      alt={`Image of ${product.name}`}
                      className="h-16 w-12 rounded-lg border object-cover"
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>
                    {new Date(product.updatedAt).toLocaleDateString()} -{" "}
                    {new Date(product.updatedAt).toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
