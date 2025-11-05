// TrustResults.jsx
import React from "react";
import { motion } from "motion/react";
import { Award, Users, Clock, MapPin, Shield, Star } from "lucide-react";

const stats = [
  {
    icon: Users,
    number: "110+",
    label: "Patients Treated",
    description: "Successfully treated in the last 2 years",
  },
  {
    icon: Award,
    number: "95%",
    label: "Recovery Rate",
    description: "Patients report significant improvement",
  },
  {
    icon: Clock,
    number: "5+",
    label: "Years Experience",
    description: "Specialized physiotherapy expertise",
  },
  {
    icon: MapPin,
    number: "24/7",
    label: "Home Visits",
    description: "Available throughout the city",
  },
];

const credentials = [
  "Licensed Physiotherapist (DPT)",
  "Certified Stroke Rehabilitation Specialist",
  "Women's Health Physiotherapy Expert",
  "Member - Pakistan Physical Therapy Association",
];

export default function TrustResults() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gradient-to-br from-blue-50/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-green-50/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-8">
        <div className="max-w-6xl mx-auto">
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
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-light tracking-wide">
                Trusted Healthcare Excellence
              </span>
            </motion.div>

            <h2 className="text-4xl lg:text-5xl mb-6">
              <span className="text-gradient">Proven Results</span>{" "}
              <span className="font-extralight">You Can Trust</span>
            </h2>

            <p className="text-xl font-light text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our evidence-based approach has helped hundreds of patients
              reclaim their mobility, strength, and confidence through
              personalized physiotherapy care.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="text-center group"
              >
                <div className="glass-strong rounded-2xl p-8 hover:shadow-lg transition-all duration-500">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-6 group-hover:from-blue-50 group-hover:to-green-50 transition-colors duration-500"
                  >
                    <stat.icon className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition-colors duration-300" />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      delay: 0.2 + 0.1 * index,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="text-4xl lg:text-5xl font-light text-gray-900 mb-2"
                  >
                    {stat.number}
                  </motion.div>

                  <h3 className="font-medium text-gray-800 mb-3 text-lg">
                    {stat.label}
                  </h3>

                  <p className="text-gray-600 font-light leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Credentials & Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 lg:p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Credentials */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex -space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.div
                        key={star}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: 0.1 * star,
                          type: "spring",
                          stiffness: 200,
                        }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-gray-600 font-light">
                    Professional Excellence
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-light mb-6 text-gray-900">
                  Certified & <span className="text-gradient">Qualified</span>
                </h3>

                <div className="space-y-4">
                  {credentials.map((credential, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-gray-700 font-light">
                        {credential}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Elements */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mb-6"
                >
                  <Shield className="w-12 h-12 text-green-600" />
                </motion.div>

                <h4 className="text-xl font-medium text-gray-900 mb-4">
                  Your Health, Our Priority
                </h4>

                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  Fully licensed and insured practice following international
                  physiotherapy standards with complete patient confidentiality.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <div className="glass-strong px-4 py-2 rounded-full">
                    <span className="text-sm font-light text-gray-700">
                      ✓ Licensed Practice
                    </span>
                  </div>
                  <div className="glass-strong px-4 py-2 rounded-full">
                    <span className="text-sm font-light text-gray-700">
                      ✓ Fully Insured
                    </span>
                  </div>
                  <div className="glass-strong px-4 py-2 rounded-full">
                    <span className="text-sm font-light text-gray-700">
                      ✓ HIPAA Compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
