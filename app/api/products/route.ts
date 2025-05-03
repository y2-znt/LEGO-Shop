import { createProduct, getProducts } from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route GET /api/products
 * @description Get all products
 * @returns {product[]} The list of products
 */
export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products);
}

/**
 * @route POST /api/products
 * @description Create a new product
 * @returns {product} The created product
 */
export async function POST(req: NextRequest) {
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
