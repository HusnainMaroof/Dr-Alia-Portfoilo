// FAQ.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, MessageCircle, Clock, CreditCard, Home } from "lucide-react";

const faqs = [
  {
    icon: Clock,
    question: "How quickly can I schedule an appointment?",
    answer:
      "We typically offer same-day or next-day appointments for urgent cases. For routine consultations, appointments are usually available within 2-3 days. Emergency home visits can often be arranged within 24 hours.",
  },
  {
    icon: Home,
    question: "Do you provide home visit services?",
    answer:
      "Yes! We offer comprehensive home visit services throughout the city. This is especially beneficial for post-surgical patients, stroke recovery, or those with mobility limitations. Home visits include all necessary equipment and personalized treatment plans.",
  },
  {
    icon: CreditCard,
    question: "What are your consultation fees and payment options?",
    answer:
      "Initial consultation: PKR 3,000 | Follow-up sessions: PKR 2,500 | Home visits: PKR 4,000. We accept cash, bank transfers, and mobile payments (JazzCash, EasyPaisa). Treatment packages with discounts are available.",
  },
  {
    icon: MessageCircle,
    question: "Can I consult online for my condition?",
    answer:
      "Yes, we offer virtual consultations via video call for initial assessments, follow-ups, and exercise guidance. However, hands-on treatment requires in-person visits. Online consultations are perfect for monitoring progress and adjusting treatment plans.",
  },
  {
    question: "What conditions do you specialize in treating?",
    answer:
      "We specialize in musculoskeletal disorders, stroke rehabilitation, post-surgical recovery, sports injuries, chronic pain management, and women's health physiotherapy including prenatal/postnatal care and pelvic floor dysfunction.",
  },
  {
    question: "How long does each treatment session last?",
    answer:
      "Initial consultations are 60-75 minutes including assessment and treatment plan. Follow-up sessions are typically 45-60 minutes. Home visits may extend longer to ensure comprehensive care in your comfort zone.",
  },
  {
    question: "Do I need a doctor's referral for physiotherapy?",
    answer:
      "While a doctor's referral is not mandatory, it's helpful for insurance claims and provides medical context. We can treat you directly and will coordinate with your physician when necessary for optimal care.",
  },
  {
    question: "What should I expect during my first visit?",
    answer:
      "Your first visit includes: detailed health history, physical assessment, movement analysis, pain evaluation, personalized treatment plan discussion, and initial treatment session. Please bring any medical reports or previous physiotherapy records.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-50/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-50/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
            >
              <MessageCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-light tracking-wide">Your Questions Answered</span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl mb-6">
              <span className="font-extralight">Frequently Asked</span>{" "}
              <span className="text-gradient">Questions</span>
            </h2>

            <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get clear answers to common questions about our physiotherapy services, consultation
              process, and treatment approaches.
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="glass-strong rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-white/20 transition-colors duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    {faq.icon && (
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                        <faq.icon className="w-5 h-5 text-gray-700" />
                      </div>
                    )}
                    <h3 className="font-medium text-gray-900 text-lg pr-4">{faq.question}</h3>
                  </div>

                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <Plus className="w-6 h-6 text-gray-600" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 pl-20">
                        <motion.p
                          initial={{ y: -10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.3 }}
                          className="text-gray-600 font-light leading-relaxed"
                        >
                          {faq.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* CTA at bottom of FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-2xl font-light text-gray-900 mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 font-light mb-6">
                We're here to help! Contact us directly for personalized answers about your specific
                needs.
              </p>
              <motion.a
                href="https://wa.me/+923203115577"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 glass-strong px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-800">Ask on WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
