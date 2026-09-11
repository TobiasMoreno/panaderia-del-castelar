import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "text";
  external?: boolean;
  className?: string;
};
export function ActionLink({
  href,
  children,
  variant = "text",
  external = false,
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`action action--${variant} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {external ? (
        <ArrowUpRight size={17} aria-hidden="true" />
      ) : (
        <ArrowRight size={17} aria-hidden="true" />
      )}
      {external && <span className="sr-only"> (abre en otra pestaña)</span>}
    </Link>
  );
}
