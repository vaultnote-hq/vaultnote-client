import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Key } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TrustDiagram } from '@/components/trust-diagram';

// 1. SEO OPTIMIERUNG: Metadaten für die Security-Seite
export const metadata: Metadata = {
  title: "VaultNote Security Architecture | Zero-Knowledge & AES-256",
  description: "Technical deep dive into VaultNote's security: Client-side AES-256-GCM encryption, Zero-Knowledge architecture, and Swiss data residency details.",
  alternates: {
    canonical: 'https://vaultnote.net/security',
  },
  openGraph: {
    title: "VaultNote Security: How we protect your data",
    description: "We can't read your notes. Learn about our client-side encryption and Swiss privacy standards.",
    type: 'article',
  }
};

// Security principles - unique to this page
const securityPrinciples = [
  {
    title: "We Can't Read Your Notes",
    description: "Zero-knowledge architecture means encryption keys exist only in your browser. Even if our servers are compromised, your data remains unreadable.",
  },
  {
    title: "No Backdoors",
    description: "We don't have master keys. We can't decrypt your notes for governments, hackers, or anyone else - including ourselves.",
  },
  {
    title: "Open Standards",
    description: "We use AES-256-GCM and Web Crypto API - battle-tested, open standards that security experts can verify.",
  },
];

export default function Security() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/security" />

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2">
              <Shield className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Security</span>
            </div>

            <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">Security you can</span>
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                actually trust
              </span>
            </h1>

            <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              We can't read your notes. Not because we promise not to, but because it's mathematically impossible.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/create">
                  <Lock className="mr-2 h-5 w-5" />
                  Create Secure Note
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <Link href="/features">
                  View Features
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Diagram - Visual Zero-Knowledge Explanation */}
      <TrustDiagram />

      {/* Security Principles */}
      <section className="py-16 sm:py-24 bg-muted/5 dark:bg-muted/10">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-12">
            Our Security Promise
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {securityPrinciples.map((principle, idx) => (
              <div
                key={principle.title}
                className="p-6 rounded-2xl border border-border/50 bg-card/50"
              >
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <span className="text-lg font-bold text-primary">{idx + 1}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{principle.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-16 sm:py-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-8">
              Technical Implementation
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <div className="p-6 rounded-xl border border-border/50 bg-card/30">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Key className="h-4 w-4 text-primary" />
                  Encryption
                </h3>
                <p className="text-sm leading-relaxed">
                  AES-256-GCM encryption with a unique key generated for each note. Keys are derived using PBKDF2 with 100,000 iterations. The encryption key is embedded in the URL fragment (after #) which is never sent to our servers.
                </p>
              </div>
              
              <div className="p-6 rounded-xl border border-border/50 bg-card/30">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  Storage
                </h3>
                <p className="text-sm leading-relaxed">
                  All data is stored on servers in Switzerland, protected by Swiss privacy laws. We store only encrypted blobs - no plaintext, no metadata about content. Database connections use TLS 1.3.
                </p>
              </div>
              
              <div className="p-6 rounded-xl border border-border/50 bg-card/30">
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-primary" />
                  Deletion
                </h3>
                <p className="text-sm leading-relaxed">
                  When a note expires or is read (if set to self-destruct), it's permanently deleted from our database. We don't keep backups of deleted notes. Once gone, it's gone forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-muted/5 dark:bg-muted/10">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to try it?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-xl mx-auto">
            Create your first secure note. No registration required.
          </p>
          <Button asChild size="lg" className="h-12 px-8 text-base">
            <Link href="/create">
              <Lock className="mr-2 h-5 w-5" />
              Create Secure Note
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}