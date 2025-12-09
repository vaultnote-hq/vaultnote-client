'use client';

import { useEffect, useState, useCallback } from 'react';
import { 
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  User,
  Settings,
  Trash2,
  Crown,
  Ban,
  UserCheck,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface AdminLog {
  id: string;
  action: string;
  details: any;
  adminId: string;
  admin: { id: string; email: string; name: string | null };
  targetUserId: string | null;
  targetUser: { id: string; email: string; name: string | null } | null;
  targetNoteId: string | null;
  ipAddress: string | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date));
}

function getActionIcon(action: string) {
  if (action.includes('plan')) return <Crown className="h-4 w-4 text-amber-500" />;
  if (action.includes('suspend')) return <Ban className="h-4 w-4 text-amber-500" />;
  if (action.includes('unsuspend')) return <UserCheck className="h-4 w-4 text-green-500" />;
  if (action.includes('delete')) return <Trash2 className="h-4 w-4 text-destructive" />;
  if (action.includes('role')) return <Shield className="h-4 w-4 text-blue-500" />;
  if (action.includes('settings')) return <Settings className="h-4 w-4 text-primary" />;
  return <User className="h-4 w-4 text-muted-foreground" />;
}

function getActionLabel(action: string): string {
  const labels: Record<string, string> = {
    'user_change_plan': 'Changed Plan',
    'user_change_role': 'Changed Role',
    'user_suspend': 'Suspended User',
    'user_unsuspend': 'Unsuspended User',
    'user_ban': 'Banned User',
    'user_delete': 'Deleted User',
    'note_delete': 'Deleted Note',
    'settings_change': 'Changed Settings',
  };
  return labels[action] || action;
}

export default function AdminLogs() {
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 50, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('');

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      });
      if (actionFilter && actionFilter !== 'all') params.set('action', actionFilter);

      const res = await fetch(`/api/admin/logs?${params}`);
      if (!res.ok) throw new Error('Failed to fetch logs');
      const data = await res.json();
      setLogs(data.logs);
      setPagination(data.pagination);
    } catch (err) {
      toast.error('Failed to load logs');
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, actionFilter]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Logs</h1>
          <p className="text-muted-foreground">Track all admin actions</p>
        </div>
        <Button onClick={fetchLogs} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="plan">Plan Changes</SelectItem>
            <SelectItem value="role">Role Changes</SelectItem>
            <SelectItem value="suspend">Suspensions</SelectItem>
            <SelectItem value="delete">Deletions</SelectItem>
            <SelectItem value="settings">Settings</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Logs Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-medium text-sm">Time</th>
                <th className="text-left p-4 font-medium text-sm">Action</th>
                <th className="text-left p-4 font-medium text-sm">Admin</th>
                <th className="text-left p-4 font-medium text-sm">Target</th>
                <th className="text-left p-4 font-medium text-sm">Details</th>
                <th className="text-left p-4 font-medium text-sm">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No logs found
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-muted/30">
                    <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getActionIcon(log.action)}
                        <span className="text-sm font-medium">{getActionLabel(log.action)}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="font-medium">{log.admin.name || 'Unknown'}</p>
                        <p className="text-xs text-muted-foreground">{log.admin.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      {log.targetUser ? (
                        <div className="text-sm">
                          <p>{log.targetUser.name || 'No name'}</p>
                          <p className="text-xs text-muted-foreground">{log.targetUser.email}</p>
                        </div>
                      ) : log.targetNoteId ? (
                        <code className="text-xs bg-muted px-2 py-1 rounded">{log.targetNoteId.slice(0, 12)}...</code>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="p-4">
                      {log.details && (
                        <div className="text-xs space-y-1">
                          {log.details.oldPlan && log.details.newPlan && (
                            <p>
                              <span className="text-muted-foreground">Plan:</span>{' '}
                              {log.details.oldPlan} → {log.details.newPlan}
                            </p>
                          )}
                          {log.details.oldRole && log.details.newRole && (
                            <p>
                              <span className="text-muted-foreground">Role:</span>{' '}
                              {log.details.oldRole} → {log.details.newRole}
                            </p>
                          )}
                          {log.details.reason && (
                            <p>
                              <span className="text-muted-foreground">Reason:</span>{' '}
                              {log.details.reason}
                            </p>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="p-4 text-xs text-muted-foreground font-mono">
                      {log.ipAddress || '—'}
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
    </div>
  );
}
