// src/components/Contact.jsx
import React, { useState } from "react";
import { Phone, Heart, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { motion } from "framer-motion";

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

  const MAX_MSG = 1000;
  const setVal = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

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
    if (form.website) return; // honeypot
    if (!validate()) return;

    setSubmitting(true);
    try {
      const fd = new FormData();
      // Web3Forms required/access fields
      fd.append("access_key", WEB3FORMS_ACCESS_KEY);
      // Common fields (you can name them whatever you like)
      fd.append("name", form.name);
      fd.append("email", form.email);   // becomes Reply-To automatically
      fd.append("phone", form.phone);
      fd.append("subject", form.subject); // Web3Forms uses `subject` (no underscore)
      fd.append("message", form.message);
      // Optional branding
      fd.append("from_name", "Dr. Alia Website");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.body?.message || "Could not send message. Please try again.");
      }

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "", website: "" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: err.message }));
    } finally {
      setSubmitting(false);
    }
  };

  const PHONE_NUMBER = "+92 300 0000000";
  const whatsapp = () => window.open("https://wa.me/923000000000", "_blank");
  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(PHONE_NUMBER);
      alert("Phone number copied!");
    } catch {}
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl mb-6 tracking-tight">Let's Connect</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            Ready to begin your healing journey? Reach out to Dr. Alia Misbah for personalized care.
          </p>
        </motion.div>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto mb-8 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800"
            role="status"
            aria-live="polite"
          >
            ✅ Message sent! Dr. Alia will get back to you within 24 hours.
          </motion.div>
        )}

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-3xl border border-gray-100">
              <h3 className="text-2xl mb-8 text-gray-900">Send a Message</h3>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* honeypot */}
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={setVal("website")}
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Name</Label>
                    <Input
                      id="contactName"
                      name="name"
                      value={form.name}
                      onChange={setVal("name")}
                      placeholder="Your full name"
                      className="border-gray-200 rounded-xl bg-white"
                    />
                    {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
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
                      className="border-gray-200 rounded-xl bg-white"
                    />
                    {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
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
                    className="border-gray-200 rounded-xl bg-white"
                  />
                  {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={form.subject}
                    onChange={setVal("subject")}
                    placeholder="What would you like to discuss?"
                    className="border-gray-200 rounded-xl bg-white"
                  />
                  {errors.subject && <p className="text-sm text-red-600">{errors.subject}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={setVal("message")}
                    placeholder="Tell me about your condition, questions, or how I can help you..."
                    rows={6}
                    className="border-gray-200 rounded-xl bg-white"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    {errors.message ? <p className="text-red-600">{errors.message}</p> : <span>&nbsp;</span>}
                    <span>{form.message.length}/{MAX_MSG}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl transition-all duration-300 cursor-pointer"
                >
                  {submitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                {errors.submit && <p className="text-sm text-red-600 mt-2">{errors.submit}</p>}

                <p className="text-sm text-gray-600 text-center font-light">
                  Your privacy is important to us. Information will never be shared with third parties.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-3xl border border-gray-100">
              <h3 className="text-2xl mb-8 text-gray-900">Get in Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full grid place-items-center">
                    <Phone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="text-lg mb-1 text-gray-900">Phone</h4>
                    <p className="text-gray-600 font-light">{PHONE_NUMBER}</p>
                    <p className="text-sm text-gray-500">Available during consultation hours</p>

                    <div className="mt-3 flex gap-2">
                      <Button variant="outline" className="rounded-full px-4" asChild>
                        <a href={`tel:${PHONE_NUMBER.replace(/\s+/g, "")}`}>Call</a>
                      </Button>
                      <Button variant="outline" className="rounded-full px-4" onClick={whatsapp}>
                        WhatsApp
                      </Button>
                      <Button variant="outline" className="rounded-full px-4" onClick={copyPhone}>
                        Copy
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Available Services</span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center"><div className="w-2 h-2 bg-gray-400 rounded-full mr-3" /> Online consultations</div>
                  <div className="flex items-center"><div className="w-2 h-2 bg-gray-400 rounded-full mr-3" /> Home visits available</div>
                  <div className="flex items-center"><div className="w-2 h-2 bg-gray-400 rounded-full mr-3" /> Emergency consultations</div>
                  <div className="flex items-center"><div className="w-2 h-2 bg-gray-400 rounded-full mr-3" /> Community outreach programs</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100">
              <h3 className="text-2xl mb-8 text-gray-900">Mission Statement</h3>
              <p className="text-sm text-gray-600">
                At Dr. Alia Misbah Physiotherapy, our mission is to provide high-quality, personalized care
                to help you achieve optimal wellness and recovery.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
