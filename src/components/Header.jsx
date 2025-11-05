// components/Header.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { motion, useScroll, useTransform } from "motion/react";

const NAV = [
  { name: "About", href: "#about", id: "about" },
  { name: "Services", href: "#services", id: "services" },
  { name: "Testimonials", href: "#testimonials", id: "testimonials" },
  { name: "FAQs", href: "#faqs", id: "faqs" }, // fixed to match App
  { name: "Contact", href: "#contact", id: "contact" },
];

export default function Header() {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [8, 20]);
  const backdrop = useTransform(blur, (v) => `blur(${v}px)`);
  const background = useTransform(opacity, (v) => `rgba(250, 250, 250, ${v})`);
  const [hasShadow, setHasShadow] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setHasShadow(v > 4));
    return () => unsub();
  }, [scrollY]);

  // Scroll spy
  useEffect(() => {
    const ids = NAV.map((n) => n.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Smooth close on mobile after click
  const onNavClick = (href) => () => {
    if (mobileOpen) setMobileOpen(false);
    // allow default anchor to handle scroll (with CSS smooth scroll)
  };

  return (
    <motion.header
      style={{ backdropFilter: backdrop, backgroundColor: background }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 ${
        hasShadow ? "shadow-[0_8px_30px_rgba(0,0,0,0.06)]" : ""
      }`}
      role="banner"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          {/* Brand */}
          <a
            href="#top"
            className="flex items-center group"
            aria-label="Go to top"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
              className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-gray-900 to-gray-600 rounded-full flex items-center justify-center mr-3"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl md:text-2xl tracking-tight text-gradient leading-none">
                Dr. Alia Misbah
              </h1>
              <span className="text-[10px] md:text-xs text-gray-500 font-semibold tracking-widest uppercase">
                Physical Therapy
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center space-x-8 lg:space-x-12"
            aria-label="Primary"
          >
            {NAV.map((item, i) => {
              const isActive = active === item.id;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
                  className="relative group"
                >
                  <a
                    href={item.href}
                    onClick={onNavClick(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-[15px] font-semibold transition-colors duration-300 ${
                      isActive ? "text-black" : "text-gray-600 hover:text-black"
                    }`}
                  >
                    {item.name}
                    <span
                      className={`block h-[2px] rounded-full mt-1 transition-all duration-300 ${
                        isActive
                          ? "w-full bg-gray-900"
                          : "w-0 group-hover:w-full bg-gray-600/60"
                      }`}
                    />
                  </a>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
            >
              <Button
                className="glass-strong hover:bg-gray-900 text-white  px-6 py-2.5 rounded-full transition-all duration-300 border-0"
                asChild
              >
                <a href="https://calendly.com/aaliakhan2255/30min?month=2025-11" target="_blank" className="flex items-center">
                  <span className="font-semibold">Book Consultation</span>
                  <motion.span
                    className="ml-2 inline-block w-1.5 h-1.5 bg-current rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    aria-hidden="true"
                  />
                </a>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile nav */}
          <div className="md:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass rounded-full"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="glass-strong border-white/20">
                <nav
                  className="flex flex-col space-y-7 mt-16 px-2.5"
                  aria-label="Mobile"
                >
                  {NAV.map((item, index) => {
                    const isActive = active === item.id;
                    return (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={onNavClick(item.href)}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.07, duration: 0.35 }}
                        className={`text-xl font-semibold transition-colors underline-offset-4 ${
                          isActive
                            ? "text-gray-900 underline"
                            : "text-gray-700 hover:text-gray-900 hover:underline"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.name}
                      </motion.a>
                    );
                  })}
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.35 }}
                  >
                    <Button
                      className="bg-gray-900 hover:bg-gray-800 text-white w-full mt-8 rounded-full py-4"
                      asChild
                    >
                      <a href="#booking" onClick={() => setMobileOpen(false)}>
                        Book Consultation
                      </a>
                    </Button>
                  </motion.div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
