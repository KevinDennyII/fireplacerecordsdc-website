import { motion } from "framer-motion";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { fadeUp, stagger } from "@/motion/variants";
import { EVENTS_NOTES } from "@/content/siteContent";

export function EventsSection() {
  const eventsSection = useAnimatedSection();

  return (
    <section id="events" className="py-16 px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={eventsSection.ref}
          variants={stagger}
          initial={eventsSection.initial}
          animate={eventsSection.animate}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Upcoming Events</span>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-none mt-2">What's<br />Happening</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-card border border-border p-8 md:p-10">
              <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 mb-5">
                Event updates
              </span>
              <h3 className="font-display text-3xl font-bold uppercase leading-tight mb-4">
                New events are announced as they are confirmed
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We are currently not publishing a fixed long-term lineup on the website.
                For the latest sessions, showcases, and special pop-ups, follow our Instagram updates.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {EVENTS_NOTES.map((note) => (
                  <li key={note} className="border-l-2 border-primary/60 pl-3">
                    {note}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card border border-border p-8 md:p-10">
              <h3 className="font-display text-2xl font-bold uppercase mb-4">
                Where to check first
              </h3>
              <div className="space-y-4">
                <a
                  href="https://www.instagram.com/fireplacerecordsdc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-border bg-muted/30 px-4 py-3 hover:border-secondary/60 transition-colors"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-1">Instagram</p>
                  <p className="font-bold text-foreground">@fireplacerecordsdc</p>
                </a>
                <a
                  href="https://www.instagram.com/fireplacerecordsdc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-border bg-muted/30 px-4 py-3 hover:border-primary/60 transition-colors"
                >
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-1">Updates</p>
                  <p className="font-bold text-foreground">Follow us for new event posts</p>
                </a>
                <div className="border border-border bg-muted/20 px-4 py-3">
                  <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-1">Location</p>
                  <p className="text-sm text-foreground">5100 Baltimore Ave, Hyattsville, MD 20781</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
