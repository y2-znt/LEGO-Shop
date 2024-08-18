import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getCurrentUser } from "../../../pages/api/auth/getCurrentUser";
import prisma from "../../../prisma/prismadb";

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
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (!payment_intent_id) {
    // Create a new payment intent with the calculated total amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });
    // Associate the new payment intent ID with the order data
    orderData.paymentIntentId = paymentIntent.id;

    // Create a new order record in the database
    await prisma.order.create({ data: orderData });

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

      // Update the corresponding order record in the database
      const [existing_order, update_order] = await Promise.all([
        prisma.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        prisma.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid Payment Intent" },
          { status: 400 },
        );
      }
      return NextResponse.json({ paymentIntent: updated_intent });
    }
  }
}
