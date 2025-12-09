'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Settings } from 'lucide-react';

interface ManageSubscriptionButtonProps {
  className?: string;
}

export function ManageSubscriptionButton({ className }: ManageSubscriptionButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleManage = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Portal error:', data.error);
        alert('Failed to open subscription portal. Please try again.');
      }
    } catch (error) {
      console.error('Portal error:', error);
      alert('Failed to open subscription portal. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleManage}
      disabled={loading}
      variant="outline"
      className={className}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          <Settings className="mr-2 h-4 w-4" />
          Manage Subscription
        </>
      )}
    </Button>
  );
}
