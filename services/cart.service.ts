import prisma from "@/prisma/prismadb";

// Retrieve the complete cart with products
export const getCartByUserId = async (userId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
  return cart;
};

// Create an empty cart
export const createCart = async (userId: string) => {
  const cart = await prisma.cart.create({
    data: { userId },
  });
  return cart;
};

// Return an existing cart or create one
export const getOrCreateCart = async (userId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  return cart;
};

// Add a product to the cart
export const addToCart = async (
  userId: string,
  productId: string,
  quantity = 1,
) => {
  const cart = await getOrCreateCart(userId);

  const cartItem = await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId: cart.id, productId } },
    update: { quantity: { increment: quantity } },
    create: { cartId: cart.id, productId, quantity },
  });

  return cartItem;
};

// Update the quantity of a product in the cart
export const updateCartItemQuantity = async (
  userId: string,
  productId: string,
  quantity: number,
) => {
  const cart = await getOrCreateCart(userId);

  if (quantity <= 0) {
    await removeFromCart(userId, productId);
    return null;
  }

  const cartItem = await prisma.cartItem.update({
    where: { cartId_productId: { cartId: cart.id, productId } },
    data: { quantity },
  });

  return cartItem;
};

// Remove a product from the cart
export const removeFromCart = async (userId: string, productId: string) => {
  const cart = await getOrCreateCart(userId);

  await prisma.cartItem.delete({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });
};

// Clear the entire cart
export const clearCart = async (userId: string) => {
  const cart = await getOrCreateCart(userId);

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });
};

// Get total quantity of items in cart
export const getCartItemCount = async (userId: string) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: true,
    },
  });

  return cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;
};
