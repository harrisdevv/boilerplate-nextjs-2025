import { CheckCircle2, Lock, Zap, Globe, CreditCard, Sparkles } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Built with Next.js 14 App Router for optimal performance and SEO.',
  },
  {
    icon: Lock,
    title: 'Secure Authentication',
    description: 'Google OAuth integration with NextAuth for secure user management.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    description: 'Paddle integration supporting both lifetime and subscription models.',
  },
  {
    icon: Globe,
    title: 'SEO Optimized',
    description: 'Built-in SEO best practices and metadata management.',
  },
  {
    icon: Sparkles,
    title: 'AI Ready',
    description: 'OpenRouter integration for AI-powered features (BYOK).',
  },
  {
    icon: CheckCircle2,
    title: 'Production Ready',
    description: 'TypeScript, Prisma, and best practices out of the box.',
  },
]

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A comprehensive boilerplate with all the essentials for building modern web applications.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

