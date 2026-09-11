const publicOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(
  /\/$/,
  "",
);
if (publicOrigin && !/^https?:\/\/[^/]+$/.test(publicOrigin)) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL debe ser un origen válido, sin ruta ni barra final.",
  );
}

export const business = {
  name: "Del Castelar",
  fullName: "Del Castelar Panadería",
  address: {
    street: "Potosí 908",
    city: "Córdoba",
    country: "Argentina",
    countryCode: "AR",
  },
  phoneDisplay: "0351 610-3609",
  phoneInternational: "+5493516103609",
  whatsapp:
    "https://wa.me/5493516103609?text=Hola%2C%20quisiera%20hacer%20una%20consulta.",
  instagram: "https://www.instagram.com/panaderiadelcastelar/",
  instagramHandle: "@panaderiadelcastelar",
  maps: "https://maps.app.goo.gl/tPYk8v5Fj3GeaKGd8",
  mapEmbed:
    "https://www.google.com/maps?q=Potos%C3%AD%20908%2C%20C%C3%B3rdoba%2C%20Argentina&output=embed",
  siteUrl: publicOrigin,
  hours: [
    {
      days: "Lunes a viernes",
      schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      periods: [
        { opens: "07:00", closes: "14:00" },
        { opens: "16:00", closes: "21:30" },
      ],
    },
    {
      days: "Sábado",
      schemaDays: ["Saturday"],
      periods: [
        { opens: "07:30", closes: "14:00" },
        { opens: "16:00", closes: "21:30" },
      ],
    },
    {
      days: "Domingo",
      schemaDays: ["Sunday"],
      periods: [{ opens: "08:00", closes: "14:00" }],
    },
  ],
} as const;
