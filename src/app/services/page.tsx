import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Website Design & Development",
    tagline: "Your most powerful sales asset",
    desc: "We design and build high-converting websites that build trust, communicate value at a glance, and drive visitors to take action.",
    features: [
      "Dramatically improved conversion rates",
      "Brand-defining first impressions",
      "Mobile-perfect at every breakpoint",
      "Built for speed and SEO performance",
    ],
    icon: "🌐",
  },
  {
    title: "Branding & Creative Direction",
    tagline: "Stand apart. Stand for something.",
    desc: "Complete brand identities including logo, color, typography, voice, and creative systems — positioning you as the premium, credible choice in your market.",
    features: [
      "Premium, cohesive brand identity",
      "Clear differentiation from competitors",
      "Brand guidelines for consistent application",
      "Elevated perceived value across channels",
    ],
    icon: "✦",
  },
  {
    title: "Strategic Design",
    tagline: "Where growth strategy meets creative execution",
    desc: "Design treated as a growth lever — grounded in research, positioning, and measurable business objectives.",
    features: [
      "Design rooted in business strategy",
      "Conversion-optimized layouts and flows",
      "Positioning clarity across touchpoints",
      "Consistent brand-to-revenue connections",
    ],
    icon: "🎯",
  },
  {
    title: "Digital Storytelling",
    tagline: "Content that captures and converts",
    desc: "Finding and packaging your brand narrative across digital channels — messaging that resonates with your ideal client and moves them to action.",
    features: [
      "Messaging clarity and brand voice",
      "Website copywriting and content strategy",
      "Narrative frameworks that build trust",
      "Story-driven content systems",
    ],
    icon: "✍️",
  },
  {
    title: "AI Visibility & Search Readiness",
    tagline: "Be found where the future searches",
    desc: "Positioning your brand for discovery by AI-powered tools like ChatGPT, Perplexity, and Google SGE — the new frontier of search.",
    features: [
      "Authority content for AI citation",
      "Structured data and entity optimization",
      "Topical depth and semantic relevance",
      "Future-proof digital presence architecture",
    ],
    icon: "🤖",
  },
  {
    title: "Lead Generation Systems",
    tagline: "Turn your website into a growth engine",
    desc: "Full-funnel systems that attract your ideal clients, build trust automatically, and convert visitors into qualified opportunities consistently.",
    features: [
      "Full-funnel strategy and architecture",
      "High-converting lead capture assets",
      "Automated nurture and follow-up systems",
      "Consistent, predictable lead volume",
    ],
    icon: "⚡",
  },
  {
    title: "Marketing Consulting",
    tagline: "Senior strategic direction, without the overhead",
    desc: "Senior-level strategy and positioning expertise without the cost of a full CMO or in-house team — fractional support that moves the needle.",
    features: [
      "Positioning and messaging strategy",
      "Marketing channel prioritization",
      "Campaign and funnel architecture",
      "Quarterly strategic review and guidance",
    ],
    icon: "📈",
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#0fb8ce] uppercase tracking-widest text-sm font-semibold mb-4">What We Do</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Services Built for Growth</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Every engagement is built around your specific business goals, market position, and growth trajectory.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((s) => (
              <div key={s.title} className="border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{s.icon}</div>
                <p className="text-[#0fb8ce] text-sm uppercase tracking-wide font-semibold mb-1">{s.tagline}</p>
                <h2 className="text-2xl font-bold mb-3">{s.title}</h2>
                <p className="text-gray-500 leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-2">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="text-[#0fb8ce] mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0fb8ce] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Not Sure Where to Start?</h2>
          <p className="text-xl mb-10 opacity-90">Schedule a free strategy call and we&apos;ll map out exactly what your business needs.</p>
          <Link href="/contact" className="bg-white text-[#0fb8ce] font-bold px-10 py-4 rounded-full hover:bg-gray-100 transition-colors text-lg inline-block">
            Schedule a Strategy Call
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
