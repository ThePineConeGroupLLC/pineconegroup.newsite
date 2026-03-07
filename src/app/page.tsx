"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
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

function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const match = value.match(/^([0-9.]+)(.*)$/);
  const numericPart = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const isDecimal = match ? match[1].includes(".") : false;
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
    <div ref={ref} className="text-center py-10 px-4">
      <div className="font-playfair text-6xl md:text-7xl font-black text-[#0fb8ce] mb-3 leading-none">
        {match ? `${displayNum}${suffix}` : value}
      </div>
      <div className="text-gray-400 text-xs uppercase tracking-widest leading-relaxed">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{ background: BG, fontFamily: "var(--font-inter)" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center" style={{ background: `linear-gradient(160deg, #0a1614 0%, ${BG} 60%)` }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(15,184,206,0.07) 0%, transparent 65%)" }} />
        <div className="relative max-w-2xl mx-auto px-6 py-40 text-center w-full">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 rounded-full px-6 py-2.5 mb-10" style={{ background: "rgba(15,184,206,0.1)", border: "1px solid rgba(15,184,206,0.35)" }}>
            <span className="w-2 h-2 rounded-full bg-[#0fb8ce] inline-block" />
            <span className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold">Strategic Growth Agency</span>
          </div>

          {/* Headline */}
          <h1 className="font-playfair font-black leading-[1.05] mb-8" style={{ fontSize: "clamp(3rem, 12vw, 5.5rem)" }}>
            <span className="text-white">Your Brand.</span><br />
            <span className="text-[#0fb8ce]">Elevated.</span><br />
            <span className="text-white">Your Growth.</span><br />
            <span style={{ color: "#F5A94C" }}>Accelerated.</span>
          </h1>

          <p className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg mx-auto">
            The Pine Cone Group helps ambitious brands grow leads and revenue through strategic design, digital storytelling, and premium digital positioning that converts.
          </p>

          <Link href="/contact" className="inline-flex items-center gap-3 text-black font-bold px-10 py-5 rounded-full text-lg transition-all hover:scale-105" style={{ background: "#0fb8ce" }}>
            Schedule a Strategy Call <span>→</span>
          </Link>
        </div>
      </section>

      {/* Logo Showcase */}
      <section className="py-4" style={{ background: BG2, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="elfsight-app-d614c863-fdbb-4579-93d7-930fc8e2efd3" data-elfsight-app-lazy />
      </section>

      {/* Stats */}
      <section style={{ background: BG, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              { value: "3x", label: "Average lead increase for clients" },
              { value: "94%", label: "Client satisfaction rate" },
              { value: "180%", label: "Average conversion lift" },
              { value: "400+", label: "Brands transformed" },
            ].map((s) => (
              <div key={s.label} style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                <StatItem value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6" style={{ background: BG2 }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-5">What We Do</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <h2 className="font-playfair font-black text-white leading-tight" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}>
              Every Service Built<br />to Grow Your Business
            </h2>
            <Link href="/services" className="text-[#0fb8ce] hover:underline flex items-center gap-2 font-semibold whitespace-nowrap text-sm">
              View all services →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Website Design & Development", desc: "High-converting websites that build trust, communicate value, and drive action.", icon: "🌐" },
              { title: "Lead Generation Systems", desc: "Full-funnel systems that attract ideal clients and convert visitors into opportunities.", icon: "⚡" },
              { title: "Strategic Design", desc: "Design as a growth lever — rooted in research, positioning, and measurable objectives.", icon: "🎯" },
              { title: "Branding & Creative Direction", desc: "Complete brand identities that position you as the premium, credible choice.", icon: "✦" },
              { title: "AI Visibility & Search Readiness", desc: "Be found where the future searches — ChatGPT, Perplexity, Google SGE.", icon: "🤖" },
              { title: "Marketing Consulting", desc: "Senior-level strategy and positioning expertise without the overhead.", icon: "📈" },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl p-7 transition-all hover:scale-[1.02]" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="text-3xl mb-5">{s.icon}</div>
                <h3 className="font-playfair font-bold text-white text-xl mb-3">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-6" style={{ background: BG }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-5">Client Outcomes</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
            <h2 className="font-playfair font-black text-white leading-tight" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}>
              Real Brands.<br />Real Results.
            </h2>
            <Link href="/case-studies" className="text-[#0fb8ce] hover:underline flex items-center gap-2 font-semibold whitespace-nowrap text-sm">
              All case studies →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { tag: "Local Service Business", client: "Regional HVAC Company", metric: "+340%", metricLabel: "Qualified Leads in 90 Days", quote: "I didn't realize how much our old site was costing us. They helped us become the obvious choice in our market." },
              { tag: "Nonprofit", client: "Community Foundation", metric: "2.8x", metricLabel: "Donor Conversion Rate", quote: "They understood our mission before we finished explaining it. The result was new credibility we didn't know we were missing." },
              { tag: "Restaurant & Hospitality", client: "Farm-to-Table Restaurant", metric: "+220%", metricLabel: "Online Reservations in 6 Months", quote: "Bookings went through the roof. The site doesn't just look incredible — it actually sells." },
            ].map((c) => (
              <div key={c.client} className="rounded-2xl p-7" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(15,184,206,0.12)", border: "1px solid rgba(15,184,206,0.25)" }}>
                  <span className="text-[#0fb8ce] text-xs uppercase tracking-[0.15em] font-bold">{c.tag}</span>
                </div>
                <h3 className="font-playfair font-bold text-white text-xl mb-1">{c.client}</h3>
                <p className="text-gray-400 text-sm mb-4">{c.metricLabel}</p>
                <div className="font-playfair font-black text-[#0fb8ce] mb-5" style={{ fontSize: "3.5rem", lineHeight: 1 }}>{c.metric}</div>
                <p className="text-gray-400 italic text-sm leading-relaxed border-l-2 border-[#0fb8ce]/30 pl-4">"{c.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Tool */}
      <section className="py-24 px-6" style={{ background: BG2, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: "1px solid rgba(15,184,206,0.2)" }}>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Content */}
              <div className="p-10 md:p-14">
                <div className="inline-flex items-center rounded-full px-5 py-2 mb-8" style={{ background: "rgba(15,184,206,0.1)", border: "1px solid rgba(15,184,206,0.3)" }}>
                  <span className="text-[#0fb8ce] text-xs uppercase tracking-[0.2em] font-bold">Signature Tool</span>
                </div>
                <h2 className="font-playfair font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
                  Free Website Performance Review
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Discover exactly how your website is performing across design quality, lead conversion, mobile experience, and AI visibility — and see what&apos;s possible with a strategic upgrade.
                </p>
                <Link href="/contact" className="inline-flex items-center gap-3 text-black font-bold px-8 py-4 rounded-full transition-all hover:scale-105" style={{ background: "#0fb8ce" }}>
                  Run My Free Review →
                </Link>
              </div>
              {/* Right: Score Widget */}
              <div className="p-10 md:p-14 flex flex-col justify-center gap-5" style={{ borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
                {[
                  { label: "Performance Score", score: 72 },
                  { label: "Design Quality", score: 58 },
                  { label: "Lead Conversion Potential", score: 44 },
                  { label: "Mobile Experience", score: 81 },
                  { label: "AI Visibility", score: 35 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">{item.label}</span>
                      <span className="text-white font-bold text-sm">{item.score}</span>
                    </div>
                    <div className="h-1.5 rounded-full w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${item.score}%`, background: "#0fb8ce" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center px-6" style={{ background: BG2, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-6">Ready to Grow?</p>
          <h2 className="font-playfair font-black text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}>
            Let&apos;s Build Something Remarkable
          </h2>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            Schedule a free strategy call and discover exactly what&apos;s possible for your brand.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-3 text-black font-bold px-12 py-5 rounded-full text-lg transition-all hover:scale-105" style={{ background: "#0fb8ce" }}>
            Schedule a Strategy Call →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
