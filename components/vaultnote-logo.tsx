import React from 'react';
import { Mountain } from 'lucide-react';

interface VaultNoteLogoProps {
  className?: string;
  size?: number;
}

export const VaultNoteLogo: React.FC<VaultNoteLogoProps> = ({ className = "", size = 24 }) => {
  return (
    <Mountain
      size={size}
      className={className}
    />
  );
};
