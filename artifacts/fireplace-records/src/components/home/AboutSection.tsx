import { motion } from "framer-motion";
import { useAnimatedSection } from "@/hooks/useAnimatedSection";
import { fadeUp, stagger } from "@/motion/variants";
import { CARRIED_FORMATS, FOUNDERS, RECORD_GRADES } from "@/content/siteContent";
import imgInterior1 from "@assets/interior-1-web.webp";
import imgInterior2 from "@assets/interior-2-web.webp";
import imgInterior3 from "@assets/interior-3-web.webp";
import imgDjTwoToneJones from "@assets/dj-2-tone-jones-web.webp";
import imgAnthonyMims from "@assets/anthony-mims-web.webp";
import imgBlackWilson from "@assets/black-wilson-web.webp";

const FOUNDER_PHOTOS = {
  dj2tone: imgDjTwoToneJones,
  anthony: imgAnthonyMims,
  black: imgBlackWilson,
} as const;

const INTERIOR_PHOTOS = [
  { src: imgInterior1, alt: "Listening station, turntable, and album covers at Fireplace Records" },
  { src: imgInterior2, alt: "Crates of records and cassettes at Fireplace Records" },
  { src: imgInterior3, alt: "Wide view of Fireplace Records interior with orange walls" },
] as const;

export function AboutSection() {
  const aboutSection = useAnimatedSection();

  return (
    <section id="about" className="py-24 px-6 border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={aboutSection.ref}
          variants={stagger}
          initial={aboutSection.initial}
          animate={aboutSection.animate}
        >
          <motion.div variants={fadeUp} className="mb-16">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">The Story</span>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-none mt-2">
              Born from<br />the Crate
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div variants={fadeUp} className="space-y-6">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Fireplace Records wasn't built overnight. For more than a decade, four DJs and lifelong vinyl collectors —{" "}
                <a href="https://www.instagram.com/dj2tonejones/" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-primary transition-colors underline underline-offset-2">DJ 2-Tone Jones</a>,{" "}
                <span className="text-foreground font-semibold">Anthony Mims</span>,{" "}
                <span className="text-foreground font-semibold">Black Wilson</span>, and{" "}
                <a href="https://www.instagram.com/dj_iran/" target="_blank" rel="noopener noreferrer" className="text-foreground font-semibold hover:text-primary transition-colors underline underline-offset-2">DJ Iran</a>{" "}
                — hauled crates to farmers markets across the DMV.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Since 2021, they anchored the monthly Crate Convention at DC's Anacostia Arts Center. Their combined expertise and shared love for the culture made opening a permanent storefront feel inevitable. They pooled their resources and got it done.
              </p>

              <blockquote className="border-l-2 border-primary pl-6 py-1 my-6">
                <p className="text-foreground italic leading-relaxed">
                  "Letting the other generations hear what we listened to is a good thing, and it keeps the good music coming."
                </p>
                <cite className="text-primary text-xs font-bold tracking-[0.15em] uppercase mt-3 block not-italic">— Anthony Mims, Co-founder</cite>
              </blockquote>

              <p className="text-muted-foreground leading-relaxed">
                DJ 2-Tone Jones envisions Fireplace Records as a lasting neighborhood hub — a place to "reintroduce that culture of a traditional record shop, where people come weekly to find community, have a hangout space, and explore music." Whether you're a seasoned collector, a producer, or a sample stalker, you belong here.
              </p>

              <div className="pt-2">
                <h3 className="text-muted-foreground text-xs font-bold tracking-[0.15em] uppercase mb-3">What We Carry</h3>
                <div className="grid grid-cols-3 gap-2">
                  {CARRIED_FORMATS.map((format) => (
                    <div key={format} className="border border-border bg-muted/30 p-3 text-center">
                      <span className="text-xs font-bold tracking-wider uppercase text-foreground/80">{format}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-muted-foreground text-xs font-bold tracking-[0.15em] uppercase mb-2">Genres</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Hip-Hop · R&B · Jazz · Gospel · Rock · Funk · Reggae · Pop — and everything in between.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-5">
              <div>
                <h3 className="font-display text-xl font-bold uppercase mb-5">The Four Founders</h3>
                <div className="grid grid-cols-2 gap-4">
                  {FOUNDERS.map(({ key, name, role, href, handle, photoKey, photoAlt }) => {
                    const photoSrc = photoKey ? FOUNDER_PHOTOS[photoKey] : null;
                    return (
                      <div key={key} className="group">
                        <div className="aspect-square overflow-hidden bg-muted mb-3">
                          {photoSrc ? (
                            <img
                              src={photoSrc}
                              alt={photoAlt ?? name}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted border border-border">
                              <span className="font-display text-4xl text-muted-foreground/30 font-bold uppercase">DJ</span>
                            </div>
                          )}
                        </div>
                        <div>
                          {href ? (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-sm text-foreground hover:text-primary transition-colors">
                              {name}
                            </a>
                          ) : (
                            <span className="font-bold text-sm text-foreground">{name}</span>
                          )}
                          <p className="text-muted-foreground text-xs mt-0.5 leading-snug">{role}</p>
                          {handle && href && (
                            <a href={href} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold tracking-wide hover:underline mt-1 block">
                              {handle} ↗
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border border-border bg-card p-8">
                <h3 className="font-display text-xl font-bold uppercase mb-3">How We Grade Records</h3>
                <p className="text-muted-foreground text-sm mb-5">Every vinyl is hand-labeled so you know exactly what you're getting.</p>
                <div className="grid grid-cols-3 gap-3">
                  {RECORD_GRADES.map(({ grade, label }) => (
                    <div key={grade} className="bg-muted/30 border border-border p-3 text-center">
                      <span className="font-display font-bold text-xl text-primary block">{grade}</span>
                      <span className="text-xs text-muted-foreground mt-1 block">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card p-6">
                <h3 className="font-display text-xl font-bold uppercase mb-2">Follow Us</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  New inventory drops, events, and DMV culture on Instagram.
                </p>
                <a
                  href="https://www.instagram.com/fireplacerecordsdc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary font-bold tracking-wide hover:underline text-sm"
                >
                  @fireplacerecordsdc →
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-3">
            {INTERIOR_PHOTOS.map(({ src, alt }) => (
              <div key={alt} className="aspect-square overflow-hidden">
                <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
