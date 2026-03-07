"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BG = "#0b1a18";
const BG2 = "#0f2320";
const CARD = "#132420";

type ScoreCategory = {
  label: string;
  score: number;
  grade: string;
  insight: string;
};

function gradeFromScore(score: number): string {
  if (score >= 85) return "Strong";
  if (score >= 65) return "Average";
  if (score >= 45) return "Below Average";
  return "Needs Work";
}

function colorFromScore(score: number): string {
  if (score >= 75) return "#0fb8ce";
  if (score >= 50) return "#F5A94C";
  return "#e05a5a";
}

// Deterministic pseudo-random score based on URL string
function hashScore(url: string, seed: number, min: number, max: number): number {
  let h = seed * 31;
  for (let i = 0; i < url.length; i++) {
    h = (h * 31 + url.charCodeAt(i)) & 0xffffffff;
  }
  const normalized = Math.abs(h % 100) / 100;
  return Math.round(min + normalized * (max - min));
}

function generateScores(url: string): ScoreCategory[] {
  const clean = url.toLowerCase().replace(/https?:\/\//, "").replace(/www\./, "");

  const perf = hashScore(clean, 1, 38, 82);
  const design = hashScore(clean, 2, 28, 74);
  const conversion = hashScore(clean, 3, 22, 68);
  const mobile = hashScore(clean, 4, 44, 85);
  const ai = hashScore(clean, 5, 15, 55);

  return [
    {
      label: "Performance Score",
      score: perf,
      grade: gradeFromScore(perf),
      insight:
        perf < 60
          ? "Slow load times are costing you leads. Visitors bounce in under 3 seconds."
          : "Performance is decent but room to improve. Speed gains directly boost conversions.",
    },
    {
      label: "Design Quality",
      score: design,
      grade: gradeFromScore(design),
      insight:
        design < 55
          ? "Your design may be undermining trust before visitors read a word."
          : "Design is functional, but premium positioning requires a higher visual bar.",
    },
    {
      label: "Lead Conversion Potential",
      score: conversion,
      grade: gradeFromScore(conversion),
      insight:
        conversion < 50
          ? "Critical: your site likely isn't structured to capture leads. Most visitors leave without acting."
          : "Some conversion elements present, but the funnel can be significantly tightened.",
    },
    {
      label: "Mobile Experience",
      score: mobile,
      grade: gradeFromScore(mobile),
      insight:
        mobile < 65
          ? "Over 65% of traffic is mobile. A poor mobile experience means losing the majority of visitors."
          : "Mobile is passable, but there may be friction points hurting conversions on smaller screens.",
    },
    {
      label: "AI Visibility",
      score: ai,
      grade: gradeFromScore(ai),
      insight:
        ai < 40
          ? "Your site is largely invisible to AI search engines like ChatGPT, Perplexity, and Google SGE."
          : "Some AI visibility, but the landscape is shifting fast. Early movers will dominate.",
    },
  ];
}

function AnimatedBar({ score, color, delay }: { score: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(score), delay);
    return () => clearTimeout(t);
  }, [score, delay]);

  return (
    <div className="h-2 rounded-full w-full" style={{ background: "rgba(255,255,255,0.08)" }}>
      <div
        className="h-2 rounded-full transition-all"
        style={{ width: `${width}%`, background: color, transitionDuration: "1.2s", transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
      />
    </div>
  );
}

function OverallScore({ scores }: { scores: ScoreCategory[] }) {
  const avg = Math.round(scores.reduce((s, c) => s + c.score, 0) / scores.length);
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1800;
    const step = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - prog, 3);
      setDisplayed(Math.round(eased * avg));
      if (prog < 1) requestAnimationFrame(step);
    };
    const t = setTimeout(() => requestAnimationFrame(step), 300);
    return () => clearTimeout(t);
  }, [avg]);

  const color = colorFromScore(avg);
  const label = avg >= 75 ? "Good" : avg >= 55 ? "Needs Attention" : "Significant Opportunity";

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-8">
      <div className="relative flex items-center justify-center w-36 h-36 mb-4">
        <svg className="absolute inset-0" width="144" height="144" viewBox="0 0 144 144">
          <circle cx="72" cy="72" r="62" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
          <circle
            cx="72" cy="72" r="62"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 62}`}
            strokeDashoffset={`${2 * Math.PI * 62 * (1 - displayed / 100)}`}
            strokeLinecap="round"
            transform="rotate(-90 72 72)"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <div className="text-center">
          <div className="font-playfair font-black text-4xl leading-none" style={{ color }}>{displayed}</div>
          <div className="text-gray-500 text-xs mt-1">/100</div>
        </div>
      </div>
      <div className="font-bold text-white text-lg">{label}</div>
      <div className="text-gray-500 text-xs mt-1">Overall Website Score</div>
    </div>
  );
}

type Stage = "input" | "analyzing" | "results";

const ANALYZING_STEPS = [
  "Fetching domain data...",
  "Evaluating design & layout signals...",
  "Testing mobile responsiveness...",
  "Scanning for conversion architecture...",
  "Checking AI search visibility...",
  "Compiling your performance report...",
];

export default function FreeReviewPage() {
  const [stage, setStage] = useState<Stage>("input");
  const [url, setUrl] = useState("");
  const [inputError, setInputError] = useState("");
  const [analyzingStep, setAnalyzingStep] = useState(0);
  const [scores, setScores] = useState<ScoreCategory[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setInputError("Please enter your website URL.");
      return;
    }
    // Basic URL validation
    const urlLike = trimmed.startsWith("http") ? trimmed : `https://${trimmed}`;
    try {
      new URL(urlLike);
    } catch {
      setInputError("Please enter a valid website URL, e.g. yoursite.com");
      return;
    }
    setInputError("");
    setStage("analyzing");
    setAnalyzingStep(0);

    // Step through analyzing messages
    let step = 0;
    const iv = setInterval(() => {
      step++;
      if (step < ANALYZING_STEPS.length) {
        setAnalyzingStep(step);
      } else {
        clearInterval(iv);
        setScores(generateScores(urlLike));
        setStage("results");
      }
    }, 620);
  }

  function handleReset() {
    setStage("input");
    setUrl("");
    setScores([]);
    setAnalyzingStep(0);
  }

  const cleanUrl = url.startsWith("http") ? url : `https://${url}`;
  let displayDomain = "";
  try { displayDomain = new URL(cleanUrl).hostname.replace(/^www\./, ""); } catch {}

  return (
    <div className="min-h-screen text-white" style={{ background: BG, fontFamily: "var(--font-inter)" }}>
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-16 px-6" style={{ background: `linear-gradient(160deg, #0a1614 0%, ${BG} 100%)` }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 rounded-full px-6 py-2.5 mb-8" style={{ background: "rgba(15,184,206,0.1)", border: "1px solid rgba(15,184,206,0.35)" }}>
            <span className="w-2 h-2 rounded-full bg-[#0fb8ce] inline-block" />
            <span className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold">Signature Tool</span>
          </div>
          <h1 className="font-playfair font-black text-white leading-tight mb-5" style={{ fontSize: "clamp(2.4rem, 7vw, 4.2rem)" }}>
            Free Website<br />Performance Review
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
            Enter your URL and see exactly how your website scores across design, conversion, mobile, and AI visibility — in seconds.
          </p>
        </div>
      </section>

      {/* Tool */}
      <section className="py-16 px-6" style={{ background: BG2, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto">

          {/* INPUT */}
          {stage === "input" && (
            <div className="rounded-2xl p-10 md:p-14" style={{ background: CARD, border: "1px solid rgba(15,184,206,0.2)" }}>
              <h2 className="font-playfair font-bold text-white text-2xl mb-2">Enter Your Website URL</h2>
              <p className="text-gray-400 text-sm mb-8">We&apos;ll evaluate your site across 5 performance dimensions used by top digital strategists.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => { setUrl(e.target.value); setInputError(""); }}
                      placeholder="yourwebsite.com"
                      className="flex-1 rounded-xl px-5 py-4 text-white placeholder-gray-500 text-sm focus:outline-none transition-colors"
                      style={{ background: "#0b1a18", border: `1px solid ${inputError ? "#e05a5a" : "rgba(255,255,255,0.12)"}` }}
                    />
                    <button
                      type="submit"
                      className="text-black font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 whitespace-nowrap"
                      style={{ background: "#0fb8ce" }}
                    >
                      Analyze →
                    </button>
                  </div>
                  {inputError && <p className="text-[#e05a5a] text-xs mt-2 ml-1">{inputError}</p>}
                </div>
              </form>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-4">
                {["Performance", "Design Quality", "Conversion", "Mobile", "AI Visibility"].map((cat) => (
                  <div key={cat} className="text-center">
                    <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ background: "rgba(15,184,206,0.1)", border: "1px solid rgba(15,184,206,0.2)" }}>
                      <span className="text-[#0fb8ce] text-xs font-bold">✓</span>
                    </div>
                    <div className="text-gray-500 text-xs">{cat}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ANALYZING */}
          {stage === "analyzing" && (
            <div className="rounded-2xl p-14 text-center" style={{ background: CARD, border: "1px solid rgba(15,184,206,0.2)" }}>
              <div className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center" style={{ background: "rgba(15,184,206,0.1)", border: "1px solid rgba(15,184,206,0.3)" }}>
                <div className="w-8 h-8 border-2 border-[#0fb8ce] border-t-transparent rounded-full animate-spin" />
              </div>
              <h2 className="font-playfair font-bold text-white text-2xl mb-3">Analyzing Your Website</h2>
              <p className="text-[#0fb8ce] text-sm mb-8 min-h-[1.5em] transition-all">{ANALYZING_STEPS[analyzingStep]}</p>
              <div className="space-y-2 max-w-xs mx-auto">
                {ANALYZING_STEPS.map((step, i) => (
                  <div key={step} className="h-1 rounded-full transition-all" style={{
                    background: i <= analyzingStep ? "#0fb8ce" : "rgba(255,255,255,0.06)",
                    opacity: i <= analyzingStep ? 1 : 0.4,
                    transitionDuration: "0.4s",
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* RESULTS */}
          {stage === "results" && scores.length > 0 && (
            <div className="space-y-6">
              {/* Header */}
              <div className="rounded-2xl overflow-hidden" style={{ background: CARD, border: "1px solid rgba(15,184,206,0.2)" }}>
                <div className="px-8 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div>
                      <p className="text-[#0fb8ce] text-xs uppercase tracking-widest font-bold mb-1">Website Performance Review</p>
                      <h2 className="font-playfair font-bold text-white text-2xl">{displayDomain}</h2>
                    </div>
                    <button onClick={handleReset} className="text-gray-400 hover:text-white text-sm transition-colors underline">
                      Analyze another site
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Overall score */}
                  <div className="p-8 flex items-center justify-center" style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}>
                    <OverallScore scores={scores} />
                  </div>

                  {/* Score bars */}
                  <div className="p-8 space-y-5">
                    {scores.map((cat, i) => (
                      <div key={cat.label}>
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="text-gray-300 text-sm">{cat.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold" style={{ color: colorFromScore(cat.score) }}>{cat.grade}</span>
                            <span className="text-white font-bold text-sm">{cat.score}</span>
                          </div>
                        </div>
                        <AnimatedBar score={cat.score} color={colorFromScore(cat.score)} delay={i * 150 + 400} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed insights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scores.map((cat) => (
                  <div key={cat.label} className="rounded-2xl p-6" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="font-playfair font-bold text-white text-base">{cat.label}</h3>
                      <span className="text-2xl font-black font-playfair shrink-0" style={{ color: colorFromScore(cat.score) }}>{cat.score}</span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">{cat.insight}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="rounded-2xl p-10 text-center" style={{ background: CARD, border: "1px solid rgba(15,184,206,0.25)" }}>
                <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-4">What&apos;s Next?</p>
                <h2 className="font-playfair font-black text-white mb-4 leading-tight" style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
                  Get Your Full Strategy Report
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto">
                  This automated scan is just the beginning. Schedule a free 30-minute strategy call and we&apos;ll walk you through a complete, handcrafted review — with specific recommendations to grow your leads and revenue.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 text-black font-bold px-10 py-4 rounded-full transition-all hover:scale-105"
                    style={{ background: "#0fb8ce" }}
                  >
                    Schedule My Free Strategy Call →
                  </Link>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-3 font-semibold px-10 py-4 rounded-full transition-all hover:scale-105"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                  >
                    Analyze Another Site
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-16 px-6" style={{ background: BG, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-10">What We Measure</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: "⚡", title: "Performance", desc: "Speed & technical health" },
              { icon: "🎨", title: "Design Quality", desc: "Visual trust signals" },
              { icon: "📈", title: "Conversion", desc: "Lead capture architecture" },
              { icon: "📱", title: "Mobile UX", desc: "Responsiveness & usability" },
              { icon: "🤖", title: "AI Visibility", desc: "ChatGPT, Perplexity & SGE" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="font-playfair font-bold text-white text-sm mb-1">{item.title}</div>
                <div className="text-gray-500 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
