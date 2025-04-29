import Collection from "@/components/shared/sections/Collection";
import Contact from "@/components/shared/sections/Contact";
import Hero from "@/components/shared/sections/Hero";
import getProducts from "@/pages/api/auth/getProducts";

export const revalidate = 0;

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <div>
        <Hero />
        <Collection products={products} />
        <Contact />
      </div>
    </div>
  );
}
