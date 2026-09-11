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
    featured: true,
    provisionalImage: true,
  },
  {
    id: "panificados",
    slug: "panificados",
    name: "Panificados",
    category: "panificados",
    shortDescription: "Un lugar en la mesa de todos los días.",
    image: "/products/panificados.jpg",
    imageAlt: "Detalle de un pan horneado, fotografía ilustrativa",
    featured: true,
    provisionalImage: true,
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
    featured: true,
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
    id: "salados",
    slug: "salados",
    name: "Salados",
    category: "salados",
    shortDescription: "Para cuando se antoja algo salado.",
    image: "/products/salados.jpg",
    imageAlt: "Sándwich de pan servido en una bandeja, fotografía ilustrativa",
    featured: true,
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
