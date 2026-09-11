"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Instagram, Menu, X } from "lucide-react";
import { business } from "@/config/business";
import { navigation } from "@/config/navigation";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (query.matches && dialog.current?.open) dialog.current.close();
    };
    query.addEventListener("change", closeOnDesktop);
    return () => {
      query.removeEventListener("change", closeOnDesktop);
      document.body.style.overflow = "";
    };
  }, []);

  function closeMenu() {
    dialog.current?.close();
  }
  function restoreMenu() {
    document.body.style.overflow = "";
    trigger.current?.focus();
  }
  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      ),
    );
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link
          className="brand-logo"
          href="/"
          aria-label="Del Castelar Panadería — Inicio"
        >
          <Image
            src="/brand/logo.jpeg"
            alt="Del Castelar Panadería"
            width={406}
            height={406}
            sizes="96px"
            loading="eager"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {navigation.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="instagram-link"
            href={business.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de Del Castelar (abre en otra pestaña)"
          >
            <Instagram size={19} />
          </a>
          <a
            className="header-directions"
            href={business.maps}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cómo llegar <ArrowUpRight size={16} aria-hidden="true" />
            <span className="sr-only"> (abre en otra pestaña)</span>
          </a>
          <button
            ref={trigger}
            className="menu-trigger"
            aria-label="Abrir menú"
            aria-haspopup="dialog"
            onClick={() => {
              dialog.current?.showModal();
              document.body.style.overflow = "hidden";
            }}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-labelledby="menu-title"
        onClose={restoreMenu}
        onKeyDown={containFocus}
      >
        <div className="mobile-menu-top">
          <span id="menu-title" className="eyebrow">
            Del Castelar · Panadería
          </span>
          <button
            className="menu-close"
            onClick={closeMenu}
            aria-label="Cerrar menú"
            autoFocus
          >
            <X size={27} />
          </button>
        </div>
        <nav aria-label="Navegación móvil">
          {navigation.map((link, i) => (
            <Link href={link.href} key={link.href} onClick={closeMenu}>
              <span className="menu-number">0{i + 1}</span>
              {link.label}
              <ArrowUpRight size={22} aria-hidden="true" />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-bottom">
          <p>
            {business.address.street}
            <br />
            {business.address.city}, {business.address.country}
          </p>
          <a
            href={business.maps}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="action action--solid"
          >
            Cómo llegar <ArrowUpRight size={18} />
          </a>
          <div className="mobile-socials">
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram ↗
            </a>
            <a
              href={business.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp ↗
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
