import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'

export function HeroSection() {
  return (
    <section id="home" className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      
      <div className="container relative px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center space-y-8">
            {/* Social Proof Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full w-fit">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background" />
                <div className="w-6 h-6 rounded-full bg-primary/30 border-2 border-background" />
                <div className="w-6 h-6 rounded-full bg-primary/40 border-2 border-background" />
              </div>
              <span className="text-sm font-medium">
                Join early adopters getting lifetime access
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Transform Your{' '}
                <span className="text-primary">Workflow</span>
                <br />
                In Minutes
              </h1>
              <p className="text-xl text-muted-foreground md:text-2xl max-w-[600px]">
                Stop wasting time on repetitive tasks. Our platform helps you automate, 
                streamline, and scale your work effortlessly.
              </p>
            </div>

            {/* Key Benefits */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-lg">Save 10+ hours per week</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-lg">No technical skills required</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="text-lg">Lifetime access for one-time payment</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg h-14 px-8 group">
                <Link href="#pricing" className="flex items-center gap-2">
                  Get Lifetime Access
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg h-14 px-8">
                <Link href="#features">See How It Works</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">100%</span> satisfaction guarantee
              </div>
            </div>
          </div>

          {/* Right side - Visual/Demo */}
          <div className="relative lg:order-last">
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-primary/20 shadow-2xl bg-muted">
              {/* Placeholder for video/demo */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="text-center space-y-4 p-8">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[16px] border-l-primary border-y-[12px] border-y-transparent ml-1" />
                  </div>
                  <p className="text-muted-foreground">
                    Product demo video placeholder
                    <br />
                    <span className="text-sm">(Add your video URL here)</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Floating stats/badges */}
            <div className="absolute -top-6 -left-6 bg-background border-2 border-primary/20 rounded-xl p-4 shadow-lg">
              <div className="text-sm text-muted-foreground">Hours Saved</div>
              <div className="text-3xl font-bold text-primary">10,000+</div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-background border-2 border-primary/20 rounded-xl p-4 shadow-lg">
              <div className="text-sm text-muted-foreground">Happy Users</div>
              <div className="text-3xl font-bold text-primary">2,500+</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-muted-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  )
}
