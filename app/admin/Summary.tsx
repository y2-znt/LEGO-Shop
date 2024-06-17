"use client";
import { Product } from "@prisma/client";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import Image from "next/image";
import { Bar } from "react-chartjs-2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/shadcn/table";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

type SummaryType = {
  products: Product[];
};

export default function Summary({ products }: SummaryType) {
  const inStockCount = products.filter((product) => product.inStock).length;
  const outOfStockCount = products.length - inStockCount;

  // Data for the stacked bar chart
  const chartData = {
    labels: products.map((product) => product.name),
    datasets: [
      {
        label: "In Stock",
        data: products.map((product) => (product.inStock ? product.price : 0)),
        backgroundColor: "rgba(255, 205, 86, 0.2)",

        borderColor: "rgb(255, 205, 86)",
        borderWidth: 1,
      },
      {
        label: "Out of Stock",
        data: products.map((product) => (!product.inStock ? product.price : 0)),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        precision: 1,
        stacked: true,
      },
      x: {
        stacked: true,
      },
    },
  };

  return (
    <div>
      <h1 className="pt-10 text-4xl max-md:text-3xl max-sm:text-[1.7rem]">
        Summary
      </h1>
      <div className="mt-10 grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div className="rounded-lg border p-8 text-center transition-all hover:bg-gray-100">
          <h2 className="text-2xl">
            {products.length} <br /> Total LEGO
          </h2>
        </div>
        <div className="rounded-lg border p-8 text-center transition-all hover:bg-gray-100">
          <h2 className="text-2xl">
            {inStockCount}
            <br /> LEGO in Stock
          </h2>
        </div>
        <div className="rounded-lg border p-8 text-center transition-all hover:bg-gray-100">
          <h2 className="text-2xl">
            {outOfStockCount}
            <br /> LEGO out of Stock
          </h2>
        </div>
      </div>
      <div className="mt-20">
        <h2 className="text-2xl">LEGO Overview</h2>
        <div className="mt-10 rounded-lg border p-8">
          <Bar data={chartData} options={chartOptions} />
        </div>
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
              {products.slice(0, 5).map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Image
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-12 rounded-lg border object-cover p-1"
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>$ {product.price}</TableCell>
                  <TableCell>
                    {new Date(product.updatedAt).toLocaleDateString()} -
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
