import { Navbar } from "@/app/components/Navbar"
import { Footer } from "@/app/components/Footer"
import { HeroSection } from "@/app/components/(dashboardComp)/hero-section"
import { FeaturesSection } from "@/app/components/(dashboardComp)/features-section"
import { StatsSection } from "@/app/components/(dashboardComp)/stats-section"
import { TestimonialsSection } from "@/app/components/(dashboardComp)/testimonials-section"
import { FAQSection } from "@/app/components/(dashboardComp)/faq-section"
import { ContactSection } from "@/app/components/(dashboardComp)/contact-section"
import { CTASection } from "@/app/components/(dashboardComp)/cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <CTASection />
      <Footer />
    </main>
  )
}
