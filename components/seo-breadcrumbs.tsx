'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { generateBreadcrumbSchema } from '@/lib/seo';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface SEOBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function SEOBreadcrumbs({ items, className = '' }: SEOBreadcrumbsProps) {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://vaultnote.net' },
    ...items.map(item => ({ name: item.name, url: `https://vaultnote.net${item.href}` }))
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbItems)),
        }}
      />
      <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm text-muted-foreground ${className}`}>
        <Link 
          href="/" 
          className="flex items-center hover:text-foreground transition-colors"
          aria-label="Go to homepage"
        >
          <Home className="h-4 w-4" />
          <span className="sr-only">Home</span>
        </Link>
        
        {items.map((item, index) => (
          <div key={item.href} className="flex items-center space-x-2">
            <ChevronRight className="h-4 w-4" />
            {index === items.length - 1 ? (
              <span className="font-medium text-foreground" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className="hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
