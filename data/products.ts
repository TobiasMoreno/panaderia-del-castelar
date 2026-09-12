export const categories = [
  { id: "facturas", name: "Facturas" },
  { id: "panificados", name: "Panificados" },
  { id: "pasteleria", name: "Pastelería" },
  { id: "tortas", name: "Tortas" },
  { id: "dulces", name: "Dulces" },
  { id: "salados", name: "Salados" },
  { id: "cafe", name: "Café" },
] as const;
export type Category = (typeof categories)[number]["id"];
export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  shortDescription: string;
  image: string;
  imageAlt: string;
  featured: boolean;
  provisionalImage: boolean;
};

// Initial category-level selection, not an invented list of specific recipes.
// Replace image + imageAlt and set provisionalImage=false when official photos arrive.
// Stock provenance and licenses are documented in public/products/SOURCES.md.
export const products: Product[] = [
  {
    id: "facturas",
    slug: "facturas",
    name: "Facturas",
    category: "facturas",
    shortDescription: "Las compañeras de cada mate.",
    image: "/products/facturas.jpg",
    imageAlt: "Selección de piezas de bollería doradas, fotografía ilustrativa",
    featured: false,
    provisionalImage: true,
  },
  {
    id: "chipa",
    slug: "chipa",
    name: "Chipa",
    category: "salados",
    shortDescription: "Doraditos, tiernos y listos para picar.",
    image: "/chipa.jpeg",
    imageAlt: "Chipa de Del Castelar exhibido en una canasta del mostrador",
    featured: true,
    provisionalImage: false,
  },
  {
    id: "criollos-comunes",
    slug: "criollos-comunes",
    name: "Criollos comunes",
    category: "panificados",
    shortDescription: "Un clásico para el mate, recién horneado.",
    image: "/criollos-comunes.jpeg",
    imageAlt: "Criollos comunes de Del Castelar exhibidos en una canasta",
    featured: true,
    provisionalImage: false,
  },
  {
    id: "criollos-hojaldres",
    slug: "criollos-hojaldres",
    name: "Criollos de hojaldre",
    category: "panificados",
    shortDescription: "Capas crocantes para acompañar cualquier pausa.",
    image: "/criollos-hojaldres.jpeg",
    imageAlt: "Criollos de hojaldre de Del Castelar exhibidos en una canasta",
    featured: true,
    provisionalImage: false,
  },
  {
    id: "panes",
    slug: "panes",
    name: "Panes",
    category: "panificados",
    shortDescription: "Variedades para cada mesa y cada día.",
    image: "/panes.jpeg",
    imageAlt: "Variedad de panes de Del Castelar exhibidos en el local",
    featured: true,
    provisionalImage: false,
  },
  {
    id: "pasteleria",
    slug: "pasteleria",
    name: "Pastelería",
    category: "pasteleria",
    shortDescription: "Para hacerle un lugar a algo dulce.",
    image: "/products/pasteleria.jpg",
    imageAlt: "Porción de pastelería en un plato, fotografía ilustrativa",
    featured: false,
    provisionalImage: true,
  },
  {
    id: "tortas",
    slug: "tortas",
    name: "Tortas",
    category: "tortas",
    shortDescription: "Una buena excusa para compartir.",
    image: "/products/tortas.jpg",
    imageAlt: "Torta decorada con frutillas, fotografía ilustrativa",
    featured: false,
    provisionalImage: true,
  },
  {
    id: "dulces",
    slug: "masas-y-cosas-dulces",
    name: "Masas y cosas dulces",
    category: "dulces",
    shortDescription: "Pequeños gustos para la tarde.",
    image: "/products/dulces.jpg",
    imageAlt: "Alfajores apilados, fotografía ilustrativa",
    featured: false,
    provisionalImage: true,
  },
  {
    id: "cafe",
    slug: "cafe",
    name: "Café",
    category: "cafe",
    shortDescription: "La pausa que acompaña al horno.",
    image: "/store/cafe.jpeg",
    imageAlt: "Café servido frente al mostrador de Del Castelar",
    featured: false,
    provisionalImage: false,
  },
];
