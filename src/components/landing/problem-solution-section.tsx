import { AlertCircle, CheckCircle2 } from 'lucide-react'

const problems = [
  {
    problem: 'Wasting hours on repetitive manual tasks',
    solution: 'Automate everything with intelligent workflows',
    impact: '10x faster execution',
  },
  {
    problem: 'Juggling multiple tools and platforms',
    solution: 'All-in-one solution that replaces 5+ tools',
    impact: 'Save $200+/month on subscriptions',
  },
  {
    problem: 'Losing track of important tasks and deadlines',
    solution: 'Smart reminders and organized dashboard',
    impact: 'Never miss a deadline again',
  },
  {
    problem: 'Struggling with complex technical setup',
    solution: 'Works out of the box in under 5 minutes',
    impact: 'No coding or IT skills required',
  },
]

export function ProblemSolutionSection() {
  return (
    <section id="why-us" className="w-full py-16 md:py-24 lg:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Stop Struggling. Start Succeeding.
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We've been there. Here's how we solve the problems that waste your time and money.
          </p>
        </div>

        {/* Problem → Solution Grid */}
        <div className="grid gap-8 md:grid-cols-2 mb-20">
          {problems.map((item, index) => (
            <div
              key={index}
              className="relative bg-background border-2 border-border rounded-xl p-6 hover:border-primary/50 transition-all group"
            >
              {/* Problem */}
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-1 p-2 rounded-lg bg-destructive/10">
                    <AlertCircle className="h-5 w-5 text-destructive" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-muted-foreground mb-1">
                      THE PROBLEM
                    </div>
                    <div className="text-lg font-medium line-through decoration-destructive/50">
                      {item.problem}
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center my-4">
                <div className="h-0.5 w-full bg-gradient-to-r from-destructive/20 via-primary/40 to-primary/20" />
                <div className="absolute bg-background px-3">
                  <div className="text-xs font-semibold text-primary">OUR SOLUTION</div>
                </div>
              </div>

              {/* Solution */}
              <div className="mt-6">
                <div className="flex items-start gap-3 mb-3">
                  <div className="mt-1 p-2 rounded-lg bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold mb-2">{item.solution}</div>
                    <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      ⚡ {item.impact}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="mt-16 text-center space-y-6">
          <div className="inline-block bg-primary/5 border-2 border-primary/20 rounded-2xl px-8 py-6">
            <div className="text-sm font-semibold text-primary mb-2">💡 EARLY ADOPTER ADVANTAGE</div>
            <div className="text-2xl font-bold mb-2">Get Lifetime Access Today</div>
            <div className="text-muted-foreground">
              Lock in the lowest price ever. Price increases as we add more features.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

