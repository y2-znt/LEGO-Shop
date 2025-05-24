import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";

/**
 * @route POST /api/checkout
 * @description Create a Stripe checkout session
 * @param {NextRequest} req - The request object
 * @returns {NextResponse} - A response containing the URL of the created Stripe session
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, email } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const lineItems = items.map(
      (item: {
        name: string;
        price: number;
        quantity: number;
        image: string;
      }) => {
        if (!item.name || !item.price || !item.quantity) {
          throw new Error("Invalid item data");
        }
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: item.image ? [item.image] : [],
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        };
      }
    );

    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error("Error in checkout:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
