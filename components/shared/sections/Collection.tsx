"use client";

import ProductCard from "@/components/shared/ProductCard";
import Title from "@/components/shared/Title";
import { useCartActions } from "@/hooks/useCartActions";
import { useFavoriteActions } from "@/hooks/useFavoriteActions";
import { useProduct } from "@/hooks/useProduct";
import { useFavoriteStore } from "@/stores/FavoriteStore";

export default function Collection() {
  const { data: products } = useProduct();
  const { add: addFavorite, remove: removeFavorite } = useFavoriteActions();
  const { add: addToCart } = useCartActions();
  const { items } = useFavoriteStore();

  return (
    <div>
      <Title text="New Collection" className="pt-24" />
      <div className="py-16">
        <div className="grid grid-cols-3 gap-20 max-lg:gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
          {products &&
            products.map((product) => {
              const isFavorite = items.some((item) => item.id === product.id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={isFavorite}
                  onFavoriteClick={() =>
                    isFavorite ? removeFavorite(product) : addFavorite(product)
                  }
                  onAddToCart={() => addToCart(product)}
                />
              );
            })}
        </div>
      </div>
      <div className="glow -right-32 max-md:-right-40"></div>
    </div>
  );
}
