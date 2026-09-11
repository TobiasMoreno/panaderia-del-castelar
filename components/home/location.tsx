import { MapPin, MessageCircle } from "lucide-react";
import { business } from "@/config/business";
import { ActionLink } from "@/components/ui/action-link";
import { StoreMap } from "@/components/ui/store-map";

export function Location() {
  return (
    <section
      className="section container location-section"
      id="local"
      aria-labelledby="location-title"
    >
      <p className="eyebrow section-label">04 / Nos vemos acá</p>
      <div className="location-layout">
        <div className="location-copy">
          <h2 id="location-title">
            Te esperamos en
            <br />
            <em>{business.address.street}.</em>
          </h2>
          <p className="location-city">
            <MapPin size={17} aria-hidden="true" /> {business.address.city},{" "}
            {business.address.country}
          </p>
          <ActionLink href={business.maps} external variant="solid">
            Cómo llegar
          </ActionLink>
          <a
            className="whatsapp-link"
            href={business.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={18} aria-hidden="true" /> Consultar por
            WhatsApp<span className="sr-only"> (abre en otra pestaña)</span>
          </a>
        </div>
        <div className="hours">
          <h3>Encontrá tu momento.</h3>
          <table>
            <caption className="sr-only">
              Horarios de atención de Del Castelar
            </caption>
            <tbody>
              {business.hours.map((group) => (
                <tr key={group.days}>
                  <th scope="row">{group.days}</th>
                  <td>
                    {group.periods.map((period) => (
                      <span key={period.opens}>
                        {period.opens}–{period.closes}
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="hours-note">Para feriados, consultanos por WhatsApp.</p>
        </div>
      </div>
      <StoreMap />
    </section>
  );
}
