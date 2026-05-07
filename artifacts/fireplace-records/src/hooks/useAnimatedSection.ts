import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { IN_VIEW_MARGIN } from "@/content/siteContent";

export function useAnimatedSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: IN_VIEW_MARGIN });

  if (shouldReduceMotion) {
    return { ref, initial: "visible" as const, animate: "visible" as const };
  }

  return {
    ref,
    initial: "hidden" as const,
    animate: isInView ? ("visible" as const) : ("hidden" as const),
  };
}
