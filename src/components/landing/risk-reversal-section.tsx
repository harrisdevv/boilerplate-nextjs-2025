import { Shield, RefreshCw, Clock, CheckCircle } from 'lucide-react'

export function RiskReversalSection() {
  return (
    <section className="w-full py-16 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Zero Risk. Maximum Results.</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're so confident you'll love it, we guarantee your success
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {/* 14-Day Guarantee */}
          <div className="text-center p-6 bg-background rounded-xl border-2 border-primary/20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <RefreshCw className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">14-Day Money Back</h3>
            <p className="text-muted-foreground text-sm">
              Don't like it? Get a full refund within 14 days. No questions asked, no hassle.
            </p>
          </div>

          {/* Instant Access */}
          <div className="text-center p-6 bg-background rounded-xl border-2 border-primary/20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Instant Access</h3>
            <p className="text-muted-foreground text-sm">
              Start using immediately after purchase. No waiting, no setup delays.
            </p>
          </div>

          {/* Lifetime Support */}
          <div className="text-center p-6 bg-background rounded-xl border-2 border-primary/20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lifetime Support</h3>
            <p className="text-muted-foreground text-sm">
              Get help whenever you need it. Our team is here for you, forever.
            </p>
          </div>
        </div>

        {/* Success Guarantee */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-primary/5 border-2 border-primary/20 rounded-2xl px-8 py-6 max-w-3xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Our Success Promise</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              If you don't save at least 5 hours per week within your first month, 
              we'll work with you personally until you do - or give you a full refund. 
              <strong className="text-foreground"> That's our guarantee.</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
