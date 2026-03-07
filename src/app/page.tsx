"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <div ref={ref} className="text-center py-8">
      <div className="font-playfair text-6xl md:text-7xl font-bold text-[#0fb8ce] mb-3">
        {match ? `${displayNum}${suffix}` : value}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen text-white font-inter" style={{ background: "#0a1118" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center" style={{ background: "linear-gradient(135deg, #080e14 0%, #0d1a20 50%, #0a1118 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(15,184,206,0.08) 0%, transparent 60%)" }} />
        <div className="relative max-w-5xl mx-auto px-6 py-32 text-center w-full">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-[#0fb8ce]/40 rounded-full px-5 py-2 mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0fb8ce] inline-block" />
            <span className="text-[#0fb8ce] uppercase tracking-widest text-xs font-semibold">Strategic Growth Agency</span>
          </div>

          {/* Headline */}
          <h1 className="font-playfair text-6xl md:text-8xl font-bold leading-[1.1] mb-8">
            <span className="text-white">Your Brand.</span><br />
            <span className="text-[#0fb8ce]">Elevated.</span><br />
            <span className="text-white">Your Growth.</span><br />
            <span style={{ color: "#F5A94C" }}>Accelerated.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            The Pine Cone Group helps ambitious brands grow leads and revenue through strategic design, digital storytelling, and premium digital positioning that converts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#0fb8ce] hover:bg-[#0da3b8] text-black font-bold px-10 py-4 rounded-full transition-colors text-lg flex items-center justify-center gap-2">
              Schedule a Strategy Call <span>→</span>
            </Link>
            <Link href="/contact" className="border border-white/20 hover:border-[#0fb8ce] text-white font-semibold px-10 py-4 rounded-full transition-colors text-lg">
              Get Your Free Website Review
            </Link>
          </div>
        </div>
      </section>

      {/* Elfsight Logo Showcase */}
      <section className="py-6" style={{ background: "#080e14" }}>
        <div className="elfsight-app-d614c863-fdbb-4579-93d7-930fc8e2efd3" data-elfsight-app-lazy />
      </section>

      {/* Stats */}
      <section style={{ background: "#080e14", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            <StatItem value="3x" label="Average lead increase for clients" />
            <StatItem value="94%" label="Client satisfaction rate" />
            <StatItem value="180%" label="Average conversion lift" />
            <StatItem value="400+" label="Brands transformed" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24" style={{ background: "#0a1118" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-[#0fb8ce] uppercase tracking-widest text-xs font-semibold mb-4">What We Do</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white max-w-xl leading-tight">
                Every Service Built to Grow Your Business
              </h2>
              <Link href="/services" className="text-[#0fb8ce] hover:underline flex items-center gap-2 font-semibold whitespace-nowrap">
                View all services <span>→</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Website Design & Development", desc: "High-converting websites that build trust, communicate value, and drive action.", icon: "🌐" },
              { title: "Lead Generation Systems", desc: "Full-funnel systems that attract ideal clients and convert visitors into opportunities.", icon: "⚡" },
              { title: "Strategic Design", desc: "Design as a growth lever — rooted in research, positioning, and measurable objectives.", icon: "🎯" },
              { title: "Branding & Creative Direction", desc: "Complete brand identities that position you as the premium, credible choice.", icon: "✦" },
              { title: "AI Visibility & Search Readiness", desc: "Be found where the future searches — ChatGPT, Perplexity, Google SGE.", icon: "🤖" },
              { title: "Marketing Consulting", desc: "Senior-level strategy and positioning expertise without the overhead.", icon: "📈" },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl p-8 transition-colors hover:bg-white/5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-3xl mb-5">{s.icon}</div>
                <h3 className="font-playfair text-xl font-bold mb-3 text-white">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24" style={{ background: "#080e14" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <p className="text-[#0fb8ce] uppercase tracking-widest text-xs font-semibold mb-4">Client Outcomes</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <h2 className="font-playfair text-4xl md:text-6xl font-bold text-white leading-tight">
                Real Brands.<br />Real Results.
              </h2>
              <Link href="/case-studies" className="text-[#0fb8ce] hover:underline flex items-center gap-2 font-semibold whitespace-nowrap">
                All case studies <span>→</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { tag: "Local Service Business", client: "Regional HVAC Company", metric: "+340%", metricLabel: "Qualified leads in 90 days", quote: "I didn't realize how much our old site was costing us. They helped us become the obvious choice in our market." },
              { tag: "Nonprofit", client: "Community Foundation", metric: "2.8x", metricLabel: "Donor conversion rate", quote: "They understood our mission before we finished explaining it. The result was new credibility we didn't know we were missing." },
              { tag: "Restaurant & Hospitality", client: "Farm-to-Table Restaurant", metric: "+220%", metricLabel: "Online reservations in 6 months", quote: "Bookings went through the roof. The site doesn't just look incredible — it actually sells." },
            ].map((c) => (
              <div key={c.client} className="rounded-2xl p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="inline-block border border-[#0fb8ce]/30 text-[#0fb8ce] text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-6">{c.tag}</div>
                <div className="font-playfair text-5xl font-bold text-[#0fb8ce] mb-1">{c.metric}</div>
                <div className="text-white font-semibold mb-1">{c.client}</div>
                <div className="text-gray-400 text-sm mb-6">{c.metricLabel}</div>
                <p className="text-gray-400 italic text-sm leading-relaxed border-l-2 border-[#0fb8ce]/30 pl-4">"{c.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center" style={{ background: "linear-gradient(135deg, #0d1a20 0%, #0a1118 100%)" }}>
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-[#0fb8ce] uppercase tracking-widest text-xs font-semibold mb-6">Ready to Grow?</p>
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-white mb-6">
            Let&apos;s Build Something Remarkable
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Schedule a free strategy call and discover exactly what&apos;s possible for your brand.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#0fb8ce] hover:bg-[#0da3b8] text-black font-bold px-12 py-5 rounded-full transition-colors text-lg">
            Schedule a Strategy Call <span>→</span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
