'use client';

import { useEffect, useState, useCallback } from 'react';
import { 
  Search, 
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Eye,
  Lock,
  Clock,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Note {
  id: string;
  createdAt: string;
  expiresAt: string | null;
  consumedAt: string | null;
  viewCount: number;
  maxViews: number | null;
  remainingReads: number | null;
  deleteAfterReading: boolean;
  isProtected: boolean;
  userId: string | null;
  user: { id: string; email: string; name: string | null } | null;
  status: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

function formatDate(date: string | null): string {
  if (!date) return 'Never';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

function getTimeRemaining(expiresAt: string | null): string {
  if (!expiresAt) return 'Never';
  const now = new Date();
  const expires = new Date(expiresAt);
  if (expires < now) return 'Expired';
  
  const diff = expires.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h`;
  return `${Math.floor(diff / (1000 * 60))}m`;
}

export default function AdminNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [hasUserFilter, setHasUserFilter] = useState('');
  
  // Modal states
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });
      if (search) params.set('search', search);
      if (statusFilter && statusFilter !== 'all') params.set('status', statusFilter);
      if (hasUserFilter && hasUserFilter !== 'all') params.set('hasUser', hasUserFilter);

      const res = await fetch(`/api/admin/notes?${params}`);
      if (!res.ok) throw new Error('Failed to fetch notes');
      const data = await res.json();
      setNotes(data.notes);
      setPagination(data.pagination);
    } catch (err) {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, statusFilter, hasUserFilter]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleDelete = async () => {
    if (!selectedNote) return;
    
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/notes?noteId=${selectedNote.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Delete failed');
      }

      toast.success('Note deleted successfully');
      setDeleteModal(false);
      setSelectedNote(null);
      fetchNotes();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'expired':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">Expired</span>;
      case 'consumed':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600">Consumed</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600">Active</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="text-muted-foreground">View and manage all notes</p>
        </div>
        <Button onClick={fetchNotes} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by note ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="consumed">Consumed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={hasUserFilter} onValueChange={setHasUserFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Notes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Notes</SelectItem>
            <SelectItem value="true">With User</SelectItem>
            <SelectItem value="false">Anonymous</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-sm">Note ID</th>
                <th className="text-left p-4 font-medium text-sm">User</th>
                <th className="text-left p-4 font-medium text-sm">Status</th>
                <th className="text-left p-4 font-medium text-sm">Views</th>
                <th className="text-left p-4 font-medium text-sm">Expires</th>
                <th className="text-left p-4 font-medium text-sm">Features</th>
                <th className="text-left p-4 font-medium text-sm">Created</th>
                <th className="text-left p-4 font-medium text-sm"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : notes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-muted-foreground">
                    No notes found
                  </td>
                </tr>
              ) : (
                notes.map((note) => (
                  <tr key={note.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <code className="text-xs bg-muted px-2 py-1 rounded">{note.id.slice(0, 12)}...</code>
                    </td>
                    <td className="p-4">
                      {note.user ? (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{note.user.email}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Anonymous</span>
                      )}
                    </td>
                    <td className="p-4">{getStatusBadge(note.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        {note.viewCount}
                        {note.maxViews && <span className="text-muted-foreground">/{note.maxViews}</span>}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {getTimeRemaining(note.expiresAt)}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {note.isProtected && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-600">
                            <Lock className="h-3 w-3" />
                            Password
                          </span>
                        )}
                        {note.deleteAfterReading && (
                          <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-600">
                            Burn
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">{formatDate(note.createdAt)}</td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => {
                          setSelectedNote(note);
                          setDeleteModal(true);
                        }}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === 1}
                onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.page === pagination.totalPages}
                onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this note? This action cannot be undone.
            </p>
            {selectedNote && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-xs font-mono">{selectedNote.id}</p>
                {selectedNote.user && (
                  <p className="text-xs text-muted-foreground mt-1">Owner: {selectedNote.user.email}</p>
                )}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteModal(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={actionLoading}>
              {actionLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
