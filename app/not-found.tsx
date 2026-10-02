import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/action-link";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="contenido" className="container not-found">
      <p className="eyebrow">404 / Página no encontrada</p>
      <h1>
        Por acá no era.
        <br />
        <em>El horno está por allá.</em>
      </h1>
      <ActionLink href="/" variant="solid">
        Volver al inicio
      </ActionLink>
      <ActionLink href="/productos">Ver productos</ActionLink>
    </main>
  );
}
