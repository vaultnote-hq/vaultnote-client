'use client';

import { Scale, Mail, MapPin, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function LegalPage() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/legal" />

      {/* Main Content */}
      <main className="mx-auto max-w-screen-xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div variants={fadeUp} initial="initial" animate="animate">
          <div className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Legal Notice / Impressum</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Information according to Swiss law (Art. 3 UWG) and GDPR (Art. 13)
            </p>
          </div>

          <div className="max-w-none">
            {/* Service Provider Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Service Provider</h2>
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <Scale className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Commwave Simsek</p>
                    <p className="text-sm text-muted-foreground">Sole Proprietorship under Swiss Law</p>
                    <p className="text-sm text-muted-foreground mt-1">UID: CHE-134.798.046</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-sm text-muted-foreground">Schwarzenburgstrasse 340</p>
                    <p className="text-sm text-muted-foreground">3098 Köniz</p>
                    <p className="text-sm text-muted-foreground">Switzerland</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Contact</p>
                    <p className="text-sm">
                      Email:{' '}
                      <a href="mailto:hello@vaultnote.net" className="text-primary hover:underline">
                        hello@vaultnote.net
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Responsible for Content */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Responsible for Content</h2>
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="font-semibold">Enver Simsek</p>
                <p className="text-sm text-muted-foreground">Schwarzenburgstrasse 340</p>
                <p className="text-sm text-muted-foreground">3098 Köniz, Switzerland</p>
                <p className="text-sm mt-2">
                  <a href="mailto:hello@vaultnote.net" className="text-primary hover:underline">
                    hello@vaultnote.net
                  </a>
                </p>
              </div>
            </section>

            {/* VAT Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">VAT Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Commwave Simsek is registered in the Swiss Commercial Register. 
                All prices include applicable VAT where required.
              </p>
            </section>

            {/* Hosting Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Hosting & Infrastructure</h2>
              <div className="bg-muted/50 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      This service is hosted in Switzerland and complies with Swiss data protection laws
                      (Federal Act on Data Protection, FADP) and the European General Data Protection
                      Regulation (GDPR).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Protection Officer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Data Protection</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For questions regarding data protection and privacy, please contact:
              </p>
              <div className="bg-muted/50 rounded-lg p-6">
                <p className="text-sm">
                  <strong>E-Mail:</strong>{' '}
                  <a href="mailto:hello@vaultnote.net" className="text-primary hover:underline">
                    hello@vaultnote.net
                  </a>
                </p>
                <p className="text-sm mt-2 text-muted-foreground">
                  Subject: Data Protection / Privacy Inquiry
                </p>
              </div>
            </section>

            {/* Supervisory Authority */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Supervisory Authority</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you believe that the processing of your personal data violates data protection law,
                you have the right to lodge a complaint with the competent supervisory authority:
              </p>
              <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                <div>
                  <p className="font-semibold">Switzerland:</p>
                  <p className="text-sm text-muted-foreground">
                    Federal Data Protection and Information Commissioner (FDPIC)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <a 
                      href="https://www.edoeb.admin.ch" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      www.edoeb.admin.ch
                    </a>
                  </p>
                </div>
                <div>
                  <p className="font-semibold">European Union:</p>
                  <p className="text-sm text-muted-foreground">
                    Your local data protection authority
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <a 
                      href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Find your authority
                    </a>
                  </p>
                </div>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
              
              <h3 className="text-xl font-semibold mb-3">Liability for Content</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The contents of our pages were created with the greatest care. However, we cannot
                guarantee the accuracy, completeness, and timeliness of the content. As a service
                provider, we are responsible for our own content on these pages in accordance with
                general laws. However, we are not obligated to monitor transmitted or stored
                third-party information or to investigate circumstances that indicate illegal activity.
              </p>

              <h3 className="text-xl font-semibold mb-3">Liability for Links</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our website contains links to external third-party websites over whose content we have
                no control. Therefore, we cannot assume any liability for this external content. The
                respective provider or operator of the pages is always responsible for the content of
                the linked pages.
              </p>

              <h3 className="text-xl font-semibold mb-3">Copyright</h3>
              <p className="text-muted-foreground leading-relaxed">
                The content and works created by the site operators on these pages are subject to
                copyright law. Duplication, processing, distribution, and any kind of exploitation
                outside the limits of copyright require the written consent of the respective author
                or creator.
              </p>
            </section>

            {/* Zero-Knowledge Notice */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Zero-Knowledge Architecture</h2>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <p className="text-sm leading-relaxed">
                  <strong>Important:</strong> VaultNote operates on a zero-knowledge architecture.
                  This means we cannot access, read, or recover the content of your encrypted notes.
                  All encryption and decryption happens on your device. We only store encrypted data
                  that is mathematically impossible for us to decrypt.
                </p>
              </div>
            </section>

            {/* Last Updated */}
            <section className="mb-8">
              <p className="text-sm text-muted-foreground">
                <strong>Last updated:</strong>{' '}
                {new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
