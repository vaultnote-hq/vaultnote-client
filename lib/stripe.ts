import Stripe from 'stripe';

// Initialize Stripe
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
  typescript: true,
});

// Plan configuration
export const PLANS = {
  free: {
    name: 'Starter',
    description: 'For trying VaultNote privately.',
    notesLimit: 20,
    storageLimit: 100 * 1024 * 1024, // 100 MB
    features: [
      'Zero-knowledge encryption (AES-256-GCM)',
      'Swiss hosting',
      'Basic editor',
      'Share links (24h expiry)',
      'No tracking',
    ],
  },
  pro: {
    name: 'Pro',
    description: 'For power users who share securely.',
    notesLimit: -1, // Unlimited
    storageLimit: 5 * 1024 * 1024 * 1024, // 5 GB
    features: [
      'Everything in Starter',
      'Unlimited notes',
      'Rich editor (Markdown, code blocks)',
      'Extended link expiry (up to 30 days)',
      'Password-protected links',
      'Privacy-safe access counter',
      'Encrypted sync across devices',
      'Attachments (up to 10 MB)',
      'Custom theme',
      'Email support (48h)',
    ],
  },
  business: {
    name: 'Business',
    description: 'For teams & organizations needing control.',
    notesLimit: -1, // Unlimited
    storageLimit: 20 * 1024 * 1024 * 1024, // 20 GB per user
    features: [
      'Everything in Pro',
      'Shared vaults',
      'Role-based access',
      'Audit log',
      'SSO / SAML',
      'DPA & compliance pack',
      'Admin dashboard',
      'Priority support (same-day)',
      'API access',
      '99.9% SLA',
    ],
  },
} as const;

export type PlanType = keyof typeof PLANS;

// Stripe Price IDs - These will be created in Stripe Dashboard
// For now, we'll create them programmatically on first run
export const STRIPE_PRICES = {
  pro_monthly: process.env.STRIPE_PRICE_PRO_MONTHLY || '',
  pro_yearly: process.env.STRIPE_PRICE_PRO_YEARLY || '',
  business_monthly: process.env.STRIPE_PRICE_BUSINESS_MONTHLY || '',
  business_yearly: process.env.STRIPE_PRICE_BUSINESS_YEARLY || '',
} as const;

// Price configuration (in cents/rappen)
export const PRICE_CONFIG = {
  pro: {
    monthly: 590, // CHF 5.90
    yearly: 5900, // CHF 59.00 (2 months free)
  },
  business: {
    monthly: 990, // CHF 9.90 per user
    yearly: 9900, // CHF 99.00 per user per year
  },
} as const;

// Helper to get or create Stripe products and prices
export async function ensureStripeProducts() {
  // Check if products exist
  const products = await stripe.products.list({ limit: 10 });
  
  let proProduct = products.data.find(p => p.metadata.plan === 'pro');
  let businessProduct = products.data.find(p => p.metadata.plan === 'business');
  
  // Create Pro product if not exists
  if (!proProduct) {
    proProduct = await stripe.products.create({
      name: 'VaultNote Pro',
      description: PLANS.pro.description,
      metadata: { plan: 'pro' },
    });
  }
  
  // Create Business product if not exists
  if (!businessProduct) {
    businessProduct = await stripe.products.create({
      name: 'VaultNote Business',
      description: PLANS.business.description,
      metadata: { plan: 'business' },
    });
  }
  
  // Get or create prices
  const prices = await stripe.prices.list({ limit: 20, active: true });
  
  const priceIds: Record<string, string> = {};
  
  // Pro Monthly
  let proMonthly = prices.data.find(
    p => p.product === proProduct!.id && p.recurring?.interval === 'month'
  );
  if (!proMonthly) {
    proMonthly = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: PRICE_CONFIG.pro.monthly,
      currency: 'chf',
      recurring: { interval: 'month' },
      metadata: { plan: 'pro', interval: 'monthly' },
    });
  }
  priceIds.pro_monthly = proMonthly.id;
  
  // Pro Yearly
  let proYearly = prices.data.find(
    p => p.product === proProduct!.id && p.recurring?.interval === 'year'
  );
  if (!proYearly) {
    proYearly = await stripe.prices.create({
      product: proProduct.id,
      unit_amount: PRICE_CONFIG.pro.yearly,
      currency: 'chf',
      recurring: { interval: 'year' },
      metadata: { plan: 'pro', interval: 'yearly' },
    });
  }
  priceIds.pro_yearly = proYearly.id;
  
  // Business Monthly
  let businessMonthly = prices.data.find(
    p => p.product === businessProduct!.id && p.recurring?.interval === 'month'
  );
  if (!businessMonthly) {
    businessMonthly = await stripe.prices.create({
      product: businessProduct.id,
      unit_amount: PRICE_CONFIG.business.monthly,
      currency: 'chf',
      recurring: { interval: 'month' },
      metadata: { plan: 'business', interval: 'monthly' },
    });
  }
  priceIds.business_monthly = businessMonthly.id;
  
  // Business Yearly
  let businessYearly = prices.data.find(
    p => p.product === businessProduct!.id && p.recurring?.interval === 'year'
  );
  if (!businessYearly) {
    businessYearly = await stripe.prices.create({
      product: businessProduct.id,
      unit_amount: PRICE_CONFIG.business.yearly,
      currency: 'chf',
      recurring: { interval: 'year' },
      metadata: { plan: 'business', interval: 'yearly' },
    });
  }
  priceIds.business_yearly = businessYearly.id;
  
  return priceIds;
}

// Create a checkout session
export async function createCheckoutSession({
  priceId,
  userId,
  userEmail,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: userEmail,
    client_reference_id: userId,
    metadata: {
      userId,
    },
    subscription_data: {
      metadata: {
        userId,
      },
    },
    allow_promotion_codes: true,
    billing_address_collection: 'required',
    // Enable automatic tax calculation based on customer location
    automatic_tax: { enabled: true },
    // Consent collection for Terms of Service
    consent_collection: {
      terms_of_service: 'required',
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: 'I agree to the [Terms of Service](https://vaultnote.net/terms) and acknowledge that this is a digital service with immediate access. By subscribing, I waive my right of withdrawal.',
      },
    },
  });
  
  return session;
}

// Create a customer portal session
export async function createPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });
  
  return session;
}

// Get subscription details
export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId);
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

// Reactivate subscription
export async function reactivateSubscription(subscriptionId: string) {
  return stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
}
