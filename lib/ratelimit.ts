import crypto from 'crypto';

// Simple in-memory rate limiter
// WARNING: In serverless environments (Vercel, Netlify), each instance has its own memory.
// For production with multiple instances, use:
// - Upstash Redis (https://upstash.com)
// - Vercel KV (https://vercel.com/storage/kv)
// - Supabase with RLS policies

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Different limits for different operations
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 20; // Reduced from 100 to 20 per window
const MAX_REQUESTS_PER_HOUR = 50; // Additional hourly limit

// Track hourly usage
const hourlyLimitMap = new Map<string, { count: number; resetTime: number }>();
const HOUR_MS = 60 * 60 * 1000; // 1 hour

// Salt for IP hashing (GDPR/DSG compliance)
const IP_HASH_SALT = process.env.IP_HASH_SALT || 'vaultnote-ratelimit-salt-change-in-production';

/**
 * Hash IP address for privacy compliance (GDPR/DSG)
 * IP addresses are personal data - we hash them to minimize data collection
 */
function hashIp(ip: string): string {
  return crypto
    .createHash('sha256')
    .update(ip + IP_HASH_SALT)
    .digest('hex')
    .substring(0, 32); // Truncate for performance
}

export function rateLimit(ip: string): boolean {
  const now = Date.now();
  
  // Hash IP for privacy (GDPR/DSG compliance)
  const hashedIp = hashIp(ip);
  
  // Check 15-minute window
  const entry = rateLimitMap.get(hashedIp);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(hashedIp, { count: 1, resetTime: now + WINDOW_MS });
  } else {
    if (entry.count >= MAX_REQUESTS) {
      return false;
    }
    entry.count++;
  }
  
  // Check hourly limit
  const hourlyEntry = hourlyLimitMap.get(hashedIp);
  if (!hourlyEntry || now > hourlyEntry.resetTime) {
    hourlyLimitMap.set(hashedIp, { count: 1, resetTime: now + HOUR_MS });
  } else {
    if (hourlyEntry.count >= MAX_REQUESTS_PER_HOUR) {
      return false;
    }
    hourlyEntry.count++;
  }
  
  return true;
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [hashedIp, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(hashedIp);
    }
  }
  for (const [hashedIp, entry] of hourlyLimitMap.entries()) {
    if (now > entry.resetTime) {
      hourlyLimitMap.delete(hashedIp);
    }
  }
}, 5 * 60 * 1000); // Cleanup every 5 minutes
