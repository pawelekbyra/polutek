import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  // We throw an error in non-production to catch missing keys early,
  // but we might want to just log in production if we don't want to crash the whole app.
  // However, for safety, missing critical keys should be prominent.
  if (process.env.NODE_ENV === 'production') {
      console.error('CRITICAL: STRIPE_SECRET_KEY is not set in production!');
  }
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_missing', {
  apiVersion: '2025-01-27.acacia' as any,
  typescript: true,
});
