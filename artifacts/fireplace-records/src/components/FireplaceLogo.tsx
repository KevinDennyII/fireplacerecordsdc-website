import { useId } from "react";

export function FireplaceLogo({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const clipId = `sleeve-clip-${uid}`;

  return (
    <span className={`inline-flex items-center gap-1.5 ${className ?? ""}`}>
      <span
        className="inline-flex items-center"
        style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
      >
        <span>Fireplace Rec</span>

        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          style={{
            width: "0.68em",
            height: "0.68em",
            display: "inline-block",
            verticalAlign: "0.06em",
            flexShrink: 0,
          }}
        >
          <circle cx="10" cy="10" r="10" fill="currentColor" />
          <circle cx="10" cy="10" r="8"   fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />
          <circle cx="10" cy="10" r="5.8" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.0" />
          <circle cx="10" cy="10" r="3.6" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
          <circle cx="10" cy="10" r="1.8" fill="rgba(255,255,255,0.65)" />
        </svg>

        <span>rds</span>
      </span>

      <svg
        viewBox="0 0 30 36"
        aria-hidden="true"
        style={{ width: "1.05em", height: "1.05em", flexShrink: 0 }}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="30" height="36" />
          </clipPath>
        </defs>
        <rect x="1" y="1" width="22" height="34" fill="white" stroke="#dc2626" strokeWidth="2" rx="0.5" />
        <g clipPath={`url(#${clipId})`}>
          <circle cx="28" cy="18" r="12" fill="#111827" />
          <circle cx="28" cy="18" r="9.5" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <circle cx="28" cy="18" r="7"   fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
          <circle cx="28" cy="18" r="4.5" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" />
          <circle cx="28" cy="18" r="2"   fill="#444" />
        </g>
      </svg>
    </span>
  );
}
