// src/components/Services.jsx
import React, { useRef } from "react";
import { Home, Video, Heart, Users, Award, Brain, Target } from "lucide-react";
import { Button } from "./ui/button"; // shadcn/ui button (adjust path if needed)
import { motion, useScroll, useTransform } from "framer-motion";

export default function Services() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // (Optional) keep for future use/badges
  const specializations = [
    { name: "Musculoskeletal Disorders", icon: Target },
    { name: "Stroke Rehabilitation", icon: Brain },
    { name: "Post-Surgical Recovery", icon: Heart },
    { name: "Women's Health Physiotherapy", icon: Users },
  ];

  const services = [
    {
      icon: Heart,
      title: "Musculoskeletal Disorders",
      description:
        "Comprehensive treatment for joint pain, muscle injuries, and movement dysfunction using evidence-based approaches.",
      features: ["Movement analysis", "Manual therapy", "Exercise prescription", "Pain management"],
    },
    {
      icon: Users,
      title: "Stroke Rehabilitation",
      description:
        "Specialized neurological rehabilitation to help stroke survivors regain function and independence.",
      features: ["Gait training", "Balance therapy", "Functional exercises", "ADL training"],
    },
    {
      icon: Award,
      title: "Post-Surgical Recovery",
      description:
        "Expert rehabilitation following orthopedic and other surgeries to optimize healing and restore function.",
      features: ["Wound care guidance", "Range of motion", "Strength rebuilding", "Return to activity"],
    },
    {
      icon: Heart,
      title: "Women's Health Physiotherapy",
      description:
        "Specialized care addressing unique women's health concerns with sensitivity and expertise.",
      features: ["Pelvic floor therapy", "Pregnancy support", "Postpartum recovery", "Wellness coaching"],
    },
    {
      icon: Video,
      title: "Online Consultations",
      description:
        "Convenient virtual sessions for assessment, exercise guidance, and follow-up care from home.",
      features: ["Video assessment", "Exercise demonstration", "Progress monitoring", "Treatment adjustments"],
    },
    {
      icon: Home,
      title: "Home Visits",
      description:
        "Personalized physiotherapy care delivered in the comfort and convenience of your own home.",
      features: ["In-home assessment", "Equipment setup", "Family education", "Environment modification"],
    },
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-gray-100/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full blur-3xl" />
      </motion.div>

      <div className="container mx-auto px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl mb-6 tracking-tight">Specialized Care Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Evidence-based physiotherapy treatments tailored to your unique needs, delivered with compassion
            and expertise.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all duration-500 group border border-gray-100"
              >
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </div>

                <h3 className="text-xl mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">{service.description}</p>

                <div className="space-y-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3" />
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Treatment Approach */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white p-12 rounded-3xl border border-gray-100"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl mb-4 tracking-tight">Treatment Approach</h3>
            <p className="text-gray-600 font-light max-w-2xl mx-auto">
              Every treatment plan is personalized, combining clinical expertise with compassionate care to
              achieve optimal outcomes for each patient.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h4 className="text-lg mb-2">Assessment</h4>
              <p className="text-sm text-gray-600 font-light">
                Comprehensive evaluation of your condition and movement patterns
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h4 className="text-lg mb-2">Treatment</h4>
              <p className="text-sm text-gray-600 font-light">
                Evidence-based interventions tailored to your specific needs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">3</span>
              </div>
              <h4 className="text-lg mb-2">Recovery</h4>
              <p className="text-sm text-gray-600 font-light">
                Ongoing support and education for long-term wellness
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full" asChild>
              <a href="#booking">Start Your Recovery Journey</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
