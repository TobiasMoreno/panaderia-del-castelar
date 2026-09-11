import { Catalog } from "@/components/products/catalog";
import { ActionLink } from "@/components/ui/action-link";
import { business } from "@/config/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Productos",
  "Conocé las opciones de Del Castelar: facturas, panificados, pastelería, tortas, dulces, salados y café. Te esperamos en Potosí 908, Córdoba.",
  "/productos",
);
export default function ProductsPage() {
  return (
    <main id="contenido">
      <section className="catalog-intro">
        <div className="container">
          <p className="eyebrow section-label">Del Castelar / El mostrador</p>
          <div className="catalog-heading">
            <h1>
              Todo lo que
              <br />
              <em>sale del horno.</em>
            </h1>
            <div>
              <p>
                Lo de cada día.
                <br />
                Lo de una ocasión especial.
                <br />
                Encontrá eso que te gusta.
              </p>
              <span className="small-rule" />
            </div>
          </div>
        </div>
      </section>
      <section
        className="container catalog-section"
        aria-label="Catálogo de productos"
      >
        <Catalog />
      </section>
      <section className="catalog-visit">
        <div className="container">
          <div>
            <p className="eyebrow">Del catálogo a tu mesa</p>
            <h2>
              Elegí con los ojos.
              <br />
              <em>Vení por tu favorito.</em>
            </h2>
          </div>
          <div>
            <p>
              Te esperamos en {business.address.street}, {business.address.city}
              .
            </p>
            <ActionLink href={business.maps} external variant="solid">
              Cómo llegar
            </ActionLink>
            <ActionLink href={business.whatsapp} external>
              Consultar por WhatsApp
            </ActionLink>
          </div>
        </div>
      </section>
    </main>
  );
}
