import { useId } from "react";

export function FireplaceLogo({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const clipId = `sleeve-clip-${uid}`;

  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <span className="inline-flex flex-col">
        <span
          className="inline-flex items-center"
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontWeight: 400, letterSpacing: "0.04em" }}
        >
          <span>Fireplace Rec</span>

          <svg
            viewBox="0 0 20 20"
            aria-hidden="true"
            style={{
              width: "0.72em",
              height: "0.72em",
              display: "inline-block",
              verticalAlign: "0.05em",
              flexShrink: 0,
            }}
          >
            <circle cx="10" cy="10" r="10" fill="#111827" />
            <circle cx="10" cy="10" r="8"   fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.3" />
            <circle cx="10" cy="10" r="5.8" fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="1.1" />
            <circle cx="10" cy="10" r="3.6" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.9" />
            <circle cx="10" cy="10" r="1.8" fill="rgba(255,255,255,0.70)" />
          </svg>

          <span>rds</span>
        </span>

        <span
          style={{
            display: "block",
            height: "1.5px",
            background: "currentColor",
            borderRadius: "1px",
            opacity: 0.85,
          }}
        />
      </span>

      <svg
        viewBox="0 0 38 32"
        aria-hidden="true"
        style={{ width: "1.15em", height: "1.15em", flexShrink: 0 }}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="38" height="32" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <circle cx="31" cy="15" r="12" fill="#111827" />
          <circle cx="31" cy="15" r="9.5" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />
          <circle cx="31" cy="15" r="7"   fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="1.0" />
          <circle cx="31" cy="15" r="4.5" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.9" />
          <circle cx="31" cy="15" r="2"   fill="#555" />
          <rect x="1.5" y="1.5" width="26" height="26" fill="white" stroke="#dc2626" strokeWidth="3" />
        </g>
      </svg>
    </span>
  );
}
