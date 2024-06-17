import getProducts from "../pages/api/auth/getProducts";
import Collection from "./components/Collection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

export const revalidate = 0;

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <div className="max-w-6xl mx-auto max-xl:px-8  text-black">
        <Hero />
        <Collection products={products} />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
