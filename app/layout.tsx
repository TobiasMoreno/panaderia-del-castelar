import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { business } from "@/config/business";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl ?? "http://localhost:3000"),
  applicationName: business.fullName,
  title: {
    default: "Del Castelar | Panadería en Córdoba",
    template: "%s | Del Castelar",
  },
  robots: {
    index: Boolean(business.siteUrl),
    follow: Boolean(business.siteUrl),
  },
  icons: {
    icon: [{ url: "/brand/logo.jpeg", type: "image/jpeg", sizes: "406x406" }],
    apple: "/brand/logo.jpeg",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1933",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-AR" className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
