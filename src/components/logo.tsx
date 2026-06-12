import Link from "next/link";
import { HeartPulse } from "lucide-react";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      href="/"
      className={`inline-flex min-h-11 items-center gap-3 ${inverted ? "text-white" : "text-slate-950"}`}
      aria-label="Ветеринарная клиника Илбирс — на главную"
    >
      <span className={`grid size-10 shrink-0 place-items-center rounded-md ${inverted ? "bg-white text-[#08789f]" : "bg-[#063b50] text-[#65dcf4]"}`}>
        <HeartPulse className="size-5" aria-hidden="true" />
      </span>
      <span className="leading-none">
        <span className="block text-lg font-bold">Илбирс</span>
        <span className={`mt-1 block text-[10px] font-semibold uppercase ${inverted ? "text-sky-100" : "text-slate-500"}`}>
          Ветеринарная клиника
        </span>
      </span>
    </Link>
  );
}
