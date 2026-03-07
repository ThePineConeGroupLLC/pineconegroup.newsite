"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    await fetch("https://formspree.io/f/xvgpokko", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#0fb8ce] uppercase tracking-widest text-sm font-semibold mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Let&apos;s Talk About Your Growth</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            We partner with ambitious brands to grow leads, revenue, and digital authority through premium creative strategy and execution.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Contact Info */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Details</h2>
              <div className="space-y-3 text-gray-600">
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Email</div>
                  <a href="mailto:scott@thepineconegroup.com" className="hover:text-[#0fb8ce] transition-colors">scott@thepineconegroup.com</a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Phone</div>
                  <a href="tel:8508008432" className="hover:text-[#0fb8ce] transition-colors">850.800.8432</a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Hours</div>
                  <span>Tues–Thurs, 10am–4pm CT</span>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-gray-400 mb-1">Location</div>
                  <span>Serving clients nationwide</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">What to Expect</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Response within one business day",
                  "Complimentary 30-minute strategy call",
                  "Honest recommendations",
                  "No pressure approach",
                  "Clear next steps for qualified prospects",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#0fb8ce] mt-0.5">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-gray-50 rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h2 className="text-2xl font-bold mb-2">Message Received</h2>
                <p className="text-gray-500">Thank you for reaching out. We&apos;ll be in touch within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Full Name *</label>
                    <input name="name" required className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0fb8ce] transition-colors" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Email Address *</label>
                    <input name="email" type="email" required className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0fb8ce] transition-colors" placeholder="you@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Company / Brand *</label>
                    <input name="company" required className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0fb8ce] transition-colors" placeholder="Your company name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Website URL</label>
                    <input name="website" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0fb8ce] transition-colors" placeholder="https://yoursite.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Phone Number</label>
                    <input name="phone" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0fb8ce] transition-colors" placeholder="Your phone number" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Primary Interest</label>
                    <select name="interest" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0fb8ce] transition-colors bg-white">
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
                  <label className="block text-sm font-semibold mb-2">Investment Range</label>
                  <select name="budget" className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0fb8ce] transition-colors bg-white">
                    <option value="">Select a range...</option>
                    <option>$5,000–$10,000</option>
                    <option>$10,000–$25,000</option>
                    <option>$25,000–$50,000</option>
                    <option>$50,000+</option>
                    <option>Ongoing retainer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Tell Us About Your Goals *</label>
                  <textarea name="message" required rows={5} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#0fb8ce] transition-colors resize-none" placeholder="What are you looking to achieve? What challenges are you facing?" />
                </div>
                <button type="submit" className="w-full bg-[#0fb8ce] hover:bg-[#0da3b8] text-white font-bold py-4 rounded-full transition-colors text-lg">
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
