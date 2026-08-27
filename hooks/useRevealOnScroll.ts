"use client";

import { useEffect, useRef, useState } from "react";

/**
 * One-shot reveal: flips to true the first time the element enters the
 * viewport, then stops observing. Used to drive a clip-path scroll reveal.
 */
export function useRevealOnScroll<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, revealed };
}
