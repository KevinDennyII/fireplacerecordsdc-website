import { FireplaceLogo } from "@/components/FireplaceLogo";

type FooterSectionProps = {
  visitorCount: number | null;
};

export function FooterSection({ visitorCount }: FooterSectionProps) {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="text-foreground text-lg">
          <FireplaceLogo />
        </div>
        <div className="text-center">
          <p>5100 Baltimore Ave · Hyattsville, MD 20781</p>
          <p className="text-xs mt-1 opacity-60">Thu–Sun 12PM–8PM · <a href="tel:+12403347546" className="hover:text-foreground transition-colors">(240) 334-7546</a></p>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://www.instagram.com/fireplacerecordsdc" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            Instagram
          </a>
          <span className="opacity-30">·</span>
          <a href="tel:+12403347546" className="hover:text-foreground transition-colors">(240) 334-7546</a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-4 text-center text-xs text-muted-foreground/40">
        <p>© {new Date().getFullYear()} Fireplace Records. All rights reserved.</p>
        <p className="mt-1">
          Architected by{" "}
          <a
            href="https://www.ohhdennyservices.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground/70 transition-colors underline underline-offset-2"
          >
            OhhDenny Services, LLC
          </a>
          {" "}with ♥
        </p>
        {visitorCount !== null && (
          <p className="mt-2 tabular-nums">
            {visitorCount.toLocaleString()} visitors
          </p>
        )}
      </div>
    </footer>
  );
}
