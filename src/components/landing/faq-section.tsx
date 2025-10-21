'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What does "lifetime access" really mean?',
    answer: 'Lifetime access means you pay once and can use the platform forever. No recurring fees, no surprise charges. You get all current features plus all future updates at no additional cost.',
  },
  {
    question: 'Is there a money-back guarantee?',
    answer: 'Yes! We offer a 14-day money-back guarantee. If you\'re not satisfied for any reason within the first 14 days, just contact us and we\'ll refund your payment in full. No questions asked.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We use Paddle.com as our payment processor. You can pay with all major credit cards (Visa, Mastercard, American Express), PayPal, and local payment methods depending on your country. All transactions are secure and encrypted.',
  },
  {
    question: 'Is my payment information secure?',
    answer: 'Absolutely! We use Paddle.com, a trusted payment processor used by thousands of companies worldwide. We never store your credit card information. All payments are processed through Paddle\'s secure, PCI-compliant infrastructure.',
  },
  {
    question: 'Will the price increase in the future?',
    answer: 'Yes, the lifetime price will increase as we add more features and the platform matures. However, if you purchase now, you\'re locked in at today\'s price forever. Early adopters get the best deal!',
  },
  {
    question: 'Do I need technical skills to use this?',
    answer: 'Not at all! Our platform is designed for everyone, regardless of technical expertise. If you can use email or browse the web, you can use our tool. We also provide comprehensive guides and support if you need help.',
  },
  {
    question: 'What happens if I have questions or need support?',
    answer: 'We provide email support to all lifetime users. Most questions are answered within 24 hours on business days. We also have a comprehensive help center with guides, tutorials, and FAQs.',
  },
  {
    question: 'Can I use this for my team/business?',
    answer: 'Yes! Your lifetime license allows you to use the platform for your business. For teams with multiple users, please contact us for team pricing options.',
  },
  {
    question: 'Will I get all future updates?',
    answer: 'Yes! Lifetime access includes all future updates, new features, and improvements. You\'ll never have to pay again, even as we continue to develop and enhance the platform.',
  },
  {
    question: 'What if I need to cancel or get a refund?',
    answer: 'You can request a full refund within 14 days of purchase, no questions asked. After the 14-day period, all sales are final. Just email us at support@yourapp.com with your order details.',
  },
  {
    question: 'Do you offer discounts for students or nonprofits?',
    answer: 'We occasionally offer special pricing for students and nonprofit organizations. Contact us at support@yourapp.com with proof of eligibility, and we\'ll see what we can do!',
  },
  {
    question: 'How is this different from other tools?',
    answer: 'Unlike other tools with monthly subscriptions, we offer lifetime access for a one-time fee. We focus on simplicity and results rather than overwhelming you with features you\'ll never use. Plus, we actively listen to user feedback and build what you actually need.',
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about lifetime access, payments, and guarantees
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-background border-2 border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-lg pr-8">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 text-primary flex-shrink-0 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 pt-2">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="mailto:support@yourapp.com"
            className="text-primary font-semibold hover:underline"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  )
}

