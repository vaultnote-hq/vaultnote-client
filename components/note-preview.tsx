'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Eye, AlertTriangle, Shield, Clock, Bomb } from 'lucide-react';

interface NotePreviewProps {
  content: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deleteAfterReading?: boolean;
  expiryTime?: string;
  isPasswordProtected?: boolean;
}

export function NotePreview({ 
  content, 
  open, 
  onOpenChange,
  deleteAfterReading = false,
  expiryTime,
  isPasswordProtected = false,
}: NotePreviewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Preview: How Your Recipient Will See This
          </DialogTitle>
        </DialogHeader>
        
        {/* Self-Destruct Warning Banner */}
        <div className="mt-4 space-y-3">
          {/* Main Warning */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 h-10 w-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-500">Secure Note</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  This is a secure, encrypted note from VaultNote. 
                  {deleteAfterReading && (
                    <span className="text-amber-500 font-medium"> This note will self-destruct after you read it.</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-full text-xs font-medium">
              <Shield className="h-3.5 w-3.5" />
              End-to-End Encrypted
            </div>
            {deleteAfterReading && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-500 rounded-full text-xs font-medium">
                <Bomb className="h-3.5 w-3.5" />
                Self-Destructs After Reading
              </div>
            )}
            {expiryTime && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-500/10 text-blue-500 rounded-full text-xs font-medium">
                <Clock className="h-3.5 w-3.5" />
                Expires: {expiryTime}
              </div>
            )}
            {isPasswordProtected && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 text-purple-500 rounded-full text-xs font-medium">
                <Shield className="h-3.5 w-3.5" />
                Password Protected
              </div>
            )}
          </div>
        </div>

        {/* Note Content */}
        <div className="mt-4">
          <div 
            className="prose dark:prose-invert max-w-none p-6 bg-card rounded-lg border border-border"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>

        {/* Footer Info */}
        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            🔒 This note was encrypted in the sender's browser. VaultNote cannot read its contents.
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close Preview
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
