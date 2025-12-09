'use client';

import { useEffect, useState, useCallback } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical,
  Crown,
  Shield,
  Ban,
  UserCheck,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string | null;
  name: string | null;
  image: string | null;
  role: string;
  status: string;
  plan: string;
  planExpiresAt: string | null;
  notesCreated: number;
  storageUsed: number;
  lastLoginAt: string | null;
  loginCount: number;
  createdAt: string;
  _count: { notes: number };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatDate(date: string | null): string {
  if (!date) return 'Never';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
  // Modal states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionModal, setActionModal] = useState<string | null>(null);
  const [actionData, setActionData] = useState<any>({});
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });
      if (search) params.set('search', search);
      if (planFilter && planFilter !== 'all') params.set('plan', planFilter);
      if (statusFilter && statusFilter !== 'all') params.set('status', statusFilter);
      if (roleFilter && roleFilter !== 'all') params.set('role', roleFilter);

      const res = await fetch(`/api/admin/users?${params}`);
      if (!res.ok) throw new Error('Failed to fetch users');
      const data = await res.json();
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, search, planFilter, statusFilter, roleFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleAction = async () => {
    if (!selectedUser || !actionModal) return;
    
    setActionLoading(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedUser.id,
          action: actionModal,
          ...actionData,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Action failed');
      }

      toast.success('Action completed successfully');
      setActionModal(null);
      setSelectedUser(null);
      setActionData({});
      fetchUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/users?userId=${selectedUser.id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Delete failed');
      }

      toast.success('User deleted successfully');
      setActionModal(null);
      setSelectedUser(null);
      fetchUsers();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setActionLoading(false);
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'pro':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"><Crown className="h-3 w-3" />Pro</span>;
      case 'business':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600"><Crown className="h-3 w-3" />Business</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">Free</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'suspended':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600">Suspended</span>;
      case 'banned':
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-destructive/10 text-destructive">Banned</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-600">Active</span>;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'superadmin':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-600"><Shield className="h-3 w-3" />Super</span>;
      case 'admin':
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600"><Shield className="h-3 w-3" />Admin</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage user accounts and subscriptions</p>
        </div>
        <Button onClick={fetchUsers} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by email, name, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Plans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
            <SelectItem value="business">Business</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="banned">Banned</SelectItem>
          </SelectContent>
        </Select>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="superadmin">Superadmin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-sm">User</th>
                <th className="text-left p-4 font-medium text-sm">Role</th>
                <th className="text-left p-4 font-medium text-sm">Plan</th>
                <th className="text-left p-4 font-medium text-sm">Status</th>
                <th className="text-left p-4 font-medium text-sm">Notes</th>
                <th className="text-left p-4 font-medium text-sm">Storage</th>
                <th className="text-left p-4 font-medium text-sm">Last Login</th>
                <th className="text-left p-4 font-medium text-sm">Joined</th>
                <th className="text-left p-4 font-medium text-sm"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-muted/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {user.image ? (
                            <img src={user.image} alt="" className="h-8 w-8 rounded-full" />
                          ) : (
                            <span className="text-sm font-medium text-primary">
                              {user.name?.[0] || user.email?.[0] || '?'}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{user.name || 'No name'}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getRoleBadge(user.role)}</td>
                    <td className="p-4">{getPlanBadge(user.plan)}</td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4 text-sm">{user._count.notes}</td>
                    <td className="p-4 text-sm">{formatBytes(user.storageUsed)}</td>
                    <td className="p-4 text-sm text-muted-foreground">{formatDate(user.lastLoginAt)}</td>
                    <td className="p-4 text-sm text-muted-foreground">{formatDate(user.createdAt)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setActionData({ plan: user.plan });
                            setActionModal('change_plan');
                          }}
                          title="Change Plan"
                        >
                          <Crown className="h-4 w-4" />
                        </Button>
                        {user.status === 'active' ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setActionModal('suspend');
                            }}
                            title="Suspend"
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setActionModal('unsuspend');
                            }}
                            title="Unsuspend"
                          >
                            <UserCheck className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            setSelectedUser(user);
                            setActionModal('delete');
                          }}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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

      {/* Change Plan Modal */}
      <Dialog open={actionModal === 'change_plan'} onOpenChange={() => setActionModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Plan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Change plan for <strong>{selectedUser?.email}</strong>
            </p>
            <div className="space-y-2">
              <Label>New Plan</Label>
              <Select value={actionData.plan} onValueChange={(v) => setActionData({ ...actionData, plan: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModal(null)}>Cancel</Button>
            <Button onClick={handleAction} disabled={actionLoading}>
              {actionLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Modal */}
      <Dialog open={actionModal === 'suspend'} onOpenChange={() => setActionModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Suspend <strong>{selectedUser?.email}</strong>? They won't be able to log in.
            </p>
            <div className="space-y-2">
              <Label>Reason (optional)</Label>
              <Input
                placeholder="Reason for suspension..."
                value={actionData.reason || ''}
                onChange={(e) => setActionData({ ...actionData, reason: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModal(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleAction} disabled={actionLoading}>
              {actionLoading ? 'Suspending...' : 'Suspend'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unsuspend Modal */}
      <Dialog open={actionModal === 'unsuspend'} onOpenChange={() => setActionModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsuspend User</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Unsuspend <strong>{selectedUser?.email}</strong>? They will be able to log in again.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModal(null)}>Cancel</Button>
            <Button onClick={handleAction} disabled={actionLoading}>
              {actionLoading ? 'Unsuspending...' : 'Unsuspend'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={actionModal === 'delete'} onOpenChange={() => setActionModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <strong>{selectedUser?.email}</strong>? This action cannot be undone. All their notes will also be deleted.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActionModal(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={actionLoading}>
              {actionLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
