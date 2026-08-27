import { Hero } from "@/components/sections/Hero";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { Lookbook } from "@/components/sections/Lookbook";
import { Story } from "@/components/sections/Story";

export default function Home() {
  return (
    <main id="top" tabIndex={-1}>
      <Hero />
      <ProductGrid />
      <Lookbook />
      <Story />
    </main>
  );
}
