import Image from "next/image";
import { business } from "@/config/business";
import { ActionLink } from "@/components/ui/action-link";

export function StoreGallery() {
  return (
    <section
      className="section container gallery-section"
      aria-labelledby="gallery-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow section-label">03 / Puertas adentro</p>
          <h2 id="gallery-title">
            Pasá.
            <br />
            <em>Estás en tu panadería.</em>
          </h2>
        </div>
        <p>
          Hay mucho para elegir.
          <br />Y una esquina para volver.
        </p>
      </div>
      <div className="gallery-layout">
        <figure className="gallery-wide">
          <div className="gallery-image">
            <Image
              src="/mostrador-izquierdo.jpeg"
              alt="Vitrina de Del Castelar con masas, alfajores y productos dulces"
              fill
              sizes="(max-width: 767px) 88vw, 520px"
            />
          </div>
          <figcaption>El mostrador, cada día.</figcaption>
        </figure>
        <figure className="gallery-tall">
          <div className="gallery-image">
            <Image
              src="/cartel-luminoso.jpeg"
              alt="Cartel exterior de la panadería Del Castelar sobre el cielo azul"
              fill
              sizes="(max-width: 767px) 48vw, 304px"
            />
          </div>
          <figcaption>Encontranos en {business.address.street}.</figcaption>
        </figure>
        <div className="gallery-note">
          <span className="small-rule" />
          <p>
            De este lado
            <br />
            del mostrador,
            <br />
            <em>te esperamos.</em>
          </p>
          <ActionLink href={business.instagram} external>
            Seguinos en Instagram
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
