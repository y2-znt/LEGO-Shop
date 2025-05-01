import { createProduct } from "@/services/product.service";
import { NextResponse } from "next/server";

/**
 * @route POST /api/products
 * @description Create a new product
 * @returns {product} The created product
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const product = await createProduct(body);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
