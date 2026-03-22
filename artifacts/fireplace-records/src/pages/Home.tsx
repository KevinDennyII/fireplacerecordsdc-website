import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubscribeMailingList } from "@workspace/api-client-react";
import type { SubscribeMailingListMutationError } from "@workspace/api-client-react";
import imgInterior1 from "@assets/interior-1-scaled_1774151838219.png";
import imgInterior2 from "@assets/interior-2-scaled_1774151838221.png";
import imgInterior3 from "@assets/interior-3-scaled_1774151838222.png";
import imgDjTwoToneJones from "@assets/DJ-2-Tone-Jones-scaled_1774151838225.png";
import imgAnthonyMims from "@assets/Anthony-Mims-scaled_1774151838226.png";
import imgBlackWilson from "@assets/Black-Wilson-scaled_1774151838227.png";
import imgExterior from "@assets/exterior-2-scaled_1774151838231.png";

const emailSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
});
type EmailFormData = z.infer<typeof emailSchema>;

function useAnimatedSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  return { ref, isInView };
}

const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
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

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const subscribe = useSubscribeMailingList({
    mutation: {
      onSuccess: () => { reset(); },
    },
  });

  const onSubmit = (formData: EmailFormData) => {
    subscribe.mutate({ data: { email: formData.email, name: formData.name || undefined } });
  };

  const formStatus = subscribe.status === "pending"
    ? "loading"
    : subscribe.status === "success"
    ? "success"
    : subscribe.status === "error"
    ? "error"
    : "idle";

  const apiError = subscribe.error as SubscribeMailingListMutationError | null;

  const formMessage = subscribe.status === "success"
    ? (subscribe.data?.message ?? "You're on the list!")
    : subscribe.status === "error"
    ? (apiError?.data?.message ?? "Something went wrong. Please try again.")
    : "";

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
      <section id="hero" className="relative isolate min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
        <img
          src={imgInterior3}
          alt="Inside Fireplace Records — walls lined with vinyl"
          className="absolute inset-0 -z-10 w-full h-full object-cover object-center brightness-50"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/20 to-background" />

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
                    {["Vinyl", "CDs", "VHS", "Comics", "Magazines", "Rare Media"].map((format) => (
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
                    {[
                      {
                        name: "DJ 2-Tone Jones",
                        role: "Co-creator of Shaolin Jazz · US Ambassador of Hip Hop",
                        href: "https://www.instagram.com/dj2tonejones/",
                        handle: "@dj2tonejones",
                        photo: imgDjTwoToneJones,
                        photoAlt: "DJ 2-Tone Jones standing in Fireplace Records",
                      },
                      {
                        name: "Anthony Mims",
                        role: "Philadelphia native · Hyattsville resident",
                        href: null as string | null,
                        handle: null as string | null,
                        photo: imgAnthonyMims,
                        photoAlt: "Anthony Mims co-founder of Fireplace Records",
                      },
                      {
                        name: "Black Wilson",
                        role: "Native Washingtonian · community-first",
                        href: null as string | null,
                        handle: null as string | null,
                        photo: imgBlackWilson,
                        photoAlt: "Black Wilson co-founder of Fireplace Records",
                      },
                      {
                        name: "DJ Iran",
                        role: "WHUR radio · Howard University · DMV vinyl veteran",
                        href: "https://www.instagram.com/dj_iran/",
                        handle: "@dj_iran",
                        photo: null as string | null,
                        photoAlt: null as string | null,
                      },
                    ].map(({ name, role, href, handle, photo, photoAlt }) => (
                      <div key={name} className="group">
                        <div className="aspect-square overflow-hidden bg-muted mb-3">
                          {photo ? (
                            <img
                              src={photo}
                              alt={photoAlt ?? name}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
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
                          {handle && (
                            <a href={href!} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold tracking-wide hover:underline mt-1 block">
                              {handle} ↗
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-border bg-card p-8">
                  <h3 className="font-display text-xl font-bold uppercase mb-3">How We Grade Records</h3>
                  <p className="text-muted-foreground text-sm mb-5">Every vinyl is hand-labeled so you know exactly what you're getting.</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { grade: "NM", label: "Near Mint" },
                      { grade: "EX", label: "Excellent" },
                      { grade: "VG+", label: "Very Good+" },
                    ].map(({ grade, label }) => (
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

            {/* Interior photo gallery */}
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-3 gap-3">
              {[
                { src: imgInterior1, alt: "Listening station, turntable, and album covers at Fireplace Records" },
                { src: imgInterior2, alt: "Crates of records and cassettes at Fireplace Records" },
                { src: imgInterior3, alt: "Wide view of Fireplace Records interior with orange walls" },
              ].map(({ src, alt }) => (
                <div key={alt} className="aspect-square overflow-hidden">
                  <img src={src} alt={alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
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
                <div className="overflow-hidden">
                  <img
                    src={imgExterior}
                    alt="Fireplace Records neon 'records' sign in the store window"
                    className="w-full aspect-square object-cover object-center hover:scale-105 transition-transform duration-500"
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
                    placeholder="Your name (optional)"
                    className="w-full bg-card border border-border px-4 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors text-sm"
                    aria-label="Your name (optional)"
                  />
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
