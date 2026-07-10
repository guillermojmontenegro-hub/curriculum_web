"use client";

import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;

    root.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    const registerReveal = (element: HTMLElement) => {
      if (!element.classList.contains("is-visible")) {
        observer.observe(element);
      }
    };

    document
      .querySelectorAll<HTMLElement>(".reveal")
      .forEach(registerReveal);

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) {
            return;
          }

          if (node.matches(".reveal")) {
            registerReveal(node);
          }

          node
            .querySelectorAll<HTMLElement>(".reveal")
            .forEach(registerReveal);
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    const syncScrollState = () => {
      root.classList.toggle("has-scrolled", window.scrollY > 20);
    };

    syncScrollState();
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("scroll", syncScrollState);
      root.classList.remove("motion-ready", "has-scrolled");
    };
  }, []);

  return null;
}
