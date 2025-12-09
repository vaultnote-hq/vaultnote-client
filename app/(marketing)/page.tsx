'use client';

import Link from 'next/link';
import { Lock, ArrowRight } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Hero07 from "@/components/hero-07/hero-07";
import Features01 from "@/components/features-01/features-01";
import HowItWorks from "@/components/how-it-works/how-it-works";
import FAQ03 from "@/components/faq-03/faq-03";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  // Animation variants
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/" />

      {/* Hero Section */}
      <Hero07 />

      {/* Features Section */}
      <Features01 />

      {/* How It Works Section */}
      <HowItWorks />

      {/* FAQ Section */}
      <FAQ03 />

      {/* CTA Section */}
      <section className="px-6 py-16 sm:py-32 sm:px-8">
        <div className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6">
          <motion.div variants={fadeUp}>
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to secure your communications?
            </h2>
            <p className="mb-12 text-xl text-muted-foreground leading-relaxed">
              Start creating secure, self-destructing notes in seconds. No registration required.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/create">
                  <Lock className="mr-2 h-5 w-5" />
                  Create Secure Note
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 text-base shadow-none"
                asChild
              >
                <Link href="/learn-more">
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
