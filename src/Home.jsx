// src/App.jsx
import React, { useEffect, useMemo } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
  useMotionValue,
} from "motion/react";

import Header from "./components/Header";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TrustResults from "./components/TrustResults";
import FAQ from "./components/FAQ";

/* ----------------- Small helpers ----------------- */

function AnimatedBackground() {
  const reduce = useReducedMotion();

  // Detect mobile once; used to lighten effects
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" && matchMedia("(max-width: 640px)").matches,
    []
  );

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      {/* soft base gradient always on */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />

      {reduce ? (
        <div className="absolute inset-0" />
      ) : (
        <>
          {/* animated radial wash – keep even on mobile, but very light */}
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(120,119,198,0.03) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(120,119,198,0.03) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 40%, rgba(120,119,198,0.03) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: isMobile ? 12 : 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0"
            style={{ filter: isMobile ? "opacity(0.6)" : "opacity(1)" }}
          />

          {/* decorative shapes – hide on mobile to avoid clutter / jank */}
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.06, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-gray-200/30 rounded-full hidden sm:block"
          />
          <motion.div
            animate={{ rotate: [360, 0], scale: [1, 0.94, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-gray-200/20 rounded-lg hidden sm:block"
          />
          <div className="absolute inset-0 hidden sm:block">
            <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-gray-300/20 rounded-full" />
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-300/30 rounded-full" />
            <div className="absolute top-2/3 left-2/3 w-1.5 h-1.5 bg-gray-300/25 rounded-full" />
            <div className="absolute top-1/4 right-1/3 w-1 h-1 bg-gray-300/20 rounded-full" />
          </div>
        </>
      )}
    </div>
  );
}

function MouseFollower() {
  const reduce = useReducedMotion();
  const hasFinePointer = useMemo(
    () =>
      typeof window !== "undefined" && matchMedia("(pointer: fine)").matches,
    []
  );
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    if (!hasFinePointer || reduce) return;
    let raf;
    const handle = (e) => {
      raf = requestAnimationFrame(() => {
        x.set(e.clientX - 12);
        y.set(e.clientY - 12);
      });
    };
    window.addEventListener("mousemove", handle);
    return () => {
      window.removeEventListener("mousemove", handle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [hasFinePointer, reduce, x, y]);

  if (!hasFinePointer || reduce) return null;

  return (
    <motion.div
      className="fixed w-6 h-6 pointer-events-none z-40 mix-blend-difference"
      style={{ x, y }}
      aria-hidden="true"
    >
      <div className="w-full h-full bg-white rounded-full opacity-80" />
    </motion.div>
  );
}

/* ----------------- App ----------------- */

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const reduce = useReducedMotion();
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" && matchMedia("(max-width: 640px)").matches,
    []
  );

  // Softer durations for mobile/reduced motion
  const dur = reduce ? 0.0 : isMobile ? 0.55 : 0.9;
  const ease = [0.25, 0.46, 0.45, 0.94];

  return (
    <div id="top" className="min-h-dvh relative overflow-hidden">
      <AnimatedBackground />
      <MouseFollower />

      {/* Top progress bar (kept above content, below header if header is solid) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-900 to-transparent origin-left z-40"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <Header />

      {/* Offset for fixed header + safe-area so first section isn’t hidden */}
      <main
        id="main"
        className="relative pt-[calc(var(--header-h)+var(--safe-top))] scroll-smooth"
      >
        {/* Hero */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.985 }}
          animate={reduce ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: dur, ease }}
          className="transform-gpu will-change-transform"
        >
          <Hero />
        </motion.div>

        {/* Credibility - Trust & Results */}
        <section
          id="about"
          aria-label="About section"
          className="scroll-mt-[var(--header-h)]"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: dur * 0.9, ease }}
            viewport={{
              once: true,
              amount: isMobile ? 0.15 : 0.25,
              margin: isMobile ? "-40px" : "-100px",
            }}
            className="transform-gpu will-change-transform"
          >
            <TrustResults />
          </motion.div>
        </section>

        {/* Services */}
        <section
          id="services"
          aria-label="Services section"
          className="scroll-mt-[var(--header-h)]"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 60 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: dur, ease, delay: 0.04 }}
            viewport={{ once: true, amount: isMobile ? 0.15 : 0.2 }}
            className="transform-gpu will-change-transform"
          >
            <Services />
          </motion.div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          aria-label="Testimonials section"
          className="scroll-mt-[var(--header-h)]"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, x: isMobile ? 0 : -60 }}
            whileInView={reduce ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: dur, ease, delay: 0.04 }}
            viewport={{ once: true, amount: isMobile ? 0.15 : 0.2 }}
            className="transform-gpu will-change-transform"
          >
            <Testimonials />
          </motion.div>
        </section>

        {/* Booking */}

        {/* FAQ */}
        <section
          id="faqs"
          aria-label="Frequently Asked Questions"
          className="scroll-mt-[var(--header-h)]"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: dur * 0.9, ease, delay: 0.03 }}
            viewport={{
              once: true,
              amount: isMobile ? 0.15 : 0.25,
              margin: isMobile ? "-40px" : "-100px",
            }}
            className="transform-gpu will-change-transform"
          >
            <FAQ />
          </motion.div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          aria-label="Contact section"
          className="scroll-mt-[var(--header-h)]"
        >
          <motion.div
            initial={
              reduce
                ? false
                : {
                    opacity: 0,
                    scale: isMobile ? 1 : 0.96,
                    filter: "blur(6px)",
                  }
            }
            whileInView={
              reduce ? {} : { opacity: 1, scale: 1, filter: "blur(0px)" }
            }
            transition={{ duration: dur * 1.1, ease }}
            viewport={{ once: true, amount: isMobile ? 0.15 : 0.2 }}
            className="transform-gpu will-change-transform"
          >
            <Contact />
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30 }}
        whileInView={reduce ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: dur * 0.8, ease }}
        viewport={{ once: true, amount: 0.2 }}
        className="transform-gpu will-change-transform"
      >
        <Footer />
      </motion.div>
    </div>
  );
}
