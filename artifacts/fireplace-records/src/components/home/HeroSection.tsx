import { motion } from "framer-motion";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { fadeUp, stagger } from "@/motion/variants";
import imgStorefront from "@assets/exterior-1-web.webp";

export function HeroSection() {
  const heroSection = useAnimatedSection();

  return (
    <section id="hero" className="relative isolate min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      <img
        src={imgStorefront}
        alt="Fireplace Records storefront — open sign and chalkboard reading 'When Servers Go Down Vinyl Will Still Be Here'"
        className="absolute inset-0 -z-10 w-full h-full object-cover object-top brightness-50"
        fetchPriority="high"
        decoding="sync"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/20 to-background" />

      <motion.div
        ref={heroSection.ref}
        variants={stagger}
        initial={heroSection.initial}
        animate={heroSection.animate}
        className="text-center px-6 max-w-5xl mx-auto"
      >
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-block bg-primary text-white text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 mb-6">
            Now Open · Hyattsville, MD
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="hero-title font-display text-[clamp(3rem,12vw,9rem)] font-bold leading-none tracking-tighter uppercase mb-4"
        >
          Fireplace<br />Records
        </motion.h1>

        <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Vinyl · CDs · VHS · Comics · Magazines · Rare Media<br />
          5100 Baltimore Ave · Hyattsville, MD<br />
          <span className="text-foreground font-medium">Thu–Sun · 12PM–8PM</span>
        </motion.p>

        <motion.div variants={fadeUp} className="inline-block border-2 border-primary bg-primary/10 px-8 py-6 text-center">
          <p className="text-primary font-bold text-sm tracking-[0.15em] uppercase mb-1">Grand Opening Weekend</p>
          <p className="font-display text-[clamp(2rem,6vw,4rem)] font-bold text-foreground leading-none uppercase">March 27–29</p>
          <p className="text-muted-foreground text-sm mt-2">Live performances · DJ sets · Discounts · Mystery Boxes</p>
          <a href="#events" className="mt-4 inline-block bg-primary text-white font-bold text-sm tracking-widest uppercase px-6 py-3 hover:bg-primary/90 transition-colors">
            See the lineup →
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground text-xs tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-px h-8 bg-muted-foreground/40 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}
