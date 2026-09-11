import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/ui/reveal";

export function FeaturedProducts() {
  const featured = products.filter((product) => product.featured);
  return (
    <section
      className="section container featured-section"
      id="productos"
      aria-labelledby="featured-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow section-label">01 / El mostrador</p>
          <h2 id="featured-title">
            Lo que sale
            <br />
            <em>del horno.</em>
          </h2>
        </div>
        <p>
          Para el desayuno, la mesa
          <br />o ese antojo de la tarde.
        </p>
      </div>
      <div className="featured-grid">
        {featured.map((product, index) => (
          <Reveal
            className={`featured-item featured-item--${index + 1}`}
            key={product.id}
          >
            <Link
              className="product-link"
              href={`/productos?categoria=${product.category}`}
            >
              <div className="product-photo">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 767px) 90vw, 48vw"
                      : "(max-width: 767px) 44vw, 25vw"
                  }
                />
              </div>
              <div className="product-caption">
                <div>
                  <span className="product-number">0{index + 1}</span>
                  <h3>{product.name}</h3>
                </div>
                <ArrowUpRight size={22} aria-hidden="true" />
              </div>
            </Link>
          </Reveal>
        ))}
        <div className="featured-editorial">
          <span className="small-rule" />
          <p>
            Siempre hay
            <br />
            algo <em>rico.</em>
          </p>
          <span>Elegí tu próxima pausa.</span>
        </div>
      </div>
      <div className="featured-bottom">
        <p className="image-note">
          Fotografías de producto ilustrativas.
          <br />
          Consultanos por las variedades del día.
        </p>
        <ActionLink href="/productos">Ver todos los productos</ActionLink>
      </div>
    </section>
  );
}
