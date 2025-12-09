'use client';

import Link from 'next/link';
import { Shield, FileText, DollarSign, AlertCircle, BarChart3 } from 'lucide-react';

interface InternalLink {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const internalLinks: InternalLink[] = [
  {
    href: '/create',
    title: 'Create Secure Note',
    description: 'Create a new encrypted note that self-destructs after reading',
    icon: <FileText className="h-5 w-5" />,
  },
  {
    href: '/pricing',
    title: 'Pricing Plans',
    description: 'View our transparent pricing for premium features',
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    href: '/privacy',
    title: 'Privacy Policy',
    description: 'Learn how we protect your data and privacy',
    icon: <Shield className="h-5 w-5" />,
  },
  {
    href: '/terms',
    title: 'Terms of Service',
    description: 'Read our terms and conditions',
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    href: '/status',
    title: 'Service Status',
    description: 'Check the current status of our services',
    icon: <BarChart3 className="h-5 w-5" />,
  },
];

interface InternalLinksProps {
  exclude?: string[];
  limit?: number;
  className?: string;
}

export function InternalLinks({ exclude = [], limit, className = '' }: InternalLinksProps) {
  const filteredLinks = internalLinks
    .filter(link => !exclude.includes(link.href))
    .slice(0, limit);

  return (
    <div className={`grid gap-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4">Explore VaultNote</h3>
      <div className="grid gap-3">
        {filteredLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
          >
            <div className="flex-shrink-0 mt-0.5 text-muted-foreground group-hover:text-foreground transition-colors">
              {link.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                {link.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {link.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// Quick navigation component for footer
export function QuickNavigation({ className = '' }: { className?: string }) {
  return (
    <nav className={`${className}`} aria-label="Quick navigation">
      <h4 className="font-semibold mb-3">Quick Links</h4>
      <ul className="space-y-2">
        {internalLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
            >
              {link.icon}
              <span>{link.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
