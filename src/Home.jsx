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
import Booking from "./components/Booking";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import TrustResults from "./components/TrustResults";
import FAQ from "./components/FAQ";

/* ----------------- Small helpers ----------------- */

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] rounded-md bg-gray-900 px-4 py-2 text-white shadow"
    >
      Skip to content
    </a>
  );
}

function AnimatedBackground() {
  const reduce = useReducedMotion();
  return (
    <div className="fixed inset-0 -z-50">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      {reduce ? (
        <div className="absolute inset-0" />
      ) : (
        <>
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.03) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(120, 119, 198, 0.03) 0%, transparent 50%)",
                "radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.03) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          />
          <motion.div
            animate={{ rotate: [0, 360], scale: [1, 1.08, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/4 left-1/4 w-32 h-32 border border-gray-200/30 rounded-full"
          />
          <motion.div
            animate={{ rotate: [360, 0], scale: [1, 0.92, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-gray-200/20 rounded-lg"
          />
          <div className="absolute inset-0">
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

  return (
    <div id="top" className="min-h-screen relative overflow-hidden">
      <SkipLink />
      <AnimatedBackground />
      <MouseFollower />

      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gray-900 to-transparent origin-left z-50"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <Header />

      <main id="main" className="relative">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Hero />
        </motion.div>

        {/* Credibility - Trust & Results */}
        <section id="about" aria-label="About section">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <TrustResults />
          </motion.div>
        </section>

        {/* Services */}
        <section id="services" aria-label="Services section">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.05,
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Services />
          </motion.div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" aria-label="Testimonials section">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.05,
            }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Testimonials />
          </motion.div>
        </section>

        {/* Booking */}
        <section id="booking" aria-label="Booking section">
          <motion.div
            initial={{ opacity: 0, y: 80, rotateX: 8 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
            className="perspective-1000"
          >
            <Booking />
          </motion.div>
        </section>

        {/* FAQ */}
        <section id="faqs" aria-label="Frequently Asked Questions">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <FAQ />
          </motion.div>
        </section>

        {/* Contact */}
        <section id="contact" aria-label="Contact section">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Contact />
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
