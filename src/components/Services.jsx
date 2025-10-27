// src/components/Services.jsx
import React, { useMemo, useRef } from "react";
import { Home, Video, Heart, Users, Award, Brain, Target } from "lucide-react";
import { Button } from "./ui/button";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function Services() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  // device hints
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 640px)").matches,
    []
  );
  const canHover = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover)").matches,
    []
  );

  // Parallax softened for mobile / reduced motion
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : isMobile ? [40, -40] : [100, -100]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    reduce ? [1, 1, 1, 1] : [0, 1, 1, 0]
  );

  const services = [
    {
      icon: Heart,
      title: "Musculoskeletal Disorders",
      description:
        "Comprehensive treatment for joint pain, muscle injuries, and movement dysfunction using evidence-based approaches.",
      features: [
        "Movement analysis",
        "Manual therapy",
        "Exercise prescription",
        "Pain management",
      ],
    },
    {
      icon: Users,
      title: "Stroke Rehabilitation",
      description:
        "Specialized neurological rehabilitation to help stroke survivors regain function and independence.",
      features: [
        "Gait training",
        "Balance therapy",
        "Functional exercises",
        "ADL training",
      ],
    },
    {
      icon: Award,
      title: "Post-Surgical Recovery",
      description:
        "Expert rehabilitation following orthopedic and other surgeries to optimize healing and restore function.",
      features: [
        "Wound care guidance",
        "Range of motion",
        "Strength rebuilding",
        "Return to activity",
      ],
    },
    {
      icon: Heart,
      title: "Women's Health Physiotherapy",
      description:
        "Specialized care addressing unique women's health concerns with sensitivity and expertise.",
      features: [
        "Pelvic floor therapy",
        "Pregnancy support",
        "Postpartum recovery",
        "Wellness coaching",
      ],
    },
    {
      icon: Video,
      title: "Online Consultations",
      description:
        "Convenient virtual sessions for assessment, exercise guidance, and follow-up care from home.",
      features: [
        "Video assessment",
        "Exercise demonstration",
        "Progress monitoring",
        "Treatment adjustments",
      ],
    },
    {
      icon: Home,
      title: "Home Visits",
      description:
        "Personalized physiotherapy care delivered in the comfort and convenience of your own home.",
      features: [
        "In-home assessment",
        "Equipment setup",
        "Family education",
        "Environment modification",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="relative overflow-hidden py-16 sm:py-24 lg:py-32"
      ref={ref}
    >
      {/* Background elements (hidden on mobile for clarity/perf) */}
      {!reduce && (
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 -z-10 hidden sm:block"
        >
          <div className="absolute top-1/4 right-1/4 w-80 lg:w-96 aspect-square bg-gradient-to-br from-gray-100/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 lg:w-96 aspect-square bg-gradient-to-br from-gray-200/20 to-transparent rounded-full blur-3xl" />
        </motion.div>
      )}

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: isMobile ? 0.15 : 0.25 }}
          className="text-center mb-10 sm:mb-14 lg:mb-20"
        >
          <h2 className="mb-4 sm:mb-6 tracking-tight text-[clamp(1.5rem,3.8vw,2.75rem)]">
            Specialized Care Services
          </h2>
          <p className="text-gray-600 font-light leading-relaxed mx-auto max-w-3xl text-[clamp(0.95rem,2.6vw,1.125rem)]">
            Evidence-based physiotherapy treatments tailored to your unique
            needs, delivered with compassion and expertise.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.45,
                  delay: reduce ? 0 : index * (isMobile ? 0.04 : 0.1),
                }}
                viewport={{ once: true, amount: 0.15 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 transform-gpu will-change-transform
                           hover:shadow-lg"
                // disable lift on touch devices (hover: none)
                whileHover={canHover ? { y: -6 } : undefined}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-lg sm:text-xl mb-3 sm:mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-5 sm:mb-6 text-[clamp(0.95rem,2.4vw,1rem)]">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm sm:text-[0.95rem] text-gray-500"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        {/* Treatment Approach */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: isMobile ? 0.15 : 0.25 }}
          className="bg-white p-6 sm:p-8 lg:p-12 rounded-3xl border border-gray-100 transform-gpu will-change-transform"
        >
          <div className="text-center mb-8 lg:mb-12">
            <h3 className="text-[clamp(1.25rem,3vw,1.875rem)] mb-3 lg:mb-4 tracking-tight">
              Treatment Approach
            </h3>
            <p className="text-gray-600 font-light mx-auto max-w-2xl text-[clamp(0.95rem,2.4vw,1rem)]">
              Every treatment plan is personalized, combining clinical expertise
              with compassionate care to achieve optimal outcomes for each
              patient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                n: 1,
                t: "Assessment",
                d: "Comprehensive evaluation of your condition and movement patterns",
              },
              {
                n: 2,
                t: "Treatment",
                d: "Evidence-based interventions tailored to your specific needs",
              },
              {
                n: 3,
                t: "Recovery",
                d: "Ongoing support and education for long-term wellness",
              },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">{step.n}</span>
                </div>
                <h4 className="text-base sm:text-lg mb-1.5 sm:mb-2">
                  {step.t}
                </h4>
                <p className="text-sm sm:text-[0.95rem] text-gray-600 font-light">
                  {step.d}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <Button
              className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-5 py-2.5 sm:px-8 sm:py-3"
              asChild
            >
              <a href="#booking">Start Your Recovery Journey</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
