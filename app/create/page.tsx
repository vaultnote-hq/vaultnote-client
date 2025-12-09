'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  Lock,
  ArrowRight,
  Menu,
  X,
  FileText,
  Clock,
  ShieldCheck,
  ArrowUp,
  Bold,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Code,
  Smile,
  Eraser,
  Link as LinkIcon,
  MapPin,
  Globe,
  Eye,
  EyeOff,
  RefreshCw,
  Upload,
  ChevronDown,
  ChevronUp,
  Settings,
  Calendar,
  Infinity
} from 'lucide-react';
import { VaultNoteLogo } from '@/components/vaultnote-logo';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { TextAlign } from '@tiptap/extension-text-align';
import { ListItem } from '@tiptap/extension-list-item';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Link as LinkExtension } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { CodeBlock } from '@tiptap/extension-code-block';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { generateKey, encrypt, encryptWithPassword, keyToString } from '@/lib/crypto';
import { QRCodeComponent } from '@/components/qr-code';
import { PasswordStrength } from '@/components/password-strength';
import { CategorySelect, type NoteCategory } from '@/components/category-select';
import { NotePreview } from '@/components/note-preview';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { Crown } from 'lucide-react';

const MenuBar = ({
  editor,
  linkDialogOpen,
  setLinkDialogOpen,
  emojiDialogOpen,
  setEmojiDialogOpen,
  linkUrl,
  setLinkUrl,
  linkText,
  setLinkText,
  linkTitle,
  setLinkTitle,
  linkTarget,
  setLinkTarget,
  handleInsertLink,
  handleInsertEmoji
}: {
  editor: any;
  linkDialogOpen: boolean;
  setLinkDialogOpen: (open: boolean) => void;
  emojiDialogOpen: boolean;
  setEmojiDialogOpen: (open: boolean) => void;
  linkUrl: string;
  setLinkUrl: (url: string) => void;
  linkText: string;
  setLinkText: (text: string) => void;
  linkTitle: string;
  setLinkTitle: (title: string) => void;
  linkTarget: string;
  setLinkTarget: (target: string) => void;
  handleInsertLink: () => void;
  handleInsertEmoji: (emoji: string) => void;
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border rounded-lg bg-card/50 p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-1">
        {/* Text Formatting */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('bold') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Bold (Ctrl+B)"
          >
            <Bold className="h-4 w-4" />
            <span className="sr-only">Bold</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('italic') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Italic (Ctrl+I)"
          >
            <Italic className="h-4 w-4" />
            <span className="sr-only">Italic</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('underline') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Underline (Ctrl+U)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M6 4v6a6 6 0 0 0 12 0V4"></path><line x1="4" x2="20" y1="20" y2="20"></line></svg>
            <span className="sr-only">Underline</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('strike') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
            <span className="sr-only">Strikethrough</span>
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1"></div>

        {/* Text Styling */}
        <div className="flex items-center gap-1">
          <Select
            value={editor.getAttributes('textStyle').fontSize || '16px'}
            onValueChange={(value: string) => editor.chain().focus().setFontSize(value).run()}
          >
            <SelectTrigger className="w-[110px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12px">Small</SelectItem>
              <SelectItem value="16px">Normal</SelectItem>
              <SelectItem value="20px">Large</SelectItem>
              <SelectItem value="24px">Extra Large</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={editor.getAttributes('textStyle').color || 'default'}
            onValueChange={(value: string) => {
              if (value === 'default') {
                editor.chain().focus().unsetColor().run();
              } else {
                editor.chain().focus().setColor(value).run();
              }
            }}
          >
            <SelectTrigger className="w-[130px] h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="#ef4444">Red</SelectItem>
              <SelectItem value="#10b981">Green</SelectItem>
              <SelectItem value="#3b82f6">Blue</SelectItem>
              <SelectItem value="#eab308">Yellow</SelectItem>
              <SelectItem value="#8b5cf6">Purple</SelectItem>
              <SelectItem value="#ec4899">Pink</SelectItem>
              <SelectItem value="#f97316">Orange</SelectItem>
              <SelectItem value="#14b8a6">Teal</SelectItem>
              <SelectItem value="#6366f1">Indigo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1"></div>

        {/* Alignment */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
            <span className="sr-only">Align Left</span>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Center"
          >
            <AlignCenter className="h-4 w-4" />
            <span className="sr-only">Center</span>
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
            <span className="sr-only">Align Right</span>
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1"></div>

        {/* Lists */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('bulletList') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Bullet List"
          >
            <List className="h-4 w-4" />
            <span className="sr-only">Bullet List</span>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('orderedList') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
            <span className="sr-only">Numbered List</span>
          </button>
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-border mx-1"></div>

        {/* Advanced Features */}
        <div className="flex items-center gap-0.5">
          <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
            <DialogTrigger asChild>
              <button
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
                  editor.isActive('link') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                }`}
                type="button"
                title="Add Link"
              >
                <LinkIcon className="h-4 w-4" />
                <span className="sr-only">Add Link</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Link</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="link-url">URL</Label>
                  <Input
                    id="link-url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-text">Display Text</Label>
                  <Input
                    id="link-text"
                    placeholder="Link text"
                    value={linkText}
                    onChange={(e) => setLinkText(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-title">Title (Tooltip)</Label>
                  <Input
                    id="link-title"
                    placeholder="Link title"
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="link-target">Open In</Label>
                  <Select value={linkTarget} onValueChange={setLinkTarget}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_blank">New window</SelectItem>
                      <SelectItem value="_self">Current window</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleInsertLink} disabled={!linkUrl.trim()}>
                    Add Link
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 ${
              editor.isActive('codeBlock') ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
            }`}
            type="button"
            title="Code Block"
          >
            <Code className="h-4 w-4" />
            <span className="sr-only">Code Block</span>
          </button>

          <Dialog open={emojiDialogOpen} onOpenChange={setEmojiDialogOpen}>
            <DialogTrigger asChild>
              <button
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 text-muted-foreground"
                type="button"
                title="Add Emoji"
              >
                <Smile className="h-4 w-4" />
                <span className="sr-only">Add emoji</span>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Emoji</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-8 gap-2 max-h-64 overflow-y-auto">
                  {[
                    '😀', '😂', '🥰', '😊', '🤔', '😉', '😎', '🤗',
                    '👍', '👎', '👌', '✌️', '🤞', '👏', '🙌', '🤝',
                    '❤️', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎',
                    '🔥', '⭐', '✨', '💫', '🎉', '🎊', '🎈', '🎁',
                    '📝', '📚', '📖', '✏️', '📌', '📍', '🎯', '💡',
                    '⚡', '🔋', '💻', '📱', '⌚', '💾', '💿', '🎵',
                    '🎶', '🎵', '🎼', '🎹', '🎸', '🎺', '🎷', '🥁',
                    '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸',
                    '⏰', '⏱️', '⌛', '⏳', '🌞', '🌝', '🌙', '⭐',
                    '❓', '❔', '❗', '❕', '💭', '💬', '🗯️', '💯'
                  ].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleInsertEmoji(emoji)}
                      className="flex items-center justify-center w-10 h-10 text-xl hover:bg-muted rounded-md transition-colors"
                      type="button"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <button
            onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9 text-muted-foreground"
            type="button"
            title="Clear all formatting"
          >
            <Eraser className="h-4 w-4" />
            <span className="sr-only">Clear Formatting</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Create() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [expiry, setExpiry] = useState('3600');
  const [customExpiry, setCustomExpiry] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [deleteAfterReading, setDeleteAfterReading] = useState(false);
  const [maxViews, setMaxViews] = useState<number | null>(null);
  const [category, setCategory] = useState<NoteCategory>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [uploadedImages, setUploadedImages] = useState<Array<{ id: string; file: File; url: string }>>([]);
  const [hasContent, setHasContent] = useState(false);
  
  // Check if user has Pro plan (for now, any logged-in user gets Pro features)
  const userPlan = (session?.user as any)?.plan || 'free';
  const isPro = userPlan === 'pro' || userPlan === 'business';
  const isLoggedIn = status === 'authenticated';

  // Dialog states
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [emojiDialogOpen, setEmojiDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkTarget, setLinkTarget] = useState('_blank');

  // Scroll-to-top functionality
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        // Disable built-in extensions to avoid duplicates
        link: false,
        codeBlock: false,
      }),
      TextStyle,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      Image,
      CodeBlock,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'tiptap ProseMirror prose dark:prose-invert max-w-none outline-none min-h-[500px] px-4 py-3',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const text = editor.getText().trim();
      const html = editor.getHTML().trim();
      // Check if there's actual content (not just empty paragraphs)
      const hasRealContent = text.length > 0 && html !== '<p></p>' && html !== '';
      setHasContent(hasRealContent);
    },
  });

  // Initialize hasContent state when editor is ready
  useEffect(() => {
    if (editor) {
      const text = editor.getText().trim();
      const html = editor.getHTML().trim();
      const hasRealContent = text.length > 0 && html !== '<p></p>' && html !== '';
      setHasContent(hasRealContent);
    }
  }, [editor]);

  // Animation variants
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const handleCreate = async () => {
    const content = editor?.getHTML();
    const text = editor?.getText().trim();
    
    // Stricter validation: check both HTML and text content
    if (!content || !text || text.length === 0 || content === '<p></p>' || content.trim() === '') {
      toast.error('Please enter content for your note.');
      return;
    }

    // Only validate password if one is provided
    if (password && password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsCreating(true);
    try {
      let encryptedData;
      let keyString = '';

      // Use password encryption if password is provided, otherwise regular encryption
      if (password) {
        encryptedData = await encryptWithPassword(content, password);
      } else {
        const key = await generateKey();
        const { ciphertext, iv } = await encrypt(content, key);
        encryptedData = { ciphertext, iv, salt: null, encryptedKey: null, keyIv: null };
        keyString = await keyToString(key);
      }

      const ciphertextB64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData.ciphertext)));
      const ivB64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData.iv)));

      // Convert expiry to duration in minutes
      let duration: number | undefined;
      switch (expiry) {
        case '3600':
          duration = 60; // 1 hour
          break;
        case '86400':
          duration = 1440; // 1 day
          break;
        case '604800':
          duration = 10080; // 1 week
          break;
        case '2592000':
          duration = 43200; // 1 month (30 days)
          break;
        case 'never':
          duration = undefined; // Never expires
          break;
        case 'custom':
          if (customExpiry) {
            const customDate = new Date(customExpiry);
            const now = new Date();
            const diffMs = customDate.getTime() - now.getTime();
            duration = Math.max(1, Math.floor(diffMs / 60000)); // Convert to minutes
          } else {
            duration = 1440; // Default to 1 day if no custom date
          }
          break;
        default:
          duration = undefined;
      }

      // Prepare request data
      const requestData: any = {
        ciphertext: ciphertextB64,
        iv: ivB64,
        isProtected: !!password,
        deleteAfterReading,
        duration,
      };

      // Add password protection fields if password is used
      if (password && encryptedData.salt && encryptedData.encryptedKey && encryptedData.keyIv) {
        requestData.encryptedKey = btoa(String.fromCharCode(...new Uint8Array(encryptedData.encryptedKey)));
        requestData.keyIv = btoa(String.fromCharCode(...new Uint8Array(encryptedData.keyIv)));
        requestData.salt = btoa(String.fromCharCode(...new Uint8Array(encryptedData.salt)));
      }

      // Add optional fields
      requestData.title = title || null;
      requestData.authorName = authorName || null;
      requestData.authorEmail = authorEmail || null;
      requestData.maxViews = maxViews || null;
      requestData.category = category || null;

      // Add images if any
      if (uploadedImages.length > 0) {
        requestData.images = uploadedImages.map(img => ({
          name: img.file.name,
          data: img.url, // This is the base64 data URL
          size: img.file.size
        }));
      }

      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Failed to create note');
      }

      const { id } = await response.json();

      // Generate URL based on protection type
      if (password) {
        // Password-protected notes don't include key in URL
        const url = `${window.location.origin}/n/${id}`;
        setShareUrl(url);
      } else {
        // Regular notes include the key in URL
        const url = `${window.location.origin}/n/${id}#${keyString}`;
        setShareUrl(url);
      }
    } catch (error) {
      console.error('Create note error:', error);
      
      // Try to get more specific error information
      if (error instanceof Error) {
        toast.error(`Error creating note: ${error.message}`);
      } else {
        toast.error('Error creating note');
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (uploadedImages.length >= 3) {
          toast.error('Maximum 3 images allowed per note.');
          return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            const imageData = {
              id: Date.now() + Math.random().toString(36).substr(2, 9),
              file: file,
              url: result
            };
            setUploadedImages(prev => [...prev, imageData]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
    // Reset input
    event.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        if (!file.type.startsWith('image/')) {
          toast.error(`File ${file.name} is not an image.`);
          return;
        }

        if (uploadedImages.length >= 3) {
          toast.error('Maximum 3 images allowed per note.');
          return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB limit
          toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            const imageData = {
              id: Date.now() + Math.random().toString(36).substr(2, 9),
              file: file,
              url: result
            };
            setUploadedImages(prev => [...prev, imageData]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const removeImage = (imageId: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePassword = () => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 16; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);
  };

  // Dialog handlers
  const handleInsertLink = () => {
    if (linkUrl && linkText) {
      editor?.chain().focus().insertContent(`<a href="${linkUrl}" target="${linkTarget}" ${linkTitle ? `title="${linkTitle}"` : ''} rel="noopener noreferrer">${linkText}</a>`).run();
    } else if (linkUrl) {
      editor?.chain().focus().extendMarkRange('link').setLink({
        href: linkUrl,
        target: linkTarget,
        ...(linkTitle && { title: linkTitle })
      }).run();
    }
    setLinkUrl('');
    setLinkText('');
    setLinkTitle('');
    setLinkTarget('_blank');
    setLinkDialogOpen(false);
  };

  const handleInsertEmoji = (emoji: string) => {
    editor?.chain().focus().insertContent(emoji).run();
    setEmojiDialogOpen(false);
  };

  if (shareUrl) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header currentPath="/create" />

        {/* Success Section */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <div className="mb-8 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2">
                <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Note Created Successfully</span>
              </div>

              <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                <span className="block">Your secure note is</span>
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  ready to share
                </span>
              </h1>

              <p className="mx-auto mb-12 max-w-xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
                Your note has been encrypted and stored securely. Share the link below with the intended recipient.
              </p>

              <div className="max-w-2xl mx-auto mb-12 space-y-8">
                {/* Share Link */}
                <div>
                  <label className="block text-sm font-medium mb-3">Secure Share Link</label>
                  <div className="flex gap-3">
                    <Input
                      type="text"
                      value={shareUrl}
                      readOnly
                      className="flex-1 font-mono text-sm"
                    />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        toast.success('Link copied to clipboard!', {
                          description: 'Share this link securely with your recipient.',
                        });
                      }}
                      className="px-6"
                    >
                      Copy Link
                    </Button>
                  </div>
                </div>

                {/* QR Code */}
                <div className="border-t border-border pt-8">
                  <h3 className="text-lg font-semibold mb-4">Scan QR Code</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Perfect for sharing with mobile devices
                  </p>
                  <QRCodeComponent value={shareUrl} size={200} className="mx-auto" />
                </div>
              </div>

              <div className="flex flex-col gap-6 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="h-12 px-8 text-base">
                  <Link href="/create">
                    <FileText className="mr-2 h-5 w-5" />
                    Create Another Note
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                  <Link href="/">
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/create" />

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-screen-xl px-6">
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-2">
                <ShieldCheck className="mr-2 h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Secure Note Creation</span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                <span className="block">Create secure</span>
                <span className="block bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  encrypted notes
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Your notes are encrypted end-to-end and stored securely. Only you and those you share the link with can access them. Create private, self-destructing notes with military-grade security.
              </p>

              {/* Quick Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/#how-it-works" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" x2="8" y1="13" y2="13"></line><line x1="16" x2="8" y1="17" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>
                  How it works
                </Link>
                <Link href="/security" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-12 px-8 text-base shadow-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>
                  Security details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 sm:py-24 bg-muted/5 dark:bg-muted/10">
        <div className="mx-auto max-w-screen-xl px-6">
          <form className="rounded-xl border bg-card text-card-foreground shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-0">
              {/* Left Column - Editor */}
              <div className="border-r border-border/50 p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">Title <span className="text-muted-foreground text-sm">(optional)</span></Label>
                  <Input id="title" placeholder="Note title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} className="h-12" />
                </div>
                <div className="space-y-4">
                  {isPro ? (
                    <>
                      <MenuBar
                        editor={editor}
                        linkDialogOpen={linkDialogOpen}
                        setLinkDialogOpen={setLinkDialogOpen}
                        emojiDialogOpen={emojiDialogOpen}
                        setEmojiDialogOpen={setEmojiDialogOpen}
                        linkUrl={linkUrl}
                        setLinkUrl={setLinkUrl}
                        linkText={linkText}
                        setLinkText={setLinkText}
                        linkTitle={linkTitle}
                        setLinkTitle={setLinkTitle}
                        linkTarget={linkTarget}
                        setLinkTarget={setLinkTarget}
                        handleInsertLink={handleInsertLink}
                        handleInsertEmoji={handleInsertEmoji}
                      />
                      <div className="space-y-2">
                        <Label className="text-base font-medium">Note Content <span className="text-red-500">*</span> <span className="text-muted-foreground text-sm">(required)</span></Label>
                        <div className="border rounded-lg overflow-hidden hover:shadow-sm focus-within:shadow-md focus-within:shadow-primary/10 transition-all duration-200 bg-background">
                          <div className="relative min-h-[450px] p-4">
                            <EditorContent editor={editor} />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <Label className="text-base font-medium flex items-center gap-2">
                        Note Content <span className="text-red-500">*</span>
                        <span className="inline-flex items-center gap-1 text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                          <Crown className="h-3 w-3" />
                          Rich editor with Pro
                        </span>
                      </Label>
                      <div className="border rounded-lg overflow-hidden hover:shadow-sm focus-within:shadow-md focus-within:shadow-primary/10 transition-all duration-200 bg-background">
                        <textarea
                          className="w-full min-h-[450px] p-4 bg-transparent resize-none focus:outline-none text-foreground placeholder:text-muted-foreground"
                          placeholder="Enter your secure note content here...&#10;&#10;Line breaks are preserved."
                          onChange={(e) => {
                            // Convert plain text to simple HTML for consistency
                            const html = e.target.value
                              .split('\n')
                              .map(line => `<p>${line || '<br>'}</p>`)
                              .join('');
                            editor?.commands.setContent(html);
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Plain text editor. <Link href="/pricing" className="text-primary hover:underline">Upgrade to Pro</Link> for rich formatting, code blocks, and more.
                      </p>
                    </div>
                  )}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="flex items-center gap-2 text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image h-4 w-4"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>
                        Add Image
                        {!isPro && (
                          <span className="inline-flex items-center gap-1 text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                            <Crown className="h-3 w-3" />
                            Pro
                          </span>
                        )}
                      </Label>
                      <span className="text-xs text-muted-foreground">(JPEG, PNG, GIF or WebP • Max 10MB per image • Max 3 images)</span>
                    </div>
                    {isPro ? (
                      <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:bg-muted/50"
                           onDragOver={handleDragOver}
                           onDrop={handleDrop}>
                        <input id="image-upload" accept="image/jpeg,image/png,image/gif,image/webp" multiple className="hidden" type="file" onChange={handleImageUpload} />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div className="space-y-4">
                            <div className="flex justify-center">
                              <Upload className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Click or drag and drop to upload one or more images</p>
                              <p className="text-xs text-muted-foreground">Uploaded images will be automatically added to the note content</p>
                            </div>
                          </div>
                        </label>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center bg-muted/20">
                        <div className="space-y-4">
                          <div className="flex justify-center">
                            <div className="relative">
                              <Upload className="h-10 w-10 text-muted-foreground/50" />
                              <Crown className="h-4 w-4 text-amber-500 absolute -top-1 -right-1" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground">Image attachments are a Pro feature</p>
                            <p className="text-xs text-muted-foreground">
                              {isLoggedIn ? (
                                <Link href="/pricing" className="text-primary hover:underline">Upgrade to Pro</Link>
                              ) : (
                                <>
                                  <Link href="/login" className="text-primary hover:underline">Sign in</Link>
                                  {' '}or{' '}
                                  <Link href="/pricing" className="text-primary hover:underline">upgrade to Pro</Link>
                                </>
                              )}
                              {' '}to attach images to your notes
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Uploaded Images */}
                    {uploadedImages.length > 0 && (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-foreground">
                            Uploaded images ({uploadedImages.length}/3)
                          </h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {uploadedImages.map((image) => (
                            <div key={image.id} className="relative group border rounded-lg overflow-hidden bg-muted/30">
                              <div className="aspect-square relative">
                                <img
                                  src={image.url}
                                  alt={image.file.name}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button
                                    onClick={() => removeImage(image.id)}
                                    className="bg-destructive text-destructive-foreground rounded px-3 py-1 text-xs font-medium hover:bg-destructive/90 transition-colors"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                              <div className="p-2">
                                <p className="text-xs text-muted-foreground truncate" title={image.file.name}>
                                  {image.file.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(image.file.size / 1024 / 1024).toFixed(1)} MB
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Settings */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-medium flex items-center gap-2">
                    Add extra password protection
                    {!isPro && (
                      <span className="inline-flex items-center gap-1 text-xs bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-full">
                        <Crown className="h-3 w-3" />
                        Pro
                      </span>
                    )}
                    {isPro && <span className="text-muted-foreground text-sm">(optional)</span>}
                  </Label>
                  {isPro ? (
                    <>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password (optional, min. 6 characters)"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="h-12 pr-20"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={generatePassword}
                            title="Generate password"
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                            title={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Optional: If a password is set, it will be required to view the note.
                      </p>
                      
                      {/* Password Strength Indicator */}
                      {password && (
                        <PasswordStrength password={password} className="mt-3" />
                      )}
                    </>
                  ) : (
                    <div className="border rounded-lg p-4 bg-muted/20 border-muted">
                      <p className="text-sm text-muted-foreground">
                        Password protection requires a Pro plan.{' '}
                        <Link href="/pricing" className="text-primary hover:underline">Upgrade</Link> to add passwords to your notes.
                      </p>
                    </div>
                  )}
                </div>

                {/* Advanced Settings Collapsible */}
                <div className="space-y-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                    className="w-full justify-between p-0 h-auto font-medium text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4" />
                      <span>Advanced Settings</span>
                    </div>
                    {showAdvancedSettings ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>

                  {showAdvancedSettings && (
                    <div className="space-y-6 pt-4 border-t">
                      {/* Category Selection */}
                      <div className="space-y-2">
                        <Label className="text-base font-medium">Category <span className="text-muted-foreground text-sm">(optional)</span></Label>
                        <CategorySelect value={category} onChange={setCategory} />
                        <p className="text-xs text-muted-foreground">
                          Categorize your note for better organization
                        </p>
                      </div>

                      {/* Author Information */}
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="authorName" className="text-base font-medium">Author Name <span className="text-muted-foreground text-sm">(optional)</span></Label>
                          <Input id="authorName" placeholder="Author name (optional)" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="h-12" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="authorEmail" className="text-base font-medium">Email <span className="text-muted-foreground text-sm">(optional)</span></Label>
                          <Input id="authorEmail" type="email" placeholder="example@email.com (optional)" value={authorEmail} onChange={(e) => setAuthorEmail(e.target.value)} className="h-12" />
                        </div>
                      </div>

                      <div className="space-y-6">
                  {/* Expiration Time */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium flex items-center gap-2">
                      Expiration Time
                      {!isPro && (
                        <span className="text-xs text-muted-foreground">(more options with Pro)</span>
                      )}
                    </label>
                    
                    {/* Quick Options */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setExpiry('3600')}
                        className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                          expiry === '3600' 
                            ? 'bg-primary text-primary-foreground border-primary' 
                            : 'bg-background border-input hover:bg-accent'
                        }`}
                      >
                        1 Hour
                      </button>
                      <button
                        type="button"
                        onClick={() => setExpiry('86400')}
                        className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors ${
                          expiry === '86400' 
                            ? 'bg-primary text-primary-foreground border-primary' 
                            : 'bg-background border-input hover:bg-accent'
                        }`}
                      >
                        1 Day
                      </button>
                      <button
                        type="button"
                        onClick={() => isPro && setExpiry('604800')}
                        disabled={!isPro}
                        className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors flex items-center justify-center gap-1 ${
                          expiry === '604800' 
                            ? 'bg-primary text-primary-foreground border-primary' 
                            : 'bg-background border-input hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        1 Week
                        {!isPro && <Crown className="h-3 w-3 text-amber-500" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => isPro && setExpiry('2592000')}
                        disabled={!isPro}
                        className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors flex items-center justify-center gap-1 ${
                          expiry === '2592000' 
                            ? 'bg-primary text-primary-foreground border-primary' 
                            : 'bg-background border-input hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed'
                        }`}
                      >
                        1 Month
                        {!isPro && <Crown className="h-3 w-3 text-amber-500" />}
                      </button>
                    </div>

                    {/* Pro Options: Never & Custom */}
                    {isPro && (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setExpiry('never')}
                          className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors flex items-center justify-center gap-1 ${
                            expiry === 'never' 
                              ? 'bg-primary text-primary-foreground border-primary' 
                              : 'bg-background border-input hover:bg-accent'
                          }`}
                        >
                          <Infinity className="h-3 w-3" />
                          Never
                        </button>
                        <button
                          type="button"
                          onClick={() => setExpiry('custom')}
                          className={`px-3 py-2 text-xs font-medium rounded-md border transition-colors flex items-center justify-center gap-1 ${
                            expiry === 'custom' 
                              ? 'bg-primary text-primary-foreground border-primary' 
                              : 'bg-background border-input hover:bg-accent'
                          }`}
                        >
                          <Calendar className="h-3 w-3" />
                          Custom
                        </button>
                      </div>
                    )}

                    {/* Custom Date Picker */}
                    {expiry === 'custom' && isPro && (
                      <div className="space-y-2">
                        <Input
                          type="datetime-local"
                          value={customExpiry}
                          onChange={(e) => setCustomExpiry(e.target.value)}
                          min={new Date().toISOString().slice(0, 16)}
                          className="h-10"
                        />
                        <p className="text-xs text-muted-foreground">
                          Select when this note should expire
                        </p>
                      </div>
                    )}

                    {!isPro && (
                      <p className="text-xs text-muted-foreground">
                        <Link href="/pricing" className="text-primary hover:underline">Upgrade to Pro</Link> for custom expiry dates and never-expire option.
                      </p>
                    )}
                  </div>

                  {/* Self-Destruct Switch */}
                  <div role="group" className="space-y-1 w-full">
                    <label className="text-sm data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70 font-medium data-[invalid]:text-destructive">Self-Destruct after 1 view <span className="text-muted-foreground text-sm">(optional)</span></label>
                    <div role="group" className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        role="switch"
                        id="delete-after-reading-input"
                        name="delete-after-reading"
                        value="on"
                        aria-checked={deleteAfterReading}
                        checked={deleteAfterReading}
                        onChange={(e) => setDeleteAfterReading(e.target.checked)}
                        className="[&:focus-visible+div]:outline-none [&:focus-visible+div]:ring-1.5 [&:focus-visible+div]:ring-ring [&:focus-visible+div]:ring-offset-2 [&:focus-visible+div]:ring-offset-background"
                        style={{
                          border: '0px',
                          clip: 'rect(0px, 0px, 0px, 0px)',
                          clipPath: 'inset(50%)',
                          height: '1px',
                          margin: '0px -1px -1px 0px',
                          overflow: 'hidden',
                          padding: '0px',
                          position: 'absolute',
                          width: '1px',
                          whiteSpace: 'nowrap'
                        }}
                        aria-labelledby="delete-after-reading-label"
                      />
                      <div
                        id="delete-after-reading-control"
                        className={`inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-shadow data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 transition-property-[box-shadow,color,background-color] ${
                          deleteAfterReading ? 'bg-primary' : 'bg-input'
                        }`}
                        data-test-id="delete-after-reading"
                        onClick={() => setDeleteAfterReading(!deleteAfterReading)}
                      >
                        <div
                          id="delete-after-reading-thumb"
                          className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg transition-transform ${
                            deleteAfterReading ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        ></div>
                      </div>
                      <label
                        id="delete-after-reading-label"
                        className="text-sm text-muted-foreground"
                        htmlFor="delete-after-reading-input"
                      >
                        Note disappears forever after being read once.
                      </label>
                    </div>
                  </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t space-y-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setShowPreview(true)} 
                    disabled={!hasContent} 
                    className="w-full h-12 text-base font-medium"
                    title={!hasContent ? "Enter some content first to preview your note" : "Preview how your note will look to the recipient"}
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    Preview Note
                  </Button>
                  <div className="relative group">
                    <Button 
                      type="button" 
                      onClick={handleCreate} 
                      disabled={!hasContent || isCreating} 
                      className="w-full h-12 text-base font-medium"
                      title={!hasContent ? "Enter some content first" : "Create your encrypted note"}
                    >
                      {isCreating ? 'Creating Note...' : 'Create Secure Note'}
                    </Button>
                    {!hasContent && !isCreating && (
                      <div className="absolute -bottom-8 left-0 right-0 text-center">
                        <span className="text-xs text-amber-500 flex items-center justify-center gap-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
                          Please enter content for your note
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <button
        onClick={scrollToTop}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 fixed right-4 transition-all duration-300 ${
          showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } bottom-4`}
        type="button"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </button>

      {/* Note Preview Dialog */}
      <NotePreview 
        content={editor?.getHTML() || ''} 
        open={showPreview} 
        onOpenChange={setShowPreview}
        deleteAfterReading={deleteAfterReading}
        expiryTime={
          expiry === '3600' ? '1 hour' :
          expiry === '86400' ? '1 day' :
          expiry === '604800' ? '1 week' :
          expiry === '2592000' ? '1 month' :
          expiry === 'never' ? undefined :
          expiry === 'custom' && customExpiry ? new Date(customExpiry).toLocaleString() :
          undefined
        }
        isPasswordProtected={!!password}
      />

      <Footer />
    </div>
  );
}
