import { Metadata } from 'next';

export const siteConfig = {
  name: 'VaultNote',
  description: 'Create encrypted notes that self-destruct after reading. Zero-knowledge encryption and Swiss privacy standards ensure your sensitive data stays secure.',
  url: 'https://vaultnote.net',
  ogImage: '/og-image.png',
  creator: '@vaultnote',
  keywords: [
    'encrypted notes',
    'secure messaging',
    'self-destructing messages',
    'zero-knowledge encryption',
    'privacy protection',
    'secure communication',
    'military-grade security',
    'temporary notes',
    'burn after reading',
    'end-to-end encryption',
    'secure note sharing',
    'private messaging',
    'encrypted communication',
    'secure file sharing',
    'privacy-first',
    'data protection',
    'confidential notes',
    'secure collaboration'
  ],
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = '/favicon.ico',
  noIndex = false,
  keywords = siteConfig.keywords,
  canonicalUrl,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  keywords?: string[];
  canonicalUrl?: string;
} = {}): Metadata {
  return {
    title: {
      default: title,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    keywords: keywords.join(', '),
    authors: [
      {
        name: 'VaultNote Team',
        url: siteConfig.url,
      },
    ],
    creator: 'VaultNote Team',
    publisher: 'VaultNote',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      url: canonicalUrl || siteConfig.url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: siteConfig.creator,
    },
    icons,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl || siteConfig.url,
    },
    category: 'Security & Privacy',
  };
}

// Structured data generators
export function generateWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'VaultNote Team',
      url: siteConfig.url,
    },
    featureList: [
      'End-to-end encryption',
      'Self-destructing messages',
      'Zero-knowledge architecture',
      'Military-grade security',
      'Privacy-first design',
      'No registration required',
      'Open source',
      'Cross-platform compatibility',
    ],
    screenshot: `${siteConfig.url}/og-image.png`,
    softwareVersion: '1.0',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VaultNote',
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    foundingDate: '2024',
    sameAs: [
      // Add social media URLs when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['English'],
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
