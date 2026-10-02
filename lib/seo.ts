import type { Metadata } from "next";
import { business } from "@/config/business";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = business.siteUrl ? `${business.siteUrl}${path}` : undefined;
  const fullTitle = path === "/" ? title : `${title} | ${business.name}`;
  const socialImage = {
    url: "/store/fachada.jpeg",
    width: 1024,
    height: 768,
    alt: "Fachada de Del Castelar Panadería en Córdoba",
  };
  return {
    title: { absolute: fullTitle },
    description,
    robots: { index: Boolean(business.siteUrl), follow: true },
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: business.fullName,
      locale: "es_AR",
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [socialImage],
    },
  };
}

export const bakerySchema = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: business.fullName,
  ...(business.siteUrl
    ? {
        "@id": `${business.siteUrl}/#panaderia`,
        url: business.siteUrl,
        image: `${business.siteUrl}/store/fachada.jpeg`,
      }
    : {}),
  telephone: business.phoneInternational,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressCountry: business.address.countryCode,
  },
  openingHoursSpecification: business.hours.flatMap((group) =>
    group.periods.map((period) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: group.schemaDays.map((day) => `https://schema.org/${day}`),
      opens: period.opens,
      closes: period.closes,
    })),
  ),
  sameAs: [business.instagram],
  hasMap: business.maps,
};
