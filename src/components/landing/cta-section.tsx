import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CTASection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>
      
      <div className="container px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          {/* Urgency Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground rounded-full text-sm font-semibold animate-pulse">
            ⏰ Limited Time: Early Bird Pricing Ends Soon!
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Don't Miss Out on Lifetime Access
            </h2>
            <p className="max-w-[700px] text-primary-foreground/90 text-lg md:text-xl leading-relaxed">
              Join 2,500+ professionals who've already transformed their workflow. 
              <strong className="text-primary-foreground"> Get lifetime access today for just $49</strong> (normally $97).
            </p>
          </div>

          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button asChild size="lg" variant="secondary" className="text-lg h-14 px-8 font-semibold">
              <Link href="#pricing">🚀 Claim Early Bird Price - $49</Link>
            </Button>
            <div className="text-center">
              <div className="text-sm text-primary-foreground/80">
                ✅ 14-day money-back guarantee
              </div>
              <div className="text-xs text-primary-foreground/70">
                2,500+ happy customers • 4.9/5 rating
              </div>
            </div>
          </div>

          {/* Final Trust Elements */}
          <div className="flex items-center justify-center gap-8 pt-4 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>No Monthly Fees</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

