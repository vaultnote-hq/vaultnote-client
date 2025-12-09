import crypto from 'crypto';

// Additional security measures to prevent abuse
// WARNING: In-memory tracking - same limitations as rate limiter apply
// For production with multiple instances, consider persistent storage

const suspiciousIPs = new Set<string>();
const ipRequestHistory = new Map<string, number[]>();

// Salt for IP hashing (GDPR/DSG compliance)
const IP_HASH_SALT = process.env.IP_HASH_SALT || 'vaultnote-security-salt-change-in-production';

/**
 * Hash IP address for privacy compliance (GDPR/DSG)
 */
function hashIp(ip: string): string {
  return crypto
    .createHash('sha256')
    .update(ip + IP_HASH_SALT)
    .digest('hex')
    .substring(0, 32);
}

// Track request patterns to detect abuse
export function detectSuspiciousActivity(ip: string): boolean {
  const now = Date.now();
  
  // Hash IP for privacy (GDPR/DSG compliance)
  const hashedIp = hashIp(ip);
  
  const history = ipRequestHistory.get(hashedIp) || [];
  
  // Remove old entries (older than 1 hour)
  const recentHistory = history.filter(timestamp => now - timestamp < 60 * 60 * 1000);
  
  // Add current request
  recentHistory.push(now);
  ipRequestHistory.set(hashedIp, recentHistory);
  
  // Check for suspicious patterns
  if (recentHistory.length > 100) { // More than 100 requests per hour
    suspiciousIPs.add(hashedIp);
    return true;
  }
  
  // Check for burst activity (more than 10 requests in 1 minute)
  const lastMinute = recentHistory.filter(timestamp => now - timestamp < 60 * 1000);
  if (lastMinute.length > 10) {
    suspiciousIPs.add(hashedIp);
    return true;
  }
  
  return suspiciousIPs.has(hashedIp);
}

// Validate content to prevent storage abuse
export function validateContent(content: string): { valid: boolean; reason?: string } {
  // Check for repetitive patterns (potential spam)
  const lines = content.split('\n');
  if (lines.length > 1000) {
    return { valid: false, reason: 'Too many lines' };
  }
  
  // Check for extremely long lines (potential abuse)
  for (const line of lines) {
    if (line.length > 10000) {
      return { valid: false, reason: 'Line too long' };
    }
  }
  
  // Check for repetitive content
  const uniqueLines = new Set(lines);
  if (lines.length > 50 && uniqueLines.size < lines.length * 0.3) {
    return { valid: false, reason: 'Too much repetitive content' };
  }
  
  return { valid: true };
}

// Clean up old data periodically
setInterval(() => {
  const now = Date.now();
  for (const [hashedIp, history] of ipRequestHistory.entries()) {
    const recentHistory = history.filter(timestamp => now - timestamp < 60 * 60 * 1000);
    if (recentHistory.length === 0) {
      ipRequestHistory.delete(hashedIp);
    } else {
      ipRequestHistory.set(hashedIp, recentHistory);
    }
  }
}, 10 * 60 * 1000); // Cleanup every 10 minutes

// Function to manually unblock an IP (for admin use)
export function unblockIP(ip: string): void {
  const hashedIp = hashIp(ip);
  suspiciousIPs.delete(hashedIp);
  ipRequestHistory.delete(hashedIp);
}

// Get current security stats
export function getSecurityStats() {
  return {
    blockedIPs: suspiciousIPs.size,
    trackedIPs: ipRequestHistory.size,
    totalRequests: Array.from(ipRequestHistory.values()).reduce((sum, history) => sum + history.length, 0)
  };
}
