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

  return (
    <span ref={ref}>
      {rawNum ? `${prefix}${displayNum}${suffix}` : value}
    </span>
  );
}

const caseStudies = [
  {
    label: "Local Service Business",
    client: "Regional Home Services Company, Southeast U.S.",
    industry: "HVAC / Home Services",
    challenge: "Strong technicians and great reviews — but a five-year-old website that looked outdated on mobile and generated almost no online inquiries. Competitors with inferior service were winning jobs because of superior online credibility.",
    solution: "Repositioned the brand as the premium HVAC provider in their market through trust architecture that emphasized reliability and professionalism over price competition.",
    actions: [
      "Complete website redesign with trust-first layout",
      "Professional photography and brand direction",
      "Before/after case gallery with review integration",
      "Service-area-specific landing pages for SEO",
      "Emergency service call-to-action system",
      "Google Business Profile optimization",
      "Lead nurture sequence for estimate requests",
    ],
    metrics: [
      { value: "+300%", label: "Qualified Leads (90 days)" },
      { value: "3.4x", label: "More Qualified Service Requests" },
    ],
    quote: "I didn't realize how much our old site was costing us. The Pine Cone Group didn't just build us a website — they helped us become the obvious choice in our market.",
    attribution: "Company Owner",
  },
  {
    label: "Nonprofit Organization",
    client: "Community Nonprofit Foundation, Pacific Northwest",
    industry: "Nonprofit / Philanthropy",
    challenge: "A powerful mission held back by a dated, amateurish digital presence that undermined donor trust during the most critical giving moments. Major donors were withdrawing; small donors weren't converting.",
    solution: "Approached as a trust and storytelling challenge first. Created an emotionally resonant digital experience that showed donors exactly how their contribution made a difference.",
    actions: [
      "Mission-first narrative rewrite and messaging strategy",
      "Impact-driven homepage with real story integration",
      "Optimized donation flow with milestone anchoring",
      "Donor journey email sequence",
      "Annual report landing page with visual storytelling",
      "Recurring giving program positioning and UX",
      "Mobile-optimized giving experience",
    ],
    metrics: [
      { value: "+180%", label: "Online Donations (Year 1)" },
      { value: "3.1x", label: "Recurring Donor Growth" },
    ],
    quote: "They understood our mission before we finished explaining it. The result wasn't just a better website — it was new credibility we didn't know we were missing.",
    attribution: "Executive Director",
  },
  {
    label: "Restaurant & Hospitality",
    client: "Farm-to-Table Restaurant, Southeast U.S.",
    industry: "Restaurant / Hospitality",
    challenge: "Exceptional food and a beautiful space — but a digital presence that felt flat and functional. Outdated photography, no clear story, and missed opportunities for high-value guest attraction and private event bookings.",
    solution: "Positioned the restaurant as a destination experience rather than a dining option. Created appetite-driven storytelling with digital atmospherics that matched the in-person experience.",
    actions: [
      "Complete brand refresh with editorial identity system",
      "Professional food and atmosphere photography direction",
      "Immersive homepage with seasonal story integration",
      "Seamless reservation integration with conversion UX",
      "Dedicated private events landing page",
      "Chef's story and sourcing narrative content",
      "Email capture and VIP dining list system",
    ],
    metrics: [
      { value: "+220%", label: "Online Reservations (6 months)" },
      { value: "+85%", label: "Private Event Inquiries" },
    ],
    quote: "Bookings went through the roof. The site doesn't just look incredible — it actually sells. That combination is rare.",
    attribution: "Owner & Head Chef",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#0fb8ce] uppercase tracking-widest text-sm font-semibold mb-4">Case Studies</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Real Results for Real Businesses</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            No fluff, no vanity metrics. Here&apos;s what happens when strategy and premium craft work together.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 space-y-20">
          {caseStudies.map((cs, i) => (
            <div key={cs.client} className={`rounded-2xl overflow-hidden border border-gray-100 shadow-sm`}>
              <div className="bg-gray-900 text-white px-8 py-6">
                <p className="text-[#0fb8ce] text-sm uppercase tracking-wide font-semibold mb-1">{cs.label}</p>
                <h2 className="text-2xl font-bold">{cs.industry}</h2>
                <p className="text-gray-400 text-sm mt-1">{cs.client}</p>
              </div>
              <div className="p-8">
                {/* Metrics */}
                <div className="flex flex-wrap gap-8 mb-8">
                  {cs.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="text-3xl font-bold text-[#0fb8ce]">
                        <AnimatedMetric value={m.value} />
                      </div>
                      <div className="text-gray-500 text-sm">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-bold text-lg mb-3">The Challenge</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{cs.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-3">Our Approach</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{cs.solution}</p>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-bold text-lg mb-3">What We Did</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {cs.actions.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-[#0fb8ce] mt-0.5">✓</span>{a}
                      </li>
                    ))}
                  </ul>
                </div>

                <blockquote className="mt-8 border-l-4 border-[#0fb8ce] pl-6 italic text-gray-600">
                  &ldquo;{cs.quote}&rdquo;
                  <footer className="text-sm text-gray-400 mt-2 not-italic">— {cs.attribution}</footer>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0fb8ce] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Want Results Like These?</h2>
          <p className="text-xl mb-10 opacity-90">Let&apos;s talk about what&apos;s possible for your business.</p>
          <Link href="/contact" className="bg-white text-[#0fb8ce] font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg inline-block">
            Schedule a Strategy Call
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
