import Collection from "./components/Collection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto max-xl:px-8">
        <Hero />
        <Collection />
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
