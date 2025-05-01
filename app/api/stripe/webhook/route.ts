import { stripe } from "@/lib/stripe";
import prisma from "@/prisma/prismadb";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Disable CSRF protection for Stripe webhooks
export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    if (!signature)
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json(
        {
          error: `Webhook signature verification failed: ${err instanceof Error ? err.message : "Unknown error"}`,
        },
        { status: 400 },
      );
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      if (!session.customer_email || !session.amount_total) {
        throw new Error(
          "Missing required session fields: customer_email or amount_total",
        );
      }

      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id,
      );

      if (!lineItems.data.length) {
        throw new Error("No line items found in session");
      }

      const user = await prisma.user.findUnique({
        where: { email: session.customer_email },
      });

      if (!user) {
        return NextResponse.json(
          { error: `User not found for email: ${session.customer_email}` },
          { status: 404 },
        );
      }

      const orderItems = await Promise.all(
        lineItems.data.map(async (item) => {
          if (!item.price?.id) {
            throw new Error("Line item missing price ID");
          }

          const price = await stripe.prices.retrieve(item.price.id, {
            expand: ["product"],
          });

          const productData = price.product as Stripe.Product;

          if (!productData.name) throw new Error("Stripe product has no name");

          const product = await prisma.product.findFirst({
            where: { name: productData.name },
          });

          if (!product)
            throw new Error(`Product not found: ${productData.name}`);

          return {
            productId: product.id,
            quantity: item.quantity || 1,
          };
        }),
      );

      const order = await prisma.order.create({
        data: {
          userId: user.id,
          amount: session.amount_total / 100,
          currency: session.currency || "usd",
          status: "PAID",
          checkoutSessionId: session.id,
          orderItems: {
            create: orderItems,
          },
        },
      });

      return NextResponse.json({
        success: true,
        orderId: order.id,
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", {
      type: error instanceof Error ? error.constructor.name : "Unknown",
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
