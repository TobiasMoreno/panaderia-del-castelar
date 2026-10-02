"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import { categories, products } from "@/data/products";

const validCategory = (value: string | null) =>
  categories.some((c) => c.id === value) ? value! : "todos";

export function Catalog() {
  const [selected, setSelected] = useState("todos");
  const reduced = useReducedMotion();
  useEffect(() => {
    function sync() {
      setSelected(
        validCategory(
          new URLSearchParams(window.location.search).get("categoria"),
        ),
      );
    }
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);
  function selectCategory(id: string) {
    setSelected(id);
    const url = new URL(window.location.href);
    if (id === "todos") url.searchParams.delete("categoria");
    else url.searchParams.set("categoria", id);
    window.history.pushState(null, "", `${url.pathname}${url.search}`);
  }
  const filtered =
    selected === "todos"
      ? products
      : products.filter((p) => p.category === selected);
  return (
    <div className="catalog">
      <div
        className="category-nav"
        role="group"
        aria-label="Filtrar productos por categoría"
      >
        <button
          aria-pressed={selected === "todos"}
          onClick={() => selectCategory("todos")}
        >
          Todos <span>{String(products.length).padStart(2, "0")}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            aria-pressed={selected === c.id}
            onClick={() => selectCategory(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>
      <div className="catalog-info">
        <p>Del horno, del mostrador, para vos.</p>
        <span role="status" aria-live="polite" aria-atomic="true">
          {filtered.length}{" "}
          {filtered.length === 1 ? "selección" : "selecciones"}
        </span>
      </div>
      <LazyMotion features={domAnimation}>
        <div
          className={`catalog-grid ${selected !== "todos" ? "catalog-grid--filtered" : ""}`}
          key={selected}
        >
          {filtered.map((product, i) => (
            <m.article
              className={`catalog-product catalog-product--${product.id}`}
              key={product.id}
              initial={reduced ? false : { y: 8 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.035, 0.15) }}
            >
              <div className="catalog-photo">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 1023px) 45vw, 40vw"
                />
                <span className="catalog-photo-label">
                  {product.provisionalImage
                    ? "Imagen ilustrativa"
                    : "En Del Castelar"}
                </span>
              </div>
              <div className="catalog-product-meta">
                <span className="eyebrow">
                  {categories.find((c) => c.id === product.category)?.name}
                </span>
                <span className="product-number">
                  {String(products.indexOf(product) + 1).padStart(2, "0")}
                </span>
              </div>
              <h2>{product.name}</h2>
              <p>{product.shortDescription}</p>
            </m.article>
          ))}
        </div>
      </LazyMotion>
      <p className="catalog-disclaimer">
        Fotografías reales de nuestros productos. Las variedades disponibles
        pueden cambiar: consultanos o acercate al mostrador.
      </p>
    </div>
  );
}
