import { deleteProduct, updateProduct } from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server";

/**
 * @route PATCH /api/products/:id
 * @description Update a product
 * @param {string} id - The id of the product
 * @returns {product} The updated product
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const body = await req.json();
    const product = await updateProduct(id, body);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * @route DELETE /api/products/:id
 * @description Delete a product
 * @param  {string} id - The id of the product
 * @returns {NextResponse}
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const product = await deleteProduct(id);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
