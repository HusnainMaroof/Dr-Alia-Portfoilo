// src/components/FAQ.jsx
import React, { useId, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus, MessageCircle, Clock, CreditCard, Home } from "lucide-react";

const faqs = [
  {
    icon: Clock,
    question: "How quickly can I schedule an appointment?",
    answer:
      "We typically offer same-day or next-day appointments for urgent cases. For routine consultations, appointments are usually available within 2–3 days. Emergency home visits can often be arranged within 24 hours.",
  },
  {
    icon: Home,
    question: "Do you provide home visit services?",
    answer:
      "Yes! We offer comprehensive home visit services throughout the city—ideal for post-surgical patients, stroke recovery, or anyone with mobility limitations. Home visits include necessary equipment and a personalized plan.",
  },
  {
    icon: CreditCard,
    question: "What are your consultation fees and payment options?",
    answer:
      "Initial consultation: PKR 3,000 · Follow-up sessions: PKR 2,500 · Home visits: PKR 4,000. We accept cash, bank transfer, and mobile payments (JazzCash, EasyPaisa). Discounted treatment packages are available.",
  },
  {
    icon: MessageCircle,
    question: "Can I consult online for my condition?",
    answer:
      "Yes. We provide virtual consultations for initial assessment, follow-ups, and guided exercises. Hands-on treatment requires an in-person visit, but online is perfect for progress reviews and plan adjustments.",
  },
  {
    question: "What conditions do you specialize in treating?",
    answer:
      "Musculoskeletal disorders, stroke rehabilitation, post-surgical recovery, sports injuries, chronic pain, and women’s health physiotherapy (prenatal/postnatal care, pelvic floor dysfunction).",
  },
  {
    question: "How long does each treatment session last?",
    answer:
      "Initial consultations take 60–75 minutes (assessment + plan). Follow-ups are typically 45–60 minutes. Home visits may run longer to ensure thorough care in your environment.",
  },
  {
    question: "Do I need a doctor's referral for physiotherapy?",
    answer:
      "No referral required. It can help with insurance and medical context, but you can book directly. We coordinate with your physician when needed.",
  },
  {
    question: "What should I expect during my first visit?",
    answer:
      "Health history, physical assessment, movement analysis, pain evaluation, plan discussion, and your first treatment. Bring any reports or previous physio records.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();

  const toggleFAQ = (index) =>
    setOpenIndex((i) => (i === index ? null : index));

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Background (hide on mobile for clarity/perf) */}
      <div className="absolute inset-0 -z-10 hidden sm:block">
        <div className="absolute top-1/3 left-1/4 w-72 lg:w-80 aspect-square bg-gradient-to-br from-purple-50/25 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 lg:w-96 aspect-square bg-gradient-to-br from-blue-50/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-10 sm:mb-16"
          >
            <motion.div
              initial={reduce ? false : { scale: 0.9, opacity: 0 }}
              whileInView={reduce ? {} : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/60 px-3.5 py-2 backdrop-blur"
            >
              <MessageCircle className="h-4 w-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-gray-700">
                Your Questions Answered
              </span>
            </motion.div>

            <h2 className="mt-5 mb-4 tracking-tight text-[clamp(1.6rem,4.2vw,2.75rem)]">
              <span className="font-extralight">Frequently Asked</span>{" "}
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>

            <p className="mx-auto max-w-3xl text-[clamp(0.95rem,2.6vw,1.125rem)] font-light leading-relaxed text-gray-600">
              Clear answers about our services, consultations, and treatment
              approach.
            </p>
          </motion.div>

          {/* Accordion */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => {
              const Icon = faq.icon;
              const open = openIndex === index;
              const contentId = `${baseId}-content-${index}`;
              const buttonId = `${baseId}-button-${index}`;

              return (
                <motion.div
                  key={index}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={reduce ? {} : { opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: reduce ? 0 : index * 0.04,
                  }}
                  viewport={{ once: true, amount: 0.15 }}
                  className="rounded-2xl border border-gray-200 bg-white/70 backdrop-blur shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <button
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={contentId}
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 text-left"
                  >
                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                      {Icon && (
                        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gray-100">
                          <Icon className="h-5 w-5 text-gray-700" />
                        </div>
                      )}
                      <h3 className="truncate pr-4 text-base sm:text-lg font-medium text-gray-900">
                        {faq.question}
                      </h3>
                    </div>

                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <Plus className="h-6 w-6 text-gray-600" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6 pl-12 sm:pl-16">
                          <motion.p
                            initial={reduce ? false : { y: -8, opacity: 0 }}
                            animate={reduce ? {} : { y: 0, opacity: 1 }}
                            transition={{ duration: 0.25 }}
                            className="text-sm sm:text-base font-light leading-relaxed text-gray-600"
                          >
                            {faq.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="rounded-2xl border border-gray-200 bg-white/70 p-6 sm:p-8 backdrop-blur">
              <h3 className="mb-2 text-[clamp(1.2rem,3.2vw,1.6rem)] font-light text-gray-900">
                Still have questions?
              </h3>
              <p className="mx-auto mb-6 max-w-2xl text-[clamp(0.95rem,2.4vw,1rem)] font-light text-gray-600">
                Message us and we’ll help with anything specific to your case.
              </p>
              <motion.a
                href="https://wa.me/+923203115577"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 rounded-full border border-gray-300 bg-white px-6 py-3 sm:px-8 sm:py-4 text-gray-800 shadow-sm transition-shadow hover:shadow-md"
              >
                <MessageCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm sm:text-base font-medium">
                  Ask on WhatsApp
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
