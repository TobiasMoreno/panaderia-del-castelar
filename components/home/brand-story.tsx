import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function BrandStory() {
  return (
    <section
      className="brand-section"
      id="panaderia"
      aria-labelledby="brand-title"
    >
      <div className="container brand-layout">
        <div className="brand-text">
          <p className="eyebrow section-label">02 / Nuestra panadería</p>
          <h2 id="brand-title">
            Tradición
            <br />
            <span>en cada</span>
            <br />
            <em>receta.</em>
          </h2>
          <div className="brand-description">
            <span className="small-rule" />
            <p>
              Un mostrador lleno de opciones.
              <br />
              El aroma de lo recién horneado.
              <br />Y algo rico para llevar a tu mesa.
            </p>
            <p>Así se vive Del Castelar, todos los días.</p>
          </div>
        </div>
        <Reveal className="brand-photo">
          <Image
            src="/store/interior-02.jpeg"
            alt="Identidad de Del Castelar y bandejas de facturas en el interior del local"
            width={381}
            height={508}
            sizes="(max-width: 767px) 65vw, 381px"
          />
          <span>Lo de todos los días, con el cuidado de siempre.</span>
        </Reveal>
      </div>
    </section>
  );
}
