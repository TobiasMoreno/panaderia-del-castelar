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
// Official product photos supplied by Del Castelar use provisionalImage=false.
export const products: Product[] = [
  {
    id: "facturas",
    slug: "facturas",
    name: "Facturas",
    category: "facturas",
    shortDescription: "Las compañeras de cada mate.",
    image: "/products/facturas-del-castelar.jpeg",
    imageAlt:
      "Facturas de hojaldre con crema, coco, chocolate y frutos secos de Del Castelar",
    featured: true,
    provisionalImage: false,
  },
  {
    id: "chipa",
    slug: "chipa",
    name: "Chipa",
    category: "salados",
    shortDescription: "Doraditos, tiernos y listos para picar.",
    image: "/chipa.jpeg",
    imageAlt: "Chipa de Del Castelar exhibido en una canasta del mostrador",
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
    provisionalImage: false,
  },
  {
    id: "pasteleria",
    slug: "pasteleria",
    name: "Pastelería",
    category: "pasteleria",
    shortDescription: "Para hacerle un lugar a algo dulce.",
    image: "/products/pasteleria-rogel.jpeg",
    imageAlt:
      "Rogel de Del Castelar con capas de dulce de leche y copos de merengue",
    featured: true,
    provisionalImage: false,
  },
  {
    id: "tortas",
    slug: "tortas",
    name: "Tortas",
    category: "tortas",
    shortDescription: "Una buena excusa para compartir.",
    image: "/products/torta-decorada.jpeg",
    imageAlt:
      "Torta de Del Castelar decorada con crema blanca y rosa, cerezas y chocolate",
    featured: true,
    provisionalImage: false,
  },
  {
    id: "dulces",
    slug: "masas-y-cosas-dulces",
    name: "Masas y cosas dulces",
    category: "dulces",
    shortDescription: "Pequeños gustos para la tarde.",
    image: "/products/dulce-baniado-en-chocolate.jpeg",
    imageAlt:
      "Pieza dulce de Del Castelar bañada en chocolate blanco y negro",
    featured: true,
    provisionalImage: false,
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
