'use client';

import Link from 'next/link';
import { Lock, Heart, MapPin } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/about" />

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2">
              <Heart className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium">About</span>
            </div>

            <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Share secrets without
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                leaving a trace.
              </span>
            </h1>

            <p className="mx-auto max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              VaultNote was born from a simple need: sharing sensitive information without it living forever on someone's server.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 sm:py-24 bg-muted/5 dark:bg-muted/10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We wanted something that was instantly secure, respected privacy, and didn't require complex setup — just write your message, share the link, and know it disappears after being read.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              So we built it.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold mt-16 mb-8">Why "Vault" Note?</h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
              <span className="text-2xl">🔐</span>
              <div>
                <p className="font-medium">Bank-vault security</p>
                <p className="text-sm text-muted-foreground">AES-256 encryption, the same standard banks use</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
              <span className="text-2xl">🇨🇭</span>
              <div>
                <p className="font-medium">Swiss vault privacy</p>
                <p className="text-sm text-muted-foreground">Hosted in Switzerland, protected by Swiss law</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
              <span className="text-2xl">💨</span>
              <div>
                <p className="font-medium">Notes that vanish</p>
                <p className="text-sm text-muted-foreground">Self-destruct after reading or after your chosen time</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50">
              <span className="text-2xl">👁️</span>
              <div>
                <p className="font-medium">Zero-knowledge</p>
                <p className="text-sm text-muted-foreground">We can't read your notes — mathematically impossible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">What we believe</h2>
          
          <div className="space-y-6 text-lg text-muted-foreground">
            <p>
              <strong className="text-foreground">Privacy isn't a feature — it's a right.</strong> We don't collect data because we don't want it. No analytics, no tracking, no ads.
            </p>
            <p>
              <strong className="text-foreground">Security shouldn't be complicated.</strong> You shouldn't need a PhD in cryptography to share a password safely.
            </p>
            <p>
              <strong className="text-foreground">Free should mean free.</strong> Our Starter plan is genuinely free, forever. No credit card, no trial that expires.
            </p>
          </div>
        </div>
      </section>

      {/* Who Section */}
      <section className="py-16 sm:py-24 bg-muted/5 dark:bg-muted/10">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Who made this?</h2>
          
          <p className="text-lg text-muted-foreground mb-6">
            VaultNote is built by an independent team who believes privacy shouldn't be a luxury. We're based in Switzerland and operate under Swiss privacy laws.
          </p>
          
          <p className="text-lg text-muted-foreground mb-8">
            We fund VaultNote through optional Pro subscriptions — no ads, no data selling, no investors demanding growth at all costs.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Bern, Switzerland</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to try it?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-xl mx-auto">
            Create your first secure note. No account required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/create">
                <Lock className="mr-2 h-5 w-5" />
                Create Secure Note
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <a href="mailto:hello@vaultnote.net">
                Contact Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
