'use client';

import Link from 'next/link';
import { Lock, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { VaultNoteLogo } from '@/components/vaultnote-logo';

interface HeaderProps {
  currentPath?: string;
}

export function Header({ currentPath = '/' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const isActive = (path: string) => currentPath === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-6">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <VaultNoteLogo className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">VaultNote</span>
          </Link>
        </div>

        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          <Link 
            href="/" 
            className={`transition-colors hover:text-foreground ${isActive('/') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Home
          </Link>
          <Link 
            href="/features" 
            className={`transition-colors hover:text-foreground ${isActive('/features') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Features
          </Link>
          <Link 
            href="/security" 
            className={`transition-colors hover:text-foreground ${isActive('/security') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Security
          </Link>
          <Link 
            href="/pricing" 
            className={`transition-colors hover:text-foreground ${isActive('/pricing') ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {status === 'loading' ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          ) : session ? (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden md:flex">
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-1.5 h-3.5 w-3.5" />
                  Dashboard
                </Link>
              </Button>
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <User className="h-4 w-4 text-primary" />
                  )}
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium truncate">{session.user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors w-full text-left text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden md:flex">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link href="/register">
                  Get Started
                </Link>
              </Button>
            </>
          )}
          <Button asChild variant="outline" size="sm" className="hidden sm:flex">
            <Link href="/create">
              <Lock className="mr-1.5 h-3.5 w-3.5" />
              Create Note
            </Link>
          </Button>
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/features"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/security"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Security
            </Link>
            <Link
              href="/pricing"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            {!session && (
              <>
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </>
            )}
            {session && (
              <>
                <Link
                  href="/dashboard"
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-destructive hover:bg-accent"
                >
                  Sign out
                </button>
              </>
            )}
            <Link
              href="/create"
              className="block rounded-md px-3 py-2 text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Lock className="inline-block mr-2 h-4 w-4" />
              Create Note
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
