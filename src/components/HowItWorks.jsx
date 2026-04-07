import { Search, ShieldCheck, CreditCard, Truck } from "lucide-react";
const steps = [
    { icon: Search, title: "Find Your Phone", desc: "Browse thousands of verified listings with detailed specs and photos." },
    { icon: ShieldCheck, title: "Verified Quality", desc: "Every device goes through a 50-point quality check." },
    { icon: CreditCard, title: "Secure Payment", desc: "Pay securely with our buyer protection guarantee." },
    { icon: Truck, title: "Fast Delivery", desc: "Get your phone delivered to your doorstep within 2-3 days." },
];
export default function HowItWorks() {
    return (<section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">How It Works</h2>
        <p className="text-sm text-muted-foreground text-center mb-10">Simple steps to get your dream phone</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((s, i) => (<div key={i} className="glass-card p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <s.icon className="h-7 w-7 text-primary"/>
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-2">{s.title}</h3>
              <p className="text-xs text-muted-foreground">{s.desc}</p>
            </div>))}
        </div>
      </div>
    </section>);
}
