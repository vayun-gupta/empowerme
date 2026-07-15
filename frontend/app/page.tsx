import Link from "next/link";
import React from "react";
import TopNav from "@/components/layout/TopNav";
import Footer from "@/components/layout/Footer";

const GROWTH_CARDS = [
  {
    icon: "science",
    tags: [
      { label: "RESEARCH", cls: "bg-secondary-container text-on-secondary-container" },
      { label: "RESOURCES", cls: "bg-primary-fixed text-on-primary-fixed-variant" },
    ],
    title: "Advocating for Lab Resources",
    description:
      "A strategic workshop on negotiating funding, space, and equipment while fostering departmental collaboration.",
  },
  {
    icon: "podium",
    tags: [{ label: "CORE MODULE", cls: "bg-primary-fixed text-on-primary-fixed-variant" }],
    title: "Executive Presence",
    description:
      "Developing an authentic leadership style that commands respect in high-stakes boardrooms.",
  },
  {
    icon: "diversity_3",
    tags: [{ label: "COMMUNITY", cls: "bg-tertiary-container text-on-tertiary-container" }],
    title: "Mentorship Networks",
    description:
      "Build and sustain a professional sponsorship circle that actively supports your career trajectory.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface relative">
      <div className="fixed inset-0 pointer-events-none plaid-accent z-0" />
      <TopNav />

      <main className="relative z-10 pt-20 flex-1">
        {/* Hero */}
        <section className="relative py-20 lg:py-28 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 grid grid-cols-12 gap-6 items-center w-full">
            <div className="col-span-12 lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed-variant px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                For Women in Indian Academia &amp; STEM
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.1] font-bold text-on-surface font-display">
                Practice the Conversations That Define Your{" "}
                <span className="text-primary">Leadership</span>
              </h1>
              <p className="text-lg lg:text-xl text-on-surface-variant leading-relaxed max-w-xl">
                Women in Indian academia face documented institutional bias. EmpowerMe is a
                safe, AI-powered space to rehearse high-stakes leadership conversations —
                with a realistic adversary and a coach in your corner — before they happen
                in real life.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/scenarios"
                  className="bg-primary text-white font-semibold px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 hover:shadow-2xl transition-all"
                >
                  Start Practicing
                </Link>
                <Link
                  href="/dashboard"
                  className="border-2 border-primary/20 text-primary font-semibold px-8 py-4 rounded-2xl hover:bg-primary/5 transition-all"
                >
                  View Your Progress
                </Link>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-6 hidden lg:flex justify-end">
              <div className="relative w-[440px] aspect-square rounded-[3rem] overflow-hidden shadow-2xl glass-card p-3">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative bg-gradient-to-br from-primary-fixed via-surface to-secondary-container">
                  <div className="plaid-accent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-primary">
                    <span
                      className="material-symbols-outlined text-8xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      forum
                    </span>
                    <p className="text-sm font-bold uppercase tracking-widest text-on-primary-fixed-variant">
                      Simulate · Reflect · Lead
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mentorship in Action — sample exchange */}
        <section className="py-20 bg-surface-container-low relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
            <div className="text-center mb-14">
              <h2 className="text-3xl lg:text-4xl text-on-surface font-bold mb-3 font-display">
                What a Session Looks Like
              </h2>
              <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
                Face a realistic adversary, respond with composure, and get coached on every
                exchange.
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex justify-start gap-4 items-end">
                <div className="w-12 h-12 rounded-2xl bg-secondary-container flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-secondary">person</span>
                </div>
                <div className="glass-card p-6 rounded-2xl rounded-bl-none max-w-md">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70 mb-2">
                    Adversary
                  </p>
                  <p className="text-on-surface-variant leading-relaxed">
                    &ldquo;Dr. Sharma has outlined a similar framework in his earlier work.
                    Perhaps we should build on that direction instead.&rdquo;
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-4 items-end">
                <div className="glass-card p-6 rounded-2xl rounded-br-none max-w-md bg-primary-fixed/30 border-primary/10">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                    Your Response
                  </p>
                  <p className="text-on-surface font-medium leading-relaxed">
                    &ldquo;I appreciate Dr. Sharma&apos;s work, but my framework addresses a
                    gap his model does not cover — specifically student feedback loops. I&apos;d
                    like to walk the committee through the distinction.&rdquo;
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-white">person</span>
                </div>
              </div>
              <div className="coach-insight-pill p-5 rounded-2xl flex gap-4 items-start max-w-2xl mx-auto">
                <span className="material-symbols-outlined text-primary">lightbulb</span>
                <p className="text-sm text-on-surface leading-relaxed">
                  <strong className="text-primary font-bold">Coach:</strong> Strong move. You
                  acknowledged the senior colleague without ceding ground, then immediately
                  redirected to your evidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Growth & Networking (aspirational — Coming Soon) */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <h2 className="text-3xl lg:text-4xl text-on-surface font-bold font-display">
                    Growth &amp; Networking
                  </h2>
                  <span className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    Coming Soon
                  </span>
                </div>
                <p className="text-lg text-on-surface-variant">
                  Programs designed for the specific career trajectories of women in academia
                  and professional STEM fields.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GROWTH_CARDS.map((card) => (
                <div
                  key={card.title}
                  className="glass-card rounded-[2rem] p-8 flex flex-col opacity-80 select-none"
                  aria-disabled="true"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center text-primary mb-6">
                    <span className="material-symbols-outlined text-3xl">{card.icon}</span>
                  </div>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {card.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={`${tag.cls} px-3 py-1 rounded-full text-xs font-bold`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl text-on-surface font-bold mb-3">{card.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 mb-8">
          <div className="max-w-5xl mx-auto px-6 lg:px-16">
            <div className="relative glass-card rounded-[2rem] p-12 lg:p-16 text-center overflow-hidden">
              <div className="plaid-accent" />
              <div className="relative z-10 space-y-6">
                <h2 className="text-3xl lg:text-4xl text-on-surface font-bold font-display">
                  Begin Your Leadership Journey
                </h2>
                <p className="text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                  Five research-grounded scenarios drawn from the lived experience of women in
                  Indian academia. Pick one and start practicing today.
                </p>
                <div className="pt-2">
                  <Link
                    href="/scenarios"
                    className="inline-block bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:shadow-2xl hover:bg-primary/90 transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
