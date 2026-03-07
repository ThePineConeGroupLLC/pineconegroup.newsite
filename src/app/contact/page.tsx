"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BG = "#0b1a18";
const BG2 = "#0f2320";
const CARD = "#132420";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", "b5f4224c-4510-4da2-932e-28fbd1a271aa");
    data.append("subject", "New Lead — The Pine Cone Group Website");
    data.append("from_name", "Pine Cone Group Website");
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: data,
    });
    setSubmitted(true);
  }

  const inputClass = "w-full rounded-xl px-4 py-3 focus:outline-none transition-colors text-white placeholder-gray-500 text-sm";
  const inputStyle = { background: CARD, border: "1px solid rgba(255,255,255,0.1)" };

  return (
    <div className="min-h-screen text-white overflow-x-clip" style={{ background: BG }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden" style={{ background: `linear-gradient(160deg, #0a1614 0%, ${BG} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-0 w-72 h-72 md:w-[500px] md:h-[500px] rounded-full blur-3xl" style={{ background: "rgba(15,184,206,0.09)", animation: "pulse 7s ease-in-out infinite" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-72 md:h-72 rounded-full blur-3xl" style={{ background: "rgba(255,212,122,0.06)", animation: "pulse 9s ease-in-out infinite 2s" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(15,184,206,0.05) 0%, transparent 65%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 mb-6" style={{ background: "rgba(15,184,206,0.1)", border: "1px solid rgba(15,184,206,0.35)" }}>
            <span className="w-2 h-2 rounded-full bg-[#0fb8ce] inline-block animate-pulse" />
            <span className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold">Get In Touch</span>
          </div>
          <h1 className="font-playfair font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            Let&apos;s Talk About <span style={{ color: "#ffd47a" }}>Your Growth</span>
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
            We partner with ambitious brands to grow leads, revenue, and digital authority through premium creative strategy and execution.
          </p>
        </div>
      </section>

      <section className="py-20 px-6" style={{ background: BG2 }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Contact Info */}
          <div className="md:col-span-1 space-y-8">
            <div className="rounded-2xl p-7" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="font-playfair font-bold text-white text-xl mb-6">Contact Details</h2>
              <div className="space-y-4 text-sm">
                {[
                  { label: "Email", value: "admin@thepineconegroup.com", href: "mailto:admin@thepineconegroup.com" },
                  { label: "Phone", value: "850.800.8432", href: "tel:8508008432" },
                  { label: "Location", value: "Serving clients nationwide" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-[#0fb8ce] text-xs uppercase tracking-widest mb-1">{item.label}</div>
                    {item.href
                      ? <a href={item.href} className="text-gray-300 hover:text-white transition-colors">{item.value}</a>
                      : <span className="text-gray-300">{item.value}</span>
                    }
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-7" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
              <h2 className="font-playfair font-bold text-white text-xl mb-5">What to Expect</h2>
              <ul className="space-y-3 text-sm text-gray-400">
                {["Response within one business day", "Complimentary 15-minute strategy call", "Honest recommendations", "No pressure approach", "Clear next steps"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-[#0fb8ce] font-bold">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-5xl mb-6 text-[#0fb8ce]">✓</div>
                <h2 className="font-playfair font-bold text-white text-2xl mb-3">Message Received</h2>
                <p className="text-gray-400">Thank you for reaching out. We&apos;ll be in touch within one business day.</p>
              </div>
            ) : (
              <div className="rounded-2xl p-5 md:p-8" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Full Name *</label>
                      <input name="name" required className={inputClass} style={inputStyle} placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Email Address *</label>
                      <input name="email" type="email" required className={inputClass} style={inputStyle} placeholder="you@company.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Company / Brand *</label>
                      <input name="company" required className={inputClass} style={inputStyle} placeholder="Your company name" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Website URL</label>
                      <input name="website" className={inputClass} style={inputStyle} placeholder="https://yoursite.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                      <input name="phone" className={inputClass} style={inputStyle} placeholder="Your phone number" />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Primary Interest</label>
                      <select name="interest" className={inputClass} style={{ ...inputStyle, background: CARD }}>
                        <option value="">Select a service...</option>
                        <option>Website Design & Development</option>
                        <option>Branding & Creative Direction</option>
                        <option>Lead Generation Systems</option>
                        <option>Strategic Design</option>
                        <option>AI Visibility</option>
                        <option>Marketing Consulting</option>
                        <option>Full-Service Partnership</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Investment Range</label>
                    <select name="budget" className={inputClass} style={{ ...inputStyle, background: CARD }}>
                      <option value="">Select a range...</option>
                      <option>$5,000–$10,000</option>
                      <option>$10,000–$25,000</option>
                      <option>$25,000–$50,000</option>
                      <option>$50,000+</option>
                      <option>Ongoing retainer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Tell Us About Your Goals *</label>
                    <textarea name="message" required rows={5} className={`${inputClass} resize-none`} style={inputStyle} placeholder="What are you looking to achieve? What challenges are you facing?" />
                  </div>
                  <button type="submit" className="cta-btn w-full text-black font-bold py-4 rounded-full text-lg">
                    Send Message →
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
