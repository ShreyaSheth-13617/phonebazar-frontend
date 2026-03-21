import { Shield, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-foreground mb-4">About PhoneBazar</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're on a mission to make buying and selling pre-owned phones safe, easy, and trustworthy.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { icon: Shield, title: "Verified Devices", desc: "Every phone goes through a rigorous 50-point quality check before listing." },
          { icon: Users, title: "Trusted Community", desc: "50,000+ happy users trust PhoneBazar for their smartphone needs." },
          { icon: Award, title: "Best Prices", desc: "Get the best value for pre-owned devices with our price guarantee." },
        ].map((item, i) => (
          <div key={i} className="glass-card p-8 text-center">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <item.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
