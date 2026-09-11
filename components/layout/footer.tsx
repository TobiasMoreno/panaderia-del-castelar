import Image from "next/image";
import Link from "next/link";
import { business } from "@/config/business";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <Link
          href="/"
          className="footer-logo"
          aria-label="Del Castelar — Inicio"
        >
          <Image
            src="/brand/logo.jpeg"
            alt="Logo original de Del Castelar Panadería"
            width={406}
            height={406}
            sizes="140px"
          />
        </Link>
        <div className="footer-address">
          <span className="eyebrow">Nos vemos en la panadería</span>
          <p>
            {business.address.street}
            <br />
            {business.address.city}, {business.address.country}
          </p>
          <a href={business.maps} target="_blank" rel="noopener noreferrer">
            Cómo llegar <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-hours">
          <span className="eyebrow">Horarios</span>
          {business.hours.map((group) => (
            <p key={group.days}>
              <span>{group.days}</span>
              <br />
              {group.periods.map((p) => `${p.opens}–${p.closes}`).join(" / ")}
            </p>
          ))}
        </div>
        <nav className="footer-links" aria-label="Enlaces del pie">
          <span className="eyebrow">Seguí en contacto</span>
          <Link href="/productos">Productos</Link>
          <a
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={business.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <a href={`tel:${business.phoneInternational}`}>
            {business.phoneDisplay}
          </a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} {business.fullName}
        </span>
        <span>Tradición en cada receta.</span>
      </div>
    </footer>
  );
}
