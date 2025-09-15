// Header.jsx
import React from "react";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Header() {
  const navigation = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Contact", href: "#contact" },
  ];

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 0.95]);
  const headerBlurPx = useTransform(scrollY, [0, 100], [8, 20]);

  // Convert motion values to CSS strings
  const backdrop = useTransform(headerBlurPx, (v) => `blur(${v}px)`);
  const background = useTransform(
    headerOpacity,
    (v) => `rgba(250, 250, 250, ${v})`
  );

  return (
    <motion.header
      style={{
        backdropFilter: backdrop,
        backgroundColor: background,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      className="fixed top-0 left-0 right-0 border-b border-white/20 z-50 glass"
    >
      <div className="container mx-auto px-8">
        <div className="flex justify-between items-center h-24">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="flex items-center group cursor-pointer"
          >
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }}
              className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-600 rounded-full flex items-center justify-center mr-4"
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl tracking-tight text-gradient">
                Dr. Alia Misbah
              </h1>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xs text-gray-500 font-light tracking-widest uppercase"
              >
                Physical Therapy
              </motion.span>
            </div>
          </motion.div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                className="relative group"
              >
                <a
                  href={item.href}
                  className="text-sm font-light text-gray-600 hover:text-gray-900 transition-all duration-500 relative overflow-hidden"
                >
                  {item.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-gray-900 to-gray-600"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </a>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.8,
                duration: 0.6,
                ease: [0.68, -0.55, 0.265, 1.55],
              }}
            >
              <Button
                className="glass-strong hover:bg-gray-900 hover:text-white text-gray-900 px-8 py-3 rounded-full transition-all duration-500 border-0 glow-on-hover group"
                asChild
              >
                <a href="#booking" className="flex items-center">
                  <span className="text-white">Book Consultation</span>
                  <motion.div
                    className="ml-2 w-1 h-1 bg-current rounded-full"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </a>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
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
                <nav className="flex flex-col space-y-8 mt-16">
                  {navigation.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="text-xl font-light text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </motion.a>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <Button
                      className="bg-gray-900 hover:bg-gray-800 text-white w-full mt-8 rounded-full py-4"
                      asChild
                    >
                      <a href="#booking">Book Consultation</a>
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
