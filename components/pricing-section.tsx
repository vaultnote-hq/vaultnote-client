'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Info, 
  Lock, 
  MapPin, 
  FileText, 
  Shield, 
  Clock, 
  KeyRound, 
  Eye, 
  RefreshCw, 
  Puzzle, 
  Upload, 
  Palette, 
  Mail, 
  Users, 
  BookOpen, 
  FileCheck, 
  BarChart3, 
  LifeBuoy, 
  Repeat, 
  Package,
  ShieldCheck,
  CreditCard,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CheckoutButton } from '@/components/checkout-button';

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Lock,
    MapPin,
    FileText,
    Shield,
    Clock,
    KeyRound,
    Eye,
    RefreshCw,
    Puzzle,
    Upload,
    Palette,
    Mail,
    Users,
    BookOpen,
    FileCheck,
    BarChart3,
    LifeBuoy,
    Repeat,
    Package,
    ShieldCheck
  };
  return icons[iconName] || Shield;
};

const plans = [
  {
    name: 'Starter',
    label: 'Starter',
    subline: 'For trying VaultNote privately.',
    price: 'Free',
    priceDetail: '',
    limits: '20 Notes · 24h link expiry · 100 MB storage',
    features: [
      { 
        icon: 'Lock', 
        text: 'Zero-knowledge encryption (AES-256-GCM)',
        tooltip: 'Military-grade encryption. Your content is encrypted on your device before upload. We never see or hold decryption keys.'
      },
      { 
        icon: 'MapPin', 
        text: 'Swiss hosting',
        tooltip: 'All data is stored in Swiss data centers subject to Swiss privacy law.'
      },
      { icon: 'FileText', text: 'Basic editor (plain text + line breaks)' },
      { icon: 'Clock', text: 'Share links expire after 24 hours' },
      { icon: 'Shield', text: 'No tracking (no analytics, no ads)' },
    ],
    cta: 'Start free',
    ctaLink: '/create',
    popular: false,
  },
  {
    name: 'Pro',
    label: 'Pro',
    subline: 'For power users who share securely.',
    price: '5',
    priceDetail: '/ month',
    priceAnnual: 'or $49 / year',
    limits: 'Unlimited Notes · Up to 30 days expiry · 5 GB storage',
    features: [
      { 
        icon: 'Lock', 
        text: 'Same military-grade encryption as Starter',
        tooltip: 'Identical AES-256-GCM encryption for all plans. Security is never a premium feature.'
      },
      { icon: 'FileText', text: 'Rich editor (Markdown preview, code blocks)' },
      { icon: 'Clock', text: 'Custom link expiry (1h to 30 days)' },
      { icon: 'KeyRound', text: 'Password-protected links (extra layer of security)' },
      { 
        icon: 'Eye', 
        text: 'Privacy-safe access counter',
        tooltip: 'We increment a counter on open; no IP logging, no user fingerprinting.'
      },
      { icon: 'RefreshCw', text: 'Encrypted sync across devices (end-to-end)' },
      { icon: 'Puzzle', text: 'Browser extension (coming soon)' },
      { icon: 'Upload', text: 'Attachments (up to 10 MB per note)' },
      { icon: 'Palette', text: 'Custom theme (light/dark/auto)' },
      { icon: 'Mail', text: 'Email support (48h)' },
    ],
    cta: 'Upgrade to Pro',
    ctaLink: '/create',
    popular: true,
  },
  {
    name: 'Business',
    label: 'Business',
    subline: 'For teams & organizations needing control.',
    price: '9',
    priceDetail: '/ user / month',
    priceAnnual: 'or $89 / user / year',
    limits: 'Team vaults · Role-based access · 20 GB / user',
    features: [
      { icon: 'Users', text: 'Shared vaults (owner · admin · member roles)' },
      { icon: 'BookOpen', text: 'Collections & permissions (granular access control)' },
      { 
        icon: 'FileCheck', 
        text: 'Audit log',
        tooltip: 'Captures share/create/delete events with timestamps; content is never logged.'
      },
      { 
        icon: 'KeyRound', 
        text: 'SSO / SAML (Google / Microsoft Entra)',
        tooltip: 'Centralized authentication via your identity provider.'
      },
      { icon: 'FileText', text: 'DPA & GDPR/Swiss DPA compliance pack' },
      { icon: 'BarChart3', text: 'Admin dashboard (usage, storage, link policies)' },
      { icon: 'LifeBuoy', text: 'Priority support (same-day)' },
      { icon: 'Repeat', text: 'API access (service tokens, rate-limited)' },
      { icon: 'Package', text: 'Backups & retention policies (configurable)' },
      { 
        icon: 'ShieldCheck', 
        text: '99.9% SLA (business hours)',
        tooltip: '99.9% monthly uptime target; credits if we miss.'
      },
    ],
    cta: 'Contact sales',
    ctaLink: 'mailto:hello@vaultnote.net',
    ctaSecondary: 'Start trial',
    popular: false,
  },
];

export function PricingSection() {
  return (
    <>
      {/* Hero Section - consistent with other pages */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2">
              <CreditCard className="mr-2 h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Simple Pricing</span>
            </div>

            <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="block">Plans that scale with</span>
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                your privacy needs
              </span>
            </h1>

            <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
              Zero-knowledge encryption on every plan. Swiss hosting. No tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-24 sm:pb-32 bg-background">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border ${
                  plan.popular
                    ? 'border-primary/50 bg-card/80 shadow-lg shadow-primary/5'
                    : 'border-border/40 bg-card/50'
                } p-8 flex flex-col`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      Most popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {plan.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{plan.subline}</p>
                  
                  <div className="flex items-baseline gap-2 mb-2">
                    {plan.price !== 'Free' ? (
                      <span className="text-4xl font-bold tracking-tight">${plan.price}</span>
                    ) : (
                      <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    )}
                    {plan.priceDetail && (
                      <span className="text-muted-foreground">{plan.priceDetail}</span>
                    )}
                  </div>
                  
                  {plan.priceAnnual && (
                    <p className="text-sm text-muted-foreground">{plan.priceAnnual}</p>
                  )}
                  
                  <p className="text-sm text-muted-foreground mt-3 flex items-center gap-2">
                    <Info className="h-4 w-4 flex-shrink-0" />
                    <span>{plan.limits}</span>
                  </p>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => {
                    const IconComponent = getIconComponent(feature.icon);
                    return (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <IconComponent className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="flex items-center gap-2 flex-1">
                          {feature.text}
                          {feature.tooltip && (
                            <span className="group relative">
                              <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help flex-shrink-0" />
                              <span className="invisible group-hover:visible absolute left-0 bottom-full mb-2 w-64 p-2 text-xs bg-popover text-popover-foreground border border-border rounded-md shadow-lg z-50">
                                {feature.tooltip}
                              </span>
                            </span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* CTA Button */}
                <div className="space-y-3">
                  {plan.name === 'Starter' ? (
                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-12 text-base font-semibold"
                    >
                      <Link href={plan.ctaLink}>{plan.cta}</Link>
                    </Button>
                  ) : plan.name === 'Pro' ? (
                    <CheckoutButton
                      plan="pro"
                      interval="monthly"
                      variant="default"
                      className="w-full h-12 text-base font-semibold"
                    >
                      {plan.cta}
                    </CheckoutButton>
                  ) : plan.name === 'Business' ? (
                    <>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full h-12 text-base font-semibold"
                      >
                        <Link href={plan.ctaLink}>{plan.cta}</Link>
                      </Button>
                      {plan.ctaSecondary && (
                        <CheckoutButton
                          plan="business"
                          interval="monthly"
                          variant="ghost"
                          className="w-full h-10 text-sm"
                        >
                          {plan.ctaSecondary}
                        </CheckoutButton>
                      )}
                    </>
                  ) : null}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
