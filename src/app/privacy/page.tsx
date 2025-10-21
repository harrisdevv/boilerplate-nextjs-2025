import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata = {
  title: 'Privacy Policy | Your App',
  description: 'How we collect, use, and protect your personal information',
}

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl py-16 md:py-24">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: October 21, 2025</p>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                We respect your privacy and are committed to protecting your personal data. This
                privacy policy will inform you about how we handle your personal data, your privacy
                rights, and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect and process the following types of information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Account Information:</strong> Name, email address, and profile information
                  when you create an account
                </li>
                <li>
                  <strong>Payment Information:</strong> Processed securely by Paddle.com - we never
                  store your credit card details
                </li>
                <li>
                  <strong>Usage Data:</strong> How you interact with our service, features used, and
                  performance metrics
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type, device information, and
                  cookies
                </li>
                <li>
                  <strong>Communication Data:</strong> Your messages when you contact our support
                  team
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and maintain our service</li>
                <li>Process your transactions and send you related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Improve and optimize our service</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect and prevent fraud and abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Legal Basis for Processing (GDPR)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you are from the European Economic Area (EEA), our legal basis for collecting and
                using your personal information depends on the data concerned and the context:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You have given us permission to do so</li>
                <li>The processing is in our legitimate interests</li>
                <li>To comply with the law</li>
                <li>To fulfill a contract with you</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell your personal data. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Payment Processors:</strong> Paddle.com processes payments securely on our
                  behalf
                </li>
                <li>
                  <strong>Service Providers:</strong> Third-party companies that help us operate our
                  service (hosting, analytics, email)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our rights
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, sale, or
                  acquisition
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your
                personal data against unauthorized access, alteration, disclosure, or destruction.
                This includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>256-bit SSL encryption for data transmission</li>
                <li>Encrypted data storage</li>
                <li>Regular security audits and updates</li>
                <li>Restricted access to personal data</li>
                <li>Secure authentication mechanisms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal data only for as long as necessary to fulfill the purposes
                outlined in this privacy policy. When you delete your account, we will delete or
                anonymize your personal data within 30 days, except where we are required by law to
                retain it longer.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Your Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Rectification:</strong> Correct inaccurate or incomplete data
                </li>
                <li>
                  <strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")
                </li>
                <li>
                  <strong>Portability:</strong> Receive your data in a structured, machine-readable
                  format
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your data
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of processing
                </li>
                <li>
                  <strong>Withdraw Consent:</strong> Withdraw consent at any time
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise these rights, contact us at privacy@yourapp.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service and
                hold certain information. Cookies are small data files stored on your device. You can
                instruct your browser to refuse all cookies or to indicate when a cookie is being
                sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the following third-party services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Paddle.com:</strong> Payment processing (
                  <a
                    href="https://www.paddle.com/legal/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Privacy Policy
                  </a>
                  )
                </li>
                <li>
                  <strong>Google OAuth:</strong> Authentication service
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service is not intended for children under 13 years of age. We do not knowingly
                collect personal information from children under 13. If you become aware that a child
                has provided us with personal data, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and maintained on servers located outside of
                your country where data protection laws may differ. We ensure appropriate safeguards
                are in place to protect your data in accordance with this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes
                by posting the new Privacy Policy on this page and updating the "Last updated" date.
                You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">14. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="mt-4 space-y-2">
                <p className="text-muted-foreground">
                  Email: <span className="text-primary font-semibold">privacy@yourapp.com</span>
                </p>
                <p className="text-muted-foreground">
                  Support: <span className="text-primary font-semibold">support@yourapp.com</span>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

