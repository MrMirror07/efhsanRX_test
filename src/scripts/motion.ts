/**
 * Site wide motion. Small, dependency light, and off when the visitor prefers
 * reduced motion. GSAP handles the hero entrance and the number counters;
 * IntersectionObserver plus CSS handles scroll reveals so the page never
 * depends on JavaScript to be readable.
 */
import { gsap } from "gsap";

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("js");

// Header shadow after scrolling past the hero eyebrow.
const header = document.querySelector<HTMLElement>(".site-header");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 24);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Scroll reveals.
const targets = document.querySelectorAll<HTMLElement>("[data-reveal], [data-reveal-stagger]");
if (!reduced && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
  );
  targets.forEach((t) => io.observe(t));
  // Catch up: anything already at or above the fold gets revealed even when
  // the visitor jumped past it (anchor links, fast flings, keyboard End).
  let ticking = false;
  const catchUp = () => {
    ticking = false;
    const limit = window.innerHeight * 0.92;
    targets.forEach((t) => {
      if (!t.classList.contains("is-in") && t.getBoundingClientRect().top < limit) {
        t.classList.add("is-in");
        io.unobserve(t);
      }
    });
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(catchUp);
      }
    },
    { passive: true },
  );
  window.addEventListener("load", catchUp);
  setTimeout(catchUp, 250);
} else {
  targets.forEach((t) => t.classList.add("is-in"));
}

// Number counters: <span data-count="228" data-decimals="0">228</span>
const counters = document.querySelectorAll<HTMLElement>("[data-count]");
if (!reduced && counters.length) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target as HTMLElement;
      io.unobserve(el);
      const end = parseFloat(el.dataset.count ?? "0");
      const decimals = parseInt(el.dataset.decimals ?? "0", 10);
      const suffix = el.dataset.suffix ?? "";
      const obj = { v: 0 };
      gsap.to(obj, {
        v: end,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = obj.v.toFixed(decimals) + suffix;
        },
      });
    }
  }, { threshold: 0.5 });
  counters.forEach((c) => io.observe(c));
}

// Hero entrance: lines of the headline rise in sequence, then the media.
const hero = document.querySelector<HTMLElement>("[data-hero]");
if (hero && !reduced) {
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.from(hero.querySelectorAll("[data-hero-line]"), { y: 40, opacity: 0, duration: 1.1, stagger: 0.12 }, 0)
    .from(hero.querySelectorAll("[data-hero-fade]"), { y: 16, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.35)
    .from(hero.querySelectorAll("[data-hero-media]"), { scale: 0.96, opacity: 0, duration: 1.2 }, 0.2)
    .from(hero.querySelectorAll("[data-hero-float]"), { y: 24, opacity: 0, duration: 0.9, stagger: 0.15 }, 0.8);

  // Gentle parallax on the hero media while scrolling the first screen.
  const media = hero.querySelector<HTMLElement>("[data-hero-media]");
  if (media) {
    window.addEventListener(
      "scroll",
      () => {
        const y = Math.min(window.scrollY, 700);
        media.style.transform = `translateY(${y * 0.08}px)`;
      },
      { passive: true },
    );
  }
}

// Magnetic hover on primary buttons (desktop, fine pointers only).
if (!reduced && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll<HTMLElement>(".btn-accent, .btn-primary").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.18;
      const y = (e.clientY - r.top - r.height / 2) * 0.28;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

// Cursor spotlight on cards: a soft highlight follows the pointer.
if (!reduced && window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll<HTMLElement>("[data-spotlight]").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });
}
