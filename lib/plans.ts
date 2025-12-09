// Plan definitions and limits
export type PlanType = 'free' | 'pro' | 'business';

export interface PlanLimits {
  maxNotes: number;
  maxStorageMB: number;
  maxImagesPerNote: number;
  maxImageSizeMB: number;
  allowImages: boolean;
  allowPasswordProtection: boolean;
  allowCustomExpiry: boolean;
  maxExpiryDays: number;
  allowDeleteAfterReading: boolean;
}

export const PLAN_LIMITS: Record<PlanType, PlanLimits> = {
  free: {
    maxNotes: 20,
    maxStorageMB: 100,
    maxImagesPerNote: 0, // No images for free
    maxImageSizeMB: 0,
    allowImages: false,
    allowPasswordProtection: false, // Pro feature
    allowCustomExpiry: false,
    maxExpiryDays: 1, // Max 24 hours
    allowDeleteAfterReading: true,
  },
  pro: {
    maxNotes: -1, // Unlimited
    maxStorageMB: 5000, // 5GB
    maxImagesPerNote: 10,
    maxImageSizeMB: 10,
    allowImages: true,
    allowPasswordProtection: true,
    allowCustomExpiry: true,
    maxExpiryDays: 30, // Up to 30 days as advertised
    allowDeleteAfterReading: true,
  },
  business: {
    maxNotes: -1, // Unlimited
    maxStorageMB: 20000, // 20GB per user as advertised
    maxImagesPerNote: 50,
    maxImageSizeMB: 25,
    allowImages: true,
    allowPasswordProtection: true,
    allowCustomExpiry: true,
    maxExpiryDays: -1, // Unlimited
    allowDeleteAfterReading: true,
  },
};

export function getPlanLimits(plan: string | null | undefined): PlanLimits {
  const planType = (plan?.toLowerCase() || 'free') as PlanType;
  return PLAN_LIMITS[planType] || PLAN_LIMITS.free;
}

export interface UsageCheck {
  allowed: boolean;
  reason?: string;
  limit?: number;
  current?: number;
}

export function checkNotesLimit(
  currentNotes: number,
  limits: PlanLimits
): UsageCheck {
  if (limits.maxNotes === -1) {
    return { allowed: true };
  }
  
  if (currentNotes >= limits.maxNotes) {
    return {
      allowed: false,
      reason: `You've reached your limit of ${limits.maxNotes} notes. Upgrade to Pro for more.`,
      limit: limits.maxNotes,
      current: currentNotes,
    };
  }
  
  return { allowed: true };
}

export function checkImagesAllowed(limits: PlanLimits): UsageCheck {
  if (!limits.allowImages) {
    return {
      allowed: false,
      reason: 'Image attachments are a Pro feature. Upgrade to attach images to your notes.',
    };
  }
  return { allowed: true };
}

export function checkImageCount(
  imageCount: number,
  limits: PlanLimits
): UsageCheck {
  if (!limits.allowImages) {
    return {
      allowed: false,
      reason: 'Image attachments are a Pro feature.',
    };
  }
  
  if (imageCount > limits.maxImagesPerNote) {
    return {
      allowed: false,
      reason: `Maximum ${limits.maxImagesPerNote} images per note allowed on your plan.`,
      limit: limits.maxImagesPerNote,
      current: imageCount,
    };
  }
  
  return { allowed: true };
}

export function checkStorageLimit(
  currentStorageMB: number,
  additionalMB: number,
  limits: PlanLimits
): UsageCheck {
  const totalMB = currentStorageMB + additionalMB;
  
  if (totalMB > limits.maxStorageMB) {
    return {
      allowed: false,
      reason: `Storage limit of ${limits.maxStorageMB}MB exceeded. Upgrade for more storage.`,
      limit: limits.maxStorageMB,
      current: currentStorageMB,
    };
  }
  
  return { allowed: true };
}

export function checkExpiryDuration(
  durationMinutes: number | undefined,
  limits: PlanLimits
): UsageCheck {
  if (!durationMinutes) {
    return { allowed: true };
  }
  
  const durationDays = durationMinutes / (60 * 24);
  
  if (limits.maxExpiryDays !== -1 && durationDays > limits.maxExpiryDays) {
    return {
      allowed: false,
      reason: `Maximum expiry of ${limits.maxExpiryDays} day(s) on your plan. Upgrade for longer expiry times.`,
      limit: limits.maxExpiryDays,
    };
  }
  
  return { allowed: true };
}
