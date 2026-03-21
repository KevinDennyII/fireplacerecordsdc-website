import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

const emailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
});
type EmailFormData = z.infer<typeof emailSchema>;

function useAnimatedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  return { ref, isInView };
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Home() {
  const heroSection = useAnimatedSection();
  const eventsSection = useAnimatedSection();
  const aboutSection = useAnimatedSection();
  const visitSection = useAnimatedSection();
  const mailingSection = useAnimatedSection();

  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const onSubmit = async (data: EmailFormData) => {
    setFormStatus("loading");
    try {
      const res = await fetch(`${BASE_URL}/api/mailing-list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (res.ok) {
        setFormStatus("success");
        setFormMessage(json.message || "You're on the list!");
        reset();
      } else {
        setFormStatus("error");
        setFormMessage(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setFormStatus("error");
      setFormMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ─── NAV ─── */}
      <header className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-background/90 backdrop-blur-md">
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a href="#hero" className="font-display font-bold text-lg tracking-widest uppercase text-foreground hover:text-primary transition-colors">
            Fireplace Records
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide uppercase text-muted-foreground">
            <a href="#events" className="hover:text-foreground transition-colors">Events</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#visit" className="hover:text-foreground transition-colors">Visit</a>
            <a href="#mailing-list" className="bg-primary text-white px-4 py-2 rounded-sm hover:bg-primary/90 transition-colors">
              Stay Connected
            </a>
          </div>
          <a href="https://www.instagram.com/fireplacerecordsdc" target="_blank" rel="noopener noreferrer" className="md:hidden text-muted-foreground hover:text-foreground transition-colors text-sm">
            @fireplacerecordsdc
          </a>
        </nav>
      </header>

      {/* ─── HERO ─── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url('/images/vinyl-texture.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.3)",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-transparent to-background" />

        <motion.div
          ref={heroSection.ref}
          variants={stagger}
          initial="hidden"
          animate={heroSection.isInView ? "visible" : "hidden"}
          className="text-center px-6 max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-block bg-primary text-white text-xs font-bold tracking-[0.2em] uppercase px-4 py-1.5 mb-6">
              Now Open · Hyattsville, MD
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display text-[clamp(3rem,12vw,9rem)] font-bold leading-none tracking-tighter uppercase text-foreground text-glow mb-4"
          >
            Fireplace<br />Records
          </motion.h1>

          <motion.p variants={fadeUp} className="text-muted-foreground text-lg md:text-xl mb-10 max-w-xl mx-auto">
            Vinyl · Cassettes · CDs · DVDs · VHS<br />
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

      {/* ─── EVENTS ─── */}
      <section id="events" className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={eventsSection.ref}
            variants={stagger}
            initial="hidden"
            animate={eventsSection.isInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp} className="mb-16">
              <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Upcoming Events</span>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold uppercase leading-none mt-2">What's<br />Happening</h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* Grand Opening Card */}
              <motion.div variants={fadeUp} className="bg-card border border-border group hover:border-primary/50 transition-colors duration-300">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src="/grand-opening-flyer.png"
                    alt="Fireplace Records Grand Opening Weekend March 27-29"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block bg-primary text-white text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 mb-3">
                      Grand Opening
                    </span>
                    <h3 className="font-display text-3xl font-bold uppercase leading-tight">
                      Grand Opening<br />Weekend
                    </h3>
                    <p className="text-primary font-bold text-xl mt-1">March 27–29, 2026</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">Performances &amp; Sets By:</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["KAIMBR", "GRAP LUVA", "J SCIENIDE", "DJ RODDYROD", "CHOPPY CHOP-E", "SHAW CALHOUNE", "DJ DUB", "DC VINYL HEADZ"].map((name) => (
                      <span key={name} className="text-xs font-bold tracking-wider bg-muted px-3 py-1.5 uppercase">
                        {name}
                      </span>
                    ))}
                    <span className="text-xs font-bold tracking-wider text-primary uppercase">+ MORE!</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {["Discounts", "New Releases", "Mystery Boxes", "Games"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mt-4">5100 Baltimore Ave · Hyattsville, MD</p>
                </div>
              </motion.div>

              {/* 404 Day Card */}
              <motion.div variants={fadeUp} className="bg-card border border-border group hover:border-secondary/50 transition-colors duration-300">
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src="/404-day-flyer.png"
                    alt="Sound Doctors 404 Day Producer Showcase April 4th 2026"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block bg-secondary text-white text-xs font-bold tracking-[0.15em] uppercase px-3 py-1 mb-3">
                      Producer Showcase
                    </span>
                    <h3 className="font-display text-3xl font-bold uppercase leading-tight">
                      Sound Doctors<br />404 Day
                    </h3>
                    <p className="text-secondary font-bold text-xl mt-1">April 4th, 2026 · 8PM–12AM</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">Producer Lineup:</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["ODD SPESS", "GRUSSLE", "JOE E. BLESSED", "BLACKGALAGA", "JEPH EARLY", "EELXB", "DAWGZ"].map((name) => (
                      <span key={name} className="text-xs font-bold tracking-wider bg-muted px-3 py-1.5 uppercase">
                        {name}
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm">Fireplace Records · 5100 Baltimore Ave · Hyattsville, MD 20781</p>
                  <p className="text-muted-foreground text-sm mt-1">8PM – 12AM · All ages welcome</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-6 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={aboutSection.ref}
            variants={stagger}
            initial="hidden"
            animate={aboutSection.isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp}>
              <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">The Store</span>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold uppercase leading-none mt-2 mb-6">
                More Than<br />A Record Store
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Fireplace Records is Hyattsville's newest home for physical media. We're more than a store — we're a community space for music lovers, collectors, and the DMV's vibrant culture scene.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Owned and operated by DJ 2-Tone Jones, we stock a carefully curated selection of physical media across formats. Whether you're hunting for a rare pressing or just discovering the warmth of vinyl for the first time, you'll find it here.
              </p>
              <div className="grid grid-cols-5 gap-3">
                {["Vinyl", "Cassettes", "CDs", "DVDs", "VHS"].map((format) => (
                  <div key={format} className="border border-border bg-muted/30 p-3 text-center">
                    <span className="text-xs font-bold tracking-wider uppercase text-foreground/80">{format}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6">
              <div className="border border-border bg-card p-8">
                <div className="w-10 h-10 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold uppercase mb-2">Online Store — Coming Soon</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We're working on bringing our full inventory online so you can shop from anywhere. Sign up for our mailing list to be the first to know when we launch.
                </p>
                <a href="#mailing-list" className="mt-4 inline-block text-primary text-sm font-bold tracking-wide hover:underline">
                  Get notified →
                </a>
              </div>

              <div className="border border-border bg-card p-8">
                <div className="w-10 h-10 rounded-full border-2 border-secondary bg-secondary/10 flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold uppercase mb-2">Follow Us</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                  New inventory drops, events, and DMV culture. Follow us on Instagram.
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
          </motion.div>
        </div>
      </section>

      {/* ─── VISIT ─── */}
      <section id="visit" className="py-24 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            ref={visitSection.ref}
            variants={stagger}
            initial="hidden"
            animate={visitSection.isInView ? "visible" : "hidden"}
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
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Monday</span>
                        <span className="text-sm font-medium text-muted-foreground/60">Closed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Tuesday</span>
                        <span className="text-sm font-medium text-muted-foreground/60">Closed</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Wednesday</span>
                        <span className="text-sm font-medium text-muted-foreground/60">Closed</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-border pt-2 mt-2">
                        <span className="font-bold text-foreground text-sm">Thursday</span>
                        <span className="text-sm font-bold text-primary">12PM – 8PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground text-sm">Friday</span>
                        <span className="text-sm font-bold text-primary">12PM – 8PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground text-sm">Saturday</span>
                        <span className="text-sm font-bold text-primary">12PM – 8PM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-foreground text-sm">Sunday</span>
                        <span className="text-sm font-bold text-primary">12PM – 8PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-4">
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

      {/* ─── MAILING LIST ─── */}
      <section id="mailing-list" className="py-24 px-6 border-t border-border bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            ref={mailingSection.ref}
            variants={stagger}
            initial="hidden"
            animate={mailingSection.isInView ? "visible" : "hidden"}
          >
            <motion.div variants={fadeUp}>
              <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Stay in the Loop</span>
              <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold uppercase leading-none mt-2 mb-4">
                Join Our<br />Mailing List
              </h2>
              <p className="text-muted-foreground text-lg mb-10">
                Be the first to hear about new inventory drops, events, and exclusive deals. No spam — just the good stuff.
              </p>
            </motion.div>

            {formStatus === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border-2 border-primary bg-primary/10 p-10 text-center"
              >
                <div className="text-4xl mb-4">🔥</div>
                <h3 className="font-display text-2xl font-bold uppercase mb-2">You're on the list!</h3>
                <p className="text-muted-foreground">{formMessage}</p>
              </motion.div>
            ) : (
              <motion.form
                variants={fadeUp}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
                noValidate
              >
                <div className="text-left">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your name"
                    className="w-full bg-card border border-border px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors text-sm"
                    aria-label="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="text-left">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full bg-card border border-border px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors text-sm"
                    aria-label="Email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
                {formStatus === "error" && (
                  <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 px-4 py-2 text-left">
                    {formMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={formStatus === "loading"}
                  className="w-full bg-primary text-white font-bold text-sm tracking-widest uppercase py-4 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "loading" ? "Signing up..." : "Sign Me Up"}
                </button>
                <p className="text-xs text-muted-foreground/60 text-center">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </motion.form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-border py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="font-display font-bold text-base uppercase tracking-widest text-foreground">
            Fireplace Records
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
          © {new Date().getFullYear()} Fireplace Records. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
