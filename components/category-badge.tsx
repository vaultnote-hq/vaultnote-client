'use client';

import { Key, CreditCard, FileText, MessageSquare, Code, Tag } from 'lucide-react';

export type NoteCategory = 'password' | 'credit-card' | 'document' | 'message' | 'api-key' | 'other' | null;

interface CategoryBadgeProps {
  category: NoteCategory;
  className?: string;
}

const categoryConfig = {
  password: {
    label: 'Password',
    icon: Key,
    color: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  },
  'credit-card': {
    label: 'Credit Card',
    icon: CreditCard,
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  document: {
    label: 'Document',
    icon: FileText,
    color: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
  message: {
    label: 'Message',
    icon: MessageSquare,
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  'api-key': {
    label: 'API Key',
    icon: Code,
    color: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  other: {
    label: 'Other',
    icon: Tag,
    color: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  },
} as const;

export function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  if (!category || !(category in categoryConfig)) return null;

  const config = categoryConfig[category as keyof typeof categoryConfig];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium ${config.color} ${className}`}>
      <Icon className="h-4 w-4" />
      <span>{config.label}</span>
    </div>
  );
}
