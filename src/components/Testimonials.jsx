// src/components/Testimonials.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

/* ---------- small helpers ---------- */

// Accessible star rating
function StarRating({ value = 5, max = 5 }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rated ${value} out of ${max} stars`}
    >
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">
        {value} / {max}
      </span>
    </div>
  );
}

// Lightweight count-up (no extra deps)
function CountUp({ to, duration = 1.6, prefix = "", suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    let raf;
    let start;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const animate = (t) => {
            if (start == null) start = t;
            const p = Math.min((t - start) / (duration * 1000), 1);
            setN(Math.round(p * to));
            if (p < 1) raf = requestAnimationFrame(animate);
          };
          raf = requestAnimationFrame(animate);
          io.disconnect();
        }
      },
      { threshold: 0.2 } // slightly earlier on small screens
    );
    if (ref.current) io.observe(ref.current);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

/* ---------- component ---------- */

export default function Testimonials() {
  const testimonials = [
    {
      name: "Fatima Ahmed",
      condition: "Post-Stroke Rehabilitation",
      rating: 5,
      text: "Dr. Alia's compassionate approach during my stroke recovery gave me hope when I thought I'd never walk again. Her expertise in neurological rehabilitation and patient care is exceptional. I can now move independently thanks to her dedicated treatment.",
      initials: "FA",
      location: "Karachi",
    },
    {
      name: "Zainab Khan",
      condition: "Women's Health Physiotherapy",
      rating: 5,
      text: "Dr. Alia understood my concerns with such sensitivity and professionalism. Her specialized knowledge in women's health physiotherapy helped me through a difficult postpartum recovery. I'm grateful for her expertise and caring nature.",
      initials: "ZK",
      location: "Lahore",
    },
    {
      name: "Ahmed Hassan",
      condition: "Musculoskeletal Disorder",
      rating: 5,
      text: "After years of chronic back pain from a workplace injury, Dr. Alia's evidence-based treatment approach finally gave me relief. Her home visits made treatment so convenient, and her personalized care plan worked better than I ever expected.",
      initials: "AH",
      location: "Islamabad",
    },
    {
      name: "Mariam Sajid",
      condition: "Online Consultation",
      rating: 5,
      text: "The online consultations with Dr. Alia were incredibly helpful during the pandemic. Her virtual assessments were thorough, and she provided clear exercise demonstrations. The quality of care was just as good as in-person visits.",
      initials: "MS",
      location: "Peshawar",
    },
    {
      name: "Hassan Ali",
      condition: "Post-Surgical Recovery",
      rating: 5,
      text: "Dr. Alia guided me through my post-surgical rehabilitation with such expertise and patience. Her knowledge of optimal healing techniques and functional restoration helped me recover faster than my doctor initially predicted.",
      initials: "HA",
      location: "Faisalabad",
    },
    {
      name: "Ayesha Malik",
      condition: "Community Outreach",
      rating: 5,
      text: "Through Ayesha Foundation's community program, Dr. Alia provided physiotherapy care to our underserved neighborhood. Her dedication to helping those who can't afford private treatment shows her true commitment to healing and social impact.",
      initials: "AM",
      location: "Rawalpindi",
    },
  ];

  // ✅ Mobile/desktop capability checks (prevents useless hover on touch + reduces jank)
  const canHover = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover)").matches,
    []
  );
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 640px)").matches,
    []
  );
  const prefersReduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-4 sm:mb-6 tracking-tight">
            Stories of Healing
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Real experiences from patients whose lives have been transformed
            through compassionate physiotherapy care and evidence-based
            treatment.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {testimonials.map((t, i) => {
            const baseDelay = prefersReduced ? 0 : isMobile ? 0 : i * 0.06;
            return (
              <motion.figure
                key={`${t.name}-${i}`}
                initial={prefersReduced ? false : { opacity: 0, y: 28 }}
                whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
                // Only animate on hover if device actually supports hover
                whileHover={canHover ? { y: -6 } : undefined}
                transition={{
                  delay: baseDelay,
                  duration: 0.45,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.15 }}
                style={{ transformPerspective: 900 }}
                className="bg-gray-50 p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform-gpu will-change-transform"
              >
                {/* header */}
                <div className="flex items-start justify-between">
                  <figcaption className="flex items-center gap-3">
                    <div
                      aria-hidden="true"
                      className="w-12 h-12 bg-gray-200 rounded-full grid place-items-center"
                    >
                      <span className="text-gray-600 font-medium">
                        {t.initials}
                      </span>
                    </div>
                    <div>
                      <div className="text-gray-900 font-medium">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.location}</div>
                    </div>
                  </figcaption>
                  <Quote
                    className="w-6 h-6 text-gray-300 flex-shrink-0"
                    aria-hidden="true"
                  />
                </div>

                {/* rating */}
                <div className="mt-4">
                  <StarRating value={t.rating} />
                </div>

                {/* condition */}
                <div className="mt-3 inline-block bg-white px-3 py-1 rounded-full text-xs text-gray-600 border border-gray-200">
                  {t.condition}
                </div>

                {/* text */}
                <blockquote className="mt-4 text-gray-700 font-light leading-relaxed">
                  “{t.text}”
                </blockquote>
              </motion.figure>
            );
          })}
        </div>

        {/* Impact stats with count-up */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 28 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-gray-900 text-white p-8 sm:p-10 lg:p-12 rounded-3xl text-center transform-gpu will-change-transform"
        >
          <h3 className="text-2xl sm:text-3xl mb-6 sm:mb-8 tracking-tight">
            Making a Difference
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                <CountUp to={200} suffix="+" />
              </div>
              <div className="text-gray-400 font-light text-sm sm:text-base">
                Patients Helped
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                <CountUp to={95} suffix="%" />
              </div>
              <div className="text-gray-400 font-light text-sm sm:text-base">
                Recovery Success
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                <CountUp to={50} suffix="+" />
              </div>
              <div className="text-gray-400 font-light text-sm sm:text-base">
                Home Visits
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">
                <CountUp to={100} suffix="%" />
              </div>
              <div className="text-gray-400 font-light text-sm sm:text-base">
                Dedication
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 lg:mt-12 max-w-2xl mx-auto">
            <p className="text-gray-300 font-light leading-relaxed text-sm sm:text-base">
              “Every patient's journey is unique, and every recovery story
              matters. We're committed to providing accessible, compassionate
              care that transforms lives and builds stronger communities.”
            </p>
            <p className="text-gray-400 text-xs sm:text-sm mt-4 italic">
              — Dr. Alia Misbah, DPT
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
