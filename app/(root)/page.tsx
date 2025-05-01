import Collection from "@/components/shared/sections/Collection";
import Contact from "@/components/shared/sections/Contact";
import Hero from "@/components/shared/sections/Hero";

export default async function Home() {
  return (
    <div>
      <div>
        <Hero />
        <Collection />
        <Contact />
      </div>
    </div>
  );
}
