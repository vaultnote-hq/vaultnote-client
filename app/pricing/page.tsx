import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { PricingSection } from '@/components/pricing-section';

// 1. SEO OPTIMIERUNG: Metadaten für Pricing & Kaufentscheidung
export const metadata: Metadata = {
  title: "VaultNote Pricing | Free Encrypted Notes & Enterprise Plans",
  description: "Start for free with secure, self-destructing notes. Upgrade for team management, API access, and advanced compliance features. Swiss-hosted privacy.",
  alternates: {
    canonical: 'https://vaultnote.net/pricing',
  },
  openGraph: {
    title: "Simple, Transparent Pricing | VaultNote",
    description: "Free for individuals, powerful for teams. Zero-knowledge encryption included in every plan.",
  }
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/pricing" />

      <PricingSection />
      
      <Footer />
    </div>
  );
}