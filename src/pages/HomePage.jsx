import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
export default function HomePage() {
  return (<div>
    <HeroSection />
    {/* <FeaturedProducts /> */}
    <Categories />
    <HowItWorks />
    <Testimonials />
    <Footer />
  </div>);
}
