// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Zap, Globe } from "lucide-react";
import { Button } from "./ui/button"; // shadcn/ui button generated locally
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import hero_img_one from "../../public/hero_image_one.png";
import hero_img_two from "../../public/hero_img_two.png";
// Unsplash medical images
const LEFT_IMAGE = hero_img_one;
const RIGHT_IMAGE = hero_img_two;

// Reliable map (fixes the undefined leftImage/rightImage issue)
const RELIABLE_IMAGES = {
  doctor1: LEFT_IMAGE,
  doctor2: RIGHT_IMAGE,
};

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const [isHovered, setIsHovered] = useState(false);
  const [isRightImageHovered, setIsRightImageHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for overlay zoom scale
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const zoomScale = isMobile ? 3 : 5;

  /** @param {'doctor1'|'doctor2'} key */
  const getImageSource = (key) => RELIABLE_IMAGES[key];

  const handleImageClick = () => {};
  const handleImageHover = () => setIsHovered(true);
  const handleImageLeave = () => setIsHovered(false);
  const handleRightImageHover = () => setIsRightImageHovered(true);
  const handleRightImageLeave = () => setIsRightImageHovered(false);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24">
      {/* Background blobs */}
      <motion.div style={{ y: y2 }} className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-8 relative">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            style={{ y: y1, opacity }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-12 [perspective:1000px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-8"
            >
              {/* Status pill */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 0.6,
                  ease: [0.68, -0.55, 0.265, 1.55],
                }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 backdrop-blur-md bg-white/30"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-sm  tracking-wide font-semibold">
                  Available for consultations
                </span>
              </motion.div>

              {/* Title + side images */}
              <div className="space-y-6 relative">
                <motion.h1
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-semibold relative"
                >
                  <div className="relative flex items-center justify-center gap-4 sm:gap-8 lg:gap-16  w-full max-w-6xl mx-auto">
                    {/* Left image */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20, rotate: 3 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          rotate: 0,
                          y: [0, -12, 0],
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                          y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                          },
                        }}
                        className="w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28 xl:w-28 xl:h-32 rounded-xl border border-white/20 shadow-lg overflow-hidden cursor-pointer relative bg-gray-200"
                        onClick={handleImageClick}
                        onHoverStart={handleImageHover}
                        onHoverEnd={handleImageLeave}
                      >
                        <motion.img
                          src={"/public/hero_image_one.png"}
                          alt="Physiotherapist at clinic"
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) =>
                            (e.currentTarget.src = RELIABLE_IMAGES.doctor1)
                          }
                        />
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors grid place-items-center opacity-0 hover:opacity-100">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-md rounded-full grid place-items-center">
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Center text */}
                    <motion.span
                      className="block leading-40 text-center [background-clip:text] text-transparent bg-[linear-gradient(90deg,#111,#777,#111)] "
                      whileInView={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      Healing
                    </motion.span>

                    {/* Right image */}
                    <div className="flex items-center gap-2 sm:gap-4">
                      <motion.div
                        initial={{ opacity: 0, x: 30, rotate: 5 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          rotate: 0,
                          y: [0, -15, 0],
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                          y: {
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1,
                          },
                        }}
                        className="w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28 xl:w-28 xl:h-32 rounded-2xl overflow-hidden border border-white/20 shadow-lg cursor-pointer bg-gray-200"
                        onHoverStart={handleRightImageHover}
                        onHoverEnd={handleRightImageLeave}
                      >
                        <motion.img
                          src={getImageSource("doctor2")}
                          alt="Doctor with patient"
                          className="w-full h-full object-cover transition-all duration-300"
                          loading="lazy"
                          onError={(e) =>
                            (e.currentTarget.src = RELIABLE_IMAGES.doctor2)
                          }
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Zoom overlays */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0  backdrop-blur-sm z-[60] grid place-items-center pointer-events-none"
                      >
                        <motion.div
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{
                            scale: zoomScale,
                            opacity: 1,
                            y: [0, -12, 0],
                          }}
                          exit={{ scale: 1, opacity: 0 }}
                          transition={{
                            scale: {
                              duration: 0.5,
                              ease: [0.34, 1.56, 0.64, 1],
                            },
                            opacity: { duration: 0.3 },
                            y: {
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                          className="w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28 xl:w-28 xl:h-32 overflow-hidden "
                        >
                          <img
                            src={getImageSource("doctor1")}
                            alt="Physiotherapist — enlarged"
                            className="w-full h-full object-cover rounded-2xl"
                            onError={(e) =>
                              (e.currentTarget.src = RELIABLE_IMAGES.doctor1)
                            }
                          />
                        </motion.div>
                      </motion.div>
                    )}

                    {isRightImageHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0  backdrop-blur-sm z-[60] grid place-items-center pointer-events-none"
                      >
                        <motion.div
                          initial={{ scale: 1, opacity: 0 }}
                          animate={{
                            scale: zoomScale,
                            opacity: 1,
                            y: [0, -12, 0],
                          }}
                          exit={{ scale: 1, opacity: 0 }}
                          transition={{
                            scale: {
                              duration: 0.5,
                              ease: [0.34, 1.56, 0.64, 1],
                            },
                            opacity: { duration: 0.3 },
                            y: {
                              duration: 4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            },
                          }}
                          className="w-16 h-20 sm:w-20 sm:h-24 lg:w-24 lg:h-28 xl:w-28 xl:h-32 overflow-hidden "
                        >
                          <img
                            src={getImageSource("doctor2")}
                            alt="Doctor with patient — enlarged"
                            className="w-full h-full object-cover rounded-2xl"
                            onError={(e) =>
                              (e.currentTarget.src = RELIABLE_IMAGES.doctor2)
                            }
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Subline */}
                  <motion.span
                    className="block font-extralight text-gray-600 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    Through Movement with{" "}
                    <span className="whitespace-nowrap">Dr. Alia Misbah</span>
                  </motion.span>
                </motion.h1>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "6rem" }}
                  transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
                  className="h-px bg-gradient-to-r from-transparent via-gray-900 to-transparent mx-auto"
                />
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="text-xl lg:text-2xl font-extralight leading-relaxed text-gray-600 max-w-4xl mx-auto"
              >
                Dr. Alia Misbah pioneers evidence-based physiotherapy for musculoskeletal disorders, stroke rehabilitation, and women's health — transforming lives through compassionate, personalized care that reaches every corner of our community.
              </motion.p>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-8 text-sm font-light text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Online consultations</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Home visits</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Community care</span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center gap-6 pt-8"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  className="bg-gray-900 hover:bg-gray-800 text-white px-12 py-5 text-base rounded-full group"
                  asChild
                >
                  <a href="#booking" className="flex items-center">
                    <span>Begin Your Journey</span>
                    <motion.div
                      className="ml-3"
                      animate={{ x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </a>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-gray-700 hover:bg-white/50 px-12 py-5 text-base rounded-full"
                  asChild
                >
                  <a href="#about">Discover More</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
