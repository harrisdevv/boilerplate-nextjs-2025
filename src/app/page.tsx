import { HeroSection } from '@/components/landing/hero-section'
import { ProblemSolutionSection } from '@/components/landing/problem-solution-section'
import { FeaturesShowcaseSection } from '@/components/landing/features-showcase-section'
import { SocialProofSection } from '@/components/landing/social-proof-section'
import { FounderStorySection } from '@/components/landing/founder-story-section'
import { PricingSection } from '@/components/landing/pricing-section'
import { RiskReversalSection } from '@/components/landing/risk-reversal-section'
import { FAQSection } from '@/components/landing/faq-section'
import { PaymentTrustSection } from '@/components/landing/payment-trust-section'
import { CTASection } from '@/components/landing/cta-section'
import { UrgencyBanner } from '@/components/landing/urgency-banner'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <HeroSection />
        {/* This is not for early bird product launch 
        <SocialProofSection /> 
        */}
        <ProblemSolutionSection />
        <FeaturesShowcaseSection />
        <FounderStorySection />
        <PricingSection />
        {/* comment it out for early bird product launch 
        <RiskReversalSection /> */}
        <PaymentTrustSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

