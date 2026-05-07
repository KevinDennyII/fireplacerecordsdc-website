import { EASE_OUT_EXPO } from "@/content/siteContent";

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
} as const;

export const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
} as const;
