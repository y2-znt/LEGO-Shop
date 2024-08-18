import getProducts from "../../pages/api/auth/getProducts";
import Collection from "./sections/Collection";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";

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
