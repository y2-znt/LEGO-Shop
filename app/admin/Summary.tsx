"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/shadcn/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table";
import { Product, User } from "@prisma/client";
import Image from "next/image";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

const transformData = (products: Product[]) => {
  return products.map((product) => ({
    name: product.name,
    price: product.price,
    stockStatus: product.inStock ? "inStock" : "outOfStock",
  }));
};

type SummaryType = {
  products: Product[];
  allUsers: User[];
};

export default function Summary({ products, allUsers }: SummaryType) {
  const chartData = transformData(products);

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
      <h1 className="text-4xl max-md:text-3xl max-sm:text-[1.7rem]">Summary</h1>
      <div className="mt-10 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="rounded-lg border p-8 text-center transition-all hover:bg-gray-100">
          <h2 className="text-2xl">
            {products.length} <br /> Total LEGO
          </h2>
        </div>
        <div className="rounded-lg border p-8 text-center transition-all hover:bg-gray-100">
          <h2 className="text-2xl">
            {allUsers.length}
            <br /> Total Users
          </h2>
        </div>
        <div className="rounded-lg border p-8 text-center transition-all hover:bg-gray-100">
          <h2 className="text-2xl">
            {products.filter((product) => product.inStock).length}
            <br /> LEGO in Stock
          </h2>
        </div>
        <div className="rounded-lg border p-8 text-center transition-all hover:bg-gray-100">
          <h2 className="text-2xl">
            {products.length -
              products.filter((product) => product.inStock).length}
            <br /> LEGO out of Stock
          </h2>
        </div>
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
              <div className="flex flex-row items-center gap-2 text-center text-sm text-muted-foreground">
                <span className="h-4 w-10 rounded-sm bg-[#ffcd56]"></span>In
                Stock
              </div>
              <div className="flex flex-row items-center gap-2 text-center text-sm text-muted-foreground">
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
            <div className="leading-none text-muted-foreground">
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
              {products.slice(0, 5).map((product) => (
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
