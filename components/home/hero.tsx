import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import { business } from "@/config/business";
import { ActionLink } from "@/components/ui/action-link";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-eyebrow">
          <span /> Panadería en {business.address.city}
        </p>
        <h1 id="hero-title">
          Recién
          <br />
          horneadoashe.
          <br />
          <em>Todos los días.</em>
        </h1>
        <p className="hero-description">
          El pan de tu mesa. Las facturas del mate.
          <br />
          Los pequeños gustos de todos los días.
        </p>
        <div className="hero-actions">
          <ActionLink href="/productos" variant="solid">
            Ver productos
          </ActionLink>
          <ActionLink href={business.maps} external>
            Cómo llegar
          </ActionLink>
        </div>
        <a className="hero-address" href="#local">
          <MapPin size={15} aria-hidden="true" /> {business.address.street} ·{" "}
          {business.address.city}
          <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
      <div className="hero-visual">
        <Image
          src="/store/fachada.jpeg"
          alt="La esquina y entrada de Del Castelar Panadería, con su cartelería azul y dorada"
          fill
          sizes="(max-width: 767px) 100vw, 55vw"
          loading="eager"
          fetchPriority="high"
          className="hero-photo"
        />
        <div className="hero-photo-caption">
          <span>Tu próxima parada.</span>
          <span>
            Te esperamos <ArrowUpRightSmall />
          </span>
        </div>
        <div className="hero-side-note" aria-hidden="true">
          DEL CASTELAR · PANADERÍA
        </div>
      </div>
      <div className="hero-bottom">
        <span>Tradición en cada receta</span>
        <span className="hero-bottom-rule" />
        <a href="#productos">
          Un vistazo al mostrador <ArrowDown size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
function ArrowUpRightSmall() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <path d="M6 18 18 6M6 6h12v12" />
    </svg>
  );
}
