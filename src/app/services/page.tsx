import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Globe, Palette, Target, BookOpen, Bot, Zap, TrendingUp, Check } from "lucide-react";

const BG = "#0b1a18";
const BG2 = "#0f2320";
const CARD = "#132420";

const services = [
  { title: "Website Design & Development", tagline: "Your most powerful sales asset", desc: "We design and build high-converting websites that build trust, communicate value at a glance, and drive visitors to take action.", features: ["Dramatically improved conversion rates", "Brand-defining first impressions", "Mobile-perfect at every breakpoint", "Built for speed and SEO performance"], icon: Globe },
  { title: "Branding & Creative Direction", tagline: "Stand apart. Stand for something.", desc: "Complete brand identities including logo, color, typography, voice, and creative systems — positioning you as the premium, credible choice.", features: ["Premium, cohesive brand identity", "Clear differentiation from competitors", "Brand guidelines for consistent application", "Elevated perceived value across channels"], icon: Palette },
  { title: "Strategic Design", tagline: "Where growth strategy meets creative execution", desc: "Design treated as a growth lever — grounded in research, positioning, and measurable business objectives.", features: ["Design rooted in business strategy", "Conversion-optimized layouts and flows", "Positioning clarity across touchpoints", "Consistent brand-to-revenue connections"], icon: Target },
  { title: "Digital Storytelling", tagline: "Content that captures and converts", desc: "Finding and packaging your brand narrative across digital channels — messaging that resonates with your ideal client and moves them to action.", features: ["Messaging clarity and brand voice", "Website copywriting and content strategy", "Narrative frameworks that build trust", "Story-driven content systems"], icon: BookOpen },
  { title: "AI Visibility & Search Readiness", tagline: "Be found where the future searches", desc: "Positioning your brand for discovery by AI-powered tools like ChatGPT, Perplexity, and Google SGE — the new frontier of search.", features: ["Authority content for AI citation", "Structured data and entity optimization", "Topical depth and semantic relevance", "Future-proof digital presence architecture"], icon: Bot },
  { title: "Lead Generation Systems", tagline: "Turn your website into a growth engine", desc: "Full-funnel systems that attract your ideal clients, build trust automatically, and convert visitors into qualified opportunities consistently.", features: ["Full-funnel strategy and architecture", "High-converting lead capture assets", "Automated nurture and follow-up systems", "Consistent, predictable lead volume"], icon: Zap },
  { title: "Marketing Consulting", tagline: "Senior strategic direction, without the overhead", desc: "Senior-level strategy and positioning expertise without the cost of a full CMO or in-house team.", features: ["Positioning and messaging strategy", "Marketing channel prioritization", "Campaign and funnel architecture", "Quarterly strategic review and guidance"], icon: TrendingUp },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen text-white overflow-x-clip" style={{ background: BG }}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden" style={{ background: `linear-gradient(160deg, #0a1614 0%, ${BG} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 md:w-[480px] md:h-[480px] rounded-full blur-3xl" style={{ background: "rgba(15,184,206,0.09)", animation: "pulse 7s ease-in-out infinite" }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-80 md:h-80 rounded-full blur-3xl" style={{ background: "rgba(255,212,122,0.06)", animation: "pulse 9s ease-in-out infinite 2s" }} />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(15,184,206,0.05) 0%, transparent 65%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 mb-6" style={{ background: "rgba(15,184,206,0.1)", border: "1px solid rgba(15,184,206,0.35)" }}>
            <span className="w-2 h-2 rounded-full bg-[#0fb8ce] inline-block animate-pulse" />
            <span className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold">What We Do</span>
          </div>
          <h1 className="font-playfair font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}>
            Services Built for <span style={{ color: "#ffd47a" }}>Growth</span>
          </h1>
          <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
            Every engagement is built around your specific business goals, market position, and growth trajectory.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-6" style={{ background: BG2 }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl p-8" style={{ background: CARD, border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(15,184,206,0.12)", border: "1px solid rgba(15,184,206,0.25)" }}>
                  <s.icon size={22} color="#0fb8ce" strokeWidth={1.5} />
                </div>
                <p className="text-[#0fb8ce] text-xs uppercase tracking-[0.15em] font-bold mb-2">{s.tagline}</p>
                <h2 className="font-playfair font-bold text-white text-2xl mb-4">{s.title}</h2>
                <p className="text-gray-400 leading-relaxed mb-6 text-sm">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-400">
                      <Check size={14} color="#0fb8ce" className="mt-0.5 shrink-0" strokeWidth={2.5} />{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 text-center px-6" style={{ background: BG, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-[#0fb8ce] uppercase tracking-[0.2em] text-xs font-bold mb-6">Get Started</p>
          <h2 className="font-playfair font-black text-white mb-6 leading-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)" }}>
            Not Sure Where to Start?
          </h2>
          <p className="text-gray-400 text-lg mb-12">Schedule a free strategy call and we&apos;ll map out exactly what your business needs.</p>
          <a href="https://calendar.app.google/QZoctWL6MPGEzBds9" target="_blank" rel="noopener noreferrer" className="cta-btn inline-flex items-center gap-3 text-black font-bold px-12 py-5 rounded-full text-lg">
            Schedule a Strategy Call →
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
