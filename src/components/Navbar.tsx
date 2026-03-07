"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link href="/" className="text-white font-bold text-xl tracking-tight">
          The Pine Cone Group
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/contact" className="bg-[#0fb8ce] hover:bg-[#0da3b8] text-white font-semibold px-5 py-2 rounded-full transition-colors ml-2">
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
        <div className="md:hidden bg-gray-900 border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-gray-300 text-sm">
          <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
          <Link href="/case-studies" onClick={() => setOpen(false)}>Case Studies</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="bg-[#0fb8ce] text-white font-semibold px-5 py-2 rounded-full text-center">
            Free Review
          </Link>
        </div>
      )}
    </nav>
  );
}
