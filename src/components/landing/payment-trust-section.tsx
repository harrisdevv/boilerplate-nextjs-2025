import { Shield } from 'lucide-react'

export function PaymentTrustSection() {
  return (
    <section className="w-full py-8 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-background border-2 border-primary/20 rounded-full shadow-sm">
            <span className="text-sm text-muted-foreground">Secure payments by</span>
            <div className="flex items-center gap-2">
              <svg
                viewBox="0 0 120 30"
                className="h-6 w-auto"
                fill="currentColor"
              >
                <text
                  x="5"
                  y="22"
                  fontSize="20"
                  fontWeight="bold"
                  fill="#1A1A1A"
                  fontFamily="Arial, sans-serif"
                >
                  Paddle
                </text>
              </svg>
              <Shield className="h-4 w-4 text-green-600" />
            </div>
            <span className="text-sm text-muted-foreground">• Trusted by 6,000+ businesses • 256-bit SSL • 14-day refund guarantee</span>
          </div>
        </div>
      </div>
    </section>
  )
}

