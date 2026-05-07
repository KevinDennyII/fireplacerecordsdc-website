import { motion } from "framer-motion";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { fadeUp, stagger } from "@/motion/variants";

export function UpdatesSection() {
  const updatesSection = useAnimatedSection();

  return (
    <section id="updates" className="py-24 px-6 border-t border-border bg-primary/5">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          ref={updatesSection.ref}
          variants={stagger}
          initial={updatesSection.initial}
          animate={updatesSection.animate}
        >
          <motion.div variants={fadeUp}>
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Stay in the Loop</span>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-none mt-2 mb-4">
              Follow Us for<br />Event Updates
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Instagram is the main place for new event announcements, in-store updates, and special drops.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <a
              href="https://www.instagram.com/fireplacerecordsdc"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-primary text-white font-bold text-sm tracking-widest uppercase py-4 hover:bg-primary/90 transition-colors"
            >
              Follow @fireplacerecordsdc
            </a>
            <a
              href="https://www.instagram.com/fireplacerecordsdc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary font-bold tracking-wide hover:underline"
            >
              Open Instagram →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
