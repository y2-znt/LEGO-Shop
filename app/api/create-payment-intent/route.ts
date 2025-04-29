import prisma from "@/prisma/prismadb";
import { getCurrentUser } from "@/services/user.service";
import { NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

const calculateOrderAmount = (
  items: { price: number; cartQuantity: number }[],
) => {
  return items.reduce((acc, item) => {
    const itemTotal = item.price * item.cartQuantity;
    return acc + itemTotal;
  }, 0);
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items) * 100;

  if (!payment_intent_id) {
    // Create a new payment intent with the calculated total amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    // Create a new order record in the database
    const newOrder = await prisma.order.create({
      data: {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: "usd",
        status: "pending",
        deliveryStatus: "pending",
        paymentIntentId: paymentIntent.id,
      },
    });

    await Promise.all(
      items.map(async (item: any) => {
        await prisma.product.upsert({
          where: { id: item.id },
          update: {
            name: item.name,
            price: item.price,
            inStock: item.inStock,
            image: item.image,
            order: { connect: { id: newOrder.id } },
          },
          create: {
            id: item.id,
            name: item.name,
            price: item.price,
            inStock: item.inStock,
            image: item.image,
            order: { connect: { id: newOrder.id } },
          },
        });
      }),
    );

    return NextResponse.json({ paymentIntent });
  } else {
    // Retrieve the existing payment intent using the provided ID
    const current_intent =
      await stripe.paymentIntents.retrieve(payment_intent_id);

    if (current_intent) {
      // Update the existing payment intent with the new total amount
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total },
      );

      return NextResponse.json({ paymentIntent: updated_intent });
    }
  }

  return NextResponse.json(
    { error: "Payment Intent not found" },
    { status: 404 },
  );
}
