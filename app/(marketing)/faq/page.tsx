'use client';

import Link from 'next/link';
import { Lock, HelpCircle } from 'lucide-react';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const faqs = [
  {
    question: "How does VaultNote ensure my data privacy?",
    answer:
      "VaultNote uses end-to-end encryption where all encryption happens in your browser. Your notes are encrypted before they leave your device, and we store only encrypted data. We cannot read your content.",
  },
  {
    question: "Are my notes really deleted automatically?",
    answer:
      "Yes! Notes are automatically deleted after being read once or after a set time period (from minutes to years). You have full control over expiration times, and deletion happens permanently with no way to recover the content.",
  },
  {
    question: "Is VaultNote really free?",
    answer:
      "Yes, VaultNote is completely free with no subscription fees, premium features, or hidden costs. We believe secure communication should be accessible to everyone.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Your data is stored in Switzerland with some of the world's strongest privacy laws. We use Swiss data centers that comply with GDPR and Swiss data protection regulations.",
  },
  {
    question: "Can I trust that my data is secure?",
    answer:
      "VaultNote uses military-grade AES-256 encryption and zero-knowledge architecture. Your encryption keys never leave your browser, and we have no access to your content.",
  },
  {
    question: "How does the encryption work?",
    answer:
      "All encryption happens client-side in your browser using the Web Crypto API. Your encryption key is generated locally and never sent to our servers. This ensures true zero-knowledge security.",
  },
  {
    question: "What happens if I lose the link?",
    answer:
      "If you lose the link, the note cannot be recovered. This is by design for security - only people with the direct link can access the note. Make sure to share links securely.",
  },
  {
    question: "Can I edit or update a note after sending?",
    answer:
      "No, notes cannot be edited after creation for security reasons. If you need to make changes, create a new note. This ensures the integrity and immutability of shared information.",
  },
  {
    question: "Are there any file size limits?",
    answer:
      "Notes are limited to text content only for security and performance reasons. We don't support file uploads to maintain our zero-knowledge architecture and fast loading times.",
  },
  {
    question: "How do I contact support?",
    answer:
      "For questions or issues, please reach out to us at hello@vaultnote.net. We're here to help with any concerns you may have.",
  },
];

export default function FAQ() {
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/faq" />

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2">
              <HelpCircle className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Help Center</span>
            </div>

            <motion.div variants={fadeUp} initial="initial" animate="animate">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Frequently Asked Questions
              </h1>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed">
                Everything you need to know about VaultNote's security, privacy, and features.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-muted/20">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Still have questions?
            </h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground mb-8 leading-relaxed">
              Contact us at hello@vaultnote.net or start creating secure notes right away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/create">
                  <Lock className="mr-2 h-5 w-5" />
                  Create Secure Note
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <a href="mailto:hello@vaultnote.net">
                  Contact Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
