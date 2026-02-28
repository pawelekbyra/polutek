import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { findUserByEmail, updateUser, createUser } from '@/lib/db';
import { NotificationService } from '@/lib/notifications';
import { sendWelcomeEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
       console.error('STRIPE_WEBHOOK_SECRET is missing');
       throw new Error('STRIPE_WEBHOOK_SECRET is missing');
    }
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    console.error(`Webhook signature verification failed: ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      const email = paymentIntent.metadata?.user_email || paymentIntent.receipt_email;

      if (email) {
        console.log(`Processing successful payment for email: ${email}`);

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
           console.log(`User found (ID: ${existingUser.id}), upgrading to patron...`);
           await updateUser(existingUser.id, { role: 'patron' });

           await NotificationService.send(
               existingUser.id,
               'system',
               { text: "Dziękujemy za wsparcie! Twój status Patrona został aktywowany." }
           );

        } else {
           if (paymentIntent.metadata.create_account === 'true') {
             console.log(`User not found, creating new patron account for ${email}...`);
             const tempPassword = crypto.randomBytes(4).toString('hex');
             const newUser = await createUser({
                 username: email.split('@')[0] + '_' + Math.floor(Math.random() * 1000),
                 displayName: email.split('@')[0],
                 email: email,
                 password: tempPassword,
                 role: 'patron',
                 avatar: undefined
             });

             await sendWelcomeEmail(email, tempPassword);

             await NotificationService.send(
                 newUser.id,
                 'system',
                 { text: `Witaj w gronie Patronów! Twoje konto zostało utworzone. Twój tymczasowy hasło to: ${tempPassword} (zmień je w ustawieniach).` }
             );
           } else {
             console.log(`User not found for ${email} and create_account is not true. Skipping account creation.`);
           }
        }
      } else {
          console.warn('Payment succeeded but no email found in metadata or receipt_email.');
      }
    }

    return new NextResponse(null, { status: 200 });
  } catch (error: any) {
    console.error(`Error processing webhook: ${error.message}`);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
