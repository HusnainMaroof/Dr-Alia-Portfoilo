// src/components/Booking.jsx
import React, { useMemo, useState, useRef } from "react";
import {
  Calendar,
  Video,
  Home,
  MessageCircle,
  Mail,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// ✅ Web3Forms access key (public by design)
const WEB3FORMS_ACCESS_KEY = "0f0f635f-4d05-403c-a0c0-921144b143e4";
// ✅ Your Web3Forms Template ID (from Dashboard → Templates)
const WEB3FORMS_TEMPLATE_ID = "tmpl_XXXXXXXX"; // <-- REPLACE ME

export default function Booking() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // ISO string (date only list item)
  const [selectedTime, setSelectedTime] = useState(""); // "3:00 PM"
  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    notes: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef(null);

  const consultationTypes = [
    {
      id: "clinic",
      name: "Clinic Visit",
      description: "In-person consultation at Ayesha Foundation",
      icon: Calendar,
    },
    {
      id: "online",
      name: "Online Consultation",
      description: "Virtual session via video call",
      icon: Video,
    },
    {
      id: "home",
      name: "Home Visit",
      description: "Personalized care in your home",
      icon: Home,
    },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  const availableDates = useMemo(() => {
    const out = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Mon–Fri only
      if (d.getDay() !== 0 && d.getDay() !== 6) out.push(d);
    }
    return out;
  }, []);

  const formatDate = (d) =>
    d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const MAX_NOTES = 1000;
  const setVal = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const parse12hTo24h = (t) => {
    // "3:00 PM" -> "15:00:00"
    if (!t) return "";
    const [time, meridiem] = t.split(" ");
    let [h, m] = time.split(":").map((n) => parseInt(n, 10));
    if (meridiem?.toUpperCase() === "PM" && h !== 12) h += 12;
    if (meridiem?.toUpperCase() === "AM" && h === 12) h = 0;
    const hh = String(h).padStart(2, "0");
    const mm = String(m || 0).padStart(2, "0");
    return `${hh}:${mm}:00`;
  };

  const validate = () => {
    const next = {};
    if (!selectedType) next.type = "Please choose a consultation type.";
    if (!form.first.trim()) next.first = "First name is required.";
    if (!form.last.trim()) next.last = "Last name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email.";
    if (!/^\+?[0-9\s()-]{7,}$/.test(form.phone))
      next.phone = "Enter a valid phone number.";
    if (!selectedDate) next.date = "Pick a date.";
    if (!selectedTime) next.time = "Pick a time.";
    if (form.notes.length > MAX_NOTES)
      next.notes = `Notes must be under ${MAX_NOTES} characters.`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.website) return; // honeypot
    if (!validate()) return;

    setSubmitting(true);
    try {
      const chosen = consultationTypes.find((t) => t.id === selectedType);

      // Build combined ISO date-time from selected date + time
      const dateISO = selectedDate ? new Date(selectedDate).toISOString() : "";
      const dateOnly = selectedDate
        ? new Date(selectedDate).toISOString().split("T")[0]
        : "";
      const time24 = parse12hTo24h(selectedTime);
      const preferredDateTimeISO =
        dateOnly && time24
          ? new Date(`${dateOnly}T${time24}`).toISOString()
          : "";

      // Normalize phone for wa.me and CRMs
      const phoneNormalized = form.phone.replace(/[^\d+]/g, "");

      const fd = new FormData();
      fd.append("access_key", WEB3FORMS_ACCESS_KEY);

      // 🔗 attach your custom template
      fd.append("template_id", WEB3FORMS_TEMPLATE_ID);
      // If your dashboard uses a different key (e.g., email_template_id), change the key above.

      // Primary fields
      fd.append("type", selectedType);
      fd.append("type_readable", chosen?.name || "Consultation");
      fd.append("first_name", form.first);
      fd.append("last_name", form.last);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("phone_normalized", phoneNormalized);

      // Date & time
      fd.append("preferred_time", selectedTime);
      fd.append("preferred_date_iso", dateISO);
      fd.append("preferred_datetime_iso", preferredDateTimeISO);
      fd.append(
        "preferred_date_readable",
        selectedDate ? formatDate(new Date(selectedDate)) : ""
      );

      // Misc
      fd.append("notes", form.notes);
      fd.append("subject", `New booking: ${chosen?.name || "Consultation"}`);
      fd.append("from_name", "Dr. Alia Website");

      // Context for the inbox
      if (typeof window !== "undefined") {
        fd.append("page_url", window.location.href);
        fd.append("user_agent", navigator.userAgent);
      }

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: fd,
        headers: { Accept: "application/json" },
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        /* ignore JSON parse errors; we'll handle with !res.ok */
      }

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.message ||
            data?.body?.message ||
            "Could not send booking. Please try again."
        );
      }

      setSubmitted(true);
      setForm({
        first: "",
        last: "",
        email: "",
        phone: "",
        notes: "",
        website: "",
      });
      setSelectedType("");
      setSelectedDate("");
      setSelectedTime("");

      // Scroll success into view for mobile users
      setTimeout(
        () =>
          successRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        50
      );
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "Something went wrong.",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedType("");
    setSelectedDate("");
    setSelectedTime("");
    setForm({
      first: "",
      last: "",
      email: "",
      phone: "",
      notes: "",
      website: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  const canSubmit =
    !!selectedType &&
    !!selectedDate &&
    !!selectedTime &&
    !!form.first.trim() &&
    !!form.last.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    /^\+?[0-9\s()-]{7,}$/.test(form.phone) &&
    !isSubmitting;

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl lg:text-5xl mb-4 tracking-tight">
            Book Your Consultation
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Choose a clinic visit, online session, or a convenient home visit
            with Dr. Alia Misbah.
          </p>
        </motion.div>

        {/* Success banner */}
        {submitted && (
          <motion.div
            ref={successRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-800"
            role="status"
            aria-live="polite"
          >
            ✅ Consultation request submitted! We’ll contact you within 24 hours
            to confirm your appointment.
          </motion.div>
        )}

        {/* Type selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
          role="group"
          aria-labelledby="type-label"
        >
          <h3
            id="type-label"
            className="text-xl mb-4 text-center text-gray-900"
          >
            Choose Your Consultation Type
          </h3>
          {errors.type && (
            <p className="text-center text-sm text-red-600 mb-3">
              {errors.type}
            </p>
          )}
          <div className="grid md:grid-cols-3 gap-4">
            {consultationTypes.map((t) => {
              const Icon = t.icon;
              const active = selectedType === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setSelectedType(t.id)}
                  aria-pressed={active}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-900/30 ${
                    active
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-8 h-8 mb-4 text-gray-600" />
                  <div className="font-medium text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-600 font-light">
                    {t.description}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Booking form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="bg-gray-50 p-8 rounded-3xl"
        >
          <form onSubmit={handleSubmit} noValidate className="space-y-8">
            {/* honeypot (hidden) */}
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
                <Label htmlFor="first">First Name</Label>
                <Input
                  id="first"
                  name="first_name"
                  value={form.first}
                  onChange={setVal("first")}
                  placeholder="Your first name"
                  className="border-gray-200 rounded-xl bg-white"
                  aria-invalid={!!errors.first}
                />
                {errors.first && (
                  <p className="text-sm text-red-600">{errors.first}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last">Last Name</Label>
                <Input
                  id="last"
                  name="last_name"
                  value={form.last}
                  onChange={setVal("last")}
                  placeholder="Your last name"
                  className="border-gray-200 rounded-xl bg-white"
                  aria-invalid={!!errors.last}
                />
                {errors.last && (
                  <p className="text-sm text-red-600">{errors.last}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={setVal("email")}
                  placeholder="your.email@example.com"
                  className="border-gray-200 rounded-xl bg-white"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={setVal("phone")}
                  placeholder="+92 300 0000000"
                  className="border-gray-200 rounded-xl bg-white"
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Preferred Date</Label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="border-gray-200 rounded-xl bg-white w-full">
                    <SelectValue placeholder="Select a date" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDates.map((d) => (
                      <SelectItem key={d.toISOString()} value={d.toISOString()}>
                        {formatDate(d)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.date && (
                  <p className="text-sm text-red-600">{errors.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="border-gray-200 rounded-xl bg-white w-full">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.time && (
                  <p className="text-sm text-red-600">{errors.time}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Tell us about your condition</Label>
              <Textarea
                id="notes"
                name="notes"
                value={form.notes}
                onChange={setVal("notes")}
                rows={4}
                placeholder="Briefly describe your symptoms, concerns, or goals…"
                className="border-gray-200 rounded-xl bg-white"
                aria-invalid={!!errors.notes}
              />
              <div className="flex items-center justify-between text-xs text-gray-500">
                {errors.notes ? (
                  <p className="text-red-600">{errors.notes}</p>
                ) : (
                  <span>&nbsp;</span>
                )}
                <span>
                  {form.notes.length}/{MAX_NOTES}
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <Button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-xl text-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending…
                  </span>
                ) : (
                  "Submit Consultation Request"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={resetForm}
                className="w-full rounded-xl text-md"
              >
                Reset
              </Button>
            </div>

            {errors.submit && (
              <p className="text-sm text-red-600 mt-2">{errors.submit}</p>
            )}

            <p className="text-sm text-gray-600 text-center font-light">
              We’ll review your request and get back to you within 24 hours.
            </p>
          </form>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-2 gap-8"
        >
          <div className="bg-gray-50 p-8 rounded-3xl text-center">
            <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h4 className="text-lg mb-2 text-gray-900">WhatsApp Message</h4>
            <p className="text-gray-600 font-light mb-4">
              For urgent consultations or immediate assistance
            </p>
            <Button
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-6"
              onClick={() =>
                window.open("https://wa.me/923203115577", "_blank")
              }
            >
              +92 320 3115577
            </Button>
          </div>

          <div className="bg-gray-50 p-8 rounded-3xl text-center">
            <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h4 className="text-lg mb-2 text-gray-900">Send an Email</h4>
            <p className="text-gray-600 font-light mb-4">
              General inquiries and non-urgent questions
            </p>
            <Button
              asChild
              variant="outline"
              className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-6"
            >
              <a href="mailto:Contact@draliamisbah.com">
                Contact@draliamisbah.com
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
  