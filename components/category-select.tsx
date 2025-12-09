'use client';

import { Key, CreditCard, FileText, MessageSquare, Code, Tag } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export type NoteCategory = 'password' | 'credit-card' | 'document' | 'message' | 'api-key' | 'other' | null;

interface CategorySelectProps {
  value: NoteCategory;
  onChange: (value: NoteCategory) => void;
  className?: string;
}

const categories = [
  { value: null, label: 'No Category', icon: Tag, description: 'General note' },
  { value: 'password', label: 'Password', icon: Key, description: 'Login credentials' },
  { value: 'credit-card', label: 'Credit Card', icon: CreditCard, description: 'Payment information' },
  { value: 'document', label: 'Document', icon: FileText, description: 'Important documents' },
  { value: 'message', label: 'Message', icon: MessageSquare, description: 'Confidential message' },
  { value: 'api-key', label: 'API Key', icon: Code, description: 'API credentials' },
  { value: 'other', label: 'Other', icon: Tag, description: 'Other sensitive data' },
] as const;

export function CategorySelect({ value, onChange, className = '' }: CategorySelectProps) {
  const selectedCategory = categories.find(c => c.value === value) || categories[0];
  const Icon = selectedCategory.icon;

  return (
    <div className={className}>
      <Select
        value={value || 'none'}
        onValueChange={(val) => onChange(val === 'none' ? null : val as NoteCategory)}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <span>{selectedCategory.label}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <SelectItem key={category.value || 'none'} value={category.value || 'none'}>
                <div className="flex items-center gap-3 py-1">
                  <CategoryIcon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="font-medium">{category.label}</span>
                    <span className="text-xs text-muted-foreground">{category.description}</span>
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}
