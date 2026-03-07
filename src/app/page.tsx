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
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-[#0fb8ce] mb-2">
        {match ? `${displayNum}${suffix}` : value}
      </div>
      <div className="text-gray-600 text-sm uppercase tracking-wide">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white min-h-[90vh] flex items-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#0fb8ce,_transparent_60%)]" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="text-[#0fb8ce] uppercase tracking-widest text-sm font-semibold mb-6">Strategic Growth Agency</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Your Brand. Elevated.<br />Your Growth. Accelerated.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            The Pine Cone Group helps ambitious brands grow leads and revenue through strategic design, digital storytelling, and premium digital positioning that converts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#0fb8ce] hover:bg-[#0da3b8] text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg">
              Schedule a Strategy Call
            </Link>
            <Link href="/contact" className="border border-white/40 hover:border-white text-white font-semibold px-8 py-4 rounded-full transition-colors text-lg">
              Get Your Free Website Review
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-14 text-sm text-gray-400">
            {["Premium Strategy", "Data-Driven Design", "Conversion-Focused", "White-Glove Service"].map((p) => (
              <span key={p} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0fb8ce] inline-block" />{p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Elfsight Logo Showcase */}
      <section className="py-8 px-6">
        <div className="elfsight-app-d614c863-fdbb-4579-93d7-930fc8e2efd3" data-elfsight-app-lazy />
      </section>

      {/* Stats */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-4">Results That Speak</h2>
          <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">We measure success by the growth we generate for the brands we partner with.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <StatItem value="3x" label="Average Lead Increase" />
            <StatItem value="94%" label="Client Satisfaction Rate" />
            <StatItem value="180%" label="Average Conversion Lift" />
            <StatItem value="400+" label="Brands Transformed" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-4">What We Do</h2>
          <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">Every engagement is built around your specific business goals, market position, and growth trajectory.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Website Design & Development", desc: "High-converting websites that build trust, communicate value, and drive action.", icon: "🌐" },
              { title: "Lead Generation Systems", desc: "Full-funnel systems that attract ideal clients and convert visitors into opportunities.", icon: "⚡" },
              { title: "Strategic Design", desc: "Design as a growth lever — rooted in research, positioning, and measurable objectives.", icon: "🎯" },
              { title: "Branding & Creative Direction", desc: "Complete brand identities that position you as the premium, credible choice.", icon: "✦" },
              { title: "AI Visibility & Search Readiness", desc: "Be found where the future searches — ChatGPT, Perplexity, Google SGE.", icon: "🤖" },
              { title: "Marketing Consulting", desc: "Senior-level strategy and positioning expertise without the overhead.", icon: "📈" },
            ].map((s) => (
              <div key={s.title} className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="inline-block border border-gray-300 hover:border-[#0fb8ce] hover:text-[#0fb8ce] font-semibold px-8 py-3 rounded-full transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-center text-3xl font-bold mb-4">Client Results</h2>
          <p className="text-center text-gray-400 mb-14 max-w-xl mx-auto">Real results for real businesses. No fluff, no vanity metrics.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { client: "Regional HVAC Company", result: "+340% qualified leads in 90 days", quote: "I didn't realize how much our old site was costing us. They helped us become the obvious choice in our market." },
              { client: "Community Foundation", result: "2.8x donor conversion rate", quote: "They understood our mission before we finished explaining it. The result was new credibility we didn't know we were missing." },
              { client: "Farm-to-Table Restaurant", result: "+220% online reservations", quote: "Bookings went through the roof. The site doesn't just look incredible — it actually sells." },
            ].map((c) => (
              <div key={c.client} className="bg-gray-800 rounded-2xl p-8">
                <div className="text-[#0fb8ce] text-2xl font-bold mb-2">{c.result}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide mb-4">{c.client}</div>
                <p className="text-gray-300 italic text-sm leading-relaxed">"{c.quote}"</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/case-studies" className="inline-block border border-gray-600 hover:border-[#0fb8ce] hover:text-[#0fb8ce] font-semibold px-8 py-3 rounded-full transition-colors">
              View All Case Studies
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0fb8ce] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Ready to Elevate Your Brand?</h2>
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
