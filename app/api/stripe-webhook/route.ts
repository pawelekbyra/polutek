// app/api/stripe-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { sendPasswordResetLinkEmail } from '@/lib/email';
import { randomBytes } from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-04-10',
});

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature as string,
            process.env.STRIPE_WEBHOOK_SECRET as string
        );
    } catch (err: any) {
        console.error(`⚠️ Błąd weryfikacji Webhook: ${err.message}`);
        return NextResponse.json({ success: false, message: `Błąd Webhook: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const email = paymentIntent.metadata.email;

        if (!email) {
            // Not a payment intent for creating an account, so we can ignore it.
            return NextResponse.json({ received: true }, { status: 200 });
        }

        try {
            const existingUser = await prisma.users.findUnique({ where: { email } });
            if (existingUser) {
                await prisma.users.update({ where: { id: existingUser.id }, data: { role: 'PATRON' } });
                return NextResponse.json({ success: true, message: 'Patron istnieje, rola zaktualizowana.' }, { status: 200 });
            }

            const tempPassword = randomBytes(32).toString('hex');
            const hashedPassword = await bcrypt.hash(tempPassword, 10);

            const newUser = await prisma.users.create({
                data: {
                    email,
                    password: hashedPassword,
                    username: email.split('@')[0],
                    displayName: `Patron ${email.split('@')[0]}`,
                    role: 'PATRON',
                    avatar: null,
                }
            });

            const token = randomBytes(32).toString('hex');
            const expiresAt = new Date(Date.now() + 3600000); // 1 hour

            await prisma.password_reset_tokens.create({
                data: {
                    userId: newUser.id,
                    token,
                    expiresAt,
                }
            });

            const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
            await sendPasswordResetLinkEmail(email, resetLink);

            console.log(`Pomyślnie utworzono konto i wysłano link resetujący dla: ${email}`);

            return NextResponse.json({ success: true, message: 'Konto utworzone i e-mail wysłany.' }, { status: 201 });

        } catch (error: any) {
            console.error('Błąd podczas tworzenia konta patrona przez webhook:', error);
            return NextResponse.json({ success: false, message: 'Wewnętrzny błąd serwera podczas tworzenia konta.' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true }, { status: 200 });
}
