import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata = {
  title: 'Terms of Service | Your App',
  description: 'Terms and conditions for using our service',
}

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl py-16 md:py-24">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: October 21, 2025</p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using this service, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to these terms, please do not
                use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Lifetime License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When you purchase lifetime access to our service:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You receive a perpetual, non-transferable license to use the service</li>
                <li>You will receive all future updates and improvements at no additional cost</li>
                <li>Your license is valid for as long as the service operates</li>
                <li>We reserve the right to discontinue the service with 90 days notice</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We offer a 14-day money-back guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Request a full refund within 14 days of purchase</li>
                <li>No questions asked - we'll process your refund promptly</li>
                <li>Refunds are processed through Paddle.com, our payment processor</li>
                <li>After 14 days, all sales are final</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate and complete information when creating an account</li>
                <li>Maintain the security of your account credentials</li>
                <li>Not share your account access with unauthorized users</li>
                <li>Not use the service for any illegal or unauthorized purpose</li>
                <li>Not attempt to compromise the security or integrity of our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not use our service to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Distribute malware or malicious code</li>
                <li>Engage in spamming or phishing activities</li>
                <li>Attempt to reverse engineer or decompile the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Service Availability</h2>
              <p className="text-muted-foreground leading-relaxed">
                While we strive for 99.9% uptime, we do not guarantee uninterrupted service. We may
                perform maintenance, updates, or improvements that temporarily affect availability.
                We are not liable for any damages resulting from service interruptions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Data and Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your use of the service is also governed by our Privacy Policy. We take data
                protection seriously and comply with applicable data protection laws including GDPR.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, features, and functionality of the service are owned by us and are
                protected by international copyright, trademark, and other intellectual property
                laws. You may not copy, modify, or distribute any part of our service without
                explicit permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, we shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages, or any loss of profits or
                revenues, whether incurred directly or indirectly, or any loss of data, use,
                goodwill, or other intangible losses resulting from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any
                material changes via email or through the service. Your continued use of the service
                after such changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may terminate or suspend your access to the service immediately, without prior
                notice or liability, for any reason, including breach of these terms. Upon
                termination, your right to use the service will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed by and construed in accordance with the laws of your
                jurisdiction, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <p className="text-primary font-semibold mt-4">support@yourapp.com</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

