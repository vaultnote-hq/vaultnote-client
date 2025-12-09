'use client';

import Link from 'next/link';
import { FileText, AlertTriangle, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function TermsOfService() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/terms" />

      {/* Main Content */}
      <main className="mx-auto max-w-screen-xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div variants={fadeUp} initial="initial" animate="animate">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center space-x-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400">Clear Terms</h3>
                  <p className="text-sm text-muted-foreground">Transparent usage agreement</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                <Scale className="h-8 w-8 text-orange-500" />
                <div>
                  <h3 className="font-semibold text-orange-700 dark:text-orange-400">Fair Use</h3>
                  <p className="text-sm text-muted-foreground">Balanced service terms</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div>
                  <h3 className="font-semibold text-red-700 dark:text-red-400">Compliance</h3>
                  <p className="text-sm text-muted-foreground">Legal requirements</p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By accessing and using VaultNote ("the Service"), you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                VaultNote is a zero-knowledge encrypted note-taking service that allows users to create,
                store, and share encrypted notes. The service operates on a zero-knowledge architecture,
                meaning we cannot access the content of your encrypted notes.
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Create and store encrypted notes</li>
                <li>Set expiration times for notes</li>
                <li>Share notes via secure links</li>
                <li>Optional account creation for better organization</li>
                <li>Mobile-responsive interface</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>

              <h3 className="text-xl font-semibold mb-3">3.1 Account Creation</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Account creation is optional for basic features</li>
                <li>You may use the free tier without payment information</li>
                <li>Premium features require a paid subscription</li>
                <li>You are responsible for maintaining account security</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">3.2 Account Responsibilities</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Provide accurate registration information</li>
                <li>Maintain confidentiality of login credentials</li>
                <li>Notify us immediately of unauthorized account access</li>
                <li>You are responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Subscriptions and Payments</h2>

              <h3 className="text-xl font-semibold mb-3">4.1 Pricing and Payment Terms</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>All prices are in Swiss Francs (CHF) and include applicable VAT</li>
                <li>Current prices are available on our pricing page</li>
                <li>Payments are processed through our payment provider Stripe</li>
                <li>We accept major credit and debit cards</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">4.2 Subscription Term</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Subscriptions are billed monthly or annually</li>
                <li>Subscriptions automatically renew for the same period</li>
                <li>You may cancel at any time before the end of the current period</li>
                <li>After cancellation, access remains until the end of the paid period</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">4.3 Right of Withdrawal</h3>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Important Notice:</strong> For digital services that are provided immediately 
                  after purchase, you waive your right of withdrawal by agreeing to immediate service 
                  delivery. By subscribing, you consent to immediate access and acknowledge that you 
                  waive your right of withdrawal.
                </p>
              </div>

              <h3 className="text-xl font-semibold mb-3">4.4 Cancellation</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>You can cancel your subscription at any time through your dashboard</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>No refunds are provided for partial periods</li>
                <li>After cancellation, you will be downgraded to the free plan</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">4.5 Price Changes</h3>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to change prices. You will be notified at least 30 days 
                before any price changes take effect. New prices apply from the next renewal period.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Acceptable Use Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree not to use the Service to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Transmit harmful, threatening, or offensive content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use the service for spam or unsolicited communications</li>
                <li>Distribute malware or engage in hacking activities</li>
                <li>Create notes that promote illegal activities</li>
                <li>Share content that violates intellectual property rights</li>
                <li>Overload our servers with excessive requests</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Content and Data</h2>

              <h3 className="text-xl font-semibold mb-3">6.1 Your Content</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>You retain ownership of all content you create</li>
                <li>You are responsible for the content of your notes</li>
                <li>We do not claim any rights to your content</li>
                <li>You grant us limited rights to store and transmit your content</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">6.2 Data Retention</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Notes are automatically deleted after expiration</li>
                <li>Account data is retained until account deletion</li>
                <li>We may delete inactive accounts after 12 months</li>
                <li>Backups are maintained for disaster recovery purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Service Availability</h2>

              <h3 className="text-xl font-semibold mb-3">7.1 Service Levels</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>We strive for 99.9% uptime for the service</li>
                <li>Scheduled maintenance will be communicated in advance</li>
                <li>Emergency maintenance may occur without notice</li>
                <li>The service is provided "as is" without warranties</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">7.2 Limitations</h3>
              <p className="text-muted-foreground leading-relaxed">
                The service has reasonable usage limits to ensure fair access for all users.
                Excessive usage may result in temporary restrictions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. Privacy and Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your privacy is our priority. Please review our Privacy Policy for detailed information about:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>How we handle your data</li>
                <li>Zero-knowledge encryption implementation</li>
                <li>Swiss data protection compliance</li>
                <li>Your rights regarding personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Intellectual Property</h2>

              <h3 className="text-xl font-semibold mb-3">9.1 Our Rights</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>We own all rights to the VaultNote platform and software</li>
                <li>You may not copy, modify, or reverse engineer our service</li>
                <li>Trademarks and branding remain our property</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">9.2 Third-Party Components</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our service may use third-party libraries and components. These are licensed under their respective licenses and remain the property of their respective owners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Termination</h2>

              <h3 className="text-xl font-semibold mb-3">10.1 Termination by You</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may terminate your account at any time through your account settings or by contacting support.
              </p>

              <h3 className="text-xl font-semibold mb-3">10.2 Termination by Us</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We may terminate or suspend your account if:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>You violate these terms</li>
                <li>You engage in harmful or illegal activities</li>
                <li>You abuse our service or other users</li>
                <li>Required by law</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Disclaimers and Limitations</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</strong>
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We disclaim all warranties, express or implied, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Security and availability of the service</li>
                <li>Accuracy or reliability of information</li>
                <li>Non-infringement of third-party rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">12. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL,
                OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF DATA, USE, OR PROFITS.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our total liability shall not exceed the amount paid by you for the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">13. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of material
                changes via email or through our service. Continued use of the service constitutes acceptance
                of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">14. Governing Law and Jurisdiction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms of Service are governed by Swiss law, excluding the UN Convention on 
                Contracts for the International Sale of Goods (CISG) and conflict of law provisions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The exclusive place of jurisdiction for all disputes arising from or in connection 
                with these terms is Bern, Switzerland. We reserve the right to bring action at the 
                customer's place of residence.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">15. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="font-semibold">Commwave Simsek</p>
                <p className="text-sm text-muted-foreground">Schwarzenburgstrasse 340</p>
                <p className="text-sm text-muted-foreground">3098 Köniz, Switzerland</p>
                <p className="text-sm text-muted-foreground">UID: CHE-134.798.046</p>
                <p className="text-sm mt-2">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:hello@vaultnote.net" className="text-primary hover:underline">
                    hello@vaultnote.net
                  </a>
                </p>
              </div>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
