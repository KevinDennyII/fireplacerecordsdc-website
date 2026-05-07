import { FireplaceLogo } from "@/components/FireplaceLogo";

export function HeaderSection() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-md">
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#hero" className="flex-shrink-0 text-foreground hover:text-primary transition-colors text-base md:text-xl">
          <FireplaceLogo />
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-muted-foreground">
          <a href="#events" className="hover:text-foreground transition-colors">Events</a>
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#visit" className="hover:text-foreground transition-colors">Visit</a>
          <a href="#updates" className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-primary/90 transition-colors">
            Follow Updates
          </a>
        </div>
        <a href="https://www.instagram.com/fireplacerecordsdc" target="_blank" rel="noopener noreferrer" className="md:hidden flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors text-xs">
          @fireplacerecordsdc
        </a>
      </nav>
    </header>
  );
}
