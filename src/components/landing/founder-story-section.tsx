export function FounderStorySection() {
  return (
    <section id="story" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-muted/30 to-background">
      <div className="container px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
              <span className="text-sm font-semibold text-primary">FROM THE FOUNDER</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
              Built by Someone Who Needed It
            </h2>
          </div>

          <div className="space-y-8 text-lg leading-relaxed">
            {/* Founder Intro */}
            <div className="bg-background border-2 border-primary/20 rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex-shrink-0"></div>
                <div>
                  <div className="font-semibold text-xl">Hi, I'm [Your Name] 👋</div>
                  <div className="text-muted-foreground">Founder & Developer</div>
                </div>
              </div>
              <p className="text-muted-foreground">
                A year ago, I was spending 3-4 hours daily on repetitive tasks. I tried every tool
                out there, but they were either too complicated, too expensive, or didn't solve my
                actual problems. So I built this for myself.
              </p>
            </div>

            {/* Results */}
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">10hrs+</div>
                <div className="text-sm text-muted-foreground">Saved Per Week</div>
              </div>
              <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">3x</div>
                <div className="text-sm text-muted-foreground">More Productive</div>
              </div>
              <div className="bg-primary/5 border-2 border-primary/20 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">$250+</div>
                <div className="text-sm text-muted-foreground">Saved Monthly</div>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8">
              <h4 className="text-xl font-semibold mb-4">What This Tool Does For Me:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong>Reclaimed my time:</strong> I finish work by 5 PM now, not midnight
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong>Doubled my output:</strong> Same hours, twice the results
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong>Reduced stress:</strong> Everything organized and automated
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <strong>Simple to use:</strong> No technical skills needed
                  </div>
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 rounded-2xl p-8 text-center space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">If This Resonates With You...</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  This tool transformed how I work. Now I'm sharing it with others who face the same
                  challenges. Lock in lifetime access at today's price before it increases.
                </p>
              </div>

              <div className="pt-4">
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-lg h-14 px-8"
                >
                  Get Lifetime Access Now
                </a>
                <div className="mt-4 text-sm text-muted-foreground">
                  14-day money-back guarantee • No questions asked
                </div>
              </div>
            </div>

            <div className="text-center text-muted-foreground italic pt-8 border-t">
              <p className="mb-2">"The best products are built by people who need them."</p>
              <p className="font-semibold text-foreground">— [Your Name], Founder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
