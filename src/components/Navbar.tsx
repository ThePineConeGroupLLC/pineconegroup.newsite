"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "rgba(11,26,24,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-24">
          <Link href="/" className="flex items-center relative" onClick={() => setOpen(false)}>
            {/* Glow behind logo */}
            <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: "radial-gradient(ellipse, #0fb8ce 0%, transparent 70%)", transform: "scale(1.4)" }} />
            <Image src="/logo.webp" alt="The Pine Cone Group" width={140} height={140} className="relative h-20 w-auto drop-shadow-lg" />
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
          <div className="px-6 flex items-center justify-between h-24" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <Link href="/" onClick={() => setOpen(false)} className="relative flex items-center">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: "radial-gradient(ellipse, #0fb8ce 0%, transparent 70%)", transform: "scale(1.4)" }} />
              <Image src="/logo.webp" alt="The Pine Cone Group" width={140} height={140} className="relative h-20 w-auto" />
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
                className="font-playfair font-bold text-white py-4 text-4xl border-b transition-colors hover:text-[#0fb8ce]"
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
