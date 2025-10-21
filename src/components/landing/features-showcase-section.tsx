import { Zap, Target, TrendingUp, Shield } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Automation',
    description: 'Automate your repetitive tasks in seconds. What used to take hours now takes minutes. Set it up once, and let it run forever.',
    benefits: ['Save 10+ hours per week', 'Zero manual work', 'Smart workflows'],
    videoPlaceholder: 'automation-demo.mp4',
    stats: { label: 'Faster', value: '10x' },
  },
  {
    icon: Target,
    title: 'Laser-Focused Dashboard',
    description: 'See everything that matters at a glance. No clutter, no confusion. Just the insights you need to make better decisions faster.',
    benefits: ['One unified view', 'Real-time updates', 'Customizable widgets'],
    videoPlaceholder: 'dashboard-demo.mp4',
    stats: { label: 'Time Saved', value: '5hrs/day' },
  },
  {
    icon: TrendingUp,
    title: 'Analytics That Actually Help',
    description: "Track what matters and ignore what doesn't. Get actionable insights that help you grow, not just pretty charts.",
    benefits: ['Clear metrics', 'Trend analysis', 'Export reports'],
    videoPlaceholder: 'analytics-demo.mp4',
    stats: { label: 'Better Decisions', value: '95%' },
  },
  {
    icon: Shield,
    title: 'Bank-Level Security',
    description: 'Your data is encrypted and secure. We take privacy seriously so you can focus on your work, not worrying about data breaches.',
    benefits: ['256-bit encryption', 'GDPR compliant', 'Regular backups'],
    videoPlaceholder: 'security-demo.mp4',
    stats: { label: 'Uptime', value: '99.9%' },
  },
]

export function FeaturesShowcaseSection() {
  return (
    <section id="features" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Features That Actually Matter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Built by someone who was tired of complicated tools. Every feature solves a real problem.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`grid gap-8 lg:gap-12 lg:grid-cols-2 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              {/* Text Content */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                {/* Icon & Title */}
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold">{feature.title}</h3>
                </div>

                {/* Description */}
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                <div className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <svg
                          className="w-4 h-4 text-primary"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span className="text-base font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Stats Badge */}
                <div className="inline-block bg-primary/5 border-2 border-primary/20 rounded-xl px-6 py-4">
                  <div className="text-sm text-muted-foreground">{feature.stats.label}</div>
                  <div className="text-3xl font-bold text-primary">{feature.stats.value}</div>
                </div>
              </div>

              {/* Video/Demo */}
              <div className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-primary/20 shadow-xl bg-gradient-to-br from-muted to-muted/50">
                  {/* Video Placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-16 h-16 mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[16px] border-l-primary border-y-[12px] border-y-transparent ml-1" />
                    </div>
                    <div className="text-sm font-medium mb-2">Video Demo</div>
                    <div className="text-xs text-muted-foreground">
                      {feature.videoPlaceholder}
                      <br />
                      <span className="text-primary">(Add your demo video here)</span>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-red-500" />
                  <div className="absolute top-4 right-10 w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="absolute top-4 right-16 w-3 h-3 rounded-full bg-green-500" />
                </div>

                {/* Optional: Floating badge */}
                {index === 0 && (
                  <div className="absolute -bottom-6 left-6 bg-background border-2 border-primary/20 rounded-xl px-4 py-3 shadow-lg">
                    <div className="text-xs text-muted-foreground">Setup Time</div>
                    <div className="text-2xl font-bold text-primary">&lt; 5min</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-muted/50 border rounded-2xl p-8 max-w-2xl">
            <div className="text-2xl font-bold mb-4">
              Ready to see it in action?
            </div>
            <p className="text-muted-foreground mb-6">
              Join thousands of users who've already transformed their workflow.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Get Started Now →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

