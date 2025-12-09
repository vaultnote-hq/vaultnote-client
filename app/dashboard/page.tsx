'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Plus, 
  FileText, 
  Clock, 
  Eye, 
  Shield, 
  Trash2, 
  Info,
  Lock,
  Crown,
  AlertCircle,
  RefreshCw,
  Cloud,
  CheckCircle2,
  Smartphone,
  Bomb,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ManageSubscriptionButton } from '@/components/manage-subscription-button';

interface Note {
  id: string;
  title: string | null;
  createdAt: string;
  expiresAt: string | null;
  viewCount: number;
  maxViews: number | null;
  isProtected: boolean;
  deleteAfterReading: boolean;
}

interface DestroyedNote {
  id: string;
  title: string | null;
  destroyedAt: string;
  reason: 'read' | 'expired' | 'manual';
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalNotes: 0,
    activeNotes: 0,
    totalViews: 0,
  });
  const [destroyedNotes, setDestroyedNotes] = useState<DestroyedNote[]>([]);
  const [showDestroyedLog, setShowDestroyedLog] = useState(false);

  // Load destroyed notes from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('vaultnote_destroyed_log');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Keep only last 20 entries
        setDestroyedNotes(parsed.slice(0, 20));
      } catch (e) {
        console.error('Failed to parse destroyed log:', e);
      }
    }
  }, []);

  // Function to add a destroyed note to the log
  const addToDestroyedLog = (note: Note, reason: 'read' | 'expired' | 'manual') => {
    const destroyedNote: DestroyedNote = {
      id: note.id,
      title: note.title,
      destroyedAt: new Date().toISOString(),
      reason,
    };
    
    setDestroyedNotes(prev => {
      const updated = [destroyedNote, ...prev].slice(0, 20);
      localStorage.setItem('vaultnote_destroyed_log', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?callbackUrl=/dashboard');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchNotes();
    }
  }, [session]);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/user/notes');
      if (response.ok) {
        const data = await response.json();
        setNotes(data.notes || []);
        setStats({
          totalNotes: data.stats?.totalNotes || 0,
          activeNotes: data.stats?.activeNotes || 0,
          totalViews: data.stats?.totalViews || 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      const noteToDelete = notes.find(n => n.id === noteId);
      const response = await fetch(`/api/user/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Add to destroyed log before removing from list
        if (noteToDelete) {
          addToDestroyedLog(noteToDelete, 'manual');
        }
        setNotes(notes.filter((note) => note.id !== noteId));
        toast.success('Note destroyed! 💥', {
          description: 'The note has been permanently deleted.',
        });
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
      toast.error('Failed to delete note');
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const user = session.user as any;
  const usagePercent = Math.round((user.notesCreated / user.notesLimit) * 100);
  const isNearLimit = usagePercent >= 80;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header currentPath="/dashboard" />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {user.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your secure notes and track their activity
            </p>
          </div>

          {/* Sync Status Banner (Pro only) */}
          {user.plan !== 'free' && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Cloud className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <p className="font-medium text-green-600 dark:text-green-400">
                      Encrypted Sync Active
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your notes are synced end-to-end encrypted across all your devices
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Smartphone className="h-4 w-4" />
                <span>All devices</span>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Notes</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalNotes}</p>
                </div>
                <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Notes</p>
                  <p className="text-2xl font-bold mt-1">{stats.activeNotes}</p>
                </div>
                <div className="h-10 w-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold mt-1">{stats.totalViews}</p>
                </div>
                <div className="h-10 w-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Plan</p>
                  <p className="text-2xl font-bold mt-1 capitalize">{user.plan}</p>
                </div>
                <div className="h-10 w-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                  <Crown className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              {user.plan !== 'free' && (
                <div className="mt-4 pt-4 border-t border-border">
                  <ManageSubscriptionButton className="w-full" />
                </div>
              )}
              {user.plan === 'free' && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Button asChild variant="outline" className="w-full" size="sm">
                    <Link href="/pricing">Upgrade</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Usage Warning */}
          {isNearLimit && user.plan === 'free' && (
            <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-medium text-amber-500">
                    You've used {usagePercent}% of your free tier
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user.notesCreated} of {user.notesLimit} notes created
                  </p>
                </div>
              </div>
              <Button asChild size="sm">
                <Link href="/pricing">Upgrade to Pro</Link>
              </Button>
            </div>
          )}

          {/* Destroyed Log Section */}
          {destroyedNotes.length > 0 && (
            <div className="mb-8">
              <button
                onClick={() => setShowDestroyedLog(!showDestroyedLog)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <Bomb className="h-4 w-4" />
                <span>Destruction Log ({destroyedNotes.length})</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${showDestroyedLog ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              
              {showDestroyedLog && (
                <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <p className="text-sm text-muted-foreground">
                      Your notes that have been destroyed. This log is stored locally in your browser.
                    </p>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {destroyedNotes.map((note, index) => (
                      <div
                        key={`${note.id}-${index}`}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 bg-red-500/10 rounded-full flex items-center justify-center">
                            <Bomb className="h-4 w-4 text-red-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {note.title || `Note #${note.id.slice(0, 8)}...`}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(note.destroyedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          note.reason === 'read' 
                            ? 'bg-green-500/10 text-green-500' 
                            : note.reason === 'expired'
                            ? 'bg-amber-500/10 text-amber-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {note.reason === 'read' ? '👁️ Read & Destroyed' : 
                           note.reason === 'expired' ? '⏰ Expired' : 
                           '🗑️ Manually Deleted'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('vaultnote_destroyed_log');
                      setDestroyedNotes([]);
                      toast.success('Destruction log cleared');
                    }}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear log
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Your Notes</h2>
            <Button asChild>
              <Link href="/create">
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Link>
            </Button>
          </div>

          {/* Notes List */}
          {notes.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-12 text-center">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first secure note to get started
              </p>
              <Button asChild>
                <Link href="/create">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Note
                </Link>
              </Button>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-medium text-sm">Title</th>
                      <th className="text-left p-4 font-medium text-sm">Created</th>
                      <th className="text-left p-4 font-medium text-sm">Expires</th>
                      <th className="text-left p-4 font-medium text-sm">Views</th>
                      <th className="text-left p-4 font-medium text-sm">Security</th>
                      <th className="text-right p-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.map((note) => (
                      <tr key={note.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="p-4">
                          <span className="font-medium">
                            {note.title || 'Untitled Note'}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {new Date(note.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">
                          {note.expiresAt
                            ? new Date(note.expiresAt).toLocaleDateString()
                            : 'Never'}
                        </td>
                        <td className="p-4 text-sm">
                          {note.viewCount}
                          {note.maxViews && ` / ${note.maxViews}`}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {note.isProtected && (
                              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                <Lock className="h-3 w-3" />
                                Password
                              </span>
                            )}
                            {note.deleteAfterReading && (
                              <span className="inline-flex items-center gap-1 text-xs bg-amber-500/10 text-amber-500 px-2 py-1 rounded">
                                <Trash2 className="h-3 w-3" />
                                Self-destruct
                              </span>
                            )}
                            {!note.isProtected && !note.deleteAfterReading && (
                              <span className="inline-flex items-center gap-1 text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">
                                <Shield className="h-3 w-3" />
                                Encrypted
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                toast.info(
                                  'Share links are only available right after creating a note. The decryption key is not stored for security.',
                                  { duration: 5000 }
                                );
                              }}
                              title="Note info"
                            >
                              <Info className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNote(note.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
