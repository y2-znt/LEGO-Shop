import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FavoriteItem } from "@/stores/FavoriteStore";
import { Product } from "@prisma/client";
import Image from "next/image";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { IoBag } from "react-icons/io5";
import OutOfStock from "./OutOfStock";

type ProductCardProps = {
  product: Product | FavoriteItem;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onAddToCart?: () => void;
  showFavoriteButton?: boolean;
};

export default function ProductCard({
  product,
  isFavorite = false,
  onFavoriteClick,
  onAddToCart,
  showFavoriteButton = true,
}: ProductCardProps) {
  return (
    <Card className="rounded-lg">
      {!product.inStock && <OutOfStock />}
      <CardHeader className="flex flex-row justify-between p-8">
        <CardTitle className="text-xl font-bold">
          {product.name.toUpperCase()}
        </CardTitle>
        {showFavoriteButton && (
          <span className="cursor-pointer" onClick={onFavoriteClick}>
            {isFavorite ? (
              <IoIosHeart color="red" size={25} />
            ) : (
              <IoIosHeartEmpty color="gray" size={25} />
            )}
          </span>
        )}
      </CardHeader>
      <figure className="flex h-40 justify-center">
        <Image
          src={product.image}
          width={2000}
          height={2000}
          alt={product.name}
          className="w-1/3 rounded-xl"
        />
      </figure>
      <CardDescription></CardDescription>
      <CardFooter className="flex justify-between py-12 font-bold">
        ${product.price}
        {product.inStock && onAddToCart && (
          <Button onClick={onAddToCart}>
            Add to cart
            <IoBag size={25} className="pl-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
