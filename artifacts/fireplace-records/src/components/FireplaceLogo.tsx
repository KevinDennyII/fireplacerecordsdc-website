import sleeveImg from "@assets/Screenshot_2026-03-22_at_1.55.11_PM_1774206667947.png";
import { cn } from "@/lib/utils";

export function FireplaceLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="inline-flex flex-col">
        <span className="inline-flex items-center whitespace-nowrap font-['Bebas_Neue'] font-normal tracking-[0.04em]">
          <span>Fireplace Rec</span>

          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            className="inline-block w-[0.72em] h-[0.72em] align-[0.05em] shrink-0"
          >
            <circle cx="10" cy="10" r="10" fill="#111827" />
            <circle cx="10" cy="10" r="8"   fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.3" />
            <circle cx="10" cy="10" r="5.8" fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="1.1" />
            <circle cx="10" cy="10" r="3.6" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.9" />
            <circle cx="10" cy="10" r="1.8" fill="rgba(255,255,255,0.70)" />
          </svg>

          <span>rds</span>
        </span>

        <span className="block h-px bg-current rounded-sm opacity-[0.85]" />
      </span>

      <img
        src={sleeveImg}
        alt=""
        aria-hidden="true"
        className="w-[1.5em] h-[1.5em] shrink-0 object-contain"
      />
    </span>
  );
}
