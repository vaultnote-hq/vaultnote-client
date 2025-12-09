'use client';

import { useState, useEffect } from 'react';
import { Copy, Check, Linkedin, Mail, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
}

export function SocialShare({ url, title = 'Check out this secure note', description = 'Sent via VaultNote - Secure encrypted notes' }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url || '');
  const [canShare, setCanShare] = useState(false);
  
  useEffect(() => {
    // Set URL on client side
    if (!url && typeof window !== 'undefined') {
      setShareUrl(window.location.href);
    }
    // Check if native share is available
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      setCanShare(true);
    }
  }, [url]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
    }
  };

  const shareOnX = () => {
    const text = encodeURIComponent(`${title}\n\n${shareUrl}`);
    window.open(`https://x.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    const encodedUrl = encodeURIComponent(shareUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopy}
        className="gap-2"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
        {copied ? 'Copied!' : 'Copy Link'}
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={shareOnX}
        className="h-9 w-9"
        title="Share on X"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={shareOnLinkedIn}
        className="h-9 w-9"
        title="Share on LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={shareViaEmail}
        className="h-9 w-9"
        title="Share via Email"
      >
        <Mail className="h-4 w-4" />
      </Button>

      {canShare && (
        <Button
          variant="outline"
          size="icon"
          onClick={handleNativeShare}
          className="h-9 w-9"
          title="Share"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
