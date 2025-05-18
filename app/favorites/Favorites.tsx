"use client";

import PageState from "@/components/shared/PageState";
import ProductCard from "@/components/shared/ProductCard";
import Title from "@/components/shared/Title";
import { useCartActions } from "@/features/cart/hooks/useCartActions";
import { useFavoriteActions } from "@/hooks/useFavoriteActions";
import { FavoriteItem, useFavoriteStore } from "@/stores/FavoriteStore";

export default function Favorites() {
  const { items } = useFavoriteStore();
  const { remove: removeFavorite } = useFavoriteActions();
  const { addFromFavorite: addToCart } = useCartActions();

  return (
    <div>
      <Title text="Favorites" />
      <div>
        {items.length === 0 ? (
          <PageState
            title="You have not favorites LEGO."
            imagePath="/assets/favorite-empty.webp"
            buttonText="Continue shopping"
          />
        ) : (
          <div className="grid grid-cols-3 gap-20 pt-14 max-lg:gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
            {items.map((favItem: FavoriteItem) => (
              <ProductCard
                key={favItem.id}
                product={favItem}
                isFavorite={true}
                onFavoriteClick={() => removeFavorite(favItem)}
                onAddToCart={() => addToCart(favItem)}
                showFavoriteButton={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
