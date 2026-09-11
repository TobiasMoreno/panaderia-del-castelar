"use client";
import Image from "next/image";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { business } from "@/config/business";

export function StoreMap() {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`location-map ${visible ? "map-is-visible" : ""}`}>
      {visible ? (
        <iframe
          src={business.mapEmbed}
          title={`Ubicación de Del Castelar en ${business.address.street}, ${business.address.city}`}
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="map-preview">
          <div className="map-preview-photo">
            <Image
              src="/store/fachada.jpeg"
              alt="La esquina donde te esperamos: Del Castelar Panadería"
              fill
              sizes="(max-width: 767px) 40vw, 50vw"
            />
          </div>
          <div className="map-preview-copy">
            <p className="eyebrow">Estamos en esta esquina</p>
            <p>
              {business.address.street}
              <br />
              <em>{business.address.city}.</em>
            </p>
            <button onClick={() => setVisible(true)}>
              <MapPin size={15} aria-hidden="true" /> Ver mapa interactivo
            </button>
          </div>
        </div>
      )}
      {visible && (
        <a href={business.maps} target="_blank" rel="noopener noreferrer">
          Abrir ubicación en Google Maps ↗
        </a>
      )}
    </div>
  );
}
