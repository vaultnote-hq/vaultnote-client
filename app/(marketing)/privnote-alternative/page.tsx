import type { Metadata } from 'next';
import Link from 'next/link';
import { Lock, Shield, Check, X } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// 1. SEO METADATA (Das Herzstück für dein Ranking)
export const metadata: Metadata = {
  title: "Best Privnote Alternative 2025 | VaultNote (Secure & Swiss)",
  description: "Looking for a secure Privnote alternative? VaultNote offers military-grade encryption, Swiss privacy laws, and zero tracking. No ads, just security.",
  alternates: {
    canonical: 'https://vaultnote.net/privnote-alternative',
  },
  openGraph: {
    title: "Stop using Privnote. Switch to VaultNote.",
    description: "The professional, Swiss-hosted alternative for sharing sensitive data securely.",
    type: 'website',
  }
};

export default function PrivnoteAlternative() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/privnote-alternative" />

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              The Secure Alternative to
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                Privnote
              </span>
            </h1>

            <p className="mb-12 text-xl text-muted-foreground leading-relaxed">
              Looking for a Privnote alternative? VaultNote is Swiss-hosted, open-source verified, and uses modern AES-256 encryption. Zero ads. Zero tracking.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-16">
              <Button asChild size="lg" className="h-14 px-8 text-lg">
                <Link href="/create">
                  <Lock className="mr-2 h-5 w-5" />
                  Create Secure Note
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg">
                <Link href="/security">
                  Why we are safer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-muted/5 dark:bg-muted/10">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Privnote vs. VaultNote</h2>
          
          <div className="overflow-x-auto">
            <div className="min-w-[600px] bg-card rounded-2xl border border-border shadow-sm">
              <div className="grid grid-cols-3 p-6 border-b border-border bg-muted/30">
                <div className="font-semibold text-muted-foreground">Feature</div>
                <div className="font-bold text-xl text-center text-muted-foreground">Privnote</div>
                <div className="font-bold text-xl text-center text-primary">VaultNote</div>
              </div>

              {/* Rows */}
              <div className="grid grid-cols-3 p-6 border-b border-border items-center hover:bg-muted/5">
                <div className="font-medium">Encryption</div>
                <div className="text-center text-muted-foreground">Older Standards</div>
                <div className="text-center font-semibold flex justify-center items-center gap-2">
                  <Shield className="h-4 w-4" />
                  AES-256-GCM
                </div>
              </div>

              <div className="grid grid-cols-3 p-6 border-b border-border items-center hover:bg-muted/5">
                <div className="font-medium">Jurisdiction</div>
                <div className="text-center text-muted-foreground">USA / Unknown</div>
                <div className="text-center font-semibold flex justify-center items-center gap-2">
                  <span className="text-lg">🇨🇭</span>
                  Switzerland
                </div>
              </div>

              <div className="grid grid-cols-3 p-6 border-b border-border items-center hover:bg-muted/5">
                <div className="font-medium">Rich Text / Markdown</div>
                <div className="text-center text-red-500 flex justify-center"><X className="h-6 w-6" /></div>
                <div className="text-center text-green-500 flex justify-center"><Check className="h-6 w-6" /></div>
              </div>

              <div className="grid grid-cols-3 p-6 border-b border-border items-center hover:bg-muted/5">
                <div className="font-medium">Attachments</div>
                <div className="text-center text-red-500 flex justify-center"><X className="h-6 w-6" /></div>
                <div className="text-center text-green-500 flex justify-center"><Check className="h-6 w-6" /></div>
              </div>

              <div className="grid grid-cols-3 p-6 border-b border-border items-center hover:bg-muted/5">
                <div className="font-medium">Password Protection</div>
                <div className="text-center text-green-500 flex justify-center"><Check className="h-6 w-6" /></div>
                <div className="text-center text-green-500 flex justify-center"><Check className="h-6 w-6" /></div>
              </div>

              <div className="grid grid-cols-3 p-6 border-b border-border items-center hover:bg-muted/5">
                <div className="font-medium">Ads & Tracking</div>
                <div className="text-center text-muted-foreground">Yes (Ad-supported)</div>
                <div className="text-center font-semibold text-green-500">Zero</div>
              </div>
              
              <div className="grid grid-cols-3 p-6 items-center bg-primary/5">
                <div className="font-medium">Modern UI</div>
                <div className="text-center text-muted-foreground">Dated</div>
                <div className="text-center font-semibold text-primary">Utility-First</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OPTIMIZED CONTENT: Why Switch Section ("The Attack") */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Why IT Professionals are leaving Privnote</h2>
          
          <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <p>
              For over a decade, Privnote was the default. But the web has evolved. 
              Security-conscious users and businesses are moving away from ad-supported tools with unclear server locations.
            </p>
            
            <h3 className="text-xl font-semibold text-foreground pt-4">The Problem with Legacy Tools</h3>
            <p>
              Many older note-sharing tools rely on server-side processing or reside in jurisdictions with weak privacy laws. 
              Additionally, the prevalence of "Privnote clones" (phishing sites) makes it dangerous to navigate.
            </p>

            <h3 className="text-xl font-semibold text-foreground pt-4">The VaultNote Standard</h3>
            <p>
              VaultNote is built on the modern <strong>Web Crypto API</strong>. Encryption happens natively in your browser 
              <em>before</em> data ever touches the network. Hosted in Switzerland, we offer a safe haven for your sensitive data 
              verified by strict European privacy standards.
            </p>
          </div>
        </div>
      </section>

      {/* 3. NEW SECTION: FAQ for Long-Tail SEO */}
      <section className="py-16 sm:py-24 bg-background border-t border-border/40">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Is Privnote safe to use?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Privnote is a popular tool, but it has faced security concerns regarding phishing clones and lack of transparency. 
                Unlike Privnote, <strong>VaultNote</strong> uses client-side AES-256-GCM encryption, meaning the server never sees your raw data.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Why is VaultNote the best alternative to Privnote?</h3>
              <p className="text-muted-foreground leading-relaxed">
                VaultNote offers three key advantages over Privnote:
                1. <strong>Swiss Jurisdiction:</strong> Strict data protection laws (nFADP/GDPR).
                2. <strong>Modern Encryption:</strong> We use the Web Crypto API for faster, safer encryption.
                3. <strong>No Ads:</strong> We don't track you or serve intrusive ads.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">Can VaultNote read my notes?</h3>
              <p className="text-muted-foreground leading-relaxed">
                No. Because of our <strong>Zero-Knowledge architecture</strong>, the encryption key is part of the link (after the # hash). 
                This part of the URL is never sent to our servers. We simply cannot read your notes, even if we wanted to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-muted/5 dark:bg-muted/10">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Switch to Swiss Security
          </h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-xl mx-auto">
            Send your first secure note with VaultNote. It's free, faster, and safer.
          </p>
          <Button asChild size="lg" className="h-14 px-8 text-lg">
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