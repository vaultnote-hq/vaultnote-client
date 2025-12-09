'use client';

import Link from 'next/link';
import { Lock, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VaultNoteLogo } from '@/components/vaultnote-logo';

interface ViralCTAProps {
  variant?: 'default' | 'minimal';
}

export function ViralCTA({ variant = 'default' }: ViralCTAProps) {
  if (variant === 'minimal') {
    return (
      <div className="mt-8 pt-6 border-t border-border">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <VaultNoteLogo className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">
              Secured by <span className="font-semibold text-foreground">VaultNote</span>
            </span>
          </div>
          <Button asChild size="sm" variant="outline">
            <Link href="/create">
              <Lock className="mr-1.5 h-3.5 w-3.5" />
              Create Your Own
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-2">
            Want to send secure notes too?
          </h3>
          <p className="text-muted-foreground mb-4">
            Create encrypted, self-destructing notes in seconds. No registration required.
            Military-grade security for your sensitive information.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/create">
                <Lock className="mr-2 h-4 w-4" />
                Create Secure Note
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/features">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Trust indicators */}
      <div className="mt-6 pt-6 border-t border-primary/10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-primary" />
          <span>End-to-end encrypted</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-primary" />
          <span>Zero-knowledge architecture</span>
        </div>
        <div className="flex items-center gap-2">
          <VaultNoteLogo className="h-4 w-4 text-primary" />
          <span>Swiss hosting</span>
        </div>
      </div>
    </div>
  );
}
