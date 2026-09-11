import Image from "next/image";
import { ActionLink } from "@/components/ui/action-link";

export function Coffee() {
  return (
    <section className="coffee-section" aria-labelledby="coffee-title">
      <div className="container coffee-layout">
        <div className="coffee-photo">
          <Image
            src="/store/cafe.jpeg"
            alt="Un café en Del Castelar con el mostrador de panadería de fondo"
            width={381}
            height={508}
            sizes="(max-width: 767px) 65vw, 340px"
          />
        </div>
        <div className="coffee-copy">
          <p className="eyebrow">Una pausa en Del Castelar</p>
          <h2 id="coffee-title">
            Algo recién horneado.
            <br />
            Un café.
            <br />
            <em>Y un ratito para vos.</em>
          </h2>
          <ActionLink href="/productos?categoria=cafe">
            El compañero de siempre
          </ActionLink>
        </div>
        <span className="coffee-side" aria-hidden="true">
          EL GUSTO DE LO SIMPLE
        </span>
      </div>
    </section>
  );
}
