'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, Clock, Server, Shield, Globe, RefreshCw, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

interface SystemStatus {
  name: string;
  status: 'operational' | 'degraded' | 'outage';
  uptime: number;
  responseTime: number;
  lastChecked: string;
  details?: string;
}

interface SystemHealth {
  overall: 'operational' | 'degraded' | 'outage';
  services: SystemStatus[];
  lastUpdated: string;
  totalNotes: number;
  activeNotes: number;
  error?: string;
}

export default function SystemStatus() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSystemStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/status', {
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data: SystemHealth = await response.json();
      setSystemHealth(data);
    } catch (err) {
      console.error('Failed to fetch system status:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch status');
      
      // Fallback to offline status
      setSystemHealth({
        overall: 'outage',
        services: [],
        lastUpdated: new Date().toISOString(),
        totalNotes: 0,
        activeNotes: 0,
        error: 'Status API unavailable'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemStatus();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchSystemStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    fetchSystemStatus();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'degraded':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'outage':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'degraded':
        return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'outage':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-green-500 bg-green-500/10 border-green-500/20';
    }
  };

  // Loading state
  if (isLoading && !systemHealth) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading system status...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (!systemHealth) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-8 w-8 mx-auto mb-4 text-red-500" />
          <p className="text-muted-foreground">Failed to load system status</p>
          <button 
            onClick={handleRefresh}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { overall, services, lastUpdated, totalNotes, activeNotes } = systemHealth;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentPath="/status" />

      {/* Main Content */}
      <main className="mx-auto max-w-screen-xl px-6 py-16 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-4">System Status</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Real-time status of VaultNote services
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Overall Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className={`p-6 rounded-xl border ${getStatusColor(overall)}`}>
            <div className="flex items-center space-x-3 mb-4">
              {getStatusIcon(overall)}
              <h2 className="text-xl font-semibold">Overall Status</h2>
            </div>
            <div className="space-y-2">
              <p className="text-sm opacity-80">Last updated: {new Date(lastUpdated).toLocaleTimeString()}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm">All Systems</span>
                <span className="text-2xl font-bold">
                  {overall === 'operational' ? 'Operational' :
                   overall === 'degraded' ? 'Degraded' : 'Outage'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border/40 bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="h-6 w-6 text-blue-500" />
              <h2 className="text-xl font-semibold">Global Coverage</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Regions Online</span>
                <span className="text-2xl font-bold text-green-500">3/3</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Switzerland, Germany, Netherlands
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border/40 bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <Database className="h-6 w-6 text-green-500" />
              <h2 className="text-xl font-semibold">Database Stats</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Total Notes</span>
                <span className="text-2xl font-bold">{totalNotes.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Notes</span>
                <span className="text-lg font-semibold text-green-500">{activeNotes.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border/40 bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <Server className="h-6 w-6 text-purple-500" />
              <h2 className="text-xl font-semibold">Performance</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Avg Response Time</span>
                <span className="text-2xl font-bold">
                  {services.length > 0 ? Math.round(services.reduce((sum, s) => sum + s.responseTime, 0) / services.length) : 0}ms
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* System Components */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">System Components</h2>

          <div className="grid grid-cols-1 gap-4">
            {services.map((system: SystemStatus, index: number) => (
              <motion.div
                key={system.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl border ${getStatusColor(system.status)} hover:shadow-md transition-all duration-200`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(system.status)}
                    <div>
                      <h3 className="font-semibold text-lg">{system.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Last checked: {system.lastChecked}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div>
                        <p className="text-muted-foreground">Uptime</p>
                        <p className="font-semibold">{system.uptime}%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Response</p>
                        <p className="font-semibold">{system.responseTime}ms</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl border border-border/40 bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-green-500" />
              <h3 className="text-lg font-semibold">Security & Privacy</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Zero-knowledge encryption active</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Swiss data protection compliant</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Regular security audits</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border border-border/40 bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="h-6 w-6 text-blue-500" />
              <h3 className="text-lg font-semibold">Maintenance Schedule</h3>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>• Weekly maintenance: Sundays 02:00-04:00 CET</li>
              <li>• Security updates: As needed, with advance notice</li>
              <li>• Emergency maintenance: Immediate when required</li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 p-8 rounded-xl border border-border/40 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-muted-foreground mb-6">
              If you're experiencing issues not shown here, please contact our support team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a
                href="mailto:hello@vaultnote.net"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <span>Contact Support</span>
              </a>
              <a
                href="https://discord.gg/qtSXMgmnzY"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <span>Join Discord</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
