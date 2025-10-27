// src/components/Contact.jsx
import React, { useState, useMemo } from "react";
import { Phone, Heart, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";

// ✅ Web3Forms access key (public by design)
const WEB3FORMS_ACCESS_KEY = "d4664fae-352c-4025-88ae-9b2d3dbd1dc4";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const reduce = useReducedMotion();
  const isMobile = useMemo(
    () =>
      typeof window !== "undefined" && matchMedia("(max-width: 640px)").matches,
    []
  );

  const MAX_MSG = 1000;
  const setVal = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.subject.trim()) next.subject = "Please add a subject.";
    if (!form.message.trim()) next.message = "Please write a short message.";
    if (form.phone && !/^[\d\s+()-]{7,}$/.test(form.phone))
      next.phone = "Enter a valid phone number (or leave it empty).";
    if (form.message.length > MAX_MSG)
      next.message = `Message must be under ${MAX_MSG} characters.`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    if (form.website) return; // honeypot
    if (!validate()) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("access_key", WEB3FORMS_ACCESS_KEY);
      fd.append("name", form.name);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("subject", form.subject);
      fd.append("message", form.message);
      fd.append("from_name", "Dr. Alia Website");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(
          data?.body?.message || "Could not send message. Please try again."
        );
      }

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        website: "",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: err.message }));
    } finally {
      setSubmitting(false);
    }
  };

  const PHONE_NUMBER = "+923203115577";
  const telHref = PHONE_NUMBER.replace(/\s+/g, "");
  const whatsapp = () => window.open("https://wa.me/+923203115577", "_blank");
  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_NUMBER);
      toast.success("Phone number copied");
    } catch {}
  };

  // animation helpers
  const dur = reduce ? 0 : isMobile ? 0.55 : 0.8;

  return (
    <section id="contact" className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: dur }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="mb-4 sm:mb-6 tracking-tight text-[clamp(1.6rem,4.2vw,2.75rem)]">
            Let’s Connect
          </h2>
          <p className="mx-auto max-w-3xl text-[clamp(0.95rem,2.6vw,1.125rem)] text-gray-600 font-light leading-relaxed">
            Ready to begin your healing journey? Reach out to Dr. Alia Misbah
            for personalized care.
          </p>
        </motion.div>

        {success && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={reduce ? {} : { opacity: 1, y: 0 }}
            className="mx-auto mb-6 max-w-6xl rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800"
            role="status"
            aria-live="polite"
          >
            ✅ Message sent! Dr. Alia will get back to you within 24 hours.
          </motion.div>
        )}

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: isMobile ? 0 : -40 }}
            whileInView={reduce ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: dur }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
              <h3 className="mb-6 sm:mb-8 text-[clamp(1.25rem,3.2vw,1.5rem)] text-gray-900">
                Send a Message
              </h3>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5 sm:space-y-6"
              >
                {/* honeypot */}
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={setVal("website")}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Name</Label>
                    <Input
                      id="contactName"
                      name="name"
                      value={form.name}
                      onChange={setVal("name")}
                      placeholder="Your full name"
                      autoComplete="name"
                      className="rounded-xl border-gray-200 bg-white"
                    />
                    {errors.name && (
                      <p className="text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Email</Label>
                    <Input
                      id="contactEmail"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={setVal("email")}
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      inputMode="email"
                      className="rounded-xl border-gray-200 bg-white"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone (Optional)</Label>
                  <Input
                    id="contactPhone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={setVal("phone")}
                    placeholder="+92 300 0000000"
                    autoComplete="tel"
                    inputMode="tel"
                    className="rounded-xl border-gray-200 bg-white"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={setVal("subject")}
                    placeholder="What would you like to discuss?"
                    autoComplete="off"
                    className="rounded-xl border-gray-200 bg-white"
                  />
                  {errors.subject && (
                    <p className="text-sm text-red-600">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={setVal("message")}
                    placeholder="Tell me about your condition, questions, or how I can help you..."
                    rows={isMobile ? 5 : 6}
                    maxLength={MAX_MSG}
                    className="rounded-xl border-gray-200 bg-white"
                    aria-describedby="messageHelp"
                  />
                  <div
                    className="flex items-center justify-between text-xs text-gray-500"
                    id="messageHelp"
                  >
                    {errors.message ? (
                      <p className="text-red-600">{errors.message}</p>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                    <span>
                      {form.message.length}/{MAX_MSG}
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="cursor-pointer w-full rounded-xl bg-gray-900 py-3 text-white transition-all duration-300 hover:bg-gray-800"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                {errors.submit && (
                  <p className="mt-2 text-sm text-red-600">{errors.submit}</p>
                )}

                <p className="text-center text-sm font-light text-gray-600">
                  Your privacy is important to us. Information will never be
                  shared with third parties.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: isMobile ? 0 : 40 }}
            whileInView={reduce ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: dur }}
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6 sm:space-y-8"
          >
            <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
              <h3 className="mb-6 sm:mb-8 text-[clamp(1.25rem,3.2vw,1.5rem)] text-gray-900">
                Get in Touch
              </h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-gray-100">
                    <Phone className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="mb-1 text-lg text-gray-900">Phone</h4>
                    <p className="truncate font-semibold text-gray-700">
                      {PHONE_NUMBER}
                    </p>
                    <p className="text-sm text-gray-500">
                      Available during consultation hours
                    </p>

                    <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                      <Button
                        variant="outline"
                        className="cursor-pointer rounded-full px-4 hover:bg-gray-700 hover:text-white"
                        asChild
                      >
                        <a href={`tel:${telHref}`}>Call</a>
                      </Button>
                      <Button
                        variant="outline"
                        className="cursor-pointer rounded-full px-4 hover:bg-gray-700 hover:text-white"
                        onClick={whatsapp}
                      >
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        className="cursor-pointer rounded-full px-4 hover:bg-gray-700 hover:text-white"
                        onClick={copyPhone}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <div className="mb-4 flex items-center gap-3">
                  <Heart className="h-5 w-5 fill-gray-600 text-gray-600" />
                  <span className="text-gray-700">Available Services</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  {[
                    "Online consultations",
                    "Home visits available",
                    "Emergency consultations",
                    "Community outreach programs",
                  ].map((item) => (
                    <div key={item} className="flex items-center">
                      <span className="mr-3 h-2 w-2 rounded-full bg-gray-400" />{" "}
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8">
              <h3 className="mb-4 sm:mb-6 text-[clamp(1.1rem,3vw,1.375rem)] text-gray-900">
                Mission Statement
              </h3>
              <p className="text-sm text-gray-600">
                At Dr. Alia Misbah Physiotherapy, our mission is to provide
                high-quality, personalized care to help you achieve optimal
                wellness and recovery.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
