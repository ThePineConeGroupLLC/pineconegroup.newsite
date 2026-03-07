"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BG = "#0b1a18";
const BG2 = "#0f2320";
const CARD = "#132420";

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const prefixMatch = value.match(/^(\$)([0-9.]+)(.*)$/);
  const numMatch = value.match(/^([0-9.]+)(.*)$/);
  const prefix = prefixMatch ? prefixMatch[1] : "";
  const rawNum = prefixMatch ? prefixMatch[2] : numMatch ? numMatch[1] : "";
  const suffix = prefixMatch ? prefixMatch[3] : numMatch ? numMatch[2] : value;
  const isDecimal = rawNum.includes(".");
  const numericPart = parseFloat(rawNum) || 0;
  const count = useCounter(isDecimal ? numericPart * 10 : numericPart, 2000, started);
  const displayNum = isDecimal ? (count / 10).toFixed(1) : count;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center py-8">
      <div className="font-playfair font-black text-[#0fb8ce] mb-2 leading-none" style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)" }}>
        {rawNum ? `${prefix}${displayNum}${suffix}` : value}
      </div>
      <div className="text-gray-400 text-xs uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen text-white" style={{ background: BG }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-6" style={{ background: `linear-gradient(160deg, #0a1614 0%, ${BG} 100%)` }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-5">About Us</p>
          <h1 className="font-playfair font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            We Exist to Make Premium Possible
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
            The Pine Cone Group is a strategic growth agency that partners with ambitious founders and brands to build the digital presence their business deserves.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: BG2, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { value: "400+", label: "Brands Transformed" },
              { value: "94%", label: "Client Satisfaction Rate" },
              { value: "180%", label: "Avg. Conversion Lift" },
              { value: "$2M+", label: "Additional Revenue Generated" },
            ].map((s) => (
              <div key={s.label} style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                <AnimatedStat value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-6" style={{ background: BG }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-5">Our Philosophy</p>
          <h2 className="font-playfair font-black text-white mb-8 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Design and Strategy Must Work as One
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Most agencies separate strategy and design — and that's exactly why so many websites fail. You either get a beautiful site that doesn't convert, or a strategic plan with no visual execution to match it.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            At The Pine Cone Group, strategy and design are inseparable. Every visual decision is rooted in business objectives. Every strategic recommendation is brought to life with premium craft. The result is a digital presence that doesn't just look right — it performs.
          </p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 px-6" style={{ background: BG2 }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-5">Why It Matters</p>
          <h2 className="font-playfair font-black text-white mb-8 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Your Website Is Your First Impression. And Your Sales Team.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Buyers research online before ever engaging. Most brands are losing leads, clients, and revenue every day — and they don't even know it. The gap between how good your business actually is and how it appears online is costing you more than you realize.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            We were founded to close that gap — to give ambitious, serious brands the kind of digital presence that builds trust on contact, communicates value at a glance, and turns visitors into buyers.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6" style={{ background: BG }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-5">What We Stand For</p>
          <h2 className="font-playfair font-black text-white mb-14 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Strategy Before Aesthetics", desc: "Beautiful design is meaningless without a strategic foundation. We start with goals, not looks." },
              { title: "Design That Does Business", desc: "Every visual element exists to serve a business objective. No decoration for decoration's sake." },
              { title: "Honesty Over Hype", desc: "We tell you what you need to hear, not what you want to hear. That's how we earn long-term trust." },
              { title: "Premium Craft, Always", desc: "We refuse to produce mediocre work. Every deliverable reflects the standard we'd be proud to put our name on." },
              { title: "Long-Term Relationships", desc: "We're not project vendors. We're growth partners invested in your success beyond the launch date." },
              { title: "Results That Speak", desc: "We measure success by what happens after launch — leads, revenue, and growth for our clients." },
            ].map((v) => (
              <div key={v.title} className="rounded-2xl p-7" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-8 h-0.5 bg-[#0fb8ce] mb-5" />
                <h3 className="font-playfair font-bold text-white text-xl mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-20 px-6" style={{ background: BG2 }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-5">Ideal Partners</p>
          <h2 className="font-playfair font-black text-white mb-12 leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Who We Work With
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Founders & owners using positioning strategically",
              "Service businesses avoiding price competition",
              "Nonprofits seeking mission credibility",
              "Hospitality brands",
              "Professional practices",
              "Growth-stage companies",
            ].map((t) => (
              <div key={t} className="flex items-center gap-4 rounded-xl p-4" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
                <Check size={16} color="#0fb8ce" strokeWidth={2.5} className="shrink-0" />
                <span className="text-gray-300 text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center px-6" style={{ background: BG, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-6">Ready to Grow?</p>
          <h2 className="font-playfair font-black text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)" }}>
            Ready to Work Together?
          </h2>
          <p className="text-gray-400 text-lg mb-12">Let&apos;s build something remarkable.</p>
          <a href="https://calendar.app.google/QZoctWL6MPGEzBds9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-black font-bold px-12 py-5 rounded-full text-lg transition-all hover:scale-105" style={{ background: "#0fb8ce" }}>
            Schedule a Strategy Call →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
