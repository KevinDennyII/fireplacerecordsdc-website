import { motion } from "framer-motion";
import { STORE_HOURS } from "@/content/siteContent";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { fadeUp, stagger } from "@/motion/variants";
import imgExterior from "@assets/exterior-2-web.webp";

export function VisitSection() {
  const visitSection = useAnimatedSection();

  return (
    <section id="visit" className="py-24 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={visitSection.ref}
          variants={stagger}
          initial={visitSection.initial}
          animate={visitSection.animate}
        >
          <motion.div variants={fadeUp} className="mb-12">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Come See Us</span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-none mt-2">Find Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div variants={fadeUp} className="lg:col-span-2 border border-border bg-card p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-muted-foreground text-xs font-bold tracking-[0.15em] uppercase mb-3">Address</h3>
                  <p className="font-display text-2xl font-bold uppercase leading-snug">
                    5100 Baltimore Ave<br />Hyattsville, MD 20781
                  </p>
                  <a
                    href="https://maps.google.com/?q=5100+Baltimore+Ave+Hyattsville+MD+20781"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-primary text-sm font-bold hover:underline tracking-wide"
                  >
                    Get directions →
                  </a>
                </div>
                <div>
                  <h3 className="text-muted-foreground text-xs font-bold tracking-[0.15em] uppercase mb-3">Hours</h3>
                  <div className="space-y-2">
                    {STORE_HOURS.map(({ day, hours, isOpen, divider }) => (
                      <div
                        key={day}
                        className={`flex justify-between items-center${divider ? " border-t border-border pt-2 mt-2" : ""}`}
                      >
                        <span className={`text-sm${isOpen ? " font-bold text-foreground" : " text-muted-foreground"}`}>{day}</span>
                        <span className={`text-sm${isOpen ? " font-bold text-primary" : " font-medium text-muted-foreground/60"}`}>{hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              <div className="overflow-hidden">
                <img
                  src={imgExterior}
                  alt="Fireplace Records neon 'records' sign in the store window"
                  className="w-full aspect-square object-cover object-center hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="border border-border bg-card p-6">
                <h3 className="text-muted-foreground text-xs font-bold tracking-[0.15em] uppercase mb-3">Call Us</h3>
                <a href="tel:+12403347546" className="font-display text-2xl font-bold hover:text-primary transition-colors">
                  (240) 334-7546
                </a>
              </div>
              <div className="border border-border bg-card p-6">
                <h3 className="text-muted-foreground text-xs font-bold tracking-[0.15em] uppercase mb-3">Instagram</h3>
                <a
                  href="https://www.instagram.com/fireplacerecordsdc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xl font-bold hover:text-secondary transition-colors"
                >
                  @fireplacerecordsdc
                </a>
              </div>
              <div className="border border-border bg-card p-6">
                <h3 className="text-muted-foreground text-xs font-bold tracking-[0.15em] uppercase mb-2">Neighborhood</h3>
                <p className="text-muted-foreground text-sm">Hyattsville, MD — just outside DC. Easily accessible from Route 1 / Baltimore Avenue.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
