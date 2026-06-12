import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light" | "ghost" | "glass";
  external?: boolean;
  icon?: ReactNode;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  icon,
  className = "",
}: ButtonLinkProps) {
  const variants = {
    primary:
      "bg-[#063b50] text-white shadow-[0_14px_34px_rgba(4,57,78,0.2)] hover:bg-[#052f40]",
    secondary:
      "border border-[#b9dce7] bg-white text-[#063b50] hover:border-[#7cc6dc] hover:bg-[#f2fbfd]",
    light: "bg-white text-[#075a76] hover:bg-[#dff7fc]",
    ghost: "text-[#075a76] hover:bg-white/50",
    glass:
      "border border-white/70 bg-white/60 text-[#063b50] shadow-sm backdrop-blur-md hover:bg-white/85",
  };

  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 text-sm font-extrabold transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {icon}
      <span>{children}</span>
      {!icon && <ArrowUpRight className="size-4" aria-hidden="true" />}
    </a>
  );
}
