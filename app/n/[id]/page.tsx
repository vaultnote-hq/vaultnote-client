'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ArrowLeft, Shield, Clock, Eye, AlertTriangle, Lock, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { decrypt, stringToKey, decryptWithPassword } from '@/lib/crypto';
import { CategoryBadge, type NoteCategory } from '@/components/category-badge';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { toast } from 'sonner';
import { ViralCTA } from '@/components/viral-cta';
import { SocialShare } from '@/components/social-share';

export default function NotePage() {
  const params = useParams();
  const id = params.id as string;
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [remainingReads, setRemainingReads] = useState<number | null>(null);
  const [isProtected, setIsProtected] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [noteInfo, setNoteInfo] = useState({
    authorName: '',
    authorEmail: '',
    createdAt: '',
    expiresAt: '',
    isExpired: false,
    viewCount: 0,
    maxViews: null as number | null,
    deleteAfterReading: false
  });
  const [images, setImages] = useState<any[] | null>(null);
  const [noteTitle, setNoteTitle] = useState<string>('');
  const [category, setCategory] = useState<NoteCategory>(null);

  useEffect(() => {
    const loadNote = async () => {
      try {
        // Fetch encrypted note
        const response = await fetch(`/api/notes/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          let errorMessage = 'Note not found or expired';

          switch (response.status) {
            case 404:
              errorMessage = 'This note was not found or has already expired.';
              break;
            case 403:
              errorMessage = 'Access denied. Please check the link or password.';
              break;
            case 410:
              errorMessage = 'This note has already been read and is no longer available.';
              break;
            case 429:
              errorMessage = 'Too many requests. Please wait a moment.';
              break;
            default:
              errorMessage = errorData.error || errorMessage;
          }

          setError(errorMessage);
          setLoading(false);
          return;
        }

        const { ciphertext, iv, remainingReadsPreview, isProtected: protectedFlag, encryptedKey, keyIv, salt, images: noteImages, title, authorName, authorEmail, category: noteCategory, createdAt, expiresAt, viewCount, maxViews, deleteAfterReading } = await response.json();

      setIsProtected(protectedFlag || false);
      setImages(noteImages);
      setNoteTitle(title || '');
      setCategory(noteCategory as NoteCategory);

      // Set note information
      setNoteInfo({
        authorName: authorName || 'Anonymous',
        authorEmail: authorEmail || '',
        createdAt: createdAt || '',
        expiresAt: expiresAt || '',
        isExpired: false,
        viewCount: viewCount || 0,
        maxViews: maxViews,
        deleteAfterReading: deleteAfterReading || false
      });

      if (protectedFlag) {
        // Password-protected note - wait for user input
        setLoading(false);
        return;
      }

        // Regular note - decrypt with URL key
        const hash = window.location.hash.slice(1); // Remove #
        if (!hash) {
          setError('No decryption key found in URL. Please check the share link.');
          setLoading(false);
          return;
        }

        // Decrypt
        const key = await stringToKey(hash);
        const ciphertextBuffer = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
        const ivBuffer = Uint8Array.from(atob(iv), c => c.charCodeAt(0));

        const decrypted = await decrypt(ciphertextBuffer.buffer, ivBuffer, key);
        setContent(decrypted);
        setRemainingReads(remainingReadsPreview);
      } catch (err) {
        console.error('Load note error:', err);
        setError('Error loading note.');
      } finally {
        if (!isProtected) {
          setLoading(false);
        }
      }
    };

    if (id) {
      loadNote();
    }
  }, [id, isProtected]);

  // Check if note should self-destruct
  useEffect(() => {
    if (noteInfo.maxViews && noteInfo.viewCount >= noteInfo.maxViews) {
      setError('This note has reached its maximum view count and is no longer available.');
    } else if (noteInfo.expiresAt && new Date(noteInfo.expiresAt) < new Date()) {
      setError('This note has expired and is no longer available.');
    }
  }, [noteInfo]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    setPasswordError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/notes/${id}`);
      if (!response.ok) {
        throw new Error('Note not found');
      }

      const { ciphertext, iv, remainingReadsPreview, encryptedKey, keyIv, salt, title, authorName, authorEmail, category: noteCategory, createdAt, expiresAt, viewCount, maxViews, deleteAfterReading, images: noteImages } = await response.json();

      if (!encryptedKey || !keyIv || !salt) {
        throw new Error('Invalid password-protected note');
      }

      // Decrypt with password
      const ciphertextBuffer = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
      const ivBuffer = Uint8Array.from(atob(iv), c => c.charCodeAt(0));
      const encryptedKeyBuffer = Uint8Array.from(atob(encryptedKey), c => c.charCodeAt(0));
      const keyIvBuffer = Uint8Array.from(atob(keyIv), c => c.charCodeAt(0));
      const saltBuffer = Uint8Array.from(atob(salt), c => c.charCodeAt(0));

      const decrypted = await decryptWithPassword(
        ciphertextBuffer.buffer,
        ivBuffer,
        encryptedKeyBuffer.buffer,
        keyIvBuffer,
        saltBuffer,
        password
      );

      setContent(decrypted);
      setRemainingReads(remainingReadsPreview);
      setNoteTitle(title || '');
      setImages(noteImages);
      setCategory(noteCategory as NoteCategory);

      // Set note information
      setNoteInfo({
        authorName: authorName || 'Anonymous',
        authorEmail: authorEmail || '',
        createdAt: createdAt || '',
        expiresAt: expiresAt || '',
        isExpired: false,
        viewCount: viewCount || 0,
        maxViews: maxViews,
        deleteAfterReading: deleteAfterReading || false
      });

      setLoading(false);
    } catch (err) {
      console.error('Password decrypt error:', err);
      setPasswordError('Incorrect password. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-surface-100 mb-2">Loading note...</h2>
          <p className="text-surface-400">Please wait while your secure note is being prepared.</p>
        </div>
      </div>
    );
  }

  if (isProtected && !content) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="max-w-md mx-auto p-6 pt-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Home
            </Link>
          </div>

          {/* Password Form */}
          <div className="bg-card p-8 rounded-xl border border-border shadow-lg text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary" />
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-4">
              Password Protected Note
            </h1>

            <p className="text-muted-foreground mb-6">
              This note is protected with a password. Enter the password to decrypt it.
            </p>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
              >
                {loading ? 'Decrypting...' : 'Decrypt Note'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center">
          {/* Success/Status Icon */}
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-in zoom-in duration-300">
            <Shield className="h-10 w-10 text-primary" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
            Note Destroyed
          </h1>

          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            {error === 'This note has already been read and is no longer available.' 
              ? "This note was read and has been permanently deleted. No trace remains."
              : error}
          </p>

          {/* Viral CTA Card */}
          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg transform transition-all hover:scale-105 duration-300">
            <h2 className="text-xl font-semibold mb-4">
              Need to send a secret?
            </h2>
            <p className="text-muted-foreground mb-8">
              Send passwords, API keys, or private messages securely. 
              They self-destruct automatically.
            </p>
            
            <Link href="/create" className="block w-full">
              <Button size="lg" className="w-full h-14 text-lg font-semibold shadow-primary/25 shadow-xl">
                <Lock className="mr-2 h-5 w-5" />
                Create Secure Note
              </Button>
            </Link>
            
            <p className="mt-4 text-sm text-muted-foreground">
              No account required · Free forever
            </p>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath={`/n/${id}`} />

      {/* Security Info Banner */}
      <div className="bg-primary/5 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {isProtected ? 'Password Protected' : 'End-to-End Encrypted'}
                </span>
              </div>
              {remainingReads !== null && (
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {remainingReads} reads left
                  </span>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url);
                toast.success('Link copied to clipboard!');
              }}
            >
              Share Note
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Main Content - Left Column */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
              {/* Title */}
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-white" />
                    <h1 className="text-2xl font-bold text-white">
                      {noteTitle || 'Secure Note'}
                    </h1>
                  </div>
                </div>
                {category && (
                  <div className="mb-3">
                    <CategoryBadge category={category} />
                  </div>
                )}
                <div className="flex items-center gap-2 text-primary-100 text-sm">
                  <span>Decrypted note from {noteInfo.authorName}</span>
                </div>
              </div>

              {/* Content - with subtle user content indicator */}
              <div className="p-8">
                {/* Subtle left border to indicate user content */}
                <div className="border-l-4 border-primary/30 pl-6 -ml-2">
                  <div
                    className="prose prose-neutral max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-blockquote:border-border dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>

                {/* Images */}
                {images && images.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Attachments ({images.length})</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {images.map((image: any, index: number) => (
                          <div key={index} className="border border-border rounded-lg overflow-hidden bg-muted/30">
                            <div className="aspect-square relative">
                              <img
                                src={image.data}
                                alt={image.name || `Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3 bg-muted/50">
                              <p className="text-sm font-medium text-foreground truncate" title={image.name}>
                                {image.name || `Image ${index + 1}`}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {image.size ? (image.size / 1024 / 1024).toFixed(1) + ' MB' : 'Unknown size'}
                              </p>
                            </div>
                          </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Warning Footer - Show if delete after reading is enabled OR maxViews is 1 */}
              {(noteInfo.deleteAfterReading || noteInfo.maxViews === 1) && (
                <div className="bg-amber-50/10 border-t border-border px-8 py-6">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-sm font-medium text-amber-400 mb-1">
                        Security Notice
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        This note may no longer be available after closing this page.
                        Copy any important information before leaving.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Security Features */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Security Features</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">AES-256-GCM Encryption</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Zero-Knowledge Architecture</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-muted-foreground">Self-Destructing</span>
                </div>
              </div>
            </div>

            {/* Note Info */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Note Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Author</label>
                  <p className="text-sm text-foreground mt-1">
                    {noteInfo.authorEmail ? (
                      <span>{noteInfo.authorName} ({noteInfo.authorEmail})</span>
                    ) : (
                      <span>{noteInfo.authorName}</span>
                    )}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Views</label>
                  <p className="text-sm text-foreground mt-1">
                    {noteInfo.viewCount} of {noteInfo.maxViews ? noteInfo.maxViews : '∞'} views
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-sm text-foreground mt-1">
                    {noteInfo.createdAt ? new Date(noteInfo.createdAt).toLocaleString() : 'Unknown'}
                  </p>
                </div>

                {noteInfo.expiresAt && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Expires</label>
                    <p className="text-sm text-foreground mt-1">
                      {new Date(noteInfo.expiresAt).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Share */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-4">Share This Note</h3>
              <SocialShare 
                url={typeof window !== 'undefined' ? window.location.href : ''} 
                title="Check out this secure note"
              />
            </div>

            {/* Actions */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <Button asChild size="lg" className="w-full h-12 text-base">
                <Link href="/create">
                  <FileText className="mr-2 h-5 w-5" />
                  Create Your Own Note
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Viral CTA - Encourage recipients to create their own notes */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <ViralCTA />
        </div>
      </div>

      <Footer />
    </div>
  );
}
