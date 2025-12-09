'use client';

import { useEffect, useState } from 'react';
import { 
  Save,
  RefreshCw,
  AlertTriangle,
  Users,
  FileText,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface SystemSettings {
  registrationEnabled: boolean;
  requireEmailVerification: boolean;
  maxNotesPerDay: number;
  maxNoteSize: number;
  maintenanceMode: boolean;
  maintenanceMessage: string | null;
  anonymousNotesEnabled: boolean;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      setSettings(data.settings);
      setHasChanges(false);
    } catch (err) {
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const updateSetting = (key: keyof SystemSettings, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value });
    setHasChanges(true);
  };

  const saveSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Save failed');
      }

      toast.success('Settings saved successfully');
      setHasChanges(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load settings</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Configure system-wide settings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={fetchSettings} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset
          </Button>
          <Button onClick={saveSettings} disabled={!hasChanges || saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <p className="text-sm text-amber-600">You have unsaved changes</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Registration Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Registration
            </CardTitle>
            <CardDescription>Control user registration settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Registration</Label>
                <p className="text-xs text-muted-foreground">Enable new user signups</p>
              </div>
              <Switch
                checked={settings.registrationEnabled}
                onCheckedChange={(v) => updateSetting('registrationEnabled', v)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Email Verification</Label>
                <p className="text-xs text-muted-foreground">Users must verify email before access</p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onCheckedChange={(v) => updateSetting('requireEmailVerification', v)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notes Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Notes
            </CardTitle>
            <CardDescription>Configure note creation limits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Anonymous Notes</Label>
                <p className="text-xs text-muted-foreground">Allow notes without login</p>
              </div>
              <Switch
                checked={settings.anonymousNotesEnabled}
                onCheckedChange={(v) => updateSetting('anonymousNotesEnabled', v)}
              />
            </div>
            <div className="space-y-2">
              <Label>Max Notes Per Day (per IP)</Label>
              <Input
                type="number"
                value={settings.maxNotesPerDay}
                onChange={(e) => updateSetting('maxNotesPerDay', parseInt(e.target.value) || 0)}
                min={1}
                max={1000}
              />
              <p className="text-xs text-muted-foreground">Rate limit for anonymous users</p>
            </div>
            <div className="space-y-2">
              <Label>Max Note Size</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={Math.round(settings.maxNoteSize / 1024 / 1024)}
                  onChange={(e) => updateSetting('maxNoteSize', (parseInt(e.target.value) || 1) * 1024 * 1024)}
                  min={1}
                  max={100}
                />
                <span className="text-sm text-muted-foreground">MB</span>
              </div>
              <p className="text-xs text-muted-foreground">Current: {formatBytes(settings.maxNoteSize)}</p>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Mode */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Maintenance Mode
            </CardTitle>
            <CardDescription>Enable maintenance mode to block access temporarily</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Maintenance Mode</Label>
                <p className="text-xs text-muted-foreground">
                  When enabled, only admins can access the site
                </p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(v) => updateSetting('maintenanceMode', v)}
              />
            </div>
            {settings.maintenanceMode && (
              <div className="space-y-2">
                <Label>Maintenance Message</Label>
                <Input
                  placeholder="We're currently performing maintenance. Please check back soon."
                  value={settings.maintenanceMessage || ''}
                  onChange={(e) => updateSetting('maintenanceMessage', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Message shown to users during maintenance</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
