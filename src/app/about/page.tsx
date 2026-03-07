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
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#0fb8ce] mb-2">
        {rawNum ? `${prefix}${displayNum}${suffix}` : value}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wide">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#0fb8ce] uppercase tracking-widest text-sm font-semibold mb-4">About Us</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">We Exist to Make Premium Possible</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            The Pine Cone Group is a strategic growth agency that partners with ambitious founders and brands to build the digital presence their business deserves.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <AnimatedStat value="400+" label="Brands Transformed" />
            <AnimatedStat value="94%" label="Client Satisfaction Rate" />
            <AnimatedStat value="180%" label="Avg. Conversion Lift" />
            <AnimatedStat value="$2M+" label="Additional Revenue Generated" />
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Design and Strategy Must Work as One</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Most agencies separate strategy and design — and that's exactly why so many websites fail. You either get a beautiful site that doesn't convert, or a strategic plan with no visual execution to match it.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            At The Pine Cone Group, strategy and design are inseparable. Every visual decision is rooted in business objectives. Every strategic recommendation is brought to life with premium craft. The result is a digital presence that doesn't just look right — it performs.
          </p>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Your Website Is Your First Impression. And Your Sales Team.</h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Buyers research online before ever engaging. Most brands are losing leads, clients, and revenue every day — and they don't even know it. The gap between how good your business actually is and how it appears online is costing you more than you realize.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            We were founded to close that gap — to give ambitious, serious brands the kind of digital presence that builds trust on contact, communicates value at a glance, and turns visitors into buyers.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-14">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Strategy Before Aesthetics", desc: "Beautiful design is meaningless without a strategic foundation. We start with goals, not looks." },
              { title: "Design That Does Business", desc: "Every visual element exists to serve a business objective. No decoration for decoration's sake." },
              { title: "Honesty Over Hype", desc: "We tell you what you need to hear, not what you want to hear. That's how we earn long-term trust." },
              { title: "Premium Craft, Always", desc: "We refuse to produce mediocre work. Every deliverable reflects the standard we'd be proud to put our name on." },
              { title: "Long-Term Relationships", desc: "We're not project vendors. We're growth partners invested in your success beyond the launch date." },
              { title: "Results That Speak", desc: "We measure success by what happens after launch — leads, revenue, and growth for our clients." },
            ].map((v) => (
              <div key={v.title} className="border-l-4 border-[#0fb8ce] pl-6 py-2">
                <h3 className="text-lg font-bold mb-2">{v.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Who We Work With</h2>
          <p className="text-gray-300 text-lg mb-12">We partner with brands that are serious about growth and ready to invest in premium positioning.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-left">
            {[
              "Founders & owners using positioning strategically",
              "Service businesses avoiding price competition",
              "Nonprofits seeking mission credibility",
              "Hospitality brands",
              "Professional practices",
              "Growth-stage companies",
            ].map((t) => (
              <div key={t} className="flex items-start gap-3">
                <span className="text-[#0fb8ce] mt-1">✓</span>
                <span className="text-gray-300 text-sm">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0fb8ce] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-xl mb-10 opacity-90">Let&apos;s build something remarkable.</p>
          <Link href="/contact" className="bg-gray-900 text-[#0fb8ce] font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg inline-block">
            Schedule a Strategy Call
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
