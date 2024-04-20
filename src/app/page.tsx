import Header from "./components/Header";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import Footer from "./components/Footer";
import Contact from "./components/Contact";

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
