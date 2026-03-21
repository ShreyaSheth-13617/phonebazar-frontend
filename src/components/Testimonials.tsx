import { Star } from "lucide-react";

const testimonials = [
  { name: "Rahul S.", text: "Bought an iPhone 13 in mint condition. The verification process gave me full confidence!", rating: 5 },
  { name: "Priya M.", text: "Sold my old Samsung in just 2 days. The seller dashboard is super easy to use.", rating: 5 },
  { name: "Amit K.", text: "Best prices for pre-owned phones. Way better than other platforms.", rating: 4 },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground mb-2 text-center">What Our Users Say</h2>
        <p className="text-sm text-muted-foreground text-center mb-10">Trusted by thousands across India</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
              <p className="text-sm font-semibold text-foreground">{t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
