import Image from "next/image";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Collection from "./components/Collection";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto max-xl:px-8">
        <Hero />
        <Collection />
      </div>
    </div>
  );
}
