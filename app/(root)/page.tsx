import Collection from "@/components/shared/sections/Collection";
import Contact from "@/components/shared/sections/Contact";
import Hero from "@/components/shared/sections/Hero";
import { getProducts } from "@/services/product.service";
import { getCurrentUser } from "@/services/user.service";

export const revalidate = 0;

export default async function Home() {
  const products = await getProducts();
  const currentUser = await getCurrentUser();

  return (
    <div>
      <div>
        <Hero />
        <Collection products={products} currentUser={currentUser} />
        <Contact />
      </div>
    </div>
  );
}
