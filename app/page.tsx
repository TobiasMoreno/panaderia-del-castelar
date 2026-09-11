import { Hero } from "@/components/home/hero";
import { FeaturedProducts } from "@/components/home/featured-products";
import { BrandStory } from "@/components/home/brand-story";
import { StoreGallery } from "@/components/home/store-gallery";
import { Coffee } from "@/components/home/coffee";
import { Location } from "@/components/home/location";
import { bakerySchema, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Del Castelar | Panadería en Córdoba",
  "Panadería Del Castelar en Potosí 908, Córdoba. Panificados, facturas, pastelería, tortas, salados y café. Mirá el catálogo y encontrá cómo llegar.",
  "/",
);
export default function HomePage() {
  return (
    <main id="contenido">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bakerySchema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <FeaturedProducts />
      <BrandStory />
      <StoreGallery />
      <Coffee />
      <Location />
    </main>
  );
}
