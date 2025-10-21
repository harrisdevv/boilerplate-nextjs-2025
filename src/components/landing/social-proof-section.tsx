import { Star, Users, TrendingUp, Award } from 'lucide-react'

export function SocialProofSection() {
  return (
    <section className="w-full py-8 bg-background border-y">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground mb-4">
            Trusted by thousands of professionals worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {/* User Count */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-primary">2,500+</span>
            </div>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </div>

          {/* Rating */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-2xl font-bold">4.9</span>
            </div>
            <p className="text-sm text-muted-foreground">User Rating</p>
          </div>

          {/* Hours Saved */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-primary">50K+</span>
            </div>
            <p className="text-sm text-muted-foreground">Hours Saved</p>
          </div>

          {/* Success Rate */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-primary">98%</span>
            </div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
        </div>

        {/* Testimonial Quote */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <blockquote className="text-lg italic text-muted-foreground">
            "This tool completely transformed how I work. I went from working 12-hour days to finishing everything by 5 PM."
          </blockquote>
          <div className="mt-4 flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20"></div>
            <div className="text-left">
              <div className="font-semibold text-sm">Sarah Chen</div>
              <div className="text-xs text-muted-foreground">Marketing Director</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
