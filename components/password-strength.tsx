'use client';

import { useMemo } from 'react';
import zxcvbn from 'zxcvbn';
import { Shield, ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
  className?: string;
}

export function PasswordStrength({ password, className = '' }: PasswordStrengthProps) {
  const strength = useMemo(() => {
    if (!password) return null;
    return zxcvbn(password);
  }, [password]);

  if (!strength || !password) return null;

  const score = strength.score; // 0-4
  const feedback = strength.feedback;

  const getStrengthConfig = () => {
    switch (score) {
      case 0:
      case 1:
        return {
          label: 'Sehr schwach',
          color: 'text-red-500',
          bgColor: 'bg-red-500',
          icon: ShieldX,
          width: '20%',
        };
      case 2:
        return {
          label: 'Schwach',
          color: 'text-orange-500',
          bgColor: 'bg-orange-500',
          icon: ShieldAlert,
          width: '40%',
        };
      case 3:
        return {
          label: 'Gut',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500',
          icon: Shield,
          width: '60%',
        };
      case 4:
        return {
          label: 'Stark',
          color: 'text-green-500',
          bgColor: 'bg-green-500',
          icon: ShieldCheck,
          width: '100%',
        };
      default:
        return {
          label: 'Unbekannt',
          color: 'text-gray-500',
          bgColor: 'bg-gray-500',
          icon: Shield,
          width: '0%',
        };
    }
  };

  const config = getStrengthConfig();
  const Icon = config.icon;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Strength Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-2 bg-surface-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${config.bgColor} transition-all duration-300`}
            style={{ width: config.width }}
          />
        </div>
        <div className={`flex items-center gap-1 ${config.color} text-sm font-medium`}>
          <Icon className="h-4 w-4" />
          <span>{config.label}</span>
        </div>
      </div>

      {/* Feedback */}
      {feedback.warning && (
        <p className="text-xs text-orange-400">
          ⚠️ {feedback.warning}
        </p>
      )}
      {feedback.suggestions && feedback.suggestions.length > 0 && (
        <ul className="text-xs text-surface-400 space-y-1">
          {feedback.suggestions.map((suggestion, i) => (
            <li key={i}>💡 {suggestion}</li>
          ))}
        </ul>
      )}
      
      {/* Crack Time Estimate */}
      {strength.crack_times_display.offline_slow_hashing_1e4_per_second && (
        <p className="text-xs text-surface-500">
          🕐 Geschätzte Knackzeit: {strength.crack_times_display.offline_slow_hashing_1e4_per_second}
        </p>
      )}
    </div>
  );
}
