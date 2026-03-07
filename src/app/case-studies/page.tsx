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

function AnimatedMetric({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const prefixMatch = value.match(/^([+$]?)([0-9.]+)(.*)$/);
  const prefix = prefixMatch ? prefixMatch[1] : "";
  const rawNum = prefixMatch ? prefixMatch[2] : "";
  const suffix = prefixMatch ? prefixMatch[3] : value;
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

  return <span ref={ref}>{rawNum ? `${prefix}${displayNum}${suffix}` : value}</span>;
}

const caseStudies = [
  {
    tag: "Local Service Business",
    client: "Regional Home Services Company, Southeast U.S.",
    industry: "HVAC / Home Services",
    challenge: "Strong technicians and great reviews — but a five-year-old website that looked outdated on mobile and generated almost no online inquiries. Competitors with inferior service were winning jobs because of superior online credibility.",
    solution: "Repositioned the brand as the premium HVAC provider through trust architecture that emphasized reliability and professionalism over price competition.",
    actions: ["Complete website redesign with trust-first layout", "Professional photography and brand direction", "Before/after case gallery with review integration", "Service-area-specific landing pages for SEO", "Emergency service call-to-action system", "Google Business Profile optimization", "Lead nurture sequence for estimate requests"],
    metrics: [{ value: "+300%", label: "Qualified Leads (90 days)" }, { value: "3.4x", label: "More Qualified Service Requests" }],
    quote: "I didn't realize how much our old site was costing us. The Pine Cone Group didn't just build us a website — they helped us become the obvious choice in our market.",
    attribution: "Company Owner",
  },
  {
    tag: "Nonprofit Organization",
    client: "Community Nonprofit Foundation, Pacific Northwest",
    industry: "Nonprofit / Philanthropy",
    challenge: "A powerful mission held back by a dated, amateurish digital presence that undermined donor trust during the most critical giving moments.",
    solution: "Approached as a trust and storytelling challenge first. Created an emotionally resonant digital experience that showed donors exactly how their contribution made a difference.",
    actions: ["Mission-first narrative rewrite and messaging strategy", "Impact-driven homepage with real story integration", "Optimized donation flow with milestone anchoring", "Donor journey email sequence", "Annual report landing page with visual storytelling", "Recurring giving program positioning and UX", "Mobile-optimized giving experience"],
    metrics: [{ value: "+180%", label: "Online Donations (Year 1)" }, { value: "3.1x", label: "Recurring Donor Growth" }],
    quote: "They understood our mission before we finished explaining it. The result wasn't just a better website — it was new credibility we didn't know we were missing.",
    attribution: "Executive Director",
  },
  {
    tag: "Restaurant & Hospitality",
    client: "Farm-to-Table Restaurant, Southeast U.S.",
    industry: "Restaurant / Hospitality",
    challenge: "Exceptional food and a beautiful space — but a digital presence that felt flat and functional. Outdated photography, no clear story, and missed private event bookings.",
    solution: "Positioned the restaurant as a destination experience rather than a dining option. Created appetite-driven storytelling with digital atmospherics.",
    actions: ["Complete brand refresh with editorial identity system", "Professional food and atmosphere photography direction", "Immersive homepage with seasonal story integration", "Seamless reservation integration with conversion UX", "Dedicated private events landing page", "Chef's story and sourcing narrative content", "Email capture and VIP dining list system"],
    metrics: [{ value: "+220%", label: "Online Reservations (6 months)" }, { value: "+85%", label: "Private Event Inquiries" }],
    quote: "Bookings went through the roof. The site doesn't just look incredible — it actually sells. That combination is rare.",
    attribution: "Owner & Head Chef",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: BG }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden" style={{ background: `linear-gradient(160deg, #0a1614 0%, ${BG} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-0 w-72 h-72 md:w-[460px] md:h-[460px] rounded-full blur-3xl" style={{ background: "rgba(15,184,206,0.09)", animation: "pulse 8s ease-in-out infinite" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 rounded-full blur-3xl" style={{ background: "rgba(245,169,76,0.07)", animation: "pulse 10s ease-in-out infinite 1.5s" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(15,184,206,0.06) 0%, transparent 60%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 mb-6" style={{ background: "rgba(15,184,206,0.1)", border: "1px solid rgba(15,184,206,0.35)" }}>
            <span className="w-2 h-2 rounded-full bg-[#0fb8ce] inline-block animate-pulse" />
            <span className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold">Client Outcomes</span>
          </div>
          <h1 className="font-playfair font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            Real Brands.<br /><span style={{ color: "#0fb8ce" }}>Real Results.</span>
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
            No fluff, no vanity metrics. Here&apos;s what happens when strategy and premium craft work together.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-6" style={{ background: BG2 }}>
        <div className="max-w-5xl mx-auto space-y-10">
          {caseStudies.map((cs) => (
            <div key={cs.client} className="rounded-2xl overflow-hidden" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="px-8 py-6" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="inline-flex items-center rounded-full px-4 py-1.5 mb-4" style={{ background: "rgba(15,184,206,0.12)", border: "1px solid rgba(15,184,206,0.25)" }}>
                  <span className="text-[#0fb8ce] text-xs uppercase tracking-[0.15em] font-bold">{cs.tag}</span>
                </div>
                <h2 className="font-playfair font-bold text-white text-2xl mb-1">{cs.industry}</h2>
                <p className="text-gray-400 text-sm">{cs.client}</p>
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-8 mb-8">
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-playfair font-black text-[#0fb8ce] leading-none mb-1" style={{ fontSize: "clamp(1.8rem, 6vw, 3rem)" }}>
                        <AnimatedMetric value={m.value} />
                      </div>
                      <div className="text-gray-400 text-sm">{m.label}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-playfair font-bold text-white text-lg mb-3">The Challenge</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{cs.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-playfair font-bold text-white text-lg mb-3">Our Approach</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{cs.solution}</p>
                  </div>
                </div>
                <div className="mb-8">
                  <h3 className="font-playfair font-bold text-white text-lg mb-4">What We Did</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {cs.actions.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-gray-400">
                        <Check size={14} color="#0fb8ce" className="mt-0.5 shrink-0" strokeWidth={2.5} />{a}
                      </li>
                    ))}
                  </ul>
                </div>
                <blockquote className="border-l-2 border-[#0fb8ce]/40 pl-6 italic text-gray-400 text-sm leading-relaxed">
                  &ldquo;{cs.quote}&rdquo;
                  <footer className="text-gray-500 mt-2 not-italic">— {cs.attribution}</footer>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center px-6" style={{ background: BG, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-6">Your Turn</p>
          <h2 className="font-playfair font-black text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)" }}>
            Want Results Like These?
          </h2>
          <p className="text-gray-400 text-lg mb-12">Let&apos;s talk about what&apos;s possible for your business.</p>
          <a href="https://calendar.app.google/QZoctWL6MPGEzBds9" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-black font-bold px-12 py-5 rounded-full text-lg transition-all hover:scale-105" style={{ background: "#0fb8ce" }}>
            Schedule a Strategy Call →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
