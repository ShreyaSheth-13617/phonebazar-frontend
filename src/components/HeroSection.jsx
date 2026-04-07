import { Link } from "react-router-dom";
import { ArrowRight, Shield, TrendingUp } from "lucide-react";
export default function HeroSection() {
    return (<section className="py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
          <Shield className="h-4 w-4"/> Trusted by 50,000+ users
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
          Buy & Sell Used Phones
          <br />
          <span className="text-primary">Like a Classifieds App</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          List your phone in minutes. Browse local deals, contact sellers directly, and agree the deal offline — no variant pickers, just one phone per ad.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/browse" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition">
            Browse Phones <ArrowRight className="h-5 w-5"/>
          </Link>
          <Link to="/signup?role=seller" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border text-foreground font-semibold text-lg hover:bg-secondary transition">
            <TrendingUp className="h-5 w-5"/> Start Selling
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
          <div><p className="text-2xl font-bold text-foreground">50K+</p><p className="text-xs text-muted-foreground">Happy Users</p></div>
          <div><p className="text-2xl font-bold text-foreground">10K+</p><p className="text-xs text-muted-foreground">Phones Sold</p></div>
          <div><p className="text-2xl font-bold text-foreground">99%</p><p className="text-xs text-muted-foreground">Satisfaction</p></div>
        </div>
      </div>
    </section>);
}
