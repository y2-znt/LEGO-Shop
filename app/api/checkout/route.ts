import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

/**
 * @route POST /api/checkout
 * @description Create a Stripe checkout session
 * @param request
 * @returns {NextResponse}
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, email } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const lineItems = items.map((item: any) => {
      if (!item.name || !item.price || !item.cartQuantity) {
        throw new Error("Invalid item data");
      }
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.cartQuantity, // Use cartQuantity from Redux store
      };
    });

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
