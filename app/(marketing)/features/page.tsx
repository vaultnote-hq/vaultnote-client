import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  Lock, 
  Sparkles, 
  User, 
  Briefcase, 
  Key, 
  FileText, 
  Clock, 
  Code, 
  Users, 
  Shield,
  Zap,
  Eye,
  MapPin
} from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// 1. SEO OPTIMIERUNG: Metadaten für die Feature-Seite
export const metadata: Metadata = {
  title: "VaultNote Features | Zero-Knowledge Encryption & Self-Destruct",
  description: "Explore VaultNote features: AES-256 client-side encryption, self-destructing notes, API access for teams, and Swiss data privacy compliance.",
  alternates: {
    canonical: 'https://vaultnote.net/features',
  },
  openGraph: {
    title: "VaultNote Features: More than just a secure note.",
    description: "Built for IT teams and privacy advocates. See why VaultNote is the secure choice.",
  }
};

// Use-Case oriented features
const useCases = [
  {
    category: "For Personal Use",
    icon: User,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    features: [
      {
        icon: Key,
        title: "Share Passwords Safely",
        description: "Send WiFi passwords, account credentials, or PINs to friends and family. The note self-destructs after reading.",
      },
      {
        icon: FileText,
        title: "Private Messages",
        description: "Share sensitive personal information that you don't want stored in chat histories or email servers.",
      },
      {
        icon: Clock,
        title: "Temporary Notes",
        description: "Create notes that automatically expire. Perfect for one-time codes or temporary access information.",
      },
    ],
  },
  {
    category: "For Business & Teams",
    icon: Briefcase,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    features: [
      {
        icon: Code,
        title: "Share API Keys & Secrets",
        description: "Securely share API keys, database credentials, or SSH keys with developers. No more secrets in Slack.",
      },
      {
        icon: Users,
        title: "Client Communication",
        description: "Send sensitive documents or credentials to clients with confidence. Audit logs track access.",
      },
      {
        icon: Shield,
        title: "Compliance Ready",
        description: "Meet GDPR, HIPAA, and SOC 2 requirements with zero-knowledge encryption and Swiss data residency.",
      },
    ],
  },
];

// Technical features
const technicalFeatures = [
  {
    icon: Shield,
    title: "AES-256-GCM Encryption",
    description: "Military-grade encryption standard used by governments and banks worldwide.",
  },
  {
    icon: Lock,
    title: "Zero-Knowledge Architecture",
    description: "We cannot read your notes. Encryption keys exist only in your browser.",
  },
  {
    icon: Zap,
    title: "Client-Side Processing",
    description: "All encryption happens locally before any data leaves your device.",
  },
  {
    icon: Eye,
    title: "One-Time Reading",
    description: "Notes can be configured to delete immediately after being viewed.",
  },
  {
    icon: Clock,
    title: "Custom Expiration",
    description: "Set notes to expire after 1 hour, 24 hours, 7 days, or custom duration.",
  },
  {
    icon: MapPin,
    title: "Swiss Data Residency",
    description: "All data stored in Switzerland under strict Swiss privacy laws.",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/features" />

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2">
              <Sparkles className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Features</span>
            </div>

            <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">Built for your</span>
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                use case
              </span>
            </h1>

            <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              Whether you're sharing passwords with family or API keys with your team, VaultNote keeps your secrets safe.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/create">
                  <Lock className="mr-2 h-5 w-5" />
                  Create Secure Note
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                <Link href="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 sm:py-24 bg-muted/5 dark:bg-muted/10">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {useCases.map((useCase) => (
              <div
                key={useCase.category}
                className={`rounded-2xl border ${useCase.borderColor} p-6 sm:p-8 bg-card/30`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`h-10 w-10 ${useCase.bgColor} rounded-lg flex items-center justify-center`}>
                    <useCase.icon className={`size-5 ${useCase.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold">{useCase.category}</h3>
                </div>
                
                <div className="space-y-5">
                  {useCase.features.map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                      <div className={`flex-shrink-0 h-9 w-9 ${useCase.bgColor} rounded-lg flex items-center justify-center`}>
                        <feature.icon className={`size-4 ${useCase.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-16 sm:py-24">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
            Technical Details
          </h2>
          <p className="text-muted-foreground text-lg text-center mb-12 max-w-2xl mx-auto">
            Under the hood, VaultNote uses industry-leading security standards.
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col border border-border/50 rounded-xl py-6 px-5 bg-card/50 hover:bg-card/80 transition-colors"
              >
                <div className="mb-4 h-12 w-12 flex items-center justify-center bg-primary/10 rounded-full">
                  <feature.icon className="size-6 text-primary" />
                </div>
                <span className="text-lg font-semibold">{feature.title}</span>
                <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-muted/5 dark:bg-muted/10">
        <div className="mx-auto max-w-screen-xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get started?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-xl mx-auto">
            Create your first secure note in seconds. No registration required.
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