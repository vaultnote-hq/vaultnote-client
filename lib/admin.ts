import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { NextRequest } from 'next/server';

export type AdminRole = 'user' | 'admin' | 'superadmin';

export interface AdminUser {
  id: string;
  email: string;
  name: string | null;
  role: AdminRole;
}

export async function getAdminSession(): Promise<AdminUser | null> {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
    return null;
  }

  return user as AdminUser;
}

export async function requireAdmin(): Promise<AdminUser> {
  const admin = await getAdminSession();
  
  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }

  return admin;
}

export async function requireSuperAdmin(): Promise<AdminUser> {
  const admin = await getAdminSession();
  
  if (!admin || admin.role !== 'superadmin') {
    throw new Error('Unauthorized: Super admin access required');
  }

  return admin;
}

export async function logAdminAction(
  adminId: string,
  action: string,
  details: Record<string, any>,
  targetUserId?: string,
  targetNoteId?: string,
  request?: NextRequest
) {
  await prisma.adminLog.create({
    data: {
      adminId,
      action,
      details: JSON.stringify(details),
      targetUserId,
      targetNoteId,
      ipAddress: request?.headers.get('x-forwarded-for') || request?.headers.get('x-real-ip') || null,
      userAgent: request?.headers.get('user-agent') || null,
    },
  });
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDate(date: Date | null): string {
  if (!date) return 'Never';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}
