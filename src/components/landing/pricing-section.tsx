'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface PricingConfig {
  paymentMode: 'LIFETIME' | 'SUBSCRIPTION'
  lifetimePrice: number
  monthlyPrice: number
  annualPrice: number
}

export function PricingSection() {
  const [config, setConfig] = useState<PricingConfig | null>(null)
  const [isAnnual, setIsAnnual] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // Early bird end date - 7 days from now (you can change this to a specific date)
  const earlyBirdEndDate = new Date()
  earlyBirdEndDate.setDate(earlyBirdEndDate.getDate() + 7)
  earlyBirdEndDate.setHours(23, 59, 59, 999) // End at 11:59:59 PM

  useEffect(() => {
    // Fetch pricing configuration from API
    fetch('/api/config/pricing')
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => {
        // Fallback pricing
        setConfig({
          paymentMode: 'LIFETIME',
          lifetimePrice: 49,
          monthlyPrice: 9,
          annualPrice: 90,
        })
      })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = earlyBirdEndDate.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [earlyBirdEndDate])

  if (!config) {
    return (
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-center">
            <div className="text-center">Loading pricing...</div>
          </div>
        </div>
      </section>
    )
  }

  const isLifetime = config.paymentMode === 'LIFETIME'

  return (
    <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Simple Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {isLifetime ? 'One-time payment, lifetime access' : 'Flexible subscription plans'}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-4xl mt-12">
          {isLifetime ? (
            <Card className="max-w-md mx-auto border-2 border-primary shadow-2xl">
              <CardHeader className="text-center">
                <div className="space-y-2 mb-4">
                  <div className="inline-block px-3 py-1 bg-destructive text-destructive-foreground text-sm font-bold rounded-full">
                    🔥 EARLY BIRD ENDS {earlyBirdEndDate.toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm font-mono">
                    <div className="bg-destructive/10 text-destructive px-2 py-1 rounded">
                      {timeLeft.days}d
                    </div>
                    <div className="bg-destructive/10 text-destructive px-2 py-1 rounded">
                      {timeLeft.hours.toString().padStart(2, '0')}h
                    </div>
                    <div className="bg-destructive/10 text-destructive px-2 py-1 rounded">
                      {timeLeft.minutes.toString().padStart(2, '0')}m
                    </div>
                    <div className="bg-destructive/10 text-destructive px-2 py-1 rounded">
                      {timeLeft.seconds.toString().padStart(2, '0')}s
                    </div>
                  </div>
                </div>
                <CardTitle className="text-2xl">Lifetime Access</CardTitle>
                <CardDescription>Pay once, use forever</CardDescription>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-2xl text-muted-foreground line-through">$97</span>
                    <span className="text-4xl font-bold text-primary">${config.lifetimePrice}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Early bird price • Save $48 • Limited time
                  </div>
                  <div className="text-xs text-destructive font-medium">
                    Price increases to $97 after early bird period
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Full access to all features</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Lifetime updates</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>No recurring fees</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button className="w-full" size="lg">
                  🚀 Claim Early Bird Price - $49
                </Button>
                <div className="text-center space-y-1">
                  <div className="text-sm text-muted-foreground">
                    ✅ 14-day money-back guarantee
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Secure payment via Paddle • No recurring charges
                  </div>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Monthly</CardTitle>
                  <CardDescription>Billed monthly</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${config.monthlyPrice}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Full access to all features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Cancel anytime</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline" size="lg">
                    Choose Monthly
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-primary">
                <CardHeader className="text-center">
                  <div className="text-sm font-semibold text-primary mb-2">BEST VALUE</div>
                  <CardTitle className="text-2xl">Annual</CardTitle>
                  <CardDescription>Billed annually</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${config.annualPrice}</span>
                    <span className="text-muted-foreground ml-2">/year</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Save ${config.monthlyPrice * 12 - config.annualPrice}/year
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Full access to all features</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span>Cancel anytime</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-5 w-5 text-primary mr-2" />
                      <span className="font-semibold">2 months free</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg">
                    Choose Annual
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

