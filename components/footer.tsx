import Link from 'next/link';
import { Github } from 'lucide-react';
import { VaultNoteLogo } from '@/components/vaultnote-logo';

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-background to-background/80 border-t border-border/60">
      <div className="mx-auto max-w-screen-xl px-6 py-16 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <VaultNoteLogo className="h-8 w-8 text-primary" />
              <h3 className="text-xl font-bold tracking-tight">VaultNote</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Advanced zero-knowledge encryption with Swiss hosting infrastructure.
              Your privacy, secured by design.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Platform
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/create" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Create Note
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privnote-alternative" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privnote Alternative
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Use Cases
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/share/wifi-password" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Share WiFi
                </Link>
              </li>
              <li>
                <Link href="/share/password" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Share Password
                </Link>
              </li>
              <li>
                <Link href="/share/api-key" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Share API Key
                </Link>
              </li>
              <li>
                <Link href="/share/credit-card" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Share Credit Card
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 VaultNote. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/legal" className="text-muted-foreground hover:text-foreground transition-colors">
                Legal
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="https://github.com/vaultnote-hq/vaultnote-client" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-4 w-4" />
                Source Code
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
