'use client';

import { Shield, Lock, Eye, Server } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPolicy() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/privacy" />

      {/* Main Content */}
      <main className="mx-auto max-w-screen-xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div variants={fadeUp} initial="initial" animate="animate">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="max-w-none">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center space-x-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <Shield className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-semibold text-primary">Zero-Knowledge</h3>
                  <p className="text-sm text-muted-foreground">We cannot read your notes</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Server className="h-8 w-8 text-blue-500" />
                <div>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400">Swiss Hosting</h3>
                  <p className="text-sm text-muted-foreground">EU-compliant data protection</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <Eye className="h-8 w-8 text-purple-500" />
                <div>
                  <h3 className="font-semibold text-purple-700 dark:text-purple-400">No Tracking</h3>
                  <p className="text-sm text-muted-foreground">Your privacy is protected</p>
                </div>
              </div>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                VaultNote ("we", "our", or "us") operates as a zero-knowledge encrypted note-taking service.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong>Important:</strong> Due to our zero-knowledge architecture, we cannot access the content of your encrypted notes.
                This means your private information remains completely private and inaccessible to us or any third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-semibold mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Encrypted note content (inaccessible to us due to zero-knowledge encryption)</li>
                <li>Account information (optional email for account recovery)</li>
                <li>Usage statistics (anonymous, aggregated data)</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Device information (browser type, operating system)</li>
                <li>Usage patterns (feature usage, session duration)</li>
                <li>Performance metrics (page load times, error rates)</li>
                <li>IP address (temporarily for security purposes)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Providing and maintaining our service</li>
                <li>Improving user experience and service performance</li>
                <li>Security monitoring and fraud prevention</li>
                <li>Legal compliance and regulatory requirements</li>
                <li>Customer support (limited due to zero-knowledge architecture)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
                <li>With service providers (under strict confidentiality agreements)</li>
                <li>In aggregated, anonymized form for analytical purposes</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3">4.1 Payment Provider</h3>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-2">
                  We use <strong>Stripe, Inc.</strong> as our payment processor for subscription payments.
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  When you make a payment, the following data is shared with Stripe:
                </p>
                <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-1">
                  <li>Email address</li>
                  <li>Payment information (card details are processed directly by Stripe)</li>
                  <li>Billing address</li>
                  <li>IP address (for fraud detection)</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2">
                  Stripe is PCI DSS Level 1 certified. For more information:{' '}
                  <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Stripe Privacy Policy
                  </a>
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement industry-standard security measures:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>End-to-end encryption using AES-256</li>
                <li>Zero-knowledge architecture</li>
                <li>Swiss-based hosting infrastructure</li>
                <li>Regular security audits</li>
                <li>HTTPS encryption for all communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">6. Your Rights (GDPR/DSG Compliance)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under GDPR (EU) and Swiss Federal Act on Data Protection (DSG), you have the following rights:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li><strong>Right of Access (Art. 15 GDPR, Art. 25 DSG):</strong> Request information about your data</li>
                <li><strong>Right to Rectification (Art. 16 GDPR, Art. 32 DSG):</strong> Correct inaccurate data</li>
                <li><strong>Right to Erasure (Art. 17 GDPR, Art. 32 DSG):</strong> Delete your account and associated data</li>
                <li><strong>Right to Data Portability (Art. 20 GDPR, Art. 28 DSG):</strong> Export your data in a structured format</li>
                <li><strong>Right to Object (Art. 21 GDPR, Art. 30 DSG):</strong> Object to certain data processing</li>
                <li><strong>Right to Restriction (Art. 18 GDPR):</strong> Restrict processing of your data</li>
                <li><strong>Right to Lodge a Complaint:</strong> File a complaint with the supervisory authority (FDPIC in Switzerland)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Data Retention:</strong> Notes are automatically deleted based on your configured expiration time.
                Hashed IP addresses are automatically deleted after 1 hour. Metadata is deleted when the note expires.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:hello@vaultnote.net" className="text-primary hover:underline">
                  hello@vaultnote.net
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Important:</strong> We do NOT use cookies for tracking or analytics.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We only use essential technical measures:
              </p>
              <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">
                <li>Local browser storage for note encryption keys (never sent to server)</li>
                <li>Session management for secure note access</li>
                <li>No third-party tracking cookies</li>
                <li>No analytics cookies</li>
                <li>No advertising cookies</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                <strong>IP Addresses:</strong> We temporarily process hashed IP addresses for security purposes
                (rate limiting, abuse prevention). IP addresses are immediately hashed using SHA-256 and
                are automatically deleted after 1 hour. We cannot reverse the hash to identify you.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">8. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our servers are located in Switzerland, which provides excellent data protection standards.
                Data transfers comply with Swiss Federal Act on Data Protection and GDPR requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">9. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service is not intended for children under 13. We do not knowingly collect
                personal information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy periodically. We will notify users of any material
                changes via email or through our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">11. Data Controller</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The data controller responsible for processing your data is:
              </p>
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="font-semibold">Commwave Simsek</p>
                <p className="text-sm text-muted-foreground">Schwarzenburgstrasse 340</p>
                <p className="text-sm text-muted-foreground">3098 Köniz, Switzerland</p>
                <p className="text-sm text-muted-foreground">UID: CHE-134.798.046</p>
                <p className="text-sm mt-3">
                  <strong>Privacy Inquiries:</strong>{' '}
                  <a href="mailto:hello@vaultnote.net" className="text-primary hover:underline">
                    hello@vaultnote.net
                  </a>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Subject: Privacy Request
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
