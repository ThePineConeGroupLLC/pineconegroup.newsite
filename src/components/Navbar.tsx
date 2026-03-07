"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md" style={{ background: "rgba(8,14,20,0.92)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-playfair text-white font-bold text-lg tracking-tight">The Pine Cone Group</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/contact" className="bg-[#0fb8ce] hover:bg-[#0da3b8] text-black font-bold px-5 py-2 rounded-full transition-colors ml-2 text-xs uppercase tracking-wide">
            Free Review
          </Link>
        </div>
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-4 text-gray-400 text-sm" style={{ background: "rgba(8,14,20,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <Link href="/services" onClick={() => setOpen(false)} className="hover:text-white">Services</Link>
          <Link href="/case-studies" onClick={() => setOpen(false)} className="hover:text-white">Case Studies</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="hover:text-white">About</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="hover:text-white">Contact</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="bg-[#0fb8ce] text-black font-bold px-5 py-2 rounded-full text-center text-xs uppercase tracking-wide">
            Free Review
          </Link>
        </div>
      )}
    </nav>
  );
}
