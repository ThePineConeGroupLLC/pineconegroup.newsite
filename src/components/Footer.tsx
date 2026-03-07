import Link from "next/link";

const BG = "#0b1a18";

export default function Footer() {
  return (
    <footer style={{ background: BG, borderTop: "1px solid rgba(255,255,255,0.06)" }} className="text-gray-400 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="font-playfair text-white font-bold text-lg mb-3">The Pine Cone Group</div>
            <p className="text-sm leading-relaxed">The Pine Cone Group helps ambitious brands grow leads and revenue through strategic design, digital storytelling, and premium digital positioning that converts.</p>
          </div>
          <div>
            <div className="text-white font-semibold mb-3 text-sm uppercase tracking-widest">Navigation</div>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <div className="text-white font-semibold mb-3 text-sm uppercase tracking-widest">Get In Touch</div>
            <div className="flex flex-col gap-2 text-sm">
              <a href="mailto:admin@thepineconegroup.com" className="hover:text-white transition-colors">admin@thepineconegroup.com</a>
              <a href="tel:8508008432" className="hover:text-white transition-colors">850.800.8432</a>
              <span>Tues–Thurs, 10am–4pm CT</span>
              <span>Serving clients nationwide</span>
            </div>
          </div>
        </div>
        <div className="pt-6 text-sm flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span>© {new Date().getFullYear()} The Pine Cone Group LLC. All rights reserved.</span>
          <span className="text-gray-500">Strategic Growth. Premium Craft. Measurable Results.</span>
        </div>
      </div>
    </footer>
  );
}
