"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const ringKeyframes = `
@keyframes logoRing {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.12); }
}
@keyframes logoCoreGlow {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.65; }
}
`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{ringKeyframes}</style>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "rgba(11,26,24,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20 md:h-28">
          <Link href="/" className="flex items-center relative group" onClick={() => setOpen(false)}>
            {/* Outer breathing ring */}
            <div className="absolute rounded-full" style={{
              inset: "-8px",
              border: "1.5px solid rgba(15,184,206,0.45)",
              borderRadius: "50%",
              animation: "logoRing 4s ease-in-out infinite",
            }} />
            {/* Second ring, offset timing */}
            <div className="absolute rounded-full" style={{
              inset: "-14px",
              border: "1px solid rgba(15,184,206,0.2)",
              borderRadius: "50%",
              animation: "logoRing 4s ease-in-out infinite 0.8s",
            }} />
            {/* Core glow */}
            <div className="absolute rounded-full blur-2xl" style={{
              inset: "-4px",
              background: "radial-gradient(ellipse, rgba(15,184,206,0.5) 0%, transparent 70%)",
              animation: "logoCoreGlow 4s ease-in-out infinite",
            }} />
            <Image
              src="/logo.webp"
              alt="The Pine Cone Group"
              width={160}
              height={160}
              className="relative h-14 md:h-24 w-auto drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <Link href="/" className="hover:text-white transition-colors tracking-wide">Home</Link>
            <Link href="/services" className="hover:text-white transition-colors tracking-wide">Services</Link>
            <Link href="/case-studies" className="hover:text-white transition-colors tracking-wide">Case Studies</Link>
            <Link href="/about" className="hover:text-white transition-colors tracking-wide">About</Link>
            <Link href="/contact" className="hover:text-white transition-colors tracking-wide">Contact</Link>
            <Link href="/free-review" className="font-bold px-6 py-2.5 rounded-full transition-all hover:scale-105 text-xs uppercase tracking-widest text-black ml-2" style={{ background: "#0fb8ce" }}>
              Free Review
            </Link>
          </div>

          {/* Hamburger */}
          <button className="md:hidden text-white p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {open && (
        <div className="fixed inset-0 z-40 flex flex-col" style={{ background: "#0b1a18" }}>
          <div className="px-6 flex items-center justify-between h-20" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <Link href="/" onClick={() => setOpen(false)} className="relative flex items-center">
              <div className="absolute rounded-full" style={{ inset: "-6px", border: "1.5px solid rgba(15,184,206,0.4)", borderRadius: "50%", animation: "logoRing 4s ease-in-out infinite" }} />
              <div className="absolute rounded-full blur-xl" style={{ inset: "-2px", background: "radial-gradient(ellipse, rgba(15,184,206,0.4) 0%, transparent 70%)", animation: "logoCoreGlow 4s ease-in-out infinite" }} />
              <Image src="/logo.webp" alt="The Pine Cone Group" width={140} height={140} className="relative h-14 w-auto" />
            </Link>
            <button onClick={() => setOpen(false)} className="text-white p-1">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col px-8 py-10 gap-2 flex-1">
            {[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: "Case Studies", href: "/case-studies" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-playfair font-bold text-white py-4 text-3xl md:text-4xl border-b transition-colors hover:text-[#0fb8ce]"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8">
              <Link
                href="/free-review"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-3 text-black font-bold px-8 py-4 rounded-full text-sm uppercase tracking-widest"
                style={{ background: "#0fb8ce" }}
              >
                Get a Free Review →
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
