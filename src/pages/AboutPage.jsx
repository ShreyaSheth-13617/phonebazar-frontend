import { Link } from "react-router-dom";
import {
    ShieldCheck,
    AlertTriangle,
    Sparkles,
    MessageCircle,
    Target,
    Eye,
    ShoppingBag,
    Store,
    ArrowRight,
    Check,
} from "lucide-react";
import Footer from "@/components/Footer";

const Label = ({ children, className = "" }) => (<p className={`text-[11px] font-semibold uppercase tracking-[0.22em] text-primary mb-3 text-center ${className}`}>{children}</p>);

const H2 = ({ id, children, className = "" }) => (<h2 id={id} className={`text-2xl sm:text-3xl font-semibold tracking-tight text-foreground text-center ${className}`}>{children}</h2>);

export default function AboutPage() {
    return (<div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <main className="flex-1 text-center">
        {/* Hero */}
        <section className="relative px-4 pt-16 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-border/50">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(var(--primary)/0.12),transparent)] pointer-events-none" aria-hidden/>
          <div className="relative max-w-3xl mx-auto px-2">
            <Label>About PhoneBazar</Label>
            <h1 className="text-3xl sm:text-5xl font-bold text-foreground tracking-tight mb-6 leading-[1.15]">
              Used phones, <span className="text-primary">clear deals</span>
            </h1>
            <p className="text-muted-foreground leading-[1.75] text-base sm:text-lg max-w-2xl mx-auto">
              We connect <strong className="text-foreground font-medium">buyers</strong> and <strong className="text-foreground font-medium">sellers</strong> across India. List one phone per ad, browse with confidence, and arrange shipping or terms directly—built for trust, not noise.
            </p>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="divide-y divide-border/60">
          {/* Who we are */}
          <section className="py-16 md:py-20 scroll-mt-20">
            <div className="max-w-2xl mx-auto">
              <Label>Platform</Label>
              <H2 id="who-we-are" className="mb-5">Who we are</H2>
              <p className="text-[15px] sm:text-base text-muted-foreground leading-[1.75]">
                PhoneBazar is a marketplace for <strong className="text-foreground font-medium">pre-owned smartphones</strong>. Whether you’re hunting for a deal or selling your old device, we give you structured listings, verification signals, and a simple path from discovery to conversation—without the clutter of generic classifieds.
              </p>
            </div>
          </section>

          {/* Problem */}
          <section className="py-16 md:py-20 scroll-mt-20">
            <div className="flex flex-col items-center gap-5 mb-8 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/[0.12] flex items-center justify-center shrink-0 ring-1 ring-amber-500/20">
                <AlertTriangle className="h-5 w-5 text-amber-500" aria-hidden/>
              </div>
              <div>
                <H2 id="problem">The problem</H2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">Why used-phone trades feel risky today</p>
              </div>
            </div>
            <div className="max-w-2xl mx-auto rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm p-6 sm:p-8">
              <p className="text-[15px] text-muted-foreground leading-[1.75] mb-6">
                Informal listings often hide real condition. Buyers fear defects and scams; sellers struggle to stand out as honest. Everyone loses time when expectations aren’t clear upfront.
              </p>
              <ul className="space-y-4 text-[15px] text-muted-foreground leading-relaxed">
                {[
                    "Vague photos and missing battery or defect details",
                    "Hard to tell which sellers are serious or verified",
                    "No shared expectations for shipping, inspection, or payment",
                ].map((t) => (<li key={t} className="max-w-md mx-auto">
                    <span className="text-primary mr-2">·</span>
                    {t}
                  </li>))}
              </ul>
            </div>
          </section>

          {/* Our solution */}
          <section className="py-16 md:py-20 scroll-mt-20">
            <div className="flex flex-col items-center gap-5 mb-10 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-primary/12 flex items-center justify-center shrink-0 ring-1 ring-primary/20">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden/>
              </div>
              <div>
                <H2 id="solution">Our solution</H2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Verification cues, transparent fields, and accountable contact—so both sides know what they’re agreeing to.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto">
              {[
                { icon: ShieldCheck, title: "Verified listings", desc: "Badges and checks help honest sellers stand out. We encourage clear condition and defect notes on every ad." },
                { icon: Sparkles, title: "Specs that matter", desc: "Battery, storage, and wear are visible up front—fewer surprises after delivery." },
                { icon: MessageCircle, title: "Direct, traceable contact", desc: "Talk to sellers on-platform. No anonymous drive-by listings." },
              ].map((item) => (<div key={item.title} className="group rounded-2xl border border-border/80 bg-card/60 p-6 sm:p-7 flex flex-col h-full items-center text-center transition-colors hover:bg-card hover:border-primary/25">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5 ring-1 ring-primary/10 group-hover:ring-primary/20 transition-shadow">
                    <item.icon className="h-5 w-5 text-primary" aria-hidden/>
                  </div>
                  <h3 className="text-[15px] font-semibold text-foreground mb-2 tracking-tight">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-[1.7] flex-1">{item.desc}</p>
                </div>))}
            </div>
          </section>

          {/* Buyers & Sellers */}
          <section className="py-16 md:py-20 scroll-mt-20">
            <div className="max-w-2xl mx-auto mb-12 md:mb-16">
              <Label>Two sides, one marketplace</Label>
              <H2 id="buyers-sellers">Built for buyers and sellers</H2>
              <p className="mt-4 text-muted-foreground leading-[1.75] text-[15px] sm:text-base">
                Same platform, different needs. Here’s what each side can expect on PhoneBazar.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 lg:items-stretch max-w-4xl mx-auto">
              <div className="rounded-2xl border border-border/80 bg-gradient-to-b from-card to-card/40 p-8 sm:p-9 md:p-10 flex flex-col min-h-[420px] ring-1 ring-inset ring-primary/[0.07] shadow-sm items-center">
                <div className="flex flex-col items-center gap-3 mb-7 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/12 flex items-center justify-center shrink-0 ring-1 ring-primary/15">
                    <ShoppingBag className="h-7 w-7 text-primary" aria-hidden/>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground tracking-tight">For buyers</h3>
                    <p className="text-sm text-muted-foreground mt-1">Find and vet your next phone</p>
                  </div>
                </div>
                <ul className="space-y-4 text-[15px] text-muted-foreground flex-1 leading-[1.7] mb-8 w-full max-w-sm mx-auto">
                  {[
                        "Search and filter by model, condition, and price—nationwide listings with shipping in mind.",
                        "Open any ad for photos, battery health, storage, and honest defect notes before you message.",
                        "See verified sellers and seller history at a glance.",
                        "Contact sellers directly, agree on shipping or handoff, and inspect on delivery when you can.",
                    ].map((t) => (<li key={t} className="flex flex-col items-center gap-2 text-center">
                        <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={2.5} aria-hidden/>
                        <span>{t}</span>
                      </li>))}
                </ul>
                <div className="mt-auto pt-2 w-full max-w-xs mx-auto">
                  <Link to="/browse" className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl border border-border bg-transparent text-foreground text-sm font-semibold transition hover:border-primary/50 hover:bg-primary/10 hover:text-primary active:scale-[0.99]">
                    Browse phones <ArrowRight className="h-4 w-4 shrink-0"/>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-border/80 bg-gradient-to-b from-secondary/40 to-secondary/20 p-8 sm:p-9 md:p-10 flex flex-col min-h-[420px] ring-1 ring-inset ring-foreground/[0.04] shadow-sm items-center">
                <div className="flex flex-col items-center gap-3 mb-7 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-background/50 flex items-center justify-center shrink-0 border border-border">
                    <Store className="h-7 w-7 text-foreground" aria-hidden/>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground tracking-tight">For sellers</h3>
                    <p className="text-sm text-muted-foreground mt-1">List once, reach serious buyers</p>
                  </div>
                </div>
                <ul className="space-y-4 text-[15px] text-muted-foreground flex-1 leading-[1.7] mb-8 w-full max-w-sm mx-auto">
                  {[
                        "Post a single-device ad with photos, price, condition, and shipping or pickup preferences.",
                        "Stand out with clear battery %, storage, and defects—buyers trust transparency.",
                        "Earn verification as you build a solid track record on the platform.",
                        "Receive enquiries and manage interest in one place (more tools as we grow).",
                    ].map((t) => (<li key={t} className="flex flex-col items-center gap-2 text-center">
                        <Check className="h-4 w-4 text-primary shrink-0" strokeWidth={2.5} aria-hidden/>
                        <span>{t}</span>
                      </li>))}
                </ul>
                <div className="mt-auto pt-2 w-full max-w-xs mx-auto">
                  <Link to="/signup?role=seller" className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition active:scale-[0.99]">
                    Start selling <ArrowRight className="h-4 w-4 shrink-0"/>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* How it works */}
          <section className="py-16 md:py-20 scroll-mt-20">
            <div className="mb-10 md:mb-12 max-w-2xl mx-auto">
              <Label>Journeys</Label>
              <H2 id="how-it-works" className="mb-4">How it works</H2>
              <p className="text-muted-foreground leading-[1.75] text-[15px] sm:text-base">
                Different roles, same standard of clarity—from first click to closing the deal.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto">
              <div className="rounded-2xl border border-border/80 bg-card/50 p-6 sm:p-8 h-full flex flex-col items-center">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-6 flex flex-col items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/12">
                    <ShoppingBag className="h-4 w-4 text-primary" aria-hidden/>
                  </span>
                  Buying
                </h3>
                <ol className="space-y-6 w-full max-w-sm">
                  {[
                        { n: 1, title: "Browse & compare", desc: "Filter listings and read full detail pages before you commit." },
                        { n: 2, title: "Message the seller", desc: "Ask questions, confirm shipping, and agree on price." },
                        { n: 3, title: "Pay & receive safely", desc: "Use the cues on the listing; inspect on delivery when possible." },
                    ].map((row) => (<li key={row.n} className="flex flex-col items-center text-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-sm font-bold text-primary tabular-nums ring-1 ring-primary/15">{row.n}</span>
                      <div>
                        <p className="font-semibold text-foreground text-[15px] tracking-tight">{row.title}</p>
                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{row.desc}</p>
                      </div>
                    </li>))}
                </ol>
              </div>
              <div className="rounded-2xl border border-border/80 bg-card/50 p-6 sm:p-8 h-full flex flex-col items-center">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-primary mb-6 flex flex-col items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/12">
                    <Store className="h-4 w-4 text-primary" aria-hidden/>
                  </span>
                  Selling
                </h3>
                <ol className="space-y-6 w-full max-w-sm">
                  {[
                        { n: 1, title: "Create your ad", desc: "One phone per listing—photos, price, condition, and defects upfront." },
                        { n: 2, title: "Get enquiries", desc: "Buyers reach out through the platform; keep communication clear." },
                        { n: 3, title: "Ship or hand over", desc: "Align on delivery; mark sold when the deal is done." },
                    ].map((row) => (<li key={row.n} className="flex flex-col items-center text-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/12 text-sm font-bold text-primary tabular-nums ring-1 ring-primary/15">{row.n}</span>
                      <div>
                        <p className="font-semibold text-foreground text-[15px] tracking-tight">{row.title}</p>
                        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{row.desc}</p>
                      </div>
                    </li>))}
                </ol>
              </div>
            </div>
          </section>

          {/* Mission / Vision */}
          <section className="py-16 md:py-24 pb-20 md:pb-28 scroll-mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 md:items-stretch max-w-4xl mx-auto">
              <div className="rounded-2xl border border-border/80 bg-card/60 p-7 sm:p-8 flex flex-col items-center text-center">
                <div className="flex flex-col items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                    <Target className="h-5 w-5 text-primary shrink-0" aria-hidden/>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Mission</h3>
                </div>
                <p className="text-[15px] text-muted-foreground leading-[1.75] flex-1">
                  To make used-phone trade <strong className="text-foreground font-medium">simpler and safer</strong> for buyers and sellers in India—one honest listing at a time.
                </p>
              </div>
              <div className="rounded-2xl border border-border/80 bg-card/60 p-7 sm:p-8 flex flex-col items-center text-center">
                <div className="flex flex-col items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 ring-1 ring-primary/10">
                    <Eye className="h-5 w-5 text-primary shrink-0" aria-hidden/>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Vision</h3>
                </div>
                <p className="text-[15px] text-muted-foreground leading-[1.75] flex-1">
                  A marketplace where <strong className="text-foreground font-medium">every ad is readable</strong>, every seller can build reputation, and every buyer can choose with confidence.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-14 md:mt-16 pt-10 border-t border-border/50">
              <Link to="/browse" className="text-sm font-medium text-primary hover:underline underline-offset-4 decoration-primary/40">Browse listings</Link>
              <span className="hidden sm:inline text-border select-none" aria-hidden>|</span>
              <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition underline-offset-4 hover:underline">Contact us</Link>
            </div>
          </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>);
}
