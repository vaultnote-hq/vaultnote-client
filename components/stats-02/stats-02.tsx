'use client';

import React, { useEffect, useState } from "react";
import { Shield, Lock, Server, Users } from "lucide-react";

interface Stats {
  notesCreated: number;
  usersProtected: number;
  dataEncrypted: string;
  uptime: string;
}

const Stats02Page = () => {
  const [stats, setStats] = useState<Stats>({
    notesCreated: 1000,
    usersProtected: 500,
    dataEncrypted: '10 GB',
    uptime: '99.9%',
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          if (data.displayStats) {
            setStats(data.displayStats);
          }
        }
      } catch (error) {
        // Use default stats on error
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="py-16 sm:py-32">
      <div className="max-w-screen-xl mx-auto w-full py-12 xs:py-20 px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Trusted by users worldwide
        </h2>
        <p className="mt-4 text-lg max-w-2xl text-muted-foreground">
          Join thousands of users who trust VaultNote for their sensitive communications.
          Built with modern cryptography and designed for maximum privacy.
        </p>

        <div className="mt-16 sm:mt-24 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Notes Created */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <span className="text-4xl md:text-5xl tracking-tight font-bold text-primary">
              {stats.notesCreated.toLocaleString()}+
            </span>
            <p className="mt-3 font-medium text-lg">
              Notes Encrypted
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Secure notes created and shared
            </p>
          </div>

          {/* Users Protected */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="h-12 w-12 bg-green-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <span className="text-4xl md:text-5xl tracking-tight font-bold text-green-500">
              {stats.usersProtected.toLocaleString()}+
            </span>
            <p className="mt-3 font-medium text-lg">
              Users Protected
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Privacy-conscious users
            </p>
          </div>

          {/* Data Encrypted */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="h-12 w-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-4xl md:text-5xl tracking-tight font-bold text-blue-500">
              {stats.dataEncrypted}
            </span>
            <p className="mt-3 font-medium text-lg">
              Data Encrypted
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Securely processed data
            </p>
          </div>

          {/* Uptime */}
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="h-12 w-12 bg-amber-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Server className="h-6 w-6 text-amber-500" />
            </div>
            <span className="text-4xl md:text-5xl tracking-tight font-bold text-amber-500">
              {stats.uptime}
            </span>
            <p className="mt-3 font-medium text-lg">
              Uptime
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Always available for you
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🇨🇭</span>
            <span>Swiss Hosting</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>AES-256 Encryption</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <span>Zero-Knowledge</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">●</span>
            <span>GDPR Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats02Page;
