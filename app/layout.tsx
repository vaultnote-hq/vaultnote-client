import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { constructMetadata, generateWebApplicationSchema, generateOrganizationSchema } from '@/lib/seo';
import { ToastProvider } from '@/components/toast-provider';
import { SessionProvider } from '@/components/providers/session-provider';
import { CookieBanner } from '@/components/cookie-banner';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = constructMetadata({
  title: 'VaultNote - Secure Encrypted Notes with Self-Destruct',
  description: 'Create encrypted notes that self-destruct after reading. Zero-knowledge encryption and Swiss privacy standards ensure your sensitive data stays secure.',
  canonicalUrl: 'https://vaultnote.net',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebApplicationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ToastProvider />
          {children}
          <CookieBanner />
        </SessionProvider>
      </body>
    </html>
  );
}
