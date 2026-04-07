import { Link } from "react-router-dom";
import { ShoppingBag, Twitter, Instagram, Facebook } from "lucide-react";
export default function Footer() {
    return (<footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag className="h-6 w-6 text-primary"/>
              <span className="text-xl font-bold text-foreground">PhoneBazar</span>
            </div>
            <p className="text-sm text-muted-foreground">India's most trusted marketplace for buying and selling verified smartphones.</p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition"><Twitter className="h-4 w-4"/></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition"><Instagram className="h-4 w-4"/></a>
              <a href="#" className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary transition"><Facebook className="h-4 w-4"/></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/browse" className="block text-sm text-muted-foreground hover:text-foreground transition">Browse Phones</Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-foreground transition">About Us</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-foreground transition">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">For Sellers</h4>
            <div className="space-y-2">
              <Link to="/signup?role=seller" className="block text-sm text-muted-foreground hover:text-foreground transition">Start Selling</Link>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition">Seller Guide</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition">Pricing</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
            <div className="space-y-2">
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition">Help Center</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition">Privacy Policy</a>
              <a href="#" className="block text-sm text-muted-foreground hover:text-foreground transition">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-10 pt-6 text-center">
          <p className="text-sm text-muted-foreground">© 2026 PhoneBazar. All rights reserved.</p>
        </div>
      </div>
    </footer>);
}
