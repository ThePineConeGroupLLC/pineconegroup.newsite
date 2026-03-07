"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, Zap, Target, Palette, Bot, TrendingUp } from "lucide-react";

const BG = "#0b1a18";
const BG2 = "#0f2320";
const CARD = "#132420";

// Animated counter hook
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

function StatItem({ value, label, large = false }: { value: string; label: string; large?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const match = value.match(/^([+]?)([0-9.]+)(.*)$/);
  const prefix = match ? match[1] : "";
  const numericPart = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : value;
  const isDecimal = match ? match[2].includes(".") : false;
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
    <div ref={ref} className={large ? "" : "text-center py-10 px-4"}>
      <div className={`font-playfair font-black text-[#0fb8ce] leading-none ${large ? "" : "text-4xl md:text-6xl lg:text-7xl mb-3"}`}
        style={large ? { fontSize: "clamp(2rem, 8vw, 3.5rem)" } : undefined}>
        {match ? `${prefix}${displayNum}${suffix}` : value}
      </div>
      {label && <div className="text-gray-400 text-xs uppercase tracking-widest leading-relaxed">{label}</div>}
    </div>
  );
}

// Fade-in on scroll
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  // Hero text stagger animation
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-clip" style={{ background: BG, fontFamily: "var(--font-inter)" }}>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: `linear-gradient(160deg, #0a1614 0%, ${BG} 60%)` }}>
        {/* Animated background orbs — clipped inside section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-0 w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl" style={{ background: "rgba(15,184,206,0.08)", animation: "pulse 6s ease-in-out infinite", willChange: "transform" }} />
          <div className="absolute bottom-1/3 left-0 w-48 h-48 md:w-64 md:h-64 rounded-full blur-3xl" style={{ background: "rgba(255,235,183,0.05)", animation: "pulse 8s ease-in-out infinite 2s", willChange: "transform" }} />
        </div>

        <div className="relative max-w-2xl mx-auto px-6 py-28 md:py-40 text-center w-full">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-3 rounded-full px-4 py-2 mb-10 max-w-full"
            style={{
              background: "rgba(15,184,206,0.1)",
              border: "1px solid rgba(15,184,206,0.35)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0ms, transform 0.6s ease 0ms",
            }}
          >
            <span className="w-2 h-2 rounded-full bg-[#0fb8ce] inline-block animate-pulse" />
            <span className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold">Strategic Growth Agency</span>
          </div>

          {/* Headline */}
          <h1
            className="font-playfair font-black leading-[1.05] mb-8"
            style={{
              fontSize: "clamp(2.2rem, 9vw, 5.5rem)",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.7s ease 150ms, transform 0.7s ease 150ms",
            }}
          >
            <span className="text-white">Your Brand.</span><br />
            <span className="text-[#0fb8ce] italic">Elevated.</span><br />
            <span className="text-white">Your Growth.</span><br />
            <span className="italic" style={{ color: "#ffebb7" }}>Accelerated.</span>
          </h1>

          <p
            className="text-gray-400 text-lg leading-relaxed mb-12 max-w-lg mx-auto"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease 300ms, transform 0.7s ease 300ms",
            }}
          >
            The Pine Cone Group helps ambitious brands grow leads and revenue through strategic design, digital storytelling, and premium digital positioning that converts.
          </p>

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
              transition: "opacity 0.7s ease 450ms, transform 0.7s ease 450ms",
            }}
          >
            <a href="https://calendar.app.google/QZoctWL6MPGEzBds9" target="_blank" rel="noopener noreferrer" className="cta-btn inline-flex items-center justify-center gap-3 text-black font-bold px-8 py-4 md:px-10 md:py-5 rounded-full text-base md:text-lg w-full sm:w-auto">
              Schedule a Strategy Call →
            </a>
          </div>
        </div>
      </section>

      {/* Logo Showcase */}
      <section className="py-10" style={{ background: BG2, borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="relative">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: `linear-gradient(to right, ${BG2}, transparent)` }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 pointer-events-none" style={{ background: `linear-gradient(to left, ${BG2}, transparent)` }} />
          <div className="elfsight-app-d614c863-fdbb-4579-93d7-930fc8e2efd3" data-elfsight-app-lazy />
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: BG, borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: "3x", label: "Average lead increase for clients" },
              { value: "94%", label: "Client satisfaction rate" },
              { value: "180%", label: "Average conversion lift" },
              { value: "400+", label: "Brands transformed" },
            ].map((s) => (
              <div key={s.label}>
                <StatItem value={s.value} label={s.label} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6" style={{ background: BG2 }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-5">What We Do</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <h2 className="font-playfair font-black text-white leading-tight" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}>
                Every Service Built<br />to Grow Your Business
              </h2>
              <Link href="/services" className="text-[#0fb8ce] hover:underline flex items-center gap-2 font-semibold whitespace-nowrap text-sm">
                View all services →
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { title: "Website Design & Development", desc: "High-converting websites that build trust, communicate value, and drive action.", icon: Globe },
              { title: "Lead Generation Systems", desc: "Full-funnel systems that attract ideal clients and convert visitors into opportunities.", icon: Zap },
              { title: "Strategic Design", desc: "Design as a growth lever — rooted in research, positioning, and measurable objectives.", icon: Target },
              { title: "Branding & Creative Direction", desc: "Complete brand identities that position you as the premium, credible choice.", icon: Palette },
              { title: "AI Visibility & Search Readiness", desc: "Be found where the future searches — ChatGPT, Perplexity, Google SGE.", icon: Bot },
              { title: "Marketing Consulting", desc: "Senior-level strategy and positioning expertise without the overhead.", icon: TrendingUp },
            ].map((s, i) => (
              <FadeIn key={s.title} delay={i * 80}>
                <div className="rounded-2xl p-7 h-full transition-all duration-300 hover:scale-[1.03] hover:border-[#0fb8ce]/40 group" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(15,184,206,0.12)", border: "1px solid rgba(15,184,206,0.25)" }}>
                    <s.icon size={20} color="#0fb8ce" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair font-bold text-white text-xl mb-3">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 px-6" style={{ background: BG }}>
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-5">Client Outcomes</p>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
              <h2 className="font-playfair font-black text-white leading-tight" style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}>
                Real Brands.<br />Real Results.
              </h2>
              <Link href="/case-studies" className="text-[#0fb8ce] hover:underline flex items-center gap-2 font-semibold whitespace-nowrap text-sm">
                All case studies →
              </Link>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { tag: "Local Service Business", client: "Regional HVAC Company", metric: "+340%", metricLabel: "Qualified Leads in 90 Days", quote: "I didn't realize how much our old site was costing us. They helped us become the obvious choice in our market." },
              { tag: "Nonprofit", client: "Community Foundation", metric: "2.8x", metricLabel: "Donor Conversion Rate", quote: "They understood our mission before we finished explaining it. The result was new credibility we didn't know we were missing." },
              { tag: "Restaurant & Hospitality", client: "Farm-to-Table Restaurant", metric: "+220%", metricLabel: "Online Reservations in 6 Months", quote: "Bookings went through the roof. The site doesn't just look incredible — it actually sells." },
            ].map((c, i) => (
              <FadeIn key={c.client} delay={i * 100}>
                <div className="rounded-2xl p-7 h-full transition-all duration-300 hover:scale-[1.02] hover:border-[#0fb8ce]/30" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-6" style={{ background: "rgba(15,184,206,0.12)", border: "1px solid rgba(15,184,206,0.25)" }}>
                    <span className="text-[#0fb8ce] text-xs uppercase tracking-[0.15em] font-bold">{c.tag}</span>
                  </div>
                  <h3 className="font-playfair font-bold text-white text-xl mb-1">{c.client}</h3>
                  <p className="text-gray-400 text-sm mb-4">{c.metricLabel}</p>
                  <div className="mb-5"><StatItem value={c.metric} label="" large /></div>
                  <p className="text-gray-400 italic text-sm leading-relaxed border-l-2 border-[#0fb8ce]/30 pl-4">&ldquo;{c.quote}&rdquo;</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Free Review */}
      <section className="py-24 px-6" style={{ background: BG2, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: "1px solid rgba(15,184,206,0.2)", boxShadow: "0 0 60px rgba(15,184,206,0.07)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-7 md:p-14">
                  <h2 className="font-playfair font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)" }}>
                    Free Website Performance Review
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    Discover exactly how your website is performing across design quality, lead conversion, mobile experience, and AI visibility — and see what&apos;s possible with a strategic upgrade.
                  </p>
                  <Link href="/free-review" className="cta-btn inline-flex items-center gap-3 text-black font-bold px-8 py-4 rounded-full">
                    Run My Free Review →
                  </Link>
                </div>
                <div className="p-8 md:p-14 flex flex-col justify-center gap-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} >
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
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center px-6 relative overflow-hidden" style={{ background: BG2, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(15,184,206,0.06) 0%, transparent 70%)" }} />
        <FadeIn className="relative max-w-2xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-6">Ready to Grow?</p>
          <h2 className="font-playfair font-black text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}>
            Let&apos;s Build Something Remarkable
          </h2>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            Schedule a free strategy call and discover exactly what&apos;s possible for your brand.
          </p>
          <a href="https://calendar.app.google/QZoctWL6MPGEzBds9" target="_blank" rel="noopener noreferrer" className="cta-btn inline-flex items-center gap-3 text-black font-bold px-12 py-5 rounded-full text-lg">
            Schedule a Strategy Call →
          </a>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
