// src/components/Footer.jsx
import React, { useEffect, useState } from "react";
import { Heart, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  // Back-to-top visibility
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const serviceLinks = [
    { label: "Musculoskeletal Disorders", href: "#services" },
    { label: "Stroke Rehabilitation", href: "#services" },
    { label: "Post-Surgical Recovery", href: "#services" },
    { label: "Women's Health Physiotherapy", href: "#services" },
    { label: "Online Consultations", href: "#services" },
    { label: "Home Visits", href: "#services" },
  ];

  return (
    <footer className="bg-gray-900 text-white relative">
      <div className="container mx-auto px-6 py-16">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-16"
        >
          <Heart className="w-6 h-6 text-red-400" aria-hidden="true" />
          <span className="text-xl text-gray-300 font-light">
            Dedicated to transforming lives through movement
          </span>
        </motion.div>

        {/* Main */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 mb-16"
        >
          {/* Practice info */}
          <section aria-labelledby="practice-heading" className="space-y-4">
            <h3 id="practice-heading" className="text-3xl tracking-tight text-white">
              Dr. Alia Misbah{" "}
              <span className="text-xl text-gray-400 font-light block md:inline">
                — Doctor of Physical Therapy
              </span>
            </h3>
            <p className="text-gray-300 font-light leading-relaxed text-base">
              Compassionate, evidence-based physiotherapy for musculoskeletal disorders, stroke
              rehabilitation, post-surgical recovery, and women’s health — serving communities with
              skill and heart.
            </p>

            {/* Quick actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#booking"
                className="rounded-full px-4 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
              >
                Book consultation
              </a>
              <a
                href="#contact"
                className="rounded-full px-4 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
              >
                Contact
              </a>
              <a
                href="#about"
                className="rounded-full px-4 py-2 text-sm bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
              >
                About
              </a>
            </div>
          </section>

          {/* Services */}
          <nav aria-labelledby="services-heading">
            <h4 id="services-heading" className="text-xl mb-6 text-white">
              Services
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-gray-300">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <a className="hover:text-white transition-colors" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-xs text-gray-400">
              Licensed Physical Therapist · Evidence-Based Care · Community Focused
            </p>
            <p className="text-sm text-gray-400">© {year} Dr. Alia Misbah. All rights reserved.</p>
            <p className="text-xs text-gray-400 italic">
              “Your recovery is in safe hands with personalized treatment and compassionate care.”
            </p>
          </div>
        </motion.div>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={scrollTop}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            aria-label="Back to top"
            className="fixed bottom-6 right-6 z-50 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 p-3 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
