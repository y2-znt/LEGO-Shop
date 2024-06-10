import Collection from "./components/Collection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div>
      <div className="max-w-6xl mx-auto max-xl:px-8  text-black">
        <Hero />
        <Collection />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
