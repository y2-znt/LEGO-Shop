import Image from "next/image";
import Header from "./components/theme/Header";
import Hero from "./components/theme/Hero";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto max-xl:px-8">
        <Hero />
      </div>
    </div>
  );
}
