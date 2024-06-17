import getProducts from "../../pages/api/auth/getProducts";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Collection from "./sections/Collection";
import Contact from "./sections/Contact";

export const revalidate = 0;

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <div className="mx-auto max-w-6xl text-black max-xl:px-8">
        <Hero />
        <Collection products={products} />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
