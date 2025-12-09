'use client';

import Link from 'next/link';
import { Lock, Wifi, Key, CreditCard, FileText, Shield, Check } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { notFound } from 'next/navigation';

// Content Configuration
const useCases: Record<string, {
  title: string;
  subtitle: string;
  icon: any;
  description: string;
  benefits: string[];
  metaTitle: string;
  metaDesc: string;
}> = {
  'wifi-password': {
    title: "Share WiFi Password Securely",
    subtitle: "Don't shout it across the room. Send it securely.",
    icon: Wifi,
    description: "Sharing complex WiFi passwords can be a pain. Writing them on a sticky note isn't secure. Send a self-destructing link instead.",
    benefits: [
      "Guests scan a QR code or click a link",
      "Password disappears after viewing",
      "No need to spell out 'Capital A, symbol...'"
    ],
    metaTitle: "Share WiFi Password Online Securely - Self-Destructing Link",
    metaDesc: "Send your WiFi password securely via a self-destructing link. Keep your network safe with VaultNote."
  },
  'api-key': {
    title: "Share API Keys & Secrets",
    subtitle: "Stop pasting secrets in Slack or Email.",
    icon: Key,
    description: "API keys, access tokens, and database credentials should never be stored in chat logs. Use VaultNote to share them once, then destroy them.",
    benefits: [
      "Keys are encrypted in your browser",
      "Link expires automatically",
      "Audit log of access (Pro)"
    ],
    metaTitle: "Share API Keys Securely - Developer Security Tool",
    metaDesc: "Securely share API keys, tokens, and secrets with developers. Encrypted, self-destructing notes for teams."
  },
  'credit-card': {
    title: "Share Credit Card Details",
    subtitle: "Send payment info without the risk.",
    icon: CreditCard,
    description: "Need to send card details to a family member or colleague? Don't use SMS or WhatsApp. VaultNote encrypts the data so only the recipient sees it.",
    benefits: [
      "Zero-knowledge encryption",
      "One-time view protection",
      "No trace left on servers"
    ],
    metaTitle: "Share Credit Card Details Securely Online",
    metaDesc: "Send credit card numbers securely. Encrypted self-destructing notes ensure your financial data stays private."
  },
  'password': {
    title: "Share Passwords Online",
    subtitle: "The safe way to send login credentials.",
    icon: Lock,
    description: "Sharing passwords via email or chat creates a permanent security risk. VaultNote ensures the password exists only as long as needed.",
    benefits: [
      "Prevent identity theft",
      "Keep chat history clean",
      "Password protect the link for extra security"
    ],
    metaTitle: "Share Passwords Securely Online - One-Time Link",
    metaDesc: "Send passwords securely with a one-time link. The #1 secure way to share login credentials online."
  }
};

export default async function ShareUseCase({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const useCase = useCases[resolvedParams.slug];

  if (!useCase) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath={`/share/${resolvedParams.slug}`} />

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-8">
              <useCase.icon className="h-8 w-8" />
            </div>
            
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {useCase.title}
            </h1>

            <p className="text-2xl text-muted-foreground font-medium mb-8">
              {useCase.subtitle}
            </p>

            <p className="mb-12 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {useCase.description}
            </p>

            <div className="bg-card border border-border rounded-2xl p-8 mb-12 max-w-xl mx-auto text-left shadow-sm">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Why use VaultNote?
              </h3>
              <ul className="space-y-3">
                {useCase.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button asChild size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
              <Link href="/create">
                <Lock className="mr-2 h-5 w-5" />
                Create Secure Note Now
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              No account required · Free forever
            </p>
          </div>
        </div>
      </section>

      {/* How it works (Mini) */}
      <section className="py-16 bg-muted/5 dark:bg-muted/10 border-t border-border/50">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-4 font-bold">1</div>
              <h3 className="font-semibold mb-2">Write Note</h3>
              <p className="text-sm text-muted-foreground">Paste your {resolvedParams.slug.replace('-', ' ')} into the secure editor.</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-4 font-bold">2</div>
              <h3 className="font-semibold mb-2">Get Link</h3>
              <p className="text-sm text-muted-foreground">VaultNote generates a unique, encrypted link.</p>
            </div>
            <div>
              <div className="w-10 h-10 bg-background border border-border rounded-full flex items-center justify-center mx-auto mb-4 font-bold">3</div>
              <h3 className="font-semibold mb-2">Send & Forget</h3>
              <p className="text-sm text-muted-foreground">Send the link. It self-destructs after reading.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
