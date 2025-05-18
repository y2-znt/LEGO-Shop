import { CartItem } from "@/stores/CartStore";

export interface CheckoutData {
  email: string;
  items: CartItem[];
}

export const createCheckoutSession = async (checkoutData: CheckoutData) => {
  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    });
    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
