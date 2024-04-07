import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingBagIcon, ShoppingCart } from "lucide-react";

// Definition of types
type ArticleType = {
  id: number;
  title: string;
  author: string;
  date: string;
  user_id: number;
  linkImage: string;
};

export default async function Collection() {
  return (
    <main>
      <h1 className="text-3xl lg:text-4xl font-bold pt-24 max-sm:text-[1.7rem]">
        New collection
      </h1>
      <div className="flex items-center gap-2 pt-16">
        <div className="card w-2/6">
          <Card className="rounded-lg">
            <CardTitle className="text-xl p-8 font-bold">SHARK MAN</CardTitle>
            <CardHeader>
              <figure className="flex justify-center">
                <Image
                  src="/collection01.png"
                  width={2000}
                  height={2000}
                  alt="Article Image"
                  className="w-1/3 rounded-xl"
                />
              </figure>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between py-12 font-bold">
              $6.99
              <Button
                size="default"
                className="rounded-xl text-md bg-[#FFD300] font-bold"
              >
                Add to bag
                <ShoppingCart />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="glow -right-32 max-md:-right-40"></div>
    </main>
  );
}
