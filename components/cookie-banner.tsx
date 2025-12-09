'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Cookie, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COOKIE_CONSENT_KEY = 'vaultnote-cookie-consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small delay to avoid layout shift on page load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      accepted: true,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }));
    setIsVisible(false);
  };

  const handleDecline = () => {
    // Even if declined, we still need essential cookies for the site to work
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
      accepted: false,
      essential_only: true,
      timestamp: new Date().toISOString(),
      version: '1.0',
    }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">Cookie Notice</h3>
                <button
                  onClick={handleDecline}
                  className="text-muted-foreground hover:text-foreground transition-colors sm:hidden"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                We use <strong>essential cookies only</strong> to keep you logged in and ensure the site works properly. 
                We do <strong>not</strong> use tracking, analytics, or advertising cookies.
              </p>

              {showDetails && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Essential Cookies</p>
                      <p className="text-xs text-muted-foreground">
                        Session management, authentication, and security. Required for the site to function.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">No Tracking Cookies</p>
                      <p className="text-xs text-muted-foreground">
                        We don't use Google Analytics, Facebook Pixel, or any third-party tracking.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <X className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">No Advertising Cookies</p>
                      <p className="text-xs text-muted-foreground">
                        We don't serve ads or share data with advertisers.
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground pt-2 border-t border-border">
                    For payment processing, Stripe may set its own cookies. See our{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>{' '}
                    for details.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
                <Button onClick={handleAccept} size="sm" className="order-1 sm:order-2">
                  Accept
                </Button>
                <Button 
                  onClick={handleDecline} 
                  variant="outline" 
                  size="sm"
                  className="order-2 sm:order-1"
                >
                  Essential Only
                </Button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-xs text-muted-foreground hover:text-foreground underline order-3 py-2"
                >
                  {showDetails ? 'Hide details' : 'Learn more'}
                </button>
                <Link 
                  href="/privacy" 
                  className="text-xs text-muted-foreground hover:text-foreground underline order-4 py-2 sm:ml-auto"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
