import Image from "next/image";
import { GoTrash } from "react-icons/go";

import { CartItem } from "@/stores/CartStore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import QuantityButtons from "./QuantityButtons";

interface CartItemCardProps {
  item: CartItem;
  onRemove: (item: CartItem) => void;
  onIncrease: (item: CartItem) => void;
  onDecrease: (item: CartItem) => void;
}

export default function CartItemCard({
  item,
  onRemove,
  onIncrease,
  onDecrease,
}: CartItemCardProps) {
  return (
    <div className="my-4 grid grid-cols-4 items-center max-sm:grid-cols-1">
      <div>
        <Card className="rounded-xl">
          <CardTitle className="pt-5 pl-5 text-xl font-bold">
            <p>{item.name}</p>
          </CardTitle>
          <CardHeader>
            <figure className="flex h-32 justify-center">
              <Image
                className="w-24"
                src={item.image}
                alt={item.name}
                width={1000}
                height={1000}
              />
            </figure>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-end py-8">
            <Button
              onClick={() => onRemove(item)}
              className="bg-transparent text-gray-700 hover:text-black"
            >
              Remove
              <span className="pl-2">
                <GoTrash color="red" />
              </span>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="pl-32 max-lg:pl-12 max-sm:absolute max-sm:mt-14 max-sm:ml-6 max-sm:pl-0">
        ${item.price.toFixed(2)}
      </div>
      <QuantityButtons
        quantity={item.quantity}
        onIncrease={() => onIncrease(item)}
        onDecrease={() => onDecrease(item)}
        className="ml-32 max-lg:ml-12 max-sm:m-6 max-sm:w-52"
      />
      <div className="justify-self-end max-sm:p-12 max-sm:pt-0">
        <div>${(item.price * item.quantity).toFixed(2)}</div>
      </div>
    </div>
  );
}
